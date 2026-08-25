import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Building } from 'lucide-react';
import { RFQFormState } from '../../types';

interface ContactRFQSectionProps {
  initialPanelType?: string;
}

const inputClass =
  'w-full bg-[var(--bg)] border border-[var(--line-strong)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none transition-colors';

export const ContactRFQSection: React.FC<ContactRFQSectionProps> = ({
  initialPanelType = 'upvc-roof',
}) => {
  const [form, setForm] = useState<RFQFormState>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    panelType: initialPanelType,
    thickness: '75mm',
    estimatedArea: '25000',
    temperatureRequirement: 'ambient',
    projectLocation: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const areaNum = Number(form.estimatedArea) || 0;
  const estimatedTonnage = (
    (areaNum * 0.0929 * (form.panelType.includes('cold') ? 12 : 3.8)) /
    1000
  ).toFixed(1);
  const estimatedRValue =
    form.thickness === '50mm'
      ? 'R-16.4'
      : form.thickness === '75mm'
      ? 'R-24.6'
      : form.thickness === '100mm'
      ? 'R-32.8'
      : 'R-49.2';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 bg-[var(--surface)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="mb-12">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
            Request a quote
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[var(--ink)] leading-[0.95]">
            Direct factory RFQ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7 bg-[var(--bg)] border border-[var(--line)] p-6 sm:p-9">
            {isSubmitted ? (
              <div className="py-14 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-[var(--ink)] mb-2">
                  Specification received
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-md">
                  Your request for {areaNum.toLocaleString()} sq. ft. has been queued for
                  engineering review. Expect a response within 4 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2.5 bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-colors"
                >
                  Submit another RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className={inputClass}
                      placeholder="Alex Wright"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="a.wright@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder="EPC / Contractor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Panel system
                    </label>
                    <select
                      value={form.panelType}
                      onChange={(e) => setForm({ ...form, panelType: e.target.value })}
                      className={inputClass}
                    >
                      <option value="upvc-roof">UPVC Corrugated Roof</option>
                      <option value="pu-cold-storage">PIR Cold Storage</option>
                      <option value="upvc-wall">UPVC Twin-Wall Cladding</option>
                      <option value="heavy-door">Cold Room Sliding Door</option>
                      <option value="polycarbonate">Polycarbonate Daylighting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                      Thickness
                    </label>
                    <select
                      value={form.thickness}
                      onChange={(e) => setForm({ ...form, thickness: e.target.value })}
                      className={inputClass}
                    >
                      <option value="2.5mm">2.5 mm UPVC</option>
                      <option value="3.0mm">3.0 mm UPVC Heavy</option>
                      <option value="50mm">50 mm PIR</option>
                      <option value="75mm">75 mm PIR</option>
                      <option value="100mm">100 mm PIR</option>
                      <option value="150mm">150 mm PIR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-[var(--muted)] uppercase tracking-wider">
                      Estimated area
                    </span>
                    <span className="font-semibold text-[var(--accent)]">
                      {areaNum.toLocaleString()} sq. ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    value={form.estimatedArea}
                    onChange={(e) => setForm({ ...form, estimatedArea: e.target.value })}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-[var(--surface)] border border-[var(--line)] text-xs">
                  <div>
                    <p className="text-[var(--muted)] mb-0.5">Metric area</p>
                    <p className="font-semibold text-[var(--ink)]">
                      {(areaNum * 0.0929).toFixed(0)} m²
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--muted)] mb-0.5">Freight</p>
                    <p className="font-semibold text-[var(--ink)]">~{estimatedTonnage} t</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted)] mb-0.5">Thermal</p>
                    <p className="font-semibold text-[var(--accent)]">{estimatedRValue}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                    Project location
                  </label>
                  <input
                    type="text"
                    value={form.projectLocation}
                    onChange={(e) => setForm({ ...form, projectLocation: e.target.value })}
                    className={inputClass}
                    placeholder="City, country / port"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={inputClass}
                    placeholder="Chemical exposure, fire certs, RAL colors…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--accent)] text-white text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--accent-deep)] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Sending…</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit RFQ
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative h-52 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484265500982-34aebf76c655?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial metal roofing at SN Star Engineering plant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--ink)]/45" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <p className="font-heading text-xl font-bold uppercase">Plant Alpha</p>
                <p className="text-sm text-white/70">Steel Harbor · Port Berth 12</p>
              </div>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--bg)] space-y-4">
              <div className="flex items-center gap-2 text-[var(--accent)] mb-1">
                <Building className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Headquarters</span>
              </div>
              <div className="flex gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-[var(--muted)]">
                  SN Star Engineering Zone, Gate 04, Steel Harbor Parkway
                </span>
              </div>
              <div className="flex gap-3 text-sm items-center">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">+1 (800) 555-7833</span>
              </div>
              <div className="flex gap-3 text-sm items-center">
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">rfq@snstarengineering.com</span>
              </div>
              <div className="flex gap-3 text-sm items-center">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="text-[var(--muted)]">24/7 dispatch · Reply in 4 hrs</span>
              </div>
            </div>

            <a
              href="https://wa.me/18005557833?text=Hi%2C%20I%20have%20an%20industrial%20panel%20RFQ%20for%20SN%20Star%20Engineering."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-[#25D366] text-[var(--ink)] hover:brightness-105 transition-all"
            >
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 shrink-0" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-semibold">Need a fast answer?</p>
                  <p className="text-sm opacity-80">Chat with engineering on WhatsApp</p>
                </div>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">Open chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
