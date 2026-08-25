import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Certificate } from '../../types';
import { CERTIFICATIONS } from '../../data/mockData';
import { Award, ShieldCheck, CheckCircle2, ArrowUpRight, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CertificationsGridProps {
  onSelectCert: (cert: Certificate) => void;
}

export const CertificationsGrid: React.FC<CertificationsGridProps> = ({ onSelectCert }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.cert-seal-card');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.9, rotate: -2, y: 30 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'back.out(1.5)',
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
      id="certifications"
      className="relative w-full py-28 bg-[#F8F9FA] text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 right-10 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        ACCREDITED
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
                06 // GLOBAL ACCREDITATION & TESTING
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight leading-[1.0]">
              7 INDUSTRIAL CERTIFICATIONS
            </h2>
          </div>

          <p className="text-xs font-mono text-[#4B5563] max-w-sm uppercase">
            INDEPENDENTLY AUDITED BY TÜV RHEINLAND, UNDERWRITERS LABORATORIES, AND FM GLOBAL.
          </p>
        </div>

        {/* 7 Heavy Metallic / Embossed Seal Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={cert.id}
              onClick={() => onSelectCert(cert)}
              className={`cert-seal-card group p-6 bg-white border border-black/10 hover:border-[#FF5A1F] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md relative ${
                idx === 0 ? 'lg:col-span-2 bg-white' : ''
              }`}
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

              <div>
                {/* Header Tag with Metallic Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 font-mono text-xs">
                  <span className="text-[10px] text-[#4B5563] uppercase tracking-widest font-bold">{cert.code}</span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border"
                    style={{
                      borderColor: `${cert.sealColor}60`,
                      backgroundColor: `${cert.sealColor}15`,
                      color: cert.sealColor
                    }}
                  >
                    {cert.badge}
                  </span>
                </div>

                {/* Stamped Seal Emblem */}
                <div className="my-5 flex items-center gap-4">
                  <div
                    className="w-12 h-12 border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs"
                    style={{
                      borderColor: cert.sealColor,
                      backgroundColor: `${cert.sealColor}12`,
                      color: cert.sealColor
                    }}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-[#111317] group-hover:text-[#FF5A1F] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] font-mono mt-0.5 uppercase tracking-wider font-semibold">{cert.issuer}</p>
                  </div>
                </div>

                <p className="text-xs text-[#4B5563] line-clamp-2 font-normal leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#4B5563] uppercase tracking-wider text-[11px] font-bold">VALID: {cert.validThrough}</span>
                <span className="text-[#FF5A1F] font-black uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  INSPECT AUDIT <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
