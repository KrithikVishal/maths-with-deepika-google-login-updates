"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function markVideoCompleteAction(formData: FormData) {
  const role = String(formData.get("role") ?? "");
  const videoId = String(formData.get("video_id") ?? "");

  if (role !== "mother" && role !== "kid") return;
  if (!videoId) return;

  const profile = await requireRole(role);
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();

  await supabase.from("video_progress").upsert({
    user_id: profile.id,
    video_id: videoId,
    watched_seconds: 0,
    completed: true,
    completed_at: now,
    updated_at: now,
  }, { onConflict: "user_id,video_id" });

  await createNotification({
    userId: profile.id,
    type: "lesson_completed",
    title: "Lesson marked complete",
    message: "Lovely progress. Your lesson completion has been saved.",
  });

  revalidatePath("/student-dashboard");
  revalidatePath(`/student-dashboard/video/${videoId}`);
}

export async function updateAvatarAction(formData: FormData) {
  const avatarUrl = String(formData.get("avatar_url") ?? "");
  const profileId = String(formData.get("profile_id") ?? "");

  if (!avatarUrl || !profileId) return;

  const profile = await requireRole(["mother", "kid"]);
  if (profile.id !== profileId) return; // Basic security check

  const supabase = createSupabaseAdminClient();
  await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", profile.id);

  revalidatePath("/student-dashboard");
}
