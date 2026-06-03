import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Heart,
  HelpCircle,
  MessageCircle,
  Pencil,
  PlayCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

const learningCards = [
  ["Understand the concept clearly", CheckCircle2],
  ["Practise through number-based questions", Pencil],
  ["Apply the concept in story-based and real-life questions", BookOpen],
  ["Learn through fun, visual, and interactive activities", Sparkles],
  ["Build confidence through small wins", Star],
];

const supportOptions = [
  {
    title: "5-Day Maths Bootcamps",
    subtitle: "For children who need topic-wise support and guided learning",
    description:
      "Our 5-Day Maths Bootcamps are short, focused programs created for children who need help with specific maths topics.",
    features: ["Recorded video lessons", "Printable worksheets", "Interactive online worksheets", "Answer keys", "Lifetime access"],
    note:
      "The interactive worksheets are one of my favourite parts. When children enter the right answer, they receive appreciation on the screen. If they enter a wrong answer, they get positive feedback that helps them think again without feeling discouraged.",
    classNote:
      "These bootcamps are created mainly for children from Class 1 to Class 8. Older children can also join if they need stronger basics.",
    topics: ["Addition, Subtraction & Number Comparison", "Multiplication, Division & Fractions Basics", "Factors, Multiples, LCM & HCF", "Algebra & Linear Equations"],
    bestFor: "Children who need help understanding a particular maths topic with video lessons and guided practice.",
    button: "Explore 5-Day Bootcamps",
    href: "/bootcamp",
    icon: PlayCircle,
  },
  {
    title: "Jolly Maths Pack",
    subtitle: "For children who need regular practice in a fun, workbook-based format",
    description:
      "Jolly Maths Pack is a hard copy fun-based maths workbook series created to make maths practice feel lighter, visual, and engaging.",
    features: ["Answer key", "6 months WhatsApp support from me", "Fun, activity-based practice", "Topic-wise worksheets", "Child-friendly layouts"],
    note: "Each level includes 100 fun-based worksheets. But this is not just another maths book.",
    classNote: "So if your child gets stuck or if you need help understanding any question, you can reach out for support.",
    topics: [],
    bestFor: "Children who need regular maths practice through a hard copy book.",
    button: "View Jolly Maths Pack",
    href: "/jolly-maths-pack",
    icon: BookOpen,
  },
  {
    title: "Maths Starter Kit",
    subtitle: "For young children aged 5–8 who are beginning their maths journey",
    description:
      "Maths Starter Kit is a digital reusable maths activity kit created to help young children build strong foundational maths skills.",
    features: ["Simple activities", "Reusable practice", "Early maths confidence", "Short daily learning", "Foundational skill support"],
    note: "It is simple, interactive, and designed for short daily practice. Just 15 minutes a day can help your child build early maths confidence.",
    classNote: "",
    topics: [],
    bestFor: "Parents who want simple, reusable, foundational maths activities for children aged 5–8.",
    button: "Get Maths Starter Kit",
    href: "/digital-products",
    icon: ClipboardCheck,
  },
];

const parentReasons = [
  ["Concept clarity", "We explain concepts in a simple and child-friendly way.", CheckCircle2],
  ["Application-based practice", "Children don’t just practise direct sums. They also get questions that help them apply what they learn.", BookOpen],
  ["Fun learning experience", "Worksheets and activities are designed to feel engaging, not like boring homework.", Sparkles],
  ["Confidence-building feedback", "Interactive worksheets encourage children when they answer correctly and gently guide them when they make mistakes.", Star],
  ["Support for parents", "For selected products like Jolly Maths Pack, you also get WhatsApp support from me, so you are not left alone after buying.", MessageCircle],
];

export default function ForKidsPage() {
  return (
    <PageShell>
      <a href="#choose-support" className="focus-ring fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full bg-coral px-5 py-3 text-center text-sm font-bold text-white shadow-soft transition hover:brightness-95">
        Find the Right Option for My Child
      </a>

      <section className="soft-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">For Kids</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-blueDeep sm:text-4xl lg:text-5xl">What if your child could understand maths without fear or pressure?</h1>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-ink/75">
              <p>If your child feels maths is difficult, confusing, or boring, I want you to know this first:</p>
              <p className="rounded-2xl bg-white p-4 text-xl font-bold text-blueDeep shadow-sm">Your child is not “weak” in maths.</p>
              <p>Maybe they just need the right way of learning.</p>
              <p>At Maths with Deepika, we create maths programs and products that help children learn with clarity instead of pressure.</p>
              <p>Our teaching focuses not only on what to do and how to do, but also on why it works and where to apply it.</p>
            </div>
            <Button href="#choose-support" className="mt-8" icon>Find the Right Option for My Child</Button>
          </div>
          <div className="rounded-[2rem] border border-borderSoft bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-beige/70 p-6">
              <Heart className="h-9 w-9 text-coral" />
              <h2 className="mt-5 text-2xl font-bold leading-snug text-blueDeep">A calm way to help maths feel simple again.</h2>
              <div className="mt-6 grid gap-3">
                {["Worksheets", "Practice", "Support", "Confidence"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 text-sm font-bold text-blueDeep shadow-sm">{item}</div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-blueDeep p-5 text-white">
                <p className="text-sm text-white/75">Learning feeling</p>
                <p className="mt-2 text-2xl font-bold">“Oh, maths easy dhaan!”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Learning approach" title="How We Help Children Learn Maths" text="Maths should not feel like fear. It should feel like understanding.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-beige/70 p-6 md:p-8">
            <div className="space-y-5 text-base leading-8 text-ink/75">
              <p>Many children struggle with maths because they only memorise steps.</p>
              <p>They know the method for one question, but when the question changes slightly, they get stuck.</p>
              <p>That is why our learning approach is different.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {learningCards.map(([title, Icon]) => (
              <div key={title as string} className="rounded-soft border border-borderSoft bg-white p-5 shadow-soft">
                <Icon className="h-6 w-6 text-coral" />
                <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{title as string}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-[2rem] bg-blueDeep p-6 text-white shadow-soft">
          <p className="text-sm text-white/75">The goal is simple:</p>
          <p className="mt-2 text-3xl font-bold">Your child should slowly feel, “Oh, maths easy dhaan!”</p>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Options" title="Choose the Right Maths Support for Your Child">
        <div id="choose-support" />
        <p className="mb-8 max-w-3xl text-base leading-8 text-ink/75">Here are the learning options available:</p>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.2fr_1fr]">
          {[supportOptions[1], supportOptions[0], supportOptions[2]].map((option) => {
            const Icon = option.icon;
            return (
              <article
  key={option.title}
  className="flex flex-col rounded-[2rem] bg-white p-6 shadow-soft"
>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-blueDeep">{option.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-coral">{option.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-ink/70">{option.description}</p>
                <div className={`mt-5 grid grid-cols-1 gap-2 ${option.title === "5-Day Maths Bootcamps" ? "sm:grid-cols-2" : ""}`}>
  {option.features.map((feature) => (
    <div
      key={feature}
      className="rounded-2xl bg-beige/60 px-4 py-3 text-sm font-semibold leading-5 text-blueDeep"
    >
      {feature}
    </div>
  ))}
</div>
                <div className="mt-5 rounded-[1.5rem] bg-white ring-1 ring-borderSoft p-4">
  <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
    Why children enjoy this
  </p>

  <p className="mt-3 text-sm leading-6 text-ink/70">
    {option.note}
  </p>

  {option.classNote ? (
    <p className="mt-4 text-sm leading-6 text-ink/70">
      {option.classNote}
    </p>
  ) : null}
</div>
                {option.topics.length > 0 ? (
                  <div className="mt-5">
                    <p className="text-sm font-bold text-blueDeep">Available Bootcamp Topics:</p>
                    <div className="mt-3 grid gap-2">
                      {option.topics.map((topic) => <div key={topic} className="rounded-xl border border-borderSoft px-3 py-2 text-sm text-ink/70">{topic}</div>)}
                    </div>
                  </div>
                ) : null}
                <div className="mt-auto pt-6">
  <div className="rounded-2xl bg-gold/20 p-4 text-sm font-bold leading-6 text-blueDeep">
    Best for: {option.bestFor}
  </div>

  <Button
    href={option.href}
    variant="ghost"
    className="mt-6 w-full justify-center"
  >
    {option.button}
  </Button>
</div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Decision helper" title="Not Sure Which One to Choose?">
        <p className="mb-6 max-w-3xl text-base leading-8 text-ink/75">Let me make it simple for you.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["If your child needs help with a specific topic, choose:", "5-Day Maths Bootcamps"],
            ["If your child needs regular maths practice through a hard copy book, choose:", "Jolly Maths Pack"],
            ["If your child is 5–8 years old and needs early foundation activities, choose:", "Maths Starter Kit"],
          ].map(([text, choice]) => (
            <div key={choice} className="rounded-soft border border-borderSoft bg-white p-6 shadow-soft">
              <HelpCircle className="h-7 w-7 text-coral" />
              <p className="mt-4 text-sm leading-6 text-ink/70">{text}</p>
              <p className="mt-3 text-xl font-bold text-blueDeep">{choice}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-soft bg-beige/70 p-6">
          <p className="text-base leading-8 text-ink/75">If your child needs stronger basics, don’t worry about class alone. Choose based on the topics your child needs support with.</p>
          <Button href="#choose-support" variant="secondary" className="mt-5">Help Me Choose the Right Option</Button>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Why parents choose us" title="Why Parents Choose Maths with Deepika" text="Because maths support should feel clear, kind, and practical.">
        <div className="mb-8 max-w-3xl space-y-5 text-base leading-8 text-ink/75">
          <p>At Maths with Deepika, we don’t believe in making children feel pressured or scared.</p>
          <p>We believe children learn better when they feel safe to try, make mistakes, think again, and practise with encouragement.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {parentReasons.map(([title, text, Icon]) => (
            <div key={title as string} className="rounded-soft bg-white p-5 shadow-soft">
              <Icon className="h-7 w-7 text-coral" />
              <h3 className="mt-4 text-base font-bold text-blueDeep">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text as string}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Stories" title="Real stories from parents and children" text="Every small improvement matters.">
        <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
          <p>Some children started enjoying maths practice.</p>
          <p>Some parents felt relieved because their child was finally engaging with the worksheets.</p>
          <p>Some children joined the bootcamps and slowly started feeling that maths is not as difficult as they thought.</p>
          <p>These messages remind me why I create these programs and products.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Bootcamps", "Jolly Maths Pack", "Maths Starter Kit", "Student feedback"].map((label) => (
            <div key={label} className="rounded-soft bg-white p-5 shadow-soft">
              <div className="grid aspect-[4/5] place-items-center rounded-2xl bg-beige/70 text-center">
                <div>
                  <MessageCircle className="mx-auto h-9 w-9 text-coral" />
                  <p className="mt-4 text-sm font-bold text-blueDeep">{label}</p>
                  <p className="mt-2 text-xs text-ink/60">Screenshot placeholder</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Begin" title="Ready to Help Your Child Feel More Confident in Maths?">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
            <p>Your child does not need more pressure.</p>
            <p>They need clarity, practice, encouragement, and the right support.</p>
            <p>Choose the option that fits your child’s current need.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/bootcamp">Explore 5-Day Bootcamps</Button>
            <Button href="/jolly-maths-pack" variant="secondary">View Jolly Maths Pack</Button>
            <Button href="/digital-products" variant="ghost">Get Maths Starter Kit</Button>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
