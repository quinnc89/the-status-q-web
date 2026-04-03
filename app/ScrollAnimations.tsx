'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero headline: word scrub tied to scroll position ---
      const heroH1 = document.querySelector('[data-anim="hero-headline"]');
      if (heroH1) {
        const text = heroH1.textContent || '';
        const words = text.split(' ');
        heroH1.innerHTML = words
          .map((w) => `<span class="inline-block opacity-0 translate-y-4">${w}&nbsp;</span>`)
          .join('');

        gsap.to(heroH1.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: heroH1,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        });
      }

      // --- Hero subtitle fade-in ---
      const heroSub = document.querySelector('[data-anim="hero-subtitle"]');
      if (heroSub) {
        gsap.from(heroSub, {
          opacity: 0,
          y: 30,
          scrollTrigger: {
            trigger: heroSub,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        });
      }

      // --- Parallax on hero section background ---
      const heroSection = document.querySelector('[data-anim="hero-section"]');
      if (heroSection) {
        gsap.to(heroSection, {
          backgroundPositionY: '50%',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // --- Gold/teal accent line: parallax drift ---
      const accentLine = document.querySelector('[data-anim="accent-line"]');
      if (accentLine) {
        gsap.from(accentLine, {
          scaleX: 0,
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: accentLine,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        });
        // subtle parallax drift
        gsap.to(accentLine, {
          y: -8,
          scrollTrigger: {
            trigger: accentLine,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }

      // --- Service cards: fade + scale, staggered ---
      const cards = document.querySelectorAll('[data-anim="service-card"]');
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          scale: 0.92,
          y: 40,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          },
        });
      }

      // --- All sections: subtle fade-up on scroll entry ---
      const sections = document.querySelectorAll('[data-anim="section-fade"]');
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // renders nothing — pure animation side-effect
  return null;
}
