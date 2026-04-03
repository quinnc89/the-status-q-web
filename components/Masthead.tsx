"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Masthead() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deep/95 backdrop-blur-lg border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-20">
        <a href="#" className="group flex items-center gap-3">
          <span className="font-display text-[15px] font-bold tracking-[0.02em] text-ivory">
            TheStatusQ
          </span>
          <span className="text-[9px] font-semibold tracking-[0.25em] uppercase px-2 py-1 border border-gold/40 text-gold group-hover:border-gold transition-colors duration-300">
            Studio
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium text-slate hover:text-ivory transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden lg:inline-flex text-[13px] font-semibold tracking-wide px-6 py-2.5 bg-gold text-deep hover:bg-gold-light transition-colors duration-300">
          Start a Project
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]" aria-label="Menu">
          <span className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-deep border-t border-white/[0.04] px-6 py-8 space-y-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[15px] font-medium text-silver hover:text-ivory transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block mt-6 text-center py-3.5 bg-gold text-deep text-[13px] font-semibold tracking-wide">
            Start a Project
          </a>
        </div>
      </div>
    </header>
  );
}
