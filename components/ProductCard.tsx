"use client";

import { Package } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./cart/CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  const outOfStock = product.stock <= 0;
  const added = lastAdded === product.id;

  return (
    <article className="brand-card brand-card-hover p-5">
      <div className="mb-5 grid aspect-[4/3] place-items-center rounded-2xl bg-beige">
        <Package className="h-12 w-12 text-coral" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug text-blueDeep">{product.name}</h3>
          <p className={`mt-1 text-[0.95rem] leading-6 ${outOfStock ? "font-semibold text-alert" : "text-ink/70"}`}>
            {outOfStock ? "Out of Stock" : product.status}
          </p>
        </div>
        <span className="text-base font-bold text-blueDeep">{product.priceLabel}</span>
      </div>
      <button
        className="focus-ring mt-5 w-full rounded-full bg-white px-5 py-3 text-base font-bold leading-none text-blueDeep ring-1 ring-borderSoft transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-50"
        disabled={outOfStock}
        onClick={() => addItem(product)}
      >
        {outOfStock ? "Out of Stock" : added ? "Added" : "Add to Cart"}
      </button>
    </article>
  );
}
