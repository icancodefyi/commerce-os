import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const image = product.images?.[0] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="aspect-[3/4] relative overflow-hidden mb-4">
        <Image
          src={image}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-zinc-400">{product.category}</p>
        <h3 className="font-serif text-lg leading-snug group-hover:text-zinc-500 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-sm">₹{product.price}</span>
          {product.comparePrice > 0 && (
            <span className="text-xs line-through text-zinc-300">₹{product.comparePrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
