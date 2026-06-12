"use client";

import { useTransition } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";

export function CompletionButton({
  isCompleted,
  videoId,
  role,
  markCompleteAction,
}: {
  isCompleted: boolean;
  videoId: string;
  role: string;
  markCompleteAction: (formData: FormData) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await markCompleteAction(formData);

        if (!isCompleted) {
          // Fire confetti only after the action succeeds
          const end = Date.now() + 1.5 * 1000;
          const colors = ["#F4B731", "#E67E73", "#1B2A53"];

          (function frame() {
            confetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: colors,
            });
            confetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: colors,
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          })();
        }
      } catch (err) {
        console.error("Failed to mark lesson complete:", err);
      }
    });
  };

  return (
    <form action={handleAction} className="mt-5">
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="video_id" value={videoId} />
      <button
        disabled={isPending}
        className={`focus-ring inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition disabled:opacity-70 ${
          isCompleted
            ? "bg-gold text-blueDeep hover:bg-[#e0a62b]"
            : "bg-blueDeep text-white hover:bg-[#183174]"
        }`}
      >
        <CheckCircle2 className="h-4 w-4" />
        {isPending ? "Updating..." : isCompleted ? "Completed" : "Mark as complete"}
      </button>
    </form>
  );
}
