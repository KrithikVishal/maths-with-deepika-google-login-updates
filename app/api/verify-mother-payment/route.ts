import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

  // Verify signature
  const generatedSignature = createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET!
  )
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  // Update payment status to success and store payment_id
  const { error } = await supabase
    .from("payments")
    .update({ status: "success", razorpay_payment_id })
    .eq("razorpay_order_id", razorpay_order_id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // You can trigger notifications here if desired

  return NextResponse.json({ ok: true });
}
