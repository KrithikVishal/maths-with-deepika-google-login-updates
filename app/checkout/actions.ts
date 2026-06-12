"use server";

import crypto from "crypto";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { findCheckoutProduct } from "@/lib/catalog";
import { sendOrderConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/email";
import { createNotification } from "@/lib/notifications";
import { CartItem, StoredOrder } from "@/lib/types";
import { sendWhatsAppPaymentConfirmation } from "@/lib/whatsapp";

type CheckoutInput = Omit<StoredOrder, "id" | "createdAt" | "status">;
type CheckoutSnapshot = {
  id: string;
  orderId: string;
  amount: number;
  currency: "INR";
  issuedAt: number;
};
type PaymentInput = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  checkout_token?: string;
  mock?: boolean;
};

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

function mockPaymentsAllowed() {
  return process.env.NODE_ENV !== "production" && process.env.ALLOW_MOCK_PAYMENTS === "true";
}

function getCheckoutTokenSecret() {
  return process.env.CHECKOUT_TOKEN_SECRET
    ?? (process.env.NODE_ENV !== "production" ? "dev-checkout-token-secret" : "");
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signSnapshot(payload: string) {
  const secret = getCheckoutTokenSecret();
  if (!secret) {
    throw new Error("Checkout signing secret is not configured.");
  }
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function createCheckoutToken(snapshot: CheckoutSnapshot) {
  const payload = encodeBase64Url(JSON.stringify(snapshot));
  return `${payload}.${signSnapshot(payload)}`;
}

function readCheckoutToken(token?: string): CheckoutSnapshot | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = signSnapshot(payload);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const snapshot = JSON.parse(decodeBase64Url(payload)) as CheckoutSnapshot;
  const ttlSeconds = Number(process.env.CHECKOUT_TOKEN_TTL_SECONDS) || 86400;
  const maxAgeMs = ttlSeconds * 1000;
  if (!snapshot.issuedAt || Date.now() - snapshot.issuedAt > maxAgeMs) return null;
  return snapshot;
}

async function createCheckoutSnapshot(input: { orderId: string; amount: number; currency: "INR"; checkout: CheckoutInput }) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("checkout_snapshots")
    .insert({
      razorpay_order_id: input.orderId,
      amount: input.amount,
      currency: input.currency,
      payload: input.checkout,
    })
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    console.error("checkout_snapshots insert failed:", JSON.stringify(error));
    throw new Error("Could not create checkout session.");
  }

  return data.id;
}

async function getCheckoutSnapshot(snapshot: CheckoutSnapshot) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("checkout_snapshots")
    .select("payload, expires_at")
    .eq("id", snapshot.id)
    .eq("razorpay_order_id", snapshot.orderId)
    .is("used_at", null)
    .maybeSingle<{ payload: CheckoutInput; expires_at: string }>();

  if (error || !data) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) return null;
  return data.payload;
}

function buildTrustedCheckout(input: CheckoutInput): CheckoutInput {
  if (!input.items.length) {
    throw new Error("Your cart is empty.");
  }

  const items = input.items.map((item): CartItem => {
    const product = findCheckoutProduct(item.id, item.variantId);
    const quantity = Number(item.quantity);

    if (!product || product.stock <= 0) {
      throw new Error("One or more products are no longer available.");
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
      throw new Error("One or more product quantities are invalid.");
    }

    return {
      ...product,
      quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.some((item) => item.id === "razorpay-test-product-1inr") ? 0 : subtotal > 0 ? 60 : 0;
  const total = subtotal + shipping;

  return {
    items,
    subtotal,
    shipping,
    total,
    customer: {
      fullName: input.customer.fullName.trim(),
      email: input.customer.email.trim().toLowerCase(),
      phone: input.customer.phone.trim(),
      address: input.customer.address.trim(),
      city: input.customer.city.trim(),
      state: input.customer.state.trim(),
      pincode: input.customer.pincode.trim(),
      notes: input.customer.notes?.trim(),
    },
  };
}

async function fetchRazorpayPayment(paymentId: string) {
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<{ id: string; order_id: string; amount: number; currency: string; status: string }>;
}

export async function createRazorpayOrder(input: CheckoutInput) {
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  let trusted: CheckoutInput;

  try {
    trusted = buildTrustedCheckout(input);
    // Debug – output Razorpay credentials to the server log (will appear in the terminal console)
    console.info('Razorpay credentials', { keyId: keyId ? '***' : null, keySecret: keySecret ? '***' : null });
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not validate cart." };
  }

  const amount = Math.round(trusted.total * 100);

  if (!keyId || !keySecret) {
    return { ok: false, message: "Payment gateway is not configured." };
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

  const order = await response.json() as { id: string; amount: number; currency: "INR" };
  let snapshotId: string;
  try {
    snapshotId = await createCheckoutSnapshot({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      checkout: trusted,
    });
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not create checkout session." };
  }

  return {
    ok: true,
    mock: false,
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    checkoutToken: createCheckoutToken({
      id: snapshotId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      issuedAt: Date.now(),
    }),
  };
}

async function runPostOrderNotifications(input: { userId: string | null; orderId: string; checkout: CheckoutInput }) {
  const { userId, orderId, checkout } = input;
  const tasks = [
    createNotification({
      userId,
      type: "order_placed",
      title: "Your order has been placed",
      message: `Order ${orderId} is confirmed. Tracking details will appear after shipping.`,
    }),
    createNotification({
      userId,
      type: "payment_success",
      title: "Payment received",
      message: "Your payment was successful. Thank you.",
    }),
    sendOrderConfirmationEmail({ to: checkout.customer.email, name: checkout.customer.fullName, orderId }),
    sendPaymentConfirmationEmail({ to: checkout.customer.email, name: checkout.customer.fullName, orderId }),
    sendWhatsAppPaymentConfirmation({ phone: checkout.customer.phone, name: checkout.customer.fullName, orderId }),
  ];

  const results = await Promise.allSettled(tasks);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Post-order notification failed", result.reason);
    }
  });
  notificationPlaceholders(orderId);
}

async function createPaidOrder(input: CheckoutInput, payment: { razorpayOrderId?: string; razorpayPaymentId?: string; paymentContext?: "product" | "digital"; checkoutSnapshotId?: string }) {
  try {
    const trusted = buildTrustedCheckout(input);
    const userId = await getCurrentUserId();
    const admin = createSupabaseAdminClient();

    const { data: orderId, error } = await admin.rpc("create_paid_product_order", {
      p_user_id: userId,
      p_razorpay_order_id: payment.razorpayOrderId ?? null,
      p_razorpay_payment_id: payment.razorpayPaymentId ?? null,
      p_payment_context: payment.paymentContext ?? "product",
      p_amount: trusted.total,
      p_subtotal: trusted.subtotal,
      p_shipping: trusted.shipping,
      p_total: trusted.total,
      p_customer: trusted.customer,
      p_items: trusted.items,
      p_checkout_snapshot_id: payment.checkoutSnapshotId ?? null,
    });

    if (error || !orderId) {
      console.error("Order transaction failed", error);
      return null;
    }

    await runPostOrderNotifications({ userId, orderId: String(orderId), checkout: trusted });
    if (payment.checkoutSnapshotId) {
      await admin
        .from("checkout_snapshots")
        .update({ used_at: new Date().toISOString() })
        .eq("id", payment.checkoutSnapshotId);
    }
    return String(orderId);
  } catch (error) {
    console.error("Order creation failed", error);
    return null;
  }
}

export async function createOrderRecord(input: CheckoutInput) {
  return createPaidOrder(input, { razorpayOrderId: "mock_legacy", razorpayPaymentId: "mock_legacy" });
}

export async function verifyPaymentAndCreateOrder(input: CheckoutInput, payment: PaymentInput) {
  if (payment.mock === true) {
    if (!mockPaymentsAllowed()) {
      return { ok: false, message: "Mock payment is disabled." };
    }
  }

  let snapshot: CheckoutSnapshot | null;
  try {
    snapshot = readCheckoutToken(payment.checkout_token);
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not validate checkout." };
  }

  if (!snapshot || snapshot.orderId !== payment.razorpay_order_id) {
    return { ok: false, message: "Checkout session expired. Please start payment again." };
  }

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

    const razorpayPayment = await fetchRazorpayPayment(payment.razorpay_payment_id);
    if (!razorpayPayment) {
      return { ok: false, message: "Could not verify payment amount." };
    }

    if (
      razorpayPayment.order_id !== payment.razorpay_order_id
      || razorpayPayment.amount !== snapshot.amount
      || razorpayPayment.currency !== snapshot.currency
      || razorpayPayment.status !== "captured"
    ) {
      return { ok: false, message: "Payment amount verification failed." };
    }
  }

  const checkout = await getCheckoutSnapshot(snapshot);
  if (!checkout) {
    return { ok: false, message: "Checkout session expired. Please start payment again." };
  }

  if (Math.round(checkout.total * 100) !== snapshot.amount) {
    return { ok: false, message: "Payment amount does not match checkout total." };
  }

  const orderId = await createPaidOrder(checkout, {
    razorpayOrderId: payment.razorpay_order_id,
    razorpayPaymentId: payment.razorpay_payment_id,
    paymentContext: checkout.items.some((item) => item.productType === "digital") ? "digital" : "product",
    checkoutSnapshotId: snapshot.id,
  });

  if (!orderId) return { ok: false, message: "Payment is already being processed. Please refresh your dashboard shortly." };
  return { ok: true, orderId, order: { ...checkout, paymentStatus: "paid" as const } };
}
