import { FadeIn } from "@/components/shared/fade-in";

export function NewsletterSection() {
  return (
    <section className="py-28 px-6">
      <FadeIn className="max-w-xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
          Stay Informed
        </p>
        <h2 className="font-serif text-4xl font-normal mb-4">
          The Edit
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-10">
          Occasional dispatches on new arrivals, private events, and the
          stories behind our pieces. Never noise — only signal.
        </p>

        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border border-zinc-200 px-5 py-4 text-sm placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent"
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-zinc-800 transition-colors shrink-0"
          >
            Subscribe
          </button>
        </form>

        <p className="text-[10px] text-zinc-300 mt-4 tracking-wide">
          No spam. Unsubscribe at any time.
        </p>
      </FadeIn>
    </section>
  );
}
