"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { Profile, roleDashboard, UserRole } from "@/lib/types";

export type LoginState = {
  message?: string;
};

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const expectedRole = String(formData.get("expected_role") ?? "mother") as UserRole;

  if (!email || !password) {
    return { message: "Please enter your email and password." };
  }

  if (!["admin", "mother", "kid"].includes(expectedRole)) {
    return { message: "Please choose a valid login type." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: "Login failed. Please check your email and password." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Login failed. Please try again." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile) {
    await supabase.auth.signOut();
    return { message: "Your profile is not ready yet. Please contact the admin." };
  }

  if (profile.status !== "active") {
    await supabase.auth.signOut();
    return { message: "This account is inactive. Please contact the admin." };
  }

  if (profile.role !== expectedRole) {
    await supabase.auth.signOut();
    if (profile.role === "admin") {
      return { message: "Please use the admin login page." };
    }
    return { message: `This account is registered as ${profile.role}. Please choose the correct login type.` };
  }

  redirect(roleDashboard[profile.role]);
}

export async function registerStudentAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");
  const role = String(formData.get("role") ?? "mother") as UserRole;

  if (!fullName || !email || !phone || !username || !password || !confirmPassword) {
    return { message: "Please fill all registration fields." };
  }

  if (!["mother", "kid"].includes(role)) {
    return { message: "Public signup is only for mothers and kids." };
  }

  if (password.length < 8) {
    return { message: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match." };
  }

  try {
    const admin = createSupabaseAdminClient();
    const { data: authUser, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        username,
        role,
      },
    });

    if (createError || !authUser.user) {
      return { message: createError?.message ?? "Could not create your account." };
    }

    const { error: profileError } = await admin.from("profiles").upsert({
      id: authUser.user.id,
      full_name: fullName,
      email,
      username,
      phone,
      role,
      status: "active",
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      return { message: profileError.message };
    }

    const supabase = await createSupabaseServerClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      return { message: "Account created. Please log in with your new details." };
    }
  } catch {
    return { message: "Registration is not configured yet. Please add Supabase environment values." };
  }

  redirect(roleDashboard[role]);
}
