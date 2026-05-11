"use client";

import { useTransition } from "react";
import { toggleCoupon, deleteCoupon } from "@/modules/coupons/actions/coupon-actions";

export function CouponActions({ id, active }: { id: string; active: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-3">
      <button
        disabled={pending}
        onClick={() => startTransition(async () => { await toggleCoupon(id, !active); })}
        className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
          active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
        }`}
      >
        {active ? "Active" : "Inactive"}
      </button>
      <button
        disabled={pending}
        onClick={() => startTransition(async () => { await deleteCoupon(id); })}
        className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
