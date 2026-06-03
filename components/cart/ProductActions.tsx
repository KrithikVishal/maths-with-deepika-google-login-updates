"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, lastAdded } = useCart();
  const outOfStock = product.stock <= 0;
  const added = lastAdded === product.id;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        className="jolly-button-secondary focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#102A56] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={outOfStock}
        onClick={() => addItem(product)}
      >
        <ShoppingCart className="h-4 w-4" />
        {outOfStock ? "Out of Stock" : added ? "Added" : "Add to Cart"}
      </button>
      <button
        className="jolly-button-primary focus-ring inline-flex items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={outOfStock}
        onClick={() => {
          addItem(product);
          router.push("/checkout");
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
