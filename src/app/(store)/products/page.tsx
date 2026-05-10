import { getProducts } from "@/modules/products/server/queries";
import { ProductCard } from "@/modules/products/components/product-card";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
