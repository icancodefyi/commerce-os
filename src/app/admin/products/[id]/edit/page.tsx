import { getProductById } from "@/modules/products/server/queries";
import { updateProduct } from "@/modules/products/actions/update-product";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

const inputClass = "w-full border border-zinc-200 p-3 rounded-lg text-sm focus:outline-none focus:border-zinc-400 transition-colors";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const result = await updateProduct(id, formData);
    if (result.success) redirect("/admin/products");
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <Link href="/admin/products" className="text-sm text-zinc-400 hover:text-zinc-700">
          ← Back
        </Link>
      </div>

      <form action={handleUpdate} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Title *</label>
          <input name="title" defaultValue={product.title} required className={inputClass} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Description</label>
          <textarea name="description" defaultValue={product.description} rows={3} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Price *</label>
            <input name="price" type="number" min="0" step="0.01" defaultValue={product.price} required className={inputClass} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Compare Price</label>
            <input name="comparePrice" type="number" min="0" step="0.01" defaultValue={product.comparePrice} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Stock *</label>
            <input name="stock" type="number" min="0" defaultValue={product.stock} required className={inputClass} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Category</label>
            <input name="category" defaultValue={product.category} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Image URLs</label>
          <textarea
            name="images"
            defaultValue={product.images?.join(", ")}
            rows={2}
            className={inputClass}
          />
          <p className="text-xs text-zinc-400 mt-1">Comma-separated image URLs. First image is used as the main product image.</p>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Status</label>
          <select name="status" defaultValue={product.status} className={inputClass}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-zinc-800 transition-colors">
            Save Changes
          </button>
          <Link href="/admin/products" className="px-6 py-3 rounded-lg text-sm border border-zinc-200 hover:bg-zinc-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
