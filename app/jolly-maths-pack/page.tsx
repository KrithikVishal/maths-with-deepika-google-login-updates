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
import { JollyPageEffects } from "@/components/JollyPageEffects";
import { PageShell } from "@/components/PageShell";
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
      "Number sense, counting, skip counting, odd/even numbers, number bonds, basic addition and subtraction, place value, patterns, shapes, measurement basics, time, simple data handling, money basics.",
  },
  {
    level: "Level 2",
    suitable: "Usually suitable for Class 3-4 level topics",
    topics:
      "Multiplication, division, fractions, area, perimeter, symmetry, simple 3D shapes, measurement, money math, data handling, word problems, patterns.",
  },
  {
    level: "Level 3",
    suitable: "Usually suitable for Class 5-6 level topics",
    topics:
      "Decimals, percentages, ratios, proportion, angles, nets, 3D solids, coordinate geometry, probability, speed-distance-time, data handling, simple equations.",
  },
  {
    level: "Level 4",
    suitable: "Usually suitable for Class 7-8 level topics",
    topics:
      "Algebra, linear equations, simultaneous equations, quadratic basics, geometry, Pythagoras theorem, probability, statistics, coordinate geometry, word problems, data interpretation, puzzle-based maths.",
  },
];

const pricing: Array<Product & { title: string; description: string; highlight?: boolean }> = [
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
    content: "Choose based on your child’s current understanding and topic needs, not only their class",
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

type JollyDoodleType = "star" | "book" | "pencil" | "blocks" | "plane" | "badge" | "worksheet";

function JollyDoodle({ type, className = "" }: { type: JollyDoodleType; className?: string }) {
  const baseProps = {
    viewBox: "0 0 80 80",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true,
  };

  if (type === "book") {
    return (
      <svg {...baseProps}>
        <path d="M14 22c8-5 17-5 26 0v37c-9-5-18-5-26 0V22Z" fill="#EAF3FF" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M40 22c9-5 18-5 26 0v37c-8-5-17-5-26 0V22Z" fill="#FFF8EC" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M23 33h8M49 33h8M23 44h8M49 44h8" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "pencil") {
    return (
      <svg {...baseProps}>
        <path d="M18 57 54 21l8 8-36 36-13 5 5-13Z" fill="#FFD166" stroke="#102A56" strokeWidth="4" strokeLinejoin="round" />
        <path d="m54 21 4-4a6 6 0 0 1 8 8l-4 4-8-8Z" fill="#FF6B5F" stroke="#102A56" strokeWidth="4" strokeLinejoin="round" />
        <path d="m18 57 8 8" stroke="#102A56" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "blocks") {
    return (
      <svg {...baseProps}>
        <rect x="15" y="17" width="22" height="22" rx="6" fill="#EAF3FF" stroke="#183A8F" strokeWidth="4" />
        <rect x="40" y="27" width="22" height="22" rx="6" fill="#FFE8DD" stroke="#183A8F" strokeWidth="4" />
        <rect x="25" y="47" width="22" height="22" rx="6" fill="#CFF3E2" stroke="#183A8F" strokeWidth="4" />
        <path d="M26 27v8M22 31h8M50 36h4M50 42h4M32 57h8" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "plane") {
    return (
      <svg {...baseProps}>
        <path d="m13 38 52-22-19 50-9-21-24-7Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="m37 45 28-29" stroke="#FF6B5F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "badge") {
    return (
      <svg {...baseProps}>
        <circle cx="40" cy="32" r="18" fill="#FFD166" stroke="#183A8F" strokeWidth="4" />
        <path d="m31 50-5 17 14-7 14 7-5-17" fill="#FFE8DD" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="m32 32 6 6 11-13" stroke="#FF6B5F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "worksheet") {
    return (
      <svg {...baseProps}>
        <path d="M22 12h26l10 10v46H22V12Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M48 12v12h10" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
        <path d="M31 34h17M31 45h20M31 56h12" stroke="#FF6B5F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...baseProps}>
      <path d="m40 11 7 18 19 3-14 13 4 19-16-10-16 10 4-19-14-13 19-3 7-18Z" fill="#FFD166" stroke="#183A8F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 12v12M54 18h12" stroke="#FF6B5F" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function JollyMathsPackPage() {
  return (
    <PageShell>
      <JollyPageEffects />
      <section className="bg-white">
        <div className="jolly-reveal mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-coral">Jolly Maths Pack</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-[1.32] tracking-tight text-blueDeep sm:text-4xl sm:leading-[1.28] lg:text-[2.5rem] lg:leading-[1.26]">
              What if maths practice didn’t feel like boring homework?
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-ink/72">
              <p>Jolly Maths Pack is a fun-based hard copy maths workbook series created to help children practise maths with more interest, clarity, and confidence.</p>
              <p>So your child is not just getting a workbook.</p>
              <p>They are getting structured practice, guidance, and support to slowly build maths confidence.</p>
            </div>
            <div className="mt-8">
              <p className="mb-5 inline-flex rounded-full border border-borderSoft bg-[#EAF3FF] px-4 py-2 text-sm font-semibold text-blueDeep shadow-[0_10px_24px_rgba(16,42,86,0.08)]">
                100 worksheets in every level + answer key + 6 months WhatsApp support
              </p>
              <div>
                <Button href="#pricing" icon className="jolly-button-primary">
                  Choose Your Jolly Maths Pack
                </Button>
              </div>
            </div>
          </div>

          <div className="jolly-card-motion jolly-float-subtle relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-dashed border-borderSoft bg-[#FFF8EC] p-6 shadow-soft">
            <div className="pointer-events-none absolute right-8 top-8 text-coral/70" aria-hidden="true">
              <PackageCheck className="h-12 w-12" />
            </div>
            <div className="pointer-events-none absolute left-8 bottom-8 text-gold/80" aria-hidden="true">
              <Sparkles className="h-10 w-10" />
            </div>
            <JollyDoodle type="plane" className="site-doodle pointer-events-none absolute left-8 top-8 hidden h-12 w-12 -rotate-12 opacity-25 md:block" />
            <div className="grid h-full min-h-[20rem] place-items-center rounded-[1.5rem] bg-white/70 text-center">
              <div>
                <div className="mx-auto mb-4 h-14 w-14 rounded-[1.25rem] bg-[#FFE8DD] shadow-[0_10px_24px_rgba(16,42,86,0.08)]" />
                <p className="text-lg font-bold text-blueDeep">Jolly Maths Pack Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-beige">
        <JollyDoodle type="pencil" className="site-doodle jolly-float-slow pointer-events-none absolute right-8 top-10 hidden h-14 w-14 rotate-12 opacity-20 lg:block" />
        <JollyDoodle type="star" className="site-doodle jolly-float-subtle jolly-float-delay pointer-events-none absolute bottom-12 left-10 hidden h-12 w-12 -rotate-6 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-coral">Founder note</p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-blueDeep sm:text-3xl lg:text-4xl">Why I Created Jolly Maths Pack</h2>
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="jolly-card-motion rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-borderSoft sm:p-8 lg:p-10">
              <div className="space-y-6 text-base leading-8 text-ink/72">
                <div className="rounded-[1.5rem] bg-beige/65 p-5">
                  <p>Many children don’t enjoy maths practice because it feels like plain sums, pressure, or boring homework.</p>
                </div>
                <div className="space-y-4 border-l-4 border-coral/35 pl-5">
                  <p>I wanted to create something different.</p>
                  <p>A workbook that feels light, visual, fun, and child-friendly.</p>
                  <p>A workbook where children can practise maths through activities, puzzles, visuals, story-based questions, and concept-based tasks.</p>
                </div>
                <div className="rounded-[1.5rem] border border-borderSoft bg-white p-5">
                  <p>A workbook that helps them think, apply, and slowly feel:</p>
                </div>
                <p className="text-lg font-semibold text-blueDeep">That is why I created Jolly Maths Pack.</p>
              </div>
            </div>
            <div className="jolly-card-motion jolly-float-slow rounded-[2rem] border border-dashed border-borderSoft bg-white p-6 shadow-soft">
              <div className="grid min-h-[420px] place-items-center rounded-[1.5rem] bg-[#F8FAFD] text-center">
                <div>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-[1rem] bg-[#FFE8DD]" />
                  <p className="text-lg font-bold text-blueDeep">
                    Image Placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <JollyDoodle type="book" className="site-doodle jolly-float-subtle pointer-events-none absolute left-8 top-12 hidden h-12 w-12 -rotate-6 opacity-20 lg:block" />
        <JollyDoodle type="badge" className="site-doodle jolly-float-slow jolly-float-delay pointer-events-none absolute bottom-14 right-8 hidden h-14 w-14 rotate-6 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Special features</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">What Makes Jolly Maths Pack Special?</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <article key={title} className="jolly-card-motion flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-borderSoft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10">
                <Icon className="h-7 w-7 text-coral" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-blueDeep">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{text}</p>
            </article>
          ))}
        </div>
          <div className="text-center">
            <Button href="#pricing" variant="secondary" className="jolly-button-secondary mt-8">
              View Levels & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-beige">
        <JollyDoodle type="blocks" className="site-doodle jolly-float-slow pointer-events-none absolute right-10 top-16 hidden h-14 w-14 opacity-20 lg:block" />
        <JollyDoodle type="worksheet" className="site-doodle jolly-float-subtle jolly-float-delay pointer-events-none absolute bottom-16 left-8 hidden h-14 w-14 -rotate-6 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-coral">Levels</p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-blueDeep sm:text-3xl lg:text-4xl">Choose the Right Level for Your Child</h2>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="jolly-card-motion rounded-[2rem] bg-beige/65 p-5 text-center shadow-soft ring-1 ring-borderSoft sm:p-6 lg:p-7">
              <div className="rounded-[1.5rem] border border-[#FFD166]/45 bg-[#FFF8EC] p-5 text-center shadow-sm md:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">4 guided levels</p>
                <h3 className="mx-auto mt-3 max-w-6xl text-xl font-bold leading-tight text-blueDeep sm:text-2xl lg:text-[1.55rem]">
                  Choose based on your child’s current understanding, not just their class
                </h3>
                <p className="mx-auto mt-2 max-w-3xl text-base leading-7 text-ink/70">
                  <b>Jolly Maths Pack is divided into 4 levels, with each level roughly following common class-group concepts.</b>
                </p>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/90 p-5 text-center shadow-sm md:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Gentle reminder</p>
                  <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/70">
                    <b>Sometimes, a child in Class 5 may need support with Level 1 or Level 2 topics before moving to Level 3.</b>
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-white/90 p-5 text-center shadow-sm md:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">That is completely okay</p>
                  <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/70">
                    <b>Foundation strong ah irundha dhaan confidence varum.</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
              {levels.map((item) => (
                <article key={item.level} className="jolly-card-motion rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-borderSoft">
                  <span className="rounded-full bg-gold/25 px-3 py-1 text-xs font-bold text-blueDeep">{item.level}</span>
                  <h3 className="mt-4 text-lg font-bold leading-7 text-blueDeep">{item.suitable}</h3>
                  <p className="mt-4 text-sm font-bold text-coral">Topics:</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-ink/70">{item.topics}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-white">
        <JollyDoodle type="star" className="site-doodle jolly-float-subtle pointer-events-none absolute left-10 top-20 hidden h-12 w-12 rotate-12 opacity-20 lg:block" />
        <JollyDoodle type="pencil" className="site-doodle jolly-float-slow jolly-float-delay pointer-events-none absolute bottom-16 right-10 hidden h-14 w-14 -rotate-12 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">Choose Your Jolly Maths Pack</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((product) => (
              <article key={product.id} className={`jolly-card-motion flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ${product.highlight ? "ring-coral/35" : "ring-1 ring-borderSoft"}`}>
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

      <section className="relative overflow-hidden bg-beige">
        <JollyDoodle type="plane" className="site-doodle jolly-float-slow pointer-events-none absolute left-12 top-40 hidden h-14 w-14 rotate-12 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Right fit</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">Who Is This For?</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="jolly-card-motion jolly-float-subtle flex min-h-full flex-col items-center justify-center rounded-[2rem] bg-beige/65 p-6 text-center shadow-soft ring-1 ring-borderSoft sm:p-8">
              <Star className="h-8 w-8 text-gold" />
              <p className="mx-auto mt-4 max-w-md text-base leading-8 text-ink/72">
                Image placeholder
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fitItems.map((item) => (
                <div key={item} className="jolly-card-motion rounded-soft bg-white p-5 shadow-soft ring-1 ring-borderSoft">
                  <CheckCircle2 className="h-6 w-6 text-coral" />
                  <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <JollyDoodle type="book" className="site-doodle jolly-float-subtle pointer-events-none absolute right-10 top-20 hidden h-12 w-12 rotate-6 opacity-20 lg:block" />
        <JollyDoodle type="star" className="site-doodle jolly-float-slow jolly-float-delay pointer-events-none absolute bottom-12 left-10 hidden h-10 w-10 -rotate-12 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Parent feedback</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">What parents are saying</h2>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {jollyTestimonials.map((src, index) => (
              <article key={src} className="jolly-testimonial-motion mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-borderSoft">
                <div className="relative aspect-[3/4] bg-white">
                  <Image
                    src={src}
                    alt={`Jolly Maths Pack testimonial ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-beige">
        <JollyDoodle type="worksheet" className="site-doodle jolly-float-slow pointer-events-none absolute right-10 top-16 hidden h-14 w-14 rotate-6 opacity-20 lg:block" />
        <div className="jolly-reveal relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Questions</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">FAQ</h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="jolly-reveal mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Start practising</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">Ready to make maths practice more fun and consistent?</h2>
          </div>
          <div className="jolly-cta-breathe relative overflow-hidden rounded-[2rem] bg-[#FFF8EC] p-6 text-center shadow-soft ring-1 ring-borderSoft lg:p-10">
            <div className="pointer-events-none absolute left-8 top-8 text-[#FFD166]/65" aria-hidden="true">
              <Sparkles className="h-10 w-10" />
            </div>
            <div className="pointer-events-none absolute bottom-8 right-8 text-[#183A8F]/10" aria-hidden="true">
              <BookOpenCheck className="h-16 w-16" />
            </div>
            <JollyDoodle type="badge" className="site-doodle jolly-float-subtle pointer-events-none absolute bottom-8 left-8 hidden h-12 w-12 opacity-20 lg:block" />

            <div className="mx-auto max-w-3xl">
              <p className="text-2xl font-bold leading-tight text-blueDeep sm:text-3xl">
                Your child does not need more boring worksheets.
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/72">
                They need practice that feels visual, engaging, and confidence-building.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/72">
                Choose the level that fits your child’s current need and let them start practising one worksheet at a time.
              </p>

              <div className="mx-auto mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold leading-6 text-blueDeep shadow-sm ring-1 ring-borderSoft">
                100 worksheets in every level + answer key + 6 months WhatsApp support from me.
              </div>

              <div className="mt-8 flex justify-center">
                <Button href="#pricing" icon className="jolly-button-primary">
                  Order Jolly Maths Pack
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
