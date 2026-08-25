import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { METRICS_DATA } from '../../data/mockData';

gsap.registerPlugin(ScrollTrigger);

export const AboutFactory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ exp: 0, facility: 0, projects: 0, tolerance: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const imgContainer = imgContainerRef.current;
    const stats = statsContainerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (imgContainer) {
        const innerImg = imgContainer.querySelector('img');
        gsap.fromTo(
          innerImg,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imgContainer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      if (stats) {
        ScrollTrigger.create({
          trigger: stats,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: 18,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((p) => ({ ...p, exp: Math.floor(this.targets()[0].val) }));
              },
            });
            gsap.to({ val: 0 }, {
              val: 650000,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((p) => ({ ...p, facility: Math.floor(this.targets()[0].val) }));
              },
            });
            gsap.to({ val: 0 }, {
              val: 2400,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((p) => ({ ...p, projects: Math.floor(this.targets()[0].val) }));
              },
            });
            gsap.to({ val: 0 }, {
              val: 0.02,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: function () {
                setCounts((p) => ({ ...p, tolerance: Number(this.targets()[0].val.toFixed(2)) }));
              },
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 sm:py-32 bg-[var(--surface)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-4">
              About the factory
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[var(--ink)] leading-[0.95] mb-6">
              Precision polymers for punishing environments
            </h2>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-5 max-w-xl">
              SN Star Engineering manufactures continuous UPVC and rigid PIR sandwich panels that hold up
              where galvanized steel fails — acid plants, coastal warehouses, and deep-freeze hubs.
            </p>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl mb-8">
              Co-extruded ASA UV armor and 45 kg/m³ PIR cores deliver corrosion immunity and
              verified thermal performance with a 30-year structural lifespan.
            </p>

            <ul className="space-y-3">
              {[
                'Dual 500m automated extrusion lines',
                'Zero-CFC cyclopentane PIR foaming',
                'Cam-lock airtight joint systems',
                'In-house ASTM fire & salt-fog labs',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div
              ref={imgContainerRef}
              className="relative w-full aspect-[4/5] sm:aspect-[5/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1697698532634-ea59b636ccea?auto=format&fit=crop&w=1400&q=85"
                alt="Steel coil stock for roofing and UPVC sheet production"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
                  Sheet production facility
                </p>
                <p className="text-sm text-white/70 mt-1">UPVC roofing · Cold panels · Industrial shades</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line-strong)] border border-[var(--line)]"
        >
          {METRICS_DATA.map((item) => (
            <div key={item.id} className="bg-[var(--surface)] p-6 sm:p-8">
              <div className="font-heading text-4xl sm:text-5xl font-bold text-[var(--ink)] tracking-tight leading-none">
                {item.id === 'facility'
                  ? counts.facility.toLocaleString()
                  : item.id === 'tolerance'
                  ? counts.tolerance
                  : counts[item.id as 'exp' | 'projects']}
                <span className="text-[var(--accent)] text-2xl sm:text-3xl">{item.suffix}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--ink)]">{item.label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
