import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!razorpayKeySecret) {
    console.error("RAZORPAY_KEY_SECRET is not configured");
    return NextResponse.json({ ok: false, error: "Payment service misconfigured" }, { status: 503 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

  // Verify signature
  const generatedSignature = createHmac("sha256", razorpayKeySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  // Update payment status to success and store payment_id
  const { error, data: paymentData } = await supabase
    .from("payments")
    .update({ status: "success", razorpay_payment_id })
    .eq("razorpay_order_id", razorpay_order_id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (paymentData && paymentData.user_id && paymentData.payment_type) {
    const { data: profile } = await supabase.from("profiles").update({ access_level: paymentData.payment_type }).eq("id", paymentData.user_id).select().single();

    if (profile && profile.email && profile.full_name) {
      const { sendPaymentConfirmationEmail } = await import("@/lib/email");
      await sendPaymentConfirmationEmail({ to: profile.email, name: profile.full_name, amount: paymentData.amount || 0, paymentType: paymentData.payment_type });
    }
  }

  return NextResponse.json({ ok: true });
}
