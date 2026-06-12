"use client";

import { Award, Flame, Sparkles, Star, Target, Zap } from "lucide-react";
import { VideoProgress } from "@/lib/lms";

export function StudentBadges({ progressRows }: { progressRows: Record<string, VideoProgress> }) {
  const completedCount = Object.values(progressRows).filter((p) => p.completed).length;

  const badges = [
    {
      id: "first-step",
      name: "First Step",
      description: "Completed your first lesson",
      icon: Star,
      unlocked: completedCount >= 1,
      color: "bg-gold/20 text-gold",
      activeColor: "bg-gold text-blueDeep",
    },
    {
      id: "steady-learner",
      name: "Steady Learner",
      description: "Completed 5 lessons",
      icon: Target,
      unlocked: completedCount >= 5,
      color: "bg-coral/20 text-coral",
      activeColor: "bg-coral text-white",
    },
    {
      id: "high-flyer",
      name: "High Flyer",
      description: "Completed 10 lessons",
      icon: Flame,
      unlocked: completedCount >= 10,
      color: "bg-blueDeep/20 text-blueDeep",
      activeColor: "bg-blueDeep text-white",
    },
    {
      id: "master",
      name: "M2M Master",
      description: "Completed 25 lessons",
      icon: Award,
      unlocked: completedCount >= 25,
      color: "bg-ink/10 text-ink/60",
      activeColor: "bg-[#183174] text-white",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.id}
            className={`flex items-center gap-4 rounded-[1.5rem] p-4 transition ${
              badge.unlocked ? "bg-white shadow-soft ring-1 ring-blueDeep/10" : "bg-beige/60 opacity-70"
            }`}
          >
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${badge.unlocked ? badge.activeColor : badge.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className={`font-bold ${badge.unlocked ? "text-blueDeep" : "text-ink/65"}`}>{badge.name}</p>
              <p className="text-xs text-ink/65">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
