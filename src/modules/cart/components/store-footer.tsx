import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="border-t border-zinc-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl mb-3">Commerce OS</p>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
            A premium commerce experience built for the discerning few.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">Shop</p>
          <div className="space-y-2">
            <Link href="/products" className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Collections</Link>
            <Link href="/products" className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors">New Arrivals</Link>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">Support</p>
          <div className="space-y-2">
            <Link href="/" className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Contact</Link>
            <Link href="/" className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Returns</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 px-6 py-5 max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Commerce OS</p>
        <p className="text-xs text-zinc-400 tracking-widest uppercase">Premium Commerce</p>
      </div>
    </footer>
  );
}
