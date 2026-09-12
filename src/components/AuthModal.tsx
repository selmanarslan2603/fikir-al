import React, { useState } from 'react';
import { X, LogIn, Mail, User, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLoginSuccess(email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-[#F1E7D2] text-[#221D19] rounded-xs shadow-[8px_10px_0_rgba(0,0,0,0.5)] border border-[#C9BA9B] p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#221D19]/10 hover:bg-[#221D19]/20 flex items-center justify-center text-[#221D19] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xs bg-[#D9A63B] text-[#221D19] flex items-center justify-center font-bold">
            P
          </div>
          <h3 className="font-display font-bold text-xl text-[#221D19]">
            Danışan Girişi
          </h3>
        </div>
        <p className="text-xs text-[#6B5C46] mb-5">
          Taleplerini, taslaklarını ve kapora durumunu takip etmek için e-postanı gir.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
              Ad Soyad (İsteğe Bağlı)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#6B5C46] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Selman"
                className="w-full pl-9 pr-3 py-2 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E30] mb-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B5C46] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@alanadi.com"
                className="w-full pl-9 pr-3 py-2 bg-[#FBF6EC] border border-[#C9BA9B] text-sm text-[#221D19] rounded-xs focus:outline-none focus:border-[#221D19]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Giriş Yap & Devam Et</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#C9BA9B] text-center text-[11px] text-[#6B5C46]">
          Netlify Identity / Doğrudan oturum entegrasyonu
        </div>
      </div>
    </div>
  );
};
