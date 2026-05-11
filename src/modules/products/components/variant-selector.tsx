"use client";

import { useState } from "react";

export function VariantSelector({ variants }: { variants: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!variants || variants.length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
        {selected ? `Selected: ${selected}` : "Select Option"}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setSelected(v === selected ? null : v)}
            className={`px-4 py-2 text-xs tracking-wide border transition-colors ${
              selected === v
                ? "bg-black text-white border-black"
                : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
