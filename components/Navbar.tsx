"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/mock";
import { BrandLogo } from "./BrandLogo";
import { Button } from "./Button";
import { CartLink } from "./cart/CartLink";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");
  const contactLink = navLinks.find((link) => link.href === "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-blueDeep/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo compact />
        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink/70 transition hover:text-blueDeep">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm font-medium text-ink/70 transition hover:text-blueDeep">
            Student Login
          </Link>
          {contactLink ? (
            <Link href={contactLink.href} className="text-sm font-medium text-ink/70 transition hover:text-blueDeep">
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
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-blueDeep hover:bg-beige"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-2xl px-4 py-3 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setOpen(false)}>
              Student Login
            </Link>
            {contactLink ? (
              <Link href={contactLink.href} className="rounded-2xl px-4 py-3 text-sm font-semibold text-blueDeep hover:bg-beige" onClick={() => setOpen(false)}>
                {contactLink.label}
              </Link>
            ) : null}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Button href="/cart" variant="ghost" className="w-full py-2.5">Cart</Button>
              <Button href="/login" variant="ghost" className="w-full py-2.5">Student Login</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
