import { CartView } from "@/components/cart/CartView";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default function CartPage() {
  return (
    <PageShell>
      <Section tone="beige" eyebrow="Cart" title="Your selected products" text="Review your products, change quantities, and continue to checkout.">
        <CartView />
      </Section>
    </PageShell>
  );
}
