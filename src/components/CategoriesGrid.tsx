import React from 'react';
import { Home, Sparkles, Shirt, Share2, Package, CalendarHeart, PlusCircle, ArrowUpRight } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoriesGridProps {
  onSelectCategoryForBrief: (category: CategoryType) => void;
}

export const CATEGORIES_DATA: {
  tag: string;
  title: CategoryType;
  desc: string;
  icon: React.ElementType;
  exampleCount: string;
}[] = [
  {
    tag: 'Mekan',
    title: 'İç Mekan & Dekorasyon',
    desc: 'Oda düzeni, renk ve mobilya yerleşimi için somut, uygulanabilir öneriler.',
    icon: Home,
    exampleCount: '24+ Konsept',
  },
  {
    tag: 'Kimlik',
    title: 'Marka & Logo',
    desc: 'Yeni ya da yenilenen markalar için görsel yön, renk paleti ve logo konsepti.',
    icon: Sparkles,
    exampleCount: '38+ Kimlik',
  },
  {
    tag: 'Kişisel',
    title: 'Moda & Stil',
    desc: 'Kombin mantığı, gardırop renk paleti ve kişiye özel stil rehberliği.',
    icon: Shirt,
    exampleCount: '19+ Rehber',
  },
  {
    tag: 'Dijital',
    title: 'Sosyal Medya Görselleri',
    desc: 'Akışına uyan, tanınır ve tutarlı bir görsel dil için şablon ve düzen fikirleri.',
    icon: Share2,
    exampleCount: '15+ Akış',
  },
  {
    tag: 'Ürün',
    title: 'Ambalaj Tasarımı',
    desc: 'Rafta öne çıkan, ürününü doğru anlatan kutu, şişe ve etiket fikirleri.',
    icon: Package,
    exampleCount: '12+ Ambalaj',
  },
  {
    tag: 'Anı',
    title: 'Etkinlik & Davetiye',
    desc: 'Düğün, doğum günü ya da özel lansman için tema ve davetiye konsepti.',
    icon: CalendarHeart,
    exampleCount: '16+ Etkinlik',
  },
];

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onSelectCategoryForBrief }) => {
  return (
    <section id="alanlar" className="py-20 sm:py-28 px-6 bg-[#221D19] border-b border-[#F1E9DC]/10">
      <div className="max-w-[1180px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A63B]">
            Uzmanlık & Danışmanlık Alanları
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F1E9DC] font-semibold tracking-tight">
            Fikir verdiğim alanlar
          </h2>
          <p className="text-base sm:text-lg text-[#F1E9DC]/75 leading-relaxed">
            Aşağıdakilerden biri değilse de sorun değil — anlat, birlikte bakalım ve panoya taşıyalım.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                id={`cat-card-${idx + 1}`}
                onClick={() => onSelectCategoryForBrief(cat.title)}
                className="bg-[#3A322B] border border-[#F1E9DC]/12 p-7 rounded-xs transition-all duration-200 hover:border-[#D9A63B] hover:bg-[#40362D] cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-[#D9A63B]/15 text-[#D9A63B] rounded-xs border border-[#D9A63B]/20">
                      {cat.tag}
                    </span>
                    <Icon className="w-5 h-5 text-[#F1E9DC]/40 group-hover:text-[#D9A63B] transition-colors" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F1E9DC] mb-2.5 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-[#F1E9DC]/70 leading-relaxed m-0">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1E9DC]/10 flex items-center justify-between text-xs text-[#D9A63B] font-semibold">
                  <span>Bu alanda talep oluştur</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom / Other Category Banner */}
        <div className="mt-8 p-6 bg-[#3A322B]/50 border border-[#F1E9DC]/10 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D9A63B]/20 text-[#D9A63B] flex items-center justify-center font-bold">
              ?
            </div>
            <div>
              <div className="font-semibold text-sm text-[#F1E9DC]">Farklı veya hibrit bir fikrin mi var?</div>
              <div className="text-xs text-[#F1E9DC]/60">Örneğin: Karavan tasarımı, atölye tabelası veya vitrin düzenlemesi</div>
            </div>
          </div>

          <button
            onClick={() => onSelectCategoryForBrief('Diğer')}
            className="text-xs font-semibold px-4 py-2 bg-transparent hover:bg-[#F1E9DC]/10 text-[#F1E9DC] border border-[#F1E9DC]/25 rounded-xs transition-colors whitespace-nowrap"
          >
            Özel Fikrini Anlat
          </button>
        </div>

      </div>
    </section>
  );
};
