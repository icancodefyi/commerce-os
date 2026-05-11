import Link from "next/link";
import { brand } from "@/config/brand";

export function StoreFooter() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif text-2xl mb-4">{brand.name}</p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-8">
              {brand.description}
            </p>
            <div className="flex items-center gap-5">
              {Object.entries(brand.social).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors capitalize"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(brand.footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 mb-5">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-600 tracking-wide">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-[10px] tracking-wide text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
