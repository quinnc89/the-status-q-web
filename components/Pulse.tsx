// stats strip — counters tied to scroll via data attributes
const figures = [
  { target: 4.2, suffix: "\u00D7", decimals: 1, label: "Revenue Lift" },
  { target: 68, suffix: "%", decimals: 0, label: "Open Rate" },
  { target: 91, suffix: "%", decimals: 0, label: "Retention" },
  { target: 130, suffix: "+", decimals: 0, label: "Projects" },
];

export default function Pulse() {
  return (
    <section data-pulse className="border-y border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-10 lg:py-12">
        <div className="flex flex-wrap justify-between items-center gap-y-6">
          {figures.map((f, i) => (
            <div key={f.label} className="flex items-center gap-6">
              <div className="text-center min-w-[80px]">
                {/* the counter element — scroll controller reads these data attrs */}
                <span
                  data-counter
                  data-counter-target={f.target}
                  data-counter-decimals={f.decimals}
                  data-counter-suffix={f.suffix}
                  className="font-display text-2xl lg:text-3xl font-bold text-gold tabular-nums"
                >
                  0{f.suffix}
                </span>
                <p data-stat-label className="text-[11px] tracking-[0.12em] uppercase text-slate mt-1 opacity-0">
                  {f.label}
                </p>
              </div>
              {i < figures.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-white/[0.06]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
