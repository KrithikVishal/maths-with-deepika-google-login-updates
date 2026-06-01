"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/data/mock";
import { BrandLogo } from "./BrandLogo";
import { Button } from "./Button";
import { CartLink } from "./cart/CartLink";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();
  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");
  const contactLink = navLinks.find((link) => link.href === "/contact");
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const navLinkClass = (href: string) =>
    `relative rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300 after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:rounded-full after:bg-coral after:transition-all after:duration-300 ${
      isActive(href)
        ? "bg-coral/10 text-blueDeep after:w-6 after:-translate-x-1/2"
        : "text-ink/70 after:w-0 after:-translate-x-1/2 hover:bg-beige hover:text-blueDeep hover:after:w-6"
    }`;
  const mobileNavLinkClass = (href: string) =>
    `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      isActive(href) ? "bg-coral/10 text-blueDeep ring-1 ring-coral/15" : "text-blueDeep hover:bg-beige"
    }`;
  const loginActive = pathname.startsWith("/login") || pathname.startsWith("/mother-login");

  return (
    <header className="sticky top-0 z-40 border-b border-blueDeep/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo compact />
        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className={`focus-ring relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300 after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:rounded-full after:bg-coral after:transition-all after:duration-300 ${
                loginActive
                  ? "bg-coral/10 text-blueDeep after:w-6 after:-translate-x-1/2"
                  : "text-ink/70 after:w-0 after:-translate-x-1/2 hover:bg-beige hover:text-blueDeep hover:after:w-6"
              }`}
              onClick={() => setLoginOpen((value) => !value)}
              type="button"
            >
              Student Login
              <ChevronDown className="h-4 w-4" />
            </button>
            {loginOpen ? (
              <div className="absolute right-0 mt-3 grid w-44 gap-1 rounded-2xl border border-blueDeep/10 bg-white p-2 shadow-soft">
                <Link href="/login?role=mother" className="rounded-xl px-3 py-2 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setLoginOpen(false)}>
                  Mother Login
                </Link>
                <Link href="/login?role=kid" className="rounded-xl px-3 py-2 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setLoginOpen(false)}>
                  Kid Login
                </Link>
              </div>
            ) : null}
          </div>
          {contactLink ? (
            <Link href={contactLink.href} className={navLinkClass(contactLink.href)}>
              {contactLink.label}
            </Link>
          ) : null}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <CartLink />
        </div>
        <button className="focus-ring rounded-full bg-beige p-3 text-blueDeep lg:hidden" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-blueDeep/10 bg-white px-4 py-4 shadow-soft lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileNavLinkClass(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login?role=mother" className="rounded-2xl px-4 py-3 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setOpen(false)}>
              Mother Login
            </Link>
            <Link href="/login?role=kid" className="rounded-2xl px-4 py-3 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setOpen(false)}>
              Kid Login
            </Link>
            {contactLink ? (
              <Link href={contactLink.href} className={mobileNavLinkClass(contactLink.href)} onClick={() => setOpen(false)}>
                {contactLink.label}
              </Link>
            ) : null}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Button href="/cart" variant="ghost" className="w-full py-2.5">Cart</Button>
              <Button href="/login?role=mother" variant="ghost" className="w-full py-2.5">Student Login</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
