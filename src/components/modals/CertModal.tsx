import React from 'react';
import { Certificate } from '../../types';
import { X, Award, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

interface CertModalProps {
  cert: Certificate | null;
  onClose: () => void;
}

export const CertModal: React.FC<CertModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div
      id="certificate-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-black/15 p-6 sm:p-10 shadow-2xl text-[#111317] my-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 25px 60px -15px ${cert.sealColor}25`
        }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5A1F]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#F8F9FA] border border-black/10 hover:border-[#FF5A1F] text-[#4B5563] hover:text-[#111317] transition-all interactive-target shadow-xs"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Inspection Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-black/10 font-mono text-xs text-[#4B5563] uppercase tracking-wider font-semibold">
          <span className="font-black text-[#111317]">{cert.code}</span>
          <span>//</span>
          <span>INDEPENDENT AUDIT VERIFICATION</span>
        </div>

        {/* Certificate Seal Stamp */}
        <div className="my-6 flex items-center gap-5">
          <div
            className="w-16 h-16 border-2 flex items-center justify-center shrink-0 shadow-sm"
            style={{
              borderColor: cert.sealColor,
              backgroundColor: `${cert.sealColor}10`,
              color: cert.sealColor
            }}
          >
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span
              className="px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest border inline-block mb-1 shadow-xs"
              style={{
                borderColor: `${cert.sealColor}40`,
                backgroundColor: `${cert.sealColor}15`,
                color: cert.sealColor
              }}
            >
              {cert.badge}
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#111317] tracking-tight">
              {cert.title}
            </h2>
            <p className="text-xs font-mono text-[#4B5563] mt-0.5 uppercase tracking-wider font-semibold">
              ISSUED BY: <strong className="text-[#111317]">{cert.issuer}</strong>
            </p>
          </div>
        </div>

        <p className="text-sm font-mono text-[#4B5563] leading-relaxed my-4">
          {cert.description}
        </p>

        {/* Test Parameters & Audit Evidence */}
        <div className="my-6 bg-[#F8F9FA] border border-black/10 p-5 font-mono text-xs">
          <h3 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[#111317] pb-3 border-b border-black/10">
            TESTED & AUDITED METRICS:
          </h3>
          <div className="space-y-2.5 mt-3">
            {cert.testedParameters.map((param, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b border-black/5 uppercase tracking-wider">
                <span className="text-[#4B5563] font-medium">{param.label}</span>
                <span className="text-emerald-600 font-bold">{param.result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validity Footer */}
        <div className="flex items-center justify-between text-xs font-mono text-[#4B5563] pt-4 border-t border-black/10 uppercase tracking-wider font-semibold">
          <div>
            <span>DATE OF AUDIT: </span>
            <strong className="text-[#111317]">{cert.issueDate}</strong>
          </div>
          <div>
            <span>VALID UNTIL: </span>
            <strong className="text-[#FF5A1F]">{cert.validThrough}</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-black/10 flex justify-end">
          <button
            onClick={() => {
              alert(`Downloading full certified audit report for ${cert.title}`);
            }}
            className="px-5 py-2.5 bg-[#FF5A1F] text-white font-mono text-xs font-black tracking-widest uppercase flex items-center gap-2 hover:bg-[#111317] transition-all interactive-target shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD AUDIT DOCUMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
