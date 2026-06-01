import { OrderConfirmation } from "@/components/cart/OrderConfirmation";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Order confirmed" title="Your order is confirmed">
        <OrderConfirmation orderId={id} />
      </Section>
    </PageShell>
  );
}
