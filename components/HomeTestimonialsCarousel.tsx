"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type HomeTestimonial =
  | {
      type: "video";
      src: string;
      label: string;
      objectPosition?: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      label: string;
      tall?: boolean;
    };

function getVisibleCount() {
  if (typeof window === "undefined") {
    return 1;
  }

  if (window.innerWidth >= 1024) {
    return 3;
  }

  if (window.innerWidth >= 640) {
    return 2;
  }

  return 1;
}

function TestimonialCard({
  testimonial,
  mode = "horizontal",
}: {
  testimonial: HomeTestimonial;
  mode?: "horizontal" | "vertical";
}) {
  const isVertical = mode === "vertical";

  return (
    <article
      className="home-tilt-card relative overflow-hidden rounded-[1.75rem] border border-[#D8E2F3] bg-white shadow-[0_14px_34px_rgba(16,42,86,0.08)]"
    >
      {isVertical ? (
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
          <div className="absolute left-4 top-4 h-20 w-20 rounded-[45%_55%_60%_40%] bg-[#EAF3FF]/55" />
          <div className="absolute bottom-4 right-5 h-24 w-24 rounded-[60%_40%_45%_55%] bg-[#FFE8DD]/55" />
          <svg className="absolute left-7 bottom-8 h-11 w-14 -rotate-6 text-[#183A8F]/15" viewBox="0 0 92 72" fill="none">
            <path d="M46 18c-9-7-22-9-34-5v43c12-4 25-2 34 5V18Z" fill="currentColor" />
            <path d="M46 18c9-7 22-9 34-5v43c-12-4-25-2-34 5V18Z" fill="currentColor" opacity=".7" />
          </svg>
          <svg className="absolute right-8 top-7 h-10 w-10 rotate-12 text-[#FF6B5F]/15" viewBox="0 0 82 82" fill="none">
            <path d="M18 58 53 23l12 12-35 35-17 5 5-17Z" fill="currentColor" />
          </svg>
          <svg className="absolute right-8 bottom-9 h-12 w-12 -rotate-12 text-[#183A8F]/15" viewBox="0 0 98 76" fill="none">
            <path d="M83 10 12 35l29 9 9 24 33-58Z" fill="currentColor" />
          </svg>
          <svg className="absolute left-6 top-8 h-8 w-8 text-[#FFD166]/25" viewBox="0 0 44 44" fill="none">
            <path d="M22 3 26.7 16.8 41 17.2 29.7 25.9 33.6 40 22 31.9 10.4 40 14.3 25.9 3 17.2 17.3 16.8 22 3Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-7 left-[18%] h-10 w-28 text-[#FF6B5F]/18" viewBox="0 0 160 64" fill="none">
            <path d="M4 44C28 10 58 10 78 34c18 22 44 21 78-12" stroke="currentColor" strokeWidth="3" strokeDasharray="7 9" strokeLinecap="round" />
          </svg>
        </div>
      ) : null}

      <div className={`${isVertical ? "relative z-[1] flex justify-center bg-white p-4 sm:p-6" : "bg-[#FFF8EC] p-3"}`}>
        {testimonial.type === "video" ? (
          <video
            className={`${isVertical ? "aspect-video max-w-[560px]" : "aspect-[4/5]"} w-full rounded-[1.35rem] bg-[#FFF8EC] object-cover`}
            controls
            playsInline
            preload="metadata"
            style={{ objectPosition: testimonial.objectPosition ?? "center center" }}
          >
            <source src={testimonial.src} type="video/mp4" />
          </video>
        ) : (
          <div className={`relative ${isVertical ? "aspect-video w-full max-w-[560px]" : "aspect-[4/5]"} overflow-hidden rounded-[1.35rem] bg-white`}>
            <Image
              src={testimonial.src}
              alt={testimonial.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        )}
      </div>
    </article>
  );
}

function HorizontalTestimonials({ testimonials }: { testimonials: HomeTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: Math.min(visibleCount, testimonials.length) }, (_, offset) => {
      return testimonials[(activeIndex + offset) % testimonials.length];
    });
  }, [activeIndex, testimonials, visibleCount]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handleTouchEnd = (x: number) => {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - x;
    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStart(null);
  };

  return (
    <div
      className="rounded-[2rem] border border-[#D8E2F3] bg-[#FFF8EC]/70 p-4 shadow-[0_18px_45px_rgba(16,42,86,0.08)] sm:p-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goToPrevious}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D8E2F3] bg-white text-[#183A8F] shadow-[0_12px_28px_rgba(16,42,86,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFF8EC] hover:shadow-[0_18px_38px_rgba(16,42,86,0.14)] active:translate-y-0.5 active:shadow-[0_8px_18px_rgba(16,42,86,0.1)]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="grid min-w-0 flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.src}-${activeIndex}-${index}`} testimonial={testimonial} />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D8E2F3] bg-white text-[#183A8F] shadow-[0_12px_28px_rgba(16,42,86,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFF8EC] hover:shadow-[0_18px_38px_rgba(16,42,86,0.14)] active:translate-y-0.5 active:shadow-[0_8px_18px_rgba(16,42,86,0.1)]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={`${testimonial.src}-dot`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full shadow-[0_8px_16px_rgba(16,42,86,0.08)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0.5 ${
              index === activeIndex ? "w-8 bg-[#FF6B5F]" : "w-2.5 bg-[#D8E2F3] hover:bg-[#FFD166]"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function VerticalTestimonials({ testimonials }: { testimonials: HomeTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const loopedTestimonials = useMemo(() => {
    // Temporary duplicated testimonials. Replace with real testimonials later.
    return [...testimonials, ...testimonials];
  }, [testimonials]);

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: Math.min(visibleCount + 1, loopedTestimonials.length) }, (_, offset) => {
      return loopedTestimonials[(activeIndex + offset) % loopedTestimonials.length];
    });
  }, [activeIndex, loopedTestimonials, visibleCount]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFF8EC] via-white to-[#EAF3FF] px-4 py-8 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div className="absolute left-6 top-16 h-32 w-32 rounded-[45%_55%_60%_40%] bg-[#CFF3E2]/45" />
        <div className="absolute bottom-12 right-8 h-36 w-36 rounded-[60%_40%_45%_55%] bg-[#FFE8DD]/55" />
        <svg className="absolute left-10 top-28 h-16 w-20 -rotate-6 text-[#183A8F]/15" viewBox="0 0 92 72" fill="none">
          <path d="M46 18c-9-7-22-9-34-5v43c12-4 25-2 34 5V18Z" fill="currentColor" />
          <path d="M46 18c9-7 22-9 34-5v43c-12-4-25-2-34 5V18Z" fill="currentColor" opacity=".7" />
        </svg>
        <svg className="absolute bottom-28 left-16 h-16 w-14 rotate-6 text-[#FF6B5F]/15" viewBox="0 0 82 92" fill="none">
          <path d="M18 8h34l12 12v58a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8Z" fill="currentColor" />
        </svg>
        <svg className="absolute left-[18%] bottom-16 h-16 w-40 text-[#FF6B5F]/20" viewBox="0 0 160 64" fill="none">
          <path d="M4 44C28 10 58 10 78 34c18 22 44 21 78-12" stroke="currentColor" strokeWidth="3" strokeDasharray="7 9" strokeLinecap="round" />
        </svg>
        <div className="absolute left-[16%] top-12 h-5 w-5 rotate-12 rounded-md bg-[#FFD166]/25" />
        <div className="absolute bottom-20 left-[8%] h-4 w-4 rounded-full bg-[#FFD166]/25" />
        <svg className="absolute right-12 top-20 h-16 w-16 rotate-12 text-[#FF6B5F]/15" viewBox="0 0 82 82" fill="none">
          <path d="M18 58 53 23l12 12-35 35-17 5 5-17Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-24 right-16 h-20 w-20 -rotate-12 text-[#183A8F]/15" viewBox="0 0 98 76" fill="none">
          <path d="M83 10 12 35l29 9 9 24 33-58Z" fill="currentColor" />
        </svg>
        <svg className="absolute right-[18%] top-14 h-16 w-16 text-[#FFD166]/25" viewBox="0 0 82 92" fill="none">
          <circle cx="41" cy="34" r="24" fill="currentColor" />
          <path d="m27 54-8 28 22-11 22 11-8-28" fill="currentColor" opacity=".75" />
        </svg>
        <svg className="absolute bottom-16 right-[18%] h-16 w-20 text-[#183A8F]/15" viewBox="0 0 94 78" fill="none">
          <rect x="10" y="31" width="28" height="28" rx="8" fill="currentColor" />
          <rect x="36" y="16" width="28" height="28" rx="8" fill="currentColor" opacity=".75" />
          <rect x="58" y="33" width="28" height="28" rx="8" fill="currentColor" opacity=".55" />
        </svg>
      </div>

      <div
        className="relative mx-auto max-w-[760px] overflow-hidden rounded-[2rem] border border-[#D8E2F3] bg-[#FFF8EC]/80 p-4 shadow-[0_18px_45px_rgba(16,42,86,0.08)] sm:p-5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#FFF8EC] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#FFF8EC] to-transparent" />

        <div className="h-[560px] overflow-hidden sm:h-[660px] lg:h-[760px]">
          <div key={activeIndex} className="space-y-5 transition-transform duration-700 ease-in-out">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.src}-${activeIndex}-${index}`} testimonial={testimonial} mode="vertical" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeTestimonialsCarousel({ testimonials }: { testimonials: HomeTestimonial[] }) {
  return (
    <div className="mt-9 space-y-12">
      <div>
        <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[#FF6B5F]">Horizontal Carousel</p>
        <HorizontalTestimonials testimonials={testimonials} />
      </div>

      <div>
        <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[#FF6B5F]">Vertical Auto-Scroll Feed</p>
        <VerticalTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
