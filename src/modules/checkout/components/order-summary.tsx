"use client";

import type { CartItem } from "@/types/cart";

export function OrderSummary({ items }: { items: CartItem[] }) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="bg-zinc-50 p-8 h-fit">
      <p className="text-xs tracking-widest uppercase text-zinc-400 mb-6">Order Summary</p>

      <div className="space-y-5 mb-8">
        {items.map(({ product, quantity }) => (
          <div key={product._id} className="flex gap-4">
            <div className="w-14 h-16 bg-zinc-200 shrink-0" />
            <div className="flex-1 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium leading-snug">{product.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Qty {quantity}</p>
              </div>
              <p className="text-sm">₹{product.price * quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 pt-5 flex justify-between items-baseline">
        <span className="text-xs tracking-widest uppercase text-zinc-400">Total</span>
        <span className="font-serif text-2xl">₹{total}</span>
      </div>
    </div>
  );
}
