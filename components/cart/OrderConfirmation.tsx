"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { Button } from "@/components/Button";

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const { orders } = useCart();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <div className="rounded-soft bg-white p-8 text-center shadow-soft">
        <h3 className="text-2xl font-bold text-blueDeep">Order not found</h3>
        <p className="mt-3 text-ink/70">If you just placed an order, please check your dashboard after the page finishes loading.</p>
        <Button href="/shop" className="mt-6">Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="rounded-soft bg-white p-6 shadow-soft">
      <CheckCircle2 className="h-10 w-10 text-gold" />
      <h3 className="mt-4 text-2xl font-bold text-blueDeep">Your order has been placed.</h3>
      <p className="mt-2 text-ink/70">Order ID: <b className="text-blueDeep">{order.id}</b></p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex rounded-full bg-gold/25 px-3 py-1 text-xs font-bold text-blueDeep">{order.status}</span>
        <span className="inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">{order.paymentStatus ?? "paid"}</span>
      </div>
      <div className="mt-6 grid gap-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between rounded-2xl bg-beige/60 p-4 text-sm">
            <span>{item.name} x {item.quantity}</span>
            <b>{money(item.price * item.quantity)}</b>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between text-lg font-bold text-blueDeep">
        <span>Total</span>
        <span>{money(order.total)}</span>
      </div>
      <div className="mt-5 rounded-2xl bg-beige/60 p-4 text-sm leading-6 text-ink/70">
        <p className="font-bold text-blueDeep">Delivery address</p>
        <p>{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
        <p className="mt-2 font-bold text-blueDeep">Tracking status</p>
        <p>{order.trackingId ? `${order.courierName ?? "Courier"}: ${order.trackingId}` : "Tracking will appear once the order is shipped."}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/mother/dashboard">View Dashboard</Button>
        <Link href="/shop" className="focus-ring inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 transition hover:bg-beige">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
