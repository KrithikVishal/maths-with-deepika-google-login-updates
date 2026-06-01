import { OrderConfirmation } from "@/components/cart/OrderConfirmation";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Order placed" title="Thank you for your order">
        <OrderConfirmation orderId={id} />
      </Section>
    </PageShell>
  );
}
