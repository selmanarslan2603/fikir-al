import React, { useState, useEffect } from 'react';
import { CorkboardNote, DesignRequest, CategoryType } from './types';
import {
  INITIAL_CORKBOARD_NOTES,
  getStoredRequests,
  saveStoredRequests,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroCorkboard } from './components/HeroCorkboard';
import { WorkflowSteps } from './components/WorkflowSteps';
import { CategoriesGrid } from './components/CategoriesGrid';
import { InteractiveCorkboardExplorer } from './components/InteractiveCorkboardExplorer';
import { PaymentSection } from './components/PaymentSection';
import { WhyUs } from './components/WhyUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConceptDetailModal } from './components/ConceptDetailModal';
import { BriefRequestModal } from './components/BriefRequestModal';
import { ReceiptNotifyModal } from './components/ReceiptNotifyModal';
import { TrackerModal } from './components/TrackerModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const [notes, setNotes] = useState<CorkboardNote[]>(INITIAL_CORKBOARD_NOTES);
  const [requests, setRequests] = useState<DesignRequest[]>(() => getStoredRequests());
  const [selectedNote, setSelectedNote] = useState<CorkboardNote | null>(null);
  
  // Modals state
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [briefModalCategory, setBriefModalCategory] = useState<CategoryType | undefined>(undefined);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // PWA install hook
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // User state
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('panoda_user_email') || null;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save requests whenever they change
  useEffect(() => {
    saveStoredRequests(requests);
  }, [requests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleOpenBriefModal = (category?: string) => {
    if (category) {
      setBriefModalCategory(category as CategoryType);
    } else {
      setBriefModalCategory(undefined);
    }
    setIsBriefModalOpen(true);
  };

  const handleOpenInstall = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        showToast('Panoda Fikir başarıyla yüklendi!');
      }
    } else {
      setShowInstallGuide(true);
    }
  };

  const handleNewRequestCreated = (newReq: DesignRequest) => {
    setRequests(prev => [newReq, ...prev]);
    showToast(`Talebin alındı! Takip kodun: ${newReq.code}`);
  };

  const handleUpdateRequest = (updated: DesignRequest) => {
    setRequests(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    showToast(`${updated.code} talebinin durumu güncellendi.`);
  };

  const handleAddNewCorkboardNote = (newNote: CorkboardNote) => {
    setNotes(prev => [newNote, ...prev]);
    showToast(`"${newNote.title}" konsepti panoya raptiyelendi!`);
  };

  const handleSubmitReceipt = (codeOrEmail: string, receiptNote: string): boolean => {
    const found = requests.find(
      r =>
        r.code.toLowerCase() === codeOrEmail.toLowerCase() ||
        r.email.toLowerCase() === codeOrEmail.toLowerCase()
    );

    if (found) {
      const updated: DesignRequest = {
        ...found,
        paymentStatus: 'dekont_iletildi',
        receiptNote,
        consultantNotes: `Dekont bildirimi alındı (${receiptNote}). Kontrol edilip onaylanacak.`,
      };
      handleUpdateRequest(updated);
      return true;
    }
    return false;
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('panoda_user_email', email);
    showToast(`Hoş geldin, ${email}!`);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('panoda_user_email');
    showToast('Çıkış yapıldı.');
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#221D19] text-[#F1E9DC] selection:bg-[#D9A63B] selection:text-[#221D19] flex flex-col font-sans">
      
      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* PWA Install Banner & iOS Guidance Modal */}
      <PWAInstallBanner
        forceShowIOSGuide={showInstallGuide}
        onCloseIOSGuide={() => setShowInstallGuide(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#F1E7D2] text-[#221D19] px-5 py-3 rounded-xs shadow-[5px_6px_0_rgba(0,0,0,0.4)] border border-[#C9BA9B] font-semibold text-xs flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#D9A63B]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenBriefModal={() => handleOpenBriefModal()}
        onOpenTrackerModal={() => setIsTrackerModalOpen(true)}
        onToggleAdmin={() => setIsAdminModalOpen(true)}
        isAdmin={isAdmin}
        userEmail={userEmail}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={handleLogout}
        requestsCount={requests.length}
        onOpenInstallGuide={handleOpenInstall}
        isPWAInstalled={isInstalled}
      />

      {/* Main Content Sections with mobile bottom padding so fixed tabbar doesn't overlap */}
      <main className="flex-1 pb-18 md:pb-0">
        {/* Hero Section with Corkboard and Pinned Concept Notes */}
        <HeroCorkboard
          notes={notes}
          onOpenBriefModal={handleOpenBriefModal}
          onSelectNote={(note) => setSelectedNote(note)}
          onAddQuickNote={() => setIsAdminModalOpen(true)}
        />

        {/* 3-Step Process */}
        <WorkflowSteps
          onStartStep={(stepNum) => {
            if (stepNum === 1) handleOpenBriefModal();
          }}
        />

        {/* Design Categories Grid */}
        <CategoriesGrid
          onSelectCategoryForBrief={(cat) => handleOpenBriefModal(cat)}
        />

        {/* Interactive Corkboard Explorer / Inspirations */}
        <InteractiveCorkboardExplorer
          notes={notes}
          onSelectNote={(note) => setSelectedNote(note)}
          onOpenBriefModal={handleOpenBriefModal}
        />

        {/* Consultation Process & Direct Payment Workflow */}
        <PaymentSection
          onOpenBriefModal={() => handleOpenBriefModal()}
        />

        {/* Why Choose Us & Client Quote */}
        <WhyUs />

        {/* Contact & Request Brief Form */}
        <ContactSection
          onNewRequestCreated={handleNewRequestCreated}
          preselectedCategory={briefModalCategory}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile-Native Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenBriefModal={() => handleOpenBriefModal()}
        onOpenTrackerModal={() => setIsTrackerModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenInstallGuide={handleOpenInstall}
        requestsCount={requests.length}
        isPWAInstalled={isInstalled}
      />

      {/* Interactive Modals */}
      <ConceptDetailModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onRequestSimilar={(category) => handleOpenBriefModal(category)}
      />

      <BriefRequestModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        onNewRequestCreated={handleNewRequestCreated}
        initialCategory={briefModalCategory}
      />

      <ReceiptNotifyModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        requests={requests}
        onSubmitReceipt={handleSubmitReceipt}
      />

      <TrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        requests={requests}
        onOpenReceiptNotify={() => setIsReceiptModalOpen(true)}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        requests={requests}
        onUpdateRequest={handleUpdateRequest}
        onAddNewCorkboardNote={handleAddNewCorkboardNote}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
