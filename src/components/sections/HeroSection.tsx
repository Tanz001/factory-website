import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGES } from '../../data/mockData';
import { ArrowRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenRFQ: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRFQ }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgStackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const bgStack = bgStackRef.current;
    const content = contentRef.current;
    if (!section || !bgStack || !content) return;

    let crossfadeInterval: ReturnType<typeof setInterval> | null = null;

    const ctx = gsap.context(() => {
      const images = bgStack.querySelectorAll('.hero-bg-img');
      gsap.set(images, { opacity: 0, scale: 1.06 });
      gsap.set(images[0], { opacity: 1, scale: 1 });

      let current = 0;
      crossfadeInterval = setInterval(() => {
        const next = (current + 1) % images.length;
        gsap.set(images[next], { scale: 1.06, zIndex: 2 });
        gsap.set(images[current], { zIndex: 1 });
        gsap.to(images[next], { opacity: 1, duration: 1.6, ease: 'power2.inOut' });
        gsap.to(images[next], { scale: 1, duration: 8, ease: 'none' });
        gsap.to(images[current], {
          opacity: 0,
          duration: 1.6,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(images[current], { zIndex: 0 }),
        });
        current = next;
        setActiveIndex(next);
      }, 6000);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(bgStack, {
            yPercent: self.progress * 20,
            scale: 1 + self.progress * 0.08,
          });
          gsap.set(content, {
            yPercent: self.progress * 40,
            opacity: Math.max(0, 1 - self.progress * 1.4),
          });
        },
      });
    }, section);

    return () => {
      if (crossfadeInterval) clearInterval(crossfadeInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden flex items-end"
    >
      {/* Full-bleed image plane */}
      <div ref={bgStackRef} className="absolute inset-0 w-full h-full">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img.code}
            className="hero-bg-img absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${img.url})`,
              zIndex: idx === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09111A] via-[#09111A]/55 to-[#09111A]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#09111A]/70 via-transparent to-transparent" />
      <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" />

      {/* Content — brand first, one headline, one line, CTAs */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20 pt-32"
      >
        <p className="animate-fade-up font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-extrabold uppercase tracking-tight text-white leading-[0.9] mb-3 sm:mb-4">
          SN Star Engineering
        </p>

        <h1 className="animate-fade-up animate-fade-up-delay-1 font-heading text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-wide text-white/95 max-w-3xl leading-[1.05] mb-5 sm:mb-6">
          UPVC roofing sheets, cold panels & industrial shades
        </h1>

        <p className="animate-fade-up animate-fade-up-delay-2 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8 sm:mb-10">
          SN Star Engineering manufactures corrugated UPVC roofing sheets, insulated cold-storage
          panels, cladding, and shade systems for factories, warehouses, and industrial sites.
        </p>

        <div className="animate-fade-up animate-fade-up-delay-3 flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
          <a
            href="#products"
            className="inline-flex items-center gap-2.5 bg-[var(--accent)] text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[var(--accent-deep)] transition-colors"
          >
            View products
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenRFQ}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all"
          >
            Request a quote
          </button>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-4 flex items-center justify-between border-t border-white/15 pt-5">
          <div className="flex items-center gap-3">
            {HERO_IMAGES.map((_, i) => (
              <span
                key={i}
                className={`h-0.5 transition-all duration-500 ${
                  i === activeIndex ? 'w-10 bg-[var(--accent)]' : 'w-5 bg-white/30'
                }`}
              />
            ))}
            <span className="ml-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/50">
              {HERO_IMAGES[activeIndex].title}
            </span>
          </div>
          <a
            href="#about"
            className="hidden sm:inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/55 hover:text-white transition-colors"
          >
            Scroll
            <ArrowDown className="w-3.5 h-3.5 animate-[soft-pulse_2s_ease-in-out_infinite]" />
          </a>
        </div>
      </div>
    </section>
  );
};
