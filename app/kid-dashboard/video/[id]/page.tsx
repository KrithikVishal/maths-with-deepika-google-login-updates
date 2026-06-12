import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Lock, PlayCircle } from "lucide-react";
import { markVideoCompleteAction } from "@/app/lms/actions";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { ProgressBar } from "@/components/ProgressBar";
import { Section } from "@/components/Section";
import { requireRole } from "@/lib/auth";
import { canAccess, getCourseCollectionStats, getKidVideo, getResources, getVideoProgress, normalizeAccessLevel } from "@/lib/lms";
import { getEmbeddableVideoUrl } from "@/lib/video";

export default async function KidVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireRole("kid");
  const accessLevel = normalizeAccessLevel(profile.access_level);
  const { id } = await params;
  const lesson = await getKidVideo(id);

  if (!lesson) {
    notFound();
  }

  const unlocked = canAccess(lesson.video.required_access, accessLevel);

  if (!unlocked) {
    redirect("/kid-dashboard#kid-payment-status");
  }

  const stats = getCourseCollectionStats(lesson.courses, accessLevel);
  const progress = await getVideoProgress(profile.id, lesson.courses.flatMap((course) => course.modules.flatMap((module) => module.videos.map((video) => video.id))));
  const currentProgress = progress[lesson.video.id];
  const embedUrl = getEmbeddableVideoUrl(lesson.video.video_url);
  const activeCourse = lesson.courses.find((course) => course.id === lesson.video.course.id);
  const activeModuleIndex = activeCourse?.modules.findIndex((module) => module.id === lesson.video.module.id) ?? -1;
  const sidebarModules = [
    activeCourse?.modules[activeModuleIndex],
    activeModuleIndex >= 0 ? activeCourse?.modules[activeModuleIndex + 1] : undefined,
  ].filter((module): module is NonNullable<typeof activeCourse>["modules"][number] => Boolean(module));
  const resources = await getResources({
    courseIds: [lesson.video.course.id],
    moduleIds: [lesson.video.module.id],
    videoIds: [lesson.video.id],
  });

  return (
    <PageShell>
      <Section tone="beige" eyebrow={lesson.video.course.title} title="Course lesson" text="Watch the lesson, mark your progress, and continue when you are ready.">
        <Button href="/kid-dashboard" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
      </Section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(320px,0.32fr)] lg:px-8">
          <div className="grid content-start gap-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-black shadow-soft ring-1 ring-borderSoft">
              <div className="aspect-video text-white">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={lesson.video.title}
                    className="block h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="grid h-full place-items-center px-6 text-center">
                    <div>
                    <PlayCircle className="mx-auto h-16 w-16 text-gold" />
                    <h2 className="mt-5 text-2xl font-bold">Video placeholder</h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/75">Add the real video URL in Supabase later and it will show here.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-soft bg-white p-5 shadow-soft ring-1 ring-borderSoft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">{lesson.video.module.title}</p>
                  <h1 className="mt-2 text-2xl font-bold leading-tight text-blueDeep">{lesson.video.title}</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/68">
                    {lesson.video.description ?? "Small reminders, solved examples, and practice notes can be added here."}
                  </p>
                </div>
                <form action={markVideoCompleteAction} className="shrink-0">
                  <input type="hidden" name="role" value="kid" />
                  <input type="hidden" name="video_id" value={lesson.video.id} />
                  <button className="focus-ring inline-flex items-center gap-2 rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102A56]">
                    <CheckCircle2 className="h-4 w-4" />
                    {currentProgress?.completed ? "Completed" : "Mark as complete"}
                  </button>
                </form>
              </div>

              <div className="mt-5 grid gap-3 border-t border-borderSoft pt-4 md:grid-cols-2">
                <div className="rounded-2xl bg-beige/60 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-blueDeep">
                    <FileText className="h-4 w-4 text-coral" />
                    Practice notes
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink/68">Revise the idea and mark it complete after watching.</p>
                </div>
                <div className="rounded-2xl bg-beige/60 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-blueDeep">
                    <Download className="h-4 w-4 text-coral" />
                    Worksheet
                  </div>
                  <div className="mt-2 grid gap-2 text-sm leading-6 text-ink/68">
                  {resources.length === 0 ? <p>Topic worksheets will appear here when uploaded.</p> : null}
                  {resources.map((resource) => {
                    const resourceUnlocked = canAccess(resource.required_access, accessLevel);
                    return (
                      <a key={resource.id} href={resourceUnlocked ? resource.file_url : "/kid-dashboard#kid-payment-status"} className={`rounded-xl bg-white px-3 py-2 text-xs font-bold ${resourceUnlocked ? "text-blueDeep" : "text-ink/45"}`}>
                        {resourceUnlocked ? resource.title : `${resource.title} - locked`}
                      </a>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {lesson.previousVideo && canAccess(lesson.previousVideo.required_access, accessLevel) ? (
                <Link href={`/kid-dashboard/video/${lesson.previousVideo.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-borderSoft hover:bg-beige">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </Link>
              ) : <span />}
              {lesson.nextVideo && canAccess(lesson.nextVideo.required_access, accessLevel) ? (
                <Link href={`/kid-dashboard/video/${lesson.nextVideo.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#102A56]">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="grid gap-5 self-start lg:sticky lg:top-24">
            <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-borderSoft">
              <h3 className="font-bold text-blueDeep">Topic progress</h3>
              <div className="mt-4">
                <ProgressBar value={stats.progress} />
              </div>
              <p className="mt-3 text-sm text-ink/65">{stats.unlocked} of {stats.total} lessons unlocked</p>
            </div>

            <div className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-soft bg-white p-5 shadow-soft ring-1 ring-borderSoft">
              <h3 className="font-bold text-blueDeep">Topic sidebar</h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-beige/55 p-3">
                  <p className="text-sm font-bold leading-5 text-blueDeep">{lesson.video.course.title}</p>
                  <div className="mt-3 grid gap-2">
                      {sidebarModules.map((module) => {
                        const isActiveModule = module.id === lesson.video.module.id;
                        return (
                        <details key={module.id} open={isActiveModule} className={`rounded-xl p-2 ${isActiveModule ? "bg-white ring-1 ring-coral/20" : "bg-white/65 ring-1 ring-borderSoft"}`}>
                          <summary className="cursor-pointer list-none text-xs font-bold leading-4 text-blueDeep">
                            {module.title}
                            <span className="mt-1 block text-[11px] font-semibold text-ink/55">{module.videos.length} lessons</span>
                          </summary>
                          <div className="mt-2 grid gap-2">
                      {module.videos.map((video) => {
                        const isUnlocked = canAccess(video.required_access, accessLevel);
                        const isCurrent = video.id === lesson.video.id;

                        return (
                          <Link
                            key={video.id}
                            href={isUnlocked ? `/kid-dashboard/video/${video.id}` : "/kid-dashboard#kid-payment-status"}
                            className={`flex items-start gap-2 rounded-xl px-3 py-2 text-xs font-bold leading-4 transition ${isCurrent ? "bg-blueDeep text-white" : "bg-white text-blueDeep hover:bg-beige"}`}
                          >
                            {progress[video.id]?.completed ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : isUnlocked ? <PlayCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                            <span>{video.title}</span>
                          </Link>
                        );
                      })}
                          </div>
                        </details>
                        );
                      })}
                  </div>
                  <Link href="/kid-dashboard" className="focus-ring mt-3 block rounded-full border border-blueDeep/15 bg-white px-4 py-3 text-center text-sm font-bold text-blueDeep shadow-sm transition hover:bg-beige">
                    Browse all modules
                  </Link>
                  </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
