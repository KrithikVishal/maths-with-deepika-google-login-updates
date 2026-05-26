"use client";

import { useActionState, useState } from "react";
import { LockKeyhole, UserRound } from "lucide-react";
import { loginAction, registerStudentAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export function LoginForm({
  error,
  initialRole = "mother",
  loginKind = "student",
}: {
  error?: string;
  initialRole?: "mother" | "kid" | "admin";
  loginKind?: "student" | "admin";
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<"mother" | "kid" | "admin">(initialRole);
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [registerState, registerFormAction, registerPending] = useActionState(registerStudentAction, initialState);
  const loginMessage = loginState.message ?? (error === "inactive" ? "This account is inactive. Please contact the admin." : error === "auth-config" ? "Login is not configured yet. Please add Supabase environment values." : "");
  const registerMessage = registerState.message ?? "";
  const roleOptions: Array<"mother" | "kid"> = ["mother", "kid"];
  const loginTitle = loginKind === "admin" ? "Admin Login" : selectedRole === "kid" ? "Kid Login" : "Mother Login";

  return (
    <div className={loginKind === "admin" ? "mx-auto max-w-xl" : "grid gap-6 md:grid-cols-2"}>
      <form action={loginFormAction} className="rounded-soft bg-white p-6 shadow-soft">
        <LockKeyhole className="h-8 w-8 text-coral" />
        <h3 className="mt-4 text-2xl font-bold text-blueDeep">{loginTitle}</h3>
        {loginKind === "student" ? (
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-beige/70 p-1">
            {roleOptions.map((role) => (
              <button
                key={role}
                type="button"
                className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition ${selectedRole === role ? "bg-blueDeep text-white" : "text-blueDeep hover:bg-white"}`}
                onClick={() => setSelectedRole(role)}
              >
                {role === "mother" ? "Mother" : "Kid"}
              </button>
            ))}
          </div>
        ) : null}
        <input type="hidden" name="expected_role" value={loginKind === "admin" ? "admin" : selectedRole} />
        <input className="focus-ring mt-6 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="email" placeholder="Email" type="email" autoComplete="email" required />
        <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="password" placeholder="Password" type="password" autoComplete="current-password" required />
        {loginMessage ? <p className="mt-4 rounded-2xl bg-alert/10 px-4 py-3 text-sm font-semibold text-alert">{loginMessage}</p> : null}
        <button className="focus-ring mt-5 inline-flex w-full items-center justify-center rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174] disabled:cursor-not-allowed disabled:opacity-70" disabled={loginPending}>
          {loginPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginKind === "admin" ? null : mode === "login" ? (
        <div className="rounded-soft bg-white p-6 shadow-soft">
          <UserRound className="h-8 w-8 text-coral" />
          <h3 className="mt-4 text-2xl font-bold text-blueDeep">Need an account?</h3>
          <p className="mt-4 leading-7 text-ink/70">
            Mothers and kids can create an account and start learning. Existing students can use the login details shared by the admin.
          </p>
          <button className="focus-ring mt-6 w-full rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52]" onClick={() => setMode("register")}>
            Create New Account
          </button>
        </div>
      ) : (
        <form action={registerFormAction} className="rounded-soft bg-white p-6 shadow-soft">
          <UserRound className="h-8 w-8 text-coral" />
          <h3 className="mt-4 text-2xl font-bold text-blueDeep">Create New Account</h3>
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-beige/70 p-1">
            {roleOptions.map((role) => (
              <button
                key={role}
                type="button"
                className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition ${selectedRole === role ? "bg-blueDeep text-white" : "text-blueDeep hover:bg-white"}`}
                onClick={() => setSelectedRole(role)}
              >
                {role === "mother" ? "Mother" : "Kid"}
              </button>
            ))}
          </div>
          <input type="hidden" name="role" value={selectedRole} />
          <input className="focus-ring mt-6 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="full_name" placeholder="Full name" required />
          <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="email" placeholder="Email" type="email" required />
          <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="phone" placeholder="Phone" required />
          <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="username" placeholder="Username" required />
          <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="password" placeholder="Password" type="password" required />
          <input className="focus-ring mt-3 w-full rounded-2xl border border-blueDeep/10 px-4 py-3" name="confirm_password" placeholder="Confirm password" type="password" required />
          <div className="mt-3 rounded-2xl bg-beige/70 p-3 text-sm font-semibold text-blueDeep">Role: {selectedRole === "mother" ? "Mother" : "Kid"}</div>
          {registerMessage ? <p className="mt-4 rounded-2xl bg-alert/10 px-4 py-3 text-sm font-semibold text-alert">{registerMessage}</p> : null}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="focus-ring rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 transition hover:bg-beige" type="button" onClick={() => setMode("login")}>
              Cancel
            </button>
            <button className="focus-ring rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52] disabled:opacity-70" disabled={registerPending}>
              {registerPending ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
