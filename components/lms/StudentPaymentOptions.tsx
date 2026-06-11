"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { AccessLevel } from "@/lib/types";

export function StudentPaymentOptions({ accessLevel, userProfile }: { accessLevel: AccessLevel; userProfile?: { email: string; full_name: string; phone?: string | null } }) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined") return reject();
      if ((window as any).Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentType: "partial" | "full") => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("payment_type", paymentType);
      const orderRes = await fetch("/api/create-student-order", {
        method: "POST",
        body: form,
      });
      const { orderId, amount } = await orderRes.json();

      await loadRazorpayScript();

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Student Learning",
        description: paymentType === "full" ? "Full access" : "Partial access",
        order_id: orderId,
        handler: async function (response: any) {
          await fetch("/api/verify-student-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          window.location.reload();
        },
        prefill: {
          email: userProfile?.email || "",
          name: userProfile?.full_name || "",
          contact: userProfile?.phone || "",
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      });
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed", response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
      setLoading(false);
    }
  };

  if (accessLevel === "full") {
    return (
      <div className="rounded-soft bg-blueDeep p-6 text-white shadow-soft">
        <ShieldCheck className="h-8 w-8 text-gold" />
        <h3 className="mt-4 text-xl font-bold">Full access is active</h3>
        <p className="mt-3 text-sm leading-6 text-white/78">
          All lessons, modules, topics, worksheets, and future revision resources are unlocked.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
      <div className="flex items-start gap-3">
        <CreditCard className="h-7 w-7 text-coral" />
        <div>
          <h3 className="text-xl font-bold text-blueDeep">
            {accessLevel === "partial" ? "Upgrade to full access" : "Choose your access"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink/68">
            Click a button below to pay via Razorpay (test mode).
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          className="rounded-[1.5rem] bg-beige/65 p-5 focus-ring"
          disabled={accessLevel === "partial" || loading}
          onClick={() => handlePayment("partial")}
        >
          <Sparkles className="h-6 w-6 text-gold" />
          <h4 className="mt-3 font-bold text-blueDeep">Partial payment</h4>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Unlock the starter lessons and begin learning at your own pace.
          </p>
        </button>

        <button
          className="rounded-[1.5rem] bg-blueDeep p-5 text-white focus-ring"
          disabled={loading}
          onClick={() => handlePayment("full")}
        >
          <ShieldCheck className="h-6 w-6 text-gold" />
          <h4 className="mt-3 font-bold">Full payment</h4>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Unlock every module, full lessons, worksheets, and all learning resources.
          </p>
        </button>
      </div>
    </div>
  );
}
