"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { sendAccessUnlockedEmail, sendShippingUpdateEmail, sendWelcomeEmail } from "@/lib/email";
import { createNotification } from "@/lib/notifications";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { accessLevels, roles, statuses, type AccessLevel, type UserRole, type UserStatus } from "@/lib/types";
import type { OrderStatus } from "@/lib/types";
import { sendWhatsAppAccessUnlocked, sendWhatsAppOrderShipped } from "@/lib/whatsapp";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

type MemberPayload = {
  full_name: string;
  email: string;
  username: string;
  phone: string;
  role: UserRole;
  access_level: AccessLevel;
  status: UserStatus;
};

function cleanMemberPayload(formData: FormData): MemberPayload {
  const role = String(formData.get("role") ?? "mother") as UserRole;
  const status = String(formData.get("status") ?? "active") as UserStatus;
  const accessLevel = String(formData.get("access_level") ?? "none") as AccessLevel;

  if (!roles.includes(role)) {
    throw new Error("Please choose a valid role.");
  }

  if (!statuses.includes(status)) {
    throw new Error("Please choose a valid status.");
  }

  if (!accessLevels.includes(accessLevel)) {
    throw new Error("Please choose a valid access level.");
  }

  return {
    full_name: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    username: String(formData.get("username") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    role,
    access_level: accessLevel,
    status,
  };
}

function messageRedirect(message: string, type: "success" | "error" = "success"): never {
  revalidatePath("/admin/dashboard");
  redirect(`/admin/dashboard?memberMessage=${encodeURIComponent(message)}&memberType=${type}`);
}

async function findAuthUserByEmail(supabase: ReturnType<typeof createSupabaseAdminClient>, email: string) {
  let page = 1;

  while (page <= 10) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
    if (error) {
      throw new Error(error.message);
    }

    const found = data.users.find((user) => user.email?.toLowerCase() === email);
    if (found) {
      return found;
    }

    if (data.users.length < 100) {
      return null;
    }

    page += 1;
  }

  return null;
}

export async function addMemberAction(formData: FormData) {
  await requireRole("admin");

  let payload: MemberPayload;
  try {
    payload = cleanMemberPayload(formData);
  } catch (error) {
    messageRedirect(error instanceof Error ? error.message : "Please check the member details.", "error");
  }

  const temporaryPassword = String(formData.get("temporary_password") ?? "");

  if (!payload.full_name || !payload.email || !payload.username || !temporaryPassword) {
    messageRedirect("Full name, email, username, and temporary password are required.", "error");
  }

  if (temporaryPassword.length < 8) {
    messageRedirect("Temporary password must be at least 8 characters.", "error");
  }

  const supabase = createSupabaseAdminClient();
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: payload.email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: {
      full_name: payload.full_name,
      username: payload.username,
      role: payload.role,
    },
  });

  let user = authUser.user;
  let usedExistingUser = false;

  if (authError || !user) {
    try {
      const existingUser = await findAuthUserByEmail(supabase, payload.email);

      if (!existingUser) {
        messageRedirect(authError?.message ?? "Could not create login for this member.", "error");
      }

      usedExistingUser = true;
      const { data: updatedAuthUser, error: updateAuthError } = await supabase.auth.admin.updateUserById(existingUser.id, {
        email: payload.email,
        password: temporaryPassword,
        email_confirm: true,
        user_metadata: {
          full_name: payload.full_name,
          username: payload.username,
          role: payload.role,
        },
      });

      if (updateAuthError || !updatedAuthUser.user) {
        messageRedirect(updateAuthError?.message ?? "Could not update login for this member.", "error");
      }

      user = updatedAuthUser.user;
    } catch (error) {
      messageRedirect(error instanceof Error ? error.message : "Could not check existing auth users.", "error");
    }
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: payload.full_name,
    email: payload.email,
    username: payload.username,
    phone: payload.phone,
    role: payload.role,
    access_level: payload.access_level,
    status: payload.status,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    messageRedirect(profileError.message, "error");
  }

  await sendWelcomeEmail({ to: payload.email, name: payload.full_name, message: "Admin-created account is ready." });
  if (payload.access_level !== "none") {
    await createNotification({
      userId: user.id,
      type: "access_unlocked",
      title: `${payload.access_level === "full" ? "Full" : "Partial"} access is ready`,
      message: "Your learning access has been set by the admin. You can continue from your dashboard.",
    });
    await sendAccessUnlockedEmail({ to: payload.email, name: payload.full_name, message: `${payload.access_level} access assigned by admin.` });
    await sendWhatsAppAccessUnlocked({ phone: payload.phone, name: payload.full_name, message: `${payload.access_level} access assigned by admin.` });
  }

  messageRedirect(usedExistingUser ? "Existing login found. Profile updated successfully." : "Member added successfully.");
}

export async function updateMemberAction(formData: FormData) {
  await requireRole("admin");

  const id = String(formData.get("id") ?? "");
  if (!id) {
    messageRedirect("Missing member id.", "error");
  }

  let payload: MemberPayload;
  try {
    payload = cleanMemberPayload(formData);
  } catch (error) {
    messageRedirect(error instanceof Error ? error.message : "Please check the member details.", "error");
  }

  if (!payload.full_name || !payload.email) {
    messageRedirect("Full name and email are required.", "error");
  }

  const supabase = createSupabaseAdminClient();
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", id)
    .single<{ access_level: AccessLevel | null }>();

  const { error: authError } = await supabase.auth.admin.updateUserById(id, {
    email: payload.email,
    user_metadata: {
      full_name: payload.full_name,
      username: payload.username,
      role: payload.role,
    },
  });

  if (authError) {
    messageRedirect(authError.message, "error");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: payload.full_name,
      email: payload.email,
      username: payload.username,
      phone: payload.phone,
      role: payload.role,
      access_level: payload.access_level,
      status: payload.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (profileError) {
    messageRedirect(profileError.message, "error");
  }

  if (payload.access_level !== "none" && currentProfile?.access_level !== payload.access_level) {
    await createNotification({
      userId: id,
      type: "access_unlocked",
      title: `${payload.access_level === "full" ? "Full" : "Partial"} access updated`,
      message: "Your learning access was updated by the admin. You can continue from your dashboard.",
    });
    await sendAccessUnlockedEmail({ to: payload.email, name: payload.full_name, message: `${payload.access_level} access assigned by admin.` });
    await sendWhatsAppAccessUnlocked({ phone: payload.phone, name: payload.full_name, message: `${payload.access_level} access assigned by admin.` });
  }

  messageRedirect("Member updated successfully.");
}

export async function toggleMemberStatusAction(formData: FormData) {
  await requireRole("admin");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as UserStatus;

  if (!id || !statuses.includes(status)) {
    messageRedirect("Could not update member status.", "error");
  }

  const nextStatus: UserStatus = status === "active" ? "inactive" : "active";
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("profiles")
    .update({ status: nextStatus, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    messageRedirect(error.message, "error");
  }

  messageRedirect(`Member ${nextStatus === "active" ? "activated" : "deactivated"} successfully.`);
}

export async function updateOrderAction(orderId: string, updates: { status?: OrderStatus; trackingId?: string; courierName?: string; trackingUrl?: string }) {
  await requireRole("admin");

  if (!orderId) {
    return { ok: false, message: "Missing order id." };
  }

  const allowedStatuses: OrderStatus[] = ["Placed", "Packed", "Shipped", "Delivered", "Cancelled"];
  const payload: { status?: OrderStatus; order_status?: string; tracking_id?: string | null; courier_name?: string | null; tracking_url?: string | null; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };

  if (updates.status) {
    if (!allowedStatuses.includes(updates.status)) {
      return { ok: false, message: "Invalid order status." };
    }
    payload.status = updates.status;
    payload.order_status = updates.status.toLowerCase();
  }

  if (typeof updates.trackingId === "string") {
    payload.tracking_id = updates.trackingId.trim() || null;
  }

  if (typeof updates.courierName === "string") {
    payload.courier_name = updates.courierName.trim() || null;
  }

  if (typeof updates.trackingUrl === "string") {
    const trackingId = updates.trackingId?.trim();
    const courierName = updates.courierName?.trim();
    payload.tracking_url = updates.trackingUrl.trim()
      || (courierName?.toLowerCase() === "delhivery" && trackingId ? `https://www.delhivery.com/track/package/${trackingId}` : null);
  }

  const supabase = createSupabaseAdminClient();
  const { data: orderBeforeUpdate } = await supabase
    .from("orders")
    .select("user_id, customer_name, customer_email, customer_phone")
    .eq("id", orderId)
    .single<{ user_id: string | null; customer_name: string | null; customer_email: string | null; customer_phone: string | null }>();
  const { error } = await supabase.from("orders").update(payload).eq("id", orderId);

  if (error) {
    return { ok: false, message: error.message };
  }

  if (updates.status === "Shipped" || payload.tracking_id) {
    await createNotification({
      userId: orderBeforeUpdate?.user_id,
      type: "order_shipped",
      title: "Your order has a shipping update",
      message: payload.tracking_id
        ? `Tracking ID ${payload.tracking_id} has been added for your order.`
        : "Your order has been marked as shipped.",
    });
    await sendShippingUpdateEmail({
      to: orderBeforeUpdate?.customer_email,
      name: orderBeforeUpdate?.customer_name,
      orderId,
      message: payload.tracking_id ? `Tracking ID: ${payload.tracking_id}` : "Order shipped.",
    });
    await sendWhatsAppOrderShipped({
      phone: orderBeforeUpdate?.customer_phone,
      name: orderBeforeUpdate?.customer_name,
      orderId,
      message: payload.tracking_id ? `Tracking ID: ${payload.tracking_id}` : "Order shipped.",
    });
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
  return { ok: true, message: "Order updated." };
}

export async function addCourseAction(formData: FormData) {
  await requireRole("admin");
  const title = String(formData.get("title") ?? "").trim();
  const audience = String(formData.get("audience") ?? "mother");
  const courseType = String(formData.get("course_type") ?? "program");
  const description = String(formData.get("description") ?? "").trim();
  const orderIndex = Number(formData.get("order_index") ?? 0);

  if (!title || !["mother", "kid"].includes(audience) || !["program", "topic"].includes(courseType)) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("courses").upsert({
    id: slugify(title) || crypto.randomUUID(),
    title,
    description,
    audience,
    course_type: courseType,
    order_index: Number.isFinite(orderIndex) ? orderIndex : 0,
  });
  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
}

export async function addModuleAction(formData: FormData) {
  await requireRole("admin");
  const courseId = String(formData.get("course_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const orderIndex = Number(formData.get("order_index") ?? 0);

  if (!courseId || !title) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("course_modules").upsert({
    id: `${courseId}-${slugify(title) || crypto.randomUUID()}`,
    course_id: courseId,
    title,
    description,
    order_index: Number.isFinite(orderIndex) ? orderIndex : 0,
  });
  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
}

export async function addVideoAction(formData: FormData) {
  await requireRole("admin");
  const moduleId = String(formData.get("module_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();
  const thumbnailUrl = String(formData.get("thumbnail_url") ?? "").trim();
  const requiredAccess = String(formData.get("required_access") ?? "full") as AccessLevel;
  const orderIndex = Number(formData.get("order_index") ?? 0);

  if (!moduleId || !title || (requiredAccess !== "partial" && requiredAccess !== "full")) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("course_videos").upsert({
    id: `${moduleId}-${slugify(title) || crypto.randomUUID()}`,
    module_id: moduleId,
    title,
    description,
    video_url: videoUrl || null,
    thumbnail: thumbnailUrl || null,
    thumbnail_url: thumbnailUrl || null,
    required_access: requiredAccess,
    order_index: Number.isFinite(orderIndex) ? orderIndex : 0,
  });
  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
}

export async function addResourceAction(formData: FormData) {
  await requireRole("admin");
  const title = String(formData.get("title") ?? "").trim();
  const fileUrl = String(formData.get("file_url") ?? "").trim();
  const fileType = String(formData.get("file_type") ?? "pdf").trim();
  const courseId = String(formData.get("course_id") ?? "").trim() || null;
  const moduleId = String(formData.get("module_id") ?? "").trim() || null;
  const videoId = String(formData.get("video_id") ?? "").trim() || null;
  const requiredAccess = String(formData.get("required_access") ?? "full") as AccessLevel;

  if (!title || !fileUrl || (requiredAccess !== "partial" && requiredAccess !== "full")) return;
  if (!courseId && !moduleId && !videoId) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("course_resources").insert({
    course_id: courseId,
    module_id: moduleId,
    video_id: videoId,
    title,
    file_url: fileUrl,
    file_type: fileType,
    required_access: requiredAccess,
  });
  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
}

export async function deleteLmsItemAction(formData: FormData) {
  await requireRole("admin");
  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "");
  const allowed = ["courses", "course_modules", "course_videos", "course_resources"];
  if (!allowed.includes(table) || !id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/mother/dashboard");
  revalidatePath("/kid-dashboard");
}
