import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Flame, ThermometerSnowflake, Lock, Layers, CheckCircle, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PanelAssemblySignature: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const l1 = layer1Ref.current;
    const l2 = layer2Ref.current;
    const l3 = layer3Ref.current;
    const l4 = layer4Ref.current;
    const callouts = calloutsRef.current;
    const gauge = gaugeRef.current;

    if (!section || !container || !l1 || !l2 || !l3 || !l4) return;

    const ctx = gsap.context(() => {
      // Create master pinned scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Determine active step for UI indicator
            const step = Math.min(3, Math.floor(self.progress * 4));
            setActiveStep(step);
          }
        }
      });

      // Initial state: layers scattered in 3D isometric space
      gsap.set(l1, { y: -180, x: -60, rotateX: 25, rotateY: -15, rotateZ: 2, opacity: 0.1, scale: 0.88 });
      gsap.set(l2, { y: -60, x: 80, rotateX: 25, rotateY: -15, rotateZ: 2, opacity: 0.1, scale: 0.88 });
      gsap.set(l3, { y: 60, x: -80, rotateX: 25, rotateY: -15, rotateZ: 2, opacity: 0.1, scale: 0.88 });
      gsap.set(l4, { y: 180, x: 60, rotateX: 25, rotateY: -15, rotateZ: 2, opacity: 0.1, scale: 0.88 });

      if (callouts) {
        gsap.set(callouts.querySelectorAll('.callout-item'), { opacity: 0, x: 20 });
      }

      // Step 1: Layer 1 (ASA Outer UV Shield) swoops into isometric position
      tl.to(l1, {
        y: -90,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      })
      .to(
        callouts ? callouts.querySelectorAll('.callout-item')[0] : {},
        { opacity: 1, x: 0, duration: 1 },
        '-=1'
      );

      // Step 2: Layer 2 (PIR Foam Core) flies in and nests directly under Layer 1
      tl.to(l2, {
        y: -30,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      })
      .to(
        callouts ? callouts.querySelectorAll('.callout-item')[1] : {},
        { opacity: 1, x: 0, duration: 1 },
        '-=1'
      );

      // Step 3: Layer 3 (High-Tensile Structural Substrate) docks under core
      tl.to(l3, {
        y: 30,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      })
      .to(
        callouts ? callouts.querySelectorAll('.callout-item')[2] : {},
        { opacity: 1, x: 0, duration: 1 },
        '-=1'
      );

      // Step 4: Layer 4 (Cam-Lock & Labyrinth Gasket) docks and entire panel SNAPS TOGETHER tightly
      tl.to(l4, {
        y: 90,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      })
      .to(
        callouts ? callouts.querySelectorAll('.callout-item')[3] : {},
        { opacity: 1, x: 0, duration: 1 },
        '-=1'
      )
      // Compression snap: collapse layer separation to locked monolithic sandwich
      .to([l1, l2, l3, l4], {
        y: 0,
        rotateX: 15,
        rotateY: -8,
        rotateZ: 0,
        duration: 2.5,
        ease: 'elastic.out(1, 0.75)'
      })
      .to(
        gauge,
        { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.7)' },
        '-=1.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const layersInfo = [
    {
      num: '01',
      name: 'Geloy™ ASA Weather Armor Layer',
      sub: 'Co-extruded UV & Chemical Shield (0.4mm)',
      icon: Shield,
      color: '#FF5A1F',
      stat: '99.4% UV Deflection // 100% Acid Proof'
    },
    {
      num: '02',
      name: 'PIR High-Density Foam Core',
      sub: 'Rigid Closed-Cell Polyisocyanurate (45 kg/m³)',
      icon: Flame,
      color: '#FFB627',
      stat: 'λ = 0.020 W/m·K // ASTM E84 Class A'
    },
    {
      num: '03',
      name: 'High-Tensile Polymer / Steel Substrate',
      sub: 'Acoustic Dampening Ribbed Base (1.5mm - 2.5mm)',
      icon: Layers,
      color: '#38BDF8',
      stat: '32 dB Rain Sound Dampening // 150 kg/m² Span'
    },
    {
      num: '04',
      name: 'Airtight Cam-Lock Labyrinth Seal',
      sub: 'Concealed Eccentric Anchor + Elastomeric EPDM',
      icon: Lock,
      color: '#10B981',
      stat: 'Zero Thermal Bridge // Sub-Zero -45°C Rated'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="relative w-full h-screen bg-[#F8F9FA] text-[#111317] overflow-hidden flex flex-col justify-between py-10 border-t border-black/10 select-none"
    >
      {/* Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        ASSEMBLY
      </div>

      {/* Radial Dot Pattern */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.025] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                SIGNATURE SCROLL SEQUENCE // 02
              </span>
              <span className="px-2 py-0.5 bg-black/5 border border-black/10 text-[9px] font-mono text-[#4B5563] uppercase tracking-wider">
                SCRUB-CONTROLLED
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black uppercase text-[#111317] tracking-tight mt-1">
              PANEL COMPOSITE ANATOMY & LOCK
            </h2>
          </div>

          {/* Progress Stage Tracker */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#4B5563]">STAGE:</span>
            <div className="flex gap-1.5 font-mono text-xs">
              {['UV SHIELD', 'PIR CORE', 'SUBSTRATE', 'CAM-LOCK'].map((label, idx) => (
                <div
                  key={label}
                  className={`px-3 py-1 border transition-all text-[10px] uppercase tracking-wider ${
                    idx <= activeStep
                      ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white font-black'
                      : 'bg-white border-black/10 text-[#4B5563]'
                  }`}
                >
                  0{idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Stage: Interactive 3D Composite Model + Real-Time Callout Specs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 flex-1 my-auto">
        {/* Left: 3D Exploded Panel Rendering Viewport (7 Cols) */}
        <div
          ref={containerRef}
          className="lg:col-span-7 relative h-[340px] sm:h-[420px] flex items-center justify-center perspective-[1200px]"
        >
          {/* Dimension Grid Axis */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-black/10 border-dashed border-t border-black/20 pointer-events-none" />
          <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 w-[1px] bg-black/10 border-dashed border-l border-black/20 pointer-events-none" />

          {/* Center Visual Stacking Model */}
          <div className="relative w-[300px] sm:w-[460px] h-[220px] sm:h-[260px] flex items-center justify-center transform-style-preserve-3d">
            {/* Layer 1: Geloy ASA Armor Top */}
            <div
              ref={layer1Ref}
              className="absolute inset-0 rounded-sm border-2 border-[#FF5A1F] bg-gradient-to-r from-[#FF5A1F]/15 via-white to-[#FF5A1F]/10 shadow-[0_10px_30px_rgba(255,90,31,0.2)] flex flex-col justify-between p-4 backdrop-blur-sm"
              style={{
                transform: 'rotateX(20deg) rotateY(-15deg)',
                boxShadow: '0 15px 35px rgba(255, 90, 31, 0.15)'
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-black text-[#FF5A1F]">
                <span>LAYER 01 // ASA UV ARMOR</span>
                <span>0.4 MM</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-8 bg-gradient-to-r from-transparent via-[#FF5A1F]/15 to-transparent hazard-stripe-subtle" />
              </div>
              <div className="text-[10px] font-mono text-[#4B5563] flex justify-between font-bold">
                <span>SURFACE DEFLECTION &gt; 99%</span>
                <span>NON-CHALKING</span>
              </div>
            </div>

            {/* Layer 2: PIR Core Middle */}
            <div
              ref={layer2Ref}
              className="absolute inset-0 rounded-sm border-2 border-[#D97706] bg-gradient-to-r from-[#FEF3C7] via-white to-[#FDE68A]/60 shadow-[0_15px_40px_rgba(217,119,6,0.2)] flex flex-col justify-between p-4 backdrop-blur-sm"
              style={{
                transform: 'rotateX(20deg) rotateY(-15deg)'
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-black text-[#D97706]">
                <span>LAYER 02 // RIGID PIR CLOSED-CELL CORE</span>
                <span>45 KG/M³</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center font-mono text-xs text-[#D97706] font-black tracking-wider">
                  λ = 0.020 W/m·K THERMAL BARRIER
                </div>
              </div>
              <div className="text-[10px] font-mono text-[#4B5563] flex justify-between font-bold">
                <span>FM 4880 CLASS 1</span>
                <span>ZERO CYCLOPENTANE VAPOR</span>
              </div>
            </div>

            {/* Layer 3: High-Tensile Ribbed Substrate */}
            <div
              ref={layer3Ref}
              className="absolute inset-0 rounded-sm border-2 border-[#0284C7] bg-gradient-to-r from-[#E0F2FE] via-white to-[#BAE6FD]/60 shadow-[0_15px_40px_rgba(2,132,199,0.2)] flex flex-col justify-between p-4 backdrop-blur-sm"
              style={{
                transform: 'rotateX(20deg) rotateY(-15deg)'
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-black text-[#0284C7]">
                <span>LAYER 03 // STRUCTURAL SUBSTRATE</span>
                <span>2.0 MM</span>
              </div>
              <div className="flex items-center justify-around">
                <div className="w-1/4 h-2 bg-[#0284C7]/40 rounded-xs" />
                <div className="w-1/4 h-2 bg-[#0284C7]/40 rounded-xs" />
                <div className="w-1/4 h-2 bg-[#0284C7]/40 rounded-xs" />
              </div>
              <div className="text-[10px] font-mono text-[#4B5563] flex justify-between font-bold">
                <span>HIGH TENSILE RIBS</span>
                <span>32 dB ACOUSTIC CUT</span>
              </div>
            </div>

            {/* Layer 4: Cam-Lock Joint Interlock */}
            <div
              ref={layer4Ref}
              className="absolute inset-0 rounded-sm border-2 border-[#059669] bg-gradient-to-r from-[#D1FAE5] via-white to-[#A7F3D0]/60 flex flex-col justify-between p-4 backdrop-blur-sm"
              style={{
                transform: 'rotateX(20deg) rotateY(-15deg)'
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-black text-[#059669]">
                <span>LAYER 04 // LABYRINTH CAM-LOCK SEAL</span>
                <span>SUB-ZERO -45°C</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-[#059669]" />
                <span className="font-mono text-[11px] text-[#059669] font-black">
                  ECCENTRIC HOOK LOCKING SYSTEM
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#4B5563] flex justify-between font-bold">
                <span>EPDM DUAL GASKET</span>
                <span>ZERO THERMAL BRIDGE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Layer Callouts with Active Status (5 Cols) */}
        <div ref={calloutsRef} className="lg:col-span-5 flex flex-col gap-3">
          {layersInfo.map((layer, idx) => {
            const Icon = layer.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={layer.num}
                className={`callout-item p-4 border transition-all duration-300 reticle-box ${
                  isActive
                    ? 'bg-white border-[#FF5A1F] shadow-[0_0_20px_rgba(255,90,31,0.25)]'
                    : 'bg-[#F8F9FA] border-black/10 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 border shrink-0 mt-0.5"
                    style={{
                      borderColor: `${layer.color}60`,
                      backgroundColor: `${layer.color}15`,
                      color: layer.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#4B5563]">
                        LAYER // {layer.num}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: layer.color }}
                      >
                        {layer.stat.split('//')[0]}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-[#111317] mt-0.5">
                      {layer.name}
                    </h4>
                    <p className="text-xs text-[#4B5563] mt-1 font-mono">{layer.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Gauge Status */}
      <div
        ref={gaugeRef}
        className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10 flex items-center justify-between pt-4 border-t border-black/10 text-xs font-mono text-[#4B5563]"
      >
        <div className="flex items-center gap-3">
          <ThermometerSnowflake className="w-4 h-4 text-[#0284C7]" />
          <span>COMPOSITE THERMAL RESISTANCE:</span>
          <span className="text-[#111317] font-bold">R-8.2 PER INCH (ASTM C518)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>STRUCTURAL AIRTIGHTNESS: <strong className="text-emerald-600">CLASS 4 (EN 12207)</strong></span>
          <span className="text-black/20">|</span>
          <span className="text-[#FF5A1F] font-bold">SCROLL TO ASSEMBLE ➔</span>
        </div>
      </div>
    </section>
  );
};
