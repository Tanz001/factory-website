import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Product, Certificate } from './types';
import { CustomCursor } from './components/common/CustomCursor';
import { Header } from './components/common/Header';
import { FloatingActions } from './components/common/FloatingActions';
import { HeroSection } from './components/sections/HeroSection';
import { AboutFactory } from './components/sections/AboutFactory';
import { PanelAssemblySignature } from './components/sections/PanelAssemblySignature';
import { ProductsShowcase } from './components/sections/ProductsShowcase';
import { CategorySplitExperience } from './components/sections/CategorySplitExperience';
import { ManufacturingCapabilities } from './components/sections/ManufacturingCapabilities';
import { TestimonialsDraggable } from './components/sections/TestimonialsDraggable';
import { CertificationsGrid } from './components/sections/CertificationsGrid';
import { ContactRFQSection } from './components/sections/ContactRFQSection';
import { Footer } from './components/sections/Footer';
import { ProductSpecModal } from './components/modals/ProductSpecModal';
import { CertModal } from './components/modals/CertModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Initialize Lenis and sync with GSAP ScrollTrigger Ticker
  useEffect(() => {
    // Check if user prefers reduced motion or is on mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll events with ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's ticker to Lenis's raf method
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after elements finish rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleOpenRFQ = () => {
    const rfqSection = document.getElementById('contact');
    if (rfqSection) {
      rfqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* Precision Reticle Crosshair Cursor on Desktop */}
      <CustomCursor />

      {/* Sticky High-Precision Header with Scroll Progress */}
      <Header onOpenRFQ={handleOpenRFQ} />

      {/* Floating Action Hub (WhatsApp + Instant RFQ + Scroll Top) */}
      <FloatingActions onOpenRFQ={handleOpenRFQ} />

      <main className="w-full">
        {/* Section 1: Hero Section with 3-Image Rotating Crossfade Stack & Scrub Parallax */}
        <HeroSection onOpenRFQ={handleOpenRFQ} />

        {/* Section 2: About Factory with Asymmetrical Grid & Animated Numerical Stat Counters */}
        <AboutFactory />

        {/* Section 3: Signature Scroll Moment — 4-Layer Pinned Panel Assembly Sequence */}
        <PanelAssemblySignature />

        {/* Section 4: Products Showcase with Unconventional Technical Grid */}
        <ProductsShowcase
          onSelectProduct={setSelectedProduct}
          onOpenRFQ={handleOpenRFQ}
        />

        {/* Section 5: Dual Division Split Experience + Factory Conveyor MotionPath */}
        <CategorySplitExperience onOpenRFQ={handleOpenRFQ} />

        {/* Section 6: Manufacturing Capabilities (6 Precision Benchmarks) */}
        <ManufacturingCapabilities />

        {/* Section 7: 7 Metallic & Embossed Certifications Grid */}
        <CertificationsGrid onSelectCert={setSelectedCert} />

        {/* Section 8: Draggable & Perspective 3D Testimonials Carousel */}
        <TestimonialsDraggable />

        {/* Section 9: Technical RFQ Specification Engine & Global Plant Headquarters */}
        <ContactRFQSection />
      </main>

      {/* Architectural Dark Footer with Giant Watermark */}
      <Footer />

      {/* Interactive Modal: CAD Product Spec Sheet */}
      <ProductSpecModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenRFQ={handleOpenRFQ}
      />

      {/* Interactive Modal: Independent Audit Certification */}
      <CertModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
