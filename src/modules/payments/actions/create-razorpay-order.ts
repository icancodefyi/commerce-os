"use server";

import { razorpay } from "@/lib/razorpay";

export async function createRazorpayOrder(amountInPaise: number) {
  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return { success: true, order };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
