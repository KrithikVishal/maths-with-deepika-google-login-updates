import "server-only";

type WhatsAppPayload = {
  phone?: string | null;
  name?: string | null;
  message?: string;
  orderId?: string;
};

async function queueWhatsAppPlaceholder(kind: string, payload: WhatsAppPayload) {
  console.info("WhatsApp placeholder", { kind, provider: "pending-whatsapp-api", ...payload });
}

export async function sendWhatsAppPaymentConfirmation(payload: WhatsAppPayload) {
  return queueWhatsAppPlaceholder("payment_confirmation", payload);
}

export async function sendWhatsAppOrderShipped(payload: WhatsAppPayload) {
  return queueWhatsAppPlaceholder("order_shipped", payload);
}

export async function sendWhatsAppAccessUnlocked(payload: WhatsAppPayload) {
  return queueWhatsAppPlaceholder("access_unlocked", payload);
}
