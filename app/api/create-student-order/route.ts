import Razorpay from "razorpay";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const serverClient = await createSupabaseServerClient();
  const { data: { user } } = await serverClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const paymentType = String(formData.get("payment_type"));

  if (paymentType !== "partial" && paymentType !== "full") {
    return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
  }

  const amountPaise = paymentType === "full" ? 1000 : 500; // example amounts: ₹10 full, ₹5 partial

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Razorpay credentials not configured");
    return NextResponse.json({ error: "Payment service unavailable" }, { status: 503 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  let order;
  try {
    order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `order_${Date.now()}`,
      payment_capture: true,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 502 });
  }

  const supabase = createSupabaseAdminClient();
  const { error: insertError } = await supabase.from("payments").insert({
    user_id: user.id,
    payment_type: paymentType,
    audience: "mother", // Treat all unified students as mother audience internally
    amount: amountPaise / 100,
    razorpay_order_id: order.id,
    status: "created",
  });

  if (insertError) {
    // The Razorpay SDK does not expose an orders.cancel method, so we cannot
    // programmatically void the order. Log the orphaned order ID so it can be
    // identified and cancelled manually via the Razorpay dashboard if needed.
    console.error(
      "Failed to record payment in DB. Orphaned Razorpay order_id=%s — cancel it manually if unused. DB error: %s",
      order.id,
      insertError.message
    );
    return NextResponse.json(
      { error: "Failed to record payment. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ orderId: order.id, amount: amountPaise });
}
