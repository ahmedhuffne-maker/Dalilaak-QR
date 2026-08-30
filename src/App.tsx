import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { PosterConfig, PosterFormat } from './types';
import { BUSINESS_PRESETS, THEME_PRESETS } from './presets';
import { generateHighResBlob } from './utils/canvasRenderer';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  CheckCircle2,
  Share2
} from 'lucide-react';

const INITIAL_CONFIG: PosterConfig = {
  businessName: 'لَمْعَة لِغَسِيل السَّيَّارَات',
  businessSubtitle: 'LAMAA CAR WASH',
  category: 'خدمات سيارات',
  showActivityNumber: false,
  activityNumber: '',
  activityNumberLabel: 'رقم النشاط',
  
  mainText: 'شاركنا رأيك\nوتقييمك',
  secondaryText: '',
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

  // Apply Business Preset (Keeps phone 01556221141 persistent across all presets)
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-['Tajawal',sans-serif]">
      
      {/* Header Bar */}
      <Header
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onDownloadHighRes={handleDownloadHighRes}
        onPrint={handlePrint}
        config={config}
        isRendering={isRendering}
      />

      {/* Main Workspace with Bento Grid Architecture */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Bento Top Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Bento Card 1: Official Dalilak Verification & Live Status (8 cols) */}
          <div className="md:col-span-8 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-100">
                    منظومة دليلك المعتمدة لتوثيق وتقييمات خرائط Google
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    نظام نشط
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  صمّم ملصق أو ستاند طاولة احترافي لعملائك لزيادة تقييمات الـ 5 نجوم والتفاعل الفوري عبر مسح الكاميرا
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-2 rounded-xl border border-amber-500/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
            >
              <Info className="w-4 h-4" />
              <span>دليل استخراج الرابط</span>
            </button>
          </div>

          {/* Bento Card 2: Quick Business Metric / Preview Badge (4 cols) */}
          <div className="md:col-span-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                ★ 5.0
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-200 truncate max-w-[140px]">
                  {config.businessName || 'اسم نشاطك'}
                </span>
                <span className="block text-[11px] text-slate-400">
                  {config.category || 'نشاط تجاري'} • {config.format.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 px-2 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                جاهز للطباعة
              </span>
            </div>
          </div>

        </div>

        {/* Google Review Tips Bento Tile (Collapsible) */}
        {showTips && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 text-right space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
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

        {/* 2-Column Bento Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (5 Cols): Bento Configuration Box */}
          <div className="lg:col-span-5 w-full">
            <ControlsPanel
              config={config}
              onChange={setConfig}
              onApplyPreset={handleSelectPreset}
            />
          </div>

          {/* Right Column (7 Cols): Bento Studio Canvas & Live Mockup */}
          <div className="lg:col-span-7 w-full sticky top-20">
            <PreviewPanel
              config={config}
              onChangeFormat={handleChangeFormat}
              onChangeConfig={setConfig}
              isRendering={isRendering}
              setIsRendering={setIsRendering}
            />
          </div>

        </div>

      </main>

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

    </div>
  );
}
