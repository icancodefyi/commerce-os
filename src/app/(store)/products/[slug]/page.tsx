import { getProductBySlug } from "@/modules/products/server/queries";
import { AddToCartButton } from "@/modules/cart/components/add-to-cart-button";
import { notFound } from "next/navigation";
import Image from "next/image";

const FALLBACK = "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const image = product.images?.[0] ?? FALLBACK;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={product.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center py-8">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">
            {product.category}
          </p>

          <h1 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-6">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl">₹{product.price}</span>
            {product.comparePrice > 0 && (
              <span className="text-sm line-through text-zinc-300">
                ₹{product.comparePrice}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-sm text-zinc-500 leading-relaxed mb-10 max-w-sm">
              {product.description}
            </p>
          )}

          <div className="space-y-3">
            <AddToCartButton product={product} />
            <p className="text-xs text-center text-zinc-400 tracking-wide">
              Free shipping on orders above ₹999
            </p>
          </div>

          {product.stock <= 5 && product.stock > 0 && (
            <p className="mt-6 text-xs tracking-widest uppercase text-amber-600">
              Only {product.stock} left
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
