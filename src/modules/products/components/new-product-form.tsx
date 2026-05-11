"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImageUrlInput } from "@/modules/products/components/image-url-input";
import { createProduct } from "@/modules/products/actions/create-product";
import Link from "next/link";

const inputClass =
  "w-full border border-zinc-200 p-3 rounded-lg text-sm focus:outline-none focus:border-zinc-400 transition-colors";

export function NewProductForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createProduct(formData);
      router.push("/admin/products");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Title *</label>
        <input name="title" placeholder="Product title" required className={inputClass} />
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Description</label>
        <textarea name="description" placeholder="Product description" rows={3} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Price *</label>
          <input name="price" type="number" min="0" step="0.01" placeholder="0.00" required className={inputClass} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Compare Price</label>
          <input name="comparePrice" type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Stock *</label>
          <input name="stock" type="number" min="0" placeholder="0" required className={inputClass} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Category</label>
          <input name="category" placeholder="e.g. Jewellery" className={inputClass} />
        </div>
      </div>

      <ImageUrlInput />

      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Variants</label>
        <input
          name="variants"
          placeholder="S, M, L or Red, Blue, Gold"
          className={inputClass}
        />
        <p className="text-xs text-zinc-400 mt-1">Comma-separated variant options (size, color, etc.)</p>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">Status</label>
        <select name="status" defaultValue="active" className={inputClass}>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {pending ? "Creating..." : "Create Product"}
        </button>
        <Link href="/admin/products" className="px-6 py-3 rounded-lg text-sm border border-zinc-200 hover:bg-zinc-50 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
