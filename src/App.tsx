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
  Wand2,
  AlertTriangle,
  X
} from 'lucide-react';

import { DalilakActivitiesModal } from './components/DalilakActivitiesModal';
import { mapBusinessToPosterConfig, mapBusinessToPosterConfigWithStatus } from './services/dalilakService';
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
  const [dalilakNotice, setDalilakNotice] = useState<{
    type: 'verified' | 'unverified';
    businessName: string;
    verifiedUrl?: string;
  } | null>(null);

  // Handle selecting a live Dalilak business
  const handleSelectDalilakBusiness = (business: DalilakBusiness) => {
    const result = mapBusinessToPosterConfigWithStatus(business, config);
    setConfig(result.config);
    
    // Switch to preview on mobile to see result instantly
    setMobileActiveView('preview');

    if (result.isVerified && result.verifiedUrl) {
      setDalilakNotice({
        type: 'verified',
        businessName: result.businessName,
        verifiedUrl: result.verifiedUrl
      });
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setDalilakNotice({
        type: 'unverified',
        businessName: result.businessName
      });
    }
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

        {/* Dalilak Business Selection Notice Banner */}
        {dalilakNotice && (
          <div className="mb-5 animate-fade-in" dir="rtl">
            {dalilakNotice.type === 'verified' ? (
              <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-emerald-950/40">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-bold text-sm text-white">
                      <span>تم استدعاء النشاط بنجاح وتوليد كود QR الموثق من Google 🟢</span>
                      <span className="text-xs font-normal text-emerald-300">({dalilakNotice.businessName})</span>
                    </div>
                    <p className="text-xs text-emerald-300/90 mt-0.5">
                      تم التحقق من اعتماد الرابط رسمياً وربطه بالملصق لتوجيه العملاء مباشرة لصفحة التقييم وكتابة الآراء.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {dalilakNotice.verifiedUrl && (
                    <a
                      href={dalilakNotice.verifiedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1 shadow"
                    >
                      <span>تجربة الرابط</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setDalilakNotice(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-900/50"
                    title="إغلاق التنبيه"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-amber-950/80 border-2 border-rose-500/70 text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-rose-950/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/25 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-bold text-sm sm:text-base text-rose-200">
                      <span>⚠️ تنبيه هام: لم يتم توليد كود QR لعدم توفر رابط Google موثق ومعتمد!</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      النشاط «<strong className="text-amber-300">{dalilakNotice.businessName}</strong>» مسجل بإحداثيات موقع أو حالة قيد التوثيق، ولا يمتلك رابط خرائط Google معتمد حتى الآن.
                      <br className="hidden sm:inline" />
                      <span className="text-rose-300 font-bold"> تطبيقاً لسياسة النظام الصارمة:</span> تم منع توليد أي روابط بديلة أو عشوائية لحماية دقة المطبوعات. يمكنك إدخال الرابط المعتمد يدوياً في لوحة التحكم عند توفره.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      setMobileActiveView('controls');
                      setTimeout(() => {
                        const qrInput = document.getElementById('input-qr-url');
                        if (qrInput) {
                          qrInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          qrInput.focus();
                        }
                      }, 100);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>إدخال الرابط يدوياً</span>
                  </button>
                  <button
                    onClick={() => setDalilakNotice(null)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
                    title="إغلاق التنبيه"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
