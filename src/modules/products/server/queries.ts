import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";
import type { Product as ProductType } from "@/types/product";

export async function getProducts(): Promise<ProductType[]> {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(product));
}

export async function getProductById(id: string): Promise<ProductType | null> {
  await connectDB();
  const product = await Product.findById(id).lean();
  return JSON.parse(JSON.stringify(product));
}
