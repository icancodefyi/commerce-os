"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "1987", label: "Established" },
  { value: "2,400+", label: "Pieces Crafted" },
  { value: "18", label: "Global Boutiques" },
  { value: "40k+", label: "Happy Customers" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  return (
    <section className="bg-[#faf9f7] min-h-[88vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-12 md:py-0">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — content ── */}
          <div className="flex flex-col justify-center order-2 md:order-1 py-8 md:py-16">

            {/* Announcement pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="inline-flex items-center gap-2 mb-7 self-start"
            >
              <span className="w-5 h-px bg-zinc-400" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-zinc-500">
                Spring Summer 2025
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-normal text-zinc-900 leading-[1.15] mb-6"
            >
              Crafted for<br />
              Everyday<br />
              <span className="italic text-zinc-500">Luxury</span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
              className="text-sm text-zinc-500 leading-relaxed mb-9 max-w-[340px]"
            >
              Curated pieces crafted with timeless design, elevated materials,
              and quiet sophistication — made to be worn and remembered.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Link
                href="/products"
                className="bg-zinc-900 text-white px-7 py-3.5 text-[11px] tracking-[0.16em] uppercase hover:bg-zinc-700 transition-colors duration-300"
              >
                Explore Collection
              </Link>
              <Link
                href="/"
                className="border border-zinc-300 text-zinc-700 px-7 py-3.5 text-[11px] tracking-[0.16em] uppercase hover:border-zinc-600 hover:text-zinc-900 transition-colors duration-300"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 pt-8 border-t border-zinc-200"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-xl text-zinc-800">{s.value}</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase text-zinc-400 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="relative order-1 md:order-2"
          >
            {/* Warm background blob */}
            <div className="absolute -inset-4 bg-stone-100 rounded-sm -z-10" />

            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <Image
                src="https://palmonas.com/cdn/shop/files/web_2x-100.webp?crop=center&height=794&v=1778121317&width=2000"
                alt="Crafted for everyday luxury"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Very soft warm vignette — preserves image richness */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm"
            >
              <p className="text-[10px] tracking-[0.18em] uppercase text-zinc-400 mb-0.5">
                New Arrival
              </p>
              <p className="font-serif text-sm text-zinc-800">
                Summer Edit 2025
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
