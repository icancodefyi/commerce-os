"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { brand } from "@/config/brand";

const ease = [0.25, 0.1, 0.25, 1] as const;

const tickerItems = brand.tickerItems;

export function HeroSection() {
  return (
    <div className="w-full">
      {/* ── Full-bleed image with overlaid content ── */}
      <section className="relative w-full h-[78vh] min-h-[520px] overflow-hidden">
        {/* Background image */}
        <video
          src="https://palmonas.com/cdn/shop/videos/c/vp/f81ab4ed2ae540f18a8ca028d4a3789c/f81ab4ed2ae540f18a8ca028d4a3789c.HD-720p-4.5Mbps-65417493.mp4?v=0"
          className="object-cover object-center"
          autoPlay
          loop
          muted
        />

        {/* Very light left-side fade so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

        {/* Overlaid content — left aligned */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-sm">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="text-[10px] tracking-[0.28em] uppercase text-white/70 mb-4"
              >
                {brand.name}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
                className="font-serif text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-5"
              >
                New<br />
                <span className="italic">Seasonal</span><br />
                Collection
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="text-sm text-white/75 leading-relaxed mb-8 max-w-[260px]"
              >
                Timeless pieces crafted with elevated materials and quiet sophistication.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.48, ease }}
              >
                <Link
                  href="/products"
                  className="inline-block bg-white text-zinc-900 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-100 transition-colors duration-300"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promo banner strip ── */}
      <div className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 divide-x divide-zinc-700">
          <div className="px-8 py-5 text-center">
            <p className="text-sm md:text-base font-medium tracking-wide">
              BUY 3 AT{" "}
              <span className="font-bold text-lg md:text-xl">₹2999</span>{" "}
              <span className="text-zinc-400 text-xs tracking-widest uppercase ml-1">
                Use code:{" "}
              </span>
              <span className="font-bold tracking-widest">SAVE3</span>
            </p>
          </div>
          <div className="px-8 py-5 text-center">
            <p className="text-sm md:text-base font-medium tracking-wide">
              BUY 4 AT{" "}
              <span className="font-bold text-lg md:text-xl">₹3499</span>{" "}
              <span className="text-zinc-400 text-xs tracking-widest uppercase ml-1">
                Use code:{" "}
              </span>
              <span className="font-bold tracking-widest">SAVE4</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrolling ticker ── */}
      <div className="bg-zinc-800 text-white py-2.5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.18em] uppercase text-zinc-300 mx-8"
            >
              {item}
              <span className="mx-8 text-zinc-600">|</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
