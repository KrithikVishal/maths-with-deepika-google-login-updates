"use client";

import { useState } from "react";
import { digitalProducts } from "@/data/mock";

export function DigitalProductGrid() {
  const [added, setAdded] = useState("");

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {digitalProducts.map((product) => {
        const Icon = product.icon;
        return (
          <article key={product.name} className="rounded-soft bg-white p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-blueDeep">{product.name}</h3>
            <p className="mt-2 text-sm text-ink/65">{product.files}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-bold text-blueDeep">{product.price}</span>
              <button
                className="focus-ring inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 transition hover:bg-beige"
                onClick={() => {
                  setAdded(product.name);
                  window.setTimeout(() => setAdded(""), 1600);
                }}
              >
                {added === product.name ? "Added" : "Add"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
