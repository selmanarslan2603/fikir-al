import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import { CategoryType, DesignRequest } from '../types';

interface BriefRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewRequestCreated: (req: DesignRequest) => void;
  initialCategory?: CategoryType;
}

export const BriefRequestModal: React.FC<BriefRequestModalProps> = ({
  isOpen,
  onClose,
  onNewRequestCreated,
  initialCategory,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<CategoryType>(initialCategory || 'İç Mekan & Dekorasyon');
  const [stylePreference, setStylePreference] = useState('Modern & Doğal');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const styleOptions = [
    'Modern & Doğal',
    'Minimalist & Yalın',
    'Sıcak Ahşap & Keten',
    'Vintage & Zanaatkar',
    'Cesur & Renkli',
    'Kararsızım (Sen öner)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const code = `PF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReq: DesignRequest = {
      id: `req-${Date.now()}`,
      code,
      name: name.trim(),
      email: email.trim(),
      category,
      message: message.trim(),
      stylePreference,
      createdAt: new Date().toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'talep_alindi',
      paymentStatus: 'bekliyor',
      kaporaAmount: 150,
      consultantNotes: 'Talebiniz alındı. Selman Arslan inceleyip ödeme/kapora adımlarını doğrudan sizinle paylaşacaktır.',
    };

    setTimeout(() => {
      onNewRequestCreated(newReq);
      setCreatedCode(code);
      setIsSubmitting(false);
    }, 450);
  };

  const handleCopyCode = () => {
    if (!createdCode) return;
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    setCreatedCode(null);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-9 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {createdCode ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#3E6B3A]/15 text-[#3E6B3A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#221D19]">
              Fikrin Panoya Eklendi!
            </h3>
            <p className="text-sm text-[#4A3E30] leading-relaxed max-w-md mx-auto">
              Talebin başarıyla kaydedildi. Selman Arslan ihtiyacını inceledikten sonra <strong>ödeme ve kapora sürecini bizzat seninle paylaşacak</strong>.
            </p>
            
            <div className="p-4 bg-white/80 border border-[#C9BA9B] rounded-xs max-w-xs mx-auto">
              <span className="text-[10px] uppercase font-bold text-[#6B5C46] block mb-0.5">
                Takip Kodun
              </span>
              <div className="font-mono text-xl font-bold text-[#A24E30]">
                {createdCode}
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="mt-1 text-xs font-semibold text-[#221D19] hover:text-[#A24E30] inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#3E6B3A]" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] font-semibold text-xs rounded-xs transition-colors cursor-pointer"
              >
                Tamamla & Kapat
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A24E30] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Fikir & Tasarım Talebi
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#221D19]">
                Kafandaki Fikri Anlat
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5C46] mt-1">
                İhtiyacını yaz; Selman Arslan inceleyip ödeme ve taslak takvimini doğrudan seninle paylaşsın.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Selin Demir"
                    className="w-full px-3.5 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="selin@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
                    Tasarım Alanı *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
                  >
                    <option>İç Mekan & Dekorasyon</option>
                    <option>Marka & Logo</option>
                    <option>Moda & Stil</option>
                    <option>Sosyal Medya Görselleri</option>
                    <option>Ambalaj Tasarımı</option>
                    <option>Etkinlik & Davetiye</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
                    Tarz Tercihi
                  </label>
                  <select
                    value={stylePreference}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
                  >
                    {styleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
                  İhtiyacını Kısaca Anlat *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hangi konuda fikre ihtiyacın olduğunu, neyi sevip neyi sevmediğini kısaca yaz..."
                  className="w-full px-3.5 py-2.5 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19] min-h-[90px]"
                ></textarea>
              </div>

              <div className="p-3 bg-[#EDE4CF] rounded-xs text-xs text-[#4A3E30] border-l-3 border-[#D9A63B]">
                Önceden ödeme yapmana gerek yoktur. Selman Arslan talebini inceledikten sonra ödeme ve kapora bilgisini sana bizzat iletecektir.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-4 py-2 text-xs font-semibold text-[#6B5C46] hover:text-[#221D19]"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] text-xs font-semibold rounded-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Kaydediliyor...' : 'Fikri Panoya İlet'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
