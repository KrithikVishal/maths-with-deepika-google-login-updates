import Link from "next/link";
import { navLinks } from "@/data/mock";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#102A56] font-[Poppins,sans-serif]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:justify-items-center">
          <nav className="w-full max-w-xs text-center md:text-left" aria-label="Footer explore navigation">
            <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#FFD166]">
              Explore
            </h3>
            <div className="grid gap-3">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-[#EAF3FF] transition-colors duration-200 hover:text-[#FFD166]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="w-full max-w-xs text-center md:text-left" aria-label="Footer learning navigation">
            <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#FFD166]">
              Learning
            </h3>
            <div className="grid gap-3">
              <Link
                href="/login?role=mother"
                className="text-base font-medium text-[#EAF3FF] transition-colors duration-200 hover:text-[#FFD166]"
              >
                Mother Login
              </Link>
              <Link
                href="/login?role=kid"
                className="text-base font-medium text-[#EAF3FF] transition-colors duration-200 hover:text-[#FFD166]"
              >
                Kid Login
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
