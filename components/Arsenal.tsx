// services section — each block scales up tied to scroll depth
const disciplines = [
  {
    num: "01", title: "Email Copy", tagline: "Revenue-Generating Sequences",
    body: "We write campaigns that nurture, convert, and retain. Welcome flows. Launch sequences. Abandoned carts. Every email has a job \u2014 and we don\u2019t send one that can\u2019t do it.",
    stats: [{ val: "52\u201368%", label: "Open Rate" }, { val: "+3.4\u00D7", label: "CTR vs Industry" }, { val: "$2.10+", label: "Rev / Email" }],
    items: ["Welcome & Onboarding Sequences", "Sales & Launch Campaigns", "Abandoned Cart & Winback", "Newsletter Strategy"],
  },
  {
    num: "02", title: "VSL Scripts", tagline: "Scripts That Sell Without Sounding Like It",
    body: "Long-form, short-form, webinar scripts \u2014 built on buyer psychology and structured for attention. Your viewer stays. Your offer lands.",
    stats: [{ val: "74%", label: "View Rate" }, { val: "+180%", label: "Conv. Lift" }, { val: "31 days", label: "Script-to-Close" }],
    items: ["Long-Form VSL Scripts", "Short-Form Ad Scripts", "Webinar & Funnel Scripts", "Hook & CTA Engineering"],
  },
  {
    num: "03", title: "Website Design", tagline: "Built for Performance, Not Applause",
    body: "Consumer psychology meets brand strategy. We design websites that convert cold traffic \u2014 not just impress your designer friends.",
    stats: [{ val: "+220%", label: "CR Lift" }, { val: "\u221238%", label: "Bounce Drop" }, { val: "3\u20134 wks", label: "To Launch" }],
    items: ["Landing & Sales Pages", "Full Brand Websites", "Funnel Architecture", "CRO Audits & Rebuilds"],
  },
];

export default function Arsenal() {
  return (
    <section id="services" data-section-reveal className="py-28 lg:py-40 px-6 md:px-10 lg:px-16">
      <div data-section-inner className="max-w-[1400px] mx-auto">
        {/* header */}
        <div className="mb-20 lg:mb-28">
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-6" data-gold-drift="0.12">
            Capabilities
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[0.95] tracking-tight">
            <span className="text-ivory">Three disciplines.</span><br />
            <span className="gold-shine italic font-normal">One standard.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] text-silver leading-relaxed">
            We don&apos;t offer packages. We offer precision.
          </p>
        </div>

        {/* service blocks — scale + opacity via scroll */}
        <div className="space-y-0">
          {disciplines.map((d) => (
            <div key={d.num}>
              <div className="edge-fade-gold mb-12 lg:mb-16" />
              <div data-service-block className="lg:grid lg:grid-cols-12 lg:gap-8 mb-12 lg:mb-16">
                <div className="lg:col-span-5 mb-8 lg:mb-0">
                  <span className="font-display text-[11px] font-bold tracking-[0.3em] text-ash">{d.num}</span>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mt-3 leading-[1]">{d.title}</h3>
                  <p className="text-[14px] font-medium text-gold mt-3 tracking-wide" data-gold-drift="0.08">{d.tagline}</p>
                  <div className="flex gap-6 mt-8">
                    {d.stats.map((s) => (
                      <div key={s.label}>
                        <span className="font-display text-lg font-bold text-gold">{s.val}</span>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-slate mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-[15px] lg:text-[16px] text-silver leading-[1.75] mb-8">{d.body}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {d.items.map((item) => (
                      <span key={item} className="text-[12px] text-slate tracking-wide before:content-['\25C6\00a0'] before:text-gold/50 before:text-[8px]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
