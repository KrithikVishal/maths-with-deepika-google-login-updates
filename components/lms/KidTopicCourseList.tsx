import Link from "next/link";
import { CheckCircle2, FileText, Lock, PlayCircle, Sparkles, Unlock } from "lucide-react";
import { canAccess, CourseResource, LmsCourse, VideoProgress } from "@/lib/lms";
import { AccessLevel } from "@/lib/types";
import { ProgressBar } from "@/components/ProgressBar";

export function KidTopicCourseList({
  courses,
  accessLevel,
  progress = {},
  resources = [],
}: {
  courses: LmsCourse[];
  accessLevel: AccessLevel;
  progress?: Record<string, VideoProgress>;
  resources?: CourseResource[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {courses.map((course) => {
        const videos = course.modules.flatMap((module) => module.videos);
        const unlockedCount = videos.filter((video) => canAccess(video.required_access, accessLevel)).length;
        const courseProgress = videos.length ? Math.round((unlockedCount / videos.length) * 100) : 0;

        return (
          <article key={course.id} className="flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-borderSoft">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10">
                <Sparkles className="h-7 w-7 text-coral" />
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${unlockedCount ? "bg-gold/25 text-blueDeep" : "bg-beige text-ink/60"}`}>
                {unlockedCount ? `${unlockedCount}/${videos.length} unlocked` : "Locked"}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold leading-7 text-blueDeep">{course.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/68">{course.description}</p>
            <div className="mt-5">
              <ProgressBar value={courseProgress} label="Topic access" />
            </div>
            <div className="mt-5 grid gap-3">
              {course.modules.map((module) => (
                <div key={module.id} className="rounded-[1.25rem] bg-beige/55 p-3">
                  <p className="text-sm font-bold text-blueDeep">{module.title}</p>
                  <div className="mt-3 grid gap-2">
                    {module.videos.map((video) => {
                      const unlocked = canAccess(video.required_access, accessLevel);
                      const completed = Boolean(progress[video.id]?.completed);
                      const videoResources = resources.filter((resource) => resource.video_id === video.id || resource.module_id === module.id || resource.course_id === course.id);

                      return (
                        <div key={video.id} className="rounded-2xl bg-white p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-blueDeep">{video.title}</p>
                              <p className="mt-1 text-xs leading-5 text-ink/60">{video.duration ?? "Lesson"} lesson</p>
                            </div>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${unlocked ? "bg-coral/10 text-coral" : "bg-beige text-ink/60"}`}>
                              {unlocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                              {completed ? "Done" : unlocked ? "Open" : "Locked"}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {unlocked ? (
                              <Link href={`/kid-dashboard/video/${video.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-blueDeep px-3 py-2 text-xs font-bold text-white transition hover:bg-[#102A56]">
                                <PlayCircle className="h-3.5 w-3.5" />
                                Watch
                              </Link>
                            ) : (
                              <a href="#kid-payment-status" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blueDeep ring-1 ring-borderSoft transition hover:bg-beige">
                                <Lock className="h-3.5 w-3.5" />
                                Upgrade
                              </a>
                            )}
                            <button disabled={!unlocked} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blueDeep ring-1 ring-borderSoft disabled:cursor-not-allowed disabled:opacity-45">
                              {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                              {completed ? "Completed" : "Worksheet"}
                            </button>
                          </div>
                          {videoResources.length ? (
                            <div className="mt-3 grid gap-2">
                              {videoResources.slice(0, 2).map((resource) => {
                                const resourceUnlocked = canAccess(resource.required_access, accessLevel);
                                return (
                                  <a
                                    key={resource.id}
                                    href={resourceUnlocked ? resource.file_url : "#kid-payment-status"}
                                    className={`rounded-2xl px-3 py-2 text-xs font-bold ${resourceUnlocked ? "bg-beige text-blueDeep" : "bg-beige/60 text-ink/45"}`}
                                    aria-disabled={!resourceUnlocked}
                                  >
                                    {resourceUnlocked ? resource.title : `${resource.title} - locked`}
                                  </a>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
