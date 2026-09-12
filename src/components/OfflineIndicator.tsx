import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-18 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-2.5 rounded-xs bg-[#A24E30] px-4 py-2.5 text-xs font-semibold text-[#F1E9DC] shadow-lg border border-[#F1E9DC]/20 animate-in slide-in-from-top-2 duration-200">
      <WifiOff className="w-4 h-4 shrink-0 text-[#D9A63B]" />
      <span>Çevrimdışı mod — Kayıtlı konseptler önbellekten gösteriliyor.</span>
    </div>
  );
};
