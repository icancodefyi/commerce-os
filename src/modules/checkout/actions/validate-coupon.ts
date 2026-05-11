"use server";

import { connectDB } from "@/lib/mongodb";
import { Coupon } from "@/models/coupon.model";

export async function validateCoupon(code: string, orderTotal: number) {
  try {
    await connectDB();

    const coupon = await Coupon.findOne({
      code: code.toUpperCase().trim(),
      active: true,
    }).lean() as any;

    if (!coupon) return { success: false, error: "Invalid coupon code." };

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return { success: false, error: "This coupon has expired." };
    }

    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      return { success: false, error: "This coupon has reached its usage limit." };
    }

    if (orderTotal < coupon.minOrder) {
      return {
        success: false,
        error: `Minimum order of ₹${coupon.minOrder} required for this coupon.`,
      };
    }

    const discount =
      coupon.type === "percent"
        ? Math.round((orderTotal * coupon.value) / 100)
        : coupon.value;

    return {
      success: true,
      coupon: {
        _id: coupon._id.toString(),
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount: Math.min(discount, orderTotal),
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
