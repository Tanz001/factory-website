import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONVEYOR_STAGES } from '../../data/mockData';
import { ShieldCheck, Snowflake, Flame, ArrowRight, Cog, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CategorySplitExperienceProps {
  onOpenRFQ: () => void;
}

export const CategorySplitExperience: React.FC<CategorySplitExperienceProps> = ({ onOpenRFQ }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const conveyorRef = useRef<HTMLDivElement>(null);
  const pathDotRef = useRef<SVGCircleElement>(null);
  const [activeCategory, setActiveCategory] = useState<'upvc' | 'cold-storage'>('upvc');
  const [conveyorProgress, setConveyorProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const conveyor = conveyorRef.current;
    const dot = pathDotRef.current;

    if (!section || !conveyor) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger for Conveyor Path line & traveling dot
      ScrollTrigger.create({
        trigger: conveyor,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 1.0,
        onUpdate: (self) => {
          setConveyorProgress(self.progress);
          if (dot) {
            // Animate dot along horizontal progress path
            const svgWidth = 800;
            gsap.set(dot, {
              attr: { cx: 40 + self.progress * (svgWidth - 80) }
            });
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full py-28 bg-white text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 right-4 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        DIVISIONS
      </div>

      {/* Radial Dot Pattern */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.025] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Preheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                04 // DUAL MANUFACTURING DIVISIONS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight leading-[1.0]">
              SPECIALIZED INDUSTRIAL SYSTEMS
            </h2>
          </div>

          {/* Division Switcher */}
          <div className="flex items-center p-1 bg-[#F1F3F5] border border-black/10">
            <button
              onClick={() => setActiveCategory('upvc')}
              className={`px-4 py-2 font-mono text-xs font-black tracking-widest uppercase transition-all interactive-target ${
                activeCategory === 'upvc'
                  ? 'bg-[#FF5A1F] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#111317]'
              }`}
            >
              UPVC CORROSION DIVISION
            </button>
            <button
              onClick={() => setActiveCategory('cold-storage')}
              className={`px-4 py-2 font-mono text-xs font-black tracking-widest uppercase transition-all interactive-target ${
                activeCategory === 'cold-storage'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#111317]'
              }`}
            >
              CRYO PIR COLD STORAGE (-45°C)
            </button>
          </div>
        </div>

        {/* Dual Split Screen Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Division A: UPVC Anti-Corrosive System */}
          <div
            className={`p-8 bg-[#F8F9FA] border transition-all duration-500 flex flex-col justify-between relative ${
              activeCategory === 'upvc'
                ? 'border-[#FF5A1F] shadow-[0_0_30px_rgba(255,90,31,0.15)] ring-2 ring-[#FF5A1F]/20'
                : 'border-black/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#FF5A1F]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-black uppercase tracking-wider">DIVISION 01 // CHEMICAL IMMUNITY</span>
                </div>
                <span className="px-2 py-0.5 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] text-[10px] font-mono font-bold uppercase tracking-wider">
                  30-YR STRUCTURAL LIFE
                </span>
              </div>

              <div className="my-6">
                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#111317]">
                  UPVC Roof & Wall Systems
                </h3>
                <p className="text-sm text-[#4B5563] mt-2 leading-relaxed font-normal">
                  Engineered specifically for heavy chemical processing, electroplating tanks, fertilizer depots, and coastal marine hubs where acidic vapors destroy metallic roofing within months.
                </p>
              </div>

              {/* Technical Benchmarks */}
              <div className="space-y-3 my-6 pt-4 border-t border-black/10 font-mono text-xs">
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">ACID RESISTANCE:</span>
                  <span className="text-emerald-600 font-bold">Immune to H2SO4, HCl, HNO3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">UV CO-EXTRUSION:</span>
                  <span className="text-[#FF5A1F] font-bold">Geloy ASA Shield (0.4mm)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">FIRE RATING:</span>
                  <span className="text-[#D97706] font-bold">Class B1 (Self-Extinguishing)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenRFQ}
              className="w-full py-3.5 bg-[#FF5A1F] text-white font-mono text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#111317] hover:text-white transition-all interactive-target shadow-xs"
            >
              <span>CONFIGURE UPVC SYSTEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Division B: PU & Cryogenic Cold Storage System */}
          <div
            className={`p-8 bg-[#F8F9FA] border transition-all duration-500 flex flex-col justify-between relative ${
              activeCategory === 'cold-storage'
                ? 'border-[#0284C7] shadow-[0_0_30px_rgba(2,132,199,0.15)] ring-2 ring-[#0284C7]/20'
                : 'border-black/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0284C7]" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#0284C7]">
                  <Snowflake className="w-4 h-4" />
                  <span className="font-black uppercase tracking-wider">DIVISION 02 // SUB-ZERO THERMAL</span>
                </div>
                <span className="px-2 py-0.5 bg-[#0284C7]/10 border border-[#0284C7]/30 text-[#0284C7] text-[10px] font-mono font-bold uppercase tracking-wider">
                  -45°C DEEP FREEZE
                </span>
              </div>

              <div className="my-6">
                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#111317]">
                  PIR CryoCore™ Sandwich Panels
                </h3>
                <p className="text-sm text-[#4B5563] mt-2 leading-relaxed font-normal">
                  Continuous high-pressure polyisocyanurate (PIR) insulated envelope panels engineered for pharmaceutical cleanrooms, vaccine vaults, and cold logistics mega-warehouses.
                </p>
              </div>

              {/* Technical Benchmarks */}
              <div className="space-y-3 my-6 pt-4 border-t border-black/10 font-mono text-xs">
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">THERMAL CONDUCTIVITY:</span>
                  <span className="text-[#0284C7] font-bold">λ = 0.020 W/m·K (Superior R-Value)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">JOINT AIRTIGHTNESS:</span>
                  <span className="text-emerald-600 font-bold">Cam-Lock + EPDM Dual Seal</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-black/10">
                  <span className="text-[#4B5563] uppercase tracking-wider font-semibold">FM GLOBAL APPROVAL:</span>
                  <span className="text-[#D97706] font-bold">FM 4880 Class 1 Verified</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenRFQ}
              className="w-full py-3.5 bg-[#0284C7] text-white font-mono text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#111317] hover:text-white transition-all interactive-target shadow-xs"
            >
              <span>CONFIGURE COLD ENVELOPE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Factory Conveyor / Manufacturing Path (MotionPath & Scrub Sync) */}
        <div ref={conveyorRef} className="pt-12 border-t border-black/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Cog className="w-5 h-5 text-[#FF5A1F] animate-spin" style={{ animationDuration: '8s' }} />
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#111317]">
                CONTINUOUS ROBOTIC CONVEYOR PROCESS
              </h3>
            </div>
            <span className="font-mono text-xs text-[#4B5563] uppercase tracking-widest hidden sm:inline-block">
              5-STAGE AUTOMATED PROTOCOL
            </span>
          </div>

          {/* SVG Motion Path Line with Dynamic Scrub Indicator */}
          <div className="relative w-full overflow-x-auto pb-6">
            <svg
              className="w-full min-w-[760px] h-16"
              viewBox="0 0 800 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Path */}
              <line
                x1="40"
                y1="30"
                x2="760"
                y2="30"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeDasharray="6 6"
              />

              {/* Animated Glowing Active Progress Line */}
              <line
                x1="40"
                y1="30"
                x2={40 + conveyorProgress * 720}
                y2="30"
                stroke="#FF5A1F"
                strokeWidth="4"
              />

              {/* Station Anchors */}
              {[40, 210, 390, 570, 750].map((cx, idx) => (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy="30"
                    r={conveyorProgress >= idx * 0.23 ? 9 : 6}
                    fill={conveyorProgress >= idx * 0.23 ? '#FF5A1F' : '#FFFFFF'}
                    stroke={conveyorProgress >= idx * 0.23 ? '#FF5A1F' : '#94A3B8'}
                    strokeWidth="2"
                  />
                  <text
                    x={cx}
                    y="52"
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    0{idx + 1}
                  </text>
                </g>
              ))}

              {/* Traveling Precision Laser Reticle Dot */}
              <circle
                ref={pathDotRef}
                cx="40"
                cy="30"
                r="7"
                fill="#FF5A1F"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="drop-shadow(0px 0px 8px rgba(255,90,31,0.5))"
              />
            </svg>

            {/* 5 Stage Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4">
              {CONVEYOR_STAGES.map((stage, idx) => {
                const isPassed = conveyorProgress >= idx * 0.2;
                return (
                  <div
                    key={stage.step}
                    className={`p-4 border transition-all ${
                      isPassed
                        ? 'bg-white border-[#FF5A1F] shadow-sm'
                        : 'bg-[#F8F9FA] border-black/10 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className={isPassed ? 'text-[#FF5A1F] font-bold uppercase tracking-wider' : 'text-[#4B5563] uppercase tracking-wider'}>
                        STAGE // {stage.step}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />}
                    </div>
                    <h4 className="font-heading text-sm font-black uppercase text-[#111317] mt-1">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-[#4B5563] mt-1 line-clamp-2">
                      {stage.detail}
                    </p>
                    <div className="mt-3 pt-2 border-t border-black/10 text-[10px] font-mono text-[#111317] font-bold">
                      {stage.metric}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
