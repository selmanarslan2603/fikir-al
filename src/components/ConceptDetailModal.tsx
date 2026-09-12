import React, { useState } from 'react';
import { X, Check, Palette, Sparkles, Pin, ArrowRight, Layers } from 'lucide-react';
import { CorkboardNote } from '../types';

interface ConceptDetailModalProps {
  note: CorkboardNote | null;
  onClose: () => void;
  onRequestSimilar: (category: string) => void;
}

export const ConceptDetailModal: React.FC<ConceptDetailModalProps> = ({
  note,
  onClose,
  onRequestSimilar,
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!note) return null;

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-9 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative pushpin */}
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.5)] border border-white/30 flex items-center justify-center z-10"
          style={{ backgroundColor: note.pinColor }}
        >
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-[#221D19]/10 text-[#221D19]">
              {note.category}
            </span>
            <span className="text-xs text-[#6B5C46] font-mono">
              Konsept #{note.id.replace('note-', '')}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#221D19]">
            {note.title}
          </h3>
          <p className="text-sm text-[#6B5C46] mt-1">
            {note.desc}
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-5 border-t border-[#C9BA9B] pt-5">
          {/* Problem / Brief */}
          <div className="bg-[#E4D6B8]/70 p-4 rounded-xs border border-[#C9BA9B]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#A24E30] mb-1">
              Başlangıç Noktası (Problem)
            </div>
            <p className="text-sm text-[#221D19] leading-relaxed m-0">
              {note.expandedDetails.problem}
            </p>
          </div>

          {/* Solution / Concept */}
          <div className="bg-white/70 p-4 rounded-xs border border-[#C9BA9B]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#3E5A73] mb-1">
              Panodaki Fikir & Taslak Yönü
            </div>
            <p className="text-sm text-[#221D19] leading-relaxed m-0">
              {note.expandedDetails.conceptSolution}
            </p>
          </div>

          {/* Color Palette */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B5C46] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Renk Paleti (Tıklayarak Kopyala)
              </span>
              {copiedColor && (
                <span className="text-emerald-700 text-[11px] font-semibold">
                  {copiedColor} Kopyalandı!
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {note.expandedDetails.colorPalette.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => copyColor(color)}
                  className="group p-2 rounded-xs border border-black/15 bg-white/50 hover:bg-white text-center transition-colors cursor-pointer"
                >
                  <div
                    className="w-full h-8 rounded-xs shadow-xs mb-1.5 border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-mono font-bold text-[#221D19] group-hover:text-[#A24E30]">
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Materials */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B5C46] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Önerilen Malzeme & Doku Hissi
            </div>
            <div className="flex flex-wrap gap-1.5">
              {note.expandedDetails.suggestedMaterials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xs bg-[#221D19]/10 text-xs text-[#221D19] font-medium"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-5 border-t border-[#C9BA9B] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6B5C46] hover:text-[#221D19] px-3 py-2"
          >
            Kapat
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestSimilar(note.category);
            }}
            className="px-5 py-2.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] font-semibold text-xs rounded-xs flex items-center gap-1.5 transition-colors shadow-[3px_3px_0_rgba(0,0,0,0.25)]"
          >
            <span>Benzer Fikir İste (150 TL Kapora)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
