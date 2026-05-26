import { LoginForm } from "@/components/auth/LoginForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Admin login" title="Admin access" text="This login is only for existing admin accounts. Admin accounts cannot be created publicly.">
        <LoginForm error={params.error} initialRole="admin" loginKind="admin" />
      </Section>
    </PageShell>
  );
}
