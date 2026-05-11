import slugify from "slugify";
import { Product } from "@/models/product.model";

export async function generateUniqueSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let count = 1;

  while (true) {
    const query: any = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Product.findOne(query).lean();
    if (!existing) break;
    slug = `${base}-${++count}`;
  }

  return slug;
}
