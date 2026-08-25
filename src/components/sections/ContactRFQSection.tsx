import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Calculator, FileText, Building } from 'lucide-react';
import { RFQFormState } from '../../types';

interface ContactRFQSectionProps {
  initialPanelType?: string;
}

export const ContactRFQSection: React.FC<ContactRFQSectionProps> = ({ initialPanelType = 'upvc-roof' }) => {
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
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time thermal / weight calculation
  const areaNum = Number(form.estimatedArea) || 0;
  const estimatedTonnage = ((areaNum * 0.0929 * (form.panelType.includes('cold') ? 12 : 3.8)) / 1000).toFixed(1);
  const estimatedRValue = form.thickness === '50mm' ? 'R-16.4' : form.thickness === '75mm' ? 'R-24.6' : form.thickness === '100mm' ? 'R-32.8' : 'R-49.2';

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
      className="relative w-full py-28 bg-[#F8F9FA] text-[#111317] overflow-hidden border-t border-black/10"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] font-black tracking-tighter text-black select-none pointer-events-none opacity-[0.02] leading-none uppercase z-0">
        PROCUREMENT
      </div>

      {/* Radial Dot Grid */}
      <div className="absolute inset-0 bg-radial-dots opacity-[0.025] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Preheader */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
            08 // TECHNICAL PROCUREMENT & RFQ
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111317] tracking-tight mb-16 leading-[1.0]">
          REQUEST DIRECT FACTORY QUOTE
        </h2>

        {/* Split Two-Column Technical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Interactive RFQ Calculator & Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-black/10 p-6 sm:p-10 shadow-lg relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

            <div className="flex items-center justify-between pb-4 border-b border-black/10 font-mono text-xs mb-8">
              <div className="flex items-center gap-2 text-[#FF5A1F]">
                <Calculator className="w-4 h-4" />
                <span className="font-black uppercase tracking-wider">SPECIFICATION CALCULATOR // RFQ ENGINE</span>
              </div>
              <span className="text-[#4B5563] uppercase tracking-wider text-[10px] font-bold">RESPONSE WITHIN 4 HOURS</span>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#FF5A1F]/10 border border-[#FF5A1F] flex items-center justify-center mb-6 text-[#FF5A1F]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-black uppercase text-[#111317]">
                  TECHNICAL SPECIFICATION RECEIVED
                </h3>
                <p className="text-sm font-mono text-[#4B5563] max-w-md mt-2 leading-relaxed">
                  Your project requirements for <strong className="text-[#111317]">{areaNum.toLocaleString()} sq. ft.</strong> of <strong className="text-[#FF5A1F]">{form.panelType.toUpperCase()}</strong> have been assigned to Senior Engineering Desk #4.
                </p>
                <div className="mt-8 p-4 bg-[#F8F9FA] border border-black/10 font-mono text-xs text-[#4B5563]">
                  TICKET ID: <span className="text-[#FF5A1F] font-bold">RFQ-{Math.floor(100000 + Math.random() * 900000)}</span> // DISPATCH QUEUE: NORMAL
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2.5 bg-[#111317] text-white hover:bg-[#FF5A1F] font-mono text-xs font-black uppercase tracking-wider transition-all shadow-xs"
                >
                  SUBMIT ANOTHER RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Contact Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Alexander Wright"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      CORPORATE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="a.wright@contracting.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      COMPANY / EPC CONTRACTOR
                    </label>
                    <input
                      type="text"
                      placeholder="Vanguard Industrial EPC Ltd."
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Technical Scope Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10">
                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      PANEL SYSTEM TYPE
                    </label>
                    <select
                      value={form.panelType}
                      onChange={(e) => setForm({ ...form, panelType: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none"
                    >
                      <option value="upvc-roof">UPVC 3-Layer Corrugated Roof Panel</option>
                      <option value="pu-cold-storage">CryoCore™ PIR Cold Storage (-45°C)</option>
                      <option value="upvc-wall">UPVC Twin-Wall Anti-Acid Cladding</option>
                      <option value="heavy-door">DuraSeal™ Electric Cold Room Sliding Door</option>
                      <option value="polycarbonate">LuxGuard™ Polycarbonate Daylighting Panel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                      SPECIFIED THICKNESS
                    </label>
                    <select
                      value={form.thickness}
                      onChange={(e) => setForm({ ...form, thickness: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none"
                    >
                      <option value="2.5mm">2.5 mm (Standard UPVC Corrugated)</option>
                      <option value="3.0mm">3.0 mm (Heavy Chemical Acid Plant)</option>
                      <option value="50mm">50 mm PIR (Chill Room 0°C to +10°C)</option>
                      <option value="75mm">75 mm PIR (Cold Storage -5°C to -18°C)</option>
                      <option value="100mm">100 mm PIR (Deep Freeze -25°C)</option>
                      <option value="150mm">150 mm PIR (Blast Freezer -45°C)</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Area Slider & Real-Time Specs */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#4B5563] uppercase tracking-wider font-bold">ESTIMATED ENVELOPE AREA (SQ. FT.)</span>
                    <span className="text-[#FF5A1F] font-black">{areaNum.toLocaleString()} SQ. FT.</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    value={form.estimatedArea}
                    onChange={(e) => setForm({ ...form, estimatedArea: e.target.value })}
                    className="w-full h-2 bg-[#E5E7EB] rounded-none accent-[#FF5A1F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#4B5563] mt-1 uppercase tracking-wider font-semibold">
                    <span>5,000 SQ. FT.</span>
                    <span>125,000 SQ. FT.</span>
                    <span>250,000+ SQ. FT.</span>
                  </div>
                </div>

                {/* Real-time calculated engineering estimate */}
                <div className="p-4 bg-[#F8F9FA] border border-black/10 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase tracking-wider font-bold">EST. METRIC AREA</span>
                    <span className="text-[#111317] font-bold">{(areaNum * 0.0929).toFixed(0)} m²</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4B5563] block uppercase tracking-wider font-bold">EST. FREIGHT TONNAGE</span>
                    <span className="text-[#D97706] font-bold">~{estimatedTonnage} Metric Tons</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#4B5563] block uppercase tracking-wider font-bold">THERMAL ENVELOPE</span>
                    <span className="text-emerald-600 font-bold">{estimatedRValue}</span>
                  </div>
                </div>

                {/* Project Location & Notes */}
                <div>
                  <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                    PROJECT SITE LOCATION & DISPATCH PORT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Antwerp Port Logistic Zone, Belgium"
                    value={form.projectLocation}
                    onChange={(e) => setForm({ ...form, projectLocation: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#4B5563] mb-2 uppercase tracking-wider font-bold">
                    ADDITIONAL SPECIFICATIONS / STRUCTURAL CRITERIA
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Note chemical exposure levels, required fire certificates, or custom color RAL codes..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-black/10 px-4 py-3 text-sm text-[#111317] font-mono focus:border-[#FF5A1F] focus:outline-none"
                  />
                </div>

                {/* Submit Action with Magnetic Feel */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FF5A1F] text-white font-mono text-sm font-black tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#111317] hover:text-white transition-all interactive-target shadow-[0_0_25px_rgba(255,90,31,0.25)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>PROCESSING ENGINEERING PACKET...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT FOR FACTORY ENGINEERING REVIEW</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Global Plant Headquarters & Technical Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              {/* Heavy Plant Specifications Box */}
              <div className="p-6 bg-white border border-black/10 relative shadow-xs">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

                <div className="flex items-center gap-3 text-[#FF5A1F] pb-4 border-b border-black/10 font-mono text-xs font-black uppercase tracking-wider">
                  <Building className="w-4 h-4" />
                  <span>PLANT HEADQUARTERS & MANUFACTURING HUB</span>
                </div>

                <div className="mt-4 space-y-4 font-mono text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#111317] block uppercase tracking-wider">Main Continuous Extrusion Plant:</strong>
                      <span className="text-[#4B5563]">
                        KINETIC Heavy Industrial Zone, Gate 04, Steel Harbor Parkway, Sector 9A
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                    <div>
                      <strong className="text-[#111317] uppercase tracking-wider">Direct Engineering Line:</strong>{' '}
                      <span className="text-[#4B5563] font-semibold">+1 (800) 555-STEEL / +1 (800) 555-7833</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                    <div>
                      <strong className="text-[#111317] uppercase tracking-wider">RFQ & Specification Desk:</strong>{' '}
                      <span className="text-[#4B5563] font-semibold">rfq@kinetic-panels.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                    <div>
                      <strong className="text-[#111317] uppercase tracking-wider">Production Shifts:</strong>{' '}
                      <span className="text-emerald-600 font-bold">24/7 Automated Continuous Dispatch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled Industrial Technical Map Frame */}
              <div className="relative h-64 w-full bg-white border border-black/10 overflow-hidden flex items-center justify-center shadow-xs">
                {/* Radial dots background */}
                <div className="absolute inset-0 bg-radial-dots opacity-40" />

                {/* Map Radar Target Reticle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-[#FF5A1F] flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-[#FF5A1F] rounded-full shadow-[0_0_15px_#FF5A1F]" />
                  </div>
                  <div className="mt-3 px-3 py-1 bg-[#F8F9FA] border border-black/10 font-mono text-[11px] text-[#111317] uppercase font-bold tracking-wider shadow-xs">
                    PLANT ALPHA // PORT BERTH 12
                  </div>
                  <span className="text-[9px] font-mono text-[#4B5563] mt-0.5 uppercase tracking-widest font-semibold">
                    DIRECT RAIL & CONTAINER CRANE ACCESS
                  </span>
                </div>

                {/* Technical Coordinates overlay */}
                <div className="absolute bottom-2 left-3 font-mono text-[10px] text-[#4B5563] font-semibold">
                  N 51° 55' 28" / E 4° 28' 45"
                </div>
                <div className="absolute top-2 right-3 font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider font-bold">
                  CRANE ACCESS: 45T TANDEM
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="p-5 bg-white border border-[#25D366]/40 flex items-center justify-between shadow-xs">
              <div>
                <h4 className="font-heading text-sm font-black uppercase text-[#111317]">
                  Urgent Project Dispatch?
                </h4>
                <p className="text-xs font-mono text-[#4B5563] mt-0.5">
                  Connect instantly with our on-duty structural engineer.
                </p>
              </div>
              <a
                href="https://wa.me/18005557833?text=Hi%2C%20I%20have%20an%20urgent%20industrial%20panel%20RFQ%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white font-mono text-xs font-black tracking-widest uppercase hover:bg-[#111317] transition-all interactive-target shadow-xs"
              >
                WHATSAPP NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
