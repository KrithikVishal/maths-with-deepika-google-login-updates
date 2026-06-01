"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { Button } from "@/components/Button";

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function CartView() {
  const { items, subtotal, increase, decrease, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-soft bg-white p-8 text-center shadow-soft">
        <h3 className="text-2xl font-bold text-blueDeep">Your cart is empty.</h3>
        <p className="mt-3 text-ink/70">Explore products to get started.</p>
        <Button href="/shop" className="mt-6">Explore Products</Button>
      </div>
    );
  }

  const shipping = subtotal > 0 ? 60 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-soft bg-white p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-blueDeep">{item.name}</h3>
                <p className="mt-1 text-sm text-ink/65">{item.priceLabel} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="focus-ring rounded-full bg-beige p-2 text-blueDeep" onClick={() => decrease(item.id)} aria-label={`Decrease ${item.name}`}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center font-bold text-blueDeep">{item.quantity}</span>
                <button className="focus-ring rounded-full bg-beige p-2 text-blueDeep disabled:opacity-40" onClick={() => increase(item.id)} disabled={item.quantity >= item.stock} aria-label={`Increase ${item.name}`}>
                  <Plus className="h-4 w-4" />
                </button>
                <button className="focus-ring rounded-full bg-alert/10 p-2 text-alert" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-blueDeep">Subtotal: {money(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <aside className="rounded-soft bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-blueDeep">Cart total</h3>
        <div className="my-5 grid gap-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><b>{money(subtotal)}</b></div>
          <div className="flex justify-between"><span>Shipping</span><b>{money(shipping)}</b></div>
          <div className="flex justify-between text-lg text-blueDeep"><span>Total</span><b>{money(subtotal + shipping)}</b></div>
        </div>
        <Button href="/checkout" className="w-full">Checkout</Button>
        <Link href="/shop" className="mt-4 block text-center text-sm font-bold text-blueDeep hover:text-coral">Continue shopping</Link>
      </aside>
    </div>
  );
}
