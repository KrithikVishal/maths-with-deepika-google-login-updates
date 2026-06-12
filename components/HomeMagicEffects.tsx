"use client";

export function HomeMagicEffects() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @media (hover: hover) and (pointer: fine) {
        body,
        body * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M5 27l3.3-8.2L22.5 4.6a3 3 0 0 1 4.2 4.2L12.5 23 5 27Z' fill='%23FFD166' stroke='%23102A56' stroke-width='1.8' stroke-linejoin='round'/%3E%3Cpath d='M21 6l5 5' stroke='%23102A56' stroke-width='1.8' stroke-linecap='round'/%3E%3Cpath d='M23.6 3.6 28.4 8.4 26.2 10.6 21.4 5.8Z' fill='%23FF6B5F' stroke='%23102A56' stroke-width='1.6' stroke-linejoin='round'/%3E%3Cpath d='M5 27l2.2-5.3 3.1 3.1L5 27Z' fill='%23FFFFFF' stroke='%23102A56' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M7.2 21.7 10.3 24.8' stroke='%23102A56' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E") 5 27, auto;
        }

        .home-tilt-card,
        .brand-card {
          transform-origin: center;
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease, background-color 300ms ease;
        }

        .home-tilt-card:hover,
        .brand-card:hover {
          transform: translateY(-5px) rotate(0.25deg) scale(1.01);
          box-shadow: 0 24px 60px rgba(16, 42, 86, 0.12);
        }

        a.rounded-full,
        button.rounded-full {
          transition: transform 240ms ease, box-shadow 240ms ease, background-color 240ms ease, color 240ms ease, border-color 240ms ease;
        }

        a.rounded-full:hover,
        button.rounded-full:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 42px rgba(16, 42, 86, 0.14);
        }

        a.rounded-full:active,
        button.rounded-full:active {
          transform: translateY(1px);
          box-shadow: 0 10px 24px rgba(16, 42, 86, 0.1);
        }

        .pointer-events-none svg.absolute,
        .pointer-events-none div.absolute,
        .site-doodle {
          animation: homeSoftFloat 7.5s ease-in-out infinite;
        }

        .pointer-events-none svg.absolute:nth-child(2n),
        .pointer-events-none div.absolute:nth-child(2n),
        .site-doodle:nth-child(2n) {
          animation-duration: 8.8s;
          animation-delay: -1.6s;
        }

        .pointer-events-none svg.absolute:nth-child(3n),
        .pointer-events-none div.absolute:nth-child(3n),
        .site-doodle:nth-child(3n) {
          animation-duration: 6.6s;
          animation-delay: -2.4s;
        }
      }

      @keyframes homeSoftFloat {
        0%, 100% {
          translate: 0 0;
          rotate: 0deg;
        }
        50% {
          translate: 0 -6px;
          rotate: 0.8deg;
        }
      }

      @media (pointer: coarse) {
        body,
        body * {
          cursor: auto;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        .pointer-events-none svg.absolute,
        .pointer-events-none div.absolute,
        .site-doodle {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
      }
    `}} />
  );
}
