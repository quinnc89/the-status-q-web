"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDirector() {
  useEffect(() => {
    // wait one tick for DOM to settle after hydration
    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────
      // 1. HERO HEADLINE — each word scrubs in on scroll
      // ─────────────────────────────────────────────────
      const heroWords = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
      if (heroWords.length) {
        gsap.set(heroWords, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: "[data-marquee]",
          start: "top top",
          end: "bottom 60%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            heroWords.forEach((word, i) => {
              const wordStart = i / heroWords.length;
              const wordEnd = (i + 1) / heroWords.length;
              const wordProgress = gsap.utils.clamp(
                0, 1,
                (progress - wordStart) / (wordEnd - wordStart)
              );
              gsap.set(word, {
                opacity: wordProgress,
                y: 60 * (1 - wordProgress),
              });
            });
          },
        });
      }

      // hero sub + cta — fade in at end of headline scrub
      gsap.fromTo("[data-hero-sub]",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: "[data-marquee]",
            start: "40% 50%",
            end: "70% 50%",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo("[data-hero-cta]",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: "[data-marquee]",
            start: "55% 50%",
            end: "80% 50%",
            scrub: 0.6,
          },
        }
      );

      // ─────────────────────────────────────────────────
      // 2. HERO PARALLAX — background shifts slower
      // ─────────────────────────────────────────────────
      gsap.to("[data-parallax-hero]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-marquee]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ─────────────────────────────────────────────────
      // 3. STATS — count up synced to scroll position
      // ─────────────────────────────────────────────────
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");
      if (counters.length) {
        ScrollTrigger.create({
          trigger: "[data-pulse]",
          start: "top 85%",
          end: "bottom 40%",
          scrub: 0.5,
          onUpdate: (self) => {
            counters.forEach((el) => {
              const target = parseFloat(el.dataset.counterTarget || "0");
              const decimals = parseInt(el.dataset.counterDecimals || "0", 10);
              const suffix = el.dataset.counterSuffix || "";
              const current = target * self.progress;
              el.textContent = current.toFixed(decimals) + suffix;
            });
          },
        });
      }

      // stat labels fade up staggered
      gsap.fromTo(
        gsap.utils.toArray("[data-stat-label]"),
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-pulse]",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.4,
          },
        }
      );

      // ─────────────────────────────────────────────────
      // 4. SECTION REVEALS — each section fades + pins briefly
      // ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-section-reveal]").forEach((section) => {
        const inner = section.querySelector("[data-section-inner]");
        if (!inner) return;

        gsap.fromTo(inner,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );
      });

      // ─────────────────────────────────────────────────
      // 5. SERVICE CARDS — scale + opacity tied to scroll
      // ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-service-block]").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.92, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });

      // ─────────────────────────────────────────────────
      // 6. PROCESS — horizontal wipe-in sequentially
      // ─────────────────────────────────────────────────
      const steps = gsap.utils.toArray<HTMLElement>("[data-phase-step]");
      if (steps.length) {
        steps.forEach((step, i) => {
          gsap.fromTo(step,
            { opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)",
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
                end: "top 50%",
                scrub: 0.5,
              },
            }
          );
        });
      }

      // ─────────────────────────────────────────────────
      // 7. GOLD ACCENTS — parallax shift on scroll
      // ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-gold-drift]").forEach((el) => {
        const speed = parseFloat(el.dataset.goldDrift || "0.3");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ─────────────────────────────────────────────────
      // TESTIMONIALS — fade in on scroll
      // ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-voice]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      });

      // CONTACT — form slides up tied to scroll
      gsap.fromTo("[data-engage-left]",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: "[data-engage]",
            start: "top 75%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
      gsap.fromTo("[data-engage-right]",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: "[data-engage]",
            start: "top 70%",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      );

      // RESULTS rows — stagger cascade
      gsap.utils.toArray<HTMLElement>("[data-proof-row]").forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 65%",
              scrub: 0.3,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
