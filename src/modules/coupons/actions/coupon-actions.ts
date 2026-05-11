"use server";

import { connectDB } from "@/lib/mongodb";
import { Coupon } from "@/models/coupon.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCoupon(formData: FormData): Promise<void> {
  try {
    await connectDB();
    await Coupon.create({
      code: (formData.get("code") as string).toUpperCase().trim(),
      type: formData.get("type"),
      value: Number(formData.get("value")),
      minOrder: Number(formData.get("minOrder") ?? 0),
      usageLimit: Number(formData.get("usageLimit") ?? 0),
      expiresAt: formData.get("expiresAt") || null,
      active: true,
    });
    revalidatePath("/admin/coupons");
    redirect("/admin/coupons");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error(error);
  }
}

export async function toggleCoupon(id: string, active: boolean) {
  try {
    await connectDB();
    await Coupon.findByIdAndUpdate(id, { active });
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCoupon(id: string, formData: FormData): Promise<void> {
  try {
    await connectDB();
    await Coupon.findByIdAndUpdate(id, {
      code: (formData.get("code") as string).toUpperCase().trim(),
      type: formData.get("type"),
      value: Number(formData.get("value")),
      minOrder: Number(formData.get("minOrder") ?? 0),
      usageLimit: Number(formData.get("usageLimit") ?? 0),
      expiresAt: formData.get("expiresAt") || null,
    });
    revalidatePath("/admin/coupons");
    redirect("/admin/coupons");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error(error);
  }
}

export async function deleteCoupon(id: string) {
  try {
    await connectDB();
    await Coupon.findByIdAndDelete(id);
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
