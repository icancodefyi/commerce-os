import { getProductById } from "@/modules/products/server/queries";
import { EditProductForm } from "@/modules/products/components/edit-product-form";
import { notFound } from "next/navigation";
import Link from "next/link";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <Link href="/admin/products" className="text-sm text-zinc-400 hover:text-zinc-700">
          ← Back
        </Link>
      </div>
      <EditProductForm product={product} />
    </div>
  );
}
