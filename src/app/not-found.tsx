import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">404</p>
      <h1 className="font-serif text-5xl font-normal text-zinc-900 mb-4">
        Page Not Found
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
