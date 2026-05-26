import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default function CheckoutPage() {
  return (
    <PageShell>
      <Section tone="beige" eyebrow="Checkout" title="Complete your order" text="Add delivery details and place the order. Razorpay can be enabled when the client is ready.">
        <CheckoutForm />
      </Section>
    </PageShell>
  );
}
