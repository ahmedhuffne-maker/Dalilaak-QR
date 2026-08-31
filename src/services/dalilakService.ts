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

export interface DalilakGoogleMapsInfo {
  verifiedUrl: string | null;
  isVerified: boolean;
  repCoordinatesUrl: string | null;
  googlePlaceId: string | null;
  googleSyncStatus: 'synced' | 'in_progress' | 'not_synced' | string;
  verificationStatus: string;
  notesObj: Record<string, any>;
}

/**
 * Checks if a given Google Maps link is a verified place link (added by admins/Google)
 * rather than a raw unverified coordinates link sent by representatives during initial survey.
 */
export function isVerifiedGoogleMapsLink(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return false;
  const trimmed = url.trim();

  // 1. Check for known verified link formats (short links, review links, CID links, place profile links)
  if (/maps\.app\.goo\.gl\/[a-zA-Z0-9_-]+/i.test(trimmed)) return true;
  if (/goo\.gl\/maps\/[a-zA-Z0-9_-]+/i.test(trimmed)) return true;
  if (/g\.page\/r\/[a-zA-Z0-9_-]+/i.test(trimmed)) return true;
  if (/search\.google\.com\/local\/(writereview|reviews)\?placeid=/i.test(trimmed)) return true;
  if (/[?&]cid=\d+/i.test(trimmed)) return true;
  if (/[?&]query_place_id=/i.test(trimmed)) return true;

  // 2. Identify and reject raw representative coordinates query URLs (e.g. ?api=1&query=29.968951,31.090401 or ?q=29.968951,31.090401)
  // Representative links drop a generic blank pin at coordinates without an established business profile.
  const isRawCoordQuery = /[?&]query=-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?(?:&|$)/i.test(trimmed);
  const isRawQCoord = /[?&]q=-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?(?:&|$)/i.test(trimmed);
  const isRawAtCoord = /\/maps\/@-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?/i.test(trimmed);
  const isRawPlaceCoord = /\/maps\/place\/-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?/i.test(trimmed);

  if (isRawCoordQuery || isRawQCoord || isRawAtCoord || isRawPlaceCoord) {
    return false;
  }

  // 3. If it contains a named place or custom business path on google maps
  if (/\/maps\/place\/[^\/?#]+/i.test(trimmed)) {
    return true;
  }

  // If it's a general google link with business query rather than bare numbers
  if (/google\.com\/maps/i.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Parses and extracts Google Maps verification data from a Dalilak business record.
 * Handles database fields, notes JSON payload, place IDs, and representative coordinate links.
 */
export function extractBusinessGoogleInfo(business: DalilakBusiness): DalilakGoogleMapsInfo {
  let notesObj: Record<string, any> = {};
  if (business.notes) {
    if (typeof business.notes === 'string') {
      try {
        notesObj = JSON.parse(business.notes);
      } catch (e) {
        notesObj = {};
      }
    } else if (typeof business.notes === 'object') {
      notesObj = business.notes;
    }
  }

  const googlePlaceId = business.google_place_id || notesObj.googlePlaceId || notesObj.place_id || null;
  const googleSyncStatus = notesObj.googleSyncStatus || (business.verification_status === 'verified' ? 'synced' : 'in_progress');
  const verificationStatus = business.verification_status || (googleSyncStatus === 'synced' ? 'verified' : 'pending');

  let verifiedUrl: string | null = null;
  let repCoordinatesUrl: string | null = null;

  // Candidate URLs from notes and columns
  const candidateUrls = [
    notesObj.verifiedGoogleMapsUrl,
    notesObj.verified_google_maps_url,
    notesObj.adminGoogleMapsUrl,
    notesObj.googleMapsUrl,
    business.google_maps_url
  ].filter(Boolean) as string[];

  // 1. Search for verified Google Maps link
  for (const url of candidateUrls) {
    if (isVerifiedGoogleMapsLink(url)) {
      verifiedUrl = url.trim();
      break;
    } else if (!repCoordinatesUrl && typeof url === 'string' && url.startsWith('http')) {
      repCoordinatesUrl = url.trim();
    }
  }

  // 2. If Place ID exists but no verified URL was explicitly found, construct direct write-review URL
  if (!verifiedUrl && googlePlaceId && String(googlePlaceId).trim().length > 3) {
    verifiedUrl = `https://search.google.com/local/writereview?placeid=${googlePlaceId.trim()}`;
  }

  // 3. Check if representative coordinate link was not found yet
  if (!repCoordinatesUrl) {
    if (business.lat && business.lng) {
      repCoordinatesUrl = `https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`;
    }
  }

  const isVerified = Boolean(verifiedUrl) || (googleSyncStatus === 'synced' && Boolean(verifiedUrl));

  return {
    verifiedUrl,
    isVerified,
    repCoordinatesUrl,
    googlePlaceId,
    googleSyncStatus,
    verificationStatus,
    notesObj
  };
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
  const limit = options?.limit || 60;

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
 * Intelligently maps a Dalilak business into a full PosterConfig.
 * Ensures that ONLY verified Google Maps links (or Place ID review links) are used for QR generation,
 * strictly ignoring and discarding unverified representative coordinate links.
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

  // English Business Subtitle (Clean without duplicate words)
  let businessSubtitle = '';
  if (business.name_en && business.name_en.trim().length > 2) {
    businessSubtitle = business.name_en.toUpperCase().trim();
  } else {
    businessSubtitle = smartTexts.suggestedSubtitles[0] || 'QUALITY & EXCELLENCE';
  }
  businessSubtitle = businessSubtitle.replace(/\b(PREMIUM|QUALITY|LUXURY|VIP)\s+\1\b/gi, '$1').trim();

  // Registered Phone numbers
  const registeredPhone = business.phone || business.secondary_phone || '';

  // Extract verified Google Maps Link vs Unverified Rep Link
  const googleInfo = extractBusinessGoogleInfo(business);

  let qrTargetUrl = '';
  if (googleInfo.verifiedUrl) {
    // 1. Use the verified admin link (or Place ID review link)
    qrTargetUrl = googleInfo.verifiedUrl;
  } else {
    // 2. DO NOT use the unverified representative coordinate link (?query=lat,lng).
    // Instead, search by full business name and location to find the real listing on Google Maps.
    const searchLocation = [business.city, business.governorate].filter(Boolean).join(' ');
    const searchQuery = `${businessName} ${searchLocation}`.trim();
    qrTargetUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  }

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
    businessSubtitle: businessSubtitle,
    category: business.category && business.category !== 'عام' ? business.category : smartTexts.detectedCategory.name,
    showActivityNumber: Boolean(registeredPhone),
    activityNumber: registeredPhone,
    activityNumberLabel: 'رقم التواصل',
    activityShowWhatsAppIcon: true,
    activityShowPhoneIcon: false,

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

    // Footer (Fixed Dalilak Official Contact 01556221141 - WhatsApp only)
    showFooter: true,
    footerPhone: '01556221141',
    footerWhatsApp: '01556221141',
    footerShowWhatsAppIcon: true,
    footerShowPhoneIcon: false,
    showDalilakBranding: true,
    dalilakText: 'دليلك',
    dalilakSubtext: 'المنصة الشاملة لإدارة وتوثيق الأنشطة والخدمات الميدانية',
    footerWebsite: 'www.dalilaak.com',
    showGoogleBadge: true
  };
}

/**
 * Built-in fallback demo businesses with verified and pending examples
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
      verification_status: 'verified',
      google_maps_url: 'https://maps.app.goo.gl/qkt8QvajVFCs6zLq9',
      google_place_id: 'ChIJ_U5T7P0C_MTCPPH4P',
      notes: JSON.stringify({
        googleSyncStatus: 'synced',
        googleMapsUrl: 'https://maps.app.goo.gl/qkt8QvajVFCs6zLq9',
        googlePlaceId: 'ChIJ_U5T7P0C_MTCPPH4P'
      }),
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
      verification_status: 'verified',
      google_maps_url: 'https://maps.app.goo.gl/4rq9NLz2sXTHUaTM7',
      google_place_id: 'ChIJ_XR8QIVG_MTCPU398',
      notes: JSON.stringify({
        googleSyncStatus: 'synced',
        googleMapsUrl: 'https://maps.app.goo.gl/4rq9NLz2sXTHUaTM7',
        googlePlaceId: 'ChIJ_XR8QIVG_MTCPU398'
      }),
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
      verification_status: 'verified',
      google_maps_url: 'https://maps.app.goo.gl/KnWpFvop8j3sSALP8',
      notes: JSON.stringify({
        googleSyncStatus: 'synced',
        googleMapsUrl: 'https://maps.app.goo.gl/KnWpFvop8j3sSALP8'
      }),
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
      verification_status: 'in_progress',
      lat: 29.968951,
      lng: 31.090401,
      notes: JSON.stringify({
        googleSyncStatus: 'in_progress',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=29.968951,31.090401'
      }),
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
      verification_status: 'verified',
      google_maps_url: 'https://maps.app.goo.gl/5xKaXYGdytZBQfQT8',
      notes: JSON.stringify({
        googleSyncStatus: 'synced',
        googleMapsUrl: 'https://maps.app.goo.gl/5xKaXYGdytZBQfQT8'
      }),
      invoice_number: 'DL-2026-0895',
      created_at: new Date(Date.now() - 14400000).toISOString()
    }
  ];
}
