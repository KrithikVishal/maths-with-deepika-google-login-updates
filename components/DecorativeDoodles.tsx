type DecorativeDoodlesProps = {
  variant?: "page" | "section";
};

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 62 58" fill="none" aria-hidden="true">
      <path d="M31 7l5.8 15.2L53 28l-15.2 6.2L31 51l-6.8-16.8L9 28l16.2-5.8L31 7Z" fill="#FFD166" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 7v50M7 32h50" stroke="#FF6B5F" strokeWidth="5" strokeLinecap="round" />
      <path d="m17 17 30 30M47 17 17 47" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Badge({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 92" fill="none" aria-hidden="true">
      <circle cx="41" cy="34" r="24" fill="#FFD166" stroke="#183A8F" strokeWidth="3" />
      <path d="m27 54-8 28 22-11 22 11-8-28" fill="#FF6B5F" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
      <path d="m31 34 7 7 14-15" stroke="#183A8F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Blocks({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 78" fill="none" aria-hidden="true">
      <rect x="8" y="31" width="28" height="28" rx="8" fill="#EAF3FF" stroke="#183A8F" strokeWidth="3" />
      <rect x="36" y="16" width="28" height="28" rx="8" fill="#FFD166" stroke="#183A8F" strokeWidth="3" />
      <rect x="58" y="33" width="28" height="28" rx="8" fill="#FFE8DD" stroke="#183A8F" strokeWidth="3" />
      <path d="M20 45h8M50 26v9M45 31h10M68 45h8M68 53h8" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PaperPlane({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 94 78" fill="none" aria-hidden="true">
      <path d="M83 10 12 35l29 9 9 24 33-58Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
      <path d="M41 44 83 10 50 68" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Book({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 92 72" fill="none" aria-hidden="true">
      <path d="M46 18c-9-7-22-9-34-5v43c12-4 25-2 34 5V18Z" fill="#FFFFFF" stroke="#183A8F" strokeWidth="3" />
      <path d="M46 18c9-7 22-9 34-5v43c-12-4-25-2-34 5V18Z" fill="#EAF3FF" stroke="#183A8F" strokeWidth="3" />
      <path d="M20 25h16M20 35h15M56 25h15M56 35h12" stroke="#FF6B5F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Pencil({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 92" fill="none" aria-hidden="true">
      <path d="M18 58 53 23l12 12-35 35-17 5 5-17Z" fill="#FFD166" stroke="#183A8F" strokeWidth="3" strokeLinejoin="round" />
      <path d="m53 23 5-5a8 8 0 0 1 12 12l-5 5" fill="#FF6B5F" />
      <path d="m53 23 5-5a8 8 0 0 1 12 12l-5 5M18 58l12 12" stroke="#183A8F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function DecorativeDoodles({ variant = "section" }: DecorativeDoodlesProps) {
  if (variant === "page") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="site-doodle absolute -right-12 top-28 h-44 w-44 rounded-[42%_58%_54%_46%] bg-babyBlue/55" />
        <div className="site-doodle absolute -left-16 top-[34rem] h-40 w-48 rounded-[58%_42%_46%_54%] bg-softPeach/80" />
        <Book className="site-doodle absolute right-10 top-[42rem] h-20 w-20 rotate-6 opacity-35" />
        <Star className="site-doodle absolute left-8 bottom-32 h-16 w-16 -rotate-12 opacity-30" />
        <Badge className="site-doodle absolute right-16 bottom-[28rem] h-20 w-20 rotate-12 opacity-25" />
        <Blocks className="site-doodle absolute left-10 top-[62rem] h-20 w-24 -rotate-6 opacity-25" />
        <PaperPlane className="site-doodle absolute right-[18%] top-[24rem] h-16 w-20 rotate-6 opacity-25" />
        <Sparkle className="site-doodle absolute left-[18%] top-[18rem] h-10 w-10 opacity-25" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="site-doodle absolute right-8 top-10 h-24 w-32 rounded-[55%_45%_48%_52%] bg-babyBlue/55" />
      <Pencil className="site-doodle absolute right-12 top-10 h-16 w-16 rotate-6 opacity-45" />
      <div className="site-doodle absolute -left-10 bottom-12 h-24 w-32 rounded-[58%_42%_48%_52%] bg-lightPeach/70 opacity-55" />
      <Book className="site-doodle absolute -left-6 bottom-14 h-16 w-20 -rotate-6 opacity-45" />
      <Star className="site-doodle absolute right-[18%] bottom-8 h-12 w-12 rotate-12 opacity-35" />
      <Badge className="site-doodle absolute right-12 bottom-16 h-14 w-14 -rotate-6 opacity-25" />
      <Blocks className="site-doodle absolute left-[12%] top-8 h-14 w-16 rotate-6 opacity-20" />
      <PaperPlane className="site-doodle absolute right-[28%] top-12 h-12 w-16 rotate-12 opacity-20" />
      <Sparkle className="site-doodle absolute left-[20%] bottom-10 h-9 w-9 opacity-20" />
    </div>
  );
}
