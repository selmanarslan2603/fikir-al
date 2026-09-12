import React, { useState } from 'react';
import { Pin, Filter, Sparkles, Layers, Eye, Plus, Check } from 'lucide-react';
import { CorkboardNote, CategoryType } from '../types';

interface InteractiveCorkboardExplorerProps {
  notes: CorkboardNote[];
  onSelectNote: (note: CorkboardNote) => void;
  onOpenBriefModal: (cat?: string) => void;
}

export const InteractiveCorkboardExplorer: React.FC<InteractiveCorkboardExplorerProps> = ({
  notes,
  onSelectNote,
  onOpenBriefModal,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('Tümü');

  const tags = ['Tümü', 'Mekan', 'Kimlik', 'Kişisel', 'Ürün', 'Dijital', 'Anı'];

  const filteredNotes = selectedTag === 'Tümü'
    ? notes
    : notes.filter(n => n.tag === selectedTag);

  return (
    <section id="pano" className="py-20 sm:py-28 px-6 bg-[#241F1A] cork-pattern cork-grid border-b border-[#F1E9DC]/10 relative">
      <div className="max-w-[1180px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A63B] mb-2">
              <Layers className="w-3.5 h-3.5" />
              İlham Veren Canlı Pano
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F1E9DC] font-semibold tracking-tight">
              Örnek Konseptler & Taslaklar
            </h2>
            <p className="text-sm sm:text-base text-[#F1E9DC]/75 max-w-xl mt-2">
              Gerçek danışanlar için hazırlanan konsept notları, renk paletleri ve malzeme önerilerini incele.
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#221D19]/80 p-1.5 rounded-sm border border-[#F1E9DC]/15">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-[#D9A63B] text-[#221D19] font-bold shadow-sm'
                    : 'text-[#F1E9DC]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Board Canvas with Pinned Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-7 items-stretch">
          {filteredNotes.map((note) => {
            // Style map
            let bgClass = 'bg-[#F1E7D2] text-[#221D19]';
            if (note.noteStyle === 'kraft') bgClass = 'bg-[#C08A57] text-[#2A1B0E]';
            if (note.noteStyle === 'blueprint') bgClass = 'bg-[#3E5A73] text-[#F1E9DC]';

            return (
              <div
                key={note.id}
                id={`board-note-${note.id}`}
                onClick={() => onSelectNote(note)}
                className={`relative p-6 rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.38)] cursor-pointer hover:scale-[1.02] hover:z-20 transition-all duration-200 flex flex-col justify-between ${bgClass}`}
                style={{ transform: `rotate(${note.rotation}deg)` }}
              >
                {/* Pushpin Header */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-white/25 flex items-center justify-center"
                  style={{ backgroundColor: note.pinColor }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                      {note.tag}
                    </span>
                    <span className="text-[11px] font-mono opacity-70">
                      #{note.id.replace('note-', '')}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl mb-2 leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-4">
                    {note.desc}
                  </p>

                  {/* Micro Palette preview */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase font-semibold opacity-70 mb-1.5">Önerilen Renk Dili</div>
                    <div className="flex items-center gap-1.5">
                      {note.expandedDetails.colorPalette.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-5 h-5 rounded-xs border border-black/20 shadow-xs"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-current/15 flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 opacity-90">
                    <Eye className="w-3.5 h-3.5" />
                    Detaylı Konsepti İncele
                  </span>
                  <span className="text-xs opacity-60">→</span>
                </div>
              </div>
            );
          })}

          {/* Quick Idea Pin Card */}
          <div
            onClick={() => onOpenBriefModal()}
            className="p-6 rounded-xs border-2 border-dashed border-[#F1E9DC]/30 hover:border-[#D9A63B] bg-[#221D19]/60 hover:bg-[#221D19]/90 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#D9A63B]/15 text-[#D9A63B] flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg text-[#F1E9DC]">Kendi Fikrini Buraya İğnele</h4>
              <p className="text-xs text-[#F1E9DC]/60 max-w-xs mt-1">
                Kafandaki tasarımı anlat, bir sonraki raptiye senin projen olsun.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#D9A63B] bg-[#D9A63B]/10 px-3 py-1.5 rounded-sm">
              Talep Başlat →
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
