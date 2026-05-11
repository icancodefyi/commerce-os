"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import { productSchema } from "../validations/product-schema";
import { generateUniqueSlug } from "@/lib/slug";

export async function createProduct(formData: FormData): Promise<void> {
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

    const slug = await generateUniqueSlug(validated.title);

    // Parse comma-separated image URLs into array
    const images = validated.images
      ? validated.images.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    await Product.create({ ...validated, slug, images });

    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error(error);
  }
}
