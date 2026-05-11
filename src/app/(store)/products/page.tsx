import { getProducts } from "@/modules/products/server/queries";
import { ProductCard } from "@/modules/products/components/product-card";
import { ProductFilters } from "@/modules/products/components/product-filters";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q, category, sort } = await searchParams;
  const allProducts = await getProducts();

  // Only show active products
  let products = allProducts.filter((p) => p.status === "active");

  // Search
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (category) {
    products = products.filter((p) => p.category === category);
  }

  // Sort
  if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") products.sort((a, b) => b.price - a.price);

  // Unique categories for filter dropdown
  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-3">
          Curated Collection
        </p>
        <h1 className="font-serif text-5xl font-normal">All Products</h1>
      </div>

      <Suspense>
        <ProductFilters categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-zinc-300 mb-2">No products found</p>
          <p className="text-xs tracking-widest uppercase text-zinc-400">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
