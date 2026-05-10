import { createProduct } from "@/modules/products/actions/create-product";

export default function NewProductPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        Create Product
      </h1>

      <form
        action={createProduct}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="comparePrice"
          type="number"
          placeholder="Compare Price"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded-lg"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}
