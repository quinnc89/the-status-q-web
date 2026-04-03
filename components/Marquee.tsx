// hero — the type IS the design, scroll-linked word reveal via data attrs
const words = ["Conversion", "is", "a", "craft."];

export default function Marquee() {
  return (
    <section data-marquee className="relative min-h-[200vh]">
      {/* parallax background layer — moves slower than content */}
      <div data-parallax-hero className="absolute inset-0 bg-deep" />

      {/* sticky content — stays pinned while words scrub in */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          {/* studio tag */}
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-12 lg:mb-16" data-gold-drift="0.15">
            TheStatusQ &mdash; Premium Studio
          </p>

          {/* headline — each word gets a data attr for the scroll controller */}
          <h1 className="font-display text-[clamp(3rem,8vw,9rem)] font-bold leading-[0.92] tracking-[-0.03em] max-w-[900px]">
            {words.map((w, i) => (
              <span key={i}>
                {i === 2 && <br />}
                <span
                  data-hero-word
                  className={`inline-block mr-[0.22em] ${
                    w === "craft."
                      ? "gold-shine italic font-normal"
                      : "text-ivory"
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>

          {/* sub line */}
          <p data-hero-sub className="mt-8 lg:mt-12 max-w-[520px] text-[16px] lg:text-[18px] leading-[1.7] text-silver opacity-0">
            We build email sequences, VSL scripts, and websites for brands that
            measure every word. No filler. No guesswork. Just precision
            that performs.
          </p>

          {/* cta */}
          <div data-hero-cta className="mt-12 lg:mt-16 opacity-0">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-[14px] font-semibold tracking-wide px-8 py-4 bg-gold text-deep hover:bg-gold-light transition-all duration-300"
            >
              Start a Project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ash">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
