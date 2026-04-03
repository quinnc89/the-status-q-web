// results — each row animates in tied to scroll
const proof = [
  { val: "+214%", label: "Open Rate vs Industry", note: "Average across all client campaigns" },
  { val: "4.2\u00D7", label: "Revenue Lift", note: "Avg. lift within 90 days of launch" },
  { val: "74%", label: "VSL View Rate", note: "Avg. completion on long-form scripts" },
  { val: "130+", label: "Projects Delivered", note: "Across 6 industries" },
  { val: "91%", label: "Client Retention", note: "Year-over-year" },
  { val: "3.8\u00D7", label: "Avg. ROAS", note: "On email campaigns" },
  { val: "22 days", label: "Avg. Launch Time", note: "From brief to live" },
  { val: "$2.10+", label: "Revenue Per Email", note: "Industry avg: $0.48" },
  { val: "Top 5%", label: "VSL Completion", note: "vs. platform benchmarks" },
];

export default function Ledger() {
  return (
    <section id="results" data-section-reveal className="py-28 lg:py-40 px-6 md:px-10 lg:px-16 bg-surface">
      <div data-section-inner className="max-w-[1400px] mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mb-20 lg:mb-28">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-6" data-gold-drift="0.12">Results</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[0.95] tracking-tight">
              <span className="text-ivory">Proof,</span><br />
              <span className="gold-shine italic font-normal">not promises.</span>
            </h2>
          </div>
        </div>

        <div className="space-y-0">
          {proof.map((p, i) => (
            <div key={p.label}>
              <div data-proof-row className="lg:grid lg:grid-cols-12 lg:gap-8 py-6 lg:py-8 items-baseline">
                <div className="lg:col-span-3">
                  <span className="font-display text-3xl lg:text-4xl font-bold text-gold">{p.val}</span>
                </div>
                <div className="lg:col-span-4 mt-1 lg:mt-0">
                  <span className="text-[15px] font-medium text-ivory">{p.label}</span>
                </div>
                <div className="lg:col-span-5 mt-1 lg:mt-0">
                  <span className="text-[13px] text-slate">{p.note}</span>
                </div>
              </div>
              {i < proof.length - 1 && <div className="h-px bg-white/[0.04]" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
