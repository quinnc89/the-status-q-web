// testimonials — each quote fades in tied to scroll position
const voices = [
  { quote: "The email sequence they wrote generated $140k in 7 days. Every word had a purpose.", who: "Marcus T.", title: "Founder, HealthTech SaaS" },
  { quote: "VSL completion went from 34% to 71%. The script didn\u2019t feel like a script \u2014 it felt like a conversation.", who: "Danielle K.", title: "CEO, Online Education" },
  { quote: "They built a site that converted at 11.4% on cold traffic. First week.", who: "Ryan O.", title: "CMO, E-Commerce" },
];

export default function Acclaim() {
  return (
    <section id="testimonials" data-section-reveal className="py-28 lg:py-40 px-6 md:px-10 lg:px-16 bg-surface">
      <div data-section-inner className="max-w-[1400px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-16 lg:mb-24" data-gold-drift="0.1">Clients</p>

        <div className="space-y-24 lg:space-y-32">
          {voices.map((v, i) => (
            <div key={v.who} data-voice>
              <blockquote>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] font-medium italic leading-[1.15] tracking-[-0.01em] text-ivory max-w-[1100px]">
                  &ldquo;{v.quote}&rdquo;
                </p>
              </blockquote>
              <div className="flex items-center gap-4 mt-8 lg:mt-10">
                <div className="w-6 h-px bg-gold" />
                <p className="text-[13px]">
                  <span className="font-medium text-gold">{v.who}</span>
                  <span className="text-slate">&ensp;&middot;&ensp;{v.title}</span>
                </p>
              </div>
              {i < voices.length - 1 && <div className="edge-fade mt-24 lg:mt-32" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
