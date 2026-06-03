"use client";

import { ExternalLink } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { updateOrderAction } from "@/app/admin/dashboard/actions";
import { useCart } from "@/components/cart/CartProvider";
import { StoredOrder } from "@/lib/types";

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function exportOrders(orders: StoredOrder[]) {
  const rows = [
    ["Order ID", "Date", "Customer", "Email", "Phone", "Address", "City", "State", "Pincode", "Products", "Quantities", "Total", "Payment Status", "Order Status", "Courier", "Tracking ID"],
    ...orders.map((order) => [
      order.id,
      new Date(order.createdAt).toLocaleString(),
      order.customer.fullName,
      order.customer.email,
      order.customer.phone,
      order.customer.address,
      order.customer.city,
      order.customer.state,
      order.customer.pincode,
      order.items.map((item) => item.variantName ? `${item.name} - ${item.variantName}` : item.name).join("; "),
      order.items.map((item) => String(item.quantity)).join("; "),
      String(order.total),
      order.paymentStatus ?? "paid",
      order.status,
      order.courierName ?? "",
      order.trackingId ?? "",
    ]),
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "orders.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportOrdersButton({ initialOrders = [] }: { initialOrders?: StoredOrder[] }) {
  const { orders } = useCart();
  const exportableOrders = initialOrders.length > 0 ? initialOrders : orders;
  return (
    <button className="focus-ring inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95" onClick={() => exportOrders(exportableOrders)}>
      Export orders
    </button>
  );
}

export function AdminOrderManagement({ initialOrders = [] }: { initialOrders?: StoredOrder[] }) {
  const { orders, updateOrder } = useCart();
  const router = useRouter();
  const [managedOrders, setManagedOrders] = useState(initialOrders);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const range = searchParams.get("range") ?? "";
  const sourceOrders = managedOrders.length > 0 ? managedOrders : orders;
  const today = new Date().toDateString();
  const now = Date.now();
  const visibleOrders = sourceOrders.filter((order) => {
    const createdAt = new Date(order.createdAt).getTime();
    if (range === "today") return new Date(order.createdAt).toDateString() === today;
    if (range === "week") return now - createdAt <= 7 * 24 * 60 * 60 * 1000;
    if (range === "month") return now - createdAt <= 30 * 24 * 60 * 60 * 1000;
    return true;
  }).filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false;
    if (!query.trim()) return true;
    const searchable = [
      order.id,
      order.customer.fullName,
      order.customer.email,
      order.customer.phone,
      order.customer.address,
      ...order.items.map((item) => item.name),
    ].join(" ").toLowerCase();
    return searchable.includes(query.trim().toLowerCase());
  });
  const todayCount = sourceOrders.filter((order) => new Date(order.createdAt).toDateString() === today).length;

  function saveOrder(orderId: string, updates: { status?: StoredOrder["status"]; trackingId?: string; courierName?: string; trackingUrl?: string }) {
    updateOrder(orderId, updates);
    setManagedOrders((current) => current.map((order) => (order.id === orderId ? { ...order, ...updates } : order)));
    setMessage("Saving order...");
    startTransition(async () => {
      const result = await updateOrderAction(orderId, updates);
      setMessage(result.message);
      router.refresh();
      window.setTimeout(() => setMessage(""), 2200);
    });
  }

  useEffect(() => {
    setManagedOrders(initialOrders);
  }, [initialOrders]);

  if (sourceOrders.length === 0) {
    return (
      <div className="rounded-soft bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-blueDeep">All orders</h3>
            <p className="mt-1 text-sm text-ink/65">No orders yet. Orders created from checkout will appear here.</p>
          </div>
          <ExportOrdersButton initialOrders={initialOrders} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-soft bg-white p-6 shadow-soft">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-blueDeep">All orders</h3>
          <p className="mt-1 text-sm text-ink/65">Today’s orders: {todayCount}</p>
        </div>
        <ExportOrdersButton initialOrders={initialOrders} />
      </div>
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
        <input
          className="focus-ring rounded-full border border-borderSoft px-4 py-3 text-sm"
          placeholder="Search by order id, customer, phone, email, or product"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="focus-ring rounded-full border border-borderSoft px-4 py-3 text-sm font-semibold text-blueDeep"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">All statuses</option>
          {["Placed", "Packed", "Shipped", "Delivered", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
        </select>
      </div>
      {message ? (
        <p className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${message.includes("updated") || message.includes("Saving") ? "bg-gold/20 text-blueDeep" : "bg-alert/10 text-alert"}`}>
          {message}
        </p>
      ) : null}
      <div className="grid gap-4">
        {visibleOrders.length === 0 ? (
          <div className="rounded-2xl bg-beige/60 p-4 text-sm font-semibold text-blueDeep">No orders found for this filter.</div>
        ) : null}
        {visibleOrders.map((order) => (
          <div key={order.id} className="rounded-soft border border-borderSoft p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-coral">{order.id}</p>
                <h4 className="mt-1 font-bold text-blueDeep">{order.customer.fullName}</h4>
                <p className="mt-1 text-sm text-ink/65">{order.customer.email} · {order.customer.phone}</p>
              </div>
              <b className="text-blueDeep">{money(order.total)}</b>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.variantId ?? ""}`} className="rounded-2xl bg-beige/60 p-3">{item.name}{item.variantName ? ` - ${item.variantName}` : ""} x {item.quantity}</div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-beige/50 p-3 text-sm text-ink/70">
              {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-blueDeep">{order.paymentStatus ?? "paid"}</span>
                <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">{order.status}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <select className="focus-ring rounded-2xl border border-borderSoft px-4 py-3 text-sm disabled:opacity-60" value={order.status} disabled={isPending} onChange={(event) => saveOrder(order.id, { status: event.target.value as StoredOrder["status"] })}>
                {["Placed", "Packed", "Shipped", "Delivered", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
              </select>
              <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3 text-sm disabled:opacity-60" placeholder="Courier name" defaultValue={order.courierName ?? ""} disabled={isPending} onBlur={(event) => saveOrder(order.id, { courierName: event.target.value.trim(), trackingId: order.trackingId, trackingUrl: order.trackingUrl })} />
              <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3 text-sm disabled:opacity-60" placeholder="Tracking ID" defaultValue={order.trackingId ?? ""} disabled={isPending} onBlur={(event) => saveOrder(order.id, { trackingId: event.target.value.trim(), courierName: order.courierName, trackingUrl: order.trackingUrl })} />
              <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3 text-sm disabled:opacity-60" placeholder="Tracking URL" defaultValue={order.trackingUrl ?? ""} disabled={isPending} onBlur={(event) => saveOrder(order.id, { trackingUrl: event.target.value.trim(), courierName: order.courierName, trackingId: order.trackingId })} />
              {order.trackingUrl ? (
                <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-blueDeep shadow-sm ring-1 ring-borderSoft sm:col-span-2 xl:col-span-1" href={order.trackingUrl} target="_blank">
                  Track <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
