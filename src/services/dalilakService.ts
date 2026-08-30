import { DalilakBusiness, PosterConfig } from '../types';
import { generateSmartContextualTexts } from '../utils/textGeneratorEngine';
import { THEME_PRESETS } from '../presets';

// Default Supabase configuration for Dalilak
const DEFAULT_SUPABASE_URL = 'https://xdqpbajymacpdccorjcj.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_VJ8y1c53by7_sEn90hy8Pw_vO_K_b2x';

const STORAGE_KEY_URL = 'dalilak_supabase_url';
const STORAGE_KEY_KEY = 'dalilak_supabase_anon_key';

export function getDalilakConfig() {
  const url = localStorage.getItem(STORAGE_KEY_URL) || (import.meta as any).env?.VITE_DALILAK_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem(STORAGE_KEY_KEY) || (import.meta as any).env?.VITE_DALILAK_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  return { url: url.trim().replace(/\/+$/, ''), key: key.trim() };
}

export function saveDalilakConfig(url: string, key: string) {
  if (url) localStorage.setItem(STORAGE_KEY_URL, url.trim());
  if (key) localStorage.setItem(STORAGE_KEY_KEY, key.trim());
}

export function resetDalilakConfig() {
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_KEY);
}

/**
 * Fetch registered businesses from Dalilak database
 */
export async function fetchDalilakBusinesses(options?: {
  search?: string;
  category?: string;
  governorate?: string;
  limit?: number;
}): Promise<{ data: DalilakBusiness[]; error: string | null; isLive: boolean }> {
  const { url, key } = getDalilakConfig();
  const limit = options?.limit || 50;

  try {
    const params = new URLSearchParams();
    params.set('select', '*');
    params.set('order', 'created_at.desc');
    params.set('limit', String(limit));

    if (options?.category && options.category !== 'all') {
      params.set('category', `eq.${options.category}`);
    }

    if (options?.governorate && options.governorate !== 'all') {
      params.set('governorate', `eq.${options.governorate}`);
    }

    if (options?.search && options.search.trim()) {
      const q = options.search.trim();
      params.set('or', `(name_ar.ilike.*${q}*,name_en.ilike.*${q}*,phone.ilike.*${q}*,city.ilike.*${q}*,governorate.ilike.*${q}*,invoice_number.ilike.*${q}*,id.ilike.*${q}*)`);
    }

    const endpoint = `${url}/rest/v1/businesses?${params.toString()}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Dalilak fetch error:', response.status, errText);
      return {
        data: getOfflineDemoBusinesses(),
        error: `تعذر الاتصال بقاعدة البيانات (${response.status}). تم تحميل أمثلة تجريبية.`,
        isLive: false
      };
    }

    const data: DalilakBusiness[] = await response.json();
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
      isLive: true
    };
  } catch (err: any) {
    console.warn('Network error fetching Dalilak businesses:', err);
    return {
      data: getOfflineDemoBusinesses(),
      error: 'تعذر الاتصال بالخادم (خطأ شبكة). تم تحميل أمثلة تجريبية.',
      isLive: false
    };
  }
}

/**
 * Intelligently maps a Dalilak business into a full PosterConfig
 */
export function mapBusinessToPosterConfig(
  business: DalilakBusiness,
  prevConfig: PosterConfig
): PosterConfig {
  const businessName = business.name_ar || business.name_en || 'النشاط التجاري';
  const category = business.category || 'عام';
  
  // Smart text analysis
  const smartTexts = generateSmartContextualTexts(businessName, category);
  const matchedThemeId = smartTexts.suggestedTheme || 'classic-paper';
  const theme = THEME_PRESETS.find((t) => t.id === matchedThemeId) || THEME_PRESETS[0];

  // Address subtitle
  const addressParts = [
    business.name_en,
    business.governorate,
    business.city,
    business.street,
    business.landmark
  ].filter(Boolean);
  
  const businessSubtitle = business.name_en 
    ? `${business.name_en.toUpperCase()} • ${business.city || business.governorate || ''}`.trim()
    : (smartTexts.suggestedSubtitles[0] || addressParts.slice(0, 2).join(' • '));

  // Phone numbers
  const mainPhone = business.phone || business.secondary_phone || prevConfig.footerPhone;
  const whatsappPhone = business.secondary_phone || business.phone || prevConfig.footerWhatsApp;

  // Google Maps or Rating URL
  let qrTargetUrl = prevConfig.qrUrl;
  if (business.google_maps_url && business.google_maps_url.startsWith('http')) {
    qrTargetUrl = business.google_maps_url;
  } else if (business.google_place_id) {
    qrTargetUrl = `https://search.google.com/local/writereview?placeid=${business.google_place_id}`;
  } else if (business.lat && business.lng) {
    qrTargetUrl = `https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`;
  } else {
    qrTargetUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName + ' ' + (business.city || business.governorate || ''))}`;
  }

  // Activity registration number
  const activityNum = business.invoice_number || business.id?.replace(/^biz_/, '') || '';

  // Extract logo photo if available
  let uploadedLogo = prevConfig.uploadedLogoDataUrl;
  let logoType: 'icon' | 'upload' | 'none' = 'icon';
  if (Array.isArray(business.photos) && business.photos.length > 0) {
    const firstPhoto = typeof business.photos[0] === 'string' ? business.photos[0] : business.photos[0]?.url;
    if (firstPhoto && firstPhoto.startsWith('http')) {
      uploadedLogo = firstPhoto;
      logoType = 'upload';
    }
  }

  return {
    ...prevConfig,
    businessName: businessName,
    businessSubtitle: businessSubtitle || 'PREMIUM SERVICE & QUALITY',
    category: category,
    showActivityNumber: Boolean(activityNum),
    activityNumber: activityNum,
    activityNumberLabel: 'رقم النشاط',
    activityShowWhatsAppIcon: true,
    activityShowPhoneIcon: true,

    // Generated smart texts
    mainText: smartTexts.suggestedMainTexts[0] || `شاركنا رأيك وتقييمك\nبـ 5 نجوم ★`,
    secondaryText: smartTexts.suggestedSecondaryTexts[0] || `نسعى دائماً لتقديم أقصى درجات الجودة والخدمة المميزة`,
    showRatingScore: true,
    ratingScore: '5.0',
    starCount: 5,

    // QR
    qrType: 'generated',
    qrUrl: qrTargetUrl,
    qrCenterLogoType: 'google',
    qrLogoCenter: true,

    // Logo
    logoType: logoType,
    selectedIcon: smartTexts.suggestedIcon || 'Store',
    uploadedLogoDataUrl: uploadedLogo,

    // Theme
    themeId: theme.id,
    bgColor: theme.bgColor,
    bgTexture: theme.bgTexture,
    textColor: theme.textColor,
    accentColor: theme.accentColor,
    footerBgColor: theme.footerBgColor,
    footerTextColor: theme.footerTextColor,
    footerAccentColor: theme.footerAccentColor,
    borderStyle: theme.borderStyle,

    // Footer
    showFooter: true,
    footerPhone: mainPhone,
    footerWhatsApp: whatsappPhone,
    footerShowWhatsAppIcon: true,
    footerShowPhoneIcon: true,
    showDalilakBranding: true,
    dalilakText: 'دليلك',
    dalilakSubtext: 'المنصة الشاملة لإدارة وتوثيق الأنشطة والخدمات الميدانية',
    showGoogleBadge: true
  };
}

/**
 * Built-in fallback demo businesses
 */
function getOfflineDemoBusinesses(): DalilakBusiness[] {
  return [
    {
      id: 'biz_101',
      name_ar: 'مطعم ومشويات السلطان',
      name_en: 'AL SULTAN GRILL RESTAURANT',
      category: 'مطاعم ومشويات',
      governorate: 'القاهرة',
      city: 'مدينة نصر',
      street: 'شارع عباس العقاد',
      phone: '01012345678',
      secondary_phone: '01012345678',
      google_maps_url: 'https://maps.google.com/?q=Al+Sultan+Restaurant',
      invoice_number: 'DL-2026-0891',
      created_at: new Date().toISOString()
    },
    {
      id: 'biz_102',
      name_ar: 'كافيه روستيكو للقهوة المختصة',
      name_en: 'ROSTICO SPECIALTY COFFEE',
      category: 'مقاهي وكافيهات',
      governorate: 'الجيزة',
      city: 'الشيخ زايد',
      street: 'ممشى الروضة',
      phone: '01123456789',
      secondary_phone: '01123456789',
      google_maps_url: 'https://maps.google.com/?q=Rostico+Coffee',
      invoice_number: 'DL-2026-0892',
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'biz_103',
      name_ar: 'مركز توب كير لغسيل وتلميع السيارات',
      name_en: 'TOP CARE CAR DETAILING',
      category: 'غسيل وتلميع سيارات',
      governorate: 'الإسكندرية',
      city: 'سموحة',
      street: 'شارع فوزي معاذ',
      phone: '01234567890',
      secondary_phone: '01234567890',
      google_maps_url: 'https://maps.google.com/?q=Top+Care+Detailing',
      invoice_number: 'DL-2026-0893',
      created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 'biz_104',
      name_ar: 'صيدلية النور الحديثة',
      name_en: 'AL NOOR MODERN PHARMACY',
      category: 'صيدليات ورعاية صحية',
      governorate: 'القاهرة',
      city: 'التجمع الخامس',
      street: 'شارع التسعين الشمالي',
      phone: '01555512345',
      secondary_phone: '01555512345',
      google_maps_url: 'https://maps.google.com/?q=Al+Noor+Pharmacy',
      invoice_number: 'DL-2026-0894',
      created_at: new Date(Date.now() - 10800000).toISOString()
    },
    {
      id: 'biz_105',
      name_ar: 'عيادة د. أحمد طارق للأسنان',
      name_en: 'DR AHMED TAREK DENTAL CLINIC',
      category: 'أطباء وعيادات ومراكز طبية',
      governorate: 'الدقهلية',
      city: 'المنصورة',
      street: 'شارع المشاية السفلية',
      phone: '01099887766',
      secondary_phone: '01099887766',
      google_maps_url: 'https://maps.google.com/?q=Dr+Ahmed+Tarek+Dental',
      invoice_number: 'DL-2026-0895',
      created_at: new Date(Date.now() - 14400000).toISOString()
    }
  ];
}
