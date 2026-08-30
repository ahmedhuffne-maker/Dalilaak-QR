import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  RefreshCw, 
  Sparkles, 
  Store, 
  MapPin, 
  Phone, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  SlidersHorizontal,
  Layers,
  Settings,
  AlertCircle,
  QrCode,
  Zap
} from 'lucide-react';
import { DalilakBusiness } from '../types';
import { fetchDalilakBusinesses, getDalilakConfig, saveDalilakConfig, resetDalilakConfig } from '../services/dalilakService';

interface DalilakActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBusiness: (business: DalilakBusiness) => void;
}

const CATEGORY_FILTERS = [
  { id: 'all', label: '🌟 كل الأنشطة' },
  { id: 'مطاعم ومشويات', label: '🍔 مطاعم ومشويات' },
  { id: 'مقاهي وكافيهات', label: '☕ كافيهات ومقاهي' },
  { id: 'غسيل وتلميع سيارات', label: '🚗 مغاسل سيارات' },
  { id: 'صيانة وميكانيكا وورش سيارات', label: '🔧 صيانة وورش' },
  { id: 'صيدليات ورعاية صحية', label: '💊 صيدليات' },
  { id: 'أطباء وعيادات ومراكز طبية', label: '🩺 عيادات ومراكز طبية' },
  { id: 'صالونات حلاقة وتجميل وسبا', label: '✂️ صالونات وتجميل' },
  { id: 'سوبرماركت وبقالة وتموينات', label: '🛒 سوبرماركت' },
  { id: 'متاجر ملابس وأحذية وأزياء', label: '👗 ملابس وأزياء' },
];

export const DalilakActivitiesModal: React.FC<DalilakActivitiesModalProps> = ({
  isOpen,
  onClose,
  onSelectBusiness
}) => {
  const [businesses, setBusinesses] = useState<DalilakBusiness[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Settings state
  const config = getDalilakConfig();
  const [customUrl, setCustomUrl] = useState<string>(config.url);
  const [customKey, setCustomKey] = useState<string>(config.key);

  const loadData = async (query = searchQuery, cat = selectedCategory) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetchDalilakBusinesses({
        search: query,
        category: cat,
        limit: 60
      });
      setBusinesses(res.data);
      setIsLive(res.isLive);
      if (res.error) setErrorMessage(res.error);
    } catch (err: any) {
      setErrorMessage('حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData(searchQuery, selectedCategory);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    loadData(searchQuery, catId);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveDalilakConfig(customUrl, customKey);
    setShowSettings(false);
    loadData();
  };

  const handleResetSettings = () => {
    resetDalilakConfig();
    const def = getDalilakConfig();
    setCustomUrl(def.url);
    setCustomKey(def.key);
    setShowSettings(false);
    loadData();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in font-['Cairo',sans-serif]">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden shadow-black/80"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  أنشطة نظام دليلك المسجلة
                </h2>
                {isLive ? (
                  <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    مزامنة حية ولحظية
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    وضع المعاينة
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                اختر أي نشاط لتعبئة بياناته وتوليد بوستر التقييم وباركود الخرائط بضغطة واحدة
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="إعدادات الربط بقاعدة البيانات"
              className={`p-2 rounded-xl border transition-all text-slate-400 hover:text-white ${
                showSettings 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => loadData()}
              disabled={loading}
              title="تحديث البيانات لحظياً"
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-red-500/20 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Config Panel (Collapsible) */}
        {showSettings && (
          <form onSubmit={handleSaveSettings} className="p-4 bg-slate-950/90 border-b border-amber-500/30 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              إعدادات الاتصال بقاعدة بيانات دليلك (Supabase)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supabase URL</label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  placeholder="https://xxx.supabase.co"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supabase Anon Key</label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  placeholder="sb_publishable_..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleResetSettings}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                استعادة الافتراضي
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950"
              >
                حفظ وإعادة الاتصال
              </button>
            </div>
          </form>
        )}

        {/* Search & Category Filter Section */}
        <div className="p-3 sm:p-4 bg-slate-850/70 border-b border-slate-800 flex flex-col gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم النشاط، رقم الهاتف، المحافظة، المدينة، أو رقم النشاط..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-2.5 pr-10 pl-24 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              disabled={loading}
              className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md"
            >
              بحث
            </button>
          </form>

          {/* Category Filter Pills (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status / Error Banner */}
        {errorMessage && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/30 flex items-center gap-2 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Business Cards Content List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-slate-800/50 space-y-2.5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-3" />
              <p className="text-sm font-semibold">جاري جلب وتحديث الأنشطة المسجلة لحظياً...</p>
            </div>
          ) : businesses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Store className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-base font-bold text-slate-300">لم يتم العثور على أنشطة مطابقة للبحث</p>
              <p className="text-xs text-slate-500 mt-1">جرب البحث بكلمة أخرى أو تغيير تصنيف الفلترة</p>
            </div>
          ) : (
            businesses.map((biz) => {
              const fullAddress = [biz.governorate, biz.city, biz.street].filter(Boolean).join(' • ');
              const invoiceId = biz.invoice_number || biz.id?.replace(/^biz_/, '');

              return (
                <div 
                  key={biz.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group shadow-sm hover:shadow-md"
                >
                  {/* Business Main Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 group-hover:border-amber-500/50 transition-all shadow-inner">
                      <Store className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {biz.name_ar}
                        </h3>
                        {biz.category && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-750 text-slate-300 border border-slate-700">
                            {biz.category}
                          </span>
                        )}
                        {invoiceId && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            #{invoiceId}
                          </span>
                        )}
                      </div>

                      {biz.name_en && (
                        <p className="text-[11px] font-medium text-slate-400 tracking-wide mt-0.5 truncate font-mono">
                          {biz.name_en}
                        </p>
                      )}

                      {/* Location & Contacts */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-400">
                        {fullAddress && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate max-w-[220px] sm:max-w-none">{fullAddress}</span>
                          </span>
                        )}
                        {biz.phone && (
                          <span className="flex items-center gap-1 font-mono text-slate-300">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{biz.phone}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trigger Generator Button */}
                  <div className="w-full sm:w-auto flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <button
                      onClick={() => {
                        onSelectBusiness(biz);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-95 transition-all"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>توليد الملصق والبوستر</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Summary */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>إجمالي الأنشطة المعروضة: <strong className="text-amber-400">{businesses.length}</strong></span>
          <span className="text-[11px] text-slate-500">نظام QR Booster المستقل • الربط اللحظي بقاعدة دليلك</span>
        </div>
      </div>
    </div>
  );
};
