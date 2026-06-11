import { LoginForm } from "@/components/auth/LoginForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Student login" title="Welcome back to your learning space" text="Login to continue to your learning dashboard.">
        <div className="mx-auto max-w-5xl">
          <LoginForm error={params.error} />
        </div>
      </Section>
    </PageShell>
  );
}
