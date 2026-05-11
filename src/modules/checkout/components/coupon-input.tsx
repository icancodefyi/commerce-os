"use client";

import { useState } from "react";
import { toast } from "sonner";
import { validateCoupon } from "@/modules/checkout/actions/validate-coupon";

interface AppliedCoupon {
  code: string;
  type: "flat" | "percent";
  value: number;
  discount: number;
}

interface CouponInputProps {
  total: number;
  onApply: (coupon: AppliedCoupon | null) => void;
  applied: AppliedCoupon | null;
}

export function CouponInput({ total, onApply, applied }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    if (!code.trim()) return;
    setLoading(true);
    const result = await validateCoupon(code, total);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    onApply(result.coupon as AppliedCoupon);
    toast.success(`Coupon applied — ₹${result.coupon!.discount} off`);
    setCode("");
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between text-xs py-2 px-3 bg-green-50 border border-green-100 rounded">
        <span className="text-green-700 font-medium tracking-widest uppercase">
          {applied.code} — ₹{applied.discount} off
        </span>
        <button
          onClick={() => onApply(null)}
          className="text-green-500 hover:text-green-700 transition-colors ml-3"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
        placeholder="Coupon code"
        className="flex-1 border border-zinc-200 px-3 py-2 text-xs tracking-widest uppercase focus:outline-none focus:border-zinc-400 transition-colors"
      />
      <button
        onClick={handleApply}
        disabled={loading || !code.trim()}
        className="bg-zinc-900 text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-zinc-700 transition-colors disabled:opacity-40"
      >
        {loading ? "..." : "Apply"}
      </button>
    </div>
  );
}
