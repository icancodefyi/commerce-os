"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { CartDrawer } from "@/modules/cart/components/cart-drawer";

const navLinks = [
  { label: "New Arrivals", href: "/products" },
  { label: "Collections", href: "/products" },
  { label: "Our Story", href: "/" },
  { label: "Boutiques", href: "/" },
];

export function StoreNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl tracking-wide shrink-0 z-10"
          >
            Commerce OS
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 ml-auto">
            <button className="hidden md:block text-zinc-500 hover:text-zinc-900 transition-colors">
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button className="hidden md:block text-zinc-500 hover:text-zinc-900 transition-colors">
              <User size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative text-zinc-700 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {count > 0 && (
                <span className="text-[10px] tracking-wide text-zinc-500">
                  ({count})
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-zinc-700"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

        {/* Spacer — fixed navbar only */}
      <div className="h-16" />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-500 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
          <Link href="/" className="font-serif text-xl" onClick={() => setMobileOpen(false)}>
            Commerce OS
          </Link>
          <button onClick={() => setMobileOpen(false)}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col px-6 py-12 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl font-normal text-zinc-800 hover:text-zinc-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
