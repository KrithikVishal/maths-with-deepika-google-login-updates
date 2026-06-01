import jwt from 'jsonwebtoken';
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Profile, UserRole } from "@/lib/types";
import { redirect } from "next/navigation";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Verify a JWT token extracted from an Authorization header.
 * Supports tokens prefixed with "Bearer ".
 * Applies a small clock tolerance to allow for minor time skew.
 * Returns the decoded payload on success or throws AuthError.
 */
export function verifyToken(tokenHeader: string | undefined, secret: string) {
  if (!tokenHeader) {
    throw new AuthError('Missing Authorization header');
  }
  const token = tokenHeader.replace(/^Bearer\s+/i, '').trim();
  try {
    const payload = jwt.verify(token, secret, { clockTolerance: 5 }) as any;
    return payload;
  } catch (err: any) {
    throw new AuthError(err.message || 'Invalid token');
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  return profile;
}

export async function requireRole(expectedRole: UserRole): Promise<Profile> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(expectedRole === "admin" ? "/admin-login" : `/login?role=${expectedRole}`);
  }

  if (profile.status !== "active") {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect(expectedRole === "admin" ? "/admin-login?error=inactive" : `/login?role=${expectedRole}&error=inactive`);
  }

  if (profile.role !== expectedRole) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect(expectedRole === "admin" ? "/admin-login?error=role-mismatch" : `/login?role=${expectedRole}&error=role-mismatch`);
  }

  return profile;
}


