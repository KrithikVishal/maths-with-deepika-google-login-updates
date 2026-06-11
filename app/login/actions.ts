"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { Profile, roleDashboard, UserRole } from "@/lib/types";

export type LoginState = {
  message?: string;
};

function isExpectedRoleValid(value: string): boolean {
  return ["admin", "mother", "kid", "student"].includes(value);
}

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const expectedRole = String(formData.get("expected_role") ?? "student");

  if (!email || !password) {
    return { message: "Please enter your email and password." };
  }

  if (!isExpectedRoleValid(expectedRole)) {
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

  if (expectedRole === "admin" && profile.role !== "admin") {
    await supabase.auth.signOut();
    return { message: "Please use the admin login page." };
  }
  
  if (expectedRole === "student" && profile.role === "admin") {
    await supabase.auth.signOut();
    return { message: "You appear to be an admin — please sign in using the admin login page." };
  }

  redirect(roleDashboard[profile.role]);
}

export async function googleLoginAction(formData: FormData) {
  const expectedRole = String(formData.get("expected_role") ?? "student");

  if (!isExpectedRoleValid(expectedRole)) {
    redirect("/login?error=role");
  }

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    redirect(expectedRole === "admin" ? "/admin-login?error=auth-config" : `/login?error=auth-config`);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?expected_role=${expectedRole}`,
    },
  });

  if (error || !data.url) {
    redirect(expectedRole === "admin" ? "/admin-login?error=oauth" : `/login?error=oauth`);
  }

  redirect(data.url);
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

    // Fire-and-forget: email errors must not fail a successful registration
    import("@/lib/email").then(({ sendWelcomeEmail }) => {
      void sendWelcomeEmail({ to: email, name: fullName }).catch((err) =>
        console.error("sendWelcomeEmail failed:", err)
      );
    });

  } catch {
    return { message: "Registration is not configured yet. Please add Supabase environment values." };
  }

  redirect(roleDashboard[role]);
}
