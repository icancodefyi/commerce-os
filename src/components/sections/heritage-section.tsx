import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

const highlights = [
  { icon: "◇", label: "Hand-finished", body: "Every detail refined by hand." },
  { icon: "◈", label: "Rare Materials", body: "Sourced from heritage suppliers." },
  { icon: "◉", label: "Lifetime Quality", body: "Built to outlast generations." },
];

export function HeritageSection() {
  return (
    <section className="bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop"
                alt="Heritage craftsmanship"
                fill
                className="object-cover object-center"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right" delay={0.15}>
            <div className="max-w-md">
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-5">
                Our Heritage
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-7">
                Crafted with<br />Intention
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-10">
                Since 1987, every piece that leaves our atelier carries with it
                decades of accumulated knowledge, an obsession with materials,
                and a quiet refusal to compromise. We do not follow trends —
                we create objects that endure.
              </p>

              <div className="space-y-6 mb-10">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-start gap-4">
                    <span className="text-zinc-300 text-lg mt-0.5">{h.icon}</span>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-zinc-700 mb-0.5">
                        {h.label}
                      </p>
                      <p className="text-sm text-zinc-400">{h.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/"
                className="text-[11px] tracking-[0.18em] uppercase border-b border-zinc-800 pb-0.5 hover:text-zinc-500 hover:border-zinc-400 transition-colors"
              >
                Discover Our Story
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
