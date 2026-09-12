import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#221D19] border-t border-[#F1E9DC]/10 py-12 px-6 text-[#F1E9DC]/60 text-xs">
      <div className="max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-display font-bold text-base text-[#F1E9DC]">
            Fikir Al <span className="text-[#D9A63B]">ve</span> Karar Ver
          </div>
          <p className="m-0 text-[#F1E9DC]/50">
            fikiralvekararver.com.tr • Kişiye özel tasarım danışmanlığı, elle tutulur konseptler.
          </p>
        </div>

        {/* Center note */}
        <div className="text-center text-[11px] text-[#F1E9DC]/40">
          Tasarım Danışmanı: <strong className="text-[#F1E9DC]/70">Selman Arslan</strong> • Talepten Sonra Birebir İletişim
        </div>

        {/* Scroll to Top button */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-xs bg-[#3A322B] hover:bg-[#4A3E30] text-[#F1E9DC] border border-[#F1E9DC]/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Yukarı Çık"
        >
          <span>Yukarı</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
