"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface ProductFiltersProps {
  categories: string[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`/products?${params.toString()}`));
  }

  const selectClass = "border border-zinc-200 text-sm px-3 py-2 focus:outline-none focus:border-zinc-400 bg-white transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-12">
      <input
        type="search"
        placeholder="Search products..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => update("q", e.target.value)}
        className="border border-zinc-200 text-sm px-4 py-2 focus:outline-none focus:border-zinc-400 transition-colors w-56"
      />

      <select
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className={selectClass}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("sort") ?? ""}
        onChange={(e) => update("sort", e.target.value)}
        className={selectClass}
      >
        <option value="">Sort: Latest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>

      {(searchParams.get("q") || searchParams.get("category") || searchParams.get("sort")) && (
        <button
          onClick={() => startTransition(() => router.push("/products"))}
          className="text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-700 transition-colors underline underline-offset-2"
        >
          Clear
        </button>
      )}
    </div>
  );
}
