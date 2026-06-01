import { BookOpenCheck, CreditCard, Lock, PlayCircle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { ProgressBar } from "@/components/ProgressBar";
import { AccessLevel } from "@/lib/types";

export function MotherLmsSummary({
  accessLevel,
  total,
  unlocked,
  locked,
  progress,
}: {
  accessLevel: AccessLevel;
  total: number;
  unlocked: number;
  locked: number;
  progress: number;
}) {
  const accessLabel = accessLevel === "full" ? "Full Access" : accessLevel === "partial" ? "Partial Access" : "No Access";

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <DashboardCard title="Course access" value={accessLabel} note="M2M learning access">
        <CreditCard className="h-6 w-6 text-coral" />
      </DashboardCard>
      <DashboardCard title="Unlocked lessons" value={`${unlocked}`} note={`${total} total lessons`}>
        <PlayCircle className="h-6 w-6 text-coral" />
      </DashboardCard>
      <DashboardCard title="Locked lessons" value={`${locked}`} note="Upgrade to unlock more">
        <Lock className="h-6 w-6 text-coral" />
      </DashboardCard>
      <DashboardCard title="Course progress" value={`${progress}%`} note="Access-based progress">
        <BookOpenCheck className="h-6 w-6 text-coral" />
        <div className="mt-4">
          <ProgressBar value={progress} />
        </div>
      </DashboardCard>
    </div>
  );
}
