import React from 'react';
import { ShieldCheck, MessageCircle, Clock, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

interface PaymentSectionProps {
  onOpenBriefModal?: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onOpenBriefModal }) => {
  return (
    <section id="surec" className="py-20 sm:py-28 px-6 bg-[#221D19] border-b border-[#F1E9DC]/10">
      <div className="max-w-[1180px] mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A63B]">
            <UserCheck className="w-3.5 h-3.5" />
            Birebir Danışmanlık Yaklaşımı
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F1E9DC] font-semibold tracking-tight">
            Ödeme ve çalışma süreci
          </h2>
          <p className="text-base sm:text-lg text-[#F1E9DC]/75 leading-relaxed">
            Otomatik veya anonim ödeme yok. Talebini aldıktan sonra bizzat inceliyor, kapsamı netleştirip ödeme detaylarını seninle paylaşıyorum.
          </p>
        </div>

        {/* Tactile Card */}
        <div className="bg-[#F1E7D2] text-[#221D19] p-8 sm:p-12 rounded-xs shadow-[6px_7px_0_rgba(0,0,0,0.35)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#A24E30] block mb-1">
                Talepten Sonra Doğrudan İletişim
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#221D19] leading-tight">
                Her Projeye Özel Kapsam & Değerlendirme
              </div>
              <p className="text-sm text-[#4A3E30] mt-3 leading-relaxed">
                Tasarım ihtiyaçları birbirine benzemez. Bu yüzden ödeme bilgisi öncesinde değil, talebini panoya ilettikten sonra proje büyüklüğüne ve kapsamına göre doğrudan iletilir.
              </p>
            </div>

            <div className="p-4 bg-[#EDE4CF] rounded-xs border-l-4 border-[#A24E30] text-xs text-[#221D19] space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A24E30]" />
                <span>Neden Talepten Sonra?</span>
              </div>
              <p className="m-0 text-[#4A3E30] leading-relaxed">
                Önceden ezbere para almak yerine, talebini ve beklentini inceliyorum. Uygun olduğumuzda kapora tutarını ve ödeme bilgilerini bizzat sana bildiriyorum.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#iletisim"
                className="px-6 py-3 rounded-xs font-semibold text-xs bg-[#221D19] text-[#F1E9DC] hover:bg-[#A24E30] transition-colors inline-flex items-center gap-2 shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
              >
                <span>Fikrini Anlat & Talebini Gönder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Key Principles */}
          <div className="border-t lg:border-t-0 lg:border-l border-[#C9BA9B] pt-8 lg:pt-0 lg:pl-10 space-y-5">
            <h4 className="font-display font-bold text-lg text-[#221D19] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#A24E30]" />
              Süreç Adımları
            </h4>

            <div className="space-y-4 text-xs text-[#4A3E30]">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#221D19] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                  1
                </span>
                <div>
                  <strong className="text-[#221D19] block">Fikrini & İhtiyacını İlet:</strong>
                  <span>Form üzerinden ihtiyacını, tarzını veya mekan ölçülerini belirt. Takip kodun anında üretilsin.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#A24E30] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                  2
                </span>
                <div>
                  <strong className="text-[#221D19] block">Bizzat İnceleyip Ödeme İsteyeyim:</strong>
                  <span>Talebi inceler, takvim ve uygunluğu onayladıktan sonra ödeme/kapora bilgilerini sana doğrudan iletirim.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#3E6B3A] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                  3
                </span>
                <div>
                  <strong className="text-[#221D19] block">Konsept Panoya Çıksın:</strong>
                  <span>İlk taslak hazırlandığında panoda inceler, beğenirsen nihai teslimata geçersin.</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#E4D6B8] rounded-xs border border-[#C9BA9B] text-xs text-[#221D19] flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3E6B3A] shrink-0" />
              <span>Sıfır risk: Taslağı görmeden tam ödeme yapmazsın.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
