import { Baby, CheckCircle2, Clock, Filter, Heart, IndianRupee, PackagePlus, ShoppingBag, Truck, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { DashboardCard } from "@/components/DashboardCard";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { CourseManagement } from "@/components/admin/CourseManagement";
import { MemberManagement } from "@/components/admin/MemberManagement";
import { AdminOrderManagement, ExportOrdersButton } from "@/components/orders/AdminOrderManagement";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { Section } from "@/components/Section";
import { requireRole } from "@/lib/auth";
import { mapOrderRow, type OrderRow } from "@/lib/orders";
import { CourseResource, LmsCourse } from "@/lib/lms";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { accessLevels, Profile, roles, statuses } from "@/lib/types";

type PaymentRow = {
  id: string;
  user_id: string;
  audience: "mother" | "kid";
  payment_type: "partial" | "full";
  amount: number | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: string;
  created_at: string;
  profiles?: { full_name: string | null; email: string | null } | null;
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string; status?: string; access?: string; memberMessage?: string; memberType?: string }>;
}) {
  await requireRole("admin");
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const role = roles.includes(params.role as never) ? params.role ?? "" : "";
  const status = statuses.includes(params.status as never) ? params.status ?? "" : "";
  const accessLevel = accessLevels.includes(params.access as never) ? params.access ?? "" : "";
  const supabase = createSupabaseAdminClient();

  let profilesQuery = supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (query) {
    const safeQuery = query.replaceAll(",", " ");
    profilesQuery = profilesQuery.or(
      `full_name.ilike.%${safeQuery}%,email.ilike.%${safeQuery}%,username.ilike.%${safeQuery}%,phone.ilike.%${safeQuery}%`,
    );
  }

  if (role) {
    profilesQuery = profilesQuery.eq("role", role);
  }

  if (status) {
    profilesQuery = profilesQuery.eq("status", status);
  }

  if (accessLevel) {
    profilesQuery = profilesQuery.eq("access_level", accessLevel);
  }

  const { data: profiles } = await profilesQuery.returns<Profile[]>();
  const { data: allProfiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();
  const { data: orderRows } = await supabase
    .from("orders")
    .select("id, customer_name, customer_email, customer_phone, shipping_address, city, state, pincode, notes, status, order_status, payment_status, tracking_id, courier_name, tracking_url, subtotal, shipping, total, created_at, order_items(product_id, variant_id, product_name, variant_name, price, quantity, total)")
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();
  const realOrders = (orderRows ?? []).map(mapOrderRow);
  const { data: paymentRows } = await supabase
    .from("payments")
    .select("id, user_id, audience, payment_type, amount, razorpay_order_id, razorpay_payment_id, status, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<PaymentRow[]>();
  const { data: lmsCourses } = await supabase
    .from("courses")
    .select("id, title, description, audience, course_type, order_index, course_modules(id, course_id, title, description, order_index, course_videos(id, module_id, title, description, video_url, thumbnail, thumbnail_url, duration, order_index, required_access))")
    .order("order_index", { ascending: true })
    .order("order_index", { referencedTable: "course_modules", ascending: true })
    .order("order_index", { referencedTable: "course_modules.course_videos", ascending: true })
    .returns<Array<Omit<LmsCourse, "modules"> & { course_modules: Array<Omit<LmsCourse["modules"][number], "videos"> & { course_videos: LmsCourse["modules"][number]["videos"] | null }> | null }>>();
  const courses = (lmsCourses ?? []).map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    audience: course.audience,
    course_type: course.course_type,
    order_index: course.order_index,
    modules: (course.course_modules ?? []).map((module) => ({
      id: module.id,
      course_id: module.course_id,
      title: module.title,
      description: module.description,
      order_index: module.order_index,
      videos: module.course_videos ?? [],
    })),
  }));
  const { data: resources } = await supabase
    .from("course_resources")
    .select("id, course_id, module_id, video_id, title, file_url, file_type, required_access, created_at")
    .order("created_at", { ascending: false })
    .returns<CourseResource[]>();
  const { count: completedLessonsCount } = await supabase
    .from("video_progress")
    .select("id", { count: "exact", head: true })
    .eq("completed", true);

  const users = allProfiles ?? [];
  const totalRevenue = realOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = realOrders.filter((order) => order.paymentStatus === "pending" || order.status === "Placed").length;
  const shippedOrders = realOrders.filter((order) => order.status === "Shipped" || order.status === "Delivered").length;
  const activeLearners = users.filter((user) => user.access_level === "partial" || user.access_level === "full").length;
  const analyticsCards = [
    { label: "Total users", value: String(users.length), note: "All registered accounts", icon: Users },
    { label: "Mothers", value: String(users.filter((user) => user.role === "mother").length), note: "Mother learners", icon: Heart },
    { label: "Kids", value: String(users.filter((user) => user.role === "kid").length), note: "Kid learners", icon: Baby },
    { label: "Total orders", value: String(realOrders.length), note: "Physical and digital orders", icon: ShoppingBag },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, note: "Paid orders", icon: IndianRupee },
    { label: "Active learners", value: String(activeLearners), note: "Partial or full access", icon: CheckCircle2 },
    { label: "Pending orders", value: String(pendingOrders), note: "Placed or unpaid", icon: Clock },
    { label: "Shipped orders", value: String(shippedOrders), note: "Shipped or delivered", icon: Truck },
  ];
  const recentActivity = [
    ...users.slice(0, 3).map((user) => ({ id: `user-${user.id}`, title: `${user.full_name} joined`, note: `${user.role} · ${user.access_level ?? "none"} access` })),
    ...(paymentRows ?? []).slice(0, 3).map((payment) => ({ id: `payment-${payment.id}`, title: `${payment.profiles?.full_name ?? "Learner"} payment`, note: `${payment.status} · ${payment.amount ? `₹${payment.amount}` : "Amount pending"}` })),
    ...realOrders.slice(0, 3).map((order) => ({ id: `order-${order.id}`, title: `Order ${order.id}`, note: `${order.status} · ₹${order.total}` })),
  ].slice(0, 6);

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Admin dashboard" title="Manage courses, products, orders, and access" text="A practical admin space with protected member management, order tracking, and course tools.">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {["Today", "Week", "Month"].map((item) => (
              <Link key={item} href={`/admin/dashboard?range=${item.toLowerCase()}#orders`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-sm">
                <Filter className="h-4 w-4" />
                {item}
              </Link>
            ))}
            <ExportOrdersButton initialOrders={realOrders} />
          </div>
          <LogoutButton />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsCards.map((card) => {
            const Icon = card.icon;
            return (
              <DashboardCard key={card.label} title={card.label} value={card.value} note={card.note}>
                <Icon className="h-7 w-7 text-coral" />
              </DashboardCard>
            );
          })}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-soft bg-white p-6 shadow-soft">
            <h3 className="text-xl font-bold text-blueDeep">Recent activity</h3>
            <div className="mt-4 grid gap-3">
              {recentActivity.length === 0 ? (
                <div className="rounded-2xl bg-beige/60 p-4 text-sm font-semibold text-blueDeep">No recent activity yet.</div>
              ) : null}
              {recentActivity.map((activity) => (
                <div key={activity.id} className="rounded-2xl bg-beige/60 p-4">
                  <p className="font-bold text-blueDeep">{activity.title}</p>
                  <p className="mt-1 text-sm text-ink/65">{activity.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-soft bg-white p-6 shadow-soft">
            <h3 className="text-xl font-bold text-blueDeep">Learning insight</h3>
            <div className="mt-4 grid gap-4">
              <ProgressBar value={users.length ? Math.round((activeLearners / users.length) * 100) : 0} label="Learners with access" />
              <div className="rounded-2xl bg-gold/20 p-4 text-sm font-bold text-blueDeep">
                {completedLessonsCount ?? 0} completed lesson records
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Member management" title="Users and roles">
        <MemberManagement
          profiles={profiles ?? []}
          query={query}
          role={role}
          status={status}
          accessLevel={accessLevel}
          message={params.memberMessage}
          messageType={params.memberType}
        />
      </Section>

      <Section tone="beige" eyebrow="Uploads" title="Content and product upload area">
        <CourseManagement courses={courses} resources={resources ?? []} />
      </Section>

      <Section eyebrow="Orders" title="Orders">
        <div id="orders" />
        <div>
          <AdminOrderManagement initialOrders={realOrders} />
        </div>
      </Section>

      <Section tone="beige" eyebrow="Management" title="Inventory, tracking, and course access">
        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard title="Inventory management" value="128" note="Products available">
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-beige/60 p-4">
              <PackagePlus className="h-6 w-6 text-coral" />
              <span className="font-semibold text-blueDeep">6 products need restock review</span>
            </div>
          </DashboardCard>
          <DashboardCard title="Tracking ID management">
            <p className="text-sm leading-6 text-ink/65">Add Delhivery tracking IDs from each order card above.</p>
            <button className="focus-ring mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-borderSoft" type="button">
              Ready in Orders
            </button>
          </DashboardCard>
          <DashboardCard title="Course access management">
            <div className="grid gap-3">
              <div className="rounded-2xl bg-gold/20 p-3 text-sm font-bold text-blueDeep">Set access from each member row above.</div>
              <div className="rounded-2xl bg-coral/10 p-3 text-sm font-bold text-coral">Supports none, partial, and full access.</div>
              <ProgressBar value={78} label="Course completion" />
            </div>
          </DashboardCard>
        </div>
      </Section>

      <Section eyebrow="Payments" title="Payment records placeholder">
        <div className="rounded-soft bg-white p-6 shadow-soft">
          <div className="grid gap-4">
            {(paymentRows ?? []).length === 0 ? (
              <div className="rounded-2xl bg-beige/60 p-5 text-sm font-semibold text-blueDeep">
                No payment records yet. Razorpay payment and webhook records will appear here.
              </div>
            ) : null}
            {(paymentRows ?? []).map((payment) => (
              <div key={payment.id} className="grid gap-3 rounded-2xl border border-borderSoft p-4 text-sm md:grid-cols-[1fr_0.7fr_0.7fr_0.7fr]">
                <div>
                  <p className="font-bold text-blueDeep">{payment.profiles?.full_name ?? "Learner"}</p>
                  <p className="text-ink/60">{payment.profiles?.email ?? payment.user_id}</p>
                </div>
                <p className="font-semibold text-blueDeep">{payment.audience} / {payment.payment_type}</p>
                <p className="font-semibold text-blueDeep">{payment.amount ? `₹${payment.amount}` : "Amount pending"}</p>
                <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-blueDeep">{payment.status}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
