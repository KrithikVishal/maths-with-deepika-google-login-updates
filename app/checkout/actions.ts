"use server";

import crypto from "crypto";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { sendOrderConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/email";
import { createNotification } from "@/lib/notifications";
import { CartItem, StoredOrder } from "@/lib/types";
import { sendWhatsAppPaymentConfirmation } from "@/lib/whatsapp";

type CheckoutInput = Omit<StoredOrder, "id" | "createdAt" | "status">;

function notificationPlaceholders(orderId: string) {
  console.info("Notification placeholders", {
    orderId,
    paymentSuccessEmail: "pending-provider",
    orderConfirmationEmail: "pending-provider",
    whatsappNotification: "pending-provider",
  });
}

async function getCurrentUserId() {
  const server = await createSupabaseServerClient();
  const {
    data: { user },
  } = await server.auth.getUser();
  return user?.id ?? null;
}

export async function createRazorpayOrder(input: { total: number }) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const amount = Math.round(input.total * 100);

  if (!keyId || !keySecret) {
    return {
      ok: true,
      mock: true,
      keyId: "mock",
      orderId: `mock_order_${Date.now()}`,
      amount,
      currency: "INR",
    };
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: `mwd_${Date.now()}`,
    }),
  });

  if (!response.ok) {
    return { ok: false, message: "Could not create Razorpay order." };
  }

  const order = await response.json() as { id: string; amount: number; currency: string };
  return { ok: true, mock: false, keyId, orderId: order.id, amount: order.amount, currency: order.currency };
}

async function createPaidOrder(input: CheckoutInput, payment: { razorpayOrderId?: string; razorpayPaymentId?: string; paymentContext?: "product" | "digital" }) {
  try {
    const userId = await getCurrentUserId();
    const admin = createSupabaseAdminClient();
    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({
        user_id: userId,
        customer_name: input.customer.fullName,
        customer_email: input.customer.email,
        customer_phone: input.customer.phone,
        shipping_address: input.customer.address,
        city: input.customer.city,
        state: input.customer.state,
        pincode: input.customer.pincode,
        notes: input.customer.notes,
        status: "Placed",
        order_status: "placed",
        payment_status: "paid",
        subtotal: input.subtotal,
        shipping: input.shipping,
        total: input.total,
      })
      .select("id")
      .single<{ id: string }>();

    if (orderError || !order) {
      return null;
    }

    const items = input.items.map((item: CartItem) => ({
      order_id: order.id,
      product_id: item.id,
      variant_id: item.variantId ?? null,
      product_name: item.name,
      variant_name: item.variantName ?? null,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    await admin.from("order_items").insert(items);
    await Promise.all(input.items
      .filter((item) => item.variantId)
      .map((item) => admin
        .from("product_variants")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", item.variantId)));
    await admin.from("payments").insert({
      user_id: userId,
      order_id: order.id,
      payment_context: payment.paymentContext ?? "product",
      audience: "mother",
      payment_type: "full",
      amount: input.total,
      razorpay_order_id: payment.razorpayOrderId ?? null,
      razorpay_payment_id: payment.razorpayPaymentId ?? null,
      status: "success",
    });
    await createNotification({
      userId,
      type: "order_placed",
      title: "Your order has been placed",
      message: `Order ${order.id} is confirmed. Tracking details will appear after shipping.`,
    });
    await createNotification({
      userId,
      type: "payment_success",
      title: "Payment received",
      message: "Your payment was successful. Thank you.",
    });
    await sendOrderConfirmationEmail({ to: input.customer.email, name: input.customer.fullName, orderId: order.id });
    await sendPaymentConfirmationEmail({ to: input.customer.email, name: input.customer.fullName, orderId: order.id });
    await sendWhatsAppPaymentConfirmation({ phone: input.customer.phone, name: input.customer.fullName, orderId: order.id });
    notificationPlaceholders(order.id);
    return order.id;
  } catch {
    return null;
  }
}

export async function createOrderRecord(input: CheckoutInput) {
  return createPaidOrder(input, { razorpayOrderId: "mock_legacy", razorpayPaymentId: "mock_legacy" });
}

export async function verifyPaymentAndCreateOrder(input: CheckoutInput, payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature?: string; mock?: boolean }) {
  if (!payment.mock) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret || !payment.razorpay_signature) {
      return { ok: false, message: "Payment verification failed." };
    }
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${payment.razorpay_order_id}|${payment.razorpay_payment_id}`)
      .digest("hex");

    if (expected !== payment.razorpay_signature) {
      return { ok: false, message: "Invalid payment signature." };
    }
  }

  const orderId = await createPaidOrder(input, {
    razorpayOrderId: payment.razorpay_order_id,
    razorpayPaymentId: payment.razorpay_payment_id,
    paymentContext: input.items.some((item) => item.productType === "digital") ? "digital" : "product",
  });

  if (!orderId) return { ok: false, message: "Could not create order." };
  return { ok: true, orderId };
}
