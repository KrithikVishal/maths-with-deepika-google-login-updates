import {
  BookOpenCheck,
  CheckCircle2,
  Heart,
  KeyRound,
  MessageCircle,
  NotebookTabs,
  PackageCheck,
  Puzzle,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { ProductActions } from "@/components/cart/ProductActions";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Product } from "@/lib/types";

const features = [
  {
    title: "100 worksheets in every level",
    text: "Each level includes 100 carefully designed worksheets, giving your child enough practice without making maths feel heavy.",
    icon: BookOpenCheck,
  },
  {
    title: "Fun-based practice",
    text: "The worksheets are created with activities, visuals, puzzles, and child-friendly layouts so practice feels more engaging.",
    icon: Puzzle,
  },
  {
    title: "Topic-wise learning",
    text: "Each level covers important maths topics in a structured way, so your child can practise step by step.",
    icon: NotebookTabs,
  },
  {
    title: "Answer key included",
    text: "You will receive the answer key, so checking becomes easier and clearer.",
    icon: KeyRound,
  },
  {
    title: "6 months WhatsApp support from me",
    text: "If your child gets stuck or if you need help understanding any question, you can reach out to me for support.",
    icon: MessageCircle,
  },
  {
    title: "Not just a book",
    text: "Jolly Maths Pack is designed as a maths confidence-building practice system for your child.",
    icon: Heart,
  },
];

const levels = [
  {
    level: "Level 1",
    suitable: "Usually suitable for Class 1-2 level topics",
    topics:
      "number sense, counting, skip counting, odd/even numbers, number bonds, basic addition and subtraction, place value, patterns, shapes, measurement basics, time, simple data handling, money basics.",
  },
  {
    level: "Level 2",
    suitable: "Usually suitable for Class 3-4 level topics",
    topics:
      "multiplication, division, fractions, area, perimeter, symmetry, simple 3D shapes, measurement, money math, data handling, word problems, patterns.",
  },
  {
    level: "Level 3",
    suitable: "Usually suitable for Class 5-6 level topics",
    topics:
      "decimals, percentages, ratios, proportion, angles, nets, 3D solids, coordinate geometry, probability, speed-distance-time, data handling, simple equations.",
  },
  {
    level: "Level 4",
    suitable: "Usually suitable for Class 7-8 level topics",
    topics:
      "algebra, linear equations, simultaneous equations, quadratic basics, geometry, Pythagoras theorem, probability, statistics, coordinate geometry, word problems, data interpretation, puzzle-based maths.",
  },
];

const pricing: Array<Product & { title: string; description: string; highlight?: boolean }> = [
  {
    id: "razorpay-test-product-1inr",
    name: "Razorpay Test Product",
    title: "Razorpay Test Product",
    price: 1,
    priceLabel: "₹1",
    status: "In stock",
    stock: 100,
    description: "Temporary test item for verifying Razorpay payment flow.",
  },
  {
    id: "jolly-maths-pack-1-book",
    name: "Jolly Maths Pack - Any 1 Book",
    title: "Any 1 Book",
    price: 799,
    priceLabel: "₹799",
    status: "In stock",
    stock: 40,
    description: "Best if you want to start with one level.",
  },
  {
    id: "jolly-maths-pack-2-books",
    name: "Jolly Maths Pack - Any 2 Books",
    title: "Any 2 Books",
    price: 1499,
    priceLabel: "₹1,499",
    status: "In stock",
    stock: 40,
    description: "Best if your child needs support across two levels.",
  },
  {
    id: "jolly-maths-pack-3-books",
    name: "Jolly Maths Pack - Any 3 Books",
    title: "Any 3 Books",
    price: 2199,
    priceLabel: "₹2,199",
    status: "In stock",
    stock: 40,
    description: "Best for building foundation and moving step by step.",
  },
  {
    id: "jolly-maths-pack-4-books",
    name: "Jolly Maths Pack - Any 4 Books",
    title: "Any 4 Books",
    price: 2799,
    priceLabel: "₹2,799",
    status: "In stock",
    stock: 40,
    description: "Best value for parents who want the complete Jolly Maths Pack set.",
    highlight: true,
  },
];

const fitItems = [
  "Your child needs regular maths practice but doesn’t enjoy boring worksheets.",
  "Your child needs more visual, activity-based practice.",
  "Your child understands the concept but needs more confidence while solving.",
  "You want a hard copy workbook your child can use at home.",
  "You want answer keys and support instead of figuring everything out alone.",
  "You want maths practice to feel lighter, more joyful, and more consistent.",
];

const faqs = [
  {
    title: "Is Jolly Maths Pack a physical book?",
    content: "Yes. Jolly Maths Pack is a hard copy workbook series.",
  },
  {
    title: "How many worksheets are there in each level?",
    content: "Each level includes 100 fun-based worksheets.",
  },
  {
    title: "Will I get the answer key?",
    content: "Yes. You will receive the answer key with the book.",
  },
  {
    title: "Will I get support after buying?",
    content: "Yes. You will get 6 months WhatsApp support from me for doubt clarification.",
  },
  {
    title: "Which level should I choose for my child?",
    content: "Choose based on your child’s current understanding and topic needs, not only their class.",
  },
  {
    title: "Can I buy more than one level?",
    content: "Yes. You can buy 1, 2, 3, or all 4 levels.",
  },
  {
    title: "Can a Class 5 child use Level 1 or Level 2?",
    content: "Yes. If your child needs foundation strengthening, they can use earlier levels.",
  },
];

const jollyTestimonials = [
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-01.jpeg",
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-02.jpeg",
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-03.jpeg",
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-04.jpeg",
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-05.jpeg",
  "/Testimonials- Jolly-Math-Pack/Jolly Math Pack-07.jpeg",
];

export default function JollyMathsPackPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-beige/80 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-coral">Jolly Maths Pack</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-blueDeep sm:text-5xl">
              What if maths practice didn’t feel like boring homework?
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-ink/72">
              <p>Jolly Maths Pack is a fun-based hard copy maths workbook series created to help children practise maths with more interest, clarity, and confidence.</p>
              <p>Each level comes with 100 fun-based worksheets, answer key, and 6 months WhatsApp support from me.</p>
              <p>So your child is not just getting a workbook.</p>
              <p>They are getting structured practice, guidance, and support to slowly build maths confidence.</p>
            </div>
            <div className="mt-8">
              <Button href="#pricing" icon>
                Choose Your Jolly Maths Pack
              </Button>
              <p className="mt-4 text-sm font-semibold text-blueDeep/75">100 worksheets in every level + answer key + 6 months WhatsApp support</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-beige/70 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-5 shadow-sm sm:col-span-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-coral">Hard copy workbook</p>
                      <h2 className="mt-1 text-2xl font-bold text-blueDeep">Jolly Maths Pack</h2>
                    </div>
                    <PackageCheck className="h-10 w-10 text-coral" />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {["100 worksheets", "Answer key", "6 months support", "Fun-based practice"].map((item) => (
                      <div key={item} className="rounded-2xl bg-beige/70 px-4 py-3 text-sm font-bold text-blueDeep">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-blueDeep">Practice cards</p>
                  <div className="mt-4 grid gap-2">
                    {["Activity", "Puzzle", "Story sum"].map((item) => (
                      <div key={item} className="rounded-2xl bg-gold/20 px-4 py-3 text-xs font-bold text-blueDeep">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-blueDeep p-5 text-white shadow-sm">
                  <Sparkles className="h-8 w-8 text-gold" />
                  <p className="mt-4 text-2xl font-bold leading-tight">“Maths easy dhaan!”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Founder note" title="Why I Created Jolly Maths Pack">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 sm:p-8">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72">
              <div className="rounded-3xl bg-beige/55 p-5">
                <p>Many children don’t enjoy maths practice because it feels like plain sums, pressure, or boring homework.</p>
              </div>
              <div className="space-y-4 border-l-4 border-coral/35 pl-5">
                <p>I wanted to create something different.</p>
                <p>A workbook that feels light, visual, fun, and child-friendly.</p>
                <p>A workbook where children can practise maths through activities, puzzles, visuals, story-based questions, and concept-based tasks.</p>
              </div>
              <div className="rounded-3xl border border-blueDeep/10 bg-white p-5 shadow-sm">
                <p>A workbook that helps them think, apply, and slowly feel:</p>
              </div>
              <p className="font-semibold text-blueDeep">That is why I created Jolly Maths Pack.</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] bg-beige/75 p-6 shadow-soft ring-1 ring-coral/10">
              <div className="rounded-[1.5rem] bg-white px-6 py-8 text-center shadow-sm">
                <Sparkles className="mx-auto h-9 w-9 text-gold" />
                <p className="mt-4 text-3xl font-bold leading-tight text-blueDeep">“Maths easy dhaan!”</p>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
              <p className="text-lg font-bold leading-8 text-blueDeep">A lighter way for children to practise, think, apply, and slowly enjoy maths.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Special features" title="What Makes Jolly Maths Pack Special?">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <article key={title} className="flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 transition hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10">
                <Icon className="h-7 w-7 text-coral" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-blueDeep">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{text}</p>
            </article>
          ))}
        </div>
        <Button href="#pricing" variant="secondary" className="mt-8">
          View Levels & Pricing
        </Button>
      </Section>

      <Section eyebrow="Levels" title="Choose the Right Level for Your Child">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] bg-beige/65 p-5 shadow-soft ring-1 ring-blueDeep/10 sm:p-6">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">4 guided levels</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-blueDeep">
                Choose based on your child’s current understanding, not just their class.
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink/70">
                Jolly Maths Pack is divided into 4 levels, with each level roughly following common class-group concepts.
              </p>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="rounded-[1.5rem] bg-white/80 p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Gentle reminder</p>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  Sometimes, a child in Class 5 may need support with Level 1 or Level 2 topics before moving to Level 3.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-blueDeep p-5 text-white shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">That is completely okay</p>
                <p className="mt-3 text-xl font-bold leading-8">
                  Foundation strong ah irundha dhaan confidence varum.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {levels.map((item) => (
              <article key={item.level} className="rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
                <span className="rounded-full bg-gold/25 px-3 py-1 text-xs font-bold text-blueDeep">{item.level}</span>
                <h3 className="mt-4 text-lg font-bold leading-7 text-blueDeep">{item.suitable}</h3>
                <p className="mt-4 text-sm font-bold text-coral">Topics:</p>
                <p className="mt-2 text-sm leading-7 text-ink/68">{item.topics}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <section id="pricing" className="scroll-mt-24 bg-beige/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">Choose Your Jolly Maths Pack</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((product) => (
              <article key={product.id} className={`flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ${product.highlight ? "ring-coral/35" : "ring-blueDeep/10"}`}>
                {product.highlight ? <span className="mb-4 w-fit rounded-full bg-gold/30 px-3 py-1 text-xs font-bold text-blueDeep">Best value</span> : null}
                <h3 className="text-xl font-bold text-blueDeep">{product.title}</h3>
                <p className="mt-4 text-3xl font-bold text-blueDeep">{product.priceLabel}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{product.description}</p>
                <div className="mt-5 rounded-2xl bg-beige/60 px-4 py-3 text-xs font-semibold leading-5 text-blueDeep">
                  Every book includes 100 fun-based worksheets, answer key, and 6 months WhatsApp support from me.
                </div>
                <div className="mt-1">
                  <ProductActions product={product} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Right fit" title="Who Is This For?">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] bg-beige/65 p-6 shadow-soft ring-1 ring-blueDeep/10 sm:p-8">
            <Star className="h-8 w-8 text-gold" />
            <h3 className="mt-4 text-2xl font-bold text-blueDeep">A good fit for steady, joyful practice at home.</h3>
            <p className="mt-4 text-base leading-8 text-ink/72">
              Use Jolly Maths Pack when your child needs regular practice that feels visual, lighter, and more confidence-building.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fitItems.map((item) => (
              <div key={item} className="rounded-soft bg-white p-5 shadow-soft ring-1 ring-blueDeep/10">
                <CheckCircle2 className="h-6 w-6 text-coral" />
                <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Parent feedback" title="What parents are saying">
        <p className="mb-6 max-w-3xl text-base leading-8 text-ink/75">Real parent messages from families using Jolly Maths Pack for regular maths practice.</p>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {jollyTestimonials.map((src, index) => (
            <article key={src} className="mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-blueDeep/10">
              <div className="relative aspect-[3/4] bg-white">
                <Image
                  src={src}
                  alt={`Jolly Maths Pack testimonial ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-blueDeep">
                <MessageCircle className="h-4 w-4 text-coral" />
                Jolly Maths Pack Review
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Questions" title="FAQ">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>

      <Section tone="beige" eyebrow="Start practising" title="Ready to make maths practice more fun and consistent?">
        <div className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div className="max-w-3xl space-y-4 text-base leading-8 text-ink/72">
            <p>Your child does not need more boring worksheets.</p>
            <p>They need practice that feels visual, engaging, and confidence-building.</p>
            <p>Choose the level that fits your child’s current need and let them start practising one worksheet at a time.</p>
            <p className="font-bold text-blueDeep">100 worksheets in every level + answer key + 6 months WhatsApp support from me.</p>
          </div>
          <Button href="#pricing" icon>
            Order Jolly Maths Pack
          </Button>
        </div>
      </Section>
    </PageShell>
  );
}
