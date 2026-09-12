export type CategoryType = 
  | 'İç Mekan & Dekorasyon'
  | 'Marka & Logo'
  | 'Moda & Stil'
  | 'Sosyal Medya Görselleri'
  | 'Ambalaj Tasarımı'
  | 'Etkinlik & Davetiye'
  | 'Diğer';

export type RequestStatus = 
  | 'talep_alindi' 
  | 'kapora_bekleniyor' 
  | 'taslak_hazirlaniyor' 
  | 'onay_bekliyor' 
  | 'tamamlandi';

export type PaymentStatus = 
  | 'bekliyor' 
  | 'dekont_iletildi' 
  | 'onaylandi';

export interface DesignRequest {
  id: string;
  code: string;
  name: string;
  email: string;
  category: CategoryType;
  message: string;
  stylePreference?: string;
  preferredColors?: string[];
  createdAt: string;
  status: RequestStatus;
  paymentStatus: PaymentStatus;
  kaporaAmount: number;
  consultantNotes?: string;
  conceptDraftTitle?: string;
  conceptDraftDetails?: string;
  receiptNote?: string;
}

export interface CorkboardNote {
  id: string;
  title: string;
  category: CategoryType;
  desc: string;
  tag: string;
  noteStyle: 'paper' | 'kraft' | 'blueprint' | 'rust';
  pinColor: string;
  rotation: number;
  expandedDetails: {
    problem: string;
    conceptSolution: string;
    colorPalette: string[];
    suggestedMaterials: string[];
  };
}
