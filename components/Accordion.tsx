"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Accordion({ items }: { items: Array<{ title: string; content: React.ReactNode }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item.title} className="jolly-card-motion overflow-hidden rounded-soft border border-borderSoft bg-white shadow-sm">
          <button
            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-blueDeep"
            onClick={() => setOpen(open === index ? -1 : index)}
            type="button"
          >
            {item.title}
            <ChevronDown className={`h-5 w-5 shrink-0 text-coral transition ${open === index ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-all duration-300 ease-out ${open === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <div className="border-t border-borderSoft px-5 py-4 text-sm leading-7 text-ink/70">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
