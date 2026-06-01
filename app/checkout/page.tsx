import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default function CheckoutPage() {
  return (
    <PageShell>
      <Section tone="beige" eyebrow="Checkout" title="Complete your order" text="Add delivery details and place the order using Razorpay test mode.">
        <CheckoutForm />
      </Section>
    </PageShell>
  );
}
