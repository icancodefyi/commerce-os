import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";

const benefits = [
  "Early access to new collections",
  "Complimentary alterations & care",
  "Dedicated personal stylist",
  "Exclusive member-only pieces",
];

export function MembershipSection() {
  return (
    <section className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-5">
                Private Access
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-6">
                The Inner<br />
                <span className="text-amber-300/80">Circle</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-sm">
                An invitation to experience Commerce OS beyond the storefront.
                Reserved for those who seek more than a transaction.
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="w-1 h-1 rounded-full bg-amber-300/70 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/"
                className="inline-block border border-amber-300/40 text-amber-300/80 px-9 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-amber-300/10 transition-colors duration-300"
              >
                Request Membership
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="aspect-[4/5] bg-zinc-800 w-full" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
