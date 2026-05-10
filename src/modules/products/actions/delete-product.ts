"use server";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
