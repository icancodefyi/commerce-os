import { FadeIn } from "@/components/shared/fade-in";

const testimonials = [
  {
    quote:
      "There is a stillness to their work — a confidence that comes only from mastery. I have never worn anything that felt so completely itself.",
    author: "Priya M.",
    title: "Architect, Mumbai",
  },
  {
    quote:
      "The leather bag I purchased three years ago has only grown more beautiful. That is the mark of something truly made.",
    author: "Arjun S.",
    title: "Creative Director, Delhi",
  },
  {
    quote:
      "I stopped buying things. I started acquiring pieces. Commerce OS was where that shift began.",
    author: "Leila K.",
    title: "Collector, Bangalore",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-stone-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-3">
            Voices
          </p>
          <h2 className="font-serif text-4xl font-normal">
            What They Say
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.12}>
              <div className="flex flex-col h-full">
                <p className="font-serif text-3xl text-zinc-200 mb-4 leading-none">"</p>
                <p className="text-sm text-zinc-600 leading-relaxed flex-1 mb-8">
                  {t.quote}
                </p>
                <div>
                  <p className="text-xs font-medium text-zinc-800">{t.author}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
