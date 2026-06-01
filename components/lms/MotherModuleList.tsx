import Link from "next/link";
import { CheckCircle2, ChevronDown, FileText, Lock, PlayCircle, Unlock } from "lucide-react";
import { canAccess, CourseModule, CourseResource, VideoProgress } from "@/lib/lms";
import { AccessLevel } from "@/lib/types";
import { ProgressBar } from "@/components/ProgressBar";

export function MotherModuleList({
  modules,
  accessLevel,
  progress = {},
  resources = [],
}: {
  modules: CourseModule[];
  accessLevel: AccessLevel;
  progress?: Record<string, VideoProgress>;
  resources?: CourseResource[];
}) {
  return (
    <div className="grid gap-5">
      {modules.map((module, index) => {
        const unlockedCount = module.videos.filter((video) => canAccess(video.required_access, accessLevel)).length;
        const moduleProgress = module.videos.length ? Math.round((unlockedCount / module.videos.length) * 100) : 0;
        const moduleLocked = unlockedCount === 0;

        return (
          <details key={module.id} className="group rounded-soft bg-white p-5 shadow-soft ring-1 ring-blueDeep/10" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-blueDeep">{module.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${moduleLocked ? "bg-beige text-ink/60" : "bg-gold/25 text-blueDeep"}`}>
                    {moduleLocked ? "Locked" : `${unlockedCount}/${module.videos.length} unlocked`}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">{module.description}</p>
                <div className="mt-4 max-w-md">
                  <ProgressBar value={moduleProgress} label="Module access" />
                </div>
              </div>
              <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-coral transition group-open:rotate-180" />
            </summary>

            <div className="mt-5 grid gap-3">
              {module.videos.map((video) => {
                const unlocked = canAccess(video.required_access, accessLevel);
                const completed = Boolean(progress[video.id]?.completed);
                const videoResources = resources.filter((resource) => resource.video_id === video.id || resource.module_id === module.id);

                return (
                  <article key={video.id} className={`rounded-[1.5rem] border p-4 ${unlocked ? "border-blueDeep/10 bg-white" : "border-blueDeep/5 bg-beige/45"}`}>
                    <div className="grid gap-4 sm:grid-cols-[128px_1fr]">
                      <div className={`grid aspect-video place-items-center rounded-2xl ${unlocked ? "bg-blueDeep/10 text-blueDeep" : "bg-white/70 text-ink/45"}`}>
                        {unlocked ? <PlayCircle className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
                      </div>
                      <div className={unlocked ? "" : "opacity-75"}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-blueDeep">{video.title}</h4>
                            <p className="mt-1 text-sm text-ink/65">{video.duration ?? "Lesson"} lesson</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${unlocked ? "bg-coral/10 text-coral" : "bg-white text-ink/60"}`}>
                            {completed ? <CheckCircle2 className="h-3 w-3" /> : unlocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                            {completed ? "Completed" : unlocked ? "Unlocked" : video.required_access === "full" ? "Full Access" : "Locked"}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-ink/65">{video.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {unlocked ? (
                            <Link href={`/mother-dashboard/video/${video.id}`} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-blueDeep px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#183174]">
                              <PlayCircle className="h-3.5 w-3.5" />
                              Watch lesson
                            </Link>
                          ) : (
                            <a href="#payment-status" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-blueDeep ring-1 ring-blueDeep/15 transition hover:bg-beige">
                              <Lock className="h-3.5 w-3.5" />
                              Upgrade to unlock
                            </a>
                          )}
                          <button
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-blueDeep ring-1 ring-blueDeep/15 disabled:cursor-not-allowed disabled:opacity-45"
                            disabled={!unlocked}
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Worksheet
                          </button>
                        </div>
                        {videoResources.length ? (
                          <div className="mt-3 grid gap-2">
                            {videoResources.slice(0, 2).map((resource) => {
                              const resourceUnlocked = canAccess(resource.required_access, accessLevel);
                              return (
                                <a
                                  key={resource.id}
                                  href={resourceUnlocked ? resource.file_url : "#payment-status"}
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
                    </div>
                  </article>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}
