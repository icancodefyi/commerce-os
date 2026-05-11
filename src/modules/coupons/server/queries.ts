import { connectDB } from "@/lib/mongodb";
import { Coupon } from "@/models/coupon.model";
import type { Coupon as CouponType } from "@/types/coupon";

export async function getCoupons(): Promise<CouponType[]> {
  await connectDB();
  const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(coupons));
}
