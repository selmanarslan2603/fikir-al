import React from 'react';
import { ArrowRight, CheckCircle2, Zap, MessageSquareQuote, Palette } from 'lucide-react';

interface WorkflowStepsProps {
  onStartStep: (stepNumber: number) => void;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ onStartStep }) => {
  return (
    <section id="nasil" className="py-20 sm:py-28 px-6 bg-[#221D19] border-b border-[#F1E9DC]/10">
      <div className="max-w-[1180px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A63B]">
            <Zap className="w-3.5 h-3.5" />
            Şeffaf & Yalın Süreç
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F1E9DC] font-semibold tracking-tight">
            Üç adımda çalışıyoruz
          </h2>
          <p className="text-base sm:text-lg text-[#F1E9DC]/75 leading-relaxed">
            Karmaşık sözleşmelere ve ezbere şablonlara yer yok. Süreç doğrudan danışmanla, güvene dayalı ilerler.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
          
          {/* Step 1 */}
          <div 
            id="step-card-1"
            className="p-8 sm:p-9 bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.3)] relative group hover:-translate-y-1 transition-transform"
          >
            <div className="font-display text-5xl font-bold text-[#221D19]/25 leading-none mb-3">
              01
            </div>
            <h3 className="font-display text-xl font-bold text-[#221D19] mb-3">
              Alanını seç, fikrini anlat
            </h3>
            <p className="text-sm text-[#221D19]/85 leading-relaxed mb-6">
              Hangi konuda fikre ihtiyacın olduğunu ve tarzını kısaca yaz. İster 2 cümleyle özetle, ister ilham linkleri ekle.
            </p>
            <button
              onClick={() => onStartStep(1)}
              className="text-xs font-bold text-[#221D19] inline-flex items-center gap-1.5 group-hover:text-[#A24E30] transition-colors cursor-pointer"
            >
              <span>Fikrini hemen yaz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Step 2 */}
          <div 
            id="step-card-2"
            className="p-8 sm:p-9 bg-[#C08A57] text-[#2A1B0E] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.35)] relative md:translate-y-4 group hover:translate-y-3 transition-transform"
          >
            <div className="font-display text-5xl font-bold text-[#2A1B0E]/25 leading-none mb-3">
              02
            </div>
            <h3 className="font-display text-xl font-bold text-[#2A1B0E] mb-3">
              İnceleyip ödeme isteyeyim
            </h3>
            <p className="text-sm text-[#2A1B0E]/85 leading-relaxed mb-6">
              Talebini bizzat inceliyorum. Kapsamı ve takvimi netleştirdikten sonra ödeme/kapora detaylarını seninle paylaşıyorum.
            </p>
            <div className="text-xs font-bold text-[#2A1B0E] inline-flex items-center gap-1.5">
              <span>Birebir İletişim & Onay</span>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            id="step-card-3"
            className="p-8 sm:p-9 bg-[#3E5A73] text-[#F1E9DC] rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.35)] relative group hover:-translate-y-1 transition-transform"
          >
            <div className="font-display text-5xl font-bold text-[#F1E9DC]/30 leading-none mb-3">
              03
            </div>
            <h3 className="font-display text-xl font-bold text-[#F1E9DC] mb-3">
              Taslağı gör, karar ver
            </h3>
            <p className="text-sm text-[#F1E9DC]/85 leading-relaxed mb-6">
              İlk konsepti sana panoda gösteriyorum. Beğenirsen detaylı teslimat dosyalarını hazırlıyor ve süreci tamamlıyoruz.
            </p>
            <div className="text-xs font-semibold text-[#D9A63B] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sıfır risk & şeffaf teslimat</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
