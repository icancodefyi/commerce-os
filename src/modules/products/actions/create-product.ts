"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import { productSchema } from "../validations/product-schema";

export async function createProduct(formData: FormData): Promise<void> {
  try {
    await connectDB();

    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      comparePrice: formData.get("comparePrice"),
      stock: formData.get("stock"),
      category: formData.get("category"),
    };

    const validated = productSchema.parse(rawData);

    const slug = slugify(validated.title, {
      lower: true,
      strict: true,
    });

    const product = await Product.create({
      ...validated,
      slug,
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (error: any) {
    console.log(error);

    console.log(error);
    // redirect throws internally so we just swallow non-redirect errors
    if ((error as any).digest?.startsWith("NEXT_REDIRECT")) throw error;
  }
}
