import { LoginForm } from "@/components/auth/LoginForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "kid" ? "kid" : "mother";

  return (
    <PageShell>
      <Section tone="beige" eyebrow="Student login" title="Welcome back to your learning space" text="Choose mother or kid login, then continue to your learning dashboard.">
        <div className="mx-auto max-w-5xl">
          <LoginForm error={params.error} initialRole={role} />
        </div>
      </Section>
    </PageShell>
  );
}
