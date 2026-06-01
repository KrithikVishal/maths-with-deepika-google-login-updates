"use client";

import { Bell, CheckCircle2 } from "lucide-react";
import { markNotificationReadAction } from "@/app/notifications/actions";
import type { UserNotification } from "@/lib/notifications";

const typeLabels: Record<UserNotification["type"], string> = {
  payment_success: "Payment",
  access_unlocked: "Access",
  order_placed: "Order",
  order_shipped: "Shipping",
  lesson_completed: "Lesson",
  admin_message: "Admin",
};

export function NotificationPanel({
  notifications,
  returnPath,
}: {
  notifications: UserNotification[];
  returnPath: string;
}) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-blueDeep/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral/10">
            <Bell className="h-5 w-5 text-coral" />
          </div>
          <div>
            <h3 className="font-bold text-blueDeep">Notifications</h3>
            <p className="text-sm text-ink/60">{unreadCount ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""}` : "You are all caught up."}</p>
          </div>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl bg-beige/60 p-4 text-sm font-semibold text-blueDeep">
          No notifications yet. Helpful updates will appear here.
        </div>
      ) : (
        <div className="grid gap-3">
          {notifications.map((notification) => (
            <div key={notification.id} className={`rounded-2xl border p-4 ${notification.read ? "border-blueDeep/10 bg-beige/40" : "border-coral/20 bg-coral/10"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blueDeep shadow-sm">
                    {typeLabels[notification.type]}
                  </span>
                  <p className="mt-3 font-bold text-blueDeep">{notification.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink/65">{notification.message}</p>
                </div>
                {!notification.read ? (
                  <form action={markNotificationReadAction}>
                    <input type="hidden" name="notification_id" value={notification.id} />
                    <input type="hidden" name="return_path" value={returnPath} />
                    <button className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-white text-blueDeep shadow-sm ring-1 ring-blueDeep/10" title="Mark as read">
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
