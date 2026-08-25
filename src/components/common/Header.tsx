import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ArrowUpRight, Menu, X, PhoneCall, Radio, FileSpreadsheet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  onOpenRFQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRFQ }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Smooth header transition from transparent over hero to solid blurred slate
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 120) {
            // Scrolled past hero
            gsap.to(header, {
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              paddingTop: '0.85rem',
              paddingBottom: '0.85rem',
              duration: 0.3,
              ease: 'power2.out'
            });
          } else if (self.scroll() <= 120) {
            // Back at hero
            gsap.to(header, {
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
              backdropFilter: 'blur(0px)',
              borderColor: 'rgba(0, 0, 0, 0.0)',
              paddingTop: '1.25rem',
              paddingBottom: '1.25rem',
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      });

      // Global scroll progress bar
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(Math.round(self.progress * 100));
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about', index: '01' },
    { name: 'ANATOMY', href: '#anatomy', index: '02' },
    { name: 'PRODUCTS', href: '#products', index: '03' },
    { name: 'SYSTEMS', href: '#categories', index: '04' },
    { name: 'CAPABILITY', href: '#capabilities', index: '05' },
    { name: 'CERTS', href: '#certifications', index: '06' },
    { name: 'TESTIMONIALS', href: '#testimonials', index: '07' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#FF5A1F] via-[#FFB627] to-[#FF5A1F] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        ref={headerRef}
        id="main-header"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-4 sm:px-8 py-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Wordmark & Technical Code */}
          <a
            href="#"
            id="brand-logo"
            className="group flex items-center gap-3 interactive-target text-left"
          >
            <div className="w-8 h-8 bg-[#FF5A1F] flex items-center justify-center font-black italic text-black text-xl shadow-[0_0_15px_rgba(255,90,31,0.3)] transition-transform group-hover:scale-105">
              K
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-xs sm:text-sm text-[#111317] group-hover:text-[#FF5A1F] transition-colors">
                  KINETIC<span className="text-[#FF5A1F]"> / </span>PANELS
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#4B5563] uppercase hidden md:block opacity-75">
                INDUSTRIAL ARMORING SYSTEMS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-[10px] uppercase tracking-widest font-semibold opacity-85">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center gap-1.5 text-[#111317] hover:text-[#FF5A1F] hover:opacity-100 transition-all py-1 relative interactive-target"
              >
                <span className="text-[9px] text-[#FF5A1F] font-mono group-hover:text-[#FF5A1F]">
                  {item.index}
                </span>
                <span className="tracking-widest">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF5A1F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Plant Live Status & Quick Action Button */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-white border border-black/10 text-[10px] font-mono text-[#4B5563] tracking-widest uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span>DISPATCH: ACTIVE</span>
            </div>

            {/* Request Quote Button */}
            <button
              onClick={onOpenRFQ}
              id="header-quote-btn"
              className="bg-[#FF5A1F] text-white px-5 py-2.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs uppercase font-black tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2 interactive-target shadow-[0_0_20px_rgba(255,90,31,0.3)]"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-white border border-black/10 text-[#111317] hover:text-[#FF5A1F] interactive-target"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden mt-4 pt-4 pb-6 px-6 bg-white/95 border-t border-b border-black/10 backdrop-blur-2xl flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/10 text-xs font-mono text-[#4B5563]">
              <span>SYSTEM DIRECTORY</span>
              <span className="text-[#FF5A1F]">07 PROTOCOLS</span>
            </div>
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-mono tracking-wider text-[#111317] hover:text-[#FF5A1F] py-2 border-b border-black/5"
              >
                <span>{item.name}</span>
                <span className="text-xs text-[#FF5A1F] font-mono">{item.index}</span>
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="tel:+18005557833"
                className="flex items-center justify-center gap-2 py-2.5 bg-[#F8F9FA] border border-black/10 text-xs font-mono text-[#111317]"
              >
                <PhoneCall className="w-4 h-4 text-[#FF5A1F]" />
                <span>+1 (800) 555-STEEL</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 bg-[#FF5A1F] text-white font-mono text-xs font-bold tracking-wider uppercase text-center"
              >
                REQUEST PROJECT QUOTE
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
