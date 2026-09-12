import React, { useState } from 'react';
import { X, ShieldCheck, Check, Edit3, Plus, Filter, Sparkles, Send, CreditCard, Layers, MessageSquare } from 'lucide-react';
import { DesignRequest, RequestStatus, PaymentStatus, CorkboardNote, CategoryType } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: DesignRequest[];
  onUpdateRequest: (updated: DesignRequest) => void;
  onAddNewCorkboardNote: (note: CorkboardNote) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  requests,
  onUpdateRequest,
  onAddNewCorkboardNote,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'new_note'>('requests');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [editingReqId, setEditingReqId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [tempDraftTitle, setTempDraftTitle] = useState('');

  // New Note form state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<CategoryType>('İç Mekan & Dekorasyon');
  const [newNoteDesc, setNewNoteDesc] = useState('');
  const [newNoteProblem, setNewNoteProblem] = useState('');
  const [newNoteSolution, setNewNoteSolution] = useState('');
  const [newNoteColors, setNewNoteColors] = useState('#221D19, #D9A63B, #F1E7D2, #A24E30');
  const [newNoteMaterials, setNewNoteMaterials] = useState('Masif Ahşap, Keten, Pirinç');
  const [newNoteStyle, setNewNoteStyle] = useState<'paper' | 'kraft' | 'blueprint'>('paper');

  if (!isOpen) return null;

  const filteredRequests = requests.filter((r) => {
    if (selectedStatusFilter === 'all') return true;
    return r.status === selectedStatusFilter;
  });

  const handleStatusChange = (req: DesignRequest, newStatus: RequestStatus) => {
    onUpdateRequest({
      ...req,
      status: newStatus,
    });
  };

  const handlePaymentStatusChange = (req: DesignRequest, newPayStatus: PaymentStatus) => {
    onUpdateRequest({
      ...req,
      paymentStatus: newPayStatus,
      status: newPayStatus === 'onaylandi' && req.status === 'kapora_bekleniyor' ? 'taslak_hazirlaniyor' : req.status,
    });
  };

  const handleQuickRequestPayment = (req: DesignRequest) => {
    const customMsg = `Talebinizi inceledim, kapsam gayet uygun. İlk konsept taslağı üzerine çalışmaya başlamam için lütfen kapora transferinizi tamamlayınız.`;
    onUpdateRequest({
      ...req,
      status: 'kapora_bekleniyor',
      consultantNotes: customMsg,
    });
  };

  const handleSaveNotes = (req: DesignRequest) => {
    onUpdateRequest({
      ...req,
      consultantNotes: tempNotes,
      conceptDraftTitle: tempDraftTitle,
    });
    setEditingReqId(null);
  };

  const handleCreateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteDesc.trim()) return;

    const colors = newNoteColors.split(',').map(c => c.trim()).filter(Boolean);
    const materials = newNoteMaterials.split(',').map(m => m.trim()).filter(Boolean);

    let tag = 'Mekan';
    if (newNoteCategory === 'Marka & Logo') tag = 'Kimlik';
    if (newNoteCategory === 'Moda & Stil') tag = 'Kişisel';
    if (newNoteCategory === 'Ambalaj Tasarımı') tag = 'Ürün';
    if (newNoteCategory === 'Sosyal Medya Görselleri') tag = 'Dijital';
    if (newNoteCategory === 'Etkinlik & Davetiye') tag = 'Anı';

    const newNote: CorkboardNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      category: newNoteCategory,
      desc: newNoteDesc,
      tag,
      noteStyle: newNoteStyle,
      pinColor: newNoteStyle === 'blueprint' ? '#D9A63B' : '#A24E30',
      rotation: (Math.random() * 8) - 4,
      expandedDetails: {
        problem: newNoteProblem || 'Kullanıcının ilettiği tasarım ve konsept ihtiyacı.',
        conceptSolution: newNoteSolution || newNoteDesc,
        colorPalette: colors.length > 0 ? colors : ['#221D19', '#D9A63B', '#F1E9DC'],
        suggestedMaterials: materials.length > 0 ? materials : ['Keten', 'Kraft Kağıt', 'Ahşap'],
      },
    };

    onAddNewCorkboardNote(newNote);
    setActiveTab('requests');
    setNewNoteTitle('');
    setNewNoteDesc('');
    setNewNoteProblem('');
    setNewNoteSolution('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#221D19] text-[#F1E9DC] rounded-xs shadow-[10px_12px_0_rgba(0,0,0,0.6)] border border-[#F1E9DC]/20 p-6 sm:p-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F1E9DC] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F1E9DC]/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9A63B] mb-1">
              <ShieldCheck className="w-4 h-4" />
              Yönetici Modu (Selman Arslan)
            </div>
            <h3 className="font-display font-bold text-2xl text-[#F1E9DC]">
              Danışman Yönetim Paneli
            </h3>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center gap-2 bg-[#3A322B] p-1 rounded-xs border border-[#F1E9DC]/10 text-xs">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3 py-1.5 rounded-xs font-semibold transition-colors ${
                activeTab === 'requests'
                  ? 'bg-[#D9A63B] text-[#221D19]'
                  : 'text-[#F1E9DC]/70 hover:text-white'
              }`}
            >
              Gelen Talepler ({requests.length})
            </button>
            <button
              onClick={() => setActiveTab('new_note')}
              className={`px-3 py-1.5 rounded-xs font-semibold transition-colors flex items-center gap-1 ${
                activeTab === 'new_note'
                  ? 'bg-[#D9A63B] text-[#221D19]'
                  : 'text-[#F1E9DC]/70 hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              Panoya Not Ekle
            </button>
          </div>
        </div>

        {/* Tab 1: Requests Management */}
        {activeTab === 'requests' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2 pb-2 text-xs">
              <span className="text-[#F1E9DC]/60 font-semibold">Filtre:</span>
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'talep_alindi', label: 'Yeni Gelenler' },
                { id: 'kapora_bekleniyor', label: 'Ödeme İstendi' },
                { id: 'taslak_hazirlaniyor', label: 'Taslak Çizilenler' },
                { id: 'tamamlandi', label: 'Tamamlananlar' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedStatusFilter(f.id)}
                  className={`px-2.5 py-1 rounded-xs border text-[11px] transition-colors ${
                    selectedStatusFilter === f.id
                      ? 'bg-[#D9A63B] text-[#221D19] border-[#D9A63B] font-bold'
                      : 'bg-[#3A322B] text-[#F1E9DC]/70 border-[#F1E9DC]/10 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center bg-[#3A322B]/40 rounded-xs border border-[#F1E9DC]/10 text-xs text-[#F1E9DC]/60">
                Bu filtrede talep bulunmuyor.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 bg-[#3A322B] rounded-xs border border-[#F1E9DC]/15 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs bg-[#221D19] text-[#D9A63B] px-2 py-0.5 rounded-xs border border-[#D9A63B]/30">
                          {req.code}
                        </span>
                        <h4 className="font-display font-bold text-base text-[#F1E9DC]">
                          {req.name}
                        </h4>
                        <span className="text-xs text-[#F1E9DC]/60">({req.email})</span>
                      </div>
                      <div className="text-xs text-[#D9A63B] font-medium">
                        {req.category} • {req.stylePreference}
                      </div>
                    </div>

                    {/* Status Selectors & Actions */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {req.status === 'talep_alindi' && (
                        <button
                          onClick={() => handleQuickRequestPayment(req)}
                          className="px-2.5 py-1 rounded-xs font-semibold bg-[#D9A63B] text-[#221D19] hover:bg-[#c9952b] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Ödeme İste</span>
                        </button>
                      )}

                      {/* Payment status badge/button */}
                      <button
                        onClick={() =>
                          handlePaymentStatusChange(
                            req,
                            req.paymentStatus === 'onaylandi' ? 'bekliyor' : 'onaylandi'
                          )
                        }
                        className={`px-2.5 py-1 rounded-xs font-semibold border transition-colors flex items-center gap-1 cursor-pointer ${
                          req.paymentStatus === 'onaylandi'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : req.paymentStatus === 'dekont_iletildi'
                            ? 'bg-amber-950 text-amber-300 border-amber-600 animate-pulse'
                            : 'bg-red-950 text-red-300 border-red-800'
                        }`}
                        title="Tıkla ve ödeme durumunu değiştir"
                      >
                        <CreditCard className="w-3 h-3" />
                        {req.paymentStatus === 'onaylandi' && 'Ödeme Alındı ✓'}
                        {req.paymentStatus === 'dekont_iletildi' && 'Dekont İletildi (Onayla)'}
                        {req.paymentStatus === 'bekliyor' && 'Ödeme Bekleniyor (Onayla)'}
                      </button>

                      {/* Main Status Dropdown */}
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req, e.target.value as RequestStatus)}
                        className="px-2.5 py-1 bg-[#221D19] border border-[#F1E9DC]/20 text-[#F1E9DC] rounded-xs text-xs cursor-pointer"
                      >
                        <option value="talep_alindi">Talep Alındı (İncelemede)</option>
                        <option value="kapora_bekleniyor">Ödeme / Kapora İstendi</option>
                        <option value="taslak_hazirlaniyor">Taslak Hazırlanıyor</option>
                        <option value="onay_bekliyor">Danışan Onayında</option>
                        <option value="tamamlandi">Tamamlandı</option>
                      </select>
                    </div>
                  </div>

                  {/* Client Brief */}
                  <div className="p-3 bg-[#221D19]/70 rounded-xs border border-[#F1E9DC]/10 text-xs text-[#F1E9DC]/80">
                    <span className="font-bold text-[#F1E9DC] block mb-1">Müşteri Açıklaması:</span>
                    <p className="m-0 italic whitespace-pre-line">"{req.message}"</p>
                  </div>

                  {/* Receipt note if any */}
                  {req.receiptNote && (
                    <div className="p-2.5 bg-amber-950/40 border border-amber-800/40 rounded-xs text-[11px] text-amber-200">
                      <strong>Danışan Ödeme Notu:</strong> {req.receiptNote}
                    </div>
                  )}

                  {/* Consultant Draft & Notes section */}
                  {editingReqId === req.id ? (
                    <div className="p-4 bg-[#221D19] border border-[#D9A63B] rounded-xs space-y-3">
                      <div className="text-xs font-bold text-[#D9A63B]">Danışman Notu & Taslak Başlığı Ekle:</div>
                      <div>
                        <input
                          type="text"
                          value={tempDraftTitle}
                          onChange={(e) => setTempDraftTitle(e.target.value)}
                          placeholder="Taslak Konsept Başlığı (Örn: Çıtalı Ahşap ve Aydınlatma Planı)"
                          className="w-full px-3 py-1.5 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs mb-2"
                        />
                        <textarea
                          rows={3}
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Danışana iletmek istediğin not, IBAN/ödeme talimatı veya taslak linki..."
                          className="w-full px-3 py-1.5 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingReqId(null)}
                          className="px-3 py-1 text-xs text-[#F1E9DC]/60 hover:text-white"
                        >
                          İptal
                        </button>
                        <button
                          onClick={() => handleSaveNotes(req)}
                          className="px-4 py-1.5 bg-[#D9A63B] text-[#221D19] text-xs font-bold rounded-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Kaydet & Müşteriye Göster
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1 border-t border-[#F1E9DC]/10 text-xs">
                      <div className="text-[#F1E9DC]/70">
                        {req.consultantNotes ? (
                          <span className="text-emerald-400">Danışman Notu: "{req.consultantNotes.slice(0, 50)}..."</span>
                        ) : (
                          <span className="text-[#F1E9DC]/40">Henüz danışman notu girilmedi</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setEditingReqId(req.id);
                          setTempNotes(req.consultantNotes || '');
                          setTempDraftTitle(req.conceptDraftTitle || '');
                        }}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[#F1E9DC] rounded-xs text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Not & Ödeme Mesajı Düzenle</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Add New Corkboard Note */}
        {activeTab === 'new_note' && (
          <form onSubmit={handleCreateNoteSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="p-3 bg-[#3A322B] rounded-xs text-xs text-[#F1E9DC]/80 border border-[#F1E9DC]/10">
              Buradan ekleyeceğiniz konsept notu, web sitenizin ana sayfasındaki <strong>Fikir Panosu</strong>na anında bir raptiye ile iğnelenir.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Konsept Başlığı
                </label>
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Örn: Kuzguncuk Yalı Dairesi Renk Planı"
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Kategori
                </label>
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value as CategoryType)}
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
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
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                Kısa Kart Özeti (Panoda Görünen)
              </label>
              <input
                type="text"
                required
                value={newNoteDesc}
                onChange={(e) => setNewNoteDesc(e.target.value)}
                placeholder="Örn: 22m² dar salon için ferahlatıcı açık yerleşim taslağı"
                className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Problem / Başlangıç
                </label>
                <textarea
                  rows={2}
                  value={newNoteProblem}
                  onChange={(e) => setNewNoteProblem(e.target.value)}
                  placeholder="Mekanın veya markanın temel sıkıntısı neydi?"
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Tasarım Çözümü & Fikir
                </label>
                <textarea
                  rows={2}
                  value={newNoteSolution}
                  onChange={(e) => setNewNoteSolution(e.target.value)}
                  placeholder="Panoda önerdiğin elle tutulur çözüm"
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Renk Paleti (Virgülle Ayrılmış HEX)
                </label>
                <input
                  type="text"
                  value={newNoteColors}
                  onChange={(e) => setNewNoteColors(e.target.value)}
                  placeholder="#221D19, #D9A63B, #F1E7D2"
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F1E9DC]/80 uppercase mb-1">
                  Kağıt / Not Stili
                </label>
                <select
                  value={newNoteStyle}
                  onChange={(e) => setNewNoteStyle(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#3A322B] border border-[#F1E9DC]/20 text-xs text-white rounded-xs"
                >
                  <option value="paper">Açık Kağıt (Paper)</option>
                  <option value="kraft">Kahverengi Kraft</option>
                  <option value="blueprint">Mavi Blueprint</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D9A63B] text-[#221D19] font-bold text-xs rounded-xs flex items-center gap-2 hover:bg-[#c9952b] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Panoya İğnele & Yayınla</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
