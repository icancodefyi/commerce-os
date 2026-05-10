import { getProductBySlug } from "@/modules/products/server/queries";
import { AddToCartButton } from "@/modules/cart/components/add-to-cart-button";
import type { Product } from "@/types/product";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-zinc-100 rounded-xl" />

        <div>
          <p className="text-sm text-zinc-500 mb-2">{product.category}</p>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.comparePrice > 0 && (
              <span className="line-through text-zinc-400">
                ₹{product.comparePrice}
              </span>
            )}
          </div>

          <p className="mt-6 text-zinc-600">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
