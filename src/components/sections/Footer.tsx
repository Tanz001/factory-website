import React from 'react';
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sn-star-engineering',
    icon: Linkedin,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/snstarengineering',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/snstarengineering',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@snstarengineering',
    icon: Youtube,
  },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[var(--ink)] text-white pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-mesh opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[var(--accent)] flex items-center justify-center font-heading text-sm font-extrabold text-white">
                SN
              </div>
              <span className="font-heading text-2xl font-bold uppercase tracking-wide">
                SN Star Engineering
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm mb-6">
              Continuous UPVC roofing and sub-zero PIR cold storage panels —
              manufactured for chemical, coastal, and cryogenic facilities.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors"
            >
              Request a factory quote
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><a href="#products" className="hover:text-white transition-colors">UPVC Roof Panels</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">PIR Cold Storage</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Wall Cladding</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cold Room Doors</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-white/55 mb-6">
              <li>
                <a
                  href="mailto:info@snstarengineering.com"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  info@snstarengineering.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:rfq@snstarengineering.com"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  rfq@snstarengineering.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18005557833"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  +1 (800) 555-7833
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>
                  Gate 04, Steel Harbor Parkway
                  <br />
                  Industrial Zone, Sector 9A
                </span>
              </li>
            </ul>

            <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Follow us</p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/70 hover:border-[var(--accent)] hover:text-white hover:bg-[var(--accent)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="https://x.com/snstareng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/70 hover:border-[var(--accent)] hover:text-white hover:bg-[var(--accent)] transition-all"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SN Star Engineering. All rights reserved.</p>
          <p className="font-mono-tech uppercase tracking-wider">Demo contact · Replace with live details</p>
        </div>
      </div>
    </footer>
  );
};
