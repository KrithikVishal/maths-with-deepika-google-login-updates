"use client";

import { Search, UserPlus } from "lucide-react";
import { addMemberAction, toggleMemberStatusAction, updateMemberAction } from "@/app/admin/dashboard/actions";
import { accessLevels, Profile, roles, statuses } from "@/lib/types";

export function MemberManagement({
  profiles,
  query,
  role,
  status,
  accessLevel,
  message,
  messageType,
}: {
  profiles: Profile[];
  query: string;
  role: string;
  status: string;
  accessLevel: string;
  message?: string;
  messageType?: string;
}) {
  return (
    <div className="grid gap-6">
      {message ? (
        <div className={`rounded-soft px-5 py-4 text-sm font-semibold shadow-sm ${messageType === "error" ? "bg-alert/10 text-alert" : "bg-gold/20 text-blueDeep"}`}>
          {message}
        </div>
      ) : null}

      <div className="rounded-soft bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center gap-3">
          <UserPlus className="h-7 w-7 text-coral" />
          <div>
            <h3 className="text-xl font-bold text-blueDeep">Add member</h3>
            <p className="mt-1 text-sm text-ink/65">Create login access and assign the right role.</p>
          </div>
        </div>
        <form action={addMemberAction} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="full_name" placeholder="Full name" required />
          <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="email" placeholder="Email" type="email" required />
          <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="username" placeholder="Username" required />
          <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="phone" placeholder="Phone" />
          <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="role" defaultValue="mother">
            {roles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="access_level" defaultValue="none">
            {accessLevels.map((item) => <option key={item} value={item}>{item} access</option>)}
          </select>
          <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="temporary_password" placeholder="Temporary password" type="password" required />
          <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" name="status" defaultValue="active">
            {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button className="focus-ring rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174]">Add member</button>
        </form>
      </div>

      <div className="rounded-soft bg-white p-6 shadow-soft">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-blueDeep">Members</h3>
            <p className="mt-1 text-sm text-ink/65">Search, filter, edit roles, and update account status.</p>
          </div>
          <form className="flex flex-wrap gap-3" action="/admin/dashboard">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blueDeep/60" />
              <input
                className="focus-ring rounded-full border border-blueDeep/10 py-3 pl-10 pr-4 text-sm"
                name="q"
                placeholder="Search users"
                defaultValue={query}
              />
            </div>
            <select className="focus-ring rounded-full border border-blueDeep/10 px-4 py-3 text-sm font-semibold text-blueDeep" name="role" defaultValue={role}>
              <option value="">All roles</option>
              {roles.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select className="focus-ring rounded-full border border-blueDeep/10 px-4 py-3 text-sm font-semibold text-blueDeep" name="status" defaultValue={status}>
              <option value="">All status</option>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select className="focus-ring rounded-full border border-blueDeep/10 px-4 py-3 text-sm font-semibold text-blueDeep" name="access" defaultValue={accessLevel}>
              <option value="">All access</option>
              {accessLevels.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <button className="focus-ring rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52]">Filter</button>
          </form>
        </div>

        <div className="grid gap-4">
          {profiles.length === 0 ? (
            <div className="rounded-2xl bg-beige/60 p-5 text-sm font-semibold text-blueDeep">No members found.</div>
          ) : null}
          {profiles.map((profile) => (
            <div key={profile.id} className="rounded-soft border border-blueDeep/10 bg-white p-4">
              <form action={updateMemberAction} className="grid gap-3 lg:grid-cols-[1.1fr_1.2fr_0.9fr_0.9fr_0.8fr_0.85fr_0.8fr_auto]">
                <input type="hidden" name="id" value={profile.id} />
                <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="full_name" defaultValue={profile.full_name} aria-label="Full name" />
                <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="email" defaultValue={profile.email} aria-label="Email" />
                <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="username" defaultValue={profile.username ?? ""} aria-label="Username" />
                <input className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="phone" defaultValue={profile.phone ?? ""} aria-label="Phone" />
                <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="role" defaultValue={profile.role} aria-label="Role">
                  {roles.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="access_level" defaultValue={profile.access_level ?? "none"} aria-label="Access level">
                  {accessLevels.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <select className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3 text-sm" name="status" defaultValue={profile.status} aria-label="Status">
                  {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <button className="focus-ring rounded-full bg-blueDeep px-4 py-3 text-sm font-semibold text-white">Save</button>
              </form>
              <form
                action={toggleMemberStatusAction}
                className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-beige/50 p-3"
                onSubmit={(event) => {
                  if (profile.status === "active" && !window.confirm("Deactivate this member? They will not be able to access their dashboard.")) {
                    event.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={profile.id} />
                <input type="hidden" name="status" value={profile.status} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${profile.status === "active" ? "bg-gold/25 text-blueDeep" : "bg-alert/10 text-alert"}`}>
                  {profile.status}
                </span>
                <button className="focus-ring rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-sm ring-1 ring-blueDeep/15">
                  {profile.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
