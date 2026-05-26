import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck, CheckCircle2, ClipboardCheck, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { ProductActions } from "@/components/cart/ProductActions";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import type { Product } from "@/lib/types";
import { bootcampTopics, getBootcampTopic } from "../data";

export function generateStaticParams() {
  return bootcampTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getBootcampTopic(slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} | Maths with Deepika`,
    description: topic.description,
  };
}

export default async function BootcampDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getBootcampTopic(slug);

  if (!topic) {
    notFound();
  }

  const product: Product = {
    id: `bootcamp-${topic.slug}`,
    name: `5-Day Maths Bootcamp - ${topic.title}`,
    price: topic.price,
    priceLabel: topic.priceLabel,
    status: "In stock",
    stock: 100,
    productType: "course",
  };

  return (
    <PageShell>
      <section className="soft-gradient">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Button href="/bootcamp#available-bootcamps" variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to bootcamps
          </Button>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">5-Day Maths Bootcamp</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-blueDeep sm:text-5xl">{topic.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-ink/72">{topic.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Recorded lessons", "Worksheets", "Lifetime access"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-blueDeep shadow-sm ring-1 ring-blueDeep/10">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-5 shadow-soft">
              <div className="rounded-[1.5rem] bg-beige/70 p-6">
                <Sparkles className="h-9 w-9 text-coral" />
                <h2 className="mt-4 text-2xl font-bold leading-snug text-blueDeep">One focused topic. Five gentle learning days.</h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">{topic.bestFor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Bootcamp details" title="What your child will learn">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.48fr]">
          <div className="grid gap-5">
            {topic.modules.map((module, index) => (
              <article key={module.title} className="rounded-soft border border-blueDeep/10 bg-white p-6 shadow-soft">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/10 text-sm font-bold text-coral">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blueDeep">{module.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-ink/68">{module.description}</p>
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-[2rem] bg-beige/70 p-6">
              <h2 className="text-2xl font-bold text-blueDeep">Inside this bootcamp</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Recorded video lessons", PlayCircle],
                  ["Printable worksheets", ClipboardCheck],
                  ["Interactive online worksheets", Sparkles],
                  ["Answer keys", BookOpenCheck],
                ].map(([label, Icon]) => (
                  <div key={label as string} className="rounded-2xl bg-white p-4 shadow-sm">
                    <Icon className="h-6 w-6 text-coral" />
                    <p className="mt-3 text-sm font-bold text-blueDeep">{label as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Payment</p>
              <h2 className="mt-3 text-2xl font-bold text-blueDeep">Enroll in this bootcamp</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">Get recorded lessons, worksheets, answer keys, interactive practice, and lifetime access.</p>
              <div className="mt-5 rounded-3xl bg-beige/70 p-5">
                <p className="text-sm font-bold text-ink/60">Bootcamp price</p>
                <p className="mt-1 text-4xl font-bold text-blueDeep">{topic.priceLabel}</p>
              </div>
              <div className="mt-5 grid gap-3">
                {["5-day topic learning", "Printable + interactive worksheets", "Lifetime access"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-bold text-blueDeep ring-1 ring-blueDeep/10">
                    <CheckCircle2 className="h-5 w-5 text-coral" />
                    {item}
                  </div>
                ))}
              </div>
              <ProductActions product={product} />
              <p className="mt-4 text-xs leading-5 text-ink/55">Razorpay checkout will be used when payment keys are configured. Until then, the existing mock checkout flow can be used for testing.</p>
            </div>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}
