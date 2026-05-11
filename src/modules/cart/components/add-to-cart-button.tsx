"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    if (product.stock === 0) {
      toast.error("This product is out of stock.");
      return;
    }
    addItem(product);
    setAdded(true);
    toast.success(`${product.title} added to cart`);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.stock === 0 ? "Out of Stock" : added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
