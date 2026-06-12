import { BookOpen, Heart, MessageCircle, Pencil, PlayCircle, Smartphone, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { FounderPhotoFrame } from "@/components/FounderPhotoFrame";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

const offers = [
  {
    audience: "For Mothers, Homemakers & Teachers",
    title: "M2M – Mom to Math Mentor Model Program",
    description: "A Vedic Maths mentor program to help women learn, teach, and build confidence.",
    button: "Explore M2M Program",
    href: "/for-mothers",
    icon: Heart,
  },
  {
    audience: "For Children & Parents",
    title: "5-Day Maths Bootcamps",
    description: "Topic-based recorded bootcamps with worksheets and interactive practice.",
    button: "Explore Bootcamps",
    href: "/bootcamp",
    icon: PlayCircle,
  },
  {
    audience: "For Children & Parents",
    title: "Jolly Maths Pack",
    description: "Fun-based hard copy maths workbooks with 100 worksheets in every level, answer key, and support.",
    button: "View Jolly Maths Pack",
    href: "/jolly-maths-pack",
    icon: BookOpen,
  },
  {
    audience: "For Children & Parents",
    title: "Maths Starter Kit",
    description: "A digital reusable activity kit for children aged 5–8 to build strong maths foundations.",
    button: "View Maths Starter Kit",
    href: "/digital-products",
    icon: Pencil,
  },
];

function QuoteCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-soft border border-borderSoft bg-white p-5 shadow-soft">
      <Sparkles className="h-6 w-6 text-gold" />
      <p className="mt-4 text-lg font-bold leading-7 text-blueDeep">{children}</p>
    </div>
  );
}

function ReflectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-beige/70 p-5">
      <p className="text-xl font-bold leading-8 text-blueDeep">{children}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <section className="soft-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">About Me</p>
            <h1 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl lg:text-5xl">My Story</h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-ink/75">
              <p>I know what it feels like to lose yourself.</p>
              <p>And I also know what it feels like to rebuild your confidence one small step at a time.</p>
            </div>
          </div>
          <div className="text-center">
            <FounderPhotoFrame className="mx-auto max-w-md shadow-soft" priority />
            <div className="px-4 pb-3 pt-5">
              <h2 className="text-2xl font-bold text-blueDeep">Deepika</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-ink/70">
                Teacher, mother, Vedic Maths mentor, and founder of Maths with Deepika.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="My story" title="The journey back to myself">
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
            <div className="flex h-full flex-col rounded-[2rem] bg-beige/70 p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">The girl I used to be</p>
              <div className="mt-3 space-y-5 text-base leading-8 text-ink/75">
                <p>I got married when I was 19, while I was still in my third year of engineering.</p>
                <p>At 20, I became a mother.</p>
                <p>Before marriage, I was ambitious, focused, and full of dreams. I wanted to achieve, build a career, and create something meaningful for myself.</p>
                <div className="mt-7 rounded-[1.5rem] bg-blueDeep p-5 text-white shadow-soft">
  <p className="text-lg leading-7 text-white/85"><strong>
    Somewhere between responsibilities and expectations,
    I started becoming quiet in my own life.
    </strong>
  </p>
</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-soft md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">Somewhere along the way</p>
              <div className="mt-2 space-y-5 text-base leading-8 text-ink/75">
                <p>But after marriage and motherhood, slowly, things changed.</p>
                <p>I started listening to everyone around me. Family, relatives, society, expectations, advice, opinions… somewhere in the middle of all this, </p>
                <ReflectionCard>“I stopped listening to myself!”</ReflectionCard>
                <p>I became a people pleaser.</p>
                <p>I lost my confidence.</p>
                <p>I lost my voice.</p>
                <p>I lost the courage to clearly say what I wanted.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-soft md:p-8">
              <div className="space-y-5 text-base leading-8 text-ink/75">
                <p>After having two babies, I realised that I was not really living my own life.</p>
                <p>There was a time when I didn’t feel confident about my career, my body, my appearance, my communication, or even myself. I compared myself with others. I questioned my worth. I felt like I had lost the person I used to be.</p>
                <p>But one day, I decided something.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <QuoteCard>“Enough. I need to take charge of my life.”</QuoteCard>
              <div className="rounded-[2rem] bg-blueDeep p-6 text-white shadow-soft">
                <p className="text-base leading-8 text-white/80">I didn’t have everything figured out.</p>
                <p className="mt-4 text-2xl font-bold leading-9">“But I knew I had to take one small step.”</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Teaching" title="How Teaching Helped Me Rebuild Myself">
<div className="max-w-none space-y-8">
  <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8 lg:p-10">
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="rounded-[1.75rem] bg-beige/70 p-6 md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">A quiet beginning</p>
        <h3 className="mt-4 text-3xl font-bold leading-tight text-blueDeep">
          One Android phone, one quiet beginning, and a small hope to teach again.
        </h3>
      </div>
      <div className="space-y-4 text-base leading-8 text-ink/75">
        <p>Teaching was always my passion. Maths was always my love.</p>
        <p>I started my YouTube channel.</p>
        <p>I had only one Android phone with me. I created presentations on my phone, recorded my voice, and uploaded maths videos on YouTube.</p>
      </div>
    </div>
  </div>

  <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-soft md:p-8 lg:p-10">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="space-y-4 text-base leading-8 text-ink/75">
        <p>Even one like felt big.</p>
        <p>Even one comment saying, “Your teaching is useful,” meant the world to me.</p>
        <p>That is when I realised how powerful appreciation can be.</p>
      </div>
      <div className="rounded-[1.75rem] bg-beige/70 p-6 md:p-8">
        <p className="text-2xl font-bold leading-9 text-blueDeep">One kind word can rebuild confidence.</p>
        <div className="my-5 h-px bg-blueDeep/10" />
        <p className="text-2xl font-bold leading-9 text-blueDeep">One small success can make a person believe again.</p>
        <div className="my-5 h-px bg-blueDeep/10" />
        <p className="text-2xl font-bold leading-9 text-blueDeep">One clear explanation can change how a child feels about maths.</p>
      </div>
    </div>
  </div>

  <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8 lg:p-10">
    <div className="mx-auto max-w-4xl space-y-4 text-base leading-8 text-ink/75">
      <p>Slowly, I gained back my confidence through teaching.</p>
      <p>Around the same time, I also started applying for online teaching jobs. Slowly, I got an opportunity to work as an online coding and maths tutor.</p>
      <p>I started taking online maths classes. I received appreciation from parents and students. I saw children move from maths fear to maths confidence.</p>
      <p>And every time a child understood a concept, every time a parent felt relieved, every time someone said my teaching helped them, I felt one thing deeply:</p>
    </div>
    <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] bg-blueDeep p-7 text-white shadow-soft md:p-8">
      <Heart className="h-8 w-8 text-gold" />
      <p className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">This is what I am meant to do.</p>
      <p className="mt-4 text-base leading-7 text-white/78">A quiet realisation that became the heart of Maths with Deepika.</p>
    </div>
  </div>
</div>
</Section>

      <Section eyebrow="Purpose" title="Why I Created Maths with Deepika">
        <p className="mb-8 max-w-3xl text-base leading-8 text-ink/75">Maths with Deepika was born from two strong missions.</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-blueDeep">For Children</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/75">
              <p>First, I want children to enjoy maths.</p>
              <p>I believe many children don’t actually hate maths.</p>
              <p>Sometimes, they are scared.</p>
              <p>Sometimes, they are confused.</p>
              <p>Sometimes, they were only taught steps, but not the reason behind the steps.</p>
              <p>That is why I create maths bootcamps, worksheets, activity kits, and workbooks that focus on clarity, application, and joy.</p>
              <p>I want children to understand:</p>
              <p>What are we doing?<br />How are we doing it?<br />Why does it work?<br />Where can we apply it?</p>
              <p>Because when a child understands maths, they stop fearing it.</p>
              <p>My dream is to help more children say:</p>
            </div>
            <div className="mt-5 rounded-2xl bg-gold/20 p-4 text-xl font-bold text-blueDeep">“Maths easy dhaan!”</div>
          </div>
          <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-blueDeep">For Mothers</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-ink/75">
              <p>Second, I want mothers to step into their teaching power.</p>
              <p>I know what it feels like to lose confidence after marriage, motherhood, responsibilities, and years of putting everyone else first.</p>
              <p>And I also know how powerful it feels to start again.</p>
              <p>That is why I created M2M – Mom to Math Mentor Model Program.</p>
              <p>Through M2M, I help homemakers, mothers, and teachers learn Vedic Maths, build teaching confidence, and take practical steps towards starting their own maths teaching journey.</p>
              <p>This is not only about learning a subject.</p>
              <p>It is about rebuilding confidence.</p>
              <p>It is about self-respect.</p>
              <p>It is about feeling, “I can do something for myself.”</p>
            </div>
            <div className="mt-5 rounded-2xl bg-gold/20 p-4 text-xl font-bold text-blueDeep">“I can do something for myself.”</div>
          </div>
        </div>
      </Section>

      <Section tone="beige" eyebrow="Dream" title="My Bigger Dream">
        <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
          <p>My dream is to build Maths with Deepika as a trustworthy, genuine, creative, and supportive maths brand.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "My child is in safe hands.",
            "Maybe I can start again too.",
            "Maths is not scary anymore.",
          ].map((line) => (
            <QuoteCard key={line}>A place where people feel, “{line}”</QuoteCard>
          ))}
        </div>
        <div className="mt-8 rounded-[2rem] bg-blueDeep p-6 text-white shadow-soft">
          <p className="max-w-3xl text-xl font-bold leading-8">This is not just a business for me.</p>
          <p className="mt-3 max-w-3xl text-3xl font-bold leading-tight">This is personal. This is my mission.</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">This is the confidence I rebuilt and now want to pass on.</p>
        </div>
      </Section>

      <Section eyebrow="Offers" title="Today, Maths with Deepika Offers">
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-soft border border-borderSoft bg-white p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/10 text-coral">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">{item.audience}</p>
                    <h3 className="mt-2 text-xl font-bold text-blueDeep">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink/70">{item.description}</p>
                <Button href={item.href} variant="ghost" className="mt-5">{item.button}</Button>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="beige" eyebrow="Begin" title="Start where you are. Take one small step.">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <p className="max-w-3xl text-base leading-8 text-ink/75">
            Whether you are here for your child or for yourself, Maths with Deepika is here to support your journey with clarity, patience, practice, and joy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/for-mothers" icon>Explore M2M Program</Button>
            <Button href="/for-kids" variant="secondary" icon>Find Maths Support for My Child</Button>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
