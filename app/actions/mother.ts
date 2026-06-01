"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { sendAccessUnlockedEmail, sendPaymentConfirmationEmail } from "@/lib/email";
import { createNotification } from "@/lib/notifications";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { AccessLevel } from "@/lib/types";
import { sendWhatsAppAccessUnlocked, sendWhatsAppPaymentConfirmation } from "@/lib/whatsapp";

export async function activateMotherAccess(formData: FormData) {
  try {
    const profile = await requireRole("mother");
    const paymentType = formData.get("payment_type");

    // Ensure a valid payment type; otherwise exit early
    if (paymentType !== "partial" && paymentType !== "full") {
      return;
    }

      const supabase = createSupabaseAdminClient();
      const accessLevel: AccessLevel = paymentType;

      await supabase
        .from("payments")
        .insert({
          user_id: profile.id,
          payment_type: paymentType,
          audience: "mother",
          amount: paymentType === "partial" ? 0 : 0,
          razorpay_order_id: `mock_order_mother_${paymentType}_${Date.now()}`,
          razorpay_payment_id: `mock_${paymentType}_${Date.now()}`,
          status: "success",
        });

      await supabase
        .from("profiles")
        .update({ access_level: accessLevel })
        .eq("id", profile.id);

      await createNotification({
        userId: profile.id,
        type: "payment_success",
        title: `${accessLevel === "full" ? "Full" : "Partial"} access unlocked`,
        message: "Your M2M learning access is ready. You can continue from your dashboard.",
      });
      await sendPaymentConfirmationEmail({ to: profile.email, name: profile.full_name, message: "M2M payment placeholder success." });
      await sendAccessUnlockedEmail({ to: profile.email, name: profile.full_name, message: `M2M ${accessLevel} access unlocked.` });
      await sendWhatsAppPaymentConfirmation({ phone: profile.phone, name: profile.full_name, message: "M2M payment placeholder success." });
      await sendWhatsAppAccessUnlocked({ phone: profile.phone, name: profile.full_name, message: `M2M ${accessLevel} access unlocked.` });

      revalidatePath("/mother/dashboard");
      revalidatePath("/mother-dashboard");
    } catch (error) {
      console.error("ERROR: activateMotherAccess failed:", error);
      throw error;
    }
  }
