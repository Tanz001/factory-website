import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Snowflake } from 'lucide-react';

interface CategorySplitExperienceProps {
  onOpenRFQ: () => void;
}

const SYSTEMS = [
  {
    id: 'upvc',
    label: 'UPVC',
    icon: ShieldCheck,
    title: 'UPVC corrosion systems',
    subtitle: 'Acid, alkali & marine immune roofing and cladding',
    image:
      'https://images.unsplash.com/photo-1637035640168-ff7dad2852f8?auto=format&fit=crop&w=1600&q=85',
    accent: 'var(--ink)',
    points: [
      '3-layer Geloy ASA UV armor',
      'Zero rust in chemical atmospheres',
      'Acoustic rainfall dampening up to 32 dB',
      '30-year structural warranty',
    ],
  },
  {
    id: 'cold',
    label: 'Cold storage',
    icon: Snowflake,
    title: 'PIR cold storage systems',
    subtitle: 'Sub-zero envelopes rated to −45°C',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=85',
    accent: 'var(--accent)',
    points: [
      'λ = 0.020 W/m·K PIR core',
      'Cam-lock airtight joints',
      'FM 4880 Class 1 approved',
      '50–200 mm thickness range',
    ],
  },
] as const;

export const CategorySplitExperience: React.FC<CategorySplitExperienceProps> = ({
  onOpenRFQ,
}) => {
  const [active, setActive] = useState<(typeof SYSTEMS)[number]['id']>('upvc');
  const data = SYSTEMS.find((s) => s.id === active) ?? SYSTEMS[0];
  const Icon = data.icon;

  return (
    <section
      id="categories"
      className="relative w-full py-24 sm:py-32 bg-[var(--surface)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-10 sm:mb-12">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
            Dual divisions
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[var(--ink)] leading-[0.95] max-w-3xl">
            Two systems. One plant.
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl text-base">
            Switch between corrosion-proof UPVC envelopes and cryogenic PIR cold rooms —
            both manufactured on the same continuous lines.
          </p>
        </div>

        {/* Always-visible preview row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {SYSTEMS.map((system) => {
            const isActive = system.id === active;
            const SysIcon = system.icon;
            return (
              <button
                key={system.id}
                type="button"
                onClick={() => setActive(system.id)}
                className={`group relative overflow-hidden text-left h-44 sm:h-52 transition-all ${
                  isActive
                    ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--surface)]'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={system.image}
                  alt={system.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-heading text-xl sm:text-2xl font-bold uppercase text-white leading-tight">
                      {system.label}
                    </p>
                    <p className="text-xs text-white/70 mt-1">{system.subtitle}</p>
                  </div>
                  <span
                    className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-[var(--accent)] text-white' : 'bg-white/15 text-white'
                    }`}
                  >
                    <SysIcon className="w-5 h-5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel with large image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[var(--ink)] overflow-hidden">
          <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px]">
            <img
              key={data.image}
              src={data.image}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--ink)]/40 hidden lg:block" />
          </div>

          <div className="lg:col-span-5 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                {data.label} division
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase leading-tight mb-3">
              {data.title}
            </h3>
            <p className="text-white/60 mb-8">{data.subtitle}</p>
            <ul className="space-y-3 mb-10">
              {data.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={onOpenRFQ}
              className="inline-flex items-center gap-2 self-start bg-white text-[var(--ink)] px-6 py-3 text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              Specify this system
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
