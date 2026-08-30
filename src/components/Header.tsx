import React from 'react';
import { 
  Sparkles, 
  Printer, 
  Download, 
  RotateCcw, 
  Share2, 
  Check, 
  Layers,
  Dices
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
  const [copied, setCopied] = React.useState(false);

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'صانع ملصقات التقييم - دليلك',
        text: 'أداة تصميم ملصقات وستاندات تقييم خرائط جوجل برمز QR احترافي',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-40 shadow-xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Title Tile */}
          <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
                <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-['Cairo',sans-serif]">
                    صانع ملصقات التقييم
                  </h1>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    دليلك المعتمد
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  تصميم ستاندات وملصقات تقييم خرائط Google المباشرة بجودة الطباعة
                </p>
              </div>
            </div>

            {/* Live Render indicator for mobile */}
            {isRendering && (
              <div className="md:hidden flex items-center gap-1.5 text-xs text-amber-400 font-semibold animate-pulse bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                تحديث...
              </div>
            )}
          </div>

          {/* Quick Presets & Bento Actions */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
            
            {/* Random Mix Button */}
            {onRandomMix && (
              <button
                id="header-random-mix-btn"
                onClick={onRandomMix}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs py-2 px-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform active:scale-95 border border-amber-300/40"
                title="توليد مزج عشوائي متناسق لكل من الألوان، الخطوط، الأيقونات، النصوص والمقاس"
              >
                <Dices className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>مزج عشوائي ✨</span>
              </button>
            )}

            {/* Quick Preset Selector */}
            <div className="relative inline-flex items-center">
              <select
                id="quick-preset-select"
                aria-label="اختر نشاط تجاري جاهز"
                onChange={(e) => {
                  if (e.target.value) onSelectPreset(e.target.value);
                }}
                defaultValue=""
                className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold py-2 px-3.5 pl-8 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer transition-all appearance-none shadow-sm"
              >
                <option value="" disabled>✨ نماذج أنشطة تجارية...</option>
                {BUSINESS_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.businessName})
                  </option>
                ))}
              </select>
              <div className="absolute left-2.5 pointer-events-none text-slate-400">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Direct Print Button */}
            <button
              id="header-print-btn"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-750 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-700/80 transition-all shadow-sm cursor-pointer hover:border-slate-600"
              title="طباعة مباشرة"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">طباعة فورية</span>
            </button>

            {/* Quick Download High-Res */}
            <button
              id="header-download-btn"
              onClick={onDownloadHighRes}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs py-2 px-4 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>تحميل الملصق</span>
            </button>

            {/* Reset */}
            <button
              id="header-reset-btn"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/90 hover:bg-slate-750 rounded-xl border border-slate-700/80 transition-colors cursor-pointer"
              title="إعادة ضبط الإعدادات"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Share */}
            <button
              id="header-share-btn"
              onClick={handleShareApp}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/90 hover:bg-slate-750 rounded-xl border border-slate-700/80 transition-colors cursor-pointer"
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
