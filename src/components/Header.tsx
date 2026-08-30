import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Download, 
  RotateCcw, 
  Share2, 
  Check, 
  Dices,
  Building2,
  FileDown
} from 'lucide-react';
import { PosterConfig } from '../types';

interface HeaderProps {
  onSelectPreset: (presetId: string) => void;
  onReset: () => void;
  onRandomMix?: () => void;
  onDownloadHighRes: () => void;
  onPrint: () => void;
  onOpenDalilakModal?: () => void;
  config: PosterConfig;
  isRendering: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onReset,
  onRandomMix,
  onDownloadHighRes,
  onPrint,
  onOpenDalilakModal,
  config,
  isRendering
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'صانع ملصقات التقييم - دليلك',
        text: `أداة تصميم ملصقات وستاندات تقييم خرائط جوجل لنشاط ${config.businessName || 'التجاري'}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/80 sticky top-0 z-40 shadow-2xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Right: Brand & App Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/30 shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base font-black tracking-tight text-white font-['Cairo',sans-serif]">
                  صانع ملصقات التقييم
                </h1>
                <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 hidden sm:inline-flex">
                  دليلك المعتمد
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden md:block">
                تصميم ملصقات وستاندات تقييم خرائط Google بجودة طباعة فائقة
              </p>
            </div>

            {/* Live Render indicator */}
            {isRendering && (
              <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                رسم...
              </div>
            )}
          </div>

          {/* Left: Clean, High-Contrast Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Primary Action 1: Dalilak Live Activities Modal Trigger */}
            {onOpenDalilakModal && (
              <button
                id="header-dalilak-activities-btn"
                onClick={onOpenDalilakModal}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform active:scale-95 border border-emerald-300/40 min-h-[38px] shrink-0"
                title="استيراد وتوليد ملصق من أنشطة دليلك المسجلة لحظياً"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
                </span>
                <Building2 className="w-4 h-4 text-white" />
                <span className="font-['Cairo',sans-serif]">أنشطة دليلك</span>
              </button>
            )}

            {/* Primary Action 2: Intelligent Random Mix */}
            {onRandomMix && (
              <button
                id="header-random-mix-btn"
                onClick={onRandomMix}
                className="inline-flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-750 text-amber-400 hover:text-amber-300 font-bold text-xs py-2 px-2.5 sm:px-3 rounded-xl border border-slate-700 hover:border-amber-500/40 transition-all cursor-pointer transform active:scale-95 min-h-[38px] shrink-0"
                title="مزج عشوائي متناسق للتصميم والخطوط والألوان"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
                <span className="hidden sm:inline">مزج ذكي ✨</span>
              </button>
            )}

            {/* Primary Action 3: Direct Print */}
            <button
              id="header-print-btn"
              onClick={onPrint}
              className="inline-flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold py-2 px-2.5 sm:px-3 rounded-xl border border-slate-700 transition-all shadow-sm cursor-pointer min-h-[38px] shrink-0"
              title="طباعة مباشرة بجودة عالية"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">طباعة</span>
            </button>

            {/* Primary Action 4: Download High-Res PNG */}
            <button
              id="header-download-btn"
              onClick={onDownloadHighRes}
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform active:scale-95 min-h-[38px] shrink-0 font-['Cairo',sans-serif]"
              title="تصدير وتحميل الملصق كصورة عالية الدقة"
            >
              <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>تحميل الملصق</span>
            </button>

            {/* Action 5: Reset */}
            <button
              id="header-reset-btn"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-750 rounded-xl border border-slate-700/80 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0"
              title="إعادة ضبط التصميم"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Action 6: Share */}
            <button
              id="header-share-btn"
              onClick={handleShareApp}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-750 rounded-xl border border-slate-700/80 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0 hidden sm:flex"
              title="مشاركة التطبيق"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
