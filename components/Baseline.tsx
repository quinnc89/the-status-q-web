// footer — minimal, clean
const nav = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Baseline() {
  return (
    <footer className="border-t border-white/[0.04] py-16 lg:py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="lg:flex lg:items-start lg:justify-between mb-16">
          <div className="mb-8 lg:mb-0">
            <p className="font-display text-[15px] font-bold tracking-[0.02em] text-ivory">TheStatusQ</p>
            <p className="text-[13px] text-slate mt-1">Premium Copywriting &amp; Design Studio</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] text-slate hover:text-ivory transition-colors duration-300">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="edge-fade mb-8" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[11px] text-ash tracking-wide">&copy; {new Date().getFullYear()} TheStatusQ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-ash hover:text-slate transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-[11px] text-ash hover:text-slate transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
