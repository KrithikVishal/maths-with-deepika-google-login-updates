import "server-only";

type EmailPayload = {
  to?: string | null;
  name?: string | null;
  subject?: string;
  message?: string;
  orderId?: string;
};

async function queueEmailPlaceholder(kind: string, payload: EmailPayload) {
  console.info("Email placeholder", { kind, provider: "pending-resend-or-sendgrid", ...payload });
}

export async function sendWelcomeEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("welcome", payload);
}

export async function sendPaymentConfirmationEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("payment_confirmation", payload);
}

export async function sendOrderConfirmationEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("order_confirmation", payload);
}

export async function sendShippingUpdateEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("shipping_update", payload);
}

export async function sendAccessUnlockedEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("access_unlocked", payload);
}

export async function sendPasswordResetEmail(payload: EmailPayload) {
  return queueEmailPlaceholder("password_reset", payload);
}
