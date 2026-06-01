import {
  Award,
  BookOpen,
  ClipboardCheck,
  Heart,
  MessageCircle,
  Pencil,
  PlayCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FounderPhotoFrame } from "@/components/FounderPhotoFrame";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

const m2mBadges = [
  "Recorded lessons",
  "Weekly live revision",
  "Worksheets",
  "Certification support",
  "Lifetime access",
  "1 year WhatsApp support",
];

const childOptions = [
  {
    title: "5-Day Maths Bootcamps",
    description:
      "Short, topic-based maths bootcamps with recorded lessons, printable worksheets, and interactive online worksheets.\nBest for children who need support in specific maths topics.",
    button: "Explore Bootcamps",
    href: "/bootcamp",
    icon: PlayCircle,
  },
  {
    title: "Jolly Maths Pack",
    description:
      "A fun-based hard copy maths workbook series with 100 worksheets in every level, answer key, and 6 months WhatsApp support.\nBest for children who need regular maths practice in a fun and engaging way.",
    button: "View Jolly Maths Pack",
    href: "/jolly-maths-pack",
    icon: BookOpen,
  },
  {
    title: "Maths Starter Kit",
    description:
      "A digital reusable maths activity kit for children aged 5–8 to build strong foundational maths skills.\nBest for young children who are just beginning their maths journey.",
    button: "Get Maths Starter Kit",
    href: "/digital-products",
    icon: Sparkles,
  },
];

const homeTestimonialVideos = [
  {
    src: "/Testimonials-Home Page/Video-01.mp4",
    label: "Parent video feedback",
    objectPosition: "center center",
  },
  {
    src: "/Testimonials-Home Page/Video-02.mp4",
    label: "Student learning moment",
    objectPosition: "center 25%",
  },
];

const homeTestimonialImages = [
  {
    src: "/Testimonials-Home Page/Image-08.jpeg",
    alt: "Parent feedback about an interactive Vedic Maths session",
    label: "Bootcamp parent message",
    tall: false,
  },
  {
    src: "/Testimonials-Home Page/Image-09.jpeg",
    alt: "Parent feedback about confidence after the first class",
    label: "Confidence after class",
    tall: true,
  },
  {
    src: "/Testimonials-Home Page/Image-02.jpg",
    alt: "Parent sharing child practice progress after lessons",
    label: "Practice progress",
    tall: true,
  },
  {
    src: "/Testimonials-Home Page/Image-05.jpeg",
    alt: "Parent appreciation message about maths support",
    label: "Parent appreciation",
    tall: false,
  },
  {
    src: "/Testimonials-Home Page/Image-06.jpeg",
    alt: "Parent message saying the child enjoyed the video",
    label: "Child enjoyed learning",
    tall: true,
  },
  {
    src: "/Testimonials-Home Page/Image-01.jpg",
    alt: "Parent thanks for teaching tables clearly",
    label: "Clear teaching",
    tall: false,
  },
];

const whyCards = [
  {
    title: "Clear concept explanation",
    text: "We focus on helping learners understand the concept, not just memorise steps.",
    icon: BookOpen,
  },
  {
    title: "Why + How + Where approach",
    text: "Our teaching explains what to do, how to do it, why the method works, and where to apply it.",
    icon: ClipboardCheck,
  },
  {
    title: "Practice that feels purposeful",
    text: "Our worksheets and activities are designed to help children think, apply, and build confidence through small wins.",
    icon: Star,
  },
  {
    title: "Support after joining",
    text: "Whether you join a program, bootcamp, or buy a workbook, you are not left alone after joining.",
    icon: MessageCircle,
  },
  {
    title: "Confidence-first learning",
    text: "For us, maths is not only about getting the right answer. It is also about helping learners believe, “I can do this.”",
    icon: Heart,
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="soft-gradient">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blueDeep shadow-sm">
              <Sparkles className="h-4 w-4 text-gold" />
              Maths easy dhaan ✨
            </span>
            <p className="mt-6 max-w-[40rem] text-xl font-medium leading-[1.55] text-blueDeep/90 sm:text-2xl sm:leading-[1.5]">
              <b>Maths with Deepika is on a mission to make maths joyful for children and empowering for mothers who want to step into confidence, independence, and self-respect.</b>
            </p>
            <div className="mt-7 max-w-[38rem] space-y-4 text-base leading-8 text-ink/75 sm:text-lg sm:leading-9">
              <p>
                Whether you are here to help your child overcome maths fear or to rebuild your own journey as a Vedic Maths mentor, you are in the right place.
              </p>
              <p>
                Here, maths is not taught with pressure. It is taught with clarity, patience, practice, and joy.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/for-mothers" icon>I Want to Become a Vedic Maths Mentor</Button>
              <Button href="/for-kids" variant="secondary" icon>I Want Maths Support for My Child</Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-5 shadow-soft">
              <div className="rounded-[1.5rem] bg-beige/70 p-5 sm:p-6">
                <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-coral/10 text-coral">
                      <Users className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">Learning together</p>
                      <h2 className="mt-2 text-2xl font-bold leading-snug text-blueDeep">
                        A mother, a child, and a calmer way to understand maths.
                      </h2>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {["why it works", "how to solve", "where to apply"].map((item) => (
                      <div key={item} className="rounded-2xl bg-beige/70 px-4 py-3 text-center text-sm font-bold text-blueDeep">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                    <Pencil className="h-7 w-7 text-coral" />
                    <p className="mt-4 text-sm font-bold text-blueDeep">Worksheet practice</p>
                    <div className="mt-4 space-y-3">
                      {["18 + 27 = ___", "64 - 19 = ___", "12 x 11 = ___"].map((sum) => (
                        <div key={sum} className="rounded-xl border border-blueDeep/10 bg-white px-3 py-2 text-sm font-semibold text-ink/70">
                          {sum}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] bg-blueDeep p-5 text-white shadow-sm">
                    <Heart className="h-7 w-7 text-gold" />
                    <p className="mt-4 text-sm text-white/75">Confidence note</p>
                    <p className="mt-2 text-2xl font-bold leading-snug">“Maths easy dhaan!”</p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Small steps, kind practice, and teaching that makes the learner feel safe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="beige" eyebrow="Signature program" title="M2M – Mom to Math Mentor Model Program" text="For mothers, homemakers, and teachers who want to learn Vedic Maths and teach with confidence.">
        <div className="rounded-[2rem] border border-blueDeep/10 bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-base leading-7 text-ink/75">
                M2M is my signature Vedic Maths mentor program created to help you learn Vedic Maths step by step, build teaching confidence, and start your journey as a Maths Mentor from home.
              </p>
              <p className="mt-5 text-base leading-7 text-ink/75">
                You get recorded lessons, weekly live revision sessions, worksheets, teaching guidance, certification support, lifetime access, and 1 year WhatsApp support from me.
              </p>
              <Button href="/for-mothers" className="mt-6" icon>Explore M2M Program</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {m2mBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-3 rounded-2xl bg-beige/70 p-4">
                  <Award className="h-5 w-5 text-coral" />
                  <span className="text-sm font-bold text-blueDeep">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="For children" title="Maths Support for Children">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-ink/75">
        <p className="text-xl font-semibold leading-8 text-blueDeep/80">
  Maths support that helps children understand, practise, and enjoy learning.
</p>
          <p>
            We have maths programs and products that help children learn with clarity instead of pressure.
          </p>
          <p>
            Our teaching focuses not only on what to do and how to do, but also on why it works and where to apply it.
          </p>
          <p className="font-bold text-blueDeep">Here are a few options available for your child:</p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {childOptions.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-soft border border-blueDeep/10 bg-white p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-blueDeep">{item.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink/70">{item.description}</p>
                <Button href={item.href} variant="ghost" className="mt-5">{item.button}</Button>
              </article>
            );
          })}
        </div>
        <p className="mt-6 rounded-soft bg-beige/70 p-5 text-sm font-semibold leading-6 text-blueDeep">
          These learning options are created mainly for children from Class 1 to Class 8. Older children can also use them if they need stronger basics and foundation support.
        </p>
      </Section>

      <Section tone="beige" eyebrow="Meet Deepika" title="Meet Deepika">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 text-base leading-7 text-ink/75">
            <p>I know what it feels like to lose yourself.</p>
            <p>And I also know what it feels like to rebuild your confidence one small step at a time.</p>
            <p>Maths with Deepika started from my own journey of rebuilding confidence through teaching.</p>
            <p>I became a mother very young, and somewhere between responsibilities, expectations, and listening to everyone around me, I slowly lost my confidence and my own voice.</p>
            <p>But teaching helped me come back to myself.</p>
            <p>
              I started with one Android phone, creating lessons, recording my voice, and uploading maths videos on YouTube. Even one small appreciation message or one comment saying “your teaching is useful” felt like a big reminder that I still had something valuable to give.
            </p>
            <p>
              Today, Maths with Deepika is my way of passing that confidence forward — to children who need maths to feel simple, and to mothers who want to believe in themselves again.
            </p>
            <p>I want more children to feel, “Maths easy dhaan!”</p>
            <p>And I want more mothers to feel, “I can start again.”</p>
            <Button href="/about" variant="secondary" className="mt-2">Read My Story</Button>
          </div>
          <div className="text-center">
            <FounderPhotoFrame className="mx-auto max-w-md shadow-soft" />
            <div className="px-4 pb-3 pt-5">
              <h3 className="text-2xl font-bold text-blueDeep">Deepika</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ink/70">
                Vedic Maths mentor, teacher, and founder of Maths with Deepika.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="Hear it from My Moms, Parents & kutties">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-ink/75">
        <p className="text-xl font-semibold leading-8 text-blueDeep/80">
  Small wins. Real progress. Growing confidence.
</p>
          <p>
            Every message I receive from a mother, parent, or student reminds me why I started Maths with Deepika.
          </p>
          <p>
            Some mothers joined M2M to rebuild their confidence and take their first step towards teaching.
          </p>
          <p>
            Some children joined the bootcamps and started feeling that maths is not as scary as they thought.
          </p>
          <p>
            Some parents used the worksheets, Jolly Maths Pack, or Maths Starter Kit and saw their children practise maths with more interest.
          </p>
          <p>These are not just testimonials for me.</p>
          <p>
            They are small reminders that with the right support, maths can become simpler, confidence can grow, and learning can feel joyful.
          </p>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          {homeTestimonialVideos.map((video) => (
            <div key={video.src} className="overflow-hidden rounded-soft border border-blueDeep/10 bg-white shadow-soft">
              <div className="bg-beige/60 p-3">
                <video
                  className="aspect-video w-full rounded-2xl bg-beige object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ objectPosition: video.objectPosition }}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
              <div className="flex items-center gap-2 border-t border-blueDeep/10 px-4 py-3 text-xs font-bold text-blueDeep">
                <MessageCircle className="h-4 w-4 text-coral" />
                {video.label}
              </div>
            </div>
          ))}
        </div>
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-blueDeep/15 to-transparent" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeTestimonialImages.map((testimonial) => (
            <div
              key={testimonial.src}
              className="overflow-hidden rounded-soft border border-blueDeep/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-beige/50 p-3">
                <div className={`relative overflow-hidden rounded-2xl bg-white ${testimonial.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                  <Image
                    src={testimonial.src}
                    alt={testimonial.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-blueDeep/10 px-4 py-3 text-xs font-bold text-blueDeep">
                <MessageCircle className="h-4 w-4 text-coral" />
                {testimonial.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Why learn with us" title="Why Learn with Maths with Deepika?">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-ink/75">
        <p className="text-xl font-semibold leading-8 text-blueDeep/80">
  Maths learning should feel clear, supported, and confidence-building.
</p>
          <p>
            At Maths with Deepika, our goal is not to make maths feel heavy or stressful.
          </p>
          <p>
            Whether it is for a child learning a concept, a parent looking for the right support, or a mother preparing to become a Vedic Maths mentor, we believe learning should happen with clarity, patience, and encouragement.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-soft bg-white p-5 shadow-soft">
                <Icon className="h-7 w-7 text-coral" />
                <h3 className="mt-4 text-base font-bold text-blueDeep">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{card.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Begin" title="Ready to begin your maths journey?">
        <div className="rounded-[2rem] bg-blueDeep p-6 text-white shadow-soft md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl space-y-5 text-base leading-7 text-white/82">
              <p>
                Whether you are a mother who wants to rebuild her confidence through Vedic Maths or a parent looking for the right maths support for your child, Maths with Deepika is here to guide you.
              </p>
              <p>Choose the path that feels right for you.</p>
              <p className="font-semibold text-white">
                Maths doesn’t have to feel scary or confusing. With the right support, it can become clear, joyful, and confidence-building.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/for-mothers" variant="secondary" icon>I Want to Become a Vedic Maths Mentor</Button>
              <Button href="/for-kids" variant="ghost" icon>I Want Maths Support for My Child</Button>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
