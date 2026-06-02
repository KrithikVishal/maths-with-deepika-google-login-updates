import Razorpay from "razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const paymentType = String(formData.get("payment_type"));

  if (paymentType !== "partial" && paymentType !== "full") {
    return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
  }

  const amountPaise = paymentType === "full" ? 1000 : 500; // example amounts: ₹10 full, ₹5 partial

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
  amount: amountPaise,
  currency: "INR",
  receipt: `order_${Date.now()}`,
  payment_capture: true,
}) as any;

  const supabase = createSupabaseAdminClient();
  // TODO: Retrieve user profile (e.g., from request headers / auth token) to associate payment with a user.
  // For now we store without a user_id.
  await supabase.from("payments").insert({
    // user_id: <user-id>
    payment_type: paymentType,
    audience: "mother",
    amount: amountPaise / 100,
    razorpay_order_id: order.id,
    status: "created",
  });

  return NextResponse.json({ orderId: order.id, amount: amountPaise });
}
