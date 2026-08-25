import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPABILITIES } from '../../data/mockData';
import { Cpu, Flame, Sliders, ShieldCheck, Truck, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: React.ElementType } = {
  Cpu,
  Flame,
  Sliders,
  ShieldCheck,
  Truck,
  DraftingCompass: Compass,
};

export const ManufacturingCapabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll('.capability-card'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full py-24 sm:py-32 bg-ink-mesh text-white overflow-hidden"
    >
      <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="max-w-2xl mb-14">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
            Manufacturing
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] mb-4">
            Plant capabilities
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            German tooling, live spectrometry, and in-house environmental stress testing —
            built into every production run.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.iconName] || Cpu;
            return (
              <div
                key={cap.id}
                className="capability-card group p-6 sm:p-7 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--accent)]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 flex items-center justify-center bg-[var(--accent)]/15 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/40 uppercase tracking-wider">
                    {cap.id}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold uppercase mb-2 leading-tight">
                  {cap.title}
                </h3>
                <p className="inline-block mb-3 font-mono-tech text-[11px] text-[var(--brass)] uppercase tracking-wider">
                  {cap.spec}
                </p>
                <p className="text-sm text-white/55 leading-relaxed">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
