"use client";

import { useState } from "react";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
