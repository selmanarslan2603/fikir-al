import { CorkboardNote, DesignRequest } from '../types';

export const INITIAL_CORKBOARD_NOTES: CorkboardNote[] = [
  {
    id: 'note-1',
    title: 'İç Mekan & Işık',
    category: 'İç Mekan & Dekorasyon',
    desc: 'Oturma odana taze düzen ve doğal ışık dengesi',
    tag: 'Mekan',
    noteStyle: 'paper',
    pinColor: '#A24E30',
    rotation: -4,
    expandedDetails: {
      problem: 'Kuzey cepheli, dar ve mobilyalarla boğulmuş 22m² oturma odası.',
      conceptSolution: 'Alçak profilli masif ahşap sehpalar, keten perde geçişleri ve difüzör sıcak aydınlatma ile ferahlatıcı açık yerleşim taslağı.',
      colorPalette: ['#F1E7D2', '#C08A57', '#3E5A73', '#221D19'],
      suggestedMaterials: ['Doğal Keten', 'Huş Ağacı', 'Brüt Seramik', 'Pirinç Aksam'],
    },
  },
  {
    id: 'note-2',
    title: 'Marka & Kimlik',
    category: 'Marka & Logo',
    desc: 'Butik kahve kavurucusu için taze ve samimi bir logo yönü',
    tag: 'Kimlik',
    noteStyle: 'kraft',
    pinColor: '#D9A63B',
    rotation: 5,
    expandedDetails: {
      problem: 'Geleneksel kahve simgelerinden (çekirdek, fincan) uzak, modern ama zanaatkar bir kimlik.',
      conceptSolution: 'El yapımı tipografi ve retro botanik çizimlerle harmanlanmış vintage damga konsepti.',
      colorPalette: ['#221D19', '#A6713F', '#F1E9DC', '#D9A63B'],
      suggestedMaterials: ['Kraft Ambalaj', 'Kabartma Lak', 'Mat Pamuk Etiket'],
    },
  },
  {
    id: 'note-3',
    title: 'Moda & Kapsül Gardırop',
    category: 'Moda & Stil',
    desc: 'Mevsim geçişi için 12 parçalık zamansız stil rehberi',
    tag: 'Kişisel',
    noteStyle: 'blueprint',
    pinColor: '#D9A63B',
    rotation: 3,
    expandedDetails: {
      problem: 'Dolap dolu ama her sabah "ne giyeceğim" kararsızlığı.',
      conceptSolution: 'Birbiriyle %100 kombinlenebilen 3 ceket, 4 pantolon, 5 gömlek/kazak ile ton sür ton monokrom rehber.',
      colorPalette: ['#3E5A73', '#E4D6B8', '#A24E30', '#221D19'],
      suggestedMaterials: ['Yün Gabardin', 'Ağır Gramaj Pamuk', 'Ham İpek Şal'],
    },
  },
  {
    id: 'note-4',
    title: 'Zeytinyağı Ambalajı',
    category: 'Ambalaj Tasarımı',
    desc: 'Ege taş baskı zeytinyağı için artisanal koyu cam etiket',
    tag: 'Ürün',
    noteStyle: 'paper',
    pinColor: '#A24E30',
    rotation: -3,
    expandedDetails: {
      problem: 'Organik ürünün lüks raflarda kaybolması ve sıradan görünmesi.',
      conceptSolution: 'UV korumalı koyu yeşil silindirik şişe üzerinde altın varaklı tipografik damga ve yırtık kenarlı dokulu kağıt.',
      colorPalette: ['#2A3626', '#D9A63B', '#F1E7D2', '#221D19'],
      suggestedMaterials: ['Doku Kağıdı (Fedrigoni)', 'Koyu Cam', 'Ahşap Tıpa'],
    },
  },
  {
    id: 'note-5',
    title: 'Sosyal Medya Dili',
    category: 'Sosyal Medya Görselleri',
    desc: 'Mimarlık ofisi için ritmik ve minimalist Instagram şablonları',
    tag: 'Dijital',
    noteStyle: 'blueprint',
    pinColor: '#A24E30',
    rotation: 2,
    expandedDetails: {
      problem: 'Düzensiz paylaşımlar yüzünden dağınık ve profesyonel olmayan profil görünümü.',
      conceptSolution: '9’lu ızgara mantığında 1:1 tipografik alıntılar, eskiz detayları ve monokrom proje fotoğrafları için grid sistemi.',
      colorPalette: ['#2E4459', '#F1E9DC', '#C08A57'],
      suggestedMaterials: ['Tipografik Izgara', 'Yüksek Kontrast', 'Mikro Animasyon'],
    },
  },
  {
    id: 'note-6',
    title: 'Bağ Evi Düğün Davetiyesi',
    category: 'Etkinlik & Davetiye',
    desc: 'Urla bağlarında açık hava nikahı için mühürlü konsept',
    tag: 'Anı',
    noteStyle: 'kraft',
    pinColor: '#D9A63B',
    rotation: -5,
    expandedDetails: {
      problem: 'Klasik yaldızlı düğün davetiyelerinin samimi bağ atmosferine uymaması.',
      conceptSolution: 'Asma yaprağı botanik illüstrasyonu, bordo balmumu mühür ve keten iple sarılmış el yapımı pamuklu kağıt seti.',
      colorPalette: ['#A24E30', '#C08A57', '#F1E7D2', '#221D19'],
      suggestedMaterials: ['Pamuklu El Yapımı Kağıt', 'Bordo Balmumu', 'Keten Sicim'],
    },
  },
];

export const INITIAL_REQUESTS: DesignRequest[] = [
  {
    id: 'req-1',
    code: 'PF-8492',
    name: 'Deniz Yılmaz',
    email: 'deniz@example.com',
    category: 'İç Mekan & Dekorasyon',
    message: 'Kadıköy’deki stüdyo dairem için hem çalışma alanı hem dinlenme köşesi barındıran sıcak bir ahşap düzen fikri arıyorum.',
    stylePreference: 'İskandinav & Sıcak Ahşap',
    preferredColors: ['#F1E7D2', '#C08A57', '#221D19'],
    createdAt: '2026-09-10 14:30',
    status: 'taslak_hazirlaniyor',
    paymentStatus: 'onaylandi',
    kaporaAmount: 150,
    consultantNotes: 'İlk yerleşim eskizleri çizildi. Keten perde ve sepet aydınlatma konsepti ekleniyor.',
    conceptDraftTitle: 'Akustik Ahşap Bölmeli Stüdyo Çözümü',
    conceptDraftDetails: 'Giriş ile çalışma masasını bölen çıtalı hafif ahşap panel ve gün ışığını yönlendiren açılı ayna konsepti.',
    receiptNote: '10.09.2026 tarihli 150 TL FAST ödemesi Deniz Yılmaz açıklamasıyla alındı.',
  },
  {
    id: 'req-2',
    code: 'PF-9104',
    name: 'Canan Kaya',
    email: 'canan@example.com',
    category: 'Marka & Logo',
    message: 'El yapımı seramik atölyem "Toprak & Ateş" için minimalist ve samimi bir logo arayışındayım.',
    stylePreference: 'Wabi-Sabi & Zanaatkar',
    preferredColors: ['#A24E30', '#D9A63B', '#F1E9DC'],
    createdAt: '2026-09-11 11:15',
    status: 'kapora_bekleniyor',
    paymentStatus: 'dekont_iletildi',
    kaporaAmount: 150,
    consultantNotes: 'Müşteri dekont yükledi, banka hesabından kontrol edilip onaylanacak.',
    receiptNote: 'Dekont e-posta ile iletildi (Garanti BBVA referans no: 8841293)',
  },
];

const STORAGE_KEY_REQUESTS = 'panoda_fikir_requests_v1';
const STORAGE_KEY_USER = 'panoda_fikir_user_v1';

export function getStoredRequests(): DesignRequest[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_REQUESTS;
}

export function saveStoredRequests(requests: DesignRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  } catch (e) {
    console.error(e);
  }
}
