"use server";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import { productSchema } from "../validations/product-schema";
import { revalidatePath } from "next/cache";
import { generateUniqueSlug } from "@/lib/slug";

export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectDB();

    const validated = productSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      comparePrice: formData.get("comparePrice"),
      stock: formData.get("stock"),
      category: formData.get("category"),
      images: formData.get("images"),
      status: formData.get("status"),
    });

    const slug = await generateUniqueSlug(validated.title, id);

    const images = validated.images
      ? validated.images.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    await Product.findByIdAndUpdate(id, { ...validated, slug, images });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${slug}`);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
