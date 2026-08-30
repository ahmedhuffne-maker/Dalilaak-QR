export type PosterFormat = 'a3' | 'a3_landscape' | 'a3_quad' | 'a4' | 'a4_landscape' | 'a4_quad' | 'landscape' | 'a5' | 'square' | 'badge';

export type FontChoice = 'Tajawal' | 'Cairo' | 'Readex Pro' | 'Amiri' | 'Aref Ruqaa';

export interface PosterConfig {
  // Business info
  businessName: string;
  businessSubtitle: string;
  category: string;
  showActivityNumber?: boolean;
  activityNumber?: string;
  activityNumberLabel?: string;
  activityShowWhatsAppIcon?: boolean;
  activityShowPhoneIcon?: boolean;
  
  // Call to action
  mainText: string;
  secondaryText: string;
  showRatingScore: boolean;
  ratingScore: string;
  starCount: number;
  
  // QR & Links
  qrType: 'generated' | 'uploaded';
  qrUrl: string;
  uploadedQrDataUrl: string | null;
  qrColor: string;
  qrBgColor: string;
  qrLogoCenter: boolean;
  qrCenterLogoType?: 'dalilak' | 'google' | 'whatsapp' | 'instagram' | 'snapchat' | 'tiktok' | 'tripadvisor' | 'apple' | 'star' | 'none';
  qrScale?: number;
  
  // Logo & Icon
  logoType: 'icon' | 'upload' | 'none';
  selectedIcon: string;
  uploadedLogoDataUrl: string | null;
  logoScale: number;
  
  // Design & Theme
  themeId: string;
  bgColor: string;
  bgTexture: 'paper' | 'clean' | 'gradient' | 'dots' | 'noise';
  textColor: string;
  accentColor: string;
  fontFamily: FontChoice;
  format: PosterFormat;
  
  // Footer & Branding
  showFooter: boolean;
  footerPhone: string;
  footerWhatsApp: string;
  footerShowWhatsAppIcon?: boolean;
  footerShowPhoneIcon?: boolean;
  footerBgColor: string;
  footerTextColor: string;
  footerAccentColor: string;
  showDalilakBranding: boolean;
  dalilakText: string;
  dalilakSubtext: string;
  footerWebsite: string;
  
  // Badges & Extras
  showGoogleBadge: boolean;
  showNfcBadge: boolean;
  nfcText: string;
  showMapPinBadge: boolean;
  borderStyle: 'none' | 'thin-gold' | 'double-frame' | 'modern-dashed' | 'ornament-corners';
}

export interface BusinessPreset {
  id: string;
  name: string;
  iconName: string;
  businessName: string;
  businessSubtitle: string;
  mainText: string;
  secondaryText: string;
  footerPhone: string;
  category: string;
  defaultTheme: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  bgColor: string;
  bgTexture: 'paper' | 'clean' | 'gradient' | 'dots' | 'noise';
  textColor: string;
  accentColor: string;
  footerBgColor: string;
  footerTextColor: string;
  footerAccentColor: string;
  borderStyle: 'none' | 'thin-gold' | 'double-frame' | 'modern-dashed' | 'ornament-corners';
}
