import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/product.model";

export async function getProducts() {
  await connectDB();

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(products));
}

export async function getProductBySlug(slug: string) {
  await connectDB();

  const product = await Product.findOne({ slug }).lean();

  return JSON.parse(JSON.stringify(product));
}
