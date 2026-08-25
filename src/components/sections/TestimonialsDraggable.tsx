import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TESTIMONIALS } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Quote, Star, MapPin, Building2 } from 'lucide-react';

export const TestimonialsDraggable: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const total = TESTIMONIALS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  // GSAP 3D Perspective Rotation Animation on active slide change
  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const offset = idx - activeIndex;

      if (idx === activeIndex) {
        // Center Active Card
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          zIndex: 10,
          xPercent: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      } else if (offset === 1 || (activeIndex === total - 1 && idx === 0)) {
        // Next Card (rotated slightly inward)
        gsap.to(card, {
          scale: 0.88,
          rotateY: -15,
          opacity: 0.45,
          zIndex: 5,
          xPercent: 15,
          duration: 0.6,
          ease: 'power3.out'
        });
      } else if (offset === -1 || (activeIndex === 0 && idx === total - 1)) {
        // Prev Card (rotated slightly inward)
        gsap.to(card, {
          scale: 0.88,
          rotateY: 15,
          opacity: 0.45,
          zIndex: 5,
          xPercent: -15,
          duration: 0.6,
          ease: 'power3.out'
        });
      } else {
        // Hidden distant cards
        gsap.to(card, {
          scale: 0.75,
          opacity: 0,
          zIndex: 0,
          duration: 0.6
        });
      }
    });
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 bg-white text-[#111317] overflow-hidden border-t border-black/10 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        VALIDATION
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
                07 // INDUSTRIAL FIELD VALIDATION
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight leading-[1.0]">
              CONTRACTOR & CLIENT VERDICT
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] text-[#111317] hover:text-[#FF5A1F] flex items-center justify-center transition-all interactive-target shadow-xs"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs font-black text-[#4B5563] px-2 uppercase tracking-widest">
              0{activeIndex + 1} / 0{total}
            </span>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] text-[#111317] hover:text-[#FF5A1F] flex items-center justify-center transition-all interactive-target shadow-xs"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Viewport */}
        <div
          ref={sliderRef}
          className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center perspective-[1200px]"
        >
          {TESTIMONIALS.map((test, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={test.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`absolute w-full max-w-3xl p-8 sm:p-10 bg-white border border-black/10 transition-shadow shadow-md cursor-pointer relative ${
                  isCurrent ? 'border-[#FF5A1F] shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-[#FF5A1F]/30' : ''
                }`}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

                {/* Quotation Watermark */}
                <Quote className="absolute top-6 right-8 w-16 h-16 text-black/5 pointer-events-none" />

                {/* Rating Stars & Project Scope Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/10 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-[#D97706]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#FF5A1F]">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="font-bold uppercase tracking-wider">{test.projectScale}</span>
                  </div>
                </div>

                {/* Main Testimonial Statement */}
                <p className="text-base sm:text-xl font-normal text-[#111317] leading-relaxed my-6 font-mono">
                  "{test.quote}"
                </p>

                {/* Author Credentials & Project Identification */}
                <div className="flex items-center justify-between pt-6 border-t border-black/10 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={test.avatar}
                      alt={test.author}
                      className="w-12 h-12 rounded-none object-cover border-2 border-[#FF5A1F] p-0.5"
                    />
                    <div>
                      <h4 className="font-heading text-base font-black uppercase text-[#111317]">
                        {test.author}
                      </h4>
                      <p className="text-xs text-[#4B5563] font-mono uppercase tracking-wider font-semibold">
                        {test.role} — <span className="text-[#111317] font-bold">{test.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#4B5563] uppercase tracking-wider font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>{test.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1 transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-[#FF5A1F]' : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
