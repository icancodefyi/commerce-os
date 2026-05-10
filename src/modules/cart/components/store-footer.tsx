import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/products" },
    { label: "Collections", href: "/products" },
    { label: "Leather Goods", href: "/products" },
    { label: "Fine Jewellery", href: "/products" },
  ],
  Company: [
    { label: "Our Story", href: "/" },
    { label: "Boutiques", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Press", href: "/" },
  ],
  Support: [
    { label: "Contact", href: "/" },
    { label: "Shipping", href: "/" },
    { label: "Returns", href: "/" },
    { label: "Care Guide", href: "/" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif text-2xl mb-4">Commerce OS</p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-8">
              A premium commerce experience built for those who understand that
              true luxury is never loud.
            </p>
            <div className="flex items-center gap-5">
              {["Instagram", "Pinterest", "Twitter"].map((s) => (
                <Link
                  key={s}
                  href="/"
                  className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
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
            © {new Date().getFullYear()} Commerce OS. All rights reserved.
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
