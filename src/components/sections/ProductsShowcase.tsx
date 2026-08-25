import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductsShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ: () => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onSelectProduct,
  onOpenRFQ,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);

    const cards = el.querySelectorAll('.product-slide');
    if (!cards.length) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const rect = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
      const dist = Math.abs(center - rect);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateNavState();
    el.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    return () => {
      el.removeEventListener('scroll', updateNavState);
      window.removeEventListener('resize', updateNavState);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.products-header > *'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.product-slide') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.75;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll('.product-slide')[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full py-24 sm:py-32 bg-[var(--bg)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-fine-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="products-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
              Product range
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[var(--ink)] leading-[0.95]">
              Engineered panel systems
            </h2>
            <p className="mt-3 text-[var(--muted)] text-sm sm:text-base max-w-lg">
              Scroll sideways to explore UPVC roofing, PIR cold storage, cladding, and doors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRFQ}
              className="px-5 py-2.5 text-sm font-semibold text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              Download CAD specs
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                className="w-11 h-11 flex items-center justify-center border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                className="w-11 h-11 flex items-center justify-center border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 sm:px-10 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        data-lenis-prevent
      >
        {PRODUCTS.map((product, index) => (
          <article
            key={product.id}
            className="product-slide group relative shrink-0 w-[85vw] sm:w-[420px] lg:w-[460px] snap-start bg-[var(--surface)] overflow-hidden border border-[var(--line)] hover:border-[var(--accent)]/40 transition-colors"
          >
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/15 to-transparent" />

              {product.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--accent)] text-white text-[11px] font-semibold uppercase tracking-wider">
                  Featured
                </span>
              )}

              <span className="absolute top-4 right-4 font-mono-tech text-[10px] uppercase tracking-wider text-white/80 bg-black/35 px-2 py-1 backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
              </span>

              <span className="absolute bottom-4 left-4 font-mono-tech text-[11px] text-white/85">
                {product.code} · {product.thickness}
              </span>
            </div>

            <div className="p-5 sm:p-6 flex flex-col min-h-[220px]">
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
                {product.category.replace('-', ' ')}
              </p>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[var(--ink)] leading-tight mb-3 group-hover:text-[var(--accent)] transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 mb-auto">
                {product.tagline}
              </p>

              <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3">
                <div className="text-xs">
                  <p className="text-[var(--muted)] uppercase tracking-wider mb-0.5">Fire</p>
                  <p className="font-semibold text-[var(--ink)] line-clamp-1">
                    {product.fireRating.split('/')[0].trim()}
                  </p>
                </div>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[var(--accent)] transition-colors"
                >
                  View specs
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* End CTA card */}
        <div className="product-slide shrink-0 w-[75vw] sm:w-[360px] snap-start bg-ink-mesh text-white p-8 sm:p-10 flex flex-col justify-center border border-white/10">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
            Need a custom spec?
          </p>
          <h3 className="font-heading text-3xl font-bold uppercase leading-tight mb-4">
            Get a factory quote
          </h3>
          <p className="text-white/60 text-sm mb-8">
            Tell us your area, thickness, and operating temperature — we’ll respond within 4 hours.
          </p>
          <button
            onClick={onOpenRFQ}
            className="inline-flex items-center justify-center gap-2 self-start bg-[var(--accent)] text-white px-6 py-3 text-sm font-semibold hover:bg-[var(--accent-deep)] transition-colors"
          >
            Request quote
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-8 flex items-center gap-2">
        {PRODUCTS.map((product, i) => (
          <button
            key={product.id}
            onClick={() => scrollToIndex(i)}
            className={`h-1 transition-all duration-300 ${
              i === activeIndex ? 'w-10 bg-[var(--accent)]' : 'w-4 bg-[var(--ink)]/20 hover:bg-[var(--ink)]/40'
            }`}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>
    </section>
  );
};
