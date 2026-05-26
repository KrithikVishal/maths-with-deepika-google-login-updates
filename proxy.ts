import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { roleDashboard, type Profile, type UserRole } from "@/lib/types";

const protectedRoutes: Record<string, UserRole> = {
  "/admin/dashboard": "admin",
  "/mother/dashboard": "mother",
  "/kids/dashboard": "kid",
  "/dashboard/admin": "admin",
  "/dashboard/mother": "mother",
  "/dashboard/kids": "kid",
};

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const neededRole = protectedRoutes[path];

  if (!neededRole) {
    return response;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "auth-config");
    return NextResponse.redirect(loginUrl);
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,status")
    .eq("id", user.id)
    .single<Pick<Profile, "role" | "status">>();

  if (!profile || profile.status !== "active") {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "inactive");
    return NextResponse.redirect(loginUrl);
  }

  if (profile.role !== neededRole) {
    return NextResponse.redirect(new URL(roleDashboard[profile.role], request.url));
  }

  if (path.startsWith("/dashboard/")) {
    return NextResponse.redirect(new URL(roleDashboard[neededRole], request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/mother/dashboard",
    "/kids/dashboard",
    "/dashboard/admin",
    "/dashboard/mother",
    "/dashboard/kids",
  ],
};
