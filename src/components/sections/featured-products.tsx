import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { ProductCard } from "@/modules/products/components/product-card";
import { getProducts } from "@/modules/products/server/queries";

export async function FeaturedProducts() {
  const products = await getProducts();
  const featured = products.filter((p) => p.status === "active").slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-3">
            Curated Selection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight">
            Featured Pieces
          </h2>
        </div>
        <Link
          href="/products"
          className="text-[11px] tracking-[0.18em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors border-b border-zinc-300 pb-0.5 self-start md:self-auto"
        >
          View All
        </Link>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
        {featured.map((product, i) => (
          <FadeIn key={product._id} delay={i * 0.1}>
            <ProductCard product={product} index={i} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
