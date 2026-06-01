"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { count } = useCart();

  return (
    <Link href="/cart" className="focus-ring relative inline-flex items-center justify-center rounded-full bg-beige p-3 text-blueDeep transition hover:bg-gold/20" aria-label="Cart">
      <ShoppingCart className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
