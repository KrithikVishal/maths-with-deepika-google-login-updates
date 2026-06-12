import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Heart,
  MessageCircle,
  Pencil,
  PlayCircle,
  Sparkles,
  Plus,
  Divide,
  Sigma,
  Calculator,
} from "lucide-react";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { bootcampTopics } from "./data";

const dailyIncludes = [
  ["A recorded video lesson", PlayCircle],
  ["A printable worksheet for practice", ClipboardCheck],
  ["An interactive online worksheet", Pencil],
  ["Answer key for checking", BookOpen],
];

const bootcampFeatures = [
  {
    title: "Recorded Video Lessons",
    text: "Your child can watch the lessons at their own pace. They can pause, rewatch, and revise whenever needed.",
    icon: PlayCircle,
  },
  {
    title: "Printable Worksheets",
    text: "Each bootcamp includes printable worksheets for written practice. These help children practise the concept on paper and strengthen their understanding.",
    icon: ClipboardCheck,
  },
  {
    title: "Interactive Online Worksheets",
    text: "This is one of the most loved parts of the bootcamp. When your child enters the right answer, they get an appreciation message on the screen. If they enter a wrong answer, they receive positive feedback that encourages them to think again instead of feeling bad. The best part is that these interactive worksheets come with a new problems option. Every time your child clicks it, a fresh set of questions appears. So your child is not just repeating the same worksheet again and again. They get more practice, more variety, and more chances to build confidence with the same concept.",
    icon: Sparkles,
    wide: true,
  },
  {
    title: "Answer Keys",
    text: "Answer keys are included so parents and children can check the answers with clarity.",
    icon: CheckCircle2,
  },
  {
    title: "Lifetime Access",
    text: "Your child gets lifetime access to the bootcamp videos and worksheets, so they can revise anytime.",
    icon: Heart,
  },
];

const topicIcons = {
  plus: Plus,
  divide: Divide,
  calculator: Calculator,
  sigma: Sigma,
};

const fitItems = [
  "Your child needs support in a specific maths topic",
  "Your child understands in class but forgets later",
  "Your child gets stuck when the question changes",
  "Your child needs extra practice without pressure",
  "You want maths learning that feels clear, kind, and structured",
];

const faqs = [
  ["Are these bootcamps live or recorded?", "The bootcamps are recorded, so your child can watch the lessons at their own pace."],
  ["Will my child get worksheets?", "Yes. Each bootcamp includes printable worksheets and interactive online worksheets."],
  ["Will answer keys be provided?", "Yes. Answer keys are included."],
  ["Will my child get lifetime access?", "Yes. Your child will get lifetime access to the videos and worksheets."],
  ["Are these bootcamps class-specific?", "No. These are topic-based bootcamps. They are created mainly for children from Class 1 to Class 8, but children can join based on their current maths level and topic need."],
  ["Can older children join?", "Yes. If an older child needs stronger basics, they can also join and learn at their own pace."],
  ["How do interactive worksheets work?", "Your child enters the answer online. If the answer is correct, they get an appreciation message. If the answer is wrong, they get positive feedback that helps them think again."],
];

const bootcampCertificateFeedback = [
  "/Testimonials- 5-Days-Bootcamp/Certificate feedback/5-Days-Bootcamp-Certificate-01.jpeg",
  "/Testimonials- 5-Days-Bootcamp/Certificate feedback/5-Days-Bootcamp-Certificate-06.jpeg",
  "/Testimonials- 5-Days-Bootcamp/Certificate feedback/5-Days-Bootcamp-Certificate-09.jpeg",
];

const bootcampImageFeedback = [
  "/Testimonials- 5-Days-Bootcamp/Images/5-Days-Bootcamp-07.jpeg",
  "/Testimonials- 5-Days-Bootcamp/Images/5-Days-Bootcamp-10.jpeg",
  "/Testimonials- 5-Days-Bootcamp/Images/5-Days-Bootcamp-11.jpeg",
];

const bootcampVideoFeedback = [
  "/Testimonials- 5-Days-Bootcamp/Videos/5-Days-Bootcamp-Video-07.mp4",
  "/Testimonials- 5-Days-Bootcamp/Videos/5-Days-Bootcamp-Video-02.mp4",
  "/Testimonials- 5-Days-Bootcamp/Videos/5-Days-Bootcamp-Video-03.mp4",
];

export default function BootcampPage() {
  return (
    <PageShell>
      <a href="#available-bootcamps" className="focus-ring fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full bg-coral px-5 py-3 text-center text-sm font-bold text-white shadow-soft transition hover:brightness-95">
        Explore Available Bootcamps
      </a>

      <section className="soft-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">5-Day Maths Bootcamps</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-blueDeep sm:text-4xl lg:text-5xl">What if your child could understand one maths topic clearly in just 5 days?</h1>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-ink/75">
              <p>If your child gets confused in maths, it may not always be because the topic is “too hard.”</p>
              <p>Sometimes, they just need the right explanation, the right practice, and a little confidence to try again.</p>
              <p>Our 5-Day Maths Bootcamps are short, topic-based learning programs created to help children understand important maths concepts with clarity, practice, and confidence.</p>
            </div>
            <Button href="#available-bootcamps" className="mt-8" icon>Explore Available Bootcamps</Button>
            <p className="mt-4 text-sm font-semibold text-blueDeep">Recorded lessons + printable worksheets + interactive online worksheets + lifetime access</p>
          </div>
          <div className="rounded-[2rem] border border-borderSoft bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-beige/70 p-6">
              <PlayCircle className="h-9 w-9 text-coral" />
              <h2 className="mt-5 text-2xl font-bold leading-snug text-blueDeep">Five gentle days. One clear topic. More confidence to try again.</h2>
              <div className="mt-6 grid gap-3">
                {["Day-wise learning", "Worksheets", "Topic clarity", "Confidence"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 text-sm font-bold text-blueDeep shadow-sm">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Meaning" title="What is a 5-Day Maths Bootcamp?">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-beige/70 p-6 md:p-8">
            <div className="space-y-5 text-base leading-8 text-ink/75">
              <p>A 5-Day Maths Bootcamp is a focused learning program where your child learns one set of maths topics step by step.</p>
              <p>The goal is not to rush through the topic.</p>
              <p>The goal is to help your child understand the concept, practise it, apply it, and slowly feel:</p>
            </div>
            <div className="mt-6 rounded-2xl bg-white p-5 text-2xl font-bold text-blueDeep shadow-sm">“Oh, maths easy dhaan!”</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {dailyIncludes.map(([title, Icon]) => (
              <div key={title as string} className="rounded-soft border border-borderSoft bg-white p-5 shadow-soft">
                <Icon className="h-7 w-7 text-coral" />
                <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{title as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Difference" title="How These Bootcamps Are Different">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h3 className="text-2xl font-bold text-blueDeep">Regular learning</h3>
            <div className="mt-5 grid gap-3">
              {["What to do", "How to do it"].map((item) => <div key={item} className="rounded-2xl bg-beige/70 p-4 font-bold text-blueDeep">{item}</div>)}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h3 className="text-2xl font-bold text-blueDeep">Our bootcamp learning</h3>
            <div className="mt-5 grid gap-3">
              {["Why it works", "Where to apply", "Different types of questions"].map((item) => <div key={item} className="rounded-2xl bg-gold/20 p-4 font-bold text-blueDeep">{item}</div>)}
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-soft bg-white p-6 shadow-soft">
          <div className="space-y-5 text-base leading-8 text-ink/75">
            <p>In many regular classes, children are taught only what to do and how to do it.</p>
            <p>But in our bootcamps, I also focus on why does this method work, where can we apply this, and how can we solve different types of questions?</p>
            <p>That is why the practice is not limited to direct sums alone.</p>
            <p>The worksheets include both number-based questions and application-based questions, so children learn to think and apply the concept with more confidence.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Inside" title="What Your Child Gets Inside Each Bootcamp">
        <div className="grid gap-6 md:grid-cols-2">
          {bootcampFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`rounded-soft border border-borderSoft bg-white p-6 shadow-soft ${feature.wide ? "md:col-span-2" : ""}`}>
                <Icon className="h-7 w-7 text-coral" />
                <h3 className="mt-4 text-xl font-bold text-blueDeep">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/70">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Right fit" title="Who Are These Bootcamps For?">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <div className="space-y-5 text-base leading-8 text-ink/75">
              <p>These bootcamps are created mainly for children from Class 1 to Class 8.</p>
              <p>But if an older child feels they need stronger basics, they can also join and learn at their own pace.</p>
            </div>
            <div className="mt-6 rounded-[1.75rem] bg-blueDeep p-6 text-white shadow-soft">
              <p className="text-xl font-bold leading-9">
                Your child is not weak in maths.
              </p>
              <p className="mt-3 text-base leading-7 text-white/85">
                Sometimes they just need the right explanation, practice, and confidence to try again.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fitItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-soft bg-white p-5 shadow-soft ${index === 4 ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md" : ""}`}
              >
                <CheckCircle2 className="h-6 w-6 text-coral" />
                <p className="mt-4 text-sm font-bold leading-6 text-blueDeep">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Topics" title="Available Bootcamp Topics" >
        <div id="available-bootcamps" className="scroll-mt-28" />
        <div className="grid gap-6 md:grid-cols-2">
          {bootcampTopics.map((topic) => {
            const Icon = topicIcons[topic.icon];

            return (
              <div key={topic.title} className="rounded-soft border border-borderSoft bg-white p-6 shadow-soft">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10">
                  <Icon className="h-7 w-7 text-coral" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-blueDeep">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{topic.description}</p>
                <Button href={`/bootcamp/${topic.slug}`} variant="ghost" className="mt-5" icon>
                  View This Bootcamp
                </Button>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Feedback" title="Parent & Student Feedback" text="Real feedback from children and parents">
        <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
          <p>Many children have already joined my bootcamps and enjoyed learning maths in a simpler and more engaging way.</p>
          <p>Parents have shared how their children became more interested in worksheets, understood topics better, and felt more confident while practising.</p>
        </div>
        <div className="mt-8 rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-borderSoft md:p-6">
          <h3 className="text-2xl font-bold text-blueDeep">Video feedback</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bootcampVideoFeedback.map((src, index) => (
              <article key={src} className="overflow-hidden rounded-[1.5rem] bg-beige/60 ring-1 ring-borderSoft">
                <video className="aspect-video w-full bg-white object-cover" controls preload="metadata" playsInline>
                  <source src={src} type="video/mp4" />
                </video>
                <p className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-blueDeep">
                  <MessageCircle className="h-4 w-4 text-coral" />
                  Bootcamp Video {index + 1}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-blueDeep">Certificate feedback</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {bootcampCertificateFeedback.map((src, index) => (
                <article key={src} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-borderSoft">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={src}
                      alt={`5-day bootcamp certificate feedback ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 30vw, 90vw"
                      className="object-cover object-center"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blueDeep">Parent messages</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {bootcampImageFeedback.map((src, index) => (
                <article key={src} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-borderSoft">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={src}
                      alt={`5-day bootcamp parent feedback ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 30vw, 90vw"
                      className="object-cover object-center"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-soft bg-white p-6 shadow-soft">
          <p className="text-lg font-bold leading-8 text-blueDeep">These small messages remind us that the right explanation and practice can make maths feel lighter for children.</p>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="FAQ Section">
        <Accordion items={faqs.map(([title, answer]) => ({ title, content: <p>{answer}</p> }))} />
      </Section>

      <Section tone="beige" eyebrow="Begin" title="Ready to help your child understand one maths topic with more confidence?">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
            <p>Your child does not need more pressure.</p>
            <p>They need the right explanation, guided practice, and encouragement to try again.</p>
            <p>Choose the bootcamp that fits your child’s current need and let them start learning at their own pace.</p>
          </div>
          <Button href="#available-bootcamps" className="mt-6" icon>Explore Available Bootcamps</Button>
        </div>
      </Section>
    </PageShell>
  );
}
