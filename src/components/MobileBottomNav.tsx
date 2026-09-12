import React from 'react';
import { Pin, Send, ClipboardList, ShieldCheck, Download, Smartphone } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenBriefModal: () => void;
  onOpenTrackerModal: () => void;
  onOpenAdminModal: () => void;
  onOpenInstallGuide: () => void;
  requestsCount: number;
  isPWAInstalled: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenBriefModal,
  onOpenTrackerModal,
  onOpenAdminModal,
  onOpenInstallGuide,
  requestsCount,
  isPWAInstalled,
}) => {
  const scrollToPano = () => {
    const el = document.getElementById('pano');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#221D19]/95 backdrop-blur-lg border-t border-[#F1E9DC]/15 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.5)] transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Tab 1: Pano */}
        <button
          onClick={scrollToPano}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#F1E9DC]/75 hover:text-[#D9A63B] transition-colors group cursor-pointer"
        >
          <Pin className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform text-[#D9A63B]" />
          <span className="text-[10px] font-medium tracking-tight">Pano</span>
        </button>

        {/* Tab 2: Taleplerim Tracker */}
        <button
          onClick={onOpenTrackerModal}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#F1E9DC]/75 hover:text-[#D9A63B] transition-colors relative group cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-medium tracking-tight">Taleplerim</span>
          {requestsCount > 0 && (
            <span className="absolute top-0.5 right-1 w-4 h-4 rounded-full bg-[#A24E30] text-white text-[9px] font-bold flex items-center justify-center font-mono">
              {requestsCount}
            </span>
          )}
        </button>

        {/* Tab 3 (Center Action): Fikir İlet */}
        <button
          onClick={onOpenBriefModal}
          className="flex flex-col items-center justify-center -mt-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#D9A63B] text-[#221D19] flex items-center justify-center shadow-[0_4px_10px_rgba(217,166,59,0.35)] group-hover:scale-105 group-active:scale-95 transition-transform border-2 border-[#221D19]">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#D9A63B] mt-1 tracking-tight">Fikir İlet</span>
        </button>

        {/* Tab 4: Danışman / Admin */}
        <button
          onClick={onOpenAdminModal}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#F1E9DC]/75 hover:text-[#D9A63B] transition-colors group cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-medium tracking-tight">Danışman</span>
        </button>

        {/* Tab 5: Yükle / App Guide */}
        <button
          onClick={onOpenInstallGuide}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#F1E9DC]/75 hover:text-[#D9A63B] transition-colors group cursor-pointer"
        >
          {isPWAInstalled ? (
            <>
              <Smartphone className="w-5 h-5 mb-0.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium tracking-tight text-emerald-400">Yüklü</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mb-0.5 text-[#D9A63B] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium tracking-tight">Yükle</span>
            </>
          )}
        </button>

      </div>
    </nav>
  );
};
