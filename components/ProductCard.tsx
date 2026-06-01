"use client";

import { Package } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./cart/CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  const outOfStock = product.stock <= 0;
  const added = lastAdded === product.id;

  return (
    <article className="rounded-soft border border-blueDeep/10 bg-white p-5 shadow-soft transition hover:-translate-y-1">
      <div className="mb-5 grid aspect-[4/3] place-items-center rounded-2xl bg-gradient-to-br from-beige to-white">
        <Package className="h-12 w-12 text-coral" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-blueDeep">{product.name}</h3>
          <p className={`mt-1 text-sm ${outOfStock ? "font-semibold text-alert" : "text-ink/65"}`}>
            {outOfStock ? "Out of Stock" : product.status}
          </p>
        </div>
        <span className="font-bold text-blueDeep">{product.priceLabel}</span>
      </div>
      <button
        className="focus-ring mt-5 w-full rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-50"
        disabled={outOfStock}
        onClick={() => addItem(product)}
      >
        {outOfStock ? "Out of Stock" : added ? "Added" : "Add to Cart"}
      </button>
    </article>
  );
}
