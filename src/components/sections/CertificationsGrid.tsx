import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Certificate } from '../../types';
import { CERTIFICATIONS } from '../../data/mockData';
import { ArrowUpRight } from 'lucide-react';

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
      gsap.fromTo(
        grid.querySelectorAll('.cert-card'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 82%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative w-full py-24 sm:py-32 bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
              Accreditation
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[var(--ink)] leading-[0.95]">
              Independently certified
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-sm">
            Audited by TÜV Rheinland, Underwriters Laboratories, FM Global, and Bureau Veritas.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => onSelectCert(cert)}
              className={`cert-card text-left group p-5 sm:p-6 bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${cert.sealColor}18`,
                    color: cert.sealColor,
                  }}
                >
                  {cert.badge}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-[var(--ink)] leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-[var(--muted)] mb-4">{cert.issuer}</p>
              <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--muted)]">
                Valid through {cert.validThrough}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
