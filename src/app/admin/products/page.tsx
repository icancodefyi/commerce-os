import { getProducts } from "@/modules/products/server/queries";
import { DeleteProductButton } from "@/modules/products/components/delete-product-button";
import { Pagination } from "@/components/ui/pagination";
import { brand } from "@/config/brand";
import Link from "next/link";

const PAGE_SIZE = 20;

interface AdminProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));
  const allProducts = await getProducts();
  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const products = allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-zinc-400 mt-1">{allProducts.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          + New Product
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Title</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Category</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Price</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Stock</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{product.title}</p>
                  <p className="text-xs text-zinc-400 font-mono">{product.slug}</p>
                </td>
                <td className="px-4 py-3 text-zinc-500">{product.category || "—"}</td>
                <td className="px-4 py-3">
                  <p>{brand.currency}{product.price}</p>
                  {product.comparePrice > 0 && (
                    <p className="text-xs line-through text-zinc-300">{brand.currency}{product.comparePrice}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={product.stock === 0 ? "text-red-500 font-medium" : ""}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-3 justify-end">
                  <Link href={`/admin/products/${product._id}/edit`} className="text-xs hover:underline">
                    Edit
                  </Link>
                  <DeleteProductButton id={product._id} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="underline">Create one</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} basePath="/admin/products" />
    </div>
  );
}
