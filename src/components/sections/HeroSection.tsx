import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGES } from '../../data/mockData';
import { ArrowDown, ArrowRight, ShieldCheck, Cpu, Flame, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenRFQ: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRFQ }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgStackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const bgStack = bgStackRef.current;
    const overlay = overlayRef.current;
    const content = contentLayerRef.current;
    const scrollCue = scrollCueRef.current;
    const headline = headlineRef.current;

    if (!section || !bgStack || !content) return;

    const ctx = gsap.context(() => {
      // 1. Initial Load Headline & Badges Character/Line Stagger Reveal
      const titleLines = headline ? headline.querySelectorAll('.headline-word') : [];
      const subtitle = content.querySelector('.hero-subtitle');
      const badges = content.querySelectorAll('.hero-badge');
      const ctas = content.querySelector('.hero-ctas');

      const loadTl = gsap.timeline({ delay: 0.15 });

      loadTl
        .fromTo(
          titleLines,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.07,
            ease: 'power3.out'
          }
        )
        .fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          badges,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.5'
        )
        .fromTo(
          ctas,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          scrollCue,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );

      // 2. Continuous Rotating Crossfade Stack with Ken Burns Zoom
      const imageElements = bgStack.querySelectorAll('.hero-bg-img');
      if (imageElements.length > 0) {
        // Set initial state
        gsap.set(imageElements, { opacity: 0, scale: 1.08 });
        gsap.set(imageElements[0], { opacity: 1, scale: 1.0 });

        let currentIndex = 0;
        const totalImages = imageElements.length;

        const crossfadeInterval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % totalImages;
          const currentImg = imageElements[currentIndex];
          const nextImg = imageElements[nextIndex];

          setActiveImageIndex(nextIndex);

          // Reset incoming image scale to 1.08
          gsap.set(nextImg, { scale: 1.08, zIndex: 2 });
          gsap.set(currentImg, { zIndex: 1 });

          // Smooth 1.4s crossfade + 7s Ken Burns zoom on incoming
          gsap.to(nextImg, {
            opacity: 1,
            duration: 1.4,
            ease: 'power2.inOut'
          });

          gsap.to(nextImg, {
            scale: 1.0,
            duration: 7.0,
            ease: 'none'
          });

          gsap.to(currentImg, {
            opacity: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(currentImg, { zIndex: 0 });
            }
          });

          currentIndex = nextIndex;
        }, 5500);

        // Store interval for cleanup
        return () => clearInterval(crossfadeInterval);
      }

      // 3. Scroll-Linked Scrub Parallax (pinned transition depth)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          // Background moves slower (25%) and scales up (1.0 -> 1.15 push-in)
          gsap.set(bgStack, {
            yPercent: self.progress * 25,
            scale: 1 + self.progress * 0.15
          });

          // Overlay deepens to dark slate transition
          if (overlay) {
            gsap.set(overlay, {
              backgroundColor: `rgba(20, 22, 26, ${0.4 + self.progress * 0.55})`
            });
          }

          // Foreground moves faster (65%) and smoothly dissolves
          gsap.set(content, {
            yPercent: self.progress * 65,
            opacity: Math.max(0, 1 - self.progress * 1.3),
            filter: `blur(${self.progress * 8}px)`
          });

          // Scroll cue fades immediately upon user scroll
          if (scrollCue) {
            gsap.set(scrollCue, {
              opacity: Math.max(0, 1 - self.progress * 4)
            });
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = [
    'ENGINEERED',
    'FOR',
    'EXTREMES.',
    'BUILT',
    'TO',
    'OUTLAST.'
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden flex flex-col justify-between bg-[#F8F9FA] text-[#111317] pt-24 pb-12"
    >
      {/* Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[200px] lg:text-[280px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.025] leading-none whitespace-nowrap z-0">
        ENGINEERED
      </div>

      {/* Layer 1: Background Rotating Image Stack */}
      <div
        ref={bgStackRef}
        id="hero-bg-stack"
        className="absolute inset-0 w-full h-full will-change-transform pointer-events-none opacity-15"
      >
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img.code}
            className="hero-bg-img absolute inset-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${img.url})`,
              zIndex: idx === 0 ? 1 : 0
            }}
          />
        ))}
      </div>

      {/* Layer 2: Dot Matrix Pattern + Gradient Fade */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full bg-radial-dots opacity-[0.04] pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FA]/80 via-transparent to-[#F8F9FA] pointer-events-none" />

      {/* Side Vertical Metadata Rails */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 z-10 pointer-events-none">
        <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.4em] text-[#4B5563] opacity-60">
          ESTABLISHED 2008
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#FF5A1F] to-transparent" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.4em] text-[#4B5563] opacity-60">
          ISO 9001 : 2015
        </span>
      </div>

      {/* Layer 3: Foreground Content */}
      <div
        ref={contentLayerRef}
        id="hero-content"
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto flex flex-col justify-center"
      >
        {/* Monospace Subtitle Tag */}
        <div className="hero-badge flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-2 h-2 bg-[#FF5A1F]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
            NEXT-GEN INDUSTRIAL PANELS // ARCHITECTURE & COLD CHAIN
          </span>
          <span className="h-px w-12 sm:w-20 bg-black/10" />
        </div>

        {/* High-Impact SplitText Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] font-black uppercase text-[#111317] tracking-tighter leading-[0.88] max-w-6xl mb-8"
        >
          <span className="block overflow-hidden">
            {headlineWords.slice(0, 3).map((word, i) => (
              <span key={i} className="headline-word inline-block mr-3 sm:mr-5">
                {word === 'EXTREMES.' ? (
                  <span className="text-[#FF5A1F]">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {headlineWords.slice(3).map((word, i) => (
              <span key={i} className="headline-word inline-block mr-3 sm:mr-5">
                {word === 'OUTLAST.' ? (
                  <span className="underline decoration-[#FF5A1F] decoration-4 sm:decoration-8 underline-offset-8">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
        </h1>

        {/* Two-Column Grid: Left Copy & CTAs + Right Bold Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="hero-subtitle text-base sm:text-lg text-[#4B5563] max-w-xl font-normal leading-relaxed mb-8">
              High-gauge continuous UPVC 3-layer anti-corrosion roofing and sub-zero PIR cold storage panels engineered to replace vulnerable metal sheeting across acid-dense and -45°C deep freeze facilities.
            </p>

            {/* CTAs matching theme */}
            <div className="hero-ctas flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
              <a
                href="#products"
                id="hero-explore-btn"
                className="bg-[#FF5A1F] text-white px-7 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm uppercase font-black tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-3 interactive-target shadow-[0_0_25px_rgba(255,90,31,0.3)]"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenRFQ}
                id="hero-rfq-btn"
                className="px-6 py-3.5 sm:px-7 sm:py-4 bg-white text-[#111317] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border border-black/15 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all flex items-center gap-3 interactive-target shadow-xs"
              >
                <span>GET A TECHNICAL QUOTE</span>
                <div className="w-2 h-2 bg-[#FF5A1F]" />
              </button>
            </div>

            {/* Micro Feature Previews with Hover Underline Transitions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-black/10">
              <div className="group relative p-3 bg-white border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF5A1F] font-bold">01 // ACID IMMUNE</div>
                <div className="text-xs font-bold text-[#111317] mt-1">UPVC 3-Layer Geloy ASA</div>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#FF5A1F] mt-2 transition-all" />
              </div>

              <div className="group relative p-3 bg-white border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#0284C7] font-bold">02 // CRYOGENIC</div>
                <div className="text-xs font-bold text-[#111317] mt-1">-45°C PIR Cam-Lock</div>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#0284C7] mt-2 transition-all" />
              </div>

              <div className="group relative p-3 bg-white border border-black/10 hover:border-[#FF5A1F] transition-all shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#D97706] font-bold">03 // ASTM CLASS A</div>
                <div className="text-xs font-bold text-[#111317] mt-1">Zero Flame Spread</div>
                <div className="h-px w-full bg-black/10 group-hover:bg-[#D97706] mt-2 transition-all" />
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Bold Metric Statistics Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 sm:p-8 bg-white border border-black/10 shadow-lg relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF5A1F]" />

              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4B5563] mb-6 flex items-center justify-between border-b border-black/10 pb-3">
                <span>MANUFACTURING CAPACITY</span>
                <span className="text-[#FF5A1F] font-bold">2026 AUDITED</span>
              </div>

              {/* Bold Stat Rows */}
              <div className="space-y-6">
                <div>
                  <div className="font-heading text-4xl sm:text-5xl font-black text-[#111317] tracking-tight leading-none mb-1">
                    5.8M <span className="text-xl sm:text-2xl font-mono text-[#FF5A1F] font-bold">M²</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#4B5563] font-mono">
                    ANNUAL CONTINUOUS EXTRUSION RUN
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                  <div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-[#111317] tracking-tight">
                      ±0.02<span className="text-xs font-mono text-[#FF5A1F]">MM</span>
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-[#4B5563] font-mono mt-1">
                      LASER TOLERANCE
                    </div>
                  </div>

                  <div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-[#111317] tracking-tight">
                      -45°<span className="text-xs font-mono text-[#0284C7]">C</span>
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-[#4B5563] font-mono mt-1">
                      CRYO SUB-ZERO
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bold High-Contrast Orange Callout Banner */}
            <div className="bg-[#FF5A1F] text-white p-6 flex flex-col justify-center shadow-lg transition-transform hover:scale-[1.01]">
              <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-90">
                INDUSTRY FIRST INNOVATION
              </div>
              <div className="font-heading text-lg sm:text-xl font-black uppercase tracking-tight leading-tight">
                Continuous Geloy ASA Co-Extrusion with Zero-Ozone PIR
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 4: Animated Scroll Cue (Bottom Center) */}
      <div
        ref={scrollCueRef}
        id="hero-scroll-cue"
        className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-6 sm:px-12 w-full pt-8 text-[10px] font-mono text-[#4B5563] tracking-widest uppercase border-t border-black/10 opacity-80"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F]" />
          <span>SCROLL TO DISCOVER PRODUCTION METRICS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>COORDINATES: 51.9244° N / 4.4777° E</span>
        </div>
      </div>
    </section>
  );
};
