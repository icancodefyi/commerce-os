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
      <nav className="fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-wide">
            Commerce OS
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/products" className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900 transition-colors">
              Collections
            </Link>
            <Link href="/" className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900 transition-colors">
              Story
            </Link>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {count > 0 && (
              <span className="text-xs font-medium text-zinc-500">({count})</span>
            )}
          </button>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
