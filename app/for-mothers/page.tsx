import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Heart,
  MessageCircle,
  Mic,
  PlayCircle,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { FounderPhotoFrame } from "@/components/FounderPhotoFrame";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import Image from "next/image";

const syllabusGroups = [
  {
    title: "Foundation and number comfort",
    topics: ["Foundation of Vedic Mathematics", "Beejank, complements, vinculum numbers", "Vedic addition and subtraction methods", "Divisibility rules"],
  },
  {
    title: "Multiplication and mental maths",
    topics: ["Nikhilam Sutra for multiplication", "Urdhva-Tiryagbhyam Sutra", "Special multiplication cases", "Doubling and halving"],
  },
  {
    title: "Advanced methods and applications",
    topics: ["Squaring and cubing methods", "Vedic division methods", "HCF and LCM", "Percentages", "Square roots and cube roots"],
  },
  {
    title: "Teaching expansion topics",
    topics: ["Algebra", "Calendar calculations", "Magic squares"],
  },
];

const programFeatures = [
  {
    title: "Recorded Vedic Maths Lessons",
    text: "You get step-by-step recorded lessons that you can watch at your own pace. You can pause, revise, rewatch, and practise whenever you are free.",
    icon: PlayCircle,
  },
  {
    title: "Weekly Live Revision Sessions",
    text: "Along with the recorded lessons, I conduct weekly live sessions where I revise the concepts and teach them again in a live format. These sessions keep moving in cycles. Once the full syllabus is completed, I start again from the beginning. So even if you join later or miss a session, you can still continue learning through the cycle.",
    icon: CalendarDays,
  },
  {
    title: "Worksheets with Answer Keys",
    text: "For every topic I teach, you will get worksheets for practice. The worksheets also include answer keys, so you can practise, check your work, and revise with clarity.",
    icon: ClipboardCheck,
  },
  {
    title: "Revision Material",
    text: "You will also receive material to revise what you have learned inside M2M. This will help you strengthen your understanding even after completing the lessons.",
    icon: BookOpen,
  },
  {
    title: "Teaching Syllabus Guidance",
    text: "I will also provide guidance on the syllabus and topic flow you can follow when you start teaching children. This helps you understand what to teach, in what order, and how to structure your learning path for students.",
    icon: CheckCircle2,
  },
  {
    title: "Demo Session Preparation",
    text: "Before your certificate demo, I will guide you on how to start a class, how to explain a topic, how to engage learners, and how to wrap up the session. Because M2M is not only about learning Vedic Maths. It is about preparing you to teach.",
    icon: Mic,
  },
  {
    title: "1 Year WhatsApp Support from Me",
    text: "You can ask your doubts on WhatsApp for one full year. Whenever needed, I’ll support you through short audio or video explanations, so you don’t feel stuck or alone.",
    icon: MessageCircle,
  },
  {
    title: "Lifetime Access",
    text: "You will get lifetime access to the recorded lessons and worksheets. So there is no pressure to rush.",
    icon: Sparkles,
  },
];

const differenceCards = [
  ["You learn from the basics", "You don’t need to already know Vedic Maths. I take you step by step from the foundation.", BookOpen],
  ["You get both recorded and live learning", "You can learn at your own pace through recorded lessons and revise through weekly live sessions.", PlayCircle],
  ["You practise with worksheets", "Every topic comes with practice support so you can build clarity.", ClipboardCheck],
  ["You are trained to teach", "You will not only learn methods. You will also understand how to explain them to children.", Users],
  ["You get support from me", "You can ask doubts on WhatsApp for one full year.", MessageCircle],
  ["You receive a certificate after demo completion", "You will receive your certificate after completing the course and successfully giving your demo teaching session.", Award],
];

const faqs = [
  ["How long will it take to complete M2M?", "Most learners can complete the program in 1 to 3 months. Since it is self-paced, your completion time depends on how much time you spend watching the videos and practising."],
  ["Will I get lifetime access?", "Yes. You will get lifetime access to the recorded lessons and worksheets."],
  ["Will I get live support?", "Yes. I conduct weekly live revision sessions where concepts are revised and taught again in cycles."],
  ["Will I get WhatsApp support?", "Yes. You will get 1 full year of WhatsApp support from me for doubt clarification."],
  ["Will I get worksheets?", "Yes. You will get worksheets with answer keys for the topics taught inside the program."],
  ["Will I get a certificate?", "Yes. You will receive a certificate after completing the full course and successfully giving your demo teaching session."],
  ["What happens in the demo session?", "You will teach a topic given on the spot. I and other learners will act as students, and I’ll ask a few questions to check your understanding and teaching clarity."],
  ["What if I don’t clear the demo session the first time?", "No worries. You will be given one more chance to prepare and give the demo again."],
  ["Can I start teaching after this course?", "M2M is designed to help you learn Vedic Maths, build teaching confidence, and understand how to start your teaching journey. Your growth will depend on your practice, consistency, and how you take action after learning."],
];

const m2mTestimonials = [
  "/Testimonials- M2M/M2M-01.jpg",
  "/Testimonials- M2M/M2M-02.jpg",
  "/Testimonials- M2M/M2M-03.jpeg",
  "/Testimonials- M2M/M2M-04.jpeg",
  "/Testimonials- M2M/M2M-06.jpeg",
  "/Testimonials- M2M/M2M-07.jpeg",
  "/Testimonials- M2M/M2M-08.jpeg",
  "/Testimonials- M2M/M2M-09.jpeg",
  "/Testimonials- M2M/M2M-10.jpeg",
];

export default function ForMothersPage() {
  return (
    <PageShell>
      <a href="#join-m2m" className="focus-ring fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#ee5f52]">
        Join M2M Program
      </a>

      <section className="soft-gradient">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">For Mothers</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-blueDeep sm:text-5xl">M2M – Mom to Math Mentor Model</h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-blueDeep/90">Learn Vedic Maths. Build teaching confidence. Start your journey as a Maths Mentor.</p>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-ink/75">
              <p>M2M is my signature Vedic Maths mentor program created for homemakers, mothers, and teachers who want to learn Vedic Maths step by step, teach children confidently, and start building their own path from home.</p>
              <p>This is not just a course to learn methods.</p>
              <p>It is a guided learning journey where you understand the concepts, practise with worksheets, revise with live support, and prepare yourself to teach with confidence.</p>
            </div>
            <div className="mt-8">
              <Button href="#join-m2m" icon>Join M2M Program</Button>
              <p className="mt-4 text-sm font-semibold text-blueDeep">Self-paced learning + weekly live revision + 1 year WhatsApp support from me</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-beige/70 p-6">
              <Heart className="h-9 w-9 text-coral" />
              <h2 className="mt-5 text-2xl font-bold text-blueDeep">A guided path from learning to teaching</h2>
              <div className="mt-6 grid gap-3">
                {["Recorded lessons", "Weekly live revision", "Worksheets with answer keys", "Teaching guidance", "Certificate demo support"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-coral" />
                    <span className="text-sm font-bold text-blueDeep">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Right fit" title="Is This Program for You?">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-beige/70 p-6 md:p-8">
            <p className="text-xl font-bold leading-8 text-blueDeep">M2M is for you if you are a homemaker, mother, or teacher who wants to learn Vedic Maths and create a meaningful path from home.</p>
            <Button href="#join-m2m" variant="secondary" className="mt-6">Yes, I Want to Start My M2M Journey!</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Maybe you took a break for your family.",
              "Maybe you lost touch with your confidence.",
              "Maybe you love teaching but don’t know how to start.",
              "Maybe you want to earn, but only through something genuine and skill-based.",
            ].map((line) => (
              <div key={line} className="rounded-soft border border-blueDeep/10 bg-white p-5 shadow-soft">
                <Sparkles className="h-6 w-6 text-gold" />
                <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{line}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-soft bg-white p-6 shadow-soft">
          <p className="max-w-4xl text-base leading-8 text-ink/75">This program is for you if you want to learn from the basics, practise with structure, get support when you feel stuck, and slowly build the confidence to teach children.</p>
          <p className="mt-4 text-xl font-bold text-blueDeep">M2M will help you take that first step from “Can I?” to “Yes, I can.”</p>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Syllabus" title="What You Will Learn Inside M2M" text="Inside M2M, you will learn Vedic Maths from the foundation level to advanced techniques.">
        <Accordion
          items={syllabusGroups.map((group) => ({
            title: group.title,
            content: (
              <div className="grid gap-2 sm:grid-cols-2">
                {group.topics.map((topic) => (
                  <div key={topic} className="rounded-2xl bg-beige/60 px-4 py-3 font-semibold text-blueDeep">{topic}</div>
                ))}
              </div>
            ),
          }))}
        />
        <div className="mt-6 rounded-soft bg-white p-6 shadow-soft">
          <p className="text-base leading-8 text-ink/75">But the goal is not only to complete the syllabus.</p>
          <p className="mt-3 text-xl font-bold leading-8 text-blueDeep">The goal is to help you understand each method clearly enough to explain it to children.</p>
          <Button href="#join-m2m" className="mt-5">Join Now!</Button>
        </div>
      </Section>

      <Section eyebrow="Inside the program" title="What You Get Inside the Program">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-soft border border-blueDeep/10 bg-white p-5 shadow-soft">
                <Icon className="h-7 w-7 text-coral" />
                <h3 className="mt-4 text-lg font-bold text-blueDeep">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Duration" title="Program Duration" text="Learn at your own pace">
  <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8 lg:p-10">
    <div className="rounded-[1.75rem] border border-blueDeep/10 bg-white p-6 shadow-sm md:p-8">
  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-[1.5rem] bg-beige/60 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Flexible pace</p>
      <p className="mt-3 text-lg font-bold leading-7 text-blueDeep">Complete M2M in 1 to 3 months</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">Move based on your schedule, learning speed, and practice time.</p>
    </div>

    <div className="rounded-[1.5rem] bg-beige/60 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Self-paced</p>
      <p className="mt-3 text-lg font-bold leading-7 text-blueDeep">Learn in a way that fits your life</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">Study around your home, family, work, and personal routine.</p>
    </div>

    <div className="rounded-[1.5rem] bg-beige/60 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Lifetime access</p>
      <p className="mt-3 text-lg font-bold leading-7 text-blueDeep">Revise anytime you need</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">Keep access to recorded lessons and worksheets for future revision.</p>
    </div>

    <div className="rounded-[1.5rem] bg-beige/60 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Confidence</p>
      <p className="mt-3 text-lg font-bold leading-7 text-blueDeep">Learn, revise, practise, and grow</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">Build confidence gradually with steady practice and support.</p>
    </div>
  </div>
</div>

    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <div className="rounded-[1.75rem] bg-beige/70 p-6 shadow-sm md:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Access</p>
        <p className="mt-4 text-2xl font-bold text-blueDeep">Lifetime access</p>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Rewatch recorded lessons and revise worksheets whenever you need.
        </p>
      </div>

      <div className="rounded-[1.75rem] bg-blueDeep p-6 text-white shadow-soft md:p-7">
        <p className="text-sm font-semibold text-white/75">Most learners complete M2M in</p>
        <p className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">1–3 months</p>
        <p className="mt-4 text-sm leading-6 text-white/78">
          A flexible pace that fits your home, family, work, and practice time.
        </p>
      </div>

      <div className="rounded-[1.75rem] bg-gold/20 p-6 shadow-sm md:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Support</p>
        <p className="mt-4 text-2xl font-bold text-blueDeep">1 year support</p>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Ask doubts and get guidance through WhatsApp support from me.
        </p>
      </div>
    </div>
  </div>
</Section>

      <Section eyebrow="Certificate" title="Certification Process">
        <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[1.5rem] bg-beige/70 p-6">
              <Award className="h-9 w-9 text-coral" />
              <h3 className="mt-5 text-2xl font-bold text-blueDeep">Your certificate is earned through learning and teaching practice.</h3>
            </div>
            <div className="space-y-5 text-base leading-8 text-ink/75">
              <p>After completing the full M2M program, you will get an opportunity to give a demo teaching session.</p>
              <p>In this demo, you will act as the teacher. I and the other learners will act as students.</p>
              <p>I will give you a topic on the spot and ask a few questions to understand your clarity, confidence, and ability to explain the concept.</p>
              <p>Once you complete the demo session successfully, you will receive your certificate.</p>
              <p>This process is not to create pressure.</p>
              <p>It is to help you experience what it feels like to teach, handle questions, and step into your role as a Vedic Maths mentor with confidence.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Founder note" title="Why I Created M2M?">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8 lg:p-10">
  <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
    
    <div className="rounded-[1.75rem] bg-beige/70 p-5 md:p-6">
      <FounderPhotoFrame className="mx-auto mb-5 max-w-[260px] shadow-none" />
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">
        The reason behind M2M
      </p>

      <h3 className="mt-4 text-2xl font-bold leading-tight text-blueDeep md:text-3xl">
        Teaching helped me come back to myself.
      </h3>

      <p className="mt-4 text-sm leading-7 text-ink/75">
        I know what it feels like to lose yourself. And I also know what it feels like to rebuild your confidence one small step at a time.
      </p>
    </div>

    <div className="grid gap-4 self-center sm:grid-cols-2 lg:auto-rows-min">
      
      <div className="rounded-[1.5rem] border border-blueDeep/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">
          Lost confidence
        </p>

        <p className="mt-3 text-sm leading-6 text-ink/70">
          After marriage and motherhood, I slowly lost my confidence, my voice, and my sense of direction.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-blueDeep/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">
          Started small
        </p>

        <p className="mt-3 text-sm leading-6 text-ink/70">
          I started with one Android phone, created lessons, recorded my voice, and uploaded maths videos on YouTube.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-blueDeep/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">
          Small appreciation
        </p>

        <p className="mt-3 text-sm leading-6 text-ink/70">
          Every small appreciation message reminded me that I still had something valuable to give.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-blueDeep/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">
          The purpose
        </p>

        <p className="mt-3 text-sm leading-6 text-ink/70">
          That is why I created M2M — for mothers, homemakers, and teachers who want to learn, teach, and slowly rebuild confidence through maths.
        </p>
      </div>

    </div>
  </div>

  <div className="mt-6 rounded-[1.75rem] bg-blueDeep p-6 text-white shadow-soft">
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
      More than income
    </p>

    <p className="mt-3 text-xl font-bold leading-8 md:text-2xl">
      Because sometimes, learning a skill is not just about income.
    </p>
  </div>
</div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["It is about identity.", "It is about self-respect.", "I can start again."].map((line) => (
            <div key={line} className="rounded-soft bg-white p-6 shadow-soft">
              <Heart className="h-6 w-6 text-coral" />
              <p className="mt-4 text-2xl font-bold leading-8 text-blueDeep">“{line}”</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Difference" title="What Makes M2M Different?">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differenceCards.map(([title, text, Icon]) => (
            <div key={title as string} className="rounded-soft border border-blueDeep/10 bg-white p-5 shadow-soft">
              <Icon className="h-7 w-7 text-coral" />
              <h3 className="mt-4 text-lg font-bold text-blueDeep">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text as string}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Stories" title="Real Stories from M2M Moms" text="Mothers are not just learning. They are slowly stepping into confidence.">
        <p className="max-w-3xl text-base leading-8 text-ink/75">A few real messages from mothers who joined M2M and started seeing their confidence grow.</p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-blueDeep/15 to-transparent" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {m2mTestimonials.map((src, index) => (
            <div key={src} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-blueDeep/10">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={src}
                  alt={`M2M testimonial ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-coral/20 to-transparent" />
        <div className="mt-6 rounded-soft bg-white p-6 shadow-soft">
          <p className="text-lg font-bold leading-8 text-blueDeep">Every message from a learner who says, “I finally started teaching,” reminds me why I created this program.</p>
          <Button href="#join-m2m" className="mt-5">I’m Ready to Learn Vedic Maths</Button>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="FAQ Section">
        <Accordion items={faqs.map(([title, answer]) => ({ title, content: <p>{answer}</p> }))} />
      </Section>

      <Section tone="beige" eyebrow="Join" title="Ready to start your journey from Mom to Math Mentor?">
        <div id="join-m2m" className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
            <p>You don’t need to have everything figured out today.</p>
            <p>You only need the willingness to learn, practise, and take one small step forward.</p>
            <p>M2M is here to help you learn Vedic Maths, build teaching confidence, and begin your journey as a Maths Mentor with support.</p>
          </div>
          <Button href="/login?role=mother" className="mt-6" icon>Join M2M Program</Button>
        </div>
      </Section>
    </PageShell>
  );
}
