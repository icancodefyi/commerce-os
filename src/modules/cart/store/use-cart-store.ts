import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore } from "@/types/cart";
import type { Product } from "@/types/product";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const existing = get().items.find((i) => i.product._id === product._id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.product._id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product._id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "commerce-os-cart" }
  )
);
