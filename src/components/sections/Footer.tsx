import React from 'react';
import { ArrowUpRight, ShieldCheck, FileText, Globe, Layers, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#F1F3F5] text-[#111317] pt-20 pb-12 overflow-hidden border-t border-black/10">
      {/* Giant Faded Architectural Background Wordmark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.03] leading-none">
        <div className="font-heading text-[18vw] font-black uppercase tracking-tighter whitespace-nowrap text-center text-black">
          KINETIC STEEL
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Top Grid: Brand & Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          {/* Col 1: Brand & Manifesto (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white border border-[#FF5A1F] flex items-center justify-center shadow-xs">
                <span className="font-mono text-sm font-black text-[#FF5A1F]">K</span>
              </div>
              <span className="font-heading text-xl font-black uppercase tracking-tight text-[#111317]">
                KINETIC<span className="text-[#FF5A1F]">™</span> PANELS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal mb-6 max-w-sm">
              Engineered industrial continuous UPVC roofing sheets and sub-zero PIR cold storage panels manufactured to exceed ASTM E84, FM 4880 Class 1, and ISO 9001:2015 specifications.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#4B5563] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
              <span>FACILITY DISPATCH: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Col 2: Product Portfolios (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[#111317] mb-4 pb-2 border-b border-black/10">
              PRODUCT PORTFOLIO
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#4B5563] uppercase tracking-wider font-semibold">
              <li>
                <a href="#products" className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between">
                  <span>Tri-Shield™ UPVC Roof</span>
                  <span className="text-[10px] text-black/40">UPVC-RF</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#0284C7] transition-colors flex items-center justify-between">
                  <span>CryoCore™ PIR Cold Panels</span>
                  <span className="text-[10px] text-black/40">PIR-CS</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between">
                  <span>CelluMax™ Twin-Wall Cladding</span>
                  <span className="text-[10px] text-black/40">UPVC-WL</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#0284C7] transition-colors flex items-center justify-between">
                  <span>DuraSeal™ Electric Cold Doors</span>
                  <span className="text-[10px] text-black/40">DR-CS</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D97706] transition-colors flex items-center justify-between">
                  <span>LuxGuard™ Daylighting Panels</span>
                  <span className="text-[10px] text-black/40">PC-SKY</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Standards & Certs (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[#111317] mb-4 pb-2 border-b border-black/10">
              AUDITED STANDARDS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#4B5563] uppercase tracking-wider font-semibold">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>ISO 9001:2015 & ISO 14001</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                <span>ASTM E84 Surface Burning (Class A)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>FM Approvals 4880 Class 1</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>CE EN 14509 Structural</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#111317]" />
                <span>RoHS & REACH Heavy Metal Free</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[#111317] mb-4 pb-2 border-b border-black/10">
              SYSTEM LINKS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#4B5563] uppercase tracking-wider font-semibold">
              <li><a href="#about" className="hover:text-[#111317]">Factory Overview</a></li>
              <li><a href="#anatomy" className="hover:text-[#111317]">Panel Anatomy</a></li>
              <li><a href="#categories" className="hover:text-[#111317]">Dual Divisions</a></li>
              <li><a href="#capabilities" className="hover:text-[#111317]">Capabilities</a></li>
              <li><a href="#certifications" className="hover:text-[#111317]">7 Certifications</a></li>
              <li><a href="#contact" className="hover:text-[#111317]">Procurement RFQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#4B5563] uppercase tracking-wider font-semibold">
          <div>
            © {new Date().getFullYear()} KINETIC™ INDUSTRIAL PANELS MANUFACTURING LTD.
          </div>

          <div className="flex items-center gap-6">
            <span>PLANT CODE: KIN-FACILITY-ALPHA</span>
            <span className="text-black/20">|</span>
            <span>HIGH-PRESSURE CONTINUOUS AUTOMATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
