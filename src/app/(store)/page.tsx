import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] bg-zinc-100 flex items-end">
        <div className="absolute inset-0 bg-zinc-200" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4">
            New Collection
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-normal text-zinc-900 leading-none mb-8 max-w-2xl">
            The Art of Timeless Elegance
          </h1>
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              href="/products"
              className="border border-zinc-900 px-8 py-4 text-xs tracking-widest uppercase hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial strip */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { label: "Craftsmanship", body: "Every piece is made with intention, precision, and care." },
            { label: "Materials", body: "We source only the finest materials from around the world." },
            { label: "Heritage", body: "Rooted in tradition, designed for the modern world." },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">{item.label}</p>
              <p className="font-serif text-xl font-normal text-zinc-700 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 text-white py-24 px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">Exclusive Access</p>
        <h2 className="font-serif text-4xl md:text-5xl font-normal mb-8">
          Curated for the Discerning Few
        </h2>
        <Link
          href="/products"
          className="inline-block border border-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-white hover:text-zinc-900 transition-colors"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}
