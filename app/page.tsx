import {
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Pencil,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { FounderPhotoFrame } from "@/components/FounderPhotoFrame";
import { PageShell } from "@/components/PageShell";

const childOptions = [
  {
    title: "5-Day Maths Bootcamps",
    description: "Short recorded bootcamps for children who need help with specific maths concepts.",
    bullets: ["Recorded video lessons", "Printable worksheets", "Interactive online worksheets", "Lifetime access"],
    button: "Enroll Now!",
    href: "/bootcamp",
    mockupLabel: "Bootcamp Mockup",
    buttonClass: "bg-[#FF6B5F] text-white hover:brightness-95",
  },
  {
    title: "Jolly Maths Pack",
    description: "A fun-based hard copy workbook series with 100 worksheets in every level.",
    bullets: ["100 fun-based worksheets", "Answer key included", "6 months WhatsApp support", "Hard copy workbook"],
    button: "Order Now!",
    href: "/jolly-maths-pack",
    mockupLabel: "Jolly Maths Pack Mockup",
    buttonClass: "bg-[#FFD166] text-[#102A56] hover:brightness-95",
  },
  {
    title: "Maths Starter Kit",
    description: "A digital reusable activity kit for young children beginning their maths journey.",
    bullets: ["20 interactive worksheets", "Reusable practice", "Early maths foundation", "Joyful 15-minute activities"],
    button: "Download Now!",
    href: "/digital-products",
    mockupLabel: "Starter Kit Mockup",
    buttonClass: "bg-[#CFF3E2] text-[#102A56] hover:brightness-95",
  },
];

const homeTestimonialImages = [
  {
    src: "/Testimonials-Home Page/Image-01.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-02.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-03.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-04.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-05.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-06.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-07.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-08.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-09.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-10.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-11.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
  {
    src: "/Testimonials-Home Page/Image-12.jpg",
    alt: "Parent testimonial screenshot for Maths with Deepika",
  },
];

const whyCards = [
  {
    title: "Clear Concepts",
    text: "We help learners understand the concept, not just memorise the steps.",
    icon: BookOpen,
  },
  {
    title: "Why + How + Where",
    text: "Our teaching focuses on what to do, how to do it, why it works, and where to apply it.",
    icon: Lightbulb,
  },
  {
    title: "Purposeful Practice",
    text: "Our worksheets and activities are designed to help children think, apply, and build confidence through small wins.",
    icon: Star,
  },
  {
    title: "Support That Continues",
    text: "Whether you join a program, bootcamp, or buy a workbook, we make sure you are not left alone after joining.",
    icon: HeartHandshake,
  },
  {
    title: "Confidence-First Learning",
    text: "For us, maths is not only about getting the right answer.\nIt is about helping learners believe, “I can do this.”",
    icon: Trophy,
  },
];

type SceneVariant = "program" | "children" | "story" | "testimonials" | "benefits" | "cta";

function HomeSection({
  eyebrow,
  title,
  text,
  children,
  tone = "white",
  center = false,
  scene,
  textClassName,
  headerClassName,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  children: React.ReactNode;
  tone?: "white" | "cream" | "blue" | "peach";
  center?: boolean;
  scene?: SceneVariant;
  textClassName?: string;
  headerClassName?: string;
}) {
  const toneClass = {
    white: "bg-white",
    cream: "bg-[#FFF8EC]",
    blue: "bg-[#FFF8EC]",
    peach: "bg-gradient-to-br from-[#FFF8EC] via-[#FFF0E8] to-[#EAF3FF]",
  }[tone];

  return (
    <section className={`relative overflow-hidden ${toneClass}`}>
      {scene ? <LayeredSectionScene variant={scene} /> : null}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {(eyebrow || title || text) && (
          <div className={`${headerClassName ?? "mb-10"} ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
            {eyebrow ? (
              <div className={`mb-3 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
                <span className="h-1.5 w-8 rounded-full bg-[#FFD166]" />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF6B5F]">{eyebrow}</p>
                <span className="h-1.5 w-8 rounded-full bg-[#CFF3E2]" />
              </div>
            ) : null}
            {title ? <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#183A8F] sm:text-3xl lg:text-4xl">{title}</h2> : null}
            {text ? <p className={`mt-4 text-base leading-8 text-[#102A56]/75 ${textClassName ?? ""}`}>{text}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function DoodleIcon({
  type,
  className = "",
}: {
  type:
    | "star"
    | "book"
    | "pencil"
    | "plane"
    | "badge"
    | "abacus"
    | "blocks"
    | "worksheet"
    | "ruler"
    | "triangle"
    | "circle"
    | "square"
    | "heart";
  className?: string;
}) {
  const common = "drop-shadow-[0_8px_18px_rgba(16,42,86,0.08)]";

  if (type === "star") {
    return (
      <svg viewBox="0 0 64 64" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M31 7l5.8 15.2L53 28l-15.2 6.2L31 51l-6.8-16.8L9 28l16.2-5.8L31 7Z" fill="#FFD166" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg viewBox="0 0 92 72" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M46 18c-9-7-22-9-34-5v43c12-4 25-2 34 5V18Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="3" />
        <path d="M46 18c9-7 22-9 34-5v43c-12-4-25-2-34 5V18Z" fill="#EAF3FF" stroke="#183A8F" strokeWidth="3" />
        <path d="M20 25h16M20 35h15M56 25h15M56 35h12" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "pencil") {
    return (
      <svg viewBox="0 0 82 82" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M18 58 53 23l12 12-35 35-17 5 5-17Z" fill="#FFD166" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
        <path d="m53 23 5-5a8 8 0 0 1 12 12l-5 5" fill="#FF6B5F" />
        <path d="m53 23 5-5a8 8 0 0 1 12 12l-5 5M18 58l12 12" stroke="#183A8F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "plane") {
    return (
      <svg viewBox="0 0 98 76" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M83 10 12 35l29 9 9 24 33-58Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
        <path d="M41 44 83 10 50 68" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "badge") {
    return (
      <svg viewBox="0 0 82 92" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <circle cx="41" cy="34" r="24" fill="#FFD166" stroke="#183A8F" strokeWidth="3" />
        <path d="m27 54-8 28 22-11 22 11-8-28" fill="#FF6B5F" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
        <path d="m31 34 7 7 14-15" stroke="#183A8F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "abacus") {
    return (
      <svg viewBox="0 0 98 84" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <rect x="13" y="13" width="72" height="58" rx="12" fill="#FFF8EC" stroke="#183A8F" strokeWidth="3" />
        {[28, 42, 56].map((y) => (
          <path key={y} d={`M24 ${y}h50`} stroke="#D8E2F3" strokeWidth="4" strokeLinecap="round" />
        ))}
        <circle cx="36" cy="28" r="6" fill="#FF6B5F" />
        <circle cx="54" cy="28" r="6" fill="#FFD166" />
        <circle cx="43" cy="42" r="6" fill="#CFF3E2" />
        <circle cx="64" cy="56" r="6" fill="#FF6B5F" />
      </svg>
    );
  }

  if (type === "blocks") {
    return (
      <svg viewBox="0 0 94 78" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <rect x="10" y="31" width="28" height="28" rx="8" fill="#EAF3FF" stroke="#183A8F" strokeWidth="3" />
        <rect x="36" y="16" width="28" height="28" rx="8" fill="#FFD166" stroke="#183A8F" strokeWidth="3" />
        <rect x="58" y="33" width="28" height="28" rx="8" fill="#FFE8DD" stroke="#183A8F" strokeWidth="3" />
        <path d="M20 45h8M50 26v9M45 31h10M68 45h8M68 53h8" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "worksheet") {
    return (
      <svg viewBox="0 0 82 92" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M18 8h34l12 12v58a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="3" />
        <path d="M52 8v15h14" fill="#EAF3FF" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
        <path d="M23 34h28M23 48h22M23 62h30" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "ruler") {
    return (
      <svg viewBox="0 0 116 46" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <rect x="8" y="8" width="100" height="30" rx="10" fill="#FFD166" stroke="#183A8F" strokeWidth="3" />
        {[24, 38, 52, 66, 80, 94].map((x, index) => (
          <path key={x} d={`M${x} 9v${index % 2 ? 10 : 16}`} stroke="#183A8F" strokeWidth="3" strokeLinecap="round" />
        ))}
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg viewBox="0 0 64 58" className={`${common} ${className}`} fill="none" aria-hidden="true">
        <path d="M32 51S9 37 9 20c0-8 6-13 13-13 5 0 9 3 10 7 1-4 5-7 10-7 7 0 13 5 13 13 0 17-23 31-23 31Z" fill="#FFE8DD" stroke="#FF6B5F" strokeWidth="3" />
      </svg>
    );
  }

  const shapeClass = {
    triangle: "h-0 w-0 border-l-[18px] border-r-[18px] border-b-[32px] border-l-transparent border-r-transparent border-b-[#FFD166]",
    circle: "h-10 w-10 rounded-full bg-[#CFF3E2]",
    square: "h-10 w-10 rounded-xl bg-[#EAF3FF] rotate-12",
  }[type];

  return <span className={`block ${shapeClass} ${className}`} aria-hidden="true" />;
}

function PlayfulButton({
  href,
  children,
  variant = "primary",
  icon = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
  className?: string;
}) {
  const variantClass = {
    primary: "bg-[#FF6B5F] text-white shadow-[0_12px_28px_rgba(16,42,86,0.12)] hover:brightness-95",
    secondary: "bg-[#183A8F] text-white shadow-[0_12px_28px_rgba(16,42,86,0.12)] hover:bg-[#102A56]",
    ghost: "border border-[#D8E2F3] bg-white text-[#183A8F] shadow-[0_14px_30px_rgba(16,42,86,0.08)] hover:bg-[#FFF8EC]",
  }[variant];

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold leading-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(16,42,86,0.16)] active:translate-y-0.5 active:shadow-[0_10px_24px_rgba(16,42,86,0.1)] ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}

function WorkbookIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" aria-hidden="true" className={className} fill="none">
      <rect x="38" y="66" width="210" height="170" rx="24" fill="#FFFFFF" stroke="#D8E2F3" strokeWidth="4" />
      <rect x="62" y="92" width="160" height="18" rx="9" fill="#FFD166" />
      <rect x="62" y="128" width="134" height="12" rx="6" fill="#EAF3FF" />
      <rect x="62" y="154" width="156" height="12" rx="6" fill="#EAF3FF" />
      <rect x="62" y="180" width="112" height="12" rx="6" fill="#EAF3FF" />
      <path d="M254 88h58c24 0 44 20 44 44v94H254V88Z" fill="#183A8F" />
      <path d="M282 126h46M282 154h38M282 182h30" stroke="#FFFFFF" strokeOpacity=".75" strokeWidth="10" strokeLinecap="round" />
      <path d="M314 62c18-20 46 1 31 24-12 19-44 35-44 35s-4-39 13-59Z" fill="#CFF3E2" />
      <rect x="292" y="58" width="28" height="184" rx="14" transform="rotate(14 292 58)" fill="#FF6B5F" />
      <rect x="304" y="46" width="28" height="36" rx="8" transform="rotate(14 304 46)" fill="#FFD166" />
    </svg>
  );
}

function LearningKitIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 260" aria-hidden="true" className={className} fill="none">
      <rect x="40" y="84" width="300" height="128" rx="28" fill="#FFF8EC" stroke="#D8E2F3" strokeWidth="4" />
      <rect x="78" y="52" width="170" height="132" rx="24" fill="#FFFFFF" stroke="#D8E2F3" strokeWidth="4" />
      <rect x="104" y="82" width="94" height="14" rx="7" fill="#FFD166" />
      <rect x="104" y="112" width="118" height="10" rx="5" fill="#EAF3FF" />
      <rect x="104" y="136" width="88" height="10" rx="5" fill="#EAF3FF" />
      <rect x="242" y="74" width="72" height="112" rx="20" fill="#CFF3E2" />
      <path d="M266 112h24M266 136h24" stroke="#183A8F" strokeWidth="8" strokeLinecap="round" />
      <rect x="304" y="118" width="38" height="96" rx="19" fill="#FF6B5F" />
      <circle cx="86" cy="202" r="20" fill="#FFD166" />
      <circle cx="338" cy="70" r="18" fill="#FFE8DD" />
    </svg>
  );
}

function MathNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`absolute rounded-full border border-[#D8E2F3] bg-white/85 px-4 py-2 text-sm font-black text-[#183A8F] shadow-[0_12px_26px_rgba(16,42,86,0.08)] ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function DashedPath({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute text-[#FF6B5F]/35 ${className}`} viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <path d="M5 68C42 14 83 13 112 45c25 28 58 28 103-21" stroke="currentColor" strokeWidth="4" strokeDasharray="9 11" strokeLinecap="round" />
    </svg>
  );
}

function HeroDoodleLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <DoodleIcon type="book" className="absolute left-[1.25%] top-20 h-10 w-14 -rotate-6 opacity-28" />
      <DoodleIcon type="worksheet" className="absolute left-[2.5%] bottom-20 h-11 w-11 rotate-6 opacity-26" />
      <DoodleIcon type="blocks" className="absolute left-[21%] bottom-8 h-10 w-14 -rotate-3 opacity-24" />
      <DoodleIcon type="star" className="absolute left-[25%] top-10 h-7 w-7 rotate-12 opacity-30" />
    </div>
  );
}

function LayeredSectionScene({ variant }: { variant: SceneVariant }) {
  const scenes: Record<SceneVariant, React.ReactNode> = {
    program: (
      <>
        <DoodleIcon type="worksheet" className="absolute right-[8%] top-20 h-16 w-16 rotate-6 opacity-70" />
        <DoodleIcon type="badge" className="absolute left-[7%] bottom-20 h-16 w-16 -rotate-6 opacity-75" />
        <DoodleIcon type="pencil" className="absolute right-[20%] bottom-14 h-16 w-16 rotate-12 opacity-60" />
        <DashedPath className="left-[58%] top-32 h-20 w-48 rotate-3" />
      </>
    ),
    children: (
      <>
        <DoodleIcon type="book" className="absolute left-[4%] top-8 h-12 w-16 -rotate-6 opacity-35" />
        <DoodleIcon type="blocks" className="absolute right-[4%] top-28 h-14 w-18 rotate-6 opacity-55" />
        <DoodleIcon type="pencil" className="absolute left-[7%] bottom-12 h-12 w-12 -rotate-12 opacity-35" />
        <DoodleIcon type="worksheet" className="absolute right-[6%] bottom-24 h-12 w-12 rotate-6 opacity-38" />
      </>
    ),
    story: (
      <>
        <DoodleIcon type="book" className="absolute right-[7%] top-24 h-16 w-20 rotate-6 opacity-60" />
        <DoodleIcon type="star" className="absolute left-[8%] bottom-24 h-12 w-12 -rotate-12 opacity-70" />
      </>
    ),
    testimonials: (
      <>
        <DoodleIcon type="heart" className="absolute right-[7%] top-24 h-14 w-14 rotate-6 opacity-70" />
        <DoodleIcon type="badge" className="absolute left-[5%] top-48 h-14 w-14 -rotate-6 opacity-60" />
        <DoodleIcon type="star" className="absolute right-[18%] bottom-16 h-12 w-12 opacity-65" />
      </>
    ),
    benefits: (
      <>
        <DoodleIcon type="abacus" className="absolute right-[6%] top-20 h-16 w-20 rotate-6 opacity-75" />
        <DoodleIcon type="book" className="absolute left-[5%] bottom-16 h-16 w-20 -rotate-3 opacity-65" />
        <DoodleIcon type="badge" className="absolute right-[18%] top-28 h-14 w-14 rotate-6 opacity-55" />
        <DoodleIcon type="star" className="absolute left-[23%] top-28 h-9 w-9 -rotate-12 opacity-45" />
        <DoodleIcon type="pencil" className="absolute left-[16%] top-44 h-12 w-12 rotate-[-18deg] opacity-38" />
        <div className="absolute left-[20%] top-20 h-5 w-5 rounded-full bg-[#FFD166]/45" />
        <DashedPath className="right-[25%] bottom-24 h-20 w-48 -rotate-6" />
      </>
    ),
    cta: (
      <>
        <DoodleIcon type="plane" className="absolute right-[11%] top-20 h-20 w-20 rotate-12 opacity-75" />
        <DoodleIcon type="heart" className="absolute left-[8%] top-24 h-14 w-14 -rotate-6 opacity-70" />
        <DoodleIcon type="book" className="absolute left-[17%] bottom-16 h-14 w-20 rotate-6 opacity-55" />
        <DoodleIcon type="star" className="absolute right-[32%] bottom-20 h-12 w-12 opacity-65" />
      </>
    ),
  };

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {variant === "children" ? (
        <>
  
        </>
      ) : (
        <>
          <div className="absolute -left-24 top-16 h-56 w-56 rounded-[40%_60%_55%_45%] bg-[#183A8F]/18" />
          <div className="absolute right-[8%] top-20 h-28 w-44 rounded-[2rem] bg-[#FFD166]/35 rotate-[-8deg]" />
        </>
      )}
      {scenes[variant]}
    </div>
  );
}

function HeroImagePlaceholder() {
  return (
    <div className="relative min-h-[260px] sm:min-h-[360px] lg:min-h-[500px]">
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        <div className="absolute -right-10 top-4 h-[26rem] w-[28rem] rounded-[42%_58%_52%_48%] bg-[#183A8F]/16 blur-[1px]" />
        <div className="absolute -right-14 bottom-4 h-72 w-72 rounded-[45%_55%_62%_38%] bg-[#FFD166]/34 rotate-12" />
        <div className="absolute right-10 -top-6 h-36 w-52 rounded-[56%_44%_48%_52%] bg-[#FF6B5F]/18 rotate-6" />
        <DoodleIcon type="pencil" className="absolute right-4 top-20 h-12 w-12 rotate-12 opacity-24" />
        <DoodleIcon type="star" className="absolute right-[18%] top-0 h-10 w-10 rotate-12 opacity-30" />
        <DoodleIcon type="badge" className="absolute right-2 bottom-28 h-14 w-14 rotate-6 opacity-28" />
        <div className="absolute right-14 bottom-20 h-6 w-6 rounded-full bg-[#FFD166]/35" />
        <div className="absolute right-8 top-52 h-5 w-5 rounded-full bg-[#183A8F]/10" />
      </div>
      <div className="relative z-10 grid min-h-[260px] place-items-center p-6 text-center sm:min-h-[360px] sm:p-8 lg:min-h-[500px]">
        <p className="rounded-full bg-white/70 px-5 py-3 text-sm font-black text-[#183A8F] shadow-[0_12px_30px_rgba(16,42,86,0.08)]">
          Image Placeholder
        </p>
      </div>
    </div>
  );
}

function PlayfulCardBadge({ children, tone = "yellow" }: { children: React.ReactNode; tone?: "yellow" | "mint" | "blue" | "peach" }) {
  const toneClass = {
    yellow: "bg-[#FFD166]/45 text-[#102A56]",
    mint: "bg-[#CFF3E2] text-[#102A56]",
    blue: "bg-[#EAF3FF] text-[#183A8F]",
    peach: "bg-[#FFE8DD] text-[#FF6B5F]",
  }[tone];
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${toneClass}`}>{children}</span>;
}

function HomeTestimonialsGallery() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      <article className="home-tilt-card mb-6 break-inside-avoid rounded-[1.75rem] border border-[#D8E2F3] bg-white p-3 shadow-[0_14px_34px_rgba(16,42,86,0.08)]">
        <div className="grid aspect-video place-items-center rounded-[1.35rem] bg-gradient-to-br from-[#FFF8EC] via-[#FFF0E8] to-[#EAF3FF] px-5 text-center">
          <p className="text-base font-black text-[#183A8F]">Video Testimonial Placeholder</p>
        </div>
      </article>

      {homeTestimonialImages.map((testimonial) => (
        <article key={testimonial.src} className="home-tilt-card mb-6 break-inside-avoid rounded-[1.75rem] border border-[#D8E2F3] bg-white p-3 shadow-[0_14px_34px_rgba(16,42,86,0.08)]">
          <img
            src={testimonial.src}
            alt={testimonial.alt}
            className="h-auto w-full rounded-[1.35rem] object-contain"
            loading="lazy"
          />
        </article>
      ))}

      <article className="home-tilt-card mb-6 break-inside-avoid rounded-[1.75rem] border border-[#D8E2F3] bg-white p-3 shadow-[0_14px_34px_rgba(16,42,86,0.08)]">
        <div className="grid aspect-video place-items-center rounded-[1.35rem] bg-gradient-to-br from-[#EAF3FF] via-white to-[#CFF3E2] px-5 text-center">
          <p className="text-base font-black text-[#183A8F]">Video Testimonial Placeholder</p>
        </div>
      </article>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageShell>
      <div className="home-magic-scope">
        <section className="relative overflow-hidden bg-white">
          <HeroDoodleLayer />
          <div className="relative mx-auto grid min-h-[auto] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 lg:px-8 lg:py-16">
            <div>
              <p className="max-w-[42rem] text-lg font-medium leading-[1.7] text-[#183A8F] sm:text-xl sm:leading-[1.6] lg:text-[1.75rem]">
                <b>We are on a mission to make maths joyful for children and empowering for mothers who want to step into confidence, independence, and self-respect.</b>
              </p>
              <div className="mt-7 max-w-[39rem] space-y-4 text-base font-normal leading-8 text-[#102A56]/78 sm:text-lg sm:leading-9">
                <p>
                  Whether you are here to help your child overcome maths fear or to rebuild your own journey as a Vedic Maths mentor, you are in the right place.
                </p>
              </div>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="pointer-events-none absolute -right-20 -top-16 hidden lg:block" aria-hidden="true">
                  <DoodleIcon type="badge" className="h-10 w-10 rotate-6 opacity-38" />
                </div>
                <div className="pointer-events-none absolute -bottom-16 left-72 hidden lg:block" aria-hidden="true">
                  <DoodleIcon type="star" className="h-8 w-8 -rotate-12 opacity-34" />
                </div>
                <PlayfulButton href="/for-mothers" icon>I Want to Become a Vedic Maths Mentor</PlayfulButton>
                <PlayfulButton href="/for-kids" variant="secondary" icon>I Want Maths Support for My Child</PlayfulButton>
              </div>
            </div>
            <HeroImagePlaceholder />
          </div>
        </section>

      <HomeSection
        tone="peach"
        title="M2M-Full Vedic Maths Course"
        text="For Mothers, homemakers & teachers"
        textClassName="font-black text-[#FF6B5F]"
        scene="program"
      >
        <div className="relative rounded-[2rem] border border-[#D8E2F3] bg-white p-6 shadow-[0_20px_50px_rgba(16,42,86,0.1)] md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-8 hidden h-20 w-20 rounded-[55%_45%_40%_60%] bg-[#183A8F]/24 lg:block" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 hidden h-14 w-24 rounded-[2rem] bg-[#FF6B5F]/28 rotate-[-6deg] lg:block" />
          <div className="pointer-events-none absolute -right-14 bottom-10 hidden h-28 w-36 rounded-[56%_44%_38%_62%] bg-[#FFD166]/32 lg:block" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mt-5 text-base leading-8 text-[#102A56]/75"><b>
                M2M(Mom to Math Mentor Model) is my signature Vedic Maths mentor program created to help you learn Vedic Maths step by step, build teaching confidence, and start your journey as a Maths Mentor from home.
              </b></p>
              <p className="mt-5 text-base leading-8 text-[#102A56]/75">
                <b>You get recorded lessons, weekly live revision sessions, worksheets, teaching guidance, certification support, lifetime access, and 1 year WhatsApp support from me.</b>
              </p>
              <PlayfulButton href="/for-mothers" className="mt-6 bg-[#FF6B5F] text-white hover:brightness-95" icon>Explore M2M Program</PlayfulButton>
            </div>
            <div className="home-tilt-card relative grid min-h-[260px] place-items-center rounded-[1.75rem] border border-[#D8E2F3] bg-gradient-to-br from-[#FFF8EC] via-[#FFF0E8] to-white p-6 text-center shadow-[0_18px_45px_rgba(16,42,86,0.08)]">
              <div>
                <div className="mx-auto mb-4 h-12 w-12 rounded-[1.15rem] bg-white shadow-[0_10px_24px_rgba(16,42,86,0.08)]" />
                <p className="text-base font-black text-[#183A8F]">M2M Course Mockup Image</p>
              </div>
            </div>
          </div>
        </div>
      </HomeSection>

      <HomeSection title="Choose the Right Maths Support for Your Child" scene="children" headerClassName="mb-6" center>
        <div className="mx-auto max-w-3xl space-y-5 text-center text-base leading-7 text-[#102A56]/75">
          <p className="text-xl font-bold leading-8 text-[#FF6B5F]">
            Simple & Joyful options for topic-wise learning, regular practice, or early foundation activities
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {childOptions.map((item) => (
            <article key={item.title} className="home-tilt-card flex h-full flex-col rounded-[2rem] border border-[#D8E2F3] bg-white p-5 shadow-[0_18px_45px_rgba(16,42,86,0.08)] transition-all duration-300">
              <div className="grid aspect-[4/2.55] place-items-center rounded-[1.45rem] border border-[#D8E2F3] bg-gradient-to-br from-[#FFF8EC] via-[#FFF0E8] to-[#EAF3FF] p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <div>
                  <div className="mx-auto mb-3 h-10 w-10 rounded-[1rem] bg-white shadow-[0_10px_24px_rgba(16,42,86,0.08)]" />
                  <p className="text-sm font-black text-[#183A8F]">{item.mockupLabel}</p>
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold leading-snug text-[#183A8F]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#102A56]/72">{item.description}</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] font-semibold leading-5 text-[#102A56]/78">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFE8DD] text-xs font-black leading-none text-[#FF6B5F]">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold leading-none shadow-[0_12px_28px_rgba(16,42,86,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(16,42,86,0.16)] active:translate-y-0.5 active:shadow-[0_10px_24px_rgba(16,42,86,0.1)] ${item.buttonClass}`}
              >
                {item.button}
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <p className="inline-block max-w-3xl rounded-[1.25rem] border border-[#D8E2F3] bg-[#EAF3FF] px-6 py-4 text-center text-sm font-bold leading-6 text-[#183A8F] shadow-[0_12px_28px_rgba(16,42,86,0.06)]">
            <span className="block">These learning options are created mainly for children from Class 1 to Class 8.</span>
            <span className="block">Older children can also use them if they need stronger basics and foundation support.</span>
          </p>
        </div>
      </HomeSection>

      <HomeSection tone="cream" eyebrow="Hey there!" title="I'm Deepika" scene="story">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="home-tilt-card rounded-[2rem] border border-[#D8E2F3] bg-white px-6 pt-6 pb-10 text-base leading-7 text-[#102A56]/75 shadow-[0_18px_45px_rgba(16,42,86,0.08)]">
            <div className="space-y-5">
              <p>
                I’m the founder of Maths with Deepika. I became a mother very young, and somewhere between responsibilities and expectations, I slowly lost my confidence and my own voice.
              </p>
              <p>Teaching helped me come back to myself.</p>
              <p>
                I started with one Android phone, creating lessons, recording my voice, and uploading maths videos on YouTube. Even one small appreciation message reminded me that I still had something valuable to give.
              </p>
              <p>
                Today, Maths with Deepika is my way of passing that confidence forward to children who need maths to feel simple, and to mothers who want to believe in themselves again.
              </p>
              <div className="mt-5 border-l-4 border-[#FF6B5F] pl-5">
                <p className="text-xl font-black leading-snug text-[#183A8F]">
                  I want more children to feel, “Maths easy dhaan!”
                </p>

                 <p className="mt-2 text-xl font-black leading-snug text-[#183A8F]">
                  And I want more mothers to feel, “I can start again.”
                 </p>
                </div>
            </div>
            <PlayfulButton href="/about" className="mt-6">Read My Full Story →</PlayfulButton>
          </div>
          <div className="text-center">
            <FounderPhotoFrame className="mx-auto max-w-md shadow-[0_18px_45px_rgba(16,42,86,0.1)]" />
            <div className="px-4 pb-3 pt-5">
              <h3 className="text-2xl font-black text-[#183A8F]">Deepika</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#102A56]/70">
                Vedic Maths mentor, teacher, and founder of Maths with Deepika.
              </p>
            </div>
          </div>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Testimonials"
        title="Hear it from My Moms, Parents & Kutties"
        scene="testimonials" center
      >
        <HomeTestimonialsGallery />
      </HomeSection>

      <HomeSection tone="blue" eyebrow="Why choose us?" title="Maths learning should feel clear, supported, and confidence-building." scene="benefits" center>
        <div className="mx-auto max-w-3xl space-y-5 text-center text-base leading-7 text-[#102A56]/75">
          <p>
            At Maths with Deepika, we don’t believe in pressure-based learning.
            <br />
            We believe children and learners grow better when they understand, practise, ask doubts, and slowly build confidence.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-3xl">
          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] border-l-2 border-dashed border-[#FF6B5F]/35 sm:block" />
          <div className="space-y-6">
          {whyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="home-tilt-card relative flex gap-4 rounded-[1.5rem] bg-white/80 p-4 text-left shadow-[0_12px_28px_rgba(16,42,86,0.06)] ring-1 ring-[#D8E2F3]/80 sm:p-5">
                {index < whyCards.length - 1 ? (
                  <div className="absolute left-6 top-16 h-6 border-l-2 border-dashed border-[#FF6B5F]/35 sm:hidden" />
                ) : null}
                <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D8E2F3] bg-[#FFF8EC] shadow-[0_10px_24px_rgba(16,42,86,0.08)]">
                  <Icon className="h-6 w-6 text-[#FF6B5F]" />
                </div>
                <div className="pt-0.5">
                  <h3 className="text-lg font-black text-[#183A8F]">{card.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#102A56]/70 sm:text-base sm:leading-7">{card.text}</p>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </HomeSection>

      <HomeSection eyebrow="Choose your path" title="Take your first step today!" tone="white" center scene="cta">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#183A8F] p-6 text-center text-white shadow-[0_24px_60px_rgba(24,58,143,0.18)] md:p-10">
          <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-[#FFD166]/28 blur-2xl" />
          <div className="mx-auto max-w-3xl space-y-5 text-lg leading-8 text-white/84">
            <p>You don’t have to figure it out alone.</p>
            <p>
              Whether you want to help your child feel confident in maths or rebuild your own journey through Vedic Maths, Maths with Deepika is here to support you.
            </p>
          </div>
          <div className="relative mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <PlayfulButton href="/for-mothers" variant="primary" className="px-8 py-4 text-base" icon>I Want to Become a Vedic Maths Mentor</PlayfulButton>
            <PlayfulButton href="/for-kids" variant="ghost" className="px-8 py-4 text-base" icon>I Want Maths Support for My Child</PlayfulButton>
          </div>
        </div>
      </HomeSection>
      </div>
    </PageShell>
  );
}
