"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: "star";
  dx?: number;
  dy?: number;
};

const sparkleColors = ["#FFD166", "#FF6B5F", "#CFF3E2", "#183A8F"];

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

    const handleMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const now = performance.now();

      if (now - lastTrailAt.current < 55) {
        return;
      }

      lastTrailAt.current = now;

      setParticles([
  {
    id: 1,
    x: mouseEvent.clientX - 8,
    y: mouseEvent.clientY - 8,
    color: "#FFD166",
    size: 10,
    shape: "star",
  },
  {
    id: 2,
    x: mouseEvent.clientX + 8,
    y: mouseEvent.clientY + 8,
    color: "#FF6B5F",
    size: 8,
    shape: "star",
  },
]);
    };

    scope.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      scope.removeEventListener("mousemove", handleMove);
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
        className="home-sparkle-particle"
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
