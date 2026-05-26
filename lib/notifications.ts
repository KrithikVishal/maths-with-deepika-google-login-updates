import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type NotificationType =
  | "payment_success"
  | "access_unlocked"
  | "order_placed"
  | "order_shipped"
  | "lesson_completed"
  | "admin_message";

export type UserNotification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
};

export async function createNotification(input: {
  userId?: string | null;
  title: string;
  message: string;
  type: NotificationType;
}) {
  if (!input.userId) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("notifications").insert({
    user_id: input.userId,
    title: input.title,
    message: input.message,
    type: input.type,
    read: false,
  });
}

export async function getNotifications(userId: string, limit = 6) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, user_id, title, message, type, read, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<UserNotification[]>();

  if (error) return [];
  return data ?? [];
}

export async function markNotificationRead(notificationId: string, userId: string) {
  if (!notificationId || !userId) return;

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId)
    .eq("user_id", userId);
}
