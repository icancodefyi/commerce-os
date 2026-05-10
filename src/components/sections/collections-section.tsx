import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

const collections = [
  {
    label: "Leather Goods",
    description: "Structured silhouettes, aged to perfection.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Fine Jewellery",
    description: "Minimal forms, maximum presence.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Couture",
    description: "Garments that carry their own gravity.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Seasonal Edit",
    description: "A curated selection for the discerning few.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop",
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
              <div className={`${col.aspect} relative w-full overflow-hidden`}>
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-serif text-2xl text-white font-normal mb-1">{col.label}</p>
                <p className="text-xs text-white/70 tracking-wide">{col.description}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
