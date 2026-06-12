"use client";

import { Download, Lock, Play, Unlock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

export function LessonCard({ lesson }: { lesson: { title: string; duration: string; complete: boolean; locked: boolean; progress: number } }) {
  function downloadFile(type: "PDF" | "Worksheet") {
    const text = `${type} for ${lesson.title}\n\nThis is a sample download for the frontend experience.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${lesson.title.toLowerCase().replaceAll(" ", "-")}-${type.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article className={`rounded-soft border p-4 transition ${lesson.locked ? "border-borderSoft bg-beige/50" : "border-borderSoft bg-white shadow-sm hover:shadow-soft"}`}>
      <div className="grid gap-4 sm:grid-cols-[136px_1fr]">
        <div className="grid aspect-video place-items-center rounded-2xl bg-blueDeep/10 text-blueDeep">
          {lesson.locked ? <Lock className="h-7 w-7" /> : <Play className="h-7 w-7" />}
        </div>
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-blueDeep">{lesson.title}</h4>
              <p className="mt-1 text-sm text-ink/65">{lesson.duration} lesson</p>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${lesson.locked ? "bg-white text-ink/60" : lesson.complete ? "bg-gold/25 text-blueDeep" : "bg-coral/10 text-coral"}`}>
              {lesson.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              {lesson.locked ? "Locked" : lesson.complete ? "Complete" : "Unlocked"}
            </span>
          </div>
          <div className="mt-4">
            <ProgressBar value={lesson.progress} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button disabled={lesson.locked} onClick={() => downloadFile("PDF")} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blueDeep ring-1 ring-borderSoft disabled:cursor-not-allowed disabled:opacity-45">
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
            <button disabled={lesson.locked} onClick={() => downloadFile("Worksheet")} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blueDeep ring-1 ring-borderSoft disabled:cursor-not-allowed disabled:opacity-45">
              <Download className="h-3.5 w-3.5" />
              Worksheet
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
