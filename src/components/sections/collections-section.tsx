import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";

const collections = [
  {
    label: "Leather Goods",
    description: "Structured silhouettes, aged to perfection.",
    bg: "bg-stone-300",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Fine Jewellery",
    description: "Minimal forms, maximum presence.",
    bg: "bg-zinc-300",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Couture",
    description: "Garments that carry their own gravity.",
    bg: "bg-neutral-300",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Seasonal Edit",
    description: "A curated selection for the discerning few.",
    bg: "bg-stone-200",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
];

export function CollectionsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <FadeIn className="mb-14">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-3">
          Explore
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-normal">
          Collections
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <FadeIn key={col.label} delay={i * 0.08} className={col.span}>
            <Link href="/products" className="group block relative overflow-hidden">
              <div
                className={`${col.aspect} ${col.bg} w-full overflow-hidden`}
              >
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out bg-inherit" />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-serif text-2xl text-white font-normal mb-1">
                  {col.label}
                </p>
                <p className="text-xs text-white/70 tracking-wide">
                  {col.description}
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
