"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { CartDrawer } from "@/modules/cart/components/cart-drawer";

export function StoreNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  return (
    <>
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Commerce OS
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-sm hover:underline">
            Products
          </Link>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
