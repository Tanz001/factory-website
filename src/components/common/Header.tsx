import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  onOpenRFQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRFQ }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -60',
        end: 99999,
        onUpdate: (self) => {
          setScrolled(self.scroll() > 80);
        },
      });

      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Systems', href: '#categories' },
    { name: 'Capability', href: '#capabilities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        ref={headerRef}
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 ${
          scrolled
            ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-[var(--line)] shadow-[0_8px_30px_rgba(9,17,26,0.06)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <div
              className={`w-9 h-9 flex items-center justify-center font-heading text-sm font-extrabold transition-colors ${
                scrolled
                  ? 'bg-[var(--ink)] text-white'
                  : 'bg-white text-[var(--ink)]'
              }`}
            >
              SN
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-wide transition-colors ${
                  scrolled ? 'text-[var(--ink)]' : 'text-white'
                }`}
              >
                SN Star
              </span>
              <span
                className={`font-mono-tech text-[9px] uppercase tracking-[0.22em] mt-0.5 ${
                  scrolled ? 'text-[var(--muted)]' : 'text-white/55'
                }`}
              >
                Engineering
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  scrolled
                    ? 'text-[var(--ink-soft)] hover:text-[var(--accent)]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRFQ}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                scrolled
                  ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-deep)]'
                  : 'bg-white text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white'
              }`}
            >
              Get a quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                scrolled
                  ? 'text-[var(--ink)] bg-[var(--elevated)]'
                  : 'text-white bg-white/10'
              }`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-5 bg-white border border-[var(--line)] shadow-xl flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-base font-medium text-[var(--ink)] border-b border-[var(--line)] hover:text-[var(--accent)]"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRFQ();
              }}
              className="mt-3 w-full py-3 bg-[var(--accent)] text-white text-sm font-semibold uppercase tracking-wider"
            >
              Request quote
            </button>
          </div>
        )}
      </header>
    </>
  );
};
