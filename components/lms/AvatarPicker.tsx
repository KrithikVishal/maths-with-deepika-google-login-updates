"use client";

import { useState, useTransition } from "react";
import { UserRound } from "lucide-react";
import { updateAvatarAction } from "@/app/lms/actions";

const AVATARS = [
  "🦊", "🦁", "🐼", "🐸", "🐰", "🐯", "🐵", "🦄", "🦉", "🐙", "🐧", "🦖",
];

export function AvatarPicker({
  currentAvatar,
  profileId,
}: {
  currentAvatar?: string | null;
  profileId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (avatar: string) => {
    startTransition(() => {
      const form = new FormData();
      form.append("avatar_url", avatar);
      form.append("profile_id", profileId);
      updateAvatarAction(form).then(() => {
        setIsOpen(false);
      });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-beige text-2xl shadow-soft ring-1 ring-blueDeep/10 transition hover:bg-[#eadecc]"
        disabled={isPending}
      >
        {isPending ? "⏳" : currentAvatar || <UserRound className="h-6 w-6 text-coral" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-16 z-10 w-64 rounded-soft bg-white p-4 shadow-soft ring-1 ring-blueDeep/10">
          <h4 className="mb-3 text-sm font-bold text-blueDeep">Pick an avatar</h4>
          <div className="grid grid-cols-4 gap-2">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => handleSelect(avatar)}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-beige/50 text-xl transition hover:bg-beige"
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
