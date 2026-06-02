"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: "star" | "dot" | "plus";
  burst?: boolean;
  dx?: number;
  dy?: number;
};

const sparkleColors = ["#FFD166", "#FF6B5F", "#CFF3E2", "#183A8F"];
const sparkleShapes: Particle["shape"][] = ["star", "dot"];

function canAnimate() {
  if (typeof window === "undefined") {
    return false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchDevice = window.matchMedia("(pointer: coarse)").matches;

  return !prefersReducedMotion && !touchDevice;
}

export function HomeMagicEffects() {
  const [enabled, setEnabled] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastTrailAt = useRef(0);

  useEffect(() => {
    setEnabled(canAnimate());
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const scope = document.querySelector(".home-magic-scope");
    if (!scope) {
      return;
    }

    const addParticle = (particle: Omit<Particle, "id">, lifetime = 4500) => {
      const id = particleId.current;
      particleId.current += 1;

      setParticles((current) => [...current.slice(-220), { id, ...particle }]);
      window.setTimeout(() => {
        setParticles((current) => current.filter((item) => item.id !== id));
      }, lifetime);
    };

    const handleMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const now = performance.now();

      if (now - lastTrailAt.current < 8) {
        return;
      }

      lastTrailAt.current = now;

      for (let i = 0; i < 40; i++) {
        addParticle({
          x: mouseEvent.clientX + (Math.random() * 34 - 17),
          y: mouseEvent.clientY + (Math.random() * 26 - 13),
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          size: 6 + Math.random() * 10,
          shape: sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)],
          dx: Math.random() * 120 - 60,
          dy: 180 + Math.random() * 220,
        });
      }
    };

    const handleScroll = () => {
      for (let i = 0; i < 60; i++) {
        addParticle({
          x: Math.random() * window.innerWidth,
          y: Math.random() * 200,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          size: 6 + Math.random() * 10,
          shape: sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)],
          dx: Math.random() * 120 - 60,
          dy: 180 + Math.random() * 220,
        });
      }
    };

    const handleClick = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const target = mouseEvent.target as Element | null;

      if (!target?.closest("a, button")) {
        return;
      }

      Array.from({ length: 8 }).forEach((_, index) => {
        const angle = (Math.PI * 2 * index) / 8;
        addParticle(
          {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
            color: sparkleColors[index % sparkleColors.length],
            size: 20 + Math.random() * 20,
            shape: index % 3 === 1 ? "plus" : "star",
            burst: true,
            dx: Math.cos(angle) * (34 + Math.random() * 18),
            dy: Math.sin(angle) * (34 + Math.random() * 18),
          },
          820,
        );
      });
    };

    scope.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    scope.addEventListener("click", handleClick, { passive: true });

    return () => {
      scope.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      scope.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .home-magic-scope,
          .home-magic-scope * {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 29 24 12' stroke='%23183A8F' stroke-width='4.2' stroke-linecap='round'/%3E%3Cpath d='M8.5 30.5 5.5 27.5' stroke='%23FF6B5F' stroke-width='3.2' stroke-linecap='round'/%3E%3Cpath d='m25 3 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z' fill='%23FFD166' stroke='%23183A8F' stroke-width='1.8' stroke-linejoin='round'/%3E%3Cpath d='M12 5v5M9.5 7.5h5M31 21v4M29 23h4' stroke='%23FF6B5F' stroke-width='2.4' stroke-linecap='round'/%3E%3Ccircle cx='17' cy='22' r='2.2' fill='%23CFF3E2' stroke='%23183A8F' stroke-width='1'/%3E%3C/svg%3E") 7 29, auto;
          }
        }

        .home-sparkle-particle {
          position: fixed;
          z-index: 80;
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(255, 209, 102, 0.95)) drop-shadow(0 0 4px rgba(255,209,102,.8));
          animation: homeSparkleTrail 1800ms cubic-bezier(.16, 1, .3, 1) forwards;
        }

        .home-sparkle-particle.is-burst {
          animation: homeSparkleBurst 820ms cubic-bezier(.16, 1, .3, 1) forwards;
        }

        .home-sparkle-particle::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background: currentColor;
          clip-path: polygon(50% 0%, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%);
          filter: drop-shadow(0 4px 8px rgba(16, 42, 86, 0.12));
        }

        .home-sparkle-particle.is-dot::before {
          border-radius: 999px;
          clip-path: none;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);
        }

        .home-sparkle-particle.is-plus::before {
          clip-path: polygon(42% 0%, 58% 0%, 58% 38%, 100% 38%, 100% 58%, 58% 58%, 58% 100%, 42% 100%, 42% 58%, 0% 58%, 0% 38%, 42% 38%);
          border-radius: 2px;
        }

        .home-magic-scope .pointer-events-none svg.absolute,
        .home-magic-scope .pointer-events-none div.absolute {
          animation: homeFloatSoft 7.5s ease-in-out infinite;
        }

        .home-magic-scope .pointer-events-none svg.absolute:nth-child(2n),
        .home-magic-scope .pointer-events-none div.absolute:nth-child(2n) {
          animation-duration: 8.8s;
          animation-delay: -1.4s;
        }

        .home-magic-scope .pointer-events-none svg.absolute:nth-child(3n),
        .home-magic-scope .pointer-events-none div.absolute:nth-child(3n) {
          animation-duration: 6.4s;
          animation-delay: -2.2s;
        }

        .home-tilt-card {
          transition-property: transform, box-shadow, background-color, border-color;
          transition-duration: 280ms;
          transition-timing-function: ease;
          transform-origin: center;
        }

        .home-tilt-card:hover {
          transform: translateY(-4px) rotate(0.45deg) scale(1.01);
          box-shadow: 0 24px 60px rgba(16, 42, 86, 0.12);
        }

        @keyframes homeFloatSoft {
          0%, 100% {
            translate: 0 0;
            rotate: 0deg;
          }
          50% {
            translate: 0 -7px;
            rotate: 1deg;
          }
        }

        @keyframes homeSparkleTrail {
          0% {
            opacity: 0;
            scale: 0.45;
            rotate: 0deg;
          }
          12% {
            opacity: 1;
            scale: 1.15;
          }
          45% {
            opacity: 0.95;
            scale: 0.95;
          }
          100% {
            opacity: 0;
            scale: 0.55;
            rotate: 18deg;
            translate: calc(var(--burst-x) * 0.65) calc(var(--burst-y) + 120px);
          }
        }

        @keyframes homeSparkleBurst {
          0% {
            opacity: 1;
            scale: 0.65;
            translate: 0 0;
          }
          45% {
            opacity: 0.9;
            scale: 1.2;
          }
          100% {
            opacity: 0;
            scale: 0.25;
            translate: var(--burst-x) var(--burst-y);
          }
        }

        @media (prefers-reduced-motion: reduce), (pointer: coarse) {
          .home-magic-scope,
          .home-magic-scope *,
          .home-magic-scope .pointer-events-none svg.absolute,
          .home-magic-scope .pointer-events-none div.absolute,
          .home-tilt-card,
          .home-tilt-card:hover {
            cursor: auto;
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {enabled
        ? particles.map((particle) => (
            <span
              key={particle.id}
              className={`home-sparkle-particle is-${particle.shape} ${particle.burst ? "is-burst" : ""}`}
              style={
                {
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  color: particle.color,
                  "--burst-x": `${particle.dx ?? 0}px`,
                  "--burst-y": `${particle.dy ?? 0}px`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            />
          ))
        : null}
    </>
  );
}
