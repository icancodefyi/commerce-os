"use server";

import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

export async function updateOrderStatus(orderId: string, status: string) {
  if (!VALID_STATUSES.includes(status)) {
    return { success: false, error: "Invalid status" };
  }

  try {
    await connectDB();
    await Order.findByIdAndUpdate(orderId, { status });
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
