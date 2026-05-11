import { NewProductForm } from "@/modules/products/components/new-product-form";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">New Product</h1>
        <Link href="/admin/products" className="text-sm text-zinc-400 hover:text-zinc-700">
          ← Back
        </Link>
      </div>
      <NewProductForm />
    </div>
  );
}
