import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  X, 
  Check, 
  Copy, 
  Wand2, 
  RefreshCw, 
  Layers, 
  Flame, 
  Crown, 
  HeartHandshake, 
  Target, 
  Zap, 
  ArrowRight,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  AiTone, 
  DETAILED_CATEGORIES, 
  TONE_LABELS, 
  generateGeminiAiTexts, 
  AiGeneratedOption,
  DetailedCategory
} from '../utils/aiTextGenerator';
import { PosterConfig } from '../types';

interface AiTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PosterConfig;
  onApplyTexts: (texts: {
    mainText: string;
    secondaryText: string;
    businessSubtitle?: string;
    category?: string;
    selectedIcon?: string;
    themeId?: string;
  }) => void;
}

export const AiTextModal: React.FC<AiTextModalProps> = ({
  isOpen,
  onClose,
  config,
  onApplyTexts
}) => {
  const [businessName, setBusinessName] = useState(config.businessName || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(config.category || 'خدمات سيارات');
  const [selectedTone, setSelectedTone] = useState<AiTone>('royal');
  const [customFocus, setCustomFocus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AiGeneratedOption[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [appliedIdx, setAppliedIdx] = useState<number | null>(null);

  // Sync with current config on open
  useEffect(() => {
    if (isOpen) {
      setBusinessName(config.businessName || '');
      setSelectedCategory(config.category || 'خدمات سيارات');
      // Trigger initial generation
      handleGenerate();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async (toneOverride?: AiTone) => {
    setIsLoading(true);
    const toneToUse = toneOverride || selectedTone;

    try {
      const response = await generateGeminiAiTexts({
        businessName: businessName || config.businessName || 'نشاطنا التجاري',
        category: selectedCategory,
        tone: toneToUse,
        customKeyword: customFocus
      });

      setResults(response.options);
    } catch (err) {
      console.error('Error generating AI texts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (option: AiGeneratedOption, idx: number) => {
    // Find matching category to suggest icon/theme if available
    const matchedCategory = DETAILED_CATEGORIES.find(
      (c) => c.name === selectedCategory || c.id === selectedCategory
    );

    onApplyTexts({
      mainText: option.mainText,
      secondaryText: option.secondaryText,
      businessSubtitle: option.subtitle || undefined,
      category: selectedCategory,
      selectedIcon: matchedCategory?.icon,
      themeId: matchedCategory?.theme
    });

    setAppliedIdx(idx);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setAppliedIdx(null);
      onClose();
    }, 600);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-amber-500/20"
        dir="rtl"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/40">
              <Bot className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  توليد العبارات بالذكاء الاصطناعي ✨
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  مدعوم بـ Gemini AI
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                توليد عبارات تقييم دعائية ذكية ومخصصة بالكامل حسب تصنيف نشاطك التجاري
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Inputs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                اسم النشاط التجاري
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="مثال: لَمْعَة لغسيل السيارات"
                className="w-full bg-slate-900 text-slate-100 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-750 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 min-h-[42px]"
              />
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                تصنيف النشاط التجاري (القطاع)
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-750 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 cursor-pointer min-h-[42px]"
              >
                {DETAILED_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                اختر نبرة الخطاب التسويقية
              </span>
              <span className="text-[10px] text-slate-400">تؤثر على أسلوب ومشاعر العبارات</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(Object.keys(TONE_LABELS) as AiTone[]).map((toneKey) => {
                const tone = TONE_LABELS[toneKey];
                const isSelected = selectedTone === toneKey;
                return (
                  <button
                    key={toneKey}
                    type="button"
                    onClick={() => {
                      setSelectedTone(toneKey);
                      handleGenerate(toneKey);
                    }}
                    className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer min-h-[64px] ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/80 text-amber-300 shadow-md ring-1 ring-amber-500/40'
                        : 'bg-slate-800/60 border-slate-750 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base">{tone.icon}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-xs font-bold mt-1 block">{tone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Generate Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 min-h-[46px]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جارٍ التوليد بواسطة الذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>توليد مقترحات ذكية جديدة 🔄</span>
                </>
              )}
            </button>
          </div>

          {/* Results Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                النتائج المولدة ({results.length} خيارات ذكية)
              </h3>
              <span className="text-[10px] text-slate-400">
                اضغط "تطبيق" لاعتماد العبارة فوراً
              </span>
            </div>

            {results.map((option, idx) => {
              const isApplied = appliedIdx === idx;
              const isCopied = copiedIdx === idx;

              return (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isApplied
                      ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/50'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Text Content */}
                  <div className="space-y-1.5 flex-1 pr-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        {option.emoji} {option.toneBadge}
                      </span>
                      {option.subtitle && (
                        <span className="text-[10px] font-mono font-semibold text-slate-400 tracking-wider">
                          {option.subtitle}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-black text-slate-100 whitespace-pre-line leading-relaxed">
                      {option.mainText}
                    </p>

                    {option.secondaryText && (
                      <p className="text-[11px] sm:text-xs text-slate-400">
                        {option.secondaryText}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleCopy(`${option.mainText}\n${option.secondaryText}`, idx)}
                      className="p-2 sm:px-2.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[38px]"
                      title="نسخ العبارة"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isCopied ? 'تم النسخ' : 'نسخ'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApply(option, idx)}
                      className="flex-1 sm:flex-initial px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[38px]"
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>تم التطبيق!</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5" />
                          <span>تطبيق على التصميم ✨</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            يتم ضبط وتنسيق الأبعاد والخطوط تلقائياً لتناسب المقاس المحدد
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>

    </div>
  );
};
