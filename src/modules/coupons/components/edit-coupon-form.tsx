"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCoupon } from "@/modules/coupons/actions/coupon-actions";
import Link from "next/link";
import { toast } from "sonner";

const inputClass =
  "w-full border border-zinc-200 p-3 rounded-lg text-sm focus:outline-none focus:border-zinc-400 transition-colors";

interface Coupon {
  _id: string;
  code: string;
  type: "flat" | "percent";
  value: number;
  minOrder: number;
  usageLimit: number;
  expiresAt: string | null;
}

export function EditCouponForm({ coupon }: { coupon: Coupon }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await updateCoupon(coupon._id, formData);
        toast.success("Coupon updated successfully");
        router.push("/admin/coupons");
      } catch (error: any) {
        toast.error(error?.message || "Failed to update coupon");
      }
    });
  }

  const expiresAt = coupon.expiresAt
    ? new Date(coupon.expiresAt).toISOString().split("T")[0]
    : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg border border-zinc-200">
      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
          Code *
        </label>
        <input
          name="code"
          placeholder="SUMMER20"
          required
          defaultValue={coupon.code}
          className={inputClass}
          maxLength={20}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Type *
          </label>
          <select name="type" required defaultValue={coupon.type} className={inputClass}>
            <option value="flat">Flat Amount</option>
            <option value="percent">Percentage</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Value *
          </label>
          <input
            name="value"
            type="number"
            min="0"
            step="1"
            placeholder="500"
            defaultValue={coupon.value}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Min Order Amount (₹)
          </label>
          <input
            name="minOrder"
            type="number"
            min="0"
            step="1"
            placeholder="1000"
            defaultValue={coupon.minOrder}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Usage Limit (0 = unlimited)
          </label>
          <input
            name="usageLimit"
            type="number"
            min="0"
            step="1"
            placeholder="100"
            defaultValue={coupon.usageLimit}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
          Expires At (optional)
        </label>
        <input
          name="expiresAt"
          type="date"
          defaultValue={expiresAt}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-zinc-900 transition-colors disabled:opacity-50"
        >
          {pending ? "Updating..." : "Update Coupon"}
        </button>
        <Link
          href="/admin/coupons"
          className="flex-1 text-center border border-zinc-200 py-2 px-4 rounded-lg hover:border-zinc-400 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
