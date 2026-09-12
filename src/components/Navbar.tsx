import React from 'react';
import { Sparkles, ShieldCheck, ClipboardList, Send, UserCheck, LogOut, Download, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenBriefModal: () => void;
  onOpenTrackerModal: () => void;
  onToggleAdmin: () => void;
  isAdmin: boolean;
  userEmail: string | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  requestsCount: number;
  onOpenInstallGuide?: () => void;
  isPWAInstalled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBriefModal,
  onOpenTrackerModal,
  onToggleAdmin,
  isAdmin,
  userEmail,
  onLoginClick,
  onLogoutClick,
  requestsCount,
  onOpenInstallGuide,
  isPWAInstalled,
}) => {
  return (
    <header id="site-header" className="sticky top-0 z-50 bg-[#221D19]/95 backdrop-blur-md border-b border-[#F1E9DC]/10 transition-colors">
      <nav className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 text-decoration-none group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-[#D9A63B] text-[#221D19] flex items-center justify-center font-display font-bold text-base sm:text-lg shadow-sm group-hover:rotate-6 transition-transform">
            F
          </div>
          <div className="font-display text-base sm:text-xl font-semibold tracking-tight text-[#F1E9DC]">
            Fikir Al <span className="text-[#D9A63B]">ve</span> Karar Ver
          </div>
        </a>

        {/* Center Nav Links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0 text-sm font-medium">
          <li>
            <a href="#nasil" className="text-[#F1E9DC]/80 hover:text-[#F1E9DC] transition-colors">
              Nasıl Çalışır
            </a>
          </li>
          <li>
            <a href="#alanlar" className="text-[#F1E9DC]/80 hover:text-[#F1E9DC] transition-colors">
              Alanlar
            </a>
          </li>
          <li>
            <a href="#pano" className="text-[#F1E9DC]/80 hover:text-[#F1E9DC] transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A63B] animate-pulse"></span>
              Fikir Panosu
            </a>
          </li>
          <li>
            <a href="#surec" className="text-[#F1E9DC]/80 hover:text-[#F1E9DC] transition-colors">
              Süreç & Ödeme
            </a>
          </li>
          <li>
            <a href="#neden" className="text-[#F1E9DC]/80 hover:text-[#F1E9DC] transition-colors">
              Neden Ben
            </a>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Install Button in Header */}
          {onOpenInstallGuide && !isPWAInstalled && (
            <button
              onClick={onOpenInstallGuide}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold bg-[#D9A63B]/15 text-[#D9A63B] hover:bg-[#D9A63B]/25 transition-colors border border-[#D9A63B]/40 cursor-pointer"
              title="Uygulama olarak yükle"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Uygulamayı İndir</span>
            </button>
          )}

          {/* Tracker Button */}
          <button
            id="tracker-nav-btn"
            onClick={onOpenTrackerModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-semibold bg-[#3A322B] text-[#F1E9DC] hover:bg-[#4A3E30] transition-colors border border-[#F1E9DC]/10 cursor-pointer"
            title="Taleplerini ve durumunu takip et"
          >
            <ClipboardList className="w-3.5 h-3.5 text-[#D9A63B]" />
            <span>Taleplerim</span>
            {requestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#A24E30] text-[10px] text-white font-mono">
                {requestsCount}
              </span>
            )}
          </button>

          {/* Admin Toggle */}
          <button
            id="admin-toggle-btn"
            onClick={onToggleAdmin}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-sm text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isAdmin 
                ? 'bg-[#A24E30] text-white border-[#A24E30]' 
                : 'bg-transparent text-[#D9A63B] border-[#D9A63B]/60 hover:bg-[#D9A63B]/10'
            }`}
            title={isAdmin ? 'Danışan görünümüne geç' : 'Danışman yönetim paneline geç (Selman Arslan)'}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdmin ? 'Danışman Modu' : 'Yönetici'}</span>
          </button>

          {/* User Auth */}
          {userEmail ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#F1E9DC]/15">
              <span className="text-xs text-[#F1E9DC]/75 max-w-[120px] truncate" title={userEmail}>
                {userEmail.split('@')[0]}
              </span>
              <button
                onClick={onLogoutClick}
                className="p-1.5 text-[#F1E9DC]/60 hover:text-white transition-colors cursor-pointer"
                title="Çıkış Yap"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="authBtn"
              onClick={onLoginClick}
              className="text-xs text-[#F1E9DC]/80 hover:text-[#F1E9DC] px-2 py-1 underline underline-offset-4 cursor-pointer hidden sm:inline-block"
            >
              Giriş
            </button>
          )}

          {/* Primary CTA */}
          <button
            id="primary-nav-cta"
            onClick={onOpenBriefModal}
            className="bg-[#D9A63B] text-[#221D19] px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-semibold text-xs sm:text-sm shadow-[2px_2px_0_rgba(0,0,0,0.35)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(0,0,0,0.35)] active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Fikir İlet</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
