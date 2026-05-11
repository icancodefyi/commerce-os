"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">Error</p>
      <h1 className="font-serif text-5xl font-normal text-zinc-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-xs">
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="bg-black text-white px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-zinc-300 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:border-zinc-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
