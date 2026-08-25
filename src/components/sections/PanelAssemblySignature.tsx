import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONVEYOR_STAGES } from '../../data/mockData';

gsap.registerPlugin(ScrollTrigger);

export const PanelAssemblySignature: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.querySelectorAll('.process-step'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: list, start: 'top 78%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="relative w-full py-24 sm:py-32 bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
              Production flow
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase text-[var(--ink)] leading-[0.95] mb-5">
              From resin to sealed panel
            </h2>
            <p className="text-[var(--muted)] text-base leading-relaxed mb-8 max-w-md">
              Every sheet moves through spectroscopy, co-extrusion, PIR injection,
              CNC joint milling, and full QA before dispatch.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--elevated)] border border-[var(--line)]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85"
                alt="Industrial panel and sheet production line"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/45 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/80">
                  Production line · Extrusion to QA
                </p>
              </div>
            </div>
          </div>

          <div ref={listRef} className="lg:col-span-7 space-y-0">
            {CONVEYOR_STAGES.map((stage, i) => (
              <div
                key={stage.step}
                className="process-step group flex gap-5 sm:gap-8 py-6 sm:py-7 border-b border-[var(--line-strong)] first:border-t"
              >
                <span className="font-heading text-3xl sm:text-4xl font-bold text-[var(--accent)]/40 group-hover:text-[var(--accent)] transition-colors w-12 shrink-0">
                  {stage.step}
                </span>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[var(--ink)]">
                      {stage.title}
                    </h3>
                    <span className="font-mono-tech text-[11px] text-[var(--accent)] uppercase tracking-wider">
                      {stage.metric}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-lg">
                    {stage.detail}
                  </p>
                </div>
                {i < CONVEYOR_STAGES.length - 1 && (
                  <div className="hidden sm:block w-px self-stretch bg-[var(--line)] ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
