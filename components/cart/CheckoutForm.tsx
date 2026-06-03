"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { createRazorpayOrder, verifyPaymentAndCreateOrder } from "@/app/checkout/actions";
import { StoredOrder } from "@/lib/types";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, createOrder } = useCart();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const shipping = subtotal > 0 ? 60 : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (items.length === 0) {
      setError("Your cart is empty. Explore products to get started.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const required = ["fullName", "email", "phone", "address", "city", "state", "pincode"];
    const missing = required.find((field) => !String(formData.get(field) ?? "").trim());
    if (missing) {
      setError("Please fill all required checkout fields.");
      return;
    }

    setPending(true);
    const payload = {
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      customer: {
        fullName: String(formData.get("fullName")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone")),
        address: String(formData.get("address")),
        city: String(formData.get("city")),
        state: String(formData.get("state")),
        pincode: String(formData.get("pincode")),
        notes: String(formData.get("notes") ?? ""),
      },
    } satisfies Omit<StoredOrder, "id" | "createdAt" | "status">;

    const razorpayOrder = await createRazorpayOrder({ total: payload.total });
    if (!razorpayOrder.ok) {
      setError(razorpayOrder.message ?? "Could not start payment.");
      setPending(false);
      return;
    }

    async function finishPayment(payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature?: string; mock?: boolean }) {
      const result = await verifyPaymentAndCreateOrder(payload, payment);
      if (!result.ok || !result.orderId) {
        setError(result.message ?? "Payment could not be verified.");
        setPending(false);
        return;
      }

      const order = createOrder({ ...payload, paymentStatus: "paid" }, result.orderId);
      setSuccess("Your order has been placed.");
      window.setTimeout(() => router.push(`/order-success/${order.id}`), 500);
    }

    if (razorpayOrder.mock || !window.Razorpay) {
      await finishPayment({
        razorpay_order_id: razorpayOrder.orderId ?? `mock_order_${Date.now()}`,
        razorpay_payment_id: `mock_payment_${Date.now()}`,
        mock: true,
      });
      return;
    }

    const checkout = new window.Razorpay({
      key: razorpayOrder.keyId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Maths with Deepika",
      description: "Order payment",
      order_id: razorpayOrder.orderId,
      prefill: {
        name: payload.customer.fullName,
        email: payload.customer.email,
        contact: payload.customer.phone,
      },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        await finishPayment(response);
      },
      modal: {
        ondismiss: () => {
          setPending(false);
          setError("Payment was cancelled.");
        },
      },
    });
    checkout.open();
  }

  if (items.length === 0) {
    return (
      <div className="rounded-soft bg-white p-8 text-center shadow-soft">
        <h3 className="text-2xl font-bold text-blueDeep">Your cart is empty.</h3>
        <p className="mt-3 text-ink/70">Explore products to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.46fr]">
      <form onSubmit={handleSubmit} className="rounded-soft bg-white p-6 shadow-soft">
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <h3 className="text-xl font-bold text-blueDeep">Delivery details</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="fullName" placeholder="Full name" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="email" placeholder="Email" type="email" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="phone" placeholder="Phone" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="pincode" placeholder="Pincode" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3 md:col-span-2" name="address" placeholder="Address" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="city" placeholder="City" required />
          <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" name="state" placeholder="State" required />
          <textarea className="focus-ring min-h-28 rounded-2xl border border-borderSoft px-4 py-3 md:col-span-2" name="notes" placeholder="Order notes optional" />
        </div>
        <div className="mt-5 rounded-2xl bg-beige/70 p-4 text-sm leading-6 text-blueDeep">
          Razorpay will open after you confirm the details. If keys are not configured, a safe mock success flow is used for testing.
        </div>
        {error ? <p className="mt-4 rounded-2xl bg-alert/10 px-4 py-3 text-sm font-semibold text-alert">{error}</p> : null}
        {success ? <p className="mt-4 rounded-2xl bg-gold/20 px-4 py-3 text-sm font-semibold text-blueDeep">{success}</p> : null}
        <button className="focus-ring mt-5 w-full rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102A56] disabled:opacity-60" disabled={pending}>
          {pending ? "Processing..." : "Pay with Razorpay"}
        </button>
      </form>

      <aside className="rounded-soft bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-blueDeep">Order summary</h3>
        <div className="my-5 grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 text-sm">
              <span>{item.name} x {item.quantity}</span>
              <b>{money(item.price * item.quantity)}</b>
            </div>
          ))}
        </div>
        <div className="grid gap-3 border-t border-borderSoft pt-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><b>{money(subtotal)}</b></div>
          <div className="flex justify-between"><span>Shipping</span><b>{money(shipping)}</b></div>
          <div className="flex justify-between text-lg text-blueDeep"><span>Total</span><b>{money(subtotal + shipping)}</b></div>
        </div>
      </aside>
    </div>
  );
}
