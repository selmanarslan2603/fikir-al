import React, { useState } from 'react';
import { ArrowRight, Pin, Sparkles, Plus, Eye, Palette } from 'lucide-react';
import { CorkboardNote } from '../types';

interface HeroCorkboardProps {
  notes: CorkboardNote[];
  onOpenBriefModal: (preselectedCategory?: string) => void;
  onSelectNote: (note: CorkboardNote) => void;
  onAddQuickNote: () => void;
}

export const HeroCorkboard: React.FC<HeroCorkboardProps> = ({
  notes,
  onOpenBriefModal,
  onSelectNote,
  onAddQuickNote,
}) => {
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);

  return (
    <div id="hero-board" className="relative py-16 sm:py-24 px-6 cork-pattern cork-grid border-b border-[#F1E9DC]/10 overflow-hidden">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center relative z-10">
        
        {/* Left: Typography & Action */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#D9A63B]/15 border border-[#D9A63B]/30 text-[#D9A63B] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Tasarım Danışmanlığı & Fikir Atölyesi
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] font-semibold text-[#F1E9DC] tracking-tight">
            Kafandaki tasarımı <br className="hidden sm:inline" />
            <span className="text-[#D9A63B] italic font-normal">somut bir fikre</span> çeviriyorum.
          </h1>

          <p className="text-base sm:text-lg text-[#F1E9DC]/80 max-w-[48ch] leading-relaxed font-normal">
            İç mekan, marka, kıyafet, ambalaj — alanı sen seç, ben karşılığında elle tutulur bir konsept çizeyim. Küçük bir kapora ile başlıyoruz, taslağı görüp karar veriyorsun.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              id="hero-cta-button"
              onClick={() => onOpenBriefModal()}
              className="bg-[#D9A63B] text-[#221D19] px-7 py-3.5 rounded-sm font-semibold text-base shadow-[4px_4px_0_rgba(0,0,0,0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.35)] active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Fikrini Anlat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#nasil"
              className="text-[#F1E9DC] hover:text-[#D9A63B] underline underline-offset-6 text-sm font-medium transition-colors"
            >
              Nasıl işliyor, gör
            </a>

            <button
              onClick={onAddQuickNote}
              className="text-xs text-[#D9A63B] bg-[#221D19]/70 hover:bg-[#3A322B] px-3 py-2 rounded-sm border border-[#D9A63B]/40 flex items-center gap-1.5 transition-colors"
              title="Panoya anlık not raptiyele"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Panoya Not İğnele</span>
            </button>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-[#F1E9DC]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9A63B]"></span>
              <span>150 TL Şeffaf Kapora</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3E5A73]"></span>
              <span>2-3 Günde İlk Taslak</span>
            </div>
          </div>
        </div>

        {/* Right: Tactile Corkboard Cluster */}
        <div className="relative h-[430px] sm:h-[460px] w-full max-w-[480px] mx-auto">
          {/* Thread SVG connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 420" preserveAspectRatio="none">
            <line x1="95" y1="55" x2="200" y2="210" stroke="#B5442E" strokeWidth="2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="300" y1="85" x2="200" y2="210" stroke="#B5442E" strokeWidth="2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="120" y1="330" x2="200" y2="210" stroke="#B5442E" strokeWidth="2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="330" y1="360" x2="200" y2="210" stroke="#B5442E" strokeWidth="2" strokeDasharray="3 3" opacity="0.65" />
            <circle cx="200" cy="210" r="5" fill="#D9A63B" opacity="0.8" />
          </svg>

          {/* Center hint pill */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none bg-[#221D19]/80 backdrop-blur-sm border border-[#F1E9DC]/20 px-2.5 py-1 rounded-full text-[11px] text-[#F1E9DC]/75 flex items-center gap-1 shadow-sm">
            <Eye className="w-3 h-3 text-[#D9A63B]" />
            <span>Notlara tıkla & incele</span>
          </div>

          {/* Note 1 - Top Left */}
          {notes[0] && (
            <div
              id="hero-note-1"
              onClick={() => onSelectNote(notes[0])}
              onMouseEnter={() => setHoveredNoteId(notes[0].id)}
              onMouseLeave={() => setHoveredNoteId(null)}
              className="absolute top-2 left-2 sm:left-4 w-[185px] sm:w-[200px] p-4 sm:p-5 bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.38)] cursor-pointer hover:scale-105 hover:z-20 transition-all duration-200"
              style={{ transform: `rotate(${hoveredNoteId === notes[0].id ? 0 : -6}deg)` }}
            >
              {/* Pushpin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#A24E30] shadow-[0_2px_4px_rgba(0,0,0,0.45)] border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#A24E30] block mb-1">
                {notes[0].tag}
              </span>
              <h4 className="font-display font-bold text-base text-[#221D19] mb-1 leading-snug">
                {notes[0].title}
              </h4>
              <p className="text-xs text-[#221D19]/80 leading-tight mb-2">
                {notes[0].desc}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#221D19]/10 text-[10px] text-[#221D19]/60">
                <span>Konsepti Aç</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Note 2 - Top Right */}
          {notes[1] && (
            <div
              id="hero-note-2"
              onClick={() => onSelectNote(notes[1])}
              onMouseEnter={() => setHoveredNoteId(notes[1].id)}
              onMouseLeave={() => setHoveredNoteId(null)}
              className="absolute top-10 right-2 sm:right-3 w-[175px] sm:w-[190px] p-4 bg-[#C08A57] text-[#2A1B0E] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.38)] cursor-pointer hover:scale-105 hover:z-20 transition-all duration-200"
              style={{ transform: `rotate(${hoveredNoteId === notes[1].id ? 0 : 5}deg)` }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#221D19] shadow-[0_2px_4px_rgba(0,0,0,0.45)] border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#2A1B0E]/70 block mb-1">
                {notes[1].tag}
              </span>
              <h4 className="font-display font-bold text-base text-[#2A1B0E] mb-1 leading-snug">
                {notes[1].title}
              </h4>
              <p className="text-xs text-[#2A1B0E]/85 leading-tight mb-2">
                {notes[1].desc}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#2A1B0E]/10 text-[10px] text-[#2A1B0E]/60">
                <span>Konsepti Aç</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Note 3 - Bottom Left */}
          {notes[2] && (
            <div
              id="hero-note-3"
              onClick={() => onSelectNote(notes[2])}
              onMouseEnter={() => setHoveredNoteId(notes[2].id)}
              onMouseLeave={() => setHoveredNoteId(null)}
              className="absolute bottom-12 left-4 sm:left-8 w-[185px] sm:w-[195px] p-4 bg-[#3E5A73] text-[#F1E9DC] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.4)] cursor-pointer hover:scale-105 hover:z-20 transition-all duration-200"
              style={{ transform: `rotate(${hoveredNoteId === notes[2].id ? 0 : 3}deg)` }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D9A63B] shadow-[0_2px_4px_rgba(0,0,0,0.45)] border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#D9A63B] block mb-1">
                {notes[2].tag}
              </span>
              <h4 className="font-display font-bold text-base text-[#F1E9DC] mb-1 leading-snug">
                {notes[2].title}
              </h4>
              <p className="text-xs text-[#F1E9DC]/85 leading-tight mb-2">
                {notes[2].desc}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-[#F1E9DC]/70">
                <span>Konsepti Aç</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Note 4 - Bottom Right */}
          {notes[3] && (
            <div
              id="hero-note-4"
              onClick={() => onSelectNote(notes[3])}
              onMouseEnter={() => setHoveredNoteId(notes[3].id)}
              onMouseLeave={() => setHoveredNoteId(null)}
              className="absolute bottom-3 right-2 sm:right-4 w-[175px] sm:w-[190px] p-4 bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.38)] cursor-pointer hover:scale-105 hover:z-20 transition-all duration-200"
              style={{ transform: `rotate(${hoveredNoteId === notes[3].id ? 0 : -4}deg)` }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#A24E30] shadow-[0_2px_4px_rgba(0,0,0,0.45)] border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#A24E30] block mb-1">
                {notes[3].tag}
              </span>
              <h4 className="font-display font-bold text-base text-[#221D19] mb-1 leading-snug">
                {notes[3].title}
              </h4>
              <p className="text-xs text-[#221D19]/80 leading-tight mb-2">
                {notes[3].desc}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#221D19]/10 text-[10px] text-[#221D19]/60">
                <span>Konsepti Aç</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
