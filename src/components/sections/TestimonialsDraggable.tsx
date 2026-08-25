import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const POLAROID_CAPTIONS = ['Zero rust', 'Air-tight', 'Zero upkeep', 'Faster build'];

const HIGHLIGHTS: Record<string, string[]> = {
  'test-01': ['zero rust', 'zero chalking', '7.5°C'],
  'test-02': ['thermal integrity is non-negotiable', 'zero thermal bridge losses'],
  'test-03': ['dropped to zero', 'plant floor safety'],
  'test-04': ['35% faster', 'record time'],
};

function renderQuote(quote: string, highlights: string[]) {
  if (!highlights.length) return quote;

  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');
  const parts = quote.split(pattern);

  return parts.map((part, i) => {
    const isHighlight = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase()
    );
    if (isHighlight) {
      return (
        <span
          key={i}
          className="relative inline whitespace-pre-wrap"
          style={{
            backgroundImage:
              'linear-gradient(transparent 70%, rgba(184, 149, 108, 0.55) 70%)',
          }}
        >
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const TestimonialsDraggable: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const active = TESTIMONIALS[activeIndex];
  const caption = POLAROID_CAPTIONS[activeIndex % POLAROID_CAPTIONS.length];
  const highlights = HIGHLIGHTS[active.id] ?? [];

  // Stack order: active on top, then next two behind
  const stack = [0, 1, 2].map((offset) => {
    const idx = (activeIndex + offset) % total;
    return { ...TESTIMONIALS[idx], stackIndex: offset };
  });

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((p) => (p + 1) % total);
    }, 7000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setActiveIndex((p) => (p - 1 + total) % total);
  const next = () => setActiveIndex((p) => (p + 1) % total);

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 sm:py-28 lg:py-32 overflow-hidden bg-[#0A1218]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Atmosphere: dots + soft flares */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-[18%] left-[12%] w-40 h-40 rounded-full bg-[var(--accent)]/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[18%] w-52 h-52 rounded-full bg-[var(--brass)]/15 blur-[90px] pointer-events-none" />
      <div className="absolute top-[55%] left-[45%] w-24 h-24 rounded-full bg-[var(--accent)]/25 blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[520px]">
          {/* LEFT — heading + circular nav */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <p className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
              Field voices
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold uppercase text-white leading-[0.92] mb-10">
              Satisfied
              <br />
              clients
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors shadow-lg"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-white/35">
              {String(activeIndex + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
            </p>
          </div>

          {/* CENTER — stacked polaroids */}
          <div className="lg:col-span-4 flex items-center justify-center py-6 lg:py-0">
            <div className="relative w-[240px] sm:w-[280px] h-[340px] sm:h-[390px]">
              {stack
                .slice()
                .reverse()
                .map((item) => {
                  const i = item.stackIndex;
                  const rotations = [ -3, 8, -10 ];
                  const offsets = [
                    { x: 0, y: 0 },
                    { x: 28, y: 18 },
                    { x: -22, y: 28 },
                  ];
                  const isTop = i === 0;

                  return (
                    <div
                      key={`${item.id}-${activeIndex}-${i}`}
                      className="absolute left-1/2 top-0 origin-center transition-all duration-500 ease-out"
                      style={{
                        width: '86%',
                        zIndex: 10 - i,
                        transform: `translateX(calc(-50% + ${offsets[i].x}px)) translateY(${offsets[i].y}px) rotate(${rotations[i]}deg) scale(${isTop ? 1 : 0.94 - i * 0.02})`,
                        opacity: isTop ? 1 : 0.55 - i * 0.1,
                      }}
                    >
                      <div
                        className={`bg-[#F4F1EC] p-3 pb-10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${
                          isTop ? 'ring-1 ring-white/10' : ''
                        }`}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd]">
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isTop && (
                          <p className="font-script text-3xl sm:text-4xl text-[#2A1F18] text-center mt-3 leading-none relative">
                            {caption}
                            <span className="absolute -top-1 right-[28%] w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT — vertical name + quote + stars */}
          <div className="lg:col-span-5 flex gap-5 sm:gap-7 items-start lg:items-center">
            <div
              className="hidden sm:flex shrink-0 items-center justify-center"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              <span className="font-heading text-sm sm:text-base font-bold uppercase tracking-[0.35em] text-[var(--accent)] whitespace-nowrap">
                {active.author.replace(/^Eng\.\s*/, '')}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="sm:hidden font-heading text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)] mb-4">
                {active.author}
              </p>

              <p
                key={active.id}
                className="text-white/90 text-base sm:text-lg leading-relaxed font-normal"
              >
                {renderQuote(active.quote, highlights)}
              </p>

              <div className="mt-5 text-sm text-white/45">
                {active.role} · {active.company}
              </div>

              <div className="mt-8 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--accent)]/90 shadow-[0_0_28px_rgba(20,138,128,0.45)]">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
