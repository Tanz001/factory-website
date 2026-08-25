import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { METRICS_DATA } from '../../data/mockData';
import { Factory, ShieldAlert, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutFactory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  // Counter states for animated numbers
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    exp: 0,
    facility: 0,
    projects: 0,
    tolerance: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const imgContainer = imgContainerRef.current;
    const stats = statsContainerRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Headline Scrub / Stagger Reveal
      if (headline) {
        const words = headline.querySelectorAll('.about-word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 35, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Parallax Image with subtle zoom & clip effect
      if (imgContainer) {
        const innerImg = imgContainer.querySelector('img');
        gsap.fromTo(
          innerImg,
          { scale: 1.15, yPercent: -10 },
          {
            scale: 1.0,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: imgContainer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      }

      // 3. Stat Counters count-up animation on scrollTrigger
      if (stats) {
        ScrollTrigger.create({
          trigger: stats,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            // Animate years
            gsap.to({ val: 0 }, {
              val: 18,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((prev) => ({ ...prev, exp: Math.floor(this.targets()[0].val) }));
              }
            });

            // Animate facility area
            gsap.to({ val: 0 }, {
              val: 650000,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((prev) => ({ ...prev, facility: Math.floor(this.targets()[0].val) }));
              }
            });

            // Animate projects
            gsap.to({ val: 0 }, {
              val: 2400,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((prev) => ({ ...prev, projects: Math.floor(this.targets()[0].val) }));
              }
            });

            // Animate tolerance
            gsap.to({ val: 0 }, {
              val: 0.02,
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((prev) => ({ ...prev, tolerance: Number(this.targets()[0].val.toFixed(2)) }));
              }
            });
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-28 bg-white text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark Typography */}
      <div className="absolute top-1/3 right-10 text-[180px] lg:text-[260px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        FOUNDRY
      </div>

      {/* Radial Dot Texture */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.03] pointer-events-none" />

      {/* Decorative Technical Dimension Lines */}
      <div className="absolute top-10 left-8 right-8 hidden lg:flex items-center justify-between text-[9px] font-mono text-[#4B5563] uppercase tracking-[0.3em] opacity-70 pointer-events-none border-b border-black/10 pb-2">
        <span>DIM: EXT_FACILITY_SPAN // 450,000 MM</span>
        <span>SECTION: 01 // MANUFACTURING CAPEX & FOOTPRINT</span>
        <span>TOLERANCE: ISO-2768-mK</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Preheader */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
            01 // PRODUCTION ARCHITECTURE
          </span>
          <span className="h-px w-20 bg-black/10" />
        </div>

        {/* Asymmetric Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Industrial Story & Technical Manifesto (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <h2
              ref={headlineRef}
              className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight leading-[1.0] mb-8"
            >
              <span className="block">
                <span className="about-word inline-block mr-3">PRECISION</span>
                <span className="about-word inline-block mr-3">METALLURGY</span>
                <span className="about-word inline-block text-[#FF5A1F]">MEETS</span>
              </span>
              <span className="block text-[#111317]">
                <span className="about-word inline-block mr-3">ADVANCED</span>
                <span className="about-word inline-block mr-3">POLYMERS.</span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-normal">
              Founded on the principle that harsh industrial environments demand zero-compromise building envelopes, KINETIC™ manufactures high-gauge continuous UPVC and rigid PIR sandwich panels that withstand extreme chemical vapors, sulfuric acid corrosion, and sub-zero thermal extremes down to -45°C.
            </p>

            <p className="text-sm sm:text-base text-[#4B5563]/90 leading-relaxed mb-10">
              Unlike traditional galvanized steel sheets that inevitably rust and oxidize within 3–5 years in acid-dense or marine environments, our co-extruded Geloy ASA and 45 kg/m³ PIR cores deliver permanent corrosion immunity with verified 30-year operational lifespans.
            </p>

            {/* Industrial Feature Checkpoints with Bold Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 pb-8 border-t border-b border-black/10">
              <div className="group relative p-4 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF5A1F] font-bold mb-1">AUTOMATED LINE</div>
                <h4 className="text-sm font-heading font-bold text-[#111317] uppercase">Continuous Extrusion</h4>
                <p className="text-xs text-[#4B5563] mt-1">Dual automated 500m extrusion lines with real-time laser thickness profiling.</p>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#FF5A1F] mt-3 transition-all" />
              </div>

              <div className="group relative p-4 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#0284C7] font-bold mb-1">ECO-ZERO VAPOR</div>
                <h4 className="text-sm font-heading font-bold text-[#111317] uppercase">Cyclopentane Foaming</h4>
                <p className="text-xs text-[#4B5563] mt-1">100% Zero-CFC/HCFC formulation with high closed-cell density (&gt;95%).</p>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#0284C7] mt-3 transition-all" />
              </div>

              <div className="group relative p-4 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold mb-1">HERMETIC SEAL</div>
                <h4 className="text-sm font-heading font-bold text-[#111317] uppercase">Cam-Lock Integrity</h4>
                <p className="text-xs text-[#4B5563] mt-1">Concealed eccentric locking hooks creating airtight sub-zero envelope seals.</p>
                <div className="h-px w-full bg-black/10 group-hover:bg-emerald-500 mt-3 transition-all" />
              </div>

              <div className="group relative p-4 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#D97706] font-bold mb-1">CERTIFIED LAB</div>
                <h4 className="text-sm font-heading font-bold text-[#111317] uppercase">In-House ASTM Testing</h4>
                <p className="text-xs text-[#4B5563] mt-1">Full Steiner tunnel fire testing, 3000-hr salt fog, and wind-uplift verification.</p>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#D97706] mt-3 transition-all" />
              </div>
            </div>

            {/* Live Operational Status readout */}
            <div className="mt-8 flex items-center gap-4 p-4 bg-[#F1F3F5] border border-black/10">
              <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs font-mono text-[#4B5563]">
                <span className="text-[#111317] font-bold">PLANT AUTOMATION RATE:</span> 94.2% Robotic Tooling // <span className="text-emerald-600 font-bold">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Factory Framing + Spec Sheet Visual + Parallax (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Technical Image Reticle Frame */}
            <div
              ref={imgContainerRef}
              className="relative w-full h-[420px] sm:h-[500px] overflow-hidden border border-black/15 bg-[#F1F3F5] shadow-xl"
            >
              {/* Corner Tick Marks */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F] z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF5A1F] z-20" />

              <div className="absolute top-3 left-3 z-20 font-mono text-[10px] bg-white/95 px-2.5 py-1 border border-black/10 text-[#FF5A1F] font-bold uppercase tracking-wider shadow-xs">
                CAM_01 // EXTRUSION_LINE_A
              </div>
              <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] bg-white/95 px-2.5 py-1 border border-black/10 text-[#4B5563] uppercase tracking-wider shadow-xs">
                TEMP: 195°C // SPEED: 14M/MIN
              </div>

              {/* Main Factory Image */}
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Automated continuous panel manufacturing line"
                className="w-full h-full object-cover will-change-transform filter contrast-105"
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Technical Spec Box */}
            <div className="p-6 bg-[#F8F9FA] border border-black/10 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <span className="text-[#4B5563] uppercase tracking-wider">FACILITY CERTIFICATION</span>
                <span className="text-[#FF5A1F] font-bold">ISO-9001 / ISO-14001</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-black/5">
                <span className="text-[#4B5563] uppercase tracking-wider">TOTAL ANNUAL PRODUCTION</span>
                <span className="text-[#111317] font-bold">5.8 Million m² / Year</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[#4B5563] uppercase tracking-wider">AUTOMATED TOOLING ORIGIN</span>
                <span className="text-[#111317] font-bold">Battenfeld-Cincinnati & Hennecke</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Numerical Metrics Counter Block */}
        <div
          ref={statsContainerRef}
          id="factory-metrics"
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-12 border-t border-black/10"
        >
          {METRICS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] transition-all group relative shadow-xs"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#4B5563] uppercase tracking-[0.25em]">{item.code}</span>
                <span className="w-1.5 h-1.5 bg-[#FF5A1F]" />
              </div>

              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#111317] group-hover:text-[#FF5A1F] tracking-tight leading-none transition-colors">
                {item.id === 'facility' ? (
                  <span>{counts.facility.toLocaleString()}</span>
                ) : item.id === 'tolerance' ? (
                  <span>{counts.tolerance}</span>
                ) : (
                  <span>{counts[item.id]}</span>
                )}
                <span className="text-[#FF5A1F] text-2xl sm:text-4xl">{item.suffix}</span>
              </div>

              <div className="text-xs uppercase tracking-widest font-mono text-[#111317] font-bold mt-3">
                {item.label}
              </div>
              <div className="text-[11px] text-[#4B5563] mt-1 font-mono">
                {item.sublabel}
              </div>

              <div className="h-px w-full bg-black/10 group-hover:bg-[#FF5A1F] mt-4 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
