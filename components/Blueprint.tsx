// process — steps wipe in from left via clipPath on scroll
const phases = [
  { num: "01", name: "Discovery", text: "One focused call. We learn your offer, your audience, your gaps. Then we build the plan." },
  { num: "02", name: "Strategy", text: "Before a word gets written or a pixel placed, you get a brief. Aligned to your goals. Locked to your brand." },
  { num: "03", name: "Creation", text: "We execute. Every draft goes through internal review before you see it. No rough cuts. No filler." },
  { num: "04", name: "Refinement", text: "Two rounds of revisions. Built in. We iterate until it\u2019s right \u2014 not until we\u2019re tired." },
  { num: "05", name: "Launch", text: "We don\u2019t disappear after delivery. We support the rollout, track the data, and optimize what\u2019s live." },
];

const timelines = [
  { label: "Email Sequence (5\u20138 emails)", time: "7\u201310 days" },
  { label: "VSL Script (long-form)", time: "10\u201314 days" },
  { label: "Website Design", time: "3\u20134 weeks" },
];

export default function Blueprint() {
  return (
    <section id="process" data-section-reveal className="py-28 lg:py-40 px-6 md:px-10 lg:px-16">
      <div data-section-inner className="max-w-[1400px] mx-auto">
        {/* header + timeline */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mb-20 lg:mb-28">
          <div className="lg:col-span-6 mb-10 lg:mb-0">
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-6" data-gold-drift="0.12">Process</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[0.95] tracking-tight">
              <span className="text-ivory">Five steps.</span><br />
              <span className="gold-shine italic font-normal">Zero guesswork.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <div className="w-full border border-white/[0.06] p-6 lg:p-8">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-5">Typical Timeline</p>
              <div className="space-y-4">
                {timelines.map((t) => (
                  <div key={t.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-silver">{t.label}</span>
                    <span className="text-[13px] font-medium text-ivory tabular-nums">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* steps — horizontal wipe via clipPath */}
        <div className="relative pl-8 lg:pl-12">
          <div className="absolute left-[7px] lg:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />

          <div className="space-y-14 lg:space-y-20">
            {phases.map((p) => (
              <div key={p.num} data-phase-step className="relative" style={{ clipPath: "inset(0 100% 0 0)" }}>
                {/* dot on the thread */}
                <div className="absolute -left-8 lg:-left-12 top-[6px] w-[15px] lg:w-[23px] flex justify-center">
                  <div className="w-[7px] h-[7px] rounded-full bg-gold ring-[3px] ring-deep" />
                </div>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-2">
                    <span className="font-display text-[11px] font-bold tracking-[0.3em] text-ash">{p.num}</span>
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-ivory mt-1">{p.name}</h3>
                  </div>
                  <div className="lg:col-span-6 lg:col-start-4 mt-2 lg:mt-0 flex items-center">
                    <p className="text-[15px] text-silver leading-[1.75]">{p.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
