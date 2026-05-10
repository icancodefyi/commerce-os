import Link from "next/link";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="border rounded-xl p-4 block hover:shadow-lg transition"
    >
      <div className="aspect-square bg-zinc-100 rounded-lg mb-4" />

      <h2 className="font-semibold text-lg">
        {product.title}
      </h2>

      <p className="text-sm text-zinc-500 mt-1">
        {product.category}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className="font-bold text-lg">
          ₹{product.price}
        </span>

        {product.comparePrice > 0 && (
          <span className="text-sm line-through text-zinc-400">
            ₹{product.comparePrice}
          </span>
        )}
      </div>
    </Link>
  );
}
