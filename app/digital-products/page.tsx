import {
  CheckCircle2,
  Clock3,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  MousePointerClick,
  Puzzle,
  RotateCcw,
  Sparkles,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

const kitItems: Array<[string, LucideIcon]> = [
  ["20 beautifully designed interactive worksheets", TabletSmartphone],
  ["Activities created for children aged 5-8", Heart],
  ["Simple foundational maths practice", Lightbulb],
  ["Reusable worksheets your child can try again and again", RotateCcw],
  ["Child-friendly design that feels playful and engaging", Sparkles],
  ["Activities that support confidence, curiosity, and logical thinking", Puzzle],
];

const benefits = [
  {
    title: "Build confidence through small wins",
    text: "The activities are simple and encouraging, so children can experience success step by step.",
    icon: CheckCircle2,
  },
  {
    title: "Stay curious and excited to learn",
    text: "The worksheets are designed to feel fun and playful, helping children stay interested.",
    icon: Sparkles,
  },
  {
    title: "Think creatively and logically",
    text: "The activities encourage children to observe, think, match, count, compare, and solve.",
    icon: Lightbulb,
  },
  {
    title: "Reduce maths fear or boredom",
    text: "Instead of forcing maths practice, the kit helps children engage with maths in a lighter way.",
    icon: Heart,
  },
  {
    title: "Build early maths foundation",
    text: "It supports basic maths thinking in a simple, age-appropriate format.",
    icon: Puzzle,
  },
];

const fitChecklist = [
  "Your child is between 5 and 8 years old",
  "Your child is just starting their maths journey",
  "Your child gets bored with regular worksheets",
  "Your child feels scared or unsure about maths",
  "You want simple daily maths practice at home",
  "You want your child to use screen time more mindfully",
  "You want maths practice to feel joyful, not stressful",
];

const faqs = [
  {
    title: "What is Maths Starter Kit?",
    content: "Maths Starter Kit is a digital maths activity kit with 20 interactive worksheets for children aged 5-8.",
  },
  {
    title: "Is this a physical product?",
    content: "No. This is a digital product.",
  },
  {
    title: "Can my child use it more than once?",
    content: "Yes. The worksheets are reusable, so your child can practise again and again.",
  },
  {
    title: "How much time should my child spend daily?",
    content: "Even 15 minutes a day is enough to build a small, joyful maths habit.",
  },
  {
    title: "Is this suitable for a child who is scared of maths?",
    content: "Yes. The kit is designed to make maths feel simple, playful, and less stressful.",
  },
  {
    title: "Is this only for children who are weak in maths?",
    content: "No. It is useful for any child aged 5-8 who needs foundational maths practice in a fun and engaging way.",
  },
];

const starterKitVideos = [
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kid-Video-01.mp4",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kid-Video-03.mp4",
];

const starterKitTestimonials = [
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-01.jpg",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-04.jpg",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-07.jpg",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-10.jpg",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-11.jpg",
  "/Testinomials- Maths-Starter-Kit/Math-Starter-Kit-14.jpg",
];

export default function DigitalProductsPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-beige/80 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-coral">Maths Starter Kit</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-blueDeep sm:text-5xl">
              What if your child could start enjoying maths in just 15 minutes a day?
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-ink/72">
              <p>
                Maths Starter Kit is a digital, reusable maths activity kit created for children aged 5-8 to build strong foundational maths skills in a simple and joyful way.
              </p>
              <p>Inside, your child gets 20 beautifully designed interactive worksheets that make maths feel like play, not homework.</p>
              <p>Perfect for children who are just beginning their maths journey, feel scared of maths, or easily lose interest during practice.</p>
            </div>
            <div className="mt-8">
              <Button href="#get-starter-kit" icon>
                Get Maths Starter Kit
              </Button>
              <p className="mt-4 text-sm font-semibold text-blueDeep/75">
                20 interactive worksheets + reusable practice + joyful maths foundation
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-beige/70 p-6">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-blueDeep/10 pb-4">
                  <div>
                    <p className="text-sm font-bold text-coral">Digital activity kit</p>
                    <h2 className="mt-1 text-2xl font-bold text-blueDeep">15 minutes a day</h2>
                  </div>
                  <Clock3 className="h-10 w-10 text-coral" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {["Count", "Match", "Compare", "Solve"].map((label) => (
                    <div key={label} className="rounded-2xl bg-beige/70 px-4 py-5 text-center text-sm font-bold text-blueDeep">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {["20 interactive worksheets", "Reusable practice", "Joyful foundation"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-blueDeep shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-coral" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Why I created it" title="Why I Created Maths Starter Kit">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 sm:p-8">
            <div className="space-y-5 text-base leading-8 text-ink/72">
              <p>Many young children lose interest in maths because practice feels repetitive, boring, or too much like homework.</p>
              <p>I wanted to create something simple, colourful, and engaging.</p>
              <p>Something children can do for a few minutes every day.</p>
              <p>Something that gives them small wins.</p>
              <p>Something that helps them slowly feel:</p>
              <p>That is why I created Maths Starter Kit.</p>
            </div>
          </div>
          <div className="grid place-items-center rounded-[2rem] bg-beige/75 p-6 shadow-soft ring-1 ring-coral/10">
            <div className="rounded-[1.5rem] bg-white px-6 py-8 text-center shadow-sm">
              <Sparkles className="mx-auto h-9 w-9 text-gold" />
              <p className="mt-4 text-3xl font-bold leading-tight text-blueDeep">"Maths is fun. I can do this!"</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Inside the kit" title="What's Inside the Kit?" text="Inside Maths Starter Kit, your child gets:">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kitItems.map(([title, Icon]) => (
            <article key={title as string} className="flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
              <Icon className="h-8 w-8 text-coral" />
              <h3 className="mt-4 text-lg font-bold leading-7 text-blueDeep">{title}</h3>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[2rem] bg-white p-6 text-base leading-8 text-ink/72 shadow-soft ring-1 ring-blueDeep/10">
          Each worksheet is created with a mix of child psychology, engaging design, and practical maths concepts, so children don't feel like they are doing boring homework.
        </div>
      </Section>

      <Section eyebrow="Benefits" title="How This Helps Your Child">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article key={title} className="flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10">
              <Icon className="h-8 w-8 text-coral" />
              <h3 className="mt-4 text-lg font-bold text-blueDeep">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="beige" eyebrow="For your child" title="Who Is This Kit For?">
        <p className="mb-6 max-w-2xl text-base leading-7 text-ink/70">Maths Starter Kit is a good fit if:</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fitChecklist.map((item, index) => (
            <div
              key={item}
              className={`flex gap-3 rounded-soft bg-white p-5 shadow-soft ring-1 ring-blueDeep/10 ${index === fitChecklist.length - 1 ? "md:col-span-2 md:mx-auto md:w-full md:max-w-xl lg:col-span-1 lg:col-start-2" : ""}`}
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <p className="text-sm leading-6 text-ink/70">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Parent comfort" title="Why Parents Love It">
        <div className="grid gap-8 rounded-[2rem] bg-beige/65 p-6 shadow-soft ring-1 ring-blueDeep/10 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:p-8">
          <div className="rounded-[1.5rem] bg-white p-8 text-center shadow-sm">
            <Heart className="mx-auto h-9 w-9 text-coral" />
            <p className="mt-5 text-3xl font-bold leading-tight text-blueDeep">"Can I do one more worksheet?"</p>
          </div>
          <div className="space-y-5 text-base leading-8 text-ink/72">
            <p>Parents love Maths Starter Kit because it is simple to use at home.</p>
            <p>
              Children can practise for just 15 minutes a day, and because the worksheets are reusable, they can come back to the activities again and again.
            </p>
            <p>Many children enjoy it so much that they ask:</p>
            <p>And for a parent, that small sentence means a lot.</p>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Parent feedback" title="Parent Feedback" text="What parents are saying">
        <p className="max-w-3xl text-base leading-8 text-ink/75">A few parent messages and videos showing how children are using Maths Starter Kit at home.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {starterKitVideos.map((src, index) => (
            <article key={src} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-blueDeep/10">
              <video
                className="aspect-video w-full bg-beige object-cover"
                controls
                preload="metadata"
                playsInline
              >
                <source src={src} type="video/mp4" />
              </video>
              <p className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-blueDeep">
                <MessageCircle className="h-4 w-4 text-coral" />
                Maths Starter Kit Video {index + 1}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-blueDeep/15 to-transparent" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {starterKitTestimonials.map((src, index) => (
            <article key={src} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-blueDeep/10">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={src}
                  alt={`Maths Starter Kit parent feedback ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <p className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-blueDeep">
                <MessageCircle className="h-4 w-4 text-coral" />
                Parent Feedback
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Questions" title="FAQ Section">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>

      <section id="get-starter-kit" className="scroll-mt-24 bg-beige/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Start gently</p>
              <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">Ready to make maths practice joyful for your child?</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-ink/72">
                <p>Your child does not need long, stressful practice sessions.</p>
                <p>Sometimes, just 15 minutes of joyful maths practice a day can help them build confidence, curiosity, and a stronger foundation.</p>
                <p>Give your child a simple and fun way to begin loving maths.</p>
                <p className="font-bold text-blueDeep">20 interactive worksheets for children aged 5-8.</p>
              </div>
            </div>
            <Button href="#get-starter-kit" icon>
              Get Maths Starter Kit
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
