import { create } from "zustand";
import type { Address } from "@/types/address";

interface AppliedCoupon {
  code: string;
  type: "flat" | "percent";
  value: number;
  discount: number;
}

interface CheckoutStore {
  address: Address | null;
  coupon: AppliedCoupon | null;
  setAddress: (address: Address) => void;
  setCoupon: (coupon: AppliedCoupon | null) => void;
  clear: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  address: null,
  coupon: null,
  setAddress: (address) => set({ address }),
  setCoupon: (coupon) => set({ coupon }),
  clear: () => set({ address: null, coupon: null }),
}));
