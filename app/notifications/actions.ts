"use server";

import { revalidatePath } from "next/cache";
import { getCurrentProfile } from "@/lib/auth";
import { markNotificationRead } from "@/lib/notifications";

export async function markNotificationReadAction(formData: FormData) {
  const notificationId = String(formData.get("notification_id") ?? "");
  const returnPath = String(formData.get("return_path") ?? "/");
  const profile = await getCurrentProfile();

  if (!profile || !notificationId) return;

  await markNotificationRead(notificationId, profile.id);
  revalidatePath(returnPath);
}
