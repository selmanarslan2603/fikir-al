import React, { useState } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, Check, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallBannerProps {
  forceShowIOSGuide?: boolean;
  onCloseIOSGuide?: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  forceShowIOSGuide = false,
  onCloseIOSGuide,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [internalShowIOS, setInternalShowIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const showIOSModal = forceShowIOSGuide || internalShowIOS;

  const handleCloseIOS = () => {
    setInternalShowIOS(false);
    if (onCloseIOSGuide) onCloseIOSGuide();
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setInternalShowIOS(true);
    } else {
      // Fallback: show instructions
      setInternalShowIOS(true);
    }
  };

  // If app is already running in standalone mode (installed as PWA), don't show the banner
  if (isInstalled && !forceShowIOSGuide) {
    return null;
  }

  return (
    <>
      {/* Subtle Mobile Top Floating Banner (if not dismissed) */}
      {!dismissed && !isInstalled && (
        <div className="bg-[#D9A63B] text-[#221D19] px-4 py-2.5 sm:py-2 text-xs font-medium border-b border-[#221D19]/20 shadow-sm relative z-30">
          <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 truncate">
              <span className="w-6 h-6 rounded-xs bg-[#221D19] text-[#D9A63B] flex items-center justify-center shrink-0 font-display font-bold text-xs">
                F
              </span>
              <span className="truncate">
                <strong>Mobil Deneyim:</strong> Fikir Al ve Karar Ver'i ana ekranına ekleyip uygulama gibi kullan.
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 bg-[#221D19] text-[#F1E9DC] hover:bg-[#3A322B] text-xs font-bold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Yükle</span>
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="p-1 text-[#221D19]/70 hover:text-[#221D19] transition-colors cursor-pointer"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari / Web Install Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseIOS}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#221D19] text-[#D9A63B] flex items-center justify-center font-display font-bold text-2xl shadow-sm">
                P
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#221D19]">
                  Uygulamayı Ana Ekrana Ekle
                </h3>
                <p className="text-xs text-[#6B5C46]">
                  Panoda Fikir'i telefonunda tam ekran uygulama olarak aç
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#4A3E30]">
              <div className="p-3 bg-white/70 rounded-xs border border-[#C9BA9B] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#221D19] text-[#F1E9DC] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#221D19] block mb-0.5 flex items-center gap-1.5">
                    <Share className="w-3.5 h-3.5 text-[#A24E30]" />
                    Safari Paylaş Butonuna Basın
                  </strong>
                  <span>Ekranın altındaki veya üstündeki kare içinden yukarı ok simgesine dokunun.</span>
                </div>
              </div>

              <div className="p-3 bg-white/70 rounded-xs border border-[#C9BA9B] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#221D19] text-[#F1E9DC] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#221D19] block mb-0.5 flex items-center gap-1.5">
                    <PlusSquare className="w-3.5 h-3.5 text-[#3E6B3A]" />
                    "Ana Ekrana Ekle" Seçeneğine Dokunun
                  </strong>
                  <span>Açılan menüde aşağı kaydırarak <strong>"Ana Ekrana Ekle" (Add to Home Screen)</strong> seçeneğini bulun.</span>
                </div>
              </div>

              <div className="p-3 bg-white/70 rounded-xs border border-[#C9BA9B] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#221D19] text-[#F1E9DC] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[#221D19] block mb-0.5 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#D9A63B]" />
                    "Ekle" Butonuna Dokunun
                  </strong>
                  <span>Sağ üst köşedeki <strong>Ekle</strong> butonuna basarak kurulumu tamamlayın.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCloseIOS}
                className="w-full py-2.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] font-semibold text-xs rounded-xs transition-colors cursor-pointer text-center"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
