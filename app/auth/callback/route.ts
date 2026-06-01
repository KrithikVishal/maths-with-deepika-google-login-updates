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
  const expectedRoleParam = requestUrl.searchParams.get("expected_role") ?? "mother";
  const expectedRole = isUserRole(expectedRoleParam) ? expectedRoleParam : "mother";

  if (!code) {
    return NextResponse.redirect(loginUrl(request, expectedRole, "oauth"));
  }

  const supabase = await createSupabaseServerClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(loginUrl(request, expectedRole, "oauth"));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(loginUrl(request, expectedRole, "oauth"));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  let activeProfile = profile;

  if (!activeProfile && expectedRole !== "admin") {
    const admin = createSupabaseAdminClient();
    const profilePayload = profileFromGoogleUser(user, expectedRole);

    if (!profilePayload.email) {
      await supabase.auth.signOut();
      return NextResponse.redirect(loginUrl(request, expectedRole, "oauth-email"));
    }

    const { data: createdProfile, error: profileError } = await admin
      .from("profiles")
      .upsert(profilePayload)
      .select("*")
      .single<Profile>();

    if (profileError || !createdProfile) {
      await supabase.auth.signOut();
      return NextResponse.redirect(loginUrl(request, expectedRole, "profile"));
    }

    activeProfile = createdProfile;
  }

  if (!activeProfile) {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, expectedRole, "profile"));
  }

  if (activeProfile.status !== "active") {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, expectedRole, "inactive"));
  }

  if (activeProfile.role !== expectedRole) {
    await supabase.auth.signOut();
    return NextResponse.redirect(loginUrl(request, expectedRole, "role-mismatch"));
  }

  return NextResponse.redirect(new URL(roleDashboard[activeProfile.role], request.url));
}
