import React, { useState, useRef } from 'react';
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
  Compass
} from 'lucide-react';
import { PosterConfig, FontChoice, PosterFormat } from '../types';
import { 
  BUSINESS_PRESETS, 
  THEME_PRESETS, 
  CTA_SUGGESTIONS, 
  AVAILABLE_ICONS 
} from '../presets';

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
}

type TabKey = 'business' | 'texts' | 'qr' | 'logo' | 'theme' | 'footer';

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  config,
  onChange,
  onApplyPreset
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('business');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'business', label: 'النشاط', icon: Building2 },
    { key: 'texts', label: 'النصوص', icon: Type },
    { key: 'qr', label: 'رمز QR', icon: QrCode },
    { key: 'logo', label: 'الشعار', icon: ImageIcon },
    { key: 'theme', label: 'الألوان', icon: Palette },
    { key: 'footer', label: 'التذييل', icon: ShieldCheck },
  ];

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
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/90 shadow-2xl flex flex-col h-full overflow-hidden">
      
      {/* Bento Navigation Tabs Header */}
      <div className="flex border-b border-slate-800/80 bg-slate-950/40 p-2 overflow-x-auto scrollbar-none gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick QR Upload Banner (Always Visible for Instant Access) */}
      <div className="px-5 pt-4 pb-0">
        <input
          type="file"
          id="quick-qr-upload-input"
          onChange={handleQrUpload}
          accept="image/*"
          className="hidden"
        />
        {config.uploadedQrDataUrl ? (
          <div className="p-3 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-lg shrink-0">
                <img
                  src={config.uploadedQrDataUrl}
                  alt="QR"
                  className="w-10 h-10 object-contain rounded"
                />
              </div>
              <div className="text-right">
                <span className="block text-xs font-extrabold text-emerald-300">
                  تم دمج كود الـ QR الجديد في التصميم ✓
                </span>
                <span className="block text-[11px] text-slate-400">
                  معروض الآن في الملصق بدقة عالية
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => document.getElementById('quick-qr-upload-input')?.click()}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-650 transition-colors cursor-pointer"
              >
                تغيير
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, uploadedQrDataUrl: null, qrType: 'generated' }))}
                className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
                title="استعادة الـ QR التلقائي"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => document.getElementById('quick-qr-upload-input')?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const file = e.dataTransfer.files?.[0];
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
            }}
            className="p-3 bg-gradient-to-r from-amber-500/10 via-slate-850 to-slate-900 border border-amber-500/30 hover:border-amber-400 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <QrCode className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-right">
                <span className="block text-xs font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors">
                  رفع كود QR Code مخصص لدمجه في الإعلان
                </span>
                <span className="block text-[11px] text-slate-400">
                  اضغط هنا أو اسحب صورة الكود (PNG / JPG / WebP)
                </span>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all group-hover:translate-x-[-2px]">
              رفع الكود
            </div>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5 text-right">
        
        {/* ================= TAB 1: BUSINESS & PRESETS ================= */}
        {activeTab === 'business' && (
          <div className="space-y-5">
            {/* Quick Templates Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  نماذج سريعة للأنشطة التجارية
                </label>
                <span className="text-[10px] text-slate-500">اختر نموذجاً لتعبئة البيانات تلقائياً</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BUSINESS_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset(preset.id)}
                    className="flex flex-col text-right p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-750 hover:border-amber-500/50 transition-all group cursor-pointer text-xs"
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

            {/* Arabic Business Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                اسم النشاط التجاري (الرئيسي باللغة العربية) *
              </label>
              <input
                id="input-business-name"
                type="text"
                value={config.businessName}
                onChange={(e) => onChange((p) => ({ ...p, businessName: e.target.value }))}
                placeholder="مثال: لمعة لغسيل السيارات"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-bold"
              />
            </div>

            {/* English Business Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الاسم الفرعي أو باللغة الإنجليزية (Subtitle)
              </label>
              <input
                id="input-business-subtitle"
                type="text"
                dir="ltr"
                value={config.businessSubtitle}
                onChange={(e) => onChange((p) => ({ ...p, businessSubtitle: e.target.value }))}
                placeholder="e.g. LAMAA CAR WASH & DETAILING"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-left font-['Outfit',sans-serif] tracking-wider uppercase font-semibold"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                تصنيف النشاط
              </label>
              <input
                type="text"
                value={config.category}
                onChange={(e) => onChange((p) => ({ ...p, category: e.target.value }))}
                placeholder="مثال: غسيل وتلميع سيارات، مقهى، مطعم"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Activity Number / Business Code (Always Visible & Optional) */}
            <div className="p-3.5 bg-gradient-to-b from-slate-800/80 to-slate-850/80 border border-slate-700/80 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-400" />
                  رقم أو كود النشاط داخل الملصق (اختياري)
                </label>
                <span className="text-[10px] text-slate-400">يظهر في الملصق فور كتابته</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    الرقم أو كود النشاط
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={config.activityNumber || ''}
                    onChange={(e) => onChange((p) => ({ ...p, activityNumber: e.target.value, showActivityNumber: !!e.target.value }))}
                    placeholder="مثال: #1042 أو 0501234567"
                    className="w-full bg-slate-900 border border-slate-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-left font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    تسمية الحقل
                  </label>
                  <input
                    type="text"
                    value={config.activityNumberLabel || 'رقم النشاط'}
                    onChange={(e) => onChange((p) => ({ ...p, activityNumberLabel: e.target.value }))}
                    placeholder="رقم النشاط"
                    className="w-full bg-slate-900 border border-slate-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Google Badge Top Toggle */}
            <div className="p-3.5 bg-slate-800/50 border border-slate-750 rounded-xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-200">شارة تقييمات خرائط Google المعتمدة</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">عرض شارة جوجل التوثيقية أعلى الملصق</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
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
            {/* Quick CTA Suggestions */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                اقتراحات عبارات دعوة التقييم
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CTA_SUGGESTIONS.map((cta, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange((p) => ({ ...p, mainText: cta }))}
                    className="text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 py-1.5 px-2.5 rounded-lg border border-slate-700 transition-colors cursor-pointer text-right"
                  >
                    {cta.split('\n')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Main CTA Text */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                النص الرئيسي لدعوة التقييم (سطرين كحد أقصى للحجم المثالي)
              </label>
              <textarea
                id="input-main-text"
                rows={3}
                value={config.mainText}
                onChange={(e) => onChange((p) => ({ ...p, mainText: e.target.value }))}
                placeholder="شاركنا رأيك وتقييمك&#10;امسح QR Code"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-bold resize-none leading-relaxed"
              />
            </div>

            {/* Secondary Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                العبارة التوضيحية الإضافية (اختياري)
              </label>
              <input
                id="input-secondary-text"
                type="text"
                value={config.secondaryText}
                onChange={(e) => onChange((p) => ({ ...p, secondaryText: e.target.value }))}
                placeholder="مثال: رأيك يصنع الفرق ويطور خدماتنا دائماً"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      config.starCount === count
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
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
                <label className="relative inline-flex items-center cursor-pointer">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
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
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  config.qrType === 'generated'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                توليد QR تلقائي من الرابط
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, qrType: 'uploaded' }))}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  config.qrType === 'uploaded'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
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
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-left font-mono"
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>💡 يمكنك وضع رابط تقييم Google Maps المباشر لنشاطك</span>
                    {config.qrUrl && (
                      <a
                        href={config.qrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1"
                      >
                        تجربة الرابط <ExternalLink className="w-2.5 h-2.5" />
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
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          config.qrColor === c ? 'border-amber-400 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={config.qrColor}
                      onChange={(e) => onChange((p) => ({ ...p, qrColor: e.target.value }))}
                      className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Center Icon in QR Code Selector */}
                <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-750 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold text-slate-200">الشعار في منتصف الـ QR Code</span>
                    <span className="text-[10px] text-amber-400 font-semibold">اختياري</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'dalilak' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'apple' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        config.qrLogoCenter && config.qrCenterLogoType === 'apple'
                          ? 'bg-slate-500/15 border-slate-400 text-slate-200 font-bold ring-1 ring-slate-400/40 shadow-sm'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
                        
                      </div>
                      <span className="text-[10px] font-bold leading-tight">Apple Maps</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, qrLogoCenter: true, qrCenterLogoType: 'star' }))}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
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
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          تغيير
                        </button>
                        <button
                          type="button"
                          onClick={() => onChange((p) => ({ ...p, uploadedQrDataUrl: null }))}
                          className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
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
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
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
                    }}
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
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
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
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  config.logoType === 'icon'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                أيقونة نشاط مدمجة
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, logoType: 'upload' }))}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  config.logoType === 'upload'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                رفع شعار مخصص (Logo)
              </button>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, logoType: 'none' }))}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  config.logoType === 'none'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                بدون
              </button>
            </div>

            {/* Icon Picker */}
            {config.logoType === 'icon' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2.5">
                  اختر أيقونة مناسبة لنشاطك التجاري
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => onChange((p) => ({ ...p, selectedIcon: icon.id }))}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        config.selectedIcon === icon.id
                          ? 'bg-amber-500/15 border-amber-400 text-amber-400 shadow-sm'
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
                        className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
                        title="حذف الشعار"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Scale Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                        <span>حجم الشعار في الملصق</span>
                        <span className="text-amber-400">{Math.round((config.logoScale || 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.05"
                        value={config.logoScale || 1}
                        onChange={(e) => onChange((p) => ({ ...p, logoScale: parseFloat(e.target.value) }))}
                        className="w-full accent-amber-500"
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
              <div className="grid grid-cols-2 gap-2">
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
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      config.themeId === t.id
                        ? 'bg-slate-800 border-amber-400 shadow-md ring-1 ring-amber-400/40'
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
              <div className="grid grid-cols-3 gap-2">
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
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      config.fontFamily === font.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold ring-1 ring-amber-400'
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
                      className="w-10 h-8 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
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
                      className="w-10 h-8 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
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
                      className="w-10 h-8 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
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
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      config.borderStyle === b.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
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
              <label className="relative inline-flex items-center cursor-pointer">
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
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
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
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-left font-['Outfit',sans-serif] font-bold"
                  />
                </div>

                {/* Dalilak Verification Box */}
                <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200">توثيق شركة دليلك المعتمدة</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
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
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
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
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
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
                          className="w-full bg-slate-850 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono"
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
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          config.footerBgColor === c ? 'border-amber-400 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={config.footerBgColor}
                      onChange={(e) => onChange((p) => ({ ...p, footerBgColor: e.target.value }))}
                      className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
