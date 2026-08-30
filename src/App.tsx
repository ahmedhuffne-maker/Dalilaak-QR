import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { PosterConfig, PosterFormat } from './types';
import { BUSINESS_PRESETS, THEME_PRESETS, generateRandomMix } from './presets';
import { generateHighResBlob } from './utils/canvasRenderer';
import { generateSmartContextualTexts } from './utils/textGeneratorEngine';
import confetti from 'canvas-confetti';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  CheckCircle2,
  Share2,
  Dices,
  Edit3,
  Eye,
  Download,
  Printer,
  Wand2
} from 'lucide-react';

import { DalilakActivitiesModal } from './components/DalilakActivitiesModal';
import { mapBusinessToPosterConfig } from './services/dalilakService';
import { DalilakBusiness } from './types';

const INITIAL_CONFIG: PosterConfig = {
  businessName: 'لَمْعَة لِغَسِيل السَّيَّارَات',
  businessSubtitle: 'LAMAA CAR WASH & DETAILING',
  category: 'خدمات سيارات',
  showActivityNumber: false,
  activityNumber: '',
  activityNumberLabel: 'رقم النشاط',
  activityShowWhatsAppIcon: true,
  activityShowPhoneIcon: true,
  
  mainText: 'شاركنا رأيك\nوتقييمك',
  secondaryText: 'رأيك يهمنا في نظافة ولمعان سيارتك',
  showRatingScore: false,
  ratingScore: '5.0',
  starCount: 5,
  
  qrType: 'generated',
  qrUrl: 'https://maps.google.com/?q=lamaa+car+wash',
  uploadedQrDataUrl: null,
  qrColor: '#000000',
  qrBgColor: '#ffffff',
  qrLogoCenter: true,
  qrCenterLogoType: 'dalilak',
  qrScale: 1.25,
  
  logoType: 'icon',
  selectedIcon: 'Car',
  uploadedLogoDataUrl: null,
  logoScale: 1.15,
  
  themeId: 'classic-paper',
  bgColor: '#f6f0e6',
  bgTexture: 'paper',
  textColor: '#1c1917',
  accentColor: '#e5a82e',
  fontFamily: 'Cairo',
  format: 'a4',
  
  showFooter: true,
  footerPhone: '01556221141',
  footerWhatsApp: '01556221141',
  footerShowWhatsAppIcon: true,
  footerShowPhoneIcon: false,
  footerBgColor: '#070d18',
  footerTextColor: '#ffffff',
  footerAccentColor: '#e5a82e',
  showDalilakBranding: true,
  dalilakText: 'دليلك',
  dalilakSubtext: 'المنصة الشاملة لإدارة وتوثيق الأنشطة والخدمات الميدانية',
  footerWebsite: 'www.dalilaak.com',
  
  showGoogleBadge: false,
  showNfcBadge: false,
  nfcText: 'امسح بالكاميرا أو مرر بطاقة NFC',
  showMapPinBadge: false,
  borderStyle: 'none'
};

export default function App() {
  const [config, setConfig] = useState<PosterConfig>(INITIAL_CONFIG);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [mobileActiveView, setMobileActiveView] = useState<'controls' | 'preview'>('controls');
  const [isDalilakModalOpen, setIsDalilakModalOpen] = useState<boolean>(false);

  // Handle selecting a live Dalilak business
  const handleSelectDalilakBusiness = (business: DalilakBusiness) => {
    const updatedConfig = mapBusinessToPosterConfig(business, config);
    setConfig(updatedConfig);
    
    // Switch to preview on mobile to see result instantly
    setMobileActiveView('preview');

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Apply Business Preset
  const handleSelectPreset = (presetId: string) => {
    const preset = BUSINESS_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const theme = THEME_PRESETS.find((t) => t.id === preset.defaultTheme) || THEME_PRESETS[0];

    setConfig((prev) => ({
      ...prev,
      businessName: preset.businessName,
      businessSubtitle: preset.businessSubtitle,
      mainText: preset.mainText,
      secondaryText: preset.secondaryText,
      footerPhone: '01556221141',
      category: preset.category,
      selectedIcon: preset.iconName,
      logoType: 'icon',
      themeId: theme.id,
      bgColor: theme.bgColor,
      bgTexture: theme.bgTexture,
      textColor: theme.textColor,
      accentColor: theme.accentColor,
      footerBgColor: theme.footerBgColor,
      footerTextColor: theme.footerTextColor,
      footerAccentColor: theme.footerAccentColor,
      borderStyle: theme.borderStyle
    }));
  };

  // Reset to initial
  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين كافة البيانات إلى الإعدادات الافتراضية؟')) {
      setConfig(INITIAL_CONFIG);
    }
  };

  // Format Switch
  const handleChangeFormat = (format: PosterFormat) => {
    setConfig((prev) => ({ ...prev, format }));
  };

  // Random Mix Trigger
  const handleRandomMix = () => {
    setConfig((prev) => generateRandomMix(prev));
  };

  // Download High-Res Trigger
  const handleDownloadHighRes = async () => {
    try {
      setIsRendering(true);
      const blob = await generateHighResBlob(config, 3.0);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `poster-${(config.businessName || 'review').replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsRendering(false);
    }
  };

  // Print Trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-['Tajawal',sans-serif] overflow-x-hidden pb-24 lg:pb-0 pt-[var(--sat)]">
      
      {/* PWA Install Banner */}
      <PwaInstallPrompt />

      {/* Header Bar */}
      <Header
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onRandomMix={handleRandomMix}
        onDownloadHighRes={handleDownloadHighRes}
        onPrint={handlePrint}
        onOpenDalilakModal={() => setIsDalilakModalOpen(true)}
        config={config}
        isRendering={isRendering}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-4">
        
        {/* Google Review Tips (Collapsible when requested from tips button) */}
        {showTips && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 sm:p-5 text-right space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <h3 className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              خطوات استخراج رابط تقييم Google Maps المباشر لنشاطك التجاري:
            </h3>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pr-2 leading-relaxed">
              <li>افتح تطبيق <strong>خرائط Google (Google Maps)</strong> أو ابحث عن اسم نشاطك التجاري في محرك البحث Google.</li>
              <li>انقر على ملف نشاطك التجاري، ثم اضغط على زر <strong>"طلب مراجعات" (Ask for reviews)</strong> أو "مشاركة الملف التجاري".</li>
              <li>انسخ الرابط المختصر (مثل <code className="text-amber-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">https://g.page/r/xxxxx/review</code>).</li>
              <li>الصق الرابط في خانة <strong>"رمز QR والرابط"</strong> في لوحة التحكم، وسيتم توليد رمز QR فوري صالح للمسح المباشر بكاميرا أي هاتف!</li>
            </ol>
          </div>
        )}

        {/* Mobile View Switcher (Visible only on mobile) */}
        <div className="lg:hidden flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-lg sticky top-[57px] z-30 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMobileActiveView('controls')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 min-h-[44px] ${
              mobileActiveView === 'controls'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>لوحة التعديل والبيانات</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileActiveView('preview')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 min-h-[44px] ${
              mobileActiveView === 'preview'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>معاينة الملصق المباشرة</span>
            {isRendering && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
          </button>
        </div>

        {/* 2-Column Professional Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Controls Column (5 Cols) */}
          <div className={`lg:col-span-5 w-full ${mobileActiveView === 'controls' ? 'block' : 'hidden lg:block'}`}>
            <ControlsPanel
              config={config}
              onChange={setConfig}
              onApplyPreset={handleSelectPreset}
              onRandomMix={handleRandomMix}
              onOpenDalilakModal={() => setIsDalilakModalOpen(true)}
            />
          </div>

          {/* Right Column (7 Cols): Bento Studio Canvas & Live Mockup */}
          <div className={`lg:col-span-7 w-full lg:sticky lg:top-20 ${mobileActiveView === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <PreviewPanel
              config={config}
              onChangeFormat={handleChangeFormat}
              onChangeConfig={setConfig}
              onRandomMix={handleRandomMix}
              isRendering={isRendering}
              setIsRendering={setIsRendering}
            />
          </div>

        </div>

      </main>

      {/* Floating Bottom Quick Action Dock for Mobile Devices */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800/90 p-2.5 px-3 pb-[calc(0.625rem+var(--sab))] shadow-2xl flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setMobileActiveView(mobileActiveView === 'controls' ? 'preview' : 'controls')}
          className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 min-h-[44px]"
        >
          {mobileActiveView === 'controls' ? (
            <>
              <Eye className="w-4 h-4 text-amber-400" />
              <span>عرض المعاينة</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>تعديل البيانات</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleRandomMix}
          className="p-2.5 bg-slate-800 hover:bg-slate-750 text-amber-400 rounded-xl border border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 active:scale-95"
          title="مزج عشوائي"
        >
          <Dices className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl border border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
          title="طباعة فورية"
        >
          <Printer className="w-5 h-5 text-amber-400" />
        </button>

        <button
          type="button"
          onClick={handleDownloadHighRes}
          className="flex-1 py-2.5 px-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 min-h-[44px] active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>تحميل PNG</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            صانع ملصقات التقييم © {new Date().getFullYear()} - تم التطوير والاعتماد لخدمة قطاع الأعمال وخرائط جوجل
          </span>
          <span className="text-amber-500/80 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            شركة دليلك لتوثيق وإدارة الأنشطة والخدمات
          </span>
        </div>
      </footer>

      {/* Dalilak Live Activities Modal */}
      <DalilakActivitiesModal
        isOpen={isDalilakModalOpen}
        onClose={() => setIsDalilakModalOpen(false)}
        onSelectBusiness={handleSelectDalilakBusiness}
      />

    </div>
  );
}
