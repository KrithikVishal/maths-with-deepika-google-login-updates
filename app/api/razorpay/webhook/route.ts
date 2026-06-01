import crypto from "crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Webhook secret is not configured." }, { status: 500 });
  }

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }

  const event = JSON.parse(body) as {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string } } };
  };

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    if (payment?.order_id) {
      const supabase = createSupabaseAdminClient();
      const { data: paymentRows } = await supabase
        .from("payments")
        .update({ status: "success", razorpay_payment_id: payment.id ?? null })
        .eq("razorpay_order_id", payment.order_id)
        .select("order_id");
      const orderIds = (paymentRows ?? []).map((row) => row.order_id).filter(Boolean);
      if (orderIds.length) {
        await supabase.from("orders").update({ payment_status: "paid" }).in("id", orderIds);
      }
    }
  }

  console.info("Notification placeholders", {
    event: event.event,
    paymentSuccessEmail: "pending-provider",
    whatsappNotification: "pending-provider",
  });

  return NextResponse.json({ ok: true });
}
