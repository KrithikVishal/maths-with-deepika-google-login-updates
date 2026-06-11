import { NextResponse } from "next/server";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { roleDashboard, type Profile, type UserRole } from "@/lib/types";

function isUserRole(value: string): value is UserRole {
  return ["admin", "mother", "kid"].includes(value);
}

function loginUrl(request: Request, role: UserRole, error: string) {
  const url = new URL(role === "admin" ? "/admin-login" : "/login", request.url);
  url.searchParams.set("error", error);

  if (role !== "admin") {
    url.searchParams.set("role", role);
  }

  return url;
}

function profileFromGoogleUser(user: {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    email?: string;
    full_name?: string;
    name?: string;
    preferred_username?: string;
  };
}, role: Exclude<UserRole, "admin">) {
  const email = (user.email ?? user.user_metadata?.email ?? "").trim().toLowerCase();
  const fullName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? email.split("@")[0] ?? "Learner";
  const usernameBase = user.user_metadata?.preferred_username ?? email.split("@")[0] ?? `learner-${user.id.slice(0, 8)}`;

  return {
    id: user.id,
    full_name: fullName,
    email,
    username: `${usernameBase}`.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").slice(0, 40) || `learner-${user.id.slice(0, 8)}`,
    phone: null,
    role,
    status: "active" as const,
    access_level: "none" as const,
    updated_at: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const expectedRoleParam = requestUrl.searchParams.get("expected_role") ?? "student";
  
  // If "student", default new signups to "mother"
  const expectedRole = expectedRoleParam === "student" ? "mother" : (isUserRole(expectedRoleParam) ? expectedRoleParam : "mother");

  if (!code) {
    return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "oauth"));
  }

  const supabase = await createSupabaseServerClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "oauth"));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "oauth"));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  let activeProfile = profile;

  if (!activeProfile && expectedRoleParam !== "admin") {
    const admin = createSupabaseAdminClient();
    const profilePayload = profileFromGoogleUser(user, expectedRole as Exclude<UserRole, "admin">);

    if (!profilePayload.email) {
      await supabase.auth.signOut();
      return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "oauth-email"));
    }

    // Ensure the username is unique to prevent unique constraint violations on signup
    let uniqueUsername = profilePayload.username;
    let usernameExists = true;
    let attempt = 0;

    while (usernameExists && attempt < 10) {
      const checkUsername = attempt === 0 ? uniqueUsername : `${uniqueUsername}-${Math.floor(Math.random() * 1000)}`;
      const { data: existingUser } = await admin
        .from("profiles")
        .select("id")
        .eq("username", checkUsername)
        .maybeSingle();

      if (!existingUser || existingUser.id === user.id) {
        profilePayload.username = checkUsername;
        usernameExists = false;
      }
      attempt++;
    }

    const { data: createdProfile, error: profileError } = await admin
      .from("profiles")
      .upsert(profilePayload)
      .select("*")
      .single<Profile>();

    if (profileError || !createdProfile) {
      await supabase.auth.signOut();
      return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "profile"));
    }

    activeProfile = createdProfile;

    // Send welcome email since it's a new registration via Google
    if (activeProfile && activeProfile.email && activeProfile.full_name) {
      const { sendWelcomeEmail } = await import("@/lib/email");
      await sendWelcomeEmail({ to: activeProfile.email, name: activeProfile.full_name });
    }
  }

  if (!activeProfile) {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "profile"));
  }

  if (activeProfile.status !== "active") {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, expectedRoleParam as UserRole, "inactive"));
  }

  if (expectedRoleParam === "admin" && activeProfile.role !== "admin") {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, "admin", "role-mismatch"));
  }
  
  if (expectedRoleParam === "student" && activeProfile.role === "admin") {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, "student" as any, "role-mismatch"));
  }

  return NextResponse.redirect(new URL(roleDashboard[activeProfile.role], request.url));
}
