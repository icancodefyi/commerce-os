"use client";

import type { CartItem } from "@/types/cart";

export function OrderSummary({ items }: { items: CartItem[] }) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="border rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product._id} className="flex justify-between text-sm">
            <span>
              {product.title}{" "}
              <span className="text-zinc-400">× {quantity}</span>
            </span>
            <span>₹{product.price * quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}
