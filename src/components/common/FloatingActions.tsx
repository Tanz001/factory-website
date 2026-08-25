import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenRFQ: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenRFQ }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="floating-actions-hub"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Scroll to Top Trigger */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top-btn"
          className="w-11 h-11 bg-white text-[#111317] border border-black/10 hover:border-[#FF5A1F] hover:text-[#FF5A1F] flex items-center justify-center transition-all shadow-md interactive-target group relative"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          <span className="sr-only">Top</span>
        </button>
      )}

      {/* Direct RFQ / Email Trigger */}
      <button
        onClick={onOpenRFQ}
        id="floating-rfq-btn"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-white text-[#111317] border border-black/10 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all shadow-lg interactive-target"
        aria-label="Quick Technical Quote"
      >
        <Mail className="w-4 h-4 text-[#FF5A1F]" />
        <span className="text-xs font-mono font-black uppercase tracking-wider hidden sm:inline-block">
          QUICK RFQ
        </span>
        {/* Reticle corner marks */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
      </button>

      {/* Floating WhatsApp with live glow beacon */}
      <a
        href="https://wa.me/18005557833?text=Hello%2C%20I%20would%20like%20a%20technical%20spec%20and%20pricing%20quote%20for%20KINETIC%20Industrial%20Panels."
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="relative group flex items-center gap-3 px-4 py-3.5 bg-[#25D366] text-black font-mono text-xs font-black tracking-widest uppercase transition-all hover:bg-white shadow-[0_0_25px_rgba(37,211,102,0.4)] interactive-target"
      >
        {/* Radar Pulse animation */}
        <span className="absolute -inset-1 rounded-none bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        
        <MessageCircle className="w-5 h-5 relative z-10 fill-current" />
        <span className="relative z-10 font-black hidden sm:inline-block tracking-widest">
          WHATSAPP ENGINEERING
        </span>
        <span className="relative z-10 sm:hidden">CHAT</span>

        {/* Reticle corners */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-black" />
      </a>
    </div>
  );
};
