import Link from "next/link";
import { brand } from "@/config/brand";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-zinc-50 flex flex-col p-4 gap-1">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          {brand.name}
        </p>
        <Link
          href="/admin"
          className="text-sm px-3 py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="text-sm px-3 py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="text-sm px-3 py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Orders
        </Link>
        <Link
          href="/admin/coupons"
          className="text-sm px-3 py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Coupons
        </Link>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
