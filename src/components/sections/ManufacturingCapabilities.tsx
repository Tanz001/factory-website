import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPABILITIES } from '../../data/mockData';
import { Cpu, Flame, Sliders, ShieldCheck, Truck, Compass, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: React.ElementType } = {
  Cpu,
  Flame,
  Sliders,
  ShieldCheck,
  Truck,
  DraftingCompass: Compass
};

export const ManufacturingCapabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.capability-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full py-28 bg-white text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-10 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        STANDARDS
      </div>

      {/* Radial Dot Pattern */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.025] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                05 // ENGINEERING EXCELLENCE
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight leading-[1.0]">
              MANUFACTURING CAPABILITIES
            </h2>
          </div>

          <p className="text-xs font-mono text-[#4B5563] max-w-sm uppercase">
            PRECISION GERMAN TOOLING, REAL-TIME SPECTROMETRY, AND IN-HOUSE ENVIRONMENTAL STRESS TESTING.
          </p>
        </div>

        {/* 6 High-Precision Engineering Benchmarks */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.iconName] || Cpu;
            return (
              <div
                key={cap.id}
                className="capability-card p-6 sm:p-8 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all duration-300 group flex flex-col justify-between relative shadow-xs"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white border border-black/10 text-[#FF5A1F] group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#4B5563] uppercase tracking-[0.25em] font-bold">
                      {cap.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-black uppercase text-[#111317] group-hover:text-[#FF5A1F] transition-colors">
                    {cap.title}
                  </h3>

                  <div className="my-3 inline-block px-2.5 py-1 bg-white border border-[#FF5A1F]/30 text-[11px] font-mono text-[#FF5A1F] font-black uppercase tracking-wider shadow-xs">
                    {cap.spec}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2 font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#4B5563] group-hover:text-[#111317]">
                  <span className="uppercase tracking-wider text-[11px] font-bold">FACTORY VERIFIED</span>
                  <ArrowRight className="w-4 h-4 text-[#FF5A1F] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
