"use client";

import { ExternalLink } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { StoredOrder } from "@/lib/types";

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function RecentOrders({ initialOrders = [] }: { initialOrders?: StoredOrder[] }) {
  const { orders } = useCart();
  const recent = (initialOrders.length > 0 ? initialOrders : orders).slice(0, 3);

  if (recent.length === 0) {
    return (
      <div className="rounded-2xl bg-beige/60 p-4">
        <p className="font-bold text-blueDeep">No recent orders</p>
        <p className="mt-1 text-sm text-ink/65">Your orders will appear here after checkout.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {recent.map((order) => (
        <div key={order.id} className="rounded-2xl bg-beige/60 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-bold text-blueDeep">{order.id}</p>
              <p className="mt-1 text-sm text-ink/65">{order.status} · {order.paymentStatus ?? "paid"} · {money(order.total)}</p>
              {order.trackingId ? <p className="mt-1 text-sm text-ink/65">{order.courierName ?? "Courier"}: {order.trackingId}</p> : null}
            </div>
            {order.trackingUrl ? (
              <a className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blueDeep shadow-sm ring-1 ring-borderSoft" href={order.trackingUrl} target="_blank">
                Track Order <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
