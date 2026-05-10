import { getProducts } from "@/modules/products/server/queries";
import { DeleteProductButton } from "@/modules/products/components/delete-product-button";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg"
        >
          + New Product
        </Link>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Stock</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium">{product.title}</td>
                <td className="px-4 py-3 text-zinc-500">{product.category || "—"}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-3 justify-end">
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="text-sm hover:underline"
                  >
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
                  <Link href="/admin/products/new" className="underline">
                    Create one
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
