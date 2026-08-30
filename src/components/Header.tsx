import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Download, 
  RotateCcw, 
  Share2, 
  Check, 
  Layers,
  Dices,
  Wand2
} from 'lucide-react';
import { BUSINESS_PRESETS } from '../presets';
import { PosterConfig } from '../types';

interface HeaderProps {
  onSelectPreset: (presetId: string) => void;
  onReset: () => void;
  onRandomMix?: () => void;
  onDownloadHighRes: () => void;
  onPrint: () => void;
  config: PosterConfig;
  isRendering: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onReset,
  onRandomMix,
  onDownloadHighRes,
  onPrint,
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
    <header className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/90 sticky top-0 z-40 shadow-xl shadow-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Title Tile */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/40 shrink-0">
                <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-['Cairo',sans-serif]">
                    صانع ملصقات التقييم
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    دليلك المعتمد
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1">
                  تصميم ستاندات وملصقات تقييم خرائط Google بمسح مباشر
                </p>
              </div>
            </div>

            {/* Live Render indicator for mobile */}
            {isRendering && (
              <div className="md:hidden flex items-center gap-1.5 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                رسم...
              </div>
            )}
          </div>

          {/* Quick Presets & Bento Actions - Mobile Scrollable */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            
            {/* Quick Preset Selector */}
            <div className="relative inline-flex items-center flex-1 sm:flex-initial min-w-[140px] max-w-[210px]">
              <select
                id="quick-preset-select"
                aria-label="اختر نشاط تجاري جاهز"
                onChange={(e) => {
                  if (e.target.value) onSelectPreset(e.target.value);
                }}
                defaultValue=""
                className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold py-2 px-2.5 pl-7 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer transition-all appearance-none shadow-sm min-h-[38px] truncate"
              >
                <option value="" disabled>✨ أنشطة جاهزة...</option>
                {BUSINESS_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-2 pointer-events-none text-slate-400">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Random Mix Button */}
            {onRandomMix && (
              <button
                id="header-random-mix-btn"
                onClick={onRandomMix}
                className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs py-2 px-2.5 sm:px-3.5 rounded-xl shadow-md shadow-amber-500/25 transition-all cursor-pointer transform active:scale-95 border border-amber-300/40 min-h-[38px] shrink-0"
                title="توليد مزج عشوائي متناسق"
              >
                <Dices className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                <span className="hidden sm:inline">مزج عشوائي ✨</span>
                <span className="sm:hidden">مزج ✨</span>
              </button>
            )}

            {/* Direct Print Button */}
            <button
              id="header-print-btn"
              onClick={onPrint}
              className="inline-flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold py-2 px-2.5 sm:px-3 rounded-xl border border-slate-700 transition-all shadow-sm cursor-pointer min-h-[38px] shrink-0"
              title="طباعة مباشرة"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">طباعة</span>
            </button>

            {/* Quick Download High-Res */}
            <button
              id="header-download-btn"
              onClick={onDownloadHighRes}
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-2 px-3 sm:px-4 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95 min-h-[38px] shrink-0"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>تحميل</span>
            </button>

            {/* Reset */}
            <button
              id="header-reset-btn"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0"
              title="إعادة ضبط الإعدادات"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Share */}
            <button
              id="header-share-btn"
              onClick={handleShareApp}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0"
              title="مشاركة الأداة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
