"use client";

import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { useCheckoutStore } from "@/modules/checkout/store/use-checkout-store";
import { CouponInput } from "@/modules/checkout/components/coupon-input";
import { X, Minus, Plus } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { coupon, setCoupon } = useCheckoutStore();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
          <div>
            <p className="text-xs tracking-widest uppercase text-zinc-400">Your</p>
            <h2 className="font-serif text-2xl">Cart</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <p className="font-serif text-2xl text-zinc-300">Empty</p>
              <p className="text-xs tracking-widest uppercase text-zinc-400">Your cart awaits</p>
            </div>
          )}

          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex gap-5">
              <div className="w-20 h-24 bg-zinc-50 shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <p className="text-sm font-medium leading-snug">{product.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(product._id, quantity - 1)}
                      className="text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      className="text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm">₹{product.price * quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(product._id)}
                className="text-zinc-300 hover:text-zinc-600 transition-colors self-start mt-1"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-zinc-100 space-y-4">
            <CouponInput
              total={total()}
              applied={coupon}
              onApply={setCoupon}
            />
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-widest uppercase text-zinc-400">Subtotal</span>
              <span className="text-sm">₹{total()}</span>
            </div>
            {coupon && (
              <div className="flex justify-between items-baseline text-green-600">
                <span className="text-xs tracking-widest uppercase">Discount</span>
                <span className="text-sm">−₹{coupon.discount}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline border-t border-zinc-100 pt-3">
              <span className="text-xs tracking-widest uppercase text-zinc-400">Total</span>
              <span className="font-serif text-2xl">₹{total() - (coupon?.discount ?? 0)}</span>
            </div>
            <a
              href="/checkout"
              className="block w-full bg-black text-white text-center py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
