import Link from "next/link";
import { navLinks } from "@/data/mock";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-blueDeep/10 bg-beige/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo compact className="mb-3" />
          <p className="max-w-md text-sm leading-6 text-ink/70">
            A gentle learning space for mothers and kids to make maths clear, joyful, and confidence-building.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-blueDeep">Explore</h3>
          <div className="grid gap-2">
            {navLinks.slice(0, 5).map((link) => (
              <Link className="text-sm text-ink/70 hover:text-blueDeep" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-blueDeep">Learning</h3>
          <div className="grid gap-2 text-sm">
            <Link href="/login" className="text-ink/70 hover:text-blueDeep">Student Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
