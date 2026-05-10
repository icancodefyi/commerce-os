"use client";

import { useCartStore } from "@/modules/cart/store/use-cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-8 bg-black text-white px-8 py-4 rounded-xl w-full"
    >
      Add to Cart
    </button>
  );
}
