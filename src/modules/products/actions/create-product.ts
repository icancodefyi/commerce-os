"use server";

import slugify from "slugify";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import { productSchema } from "../validations/product-schema";

export async function createProduct(formData: FormData) {
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

    const plain = product.toObject();

    return {
      success: true,
      product: { ...plain, _id: plain._id.toString() },
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
}
