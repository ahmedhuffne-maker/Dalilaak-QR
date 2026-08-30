import React, { useState, useRef, useMemo } from 'react';
import { 
  Building2, 
  Type, 
  QrCode, 
  Image as ImageIcon, 
  Palette, 
  ShieldCheck, 
  Upload, 
  Trash2, 
  Sparkles, 
  Star, 
  Check, 
  ExternalLink, 
  Phone, 
  Hash,
  Layers, 
  Wand2, 
  RefreshCw, 
  MapPin, 
  Car, 
  Droplets, 
  Wrench, 
  Coffee, 
  Utensils, 
  Flame, 
  Cake, 
  Stethoscope, 
  Smile, 
  Scissors, 
  Flower2, 
  ShoppingBag, 
  Shirt, 
  Dumbbell, 
  Hotel, 
  GraduationCap, 
  Briefcase, 
  Truck, 
  Crown, 
  HeartHandshake, 
  BadgeCheck, 
  Smartphone,
  Pizza,
  IceCream,
  Fish,
  Glasses,
  Eye,
  Plane,
  Camera,
  Music,
  Dices,
  Home,
  Key,
  Gift,
  Watch,
  Gem,
  Shield,
  Fuel,
  BookOpen,
  Laptop,
  MessageCircle,
  Instagram,
  Compass,
  Zap,
  Bot
} from 'lucide-react';
import { PosterConfig, FontChoice, PosterFormat } from '../types';
import { 
  BUSINESS_PRESETS, 
  THEME_PRESETS, 
  CTA_SUGGESTIONS, 
  AVAILABLE_ICONS 
} from '../presets';
import { 
  generateSmartContextualTexts, 
  BUSINESS_CATEGORIES, 
  SmartGeneratedTexts 
} from '../utils/textGeneratorEngine';
import { AiTextModal } from './AiTextModal';
import { DETAILED_CATEGORIES, rephraseTextWithAi } from '../utils/aiTextGenerator';

const RenderBusinessIcon: React.FC<{ iconId: string; className?: string }> = ({ iconId, className = 'w-5 h-5' }) => {
  switch (iconId) {
    case 'Car': return <Car className={className} />;
    case 'Droplets': return <Droplets className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Pizza': return <Pizza className={className} />;
    case 'Burger': return <Utensils className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Cake': return <Cake className={className} />;
    case 'IceCream': return <IceCream className={className} />;
    case 'Fish': return <Fish className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'Tooth': return <Smile className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Glasses': return <Glasses className={className} />;
    case 'Scissors': return <Scissors className={className} />;
    case 'Flower2': return <Flower2 className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Shirt': return <Shirt className={className} />;
    case 'Gem': return <Gem className={className} />;
    case 'Watch': return <Watch className={className} />;
    case 'Gift': return <Gift className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'Hotel': return <Hotel className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Key': return <Key className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Fuel': return <Fuel className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Crown': return <Crown className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'BadgeCheck': return <BadgeCheck className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    default: return <Sparkles className={className} />;
  }
};

interface ControlsPanelProps {
  config: PosterConfig;
  onChange: (updater: (prev: PosterConfig) => PosterConfig) => void;
  onApplyPreset: (presetId: string) => void;
  onRandomMix?: () => void;
  onOpenDalilakModal?: () => void;
}

type TabKey = 'business' | 'texts' | 'qr' | 'logo' | 'theme' | 'footer';

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  config,
  onChange,
  onApplyPreset,
  onRandomMix,
  onOpenDalilakModal
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('business');
  const [showAiSuccessToast, setShowAiSuccessToast] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  // Compute smart texts dynamically based on current company name & service
  const smartAnalysis: SmartGeneratedTexts = useMemo(() => {
    return generateSmartContextualTexts(config.businessName, config.category);
  }, [config.businessName, config.category]);

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'business', label: 'النشاط', icon: Building2 },
    { key: 'texts', label: 'النصوص', icon: Type },
    { key: 'qr', label: 'رمز QR', icon: QrCode },
    { key: 'logo', label: 'الشعار', icon: ImageIcon },
    { key: 'theme', label: 'الألوان', icon: Palette },
    { key: 'footer', label: 'التذييل', icon: ShieldCheck },
  ];

  // Auto-apply entire smart suggested pack
  const handleApplyFullSmartPack = () => {
    const suggestedTheme = THEME_PRESETS.find(t => t.id === smartAnalysis.suggestedTheme) || THEME_PRESETS[0];
    
    onChange((prev) => ({
      ...prev,
      mainText: smartAnalysis.suggestedMainTexts[0] || prev.mainText,
      secondaryText: smartAnalysis.suggestedSecondaryTexts[0] || prev.secondaryText,
      businessSubtitle: prev.businessSubtitle || smartAnalysis.suggestedSubtitles[0] || '',
      category: prev.category || smartAnalysis.detectedCategory.name,
      selectedIcon: smartAnalysis.suggestedIcon,
      themeId: suggestedTheme.id,
      bgColor: suggestedTheme.bgColor,
      bgTexture: suggestedTheme.bgTexture,
      textColor: suggestedTheme.textColor,
      accentColor: suggestedTheme.accentColor,
      footerBgColor: suggestedTheme.footerBgColor,
      footerTextColor: suggestedTheme.footerTextColor,
      footerAccentColor: suggestedTheme.footerAccentColor,
      borderStyle: suggestedTheme.borderStyle
    }));

    setShowAiSuccessToast(true);
    setTimeout(() => setShowAiSuccessToast(false), 3000);
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange((prev) => ({
          ...prev,
          logoType: 'upload',
          uploadedLogoDataUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle QR Upload
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange((prev) => ({
          ...prev,
          qrType: 'uploaded',
          uploadedQrDataUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden">
      
      {/* Navigation Tabs Header */}
      <div className="flex border-b border-slate-800/80 bg-slate-950/60 p-2 overflow-x-auto scrollbar-none gap-1.5 touch-pan-x">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center cursor-pointer min-h-[42px] active:scale-95 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/60 font-black'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 bg-slate-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Success Feedback Toast */}
      {showAiSuccessToast && (
        <div className="mx-4 mt-3 p-2.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>تم توليد وتطبيق النصوص والألوان المتوافقة مع نشاطك بنجاح! ✨</span>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 text-right">
        
        {/* ================= TAB 1: BUSINESS & PRESETS ================= */}
        {activeTab === 'business' && (
          <div className="space-y-4">

            {/* Dalilak Live Activities Hero Card */}
            {onOpenDalilakModal && (
              <div 
                onClick={onOpenDalilakModal}
                className="p-3.5 bg-gradient-to-r from-emerald-950/80 via-slate-850 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:shadow-lg shadow-emerald-500/10 group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                        استيراد نشاط من دليلك (Live) ⚡
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      سحب فوري لبيانات المحل ورابط الخريطة وتوليد البوستر
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                >
                  استعراض
                </button>
              </div>
            )}
            
            {/* Arabic Business Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>اسم النشاط التجاري (الرئيسي باللغة العربية) *</span>
                <span className="text-[10px] text-amber-400 font-semibold">يتم تخصيص النصوص عليه تلقائياً</span>
              </label>
              <input
                id="input-business-name"
                type="text"
                value={config.businessName}
                onChange={(e) => onChange((p) => ({ ...p, businessName: e.target.value }))}
                placeholder="مثال: لمعة لغسيل وتلميع السيارات أو كافيه رونق"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-bold min-h-[44px]"
              />
            </div>

            {/* Category & Service Nature */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  تصنيف النشاط التجاري (القطاع)
                </label>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>توليد ذكي بالـ AI 🤖</span>
                </button>
              </div>

              {/* Category Quick Select Dropdown */}
              <select
                id="category-select-dropdown"
                value={config.category}
                onChange={(e) => {
                  const newCatName = e.target.value;
                  const matched = DETAILED_CATEGORIES.find((c) => c.name === newCatName);
                  onChange((p) => ({
                    ...p,
                    category: newCatName,
                    selectedIcon: matched?.icon || p.selectedIcon
                  }));
                }}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 mb-2 font-bold cursor-pointer min-h-[44px]"
              >
                {DETAILED_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={config.category}
                onChange={(e) => onChange((p) => ({ ...p, category: e.target.value }))}
                placeholder="أو اكتب تصنيف مخصص: مثلاً ورشة سيارات، مقهى كوكيز، عيادة أسنان"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[38px]"
              />
            </div>

            {/* English Business Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>الاسم الفرعي أو باللغة الإنجليزية (Subtitle)</span>
                {smartAnalysis.suggestedSubtitles[0] && (
                  <button
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, businessSubtitle: smartAnalysis.suggestedSubtitles[0] }))}
                    className="text-[10px] text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    اقتراح ذكي: {smartAnalysis.suggestedSubtitles[0]}
                  </button>
                )}
              </label>
              <input
                id="input-business-subtitle"
                type="text"
                dir="ltr"
                value={config.businessSubtitle}
                onChange={(e) => onChange((p) => ({ ...p, businessSubtitle: e.target.value }))}
                placeholder="e.g. LAMAA CAR WASH & DETAILING"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-left font-['Outfit',sans-serif] tracking-wider uppercase font-semibold min-h-[44px]"
              />
            </div>

            {/* Activity Number / Business Code */}
            <div className="p-3.5 bg-gradient-to-b from-slate-800/80 to-slate-850/80 border border-slate-700/80 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-400" />
                  رقم أو كود النشاط التجاري (اختياري)
                </label>
                <span className="text-[10px] text-slate-400">شارة رقمية بارزة وكبيرة</span>
              </div>
              <input
                type="text"
                dir="ltr"
                value={config.activityNumber || ''}
                onChange={(e) => onChange((p) => ({ ...p, activityNumber: e.target.value, showActivityNumber: !!e.target.value }))}
                placeholder="مثال: 0114598874 أو #1042"
                className="w-full bg-slate-900 border border-slate-750 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono text-left font-bold tracking-widest min-h-[44px]"
              />

              {/* Optional Icons Beside Number */}
              <div className="pt-2 border-t border-slate-750/70 space-y-1.5">
                <span className="block text-[11px] font-bold text-slate-300">
                  إضافة أو إزالة الرموز بجانب الرقم:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, activityShowWhatsAppIcon: p.activityShowWhatsAppIcon !== false ? false : true }))}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[40px] ${
                      config.activityShowWhatsAppIcon !== false
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm font-extrabold'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>رمز واتساب</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, activityShowPhoneIcon: p.activityShowPhoneIcon !== false ? false : true }))}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[40px] ${
                      config.activityShowPhoneIcon !== false
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm font-extrabold'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>رمز الهاتف</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Templates Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  أو اختر نموذجاً جاهزاً للأنشطة الشائعة
                </label>
                <span className="text-[10px] text-slate-500">تعبئة فورية</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUSINESS_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset(preset.id)}
                    className="flex flex-col text-right p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-750 hover:border-amber-500/50 transition-all group cursor-pointer text-xs min-h-[50px] justify-center"
                  >
                    <span className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate mt-0.5">
                      {preset.businessName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Badge Top Toggle */}
            <div className="p-3.5 bg-slate-800/50 border border-slate-750 rounded-xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-200">شارة تقييمات خرائط Google المعتمدة</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">عرض شارة جوجل التوثيقية أعلى الملصق</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer min-h-[44px] px-1">
                <input
                  type="checkbox"
                  checked={config.showGoogleBadge}
                  onChange={(e) => onChange((p) => ({ ...p, showGoogleBadge: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

          </div>
        )}

        {/* ================= TAB 2: TEXTS & CTA ================= */}
        {activeTab === 'texts' && (
          <div className="space-y-5">

            {/* AI Text Generator Launcher Button */}
            <div className="p-4 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/30 shrink-0">
                  <Bot className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <span>مولّد العبارات بالذكاء الاصطناعي</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">AI</span>
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    توليد عبارات تسويقية حماسية، فاخرة، أو ترحيبية مخصصة لقطاعك
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>فتح مولّد الـ AI ✨</span>
              </button>
            </div>
            
            {/* Smart Contextual Suggestions Customized for the Business */}
            <div className="p-3.5 bg-gradient-to-b from-amber-500/10 to-slate-850 border border-amber-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  عبارات مخصصة تم توليدها لـ "{config.businessName || 'نشاطك'}"
                </label>
                <span className="text-[10px] text-slate-400 font-semibold">
                  اضغط للتطبيق الفوري ⚡
                </span>
              </div>

              <div className="space-y-2">
                {smartAnalysis.suggestedMainTexts.map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange((p) => ({ 
                      ...p, 
                      mainText: text,
                      secondaryText: smartAnalysis.suggestedSecondaryTexts[idx] || p.secondaryText 
                    }))}
                    className="w-full text-right p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/20 border border-slate-750 hover:border-amber-500/50 text-slate-200 hover:text-amber-300 transition-all cursor-pointer group flex items-start gap-2 text-xs"
                  >
                    <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {idx + 1}
                    </span>
                    <div className="flex-1 overflow-hidden">
                      <span className="font-bold block whitespace-pre-line leading-relaxed">
                        {text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main CTA Text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  النص الرئيسي لدعوة التقييم (سطرين كحد أقصى للحجم المثالي)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const cleanName = config.businessName || 'نشاطنا';
                    onChange((p) => ({
                      ...p,
                      mainText: `كيف كانت تجربتك في ${cleanName} اليوم؟ ✨\nامسح الرمز وقيّمنا بـ 5 نجوم ★`
                    }));
                  }}
                  className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  صياغة ذكية ✨
                </button>
              </div>
              <textarea
                id="input-main-text"
                rows={3}
                value={config.mainText}
                onChange={(e) => onChange((p) => ({ ...p, mainText: e.target.value }))}
                placeholder="شاركنا رأيك وتقييمك&#10;امسح QR Code"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-bold resize-none leading-relaxed"
              />
            </div>

            {/* Secondary Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>العبارة التوضيحية الإضافية (اختياري)</span>
                {smartAnalysis.suggestedSecondaryTexts[0] && (
                  <button
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, secondaryText: smartAnalysis.suggestedSecondaryTexts[0] }))}
                    className="text-[10px] text-amber-400 hover:underline font-bold"
                  >
                    استخدام المقترح
                  </button>
                )}
              </label>
              <input
                id="input-secondary-text"
                type="text"
                value={config.secondaryText}
                onChange={(e) => onChange((p) => ({ ...p, secondaryText: e.target.value }))}
                placeholder="مثال: رأيك يصنع الفرق ويطور خدماتنا دائماً"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[44px]"
              />
            </div>

            {/* Stars Configuration */}
            <div className="p-3.5 bg-slate-800/50 border border-slate-750 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  عدد نجوم التقييم المعروضة
                </span>
                <span className="text-xs font-bold text-amber-400">{config.starCount} نجوم ذهبية</span>
              </div>
              <div className="flex items-center gap-2">
                {[3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, starCount: count }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                      config.starCount === count
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {count} نجوم
                  </button>
                ))}
              </div>
            </div>

            {/* NFC Badge Toggle */}
            <div className="p-3.5 bg-slate-800/50 border border-slate-750 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-200">شارة تقنية NFC / المسح الذكي</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">إضافة شريط "امسح أو مرر باللمس"</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer min-h-[44px] px-1">
                  <input
                    type="checkbox"
                    checked={config.showNfcBadge}
                    onChange={(e) => onChange((p) => ({ ...p, showNfcBadge: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
              {config.showNfcBadge && (
                <input
                  type="text"
                  value={config.nfcText}
                  onChange={(e) => onChange((p) => ({ ...p, nfcText: e.target.value }))}
                  placeholder="امسح بالكاميرا أو مرر بطاقة NFC"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 min-h-[40px]"
                />
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 3: QR CODE & LINK ================= */}
        {activeTab === 'qr' && (
          <div className="space-y-5">
            
            {/* Mode selection: Generated vs Uploaded */}
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, qrType: 'generated' }))}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                  config.qrType === 'generated'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                توليد QR تلقائي من الرابط
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, qrType: 'uploaded' }))}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                  config.qrType === 'uploaded'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                رفع صورة QR جاهزة
              </button>
            </div>

            {config.qrType === 'generated' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رابط تقييم خرائط Google أو رابط النشاط
                  </label>
                  <input
                    id="input-qr-url"
                    type="url"
                    dir="ltr"
                    value={config.qrUrl}
                    onChange={(e) => onChange((p) => ({ ...p, qrUrl: e.target.value }))}
                    placeholder="https://g.page/r/your-business/review"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-left font-mono min-h-[44px]"
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>💡 يمكنك وضع رابط تقييم Google Maps المباشر لنشاطك</span>
                    {config.qrUrl && (
                      <a
                        href={config.qrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        تجربة الرابط <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* QR Custom Color */}
                <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-750">
                  <span className="text-xs font-bold text-slate-300">لون نقاط رمز QR</span>
                  <div className="flex items-center gap-2">
                    {['#000000', '#0f172a', '#1e3a8a', '#14532d', '#78350f'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => onChange((p) => ({ ...p, qrColor: c }))}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                          config.qrColor === c ? 'border-amber-400 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={config.qrColor}
                      onChange={(e) => onChange((p) => ({ ...p, qrColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Center Icon in QR Code Selector */}
                <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-750 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold text-slate-200">الشعار في منتصف الـ QR Code</span>
                    <span className="text-[10px] text-amber-400 font-semibold">اختياري</span>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'dalilak' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && (config.qrCenterLogoType === 'dalilak' || !config.qrCenterLogoType)
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-slate-950 border border-amber-500/80 flex items-center justify-center text-amber-400">
                        <MapPin className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight">دليلك</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'google' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'google'
                          ? 'bg-blue-500/15 border-blue-500 text-blue-300 font-bold ring-1 ring-blue-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-blue-600 font-black text-xs">
                        G
                      </div>
                      <span className="text-[10px] font-bold leading-tight">Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'whatsapp' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'whatsapp'
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                        <Phone className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight">واتساب</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'instagram' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'instagram'
                          ? 'bg-pink-500/15 border-pink-500 text-pink-300 font-bold ring-1 ring-pink-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                        <Instagram className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight">إنستغرام</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'snapchat' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'snapchat'
                          ? 'bg-yellow-500/15 border-yellow-500 text-yellow-300 font-bold ring-1 ring-yellow-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-yellow-400 text-black font-extrabold text-[11px] flex items-center justify-center">
                        👻
                      </div>
                      <span className="text-[10px] font-bold leading-tight">سناب شات</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'tiktok' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'tiktok'
                          ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 font-bold ring-1 ring-cyan-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-black border border-slate-750 flex items-center justify-center text-cyan-400 font-black text-xs">
                        ♪
                      </div>
                      <span className="text-[10px] font-bold leading-tight">تيك توك</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'tripadvisor' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'tripadvisor'
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                        🦉
                      </div>
                      <span className="text-[10px] font-bold leading-tight">تريب أدفايزر</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'star' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'star'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight">5 نجوم ★</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: false, qrCenterLogoType: 'none' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center ${
                        !config.qrLogoCenter || config.qrCenterLogoType === 'none'
                          ? 'bg-slate-700/60 border-slate-500 text-slate-100 font-bold shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-400'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400 text-[10px]">
                        ✕
                      </div>
                      <span className="text-[10px] font-bold leading-tight">بدون شعار</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Upload Custom QR Image with Drag & Drop */
              <div className="space-y-3">
                <input
                  type="file"
                  ref={qrInputRef}
                  onChange={handleQrUpload}
                  accept="image/*"
                  className="hidden"
                />
                {config.uploadedQrDataUrl ? (
                  <div className="space-y-3">
                    <div className="relative p-4 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3.5">
                        <div className="p-1.5 bg-white rounded-xl shadow-md">
                          <img
                            src={config.uploadedQrDataUrl}
                            alt="QR Uploaded"
                            className="w-16 h-16 object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-100">رمز الـ QR المخصص مفعل</span>
                          <span className="block text-[11px] text-emerald-400 font-semibold mt-0.5">
                            ✓ يتم عرضه بدقة فائقة على الملصق
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => qrInputRef.current?.click()}
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer min-h-[36px]"
                        >
                          تغيير
                        </button>
                        <button
                          type="button"
                          onClick={() => onChange((p) => ({ ...p, uploadedQrDataUrl: null }))}
                          className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => qrInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl p-7 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="block text-xs font-extrabold text-slate-100">
                      اضغط هنا لرفع صورة QR Code أو اسحبها وأفلتها
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-1">
                      يدعم ملفات PNG, JPG, WebP, SVG بأعلى جودة
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* QR Size Slider */}
            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-750 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">حجم رمز الـ QR Code في الإعلان</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {Math.round((config.qrScale || 1.25) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={config.qrScale || 1.25}
                onChange={(e) => onChange((p) => ({ ...p, qrScale: parseFloat(e.target.value) }))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>متوسط (80%)</span>
                <span>كبير ومثالي (125%)</span>
                <span>أقصى حجم (140%)</span>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: LOGO & ICONS ================= */}
        {activeTab === 'logo' && (
          <div className="space-y-5">
            {/* Logo type selection */}
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, logoType: 'icon' }))}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                  config.logoType === 'icon'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                أيقونة نشاط مدمجة
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, logoType: 'upload' }))}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                  config.logoType === 'upload'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                رفع شعار مخصص (Logo)
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, logoType: 'none' }))}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                  config.logoType === 'none'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                بدون
              </button>
            </div>

            {/* Icon Picker */}
            {config.logoType === 'icon' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2.5 flex items-center justify-between">
                  <span>اختر أيقونة مناسبة لنشاطك التجاري</span>
                  <span className="text-[10px] text-amber-400">مقترح تلقائي: {smartAnalysis.suggestedIcon}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, selectedIcon: icon.id }))}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 min-h-[64px] justify-center active:scale-95 ${
                        config.selectedIcon === icon.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-400 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <RenderBusinessIcon iconId={icon.id} className="w-5 h-5" />
                      <span className="text-[10px] font-bold truncate w-full">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Logo Image Upload */}
            {config.logoType === 'upload' && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                {config.uploadedLogoDataUrl ? (
                  <div className="space-y-3">
                    <div className="relative p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={config.uploadedLogoDataUrl}
                          alt="Logo Uploaded"
                          className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1"
                        />
                        <div>
                          <span className="block text-xs font-bold text-slate-200">تم رفع شعار النشاط</span>
                          <span className="block text-[11px] text-emerald-400">يظهر بأعلى دقة في الملصق</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onChange((p) => ({ ...p, uploadedLogoDataUrl: null }))}
                        className="p-2.5 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                        title="حذف الشعار"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Scale Slider */}
                    <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-750 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>حجم الشعار في الملصق</span>
                        <span className="text-amber-400 font-mono">{Math.round((config.logoScale || 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.05"
                        value={config.logoScale || 1}
                        onChange={(e) => onChange((p) => ({ ...p, logoScale: parseFloat(e.target.value) }))}
                        className="w-full h-2 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-6 text-center cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 transition-all"
                  >
                    <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <span className="block text-xs font-bold text-slate-200">اضغط لرفع شعار النشاط (Logo)</span>
                    <span className="block text-[11px] text-slate-400 mt-1">يُفضل ملف PNG بخلفية شفافة</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: THEME, COLORS & FONTS ================= */}
        {activeTab === 'theme' && (
          <div className="space-y-5">
            {/* Ready Made Theme Palettes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                سمات الألوان الفاخرة المعتمدة
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {THEME_PRESETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      onChange((p) => ({
                        ...p,
                        themeId: t.id,
                        bgColor: t.bgColor,
                        bgTexture: t.bgTexture,
                        textColor: t.textColor,
                        accentColor: t.accentColor,
                        footerBgColor: t.footerBgColor,
                        footerTextColor: t.footerTextColor,
                        footerAccentColor: t.footerAccentColor,
                        borderStyle: t.borderStyle
                      }))
                    }
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-right transition-all cursor-pointer min-h-[48px] ${
                      config.themeId === t.id
                        ? 'bg-slate-800 border-amber-400 shadow-md ring-1 ring-amber-400/40 font-bold'
                        : 'bg-slate-850 border-slate-750 hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                      style={{ backgroundColor: t.bgColor }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accentColor }} />
                    </div>
                    <span className="text-xs font-bold text-slate-200 truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                نوع الخط العربي المستخدم
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    { id: 'Cairo', label: 'خط كايرو (عريض ومودرن)' },
                    { id: 'Tajawal', label: 'خط تجوال (انسيابي)' },
                    { id: 'Readex Pro', label: 'خط ريديكس (هندسي)' },
                    { id: 'Amiri', label: 'خط أميري (نسخ كلاسيكي)' },
                    { id: 'Aref Ruqaa', label: 'خط رقعة (تراثي)' }
                  ] as const
                ).map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, fontFamily: font.id }))}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center min-h-[44px] flex items-center justify-center ${
                      config.fontFamily === font.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black ring-1 ring-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                    }`}
                    style={{ fontFamily: font.id }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Individual Color Pickers */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-750 space-y-3">
              <span className="block text-xs font-bold text-slate-200">تخصيص يدوي دقيق للألوان</span>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                {/* Background Color */}
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 mb-1">الخلفية</span>
                  <div className="flex items-center justify-center">
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => onChange((p) => ({ ...p, bgColor: e.target.value }))}
                      className="w-10 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 mb-1">النصوص</span>
                  <div className="flex items-center justify-center">
                    <input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => onChange((p) => ({ ...p, textColor: e.target.value }))}
                      className="w-10 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Accent / Stars Color */}
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 mb-1">النجوم والتمييز</span>
                  <div className="flex items-center justify-center">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => onChange((p) => ({ ...p, accentColor: e.target.value }))}
                      className="w-10 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Frame / Border Style */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                إطار وزخرفة الملصق
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'بدون إطار' },
                  { id: 'thin-gold', label: 'إطار ذهبي نحيف' },
                  { id: 'double-frame', label: 'إطار مزدوج فاخر' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, borderStyle: b.id as any }))}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                      config.borderStyle === b.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 6: FOOTER & DALILAK BRANDING ================= */}
        {activeTab === 'footer' && (
          <div className="space-y-5">
            {/* Show Footer Toggle */}
            <div className="p-3.5 bg-slate-800/50 border border-slate-750 rounded-xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-200">إظهار شريط التذييل السفلي (Footer)</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">يحتوي على رقم التواصل وشعار التوثيق</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer min-h-[44px] px-1">
                <input
                  type="checkbox"
                  checked={config.showFooter}
                  onChange={(e) => onChange((p) => ({ ...p, showFooter: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {config.showFooter && (
              <div className="space-y-4">
                {/* Phone / Contact Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    رقم التواصل / خدمة العملاء (للتذييل)
                  </label>
                  <input
                    id="input-footer-phone"
                    type="text"
                    dir="ltr"
                    value={config.footerPhone}
                    onChange={(e) => onChange((p) => ({ ...p, footerPhone: e.target.value }))}
                    placeholder="01556221141"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-left font-['Outfit',sans-serif] font-bold min-h-[44px]"
                  />

                  {/* Optional Icons beside Footer Phone */}
                  <div className="pt-1.5 space-y-1.5">
                    <span className="block text-[11px] font-bold text-slate-300">
                      رموز شريط التذييل:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onChange((p) => ({ ...p, footerShowWhatsAppIcon: p.footerShowWhatsAppIcon !== false ? false : true }))}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                          config.footerShowWhatsAppIcon !== false
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm font-extrabold'
                            : 'bg-slate-800/60 text-slate-400 border-slate-750 hover:border-slate-650'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span>رمز واتساب</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChange((p) => ({ ...p, footerShowPhoneIcon: !p.footerShowPhoneIcon }))}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                          config.footerShowPhoneIcon
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm font-extrabold'
                            : 'bg-slate-800/60 text-slate-400 border-slate-750 hover:border-slate-650'
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>رمز الهاتف</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dalilak Verification Box */}
                <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200">توثيق شركة دليلك المعتمدة</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer min-h-[44px] px-1">
                      <input
                        type="checkbox"
                        checked={config.showDalilakBranding}
                        onChange={(e) => onChange((p) => ({ ...p, showDalilakBranding: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {config.showDalilakBranding && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-750">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          اسم جهة التوثيق
                        </label>
                        <input
                          type="text"
                          value={config.dalilakText}
                          onChange={(e) => onChange((p) => ({ ...p, dalilakText: e.target.value }))}
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 min-h-[40px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          الوصف التعريفي للتوثيق
                        </label>
                        <input
                          type="text"
                          value={config.dalilakSubtext}
                          onChange={(e) => onChange((p) => ({ ...p, dalilakSubtext: e.target.value }))}
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 min-h-[40px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          رابط الموقع الإلكتروني (أسفل الشعار)
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          value={config.footerWebsite || 'www.dalilaak.com'}
                          onChange={(e) => onChange((p) => ({ ...p, footerWebsite: e.target.value }))}
                          placeholder="www.dalilaak.com"
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300 font-mono min-h-[40px]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Background Color */}
                <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-750">
                  <span className="text-xs font-bold text-slate-300">لون خلفية التذييل</span>
                  <div className="flex items-center gap-2">
                    {['#0f172a', '#020617', '#1e293b', '#292524', '#064e3b'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => onChange((p) => ({ ...p, footerBgColor: c }))}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                          config.footerBgColor === c ? 'border-amber-400 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={config.footerBgColor}
                      onChange={(e) => onChange((p) => ({ ...p, footerBgColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* AI Text Generator Modal */}
      <AiTextModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        config={config}
        onApplyTexts={(texts) => {
          onChange((prev) => ({
            ...prev,
            mainText: texts.mainText,
            secondaryText: texts.secondaryText,
            businessSubtitle: texts.businessSubtitle || prev.businessSubtitle,
            category: texts.category || prev.category,
            selectedIcon: texts.selectedIcon || prev.selectedIcon,
            themeId: texts.themeId || prev.themeId
          }));
          setShowAiSuccessToast(true);
          setTimeout(() => setShowAiSuccessToast(false), 3000);
        }}
      />

    </div>
  );
};
