import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import { ArrowUpRight, Shield, Layers, Flame, Thermometer, FileText, Check, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductsShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ: () => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onSelectProduct,
  onOpenRFQ
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Headline Reveal
      if (headline) {
        gsap.fromTo(
          headline.querySelectorAll('.prod-title-word'),
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%'
            }
          }
        );
      }

      // Stagger in unconventional product cards
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
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

  const featuredProduct = PRODUCTS[0];
  const secondaryProducts = PRODUCTS.slice(1);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full py-28 bg-[#F8F9FA] text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] lg:text-[280px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        PORTFOLIO
      </div>

      {/* Radial Dot Pattern */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                03 // CERTIFIED PRODUCT SPECIFICATIONS
              </span>
            </div>
            <h2
              ref={headlineRef}
              className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#111317] leading-[1.0]"
            >
              <span className="prod-title-word inline-block mr-3">HEAVY</span>
              <span className="prod-title-word inline-block mr-3">INDUSTRIAL</span>
              <span className="prod-title-word inline-block text-[#FF5A1F]">PORTFOLIO</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs font-mono text-[#4B5563] max-w-sm uppercase">
              ENGINEERED COMPOSITES FOR CHEMICAL RESISTANCE, ZERO THERMAL BRIDGING, AND ASTM FLAME RATINGS.
            </p>
            <button
              onClick={onOpenRFQ}
              className="px-5 py-2.5 bg-white border border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FF5A1F] hover:text-white font-mono text-xs font-black tracking-widest uppercase transition-all shadow-xs"
            >
              DOWNLOAD CAD SPECS
            </button>
          </div>
        </div>

        {/* Unconventional Asymmetric Technical Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 1. Large Hero Featured Product Card (8 cols) */}
          <div className="lg:col-span-8 product-card group relative bg-white border border-black/10 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF5A1F] shadow-xs">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

            {/* Top Spec Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FF5A1F] text-white font-black text-[10px] uppercase tracking-wider">
                  FEATURED
                </span>
                <span className="text-[#FF5A1F] font-bold">{featuredProduct.code}</span>
              </div>
              <span className="text-[#4B5563] uppercase tracking-wider text-[11px] font-bold">WARRANTY: 30-YEAR STRUCTURAL</span>
            </div>

            {/* Middle Product Showcase Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 items-center">
              {/* Product Image Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden border border-black/10 bg-[#F1F3F5]">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/95 border border-black/10 font-mono text-[10px] text-[#111317] font-bold shadow-xs">
                  {featuredProduct.thickness}
                </div>
              </div>

              {/* Technical Description & Bullet Points */}
              <div className="flex flex-col">
                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#111317] group-hover:text-[#FF5A1F] transition-colors">
                  {featuredProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-2 font-normal leading-relaxed">
                  {featuredProduct.description}
                </p>

                {/* Key Spec Readout Tags */}
                <div className="grid grid-cols-2 gap-2 my-4 pt-4 border-t border-black/10 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase font-bold">FIRE RETARDANCY</span>
                    <span className="text-[#D97706] font-bold">{featuredProduct.fireRating}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase font-bold">EFFECTIVE WIDTH</span>
                    <span className="text-[#111317] font-bold">{featuredProduct.standardWidth}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase font-bold">PURLIN SPAN</span>
                    <span className="text-[#111317] font-bold">{featuredProduct.spanCapacity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase font-bold">CORROSION TEST</span>
                    <span className="text-emerald-600 font-bold">100% Acid Immune</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#4B5563] uppercase tracking-wider font-semibold">
                <Shield className="w-4 h-4 text-[#FF5A1F]" />
                <span>ASTM E84 CLASS A & ISO 9001 TESTED</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="px-6 py-2.5 bg-[#FF5A1F] text-white font-mono text-xs font-black tracking-widest uppercase flex items-center gap-2 hover:bg-[#111317] hover:text-white transition-all interactive-target shadow-[0_0_20px_rgba(255,90,31,0.25)]"
                >
                  <span>VIEW FULL SPEC SHEET</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Right Tall Card: CryoCore Cold Storage PIR Panel (4 cols) */}
          <div className="lg:col-span-4 product-card group relative bg-white border border-black/10 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#0284C7] shadow-xs">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0284C7]" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-black/10 font-mono text-xs">
                <span className="text-[#0284C7] font-bold">{secondaryProducts[0].code}</span>
                <span className="text-[#4B5563] uppercase tracking-wider text-[10px] font-bold">SUB-ZERO -45°C</span>
              </div>

              <div className="relative h-48 w-full overflow-hidden border border-black/10 bg-[#F1F3F5] my-4">
                <img
                  src={secondaryProducts[0].image}
                  alt={secondaryProducts[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/95 border border-[#0284C7] font-mono text-[10px] text-[#0284C7] font-bold shadow-xs">
                  PIR CORE: 45kg/m³
                </div>
              </div>

              <h3 className="font-heading text-xl font-black uppercase text-[#111317] group-hover:text-[#0284C7] transition-colors">
                {secondaryProducts[0].name}
              </h3>
              <p className="text-xs text-[#4B5563] mt-2 font-normal line-clamp-3">
                {secondaryProducts[0].description}
              </p>

              <div className="mt-4 pt-3 border-t border-black/10 font-mono text-xs flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-[#4B5563] uppercase">CONDUCTIVITY:</span>
                  <span className="text-[#0284C7] font-bold">λ = 0.020 W/m·K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563] uppercase">THICKNESS:</span>
                  <span className="text-[#111317] font-semibold">50mm to 200mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5563] uppercase">JOINT SEAL:</span>
                  <span className="text-emerald-600 font-bold">Cam-Lock Labyrinth</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectProduct(secondaryProducts[0])}
              className="mt-6 w-full py-2.5 bg-[#F8F9FA] border border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white font-mono text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 interactive-target shadow-xs"
            >
              <span>EXPLORE PIR COLD PANEL</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Bottom Row: 3 Modular Technical Spec Cards (4 cols each) */}
          {secondaryProducts.slice(1).map((product) => (
            <div
              key={product.id}
              className="lg:col-span-4 product-card group relative bg-white border border-black/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#FF5A1F] shadow-xs"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-black/10 font-mono text-xs">
                  <span className="text-[#FF5A1F] font-bold">{product.code}</span>
                  <span className="text-[#4B5563] uppercase tracking-wider text-[10px] font-bold">{product.category}</span>
                </div>

                <div className="relative h-44 w-full overflow-hidden border border-black/10 bg-[#F1F3F5] my-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/95 border border-black/10 font-mono text-[10px] text-[#111317] font-bold shadow-xs">
                    {product.thickness}
                  </div>
                </div>

                <h3 className="font-heading text-lg font-black uppercase text-[#111317] group-hover:text-[#FF5A1F] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2">
                  {product.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#4B5563] uppercase tracking-wider">
                  FIRE: <strong className="text-[#D97706]">{product.fireRating.split(' ')[0]}</strong>
                </span>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="text-xs font-mono font-black uppercase tracking-wider text-[#FF5A1F] hover:text-[#111317] flex items-center gap-1 group-hover:translate-x-1 transition-all interactive-target"
                >
                  <span>TECH SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
