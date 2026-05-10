import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="aspect-[3/4] bg-zinc-50 overflow-hidden mb-4">
        <div className="w-full h-full bg-zinc-100 group-hover:scale-105 transition-transform duration-700 ease-in-out" />
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
