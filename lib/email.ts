import "server-only";
import { Resend } from "resend";

type EmailPayload = {
  to?: string | null;
  name?: string | null;
  subject?: string;
  message?: string;
  orderId?: string;
  amount?: number;
  paymentType?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const FROM_EMAIL = "Maths With Deepika <onboarding@resend.dev>";

function escapeHtml(value: string | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendRealEmail(payload: EmailPayload & { html: string }) {
  if (!resend) {
    console.info("📨 [MOCK EMAIL]", payload.subject, "to", payload.to);
    return;
  }
  
  if (!payload.to) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.to,
      subject: payload.subject || "Maths With Deepika",
      html: payload.html,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

export async function sendWelcomeEmail(payload: EmailPayload) {
  const safeName = escapeHtml(payload.name) || "Learner";
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h1 style="color: #1B2A53;">Welcome, ${safeName}!</h1>
      <p>We're thrilled to have you join our learning community.</p>
      <p>Log in to your Student Dashboard to pick up right where you left off, unlock badges, and master math!</p>
      <br/>
      <p>Happy learning,</p>
      <p><strong>Deepika</strong></p>
    </div>
  `;
  return sendRealEmail({ ...payload, subject: "Welcome to Maths With Deepika! 🚀", html });
}

export async function sendPaymentConfirmationEmail(payload: EmailPayload) {
  const safeName = escapeHtml(payload.name) || "Learner";
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h1 style="color: #1B2A53;">Thank you for your payment!</h1>
      <p>Hi ${safeName},</p>
      <p>We successfully received your payment of ₹${payload.amount || "..."} for <strong>${payload.paymentType || "full"} access</strong>.</p>
      <p>Your student dashboard has been updated to reflect your new access level.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>Deepika</strong></p>
    </div>
  `;
  return sendRealEmail({ ...payload, subject: "Payment Receipt - Maths With Deepika", html });
}

export async function sendOrderConfirmationEmail(payload: EmailPayload) {
  return sendRealEmail({ ...payload, subject: "Order Confirmation", html: `<p>Your order has been confirmed.</p>` });
}

export async function sendShippingUpdateEmail(payload: EmailPayload) {
  return sendRealEmail({ ...payload, subject: "Shipping Update", html: `<p>Your order has been shipped!</p>` });
}

export async function sendAccessUnlockedEmail(payload: EmailPayload) {
  return sendRealEmail({ ...payload, subject: "Access Unlocked", html: `<p>Your access has been unlocked.</p>` });
}

export async function sendPasswordResetEmail(payload: EmailPayload) {
  return sendRealEmail({ ...payload, subject: "Password Reset", html: `<p>Reset your password</p>` });
}
