"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "1987", label: "Est." },
  { value: "2,400+", label: "Pieces Crafted" },
  { value: "18", label: "Global Boutiques" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
        alt="Hero"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-white/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-5"
        >
          New Seasonal Collection — 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white leading-[1.05] mb-8 max-w-3xl"
        >
          The Art of<br />Timeless<br />Elegance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-white/70 mb-10 max-w-sm leading-relaxed"
        >
          Each piece is a quiet declaration — crafted for those who understand
          that true luxury whispers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/products"
            className="bg-white text-black px-9 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-zinc-100 transition-colors duration-300"
          >
            Explore Collection
          </Link>
          <Link
            href="/"
            className="border border-white text-white px-9 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Our Heritage
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-12 mt-16 pt-8 border-t border-white/20"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl font-normal text-white">{stat.value}</p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
