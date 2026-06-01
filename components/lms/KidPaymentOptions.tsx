"use client";

import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { activateKidAccess } from "@/app/actions/kid";
import { AccessLevel } from "@/lib/types";

export function KidPaymentOptions({ accessLevel }: { accessLevel: AccessLevel }) {
  if (accessLevel === "full") {
    return (
      <div className="rounded-soft bg-blueDeep p-6 text-white shadow-soft">
        <ShieldCheck className="h-8 w-8 text-gold" />
        <h3 className="mt-4 text-xl font-bold">All topic courses are unlocked</h3>
        <p className="mt-3 text-sm leading-6 text-white/78">Your child can watch every topic lesson and use all learning resources.</p>
      </div>
    );
  }

  return (
    <div className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
      <div className="flex items-start gap-3">
        <CreditCard className="h-7 w-7 text-coral" />
        <div>
          <h3 className="text-xl font-bold text-blueDeep">{accessLevel === "partial" ? "Upgrade for all topics" : "Choose topic access"}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/68">
            Razorpay will be connected here later. For now, these buttons simulate successful payment and update kid LMS access.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <form action={activateKidAccess} className="rounded-[1.5rem] bg-beige/65 p-5">
          <Sparkles className="h-6 w-6 text-gold" />
          <h4 className="mt-3 font-bold text-blueDeep">Partial payment</h4>
          <p className="mt-2 text-sm leading-6 text-ink/65">Unlock selected starter topic videos.</p>
          <input type="hidden" name="payment_type" value="partial" />
          <button
            className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-50"
            disabled={accessLevel === "partial"}
          >
            {accessLevel === "partial" ? "Partial Access Active" : "Pay Partial"}
          </button>
        </form>
        <form action={activateKidAccess} className="rounded-[1.5rem] bg-blueDeep p-5 text-white">
          <ShieldCheck className="h-6 w-6 text-gold" />
          <h4 className="mt-3 font-bold">Full payment</h4>
          <p className="mt-2 text-sm leading-6 text-white/75">Unlock all topic courses, videos, and resources.</p>
          <input type="hidden" name="payment_type" value="full" />
          <button className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ee5f52]">
            Pay Full
          </button>
        </form>
      </div>
    </div>
  );
}
