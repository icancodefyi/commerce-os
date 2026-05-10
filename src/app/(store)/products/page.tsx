import { getProducts } from "@/modules/products/server/queries";
import { ProductCard } from "@/modules/products/components/product-card";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">Curated Collection</p>
        <h1 className="font-serif text-5xl font-normal">All Products</h1>
      </div>

      {products.length === 0 ? (
        <p className="text-zinc-400 text-sm">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
