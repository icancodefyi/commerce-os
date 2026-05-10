import { create } from "zustand";
import type { Address } from "@/types/address";

interface CheckoutStore {
  address: Address | null;
  setAddress: (address: Address) => void;
  clear: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  clear: () => set({ address: null }),
}));
