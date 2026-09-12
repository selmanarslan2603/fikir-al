import React from 'react';
import { Check, Quote, Sparkles } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="neden" className="py-20 sm:py-28 px-6 bg-[#221D19] border-b border-[#F1E9DC]/10">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          
          {/* Left: Reasons List */}
          <div>
            <div className="mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A63B]">
                <Sparkles className="w-3.5 h-3.5" />
                Güven & Esneklik
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F1E9DC] font-semibold tracking-tight">
                Neden buradan fikir almalısın
              </h2>
            </div>

            <ul className="space-y-6 list-none m-0 p-0">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full bg-[#D9A63B] text-[#221D19] flex items-center justify-center font-display font-bold text-base shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-[#F1E9DC] mb-1">
                    Tek bir kalıba sıkışmıyorum
                  </h4>
                  <p className="text-sm text-[#F1E9DC]/70 leading-relaxed m-0">
                    Farklı alanlardan gelen işler (mekan, ambalaj, stil), birbirini besleyen zengin bir bakış açısı kazandırıyor.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full bg-[#D9A63B] text-[#221D19] flex items-center justify-center font-display font-bold text-base shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-[#F1E9DC] mb-1">
                    Riski paylaşıyoruz
                  </h4>
                  <p className="text-sm text-[#F1E9DC]/70 leading-relaxed m-0">
                    Küçük bir kaporayla (150 TL) başlıyoruz; taslağı görüp içine sinmeden büyük bütçeler harcamıyorsun.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full bg-[#D9A63B] text-[#221D19] flex items-center justify-center font-display font-bold text-base shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-[#F1E9DC] mb-1">
                    Hızlı ve samimi geri dönüş
                  </h4>
                  <p className="text-sm text-[#F1E9DC]/70 leading-relaxed m-0">
                    Bürokrasi yok. İlk konsept genellikle 2-3 iş günü içinde panoda elinde oluyor.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Tactile Quote Card */}
          <div className="relative">
            <div className="p-8 sm:p-12 bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[6px_7px_0_rgba(0,0,0,0.35)] -rotate-2 hover:rotate-0 transition-transform duration-300 relative">
              {/* Pushpin */}
              <div className="absolute -top-3 left-10 w-5 h-5 rounded-full bg-[#A24E30] shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>

              <Quote className="w-10 h-10 text-[#D9A63B]/50 mb-4" />

              <p className="font-display text-xl sm:text-2xl leading-relaxed italic text-[#221D19] font-medium mb-6">
                "Ne istediğimi tam bilmiyordum, ama gösterdiği ilk taslak tam da aradığım şeydi. Panodaki renkler ve malzeme uyumu nokta atışıydı."
              </p>

              <div className="pt-4 border-t border-[#221D19]/15 flex items-center justify-between text-xs text-[#221D19]/70 font-semibold">
                <span>— Önceki bir danışan (İç Mekan & Logo)</span>
                <span className="text-[#A24E30] font-mono">Doğrulanmış İşbirliği</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
