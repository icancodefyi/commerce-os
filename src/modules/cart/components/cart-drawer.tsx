"use client";

import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { X } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Cart</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-zinc-400 text-sm text-center mt-10">
              Your cart is empty.
            </p>
          )}
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex gap-3 items-start">
              <div className="w-16 h-16 bg-zinc-100 rounded-lg shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">{product.title}</p>
                <p className="text-zinc-500 text-sm">₹{product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="w-6 h-6 border rounded text-sm"
                  >
                    −
                  </button>
                  <span className="text-sm">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-6 h-6 border rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(product._id)}
                className="text-zinc-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total()}</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-xl">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
