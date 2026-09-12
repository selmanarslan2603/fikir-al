import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle, AlertCircle, FileText, Sparkles, CreditCard, MessageSquare } from 'lucide-react';
import { DesignRequest, RequestStatus } from '../types';

interface TrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: DesignRequest[];
  onOpenReceiptNotify: () => void;
}

export const TrackerModal: React.FC<TrackerModalProps> = ({
  isOpen,
  onClose,
  requests,
  onOpenReceiptNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = searchQuery.trim()
    ? requests.filter(
        r =>
          r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : requests;

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'talep_alindi':
        return { label: 'Talebiniz İncelemede', bg: 'bg-amber-100 text-amber-900 border border-amber-300' };
      case 'kapora_bekleniyor':
        return { label: 'Ödeme / Kapora İletildi', bg: 'bg-blue-100 text-blue-900 border border-blue-300' };
      case 'taslak_hazirlaniyor':
        return { label: 'Taslak Çiziliyor', bg: 'bg-indigo-100 text-indigo-900 border border-indigo-300' };
      case 'onay_bekliyor':
        return { label: 'Taslak Hazır / Onayında', bg: 'bg-purple-100 text-purple-900 border border-purple-300' };
      case 'tamamlandi':
        return { label: 'Tamamlandı & Teslim Edildi', bg: 'bg-emerald-100 text-emerald-900 border border-emerald-300' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-8 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <h3 className="font-display font-bold text-2xl text-[#221D19]">
            Tasarım Talebi Takip Paneli
          </h3>
          <p className="text-xs text-[#6B5C46]">
            Takip kodunla veya e-posta adresinle talebini, danışman notlarını ve durumunu canlı takip et.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-[#6B5C46] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Takip Kodu (Örn: PF-8492) veya E-posta ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
          />
        </div>

        {/* Requests List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-[#E4D6B8]/50 rounded-xs border border-[#C9BA9B] text-xs text-[#6B5C46]">
              Aramanızla eşleşen talep bulunamadı. Lütfen takip kodunuzu kontrol ediniz.
            </div>
          ) : (
            filtered.map((req) => {
              const badge = getStatusBadge(req.status);
              return (
                <div
                  key={req.id}
                  className="p-5 bg-white/70 rounded-xs border border-[#C9BA9B] shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm bg-[#221D19] text-[#F1E9DC] px-2.5 py-0.5 rounded-xs">
                        {req.code}
                      </span>
                      <span className="text-xs font-semibold text-[#A24E30]">
                        {req.category}
                      </span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-xs ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="text-xs text-[#4A3E30] grid grid-cols-2 gap-2 pt-1 border-t border-[#C9BA9B]/50">
                    <div>
                      <span className="text-[#6B5C46] block text-[10px] uppercase">Danışan:</span>
                      <strong>{req.name}</strong> ({req.email})
                    </div>
                    <div>
                      <span className="text-[#6B5C46] block text-[10px] uppercase">Tarih:</span>
                      <span>{req.createdAt}</span>
                    </div>
                  </div>

                  <div className="bg-[#FBF6EC] p-3 rounded-xs border border-[#C9BA9B]/60 text-xs">
                    <span className="font-bold text-[#221D19] block mb-1">Tasarım Talebiniz:</span>
                    <p className="text-[#4A3E30] m-0 italic whitespace-pre-line">"{req.message}"</p>
                  </div>

                  {/* Consultant Feedback & Notes */}
                  {req.consultantNotes && (
                    <div className="bg-[#E4EFE0] p-3.5 rounded-xs border border-[#2C4A26]/30 text-xs text-[#2C4A26] space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Selman Arslan (Danışman Notu):</span>
                      </div>
                      <p className="m-0 leading-relaxed whitespace-pre-line">{req.consultantNotes}</p>
                      {req.conceptDraftTitle && (
                        <div className="font-semibold text-xs mt-1 pt-1 border-t border-[#2C4A26]/20">
                          Taslak Konsept: {req.conceptDraftTitle}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Action when payment is requested by consultant */}
                  {req.status === 'kapora_bekleniyor' && (
                    <div className="pt-2 flex items-center justify-between bg-amber-50 p-2.5 rounded-xs border border-amber-200">
                      <span className="text-[11px] text-[#A24E30] font-semibold">
                        Danışmanınız ödeme/kapora talep etti.
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenReceiptNotify();
                        }}
                        className="px-3 py-1 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] text-[11px] font-semibold rounded-xs transition-colors cursor-pointer"
                      >
                        Ödeme Notu / Dekont İlet →
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#C9BA9B] flex items-center justify-between text-xs text-[#6B5C46]">
          <span>Toplam {requests.length} kayıtlı talep</span>
          <button onClick={onClose} className="font-semibold text-[#221D19] hover:underline cursor-pointer">
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
