import React from 'react';
import { Product } from '../../types';
import { X, Download, Check, ChevronRight } from 'lucide-react';

interface ProductSpecModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenRFQ: () => void;
}

export const ProductSpecModal: React.FC<ProductSpecModalProps> = ({
  product,
  onClose,
  onOpenRFQ
}) => {
  if (!product) return null;

  return (
    <div
      id="product-spec-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-black/15 p-6 sm:p-10 shadow-2xl text-[var(--ink)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--accent)]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[var(--bg)] border border-black/10 hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] transition-all interactive-target shadow-xs"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-black/10 font-mono text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
          <span className="text-[var(--accent)] font-black">{product.code}</span>
          <span>//</span>
          <span>CAD TECHNICAL DATA SHEET</span>
          <span>//</span>
          <span className="text-emerald-600 font-bold">ASTM CERTIFIED</span>
        </div>

        <div className="my-6">
          <h2 className="font-heading text-2xl sm:text-4xl font-black uppercase text-[var(--ink)] tracking-tight">
            {product.name}
          </h2>
          <p className="text-sm font-mono text-[var(--muted)] mt-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Two-Column Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {/* Left: Product Image & Color Swatches */}
          <div>
            <div className="relative h-60 w-full overflow-hidden border border-black/10 bg-[var(--bg)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-white/95 border border-black/10 font-mono text-xs text-[var(--ink)] uppercase font-bold tracking-wider shadow-xs">
                SECTION PROFILE // 1:1 CAD SCALE
              </div>
            </div>

            {/* Standard Available Colors */}
            <div className="mt-4 pt-4 border-t border-black/10">
              <span className="text-xs font-mono text-[var(--muted)] block mb-2 uppercase tracking-wider font-bold">
                AVAILABLE FACTORY FINISHES:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((color) => (
                  <span
                    key={color}
                    className="px-2.5 py-1 bg-[var(--bg)] border border-black/10 font-mono text-xs text-[var(--ink)] uppercase font-bold"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Specification Matrix */}
          <div className="bg-[var(--bg)] border border-black/10 p-5 font-mono text-xs space-y-3">
            <h3 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)] pb-2 border-b border-black/10">
              ENGINEERING PARAMETERS
            </h3>

            <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
              <span className="text-[var(--muted)]">GAUGE / THICKNESS:</span>
              <span className="text-[var(--ink)] font-bold">{product.thickness}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
              <span className="text-[var(--muted)]">STANDARD WIDTH:</span>
              <span className="text-[var(--ink)] font-bold">{product.standardWidth}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
              <span className="text-[var(--muted)]">THERMAL RESISTANCE:</span>
              <span className="text-[var(--accent)] font-bold">{product.thermalRating}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
              <span className="text-[var(--muted)]">FIRE RETARDANCY:</span>
              <span className="text-[var(--brass)] font-bold">{product.fireRating}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
              <span className="text-[var(--muted)]">MAX PURLIN SPAN:</span>
              <span className="text-[var(--ink)] font-bold">{product.spanCapacity}</span>
            </div>

            {product.density && (
              <div className="flex justify-between py-1 border-b border-black/5 uppercase tracking-wider">
                <span className="text-[var(--muted)]">CORE DENSITY:</span>
                <span className="text-emerald-600 font-bold">{product.density}</span>
              </div>
            )}
          </div>
        </div>

        {/* Features & Key Engineering Advantages */}
        <div className="my-6 pt-4 border-t border-black/10">
          <h3 className="text-xs font-mono font-black uppercase text-[var(--ink)] tracking-[0.2em] mb-3">
            STRUCTURAL & CHEMICAL ADVANTAGES:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[var(--muted)] font-mono font-medium">
                <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              alert(`Downloading complete engineering CAD packet & ASTM report for ${product.name} (PDF)`);
            }}
            className="px-5 py-3 bg-[var(--bg)] border border-black/15 hover:border-[var(--accent)] font-mono text-xs font-black uppercase tracking-wider text-[var(--ink)] flex items-center gap-2 transition-all interactive-target shadow-xs"
          >
            <Download className="w-4 h-4 text-[var(--accent)]" />
            <span>DOWNLOAD SPEC SHEET (PDF)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRFQ();
            }}
            className="px-6 py-3 bg-[var(--accent)] text-white font-mono text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[var(--ink)] hover:text-white transition-all interactive-target shadow-md"
          >
            <span>REQUEST QUOTE FOR THIS SPEC</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
