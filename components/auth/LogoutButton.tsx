import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-sm ring-1 ring-borderSoft transition hover:bg-beige">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </form>
  );
}
