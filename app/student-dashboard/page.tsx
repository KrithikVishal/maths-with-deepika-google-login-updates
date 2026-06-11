import { Download, FileText, PackageCheck, PlayCircle, ShieldCheck, Star } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MotherCourseList } from "@/components/lms/MotherCourseList";
import { KidTopicCourseList } from "@/components/lms/KidTopicCourseList";
import { MotherLmsSummary } from "@/components/lms/MotherLmsSummary";
import { StudentBadges } from "@/components/lms/StudentBadges";
import { AvatarPicker } from "@/components/lms/AvatarPicker";
import { StudentPaymentOptions } from "@/components/lms/StudentPaymentOptions";
import { RecentOrders } from "@/components/orders/RecentOrders";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { Section } from "@/components/Section";
import { requireRole } from "@/lib/auth";
import { flattenCourses, getCompletionStats, getContinueVideo, getCourseCollectionStats, getStudentCourses, getResources, getVideoProgress, normalizeAccessLevel } from "@/lib/lms";
import { getNotifications } from "@/lib/notifications";
import { mapOrderRow, type OrderRow } from "@/lib/orders";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export default async function StudentDashboardPage() {
  const profile = await requireRole(["mother", "kid"]);
  const accessLevel = normalizeAccessLevel(profile.access_level);
  const courses = await getStudentCourses();
  
  const motherCourses = courses.filter(c => c.audience === "mother");
  const kidCourses = courses.filter(c => c.audience === "kid");

  const stats = getCourseCollectionStats(courses, accessLevel);
  const allVideos = flattenCourses(courses);
  const progressRows = await getVideoProgress(profile.id, allVideos.map((video) => video.id));
  const completion = getCompletionStats(allVideos, progressRows);
  const firstUnlockedVideo = getContinueVideo(allVideos, accessLevel, progressRows);
  
  const resources = await getResources({
    courseIds: courses.map((course) => course.id),
    moduleIds: courses.flatMap((course) => course.modules.map((module) => module.id)),
    videoIds: allVideos.map((video) => video.id),
  });

  const supabase = createSupabaseAdminClient();
  const { data: orderRows } = await supabase
    .from("orders")
    .select("id, customer_name, customer_email, customer_phone, shipping_address, city, state, pincode, notes, status, order_status, payment_status, tracking_id, courier_name, tracking_url, subtotal, shipping, total, created_at, order_items(product_id, variant_id, product_name, variant_name, price, quantity, total)")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();
  const orders = (orderRows ?? []).map(mapOrderRow);
  const notifications = await getNotifications(profile.id);

  return (
    <PageShell>
      <Section
        tone="beige"
        eyebrow="Student LMS"
        title={`Welcome back, ${profile.full_name.split(" ")[0] || "there"}`}
        text="Your lessons, modules, worksheets, payments, and learning access are arranged here in one calm place."
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <AvatarPicker currentAvatar={profile.avatar_url} profileId={profile.id} />
          <LogoutButton />
        </div>
        <MotherLmsSummary accessLevel={accessLevel} total={stats.total} unlocked={stats.unlocked} locked={stats.locked} progress={completion.progress || stats.progress} />
      </Section>

      {accessLevel === "none" ? (
        <Section eyebrow="Getting started" title="Your learning space is ready">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ["Choose access", "Start with partial access or unlock the full program when you are ready."],
              ["Learn by modules & topics", "Lessons are grouped logically, so you can move calmly without feeling lost."],
              ["Track progress", "Completed lessons, worksheets, and orders will stay visible in this dashboard."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
                <p className="text-lg font-bold text-blueDeep">{title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="beige" eyebrow="Achievements" title="Your Badges">
        <StudentBadges progressRows={progressRows} />
      </Section>

      <Section eyebrow="Continue learning" title="Your learning journey">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10">
                <PlayCircle className="h-8 w-8 text-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blueDeep">{firstUnlockedVideo ? firstUnlockedVideo.title : "Start with a preview"}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/68">
                  {accessLevel === "none"
                    ? "Choose partial or full access to unlock your first lessons."
                    : "Continue with the next unlocked lesson in your course."}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar value={completion.progress || stats.progress} label="Overall progress" />
            </div>
            {firstUnlockedVideo ? (
              <a
                href={`/student-dashboard/video/${firstUnlockedVideo.id}`}
                className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174]"
              >
                Continue Lesson
              </a>
            ) : (
              <a
                href="#payment-status"
                className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52]"
              >
                Unlock Lessons
              </a>
            )}
          </div>

          <div id="payment-status" className="scroll-mt-24">
            <StudentPaymentOptions accessLevel={accessLevel} userProfile={profile} />
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Updates" title="Recent updates">
        <NotificationPanel notifications={notifications} returnPath="/student-dashboard" />
      </Section>

      {motherCourses.length > 0 && (
        <Section tone="beige" eyebrow="Main Program" title="Core Modules">
          <MotherCourseList courses={motherCourses} accessLevel={accessLevel} progress={progressRows} resources={resources} dashboardPath="/student-dashboard" />
        </Section>
      )}

      {kidCourses.length > 0 && (
        <Section tone="beige" eyebrow="Topic Practice" title="Short Topics">
          <KidTopicCourseList courses={kidCourses} accessLevel={accessLevel} progress={progressRows} resources={resources} dashboardPath="/student-dashboard" />
        </Section>
      )}

      <Section eyebrow="Resources" title="Worksheets, payments, and order support">
        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard title="Worksheets and downloads">
            <div className="grid gap-3">
              {resources.length === 0 ? ["Module worksheets", "Revision sheets", "Answer keys"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-beige/60 p-4">
                  <Download className="h-5 w-5 text-coral" />
                  <div>
                    <p className="font-bold text-blueDeep">{item}</p>
                    <p className="text-sm text-ink/65">Upload/download flow placeholder</p>
                  </div>
                </div>
              )) : resources.slice(0, 4).map((resource) => (
                <a key={resource.id} href={resource.file_url} className="flex items-center gap-3 rounded-2xl bg-beige/60 p-4">
                  <Download className="h-5 w-5 text-coral" />
                  <div>
                    <p className="font-bold text-blueDeep">{resource.title}</p>
                    <p className="text-sm text-ink/65">{resource.file_type} resource</p>
                  </div>
                </a>
              ))}
            </div>
          </DashboardCard>
          <DashboardCard title="Payment status">
            <div className="flex items-center gap-3 rounded-2xl bg-gold/20 p-4">
              <ShieldCheck className="h-6 w-6 text-blueDeep" />
              <div>
                <p className="font-bold text-blueDeep">{accessLevel === "full" ? "Full Access" : accessLevel === "partial" ? "Partial Access" : "No payment yet"}</p>
                <p className="text-sm text-ink/65">Payments unlock course access.</p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard title="Completed lessons">
            <div className="grid gap-3">
              {Object.values(progressRows).filter((item) => item.completed).length === 0 ? (
                <div className="rounded-2xl bg-beige/60 p-4 text-sm font-semibold text-blueDeep">Completed lessons will appear here after practice.</div>
              ) : null}
              {allVideos.filter((video) => progressRows[video.id]?.completed).slice(0, 3).map((video) => (
                <div key={video.id} className="flex items-center gap-3 rounded-2xl bg-gold/20 p-3 text-sm font-bold text-blueDeep">
                  <Star className="h-5 w-5" />
                  {video.title}
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <DashboardCard title="Recent orders">
            <RecentOrders initialOrders={orders} />
          </DashboardCard>
          <DashboardCard title="Physical product tracking">
            <div className="flex items-center gap-3 rounded-2xl bg-beige/60 p-4">
              <PackageCheck className="h-6 w-6 text-coral" />
              <div>
                <p className="font-bold text-blueDeep">Tracking updates</p>
                <p className="text-sm text-ink/65">Tracking IDs appear here after admin updates your order.</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </Section>
    </PageShell>
  );
}
