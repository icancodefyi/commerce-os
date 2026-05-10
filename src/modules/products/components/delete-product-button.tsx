"use client";

import { deleteProduct } from "@/modules/products/actions/delete-product";
import { useTransition } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await deleteProduct(id);
        })
      }
      disabled={isPending}
      className="text-sm text-red-500 hover:underline disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
