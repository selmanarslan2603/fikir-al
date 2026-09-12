import React, { useState } from 'react';
import { X, Check, FileCheck, Send } from 'lucide-react';
import { DesignRequest } from '../types';

interface ReceiptNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: DesignRequest[];
  onSubmitReceipt: (codeOrEmail: string, receiptNote: string) => boolean;
}

export const ReceiptNotifyModal: React.FC<ReceiptNotifyModalProps> = ({
  isOpen,
  onClose,
  requests,
  onSubmitReceipt,
}) => {
  const [codeOrEmail, setCodeOrEmail] = useState('');
  const [receiptNote, setReceiptNote] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeOrEmail.trim() || !receiptNote.trim()) return;

    const success = onSubmitReceipt(codeOrEmail.trim(), receiptNote.trim());
    if (success) {
      setStatusMsg({
        type: 'success',
        text: 'Ödeme bilgin başarıyla iletildi! Selman Arslan kontrol edip taslak sürecini başlatacak.',
      });
      setTimeout(() => {
        setStatusMsg(null);
        setCodeOrEmail('');
        setReceiptNote('');
        onClose();
      }, 2200);
    } else {
      setStatusMsg({
        type: 'error',
        text: 'Girdiğin kod veya e-posta ile eşleşen bir talep bulunamadı. Lütfen talep kodunu (Örn: PF-8492) kontrol et.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-xs bg-[#A24E30] text-white flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#221D19]">
              Ödeme / Dekont Notu İlet
            </h3>
            <p className="text-xs text-[#6B5C46]">
              Danışmanınızla kararlaştırdığınız ödemeyi yaptıysanız bilgilerinizi iletin.
            </p>
          </div>
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xs text-xs mb-4 ${
              statusMsg.type === 'success'
                ? 'bg-[#E4EFE0] text-[#2C4A26] border border-[#2C4A26]/30'
                : 'bg-red-100 text-red-900 border border-red-300'
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
              Talep Kodu veya E-posta
            </label>
            <input
              type="text"
              required
              value={codeOrEmail}
              onChange={(e) => setCodeOrEmail(e.target.value)}
              placeholder="Örn: PF-8492 veya adin@example.com"
              className="w-full px-4 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
              Ödeme Notu / Banka veya Referans
            </label>
            <textarea
              required
              rows={3}
              value={receiptNote}
              onChange={(e) => setReceiptNote(e.target.value)}
              placeholder="Gönderen Adı, Banka adı veya işlem referans numarası (Örn: Deniz Yılmaz - Garanti FAST ref: 9482)"
              className="w-full px-4 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#6B5C46] hover:text-[#221D19]"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Bildirimi Gönder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
