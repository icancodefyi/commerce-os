import { getProductById } from "@/modules/products/server/queries";
import { updateProduct } from "@/modules/products/actions/update-product";
import { notFound, redirect } from "next/navigation";

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
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form action={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={product.title}
          placeholder="Title"
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="description"
          defaultValue={product.description}
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="price"
          type="number"
          defaultValue={product.price}
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="comparePrice"
          type="number"
          defaultValue={product.comparePrice}
          placeholder="Compare Price"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="stock"
          type="number"
          defaultValue={product.stock}
          placeholder="Stock"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="category"
          defaultValue={product.category}
          placeholder="Category"
          className="w-full border p-3 rounded-lg"
        />
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
}
