import { Download, FileText, PlayCircle, Star } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { KidPaymentOptions } from "@/components/lms/KidPaymentOptions";
import { KidTopicCourseList } from "@/components/lms/KidTopicCourseList";
import { MotherLmsSummary } from "@/components/lms/MotherLmsSummary";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { RecentOrders } from "@/components/orders/RecentOrders";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { Section } from "@/components/Section";
import { requireRole } from "@/lib/auth";
import { canAccess, flattenCourses, getCompletionStats, getContinueVideo, getCourseCollectionStats, getKidCourses, getResources, getVideoProgress, normalizeAccessLevel } from "@/lib/lms";
import { getNotifications } from "@/lib/notifications";
import { mapOrderRow, type OrderRow } from "@/lib/orders";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export default async function KidDashboardPage() {
  const profile = await requireRole("kid");
  const accessLevel = normalizeAccessLevel(profile.access_level);
  const courses = await getKidCourses();
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
        eyebrow="Kids LMS"
        title={`Hi ${profile.full_name.split(" ")[0] || "there"}, ready for a short lesson?`}
        text="Choose a topic, watch a small lesson, and practise gently with worksheets when they are ready."
      >
        <div className="mb-6 flex justify-end">
          <LogoutButton />
        </div>
        <MotherLmsSummary accessLevel={accessLevel} total={stats.total} unlocked={stats.unlocked} locked={stats.locked} progress={completion.progress || stats.progress} />
      </Section>

      {accessLevel === "none" ? (
        <Section eyebrow="Getting started" title="How your topic learning works">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ["Pick a topic", "Lessons are grouped by maths topic, so it is easy to choose what to practise."],
              ["Unlock lessons", "Partial access opens selected topics. Full access opens everything."],
              ["Build small wins", "Watch, practise, mark lessons complete, and slowly build confidence."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
                <p className="text-lg font-bold text-blueDeep">{title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section eyebrow="Continue learning" title="Pick a topic and keep going">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10">
                <PlayCircle className="h-8 w-8 text-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blueDeep">{firstUnlockedVideo ? firstUnlockedVideo.title : "Start with a topic preview"}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/68">
                  {accessLevel === "none"
                    ? "Choose partial or full access to unlock kid topic lessons."
                    : "Continue with the next unlocked topic lesson."}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar value={completion.progress || stats.progress} label="Overall topic progress" />
            </div>
            {firstUnlockedVideo ? (
              <a href={`/kid-dashboard/video/${firstUnlockedVideo.id}`} className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174]">
                Continue Lesson
              </a>
            ) : (
              <a href="#kid-payment-status" className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52]">
                Unlock Lessons
              </a>
            )}
          </div>

          <div id="kid-payment-status" className="scroll-mt-24">
            <KidPaymentOptions accessLevel={accessLevel} />
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Updates" title="Recent updates">
        <NotificationPanel notifications={notifications} returnPath="/kid-dashboard" />
      </Section>

      <Section tone="beige" eyebrow="Topic courses" title="Your Maths Topics">
        <KidTopicCourseList courses={courses} accessLevel={accessLevel} progress={progressRows} resources={resources} />
      </Section>

      <Section eyebrow="Practice support" title="Worksheets, downloads, and small wins">
        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard title="Worksheets and downloads">
            <div className="grid gap-3">
              {resources.length === 0 ? ["Topic worksheets", "Practice sheets", "Answer keys"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-beige/60 p-4">
                  <Download className="h-5 w-5 text-coral" />
                  <div>
                    <p className="font-bold text-blueDeep">{item}</p>
                    <p className="text-sm text-ink/65">Download placeholder</p>
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
          <DashboardCard title="Recently watched">
            <div className="grid gap-3">
              {allVideos.length === 0 ? (
                <div className="rounded-2xl bg-beige/60 p-4 text-sm font-semibold text-blueDeep">No lessons are available yet.</div>
              ) : null}
              {allVideos.slice(0, 3).map((video) => (
                <div key={video.id} className="flex items-center gap-3 rounded-2xl bg-beige/60 p-3 text-sm font-semibold text-blueDeep">
                  <PlayCircle className="h-5 w-5 text-coral" />
                  {video.title}
                </div>
              ))}
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
      </Section>

      <Section tone="beige" eyebrow="Orders" title="My Orders">
        <DashboardCard title="Recent orders">
          <RecentOrders initialOrders={orders} />
        </DashboardCard>
      </Section>
    </PageShell>
  );
}
