import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, Sparkles, ClipboardList, Clock, ShieldCheck, Copy, Check } from 'lucide-react';
import { CategoryType, DesignRequest } from '../types';

interface ContactSectionProps {
  onNewRequestCreated: (request: DesignRequest) => void;
  preselectedCategory?: CategoryType;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNewRequestCreated,
  preselectedCategory,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<CategoryType>(preselectedCategory || 'İç Mekan & Dekorasyon');
  const [stylePreference, setStylePreference] = useState('Modern & Doğal');
  const [message, setMessage] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

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
    const randomCode = `PF-${Math.floor(1000 + Math.random() * 9000)}`;

    const fullMessage = referenceLink.trim()
      ? `${message}\n\nReferans / İlham Linki: ${referenceLink.trim()}`
      : message;

    const newReq: DesignRequest = {
      id: `req-${Date.now()}`,
      code: randomCode,
      name: name.trim(),
      email: email.trim(),
      category,
      message: fullMessage,
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
      consultantNotes: 'Talebiniz Selman Arslan tarafından inceleniyor. Kapsam netleştikten sonra ödeme/kapora detayları tarafınıza iletilecektir.',
    };

    setTimeout(() => {
      onNewRequestCreated(newReq);
      setCreatedCode(randomCode);
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      setReferenceLink('');
    }, 450);
  };

  const handleCopyCode = () => {
    if (!createdCode) return;
    navigator.clipboard.writeText(createdCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="iletisim" className="py-20 sm:py-28 px-6 bg-[#221D19]">
      <div className="max-w-[1180px] mx-auto">
        <div className="bg-[#F1E7D2] text-[#221D19] p-8 sm:p-14 rounded-xs shadow-[6px_7px_0_rgba(0,0,0,0.35)] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Workflow Explanation */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#A24E30] block mb-2">
                Doğrudan Danışmanlık
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#221D19] leading-tight">
                Fikrini anlat, birlikte başlayalım
              </h2>
              <p className="text-sm sm:text-base text-[#4A3E30] mt-3 leading-relaxed">
                Tasarım ihtiyacını ve aklındakileri yaz. Talebini bizzat inceleyip kapsamı netleştirdikten sonra ödeme ve kapora detaylarını doğrudan seninle paylaşacağım.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs text-[#4A3E30]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6B3A] shrink-0 mt-0.5" />
                <span><strong>Öncesinde ödeme gerekmez:</strong> Talebini gönderdikten sonra bizzat dönüş yapar, ödeme bilgisini iletirim.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-[#4A3E30]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6B3A] shrink-0 mt-0.5" />
                <span><strong>Özel Takip Kodu:</strong> Talebin oluştuğu an sana özel takip kodu verilir; durumunu canlı takip edebilirsin.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-[#4A3E30]">
                <CheckCircle2 className="w-4 h-4 text-[#3E6B3A] shrink-0 mt-0.5" />
                <span><strong>Sıfır Risk:</strong> Konsept taslağını panoda görürsün; beğenmezsen hiçbir taahhüt bulunmaz.</span>
              </div>
            </div>

            <div className="p-4 bg-[#EDE4CF] border-l-4 border-[#D9A63B] rounded-xs text-xs text-[#221D19] space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A24E30]" />
                <span>Nasıl İlerliyoruz?</span>
              </div>
              <p className="m-0 text-[#4A3E30] leading-relaxed">
                1. Talebini gönderirsin → 2. Selman Arslan inceler ve ödeme/kapora detaylarını iletir → 3. Taslağı görür, onaylarsın.
              </p>
            </div>
          </div>

          {/* Right Column: Form or Success Confirmation */}
          <div>
            {createdCode ? (
              <div className="p-8 sm:p-10 bg-[#E4EFE0] border border-[#2C4A26]/30 text-[#2C4A26] rounded-xs text-center space-y-5 animate-in fade-in duration-300 shadow-[4px_5px_0_rgba(0,0,0,0.15)]">
                <div className="w-14 h-14 rounded-full bg-[#2C4A26]/15 flex items-center justify-center mx-auto text-[#2C4A26]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#221D19]">
                    Talebin Başarıyla Alındı!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#385931] mt-2 max-w-md mx-auto leading-relaxed">
                    Fikrin panoma eklendi. Talebini inceleyip kapsamı değerlendirdikten sonra <strong>ödeme ve kapora bilgilerini bizzat ileteceğim</strong>.
                  </p>
                </div>

                {/* Tracking Code Box */}
                <div className="bg-white p-4 rounded-xs border border-[#2C4A26]/30 inline-block w-full max-w-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5C46] block mb-1">
                    Özel Takip Kodun
                  </span>
                  <div className="font-mono font-bold text-xl sm:text-2xl text-[#A24E30]">
                    {createdCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="mt-2 text-xs font-semibold text-[#221D19] hover:text-[#A24E30] inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3E6B3A]" />
                        <span>Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kodu Kopyala</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-white/70 rounded-xs text-xs text-[#2C4A26] border border-[#2C4A26]/20 max-w-sm mx-auto text-left">
                  <strong>Sonraki Adım:</strong> Selman Arslan talebini inceleyip sana dönüş yapacaktır. Durumu ve danışman notlarını dilediğin an sayfanın üstündeki <em>"Taleplerim"</em> butonundan sorgulayabilirsin.
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCreatedCode(null)}
                    className="px-5 py-2.5 bg-[#221D19] text-[#F1E9DC] font-semibold text-xs rounded-xs hover:bg-[#A24E30] transition-colors cursor-pointer"
                  >
                    Yeni Fikir Gönder
                  </button>
                </div>
              </div>
            ) : (
              <form id="ideaForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Deniz Yılmaz"
                      className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deniz@example.com"
                      className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-category" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                      Tasarım Alanı *
                    </label>
                    <select
                      id="form-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19]"
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
                    <label htmlFor="form-style" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                      Tarz / His Tercihi
                    </label>
                    <select
                      id="form-style"
                      value={stylePreference}
                      onChange={(e) => setStylePreference(e.target.value)}
                      className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19]"
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
                  <label htmlFor="form-message" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                    İhtiyacını Anlat & Tasarım İpuçları *
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ne aradığını, beğendiğin renkleri, mekânın ölçülerini veya istediğin hissi yazabilirsin..."
                    className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19] transition-colors resize-y min-h-[100px]"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="form-ref" className="block text-xs font-bold text-[#4A3E30] uppercase tracking-wider mb-1.5">
                    İlham Linki veya Pinterest Panosu (İsteğe Bağlı)
                  </label>
                  <input
                    type="text"
                    id="form-ref"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="Örn: https://pinterest.com/... veya Instagram profili"
                    className="w-full px-4 py-3 border border-[#C9BA9B] bg-[#FBF6EC] text-[#221D19] rounded-xs text-sm focus:outline-none focus:border-[#221D19] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#221D19] hover:bg-[#A24E30] text-[#F1E9DC] font-semibold text-base rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_rgba(0,0,0,0.25)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Talebin Alınıyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Fikri Panoya Gönder</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#6B5C46] m-0">
                  Talebin alındıktan sonra Selman Arslan inceleyip ödeme detaylarıyla dönüş yapacaktır.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
