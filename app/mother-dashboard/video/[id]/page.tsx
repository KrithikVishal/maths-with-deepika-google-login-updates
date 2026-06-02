import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Lock, PlayCircle } from "lucide-react";
import { markVideoCompleteAction } from "@/app/lms/actions";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { Section } from "@/components/Section";
import { requireRole } from "@/lib/auth";
import { canAccess, getCourseStats, getMotherVideo, getResources, getVideoProgress, normalizeAccessLevel } from "@/lib/lms";

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    // Already an embed URL
    if (u.pathname.startsWith("/embed/")) return url;
    // youtu.be short link
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    // youtube.com/watch?v=...
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
  } catch {
    // not a valid URL – return as-is
  }
  return url;
}

export default async function MotherVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireRole("mother");
  const accessLevel = normalizeAccessLevel(profile.access_level);
  const { id } = await params;
  const lesson = await getMotherVideo(id);

  if (!lesson) {
    notFound();
  }

  const unlocked = canAccess(lesson.video.required_access, accessLevel);

  if (!unlocked) {
    redirect("/mother/dashboard#payment-status");
  }

  const stats = getCourseStats(lesson.modules, accessLevel);
  const progress = await getVideoProgress(profile.id, lesson.modules.flatMap((module) => module.videos.map((video) => video.id)));
  const currentProgress = progress[lesson.video.id];
  const resources = await getResources({
    courseIds: ["m2m-program"],
    moduleIds: [lesson.video.module.id],
    videoIds: [lesson.video.id],
  });

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Lesson player" title={lesson.video.title} text={lesson.video.description ?? "Watch the lesson, revise gently, and use the resources when they are ready."}>
        <Button href="/mother/dashboard" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
      </Section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.72fr_0.28fr] lg:px-8">
          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] bg-blueDeep shadow-soft">
              <div className="grid aspect-video place-items-center text-white">
                {lesson.video.video_url ? (
                  <iframe src={toEmbedUrl(lesson.video.video_url)} title={lesson.video.title} className="h-full w-full" allowFullScreen />
                ) : (
                  <div className="px-6 text-center">
                    <PlayCircle className="mx-auto h-16 w-16 text-gold" />
                    <h2 className="mt-5 text-2xl font-bold">Video placeholder</h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/75">Add the real video URL in Supabase later and it will show here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
                <FileText className="h-7 w-7 text-coral" />
                <h3 className="mt-4 text-xl font-bold text-blueDeep">Notes</h3>
                <p className="mt-3 text-sm leading-6 text-ink/68">Lesson notes, teaching points, and practice reminders can be added here.</p>
                <form action={markVideoCompleteAction} className="mt-5">
                  <input type="hidden" name="role" value="mother" />
                  <input type="hidden" name="video_id" value={lesson.video.id} />
                  <button className="focus-ring inline-flex items-center gap-2 rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174]">
                    <CheckCircle2 className="h-4 w-4" />
                    {currentProgress?.completed ? "Completed" : "Mark as complete"}
                  </button>
                </form>
              </div>
              <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
                <Download className="h-7 w-7 text-coral" />
                <h3 className="mt-4 text-xl font-bold text-blueDeep">Resources</h3>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-ink/68">
                  {resources.length === 0 ? <p>PDFs, worksheets, answer keys, and revision files will appear here.</p> : null}
                  {resources.map((resource) => {
                    const resourceUnlocked = canAccess(resource.required_access, accessLevel);
                    return (
                      <a key={resource.id} href={resourceUnlocked ? resource.file_url : "/mother/dashboard#payment-status"} className={`rounded-2xl px-4 py-3 font-bold ${resourceUnlocked ? "bg-beige text-blueDeep" : "bg-beige/60 text-ink/45"}`}>
                        {resourceUnlocked ? resource.title : `${resource.title} - locked`}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-soft bg-beige/65 p-5">
              {lesson.previousVideo ? (
                <Link href={`/mother-dashboard/video/${lesson.previousVideo.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 hover:bg-beige">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </Link>
              ) : <span />}
              {lesson.nextVideo && canAccess(lesson.nextVideo.required_access, accessLevel) ? (
                <Link href={`/mother-dashboard/video/${lesson.nextVideo.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#183174]">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="grid gap-5 self-start lg:sticky lg:top-24">
            <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
              <h3 className="font-bold text-blueDeep">Course progress</h3>
              <div className="mt-4">
                <ProgressBar value={stats.progress} />
              </div>
              <p className="mt-3 text-sm text-ink/65">{stats.unlocked} of {stats.total} lessons unlocked</p>
            </div>

            <div className="rounded-soft bg-white p-5 shadow-soft ring-1 ring-blueDeep/10">
              <h3 className="font-bold text-blueDeep">Module navigation</h3>
              <div className="mt-4 grid gap-3">
                {lesson.modules.map((module) => (
                  <div key={module.id} className="rounded-2xl bg-beige/55 p-3">
                    <p className="text-sm font-bold text-blueDeep">{module.title}</p>
                    <div className="mt-3 grid gap-2">
                      {module.videos.map((video) => {
                        const isUnlocked = canAccess(video.required_access, accessLevel);
                        const isCurrent = video.id === lesson.video.id;

                        return (
                          <Link
                            key={video.id}
                            href={isUnlocked ? `/mother-dashboard/video/${video.id}` : "/mother/dashboard#payment-status"}
                            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${isCurrent ? "bg-blueDeep text-white" : "bg-white text-blueDeep hover:bg-beige"}`}
                          >
                            {progress[video.id]?.completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : isUnlocked ? <PlayCircle className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                            {video.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
