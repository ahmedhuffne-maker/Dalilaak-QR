import { BusinessPreset, ThemePreset, PosterConfig, PosterFormat, FontChoice } from './types';

export const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: 'car-wash',
    name: 'غسيل وتلميع سيارات (كلاسيك)',
    iconName: 'Car',
    businessName: 'لَمْعَة لِغَسِيل السَّيَّارَات',
    businessSubtitle: 'LAMAA CAR WASH & DETAILING',
    mainText: 'شاركنا رأيك\nوتقييمك',
    secondaryText: 'رأيك يهمنا في نظافة ولمعان سيارتك',
    footerPhone: '01556221141',
    category: 'خدمات سيارات',
    defaultTheme: 'classic-paper'
  },
  {
    id: 'car-detailing-vip',
    name: 'تلميع ساطع وعناية فائقة (VIP)',
    iconName: 'Droplets',
    businessName: 'كْرِيسْتَال كار كير للتلميع الساطع',
    businessSubtitle: 'CRYSTAL AUTO CARE & NANO CERAMIC',
    mainText: 'كيف كانت لمعة ونظافة سيارتك اليوم؟\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
    secondaryText: 'نسعى دائماً لتقديم أقصى درجات النظافة والبريق لسيارتك',
    footerPhone: '01556221141',
    category: 'خدمات سيارات',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'mobile-car-wash',
    name: 'مغسلة متنقلة وبخار (Mobile Wash)',
    iconName: 'Sparkles',
    businessName: 'بَابِلز لغسيل السيارات المتنقل',
    businessSubtitle: 'BUBBLES MOBILE STEAM WASH',
    mainText: 'سيارتك تستحق الأفضل دائماً ✨\nشاركنا رأيك في خدمة الغسيل والتلميع',
    secondaryText: 'خدمة غسيل متكاملة عند باب منزلك بأعلى معايير الجودة',
    footerPhone: '01556221141',
    category: 'خدمات سيارات',
    defaultTheme: 'royal-navy'
  },
  {
    id: 'specialty-coffee',
    name: 'مقهى وكافيه مختص',
    iconName: 'Coffee',
    businessName: 'رَوْنَق للقهوة المختصة',
    businessSubtitle: 'RAWNAQ SPECIALTY COFFEE',
    mainText: 'كيف كانت قهوتك وتجربتك اليوم؟\nامسح الرمز وقيّمنا على جوجل',
    secondaryText: 'يسعدنا دائماً استقبال رأيك ومشاركتك',
    footerPhone: '01556221141',
    category: 'مطاعم ومقاهي',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'fine-dining',
    name: 'مطعم ومأكولات فاخرة',
    iconName: 'Utensils',
    businessName: 'مطعم الأصالة الشرقي',
    businessSubtitle: 'AL ASALA ORIENTAL RESTAURANT',
    mainText: 'تقييمك يسعدنا ويلهمنا للأفضل!\nامسح الرمز وشاركنا رأيك',
    secondaryText: 'نتشرف دائماً بخدمتكم وتوفير ألذ الأطباق',
    footerPhone: '01556221141',
    category: 'مطاعم ومقاهي',
    defaultTheme: 'burgundy-luxury'
  },
  {
    id: 'medical-clinic',
    name: 'عيادة ومركز طبي',
    iconName: 'Stethoscope',
    businessName: 'مجمع النخبة الطبي المتخصص',
    businessSubtitle: 'ELITE MEDICAL COMPLEX',
    mainText: 'رأيكم يهمنا لتحسين جودة الرعاية\nامسح الرمز لتقييم زيارتك',
    secondaryText: 'صحتكم ورضاكم غايتنا الأولى',
    footerPhone: '01556221141',
    category: 'رعاية صحية',
    defaultTheme: 'modern-white'
  },
  {
    id: 'barber-salon',
    name: 'صالون وحلاقة رجالي',
    iconName: 'Scissors',
    businessName: 'صالون البرنس للعناية بالرجل',
    businessSubtitle: 'PRINCE GENTS SALON & SPA',
    mainText: 'شاركونا تقييمكم لخدمتنا\nوامسحوا الرمز بـ 5 نجوم ★',
    secondaryText: 'إطلالتكم المميزة هي شغفنا',
    footerPhone: '01556221141',
    category: 'عناية وتجميل',
    defaultTheme: 'royal-navy'
  },
  {
    id: 'perfume-boutique',
    name: 'عطور ومستحضرات فاخرة',
    iconName: 'Sparkles',
    businessName: 'دار المسك للعطور الملكية',
    businessSubtitle: 'DAR AL MISK ROYAL PERFUMES',
    mainText: 'عطّر يومنا برأيك وتقييمك\nامسح الكود وشاركنا تجربتك',
    secondaryText: 'فخامة الرائحة وأصالة التجربة',
    footerPhone: '01556221141',
    category: 'متاجر وتجزئة',
    defaultTheme: 'emerald-luxury'
  },
  {
    id: 'auto-service',
    name: 'صيانة وميكانيكا سيارات',
    iconName: 'Wrench',
    businessName: 'المركز الفني المتقدم لصيانة السيارات',
    businessSubtitle: 'ADVANCED AUTO CARE CENTER',
    mainText: 'كيف كانت صيانة سيارتك اليوم؟\nامسح الرمز لتقييم الخدمة',
    secondaryText: 'ثقتكم بنا هي رأس مالنا',
    footerPhone: '01556221141',
    category: 'خدمات سيارات',
    defaultTheme: 'classic-paper'
  },
  {
    id: 'fitness-gym',
    name: 'نادي رياضي ولياقة',
    iconName: 'Dumbbell',
    businessName: 'باور فيتنس جيم & كروس فيت',
    businessSubtitle: 'POWER FITNESS CLUB',
    mainText: 'طاقتكم وإنجازكم هو دافعنا!\nامسح الرمز وقيّم تجربتك معنا',
    secondaryText: 'نساعدك لبناء أسلوب حياة رياضي متكامل',
    footerPhone: '01556221141',
    category: 'رياضة ولياقة',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'real-estate',
    name: 'عقارات ومقاولات',
    iconName: 'Building2',
    businessName: 'صرح المستقبل للاستثمار العقاري',
    businessSubtitle: 'SARH REAL ESTATE INVESTMENT',
    mainText: 'ثقتكم هي ركيزتنا الأولى\nامسح الرمز لتقييم مستشارينا',
    secondaryText: 'نبتكر حلولاً عقارية تلبي تطلعاتكم',
    footerPhone: '01556221141',
    category: 'عقارات وخدمات',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'dental-clinic',
    name: 'عيادة وتجميل الأسنان',
    iconName: 'Tooth',
    businessName: 'مركز هوليوود سمايل لطب الأسنان',
    businessSubtitle: 'HOLLYWOOD SMILE DENTAL CLINIC',
    mainText: 'ابتسامتكم الجميلة سر سعادتنا!\nامسح الرمز وشاركنا رأيك بـ 5 نجوم ★',
    secondaryText: 'أحدث التقنيات لراحة وصحة أسنانكم',
    footerPhone: '01556221141',
    category: 'رعاية صحية',
    defaultTheme: 'modern-white'
  },
  {
    id: 'italian-pizza',
    name: 'بيتزا ومأكولات إيطالية',
    iconName: 'Pizza',
    businessName: 'بيتزا نابولي الإيطالية الفاخرة',
    businessSubtitle: 'NAPOLI ARTISAN PIZZA & PASTA',
    mainText: 'كيف كانت نكهة البيتزا اليوم؟ 🍕\nامسح الرمز وقيّمنا على خرائط Google',
    secondaryText: 'نصنع ألذ الوصفات على الحطب بحب وإتقان',
    footerPhone: '01556221141',
    category: 'مطاعم ومقاهي',
    defaultTheme: 'burgundy-luxury'
  },
  {
    id: 'burger-station',
    name: 'برجر ووجبات سريعة',
    iconName: 'Burger',
    businessName: 'سموك برجر ستيشن',
    businessSubtitle: 'SMOKE BURGER & CRISPY FRIES',
    mainText: 'طعم لا يُقاوم! 🍔 شاركنا رأيك\nوامسح الرمز بـ 5 نجوم ★',
    secondaryText: 'لحوم طازجة 100% ونكهات فريدة لا تُنسى',
    footerPhone: '01556221141',
    category: 'مطاعم ومقاهي',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'luxury-eyewear',
    name: 'بصريات ونظارات فاخرة',
    iconName: 'Glasses',
    businessName: 'نظارات الرؤية الملكية',
    businessSubtitle: 'ROYAL VISION OPTICS & EYEWEAR',
    mainText: 'رؤية أوضح وأناقة تدوم ✨\nامسح الرمز وشاركنا تقييمك لخدمتنا',
    secondaryText: 'أرقى الماركات العالمية وفحص نظر دقيق',
    footerPhone: '01556221141',
    category: 'متاجر وتجزئة',
    defaultTheme: 'royal-navy'
  },
  {
    id: 'fine-jewelry',
    name: 'مجوهرات وذهب وألماس',
    iconName: 'Gem',
    businessName: 'دار الذهب والمجوهرات الملكية',
    businessSubtitle: 'ROYAL GOLD & LUXURY JEWELRY',
    mainText: 'بريق الفخامة يكتمل برأيكم 💎\nامسح الرمز لتقييم زيارتكم الكريمة',
    secondaryText: 'تصاميم استثنائية وأصالة الذهب الخالص',
    footerPhone: '01556221141',
    category: 'متاجر وتجزئة',
    defaultTheme: 'classic-paper'
  },
  {
    id: 'travel-tourism',
    name: 'سياحة وسفر وحجوزات',
    iconName: 'Plane',
    businessName: 'أفق العالم للسياحة والسفر',
    businessSubtitle: 'WORLD HORIZON TRAVEL & TOURISM',
    mainText: 'رحلتكم المميزة تبدأ معنا ✈️\nامسح الرمز وقيّم تجربة حجزك',
    secondaryText: 'نصنع لكم ذكريات سياحية لا تُنسى حول العالم',
    footerPhone: '01556221141',
    category: 'سياحة وخدمات',
    defaultTheme: 'royal-navy'
  },
  {
    id: 'photo-studio',
    name: 'استوديو تصوير واحتفالات',
    iconName: 'Camera',
    businessName: 'استوديو العدسة الذهبية للتصوير',
    businessSubtitle: 'GOLDEN LENS PHOTO STUDIO',
    mainText: 'نوثّق أجمل لحظاتكم باحتراف 📸\nامسح الرمز وقيّم تجربتك معنا',
    secondaryText: 'جلسات تصوير سينمائية وتوثيق مناسبات راقية',
    footerPhone: '01556221141',
    category: 'فنون وإعلام',
    defaultTheme: 'luxury-dark'
  },
  {
    id: 'dry-clean-laundry',
    name: 'مغسلة دراي كلين وعناية بالملابس',
    iconName: 'Shirt',
    businessName: 'مغاسل وايت جلو للملابس الفاخرة',
    businessSubtitle: 'WHITE GLOW DRY CLEANING & STEAM',
    mainText: 'نظافة فائقة وعناية تدوم بأناقتك ✨\nامسح الرمز وقيّم جودة الغسيل',
    secondaryText: 'غسيل وكوي بالبخار بأحدث الأجهزة الإيطالية',
    footerPhone: '01556221141',
    category: 'خدمات منزلية',
    defaultTheme: 'modern-white'
  },
  {
    id: 'tech-repair',
    name: 'صيانة حاسبات وهواتف ذكية',
    iconName: 'Laptop',
    businessName: 'تيك ماستر لصيانة الأجهزة الذكية',
    businessSubtitle: 'TECH MASTER COMPUTER & SMARTPHONE',
    mainText: 'سرعة ودقة في الصيانة والقطع الأصلية 💻\nامسح الرمز وقيّم خدمتنا',
    secondaryText: 'ضمان معتمد وصيانة فورية لجميع الأجهزة',
    footerPhone: '01556221141',
    category: 'تقنية وإلكترونيات',
    defaultTheme: 'luxury-dark'
  }
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'classic-paper',
    name: 'الورق الفاخر المعتق (Classic Craft)',
    bgColor: '#f6f0e6',
    bgTexture: 'paper',
    textColor: '#1c1917',
    accentColor: '#e5a82e',
    footerBgColor: '#070d18',
    footerTextColor: '#ffffff',
    footerAccentColor: '#e5a82e',
    borderStyle: 'none'
  },
  {
    id: 'luxury-dark',
    name: 'الوضع الداكن الفاخر (Slate Dark)',
    bgColor: '#0f172a',
    bgTexture: 'noise',
    textColor: '#f8fafc',
    accentColor: '#fbbf24',
    footerBgColor: '#020617',
    footerTextColor: '#ffffff',
    footerAccentColor: '#fbbf24',
    borderStyle: 'thin-gold'
  },
  {
    id: 'modern-white',
    name: 'الأبيض النقي المودرن (Clean White)',
    bgColor: '#ffffff',
    bgTexture: 'clean',
    textColor: '#1e293b',
    accentColor: '#2563eb',
    footerBgColor: '#1e293b',
    footerTextColor: '#ffffff',
    footerAccentColor: '#60a5fa',
    borderStyle: 'double-frame'
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي (Royal Gold)',
    bgColor: '#091528',
    bgTexture: 'gradient',
    textColor: '#f8fafc',
    accentColor: '#d97706',
    footerBgColor: '#040b15',
    footerTextColor: '#ffffff',
    footerAccentColor: '#f59e0b',
    borderStyle: 'ornament-corners'
  },
  {
    id: 'emerald-luxury',
    name: 'الزمردي الأخضر والذهبي (Emerald)',
    bgColor: '#064e3b',
    bgTexture: 'paper',
    textColor: '#ecfdf5',
    accentColor: '#fbbf24',
    footerBgColor: '#022c22',
    footerTextColor: '#ffffff',
    footerAccentColor: '#34d399',
    borderStyle: 'thin-gold'
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي والأوركيد الفاخر (Burgundy)',
    bgColor: '#450a0a',
    bgTexture: 'noise',
    textColor: '#fef2f2',
    accentColor: '#f59e0b',
    footerBgColor: '#1c0303',
    footerTextColor: '#ffffff',
    footerAccentColor: '#facc15',
    borderStyle: 'double-frame'
  },
  {
    id: 'vintage-sepia',
    name: 'البيج الدافئ والمميز (Warm Warmth)',
    bgColor: '#fbf7ee',
    bgTexture: 'dots',
    textColor: '#292524',
    accentColor: '#ea580c',
    footerBgColor: '#292524',
    footerTextColor: '#ffffff',
    footerAccentColor: '#fb923c',
    borderStyle: 'thin-gold'
  }
];

export const CTA_SUGGESTIONS = [
  'شاركنا رأيك\nوتقييمك',
  'كيف كانت لمعة ونظافة سيارتك اليوم؟\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
  'سيارتك تستحق الأفضل دائماً ✨\nشاركنا رأيك في خدمة الغسيل والتلميع',
  'لأن لمعة سيارتك شغفنا 🌟\nقيّم تجربتك معنا على خرائط جوجل',
  'رأيك يهمنا في نظافة ولمعان سيارتك\nامسح الكود واترك 5 نجوم',
  'تجربة غسيل وعناية استثنائية!\nامسح الرمز وشاركنا رأيك',
  'وشاركونا رأيك\nوتقييمك على خرائط جوجل',
  'تقييمك يسعدنا! 🌟\nامسح الرمز واترك 5 نجوم',
  'رأيك يهمنا ويصنع فارقنا\nامسح الكود وشاركنا تجربتك',
  'كيف كانت تجربتك اليوم؟\nقيّمنا على خرائط جوجل',
  'امسح الرمز وشاركنا رأيك\nبخطوة واحدة سريعة',
  'نسعد بخدمتكم دائماً\nساعدنا بتقييم خدماتنا بـ 5 نجوم',
  'كن شريكاً في نجاحنا\nاترك انطباعك ورأيك الكريم'
];

export const AVAILABLE_ICONS = [
  { id: 'Car', label: 'سيارة / غسيل وتلميع' },
  { id: 'Droplets', label: 'رغوة ومياه / لمعان' },
  { id: 'Sparkles', label: 'بريق وتلميع / عطور' },
  { id: 'Wrench', label: 'صيانة وميكانيكا' },
  { id: 'Coffee', label: 'قهوة وكافيه مختص' },
  { id: 'Utensils', label: 'مطعم ومأكولات' },
  { id: 'Pizza', label: 'بيتزا وباستا إيطالية' },
  { id: 'Burger', label: 'برجر وفاست فود' },
  { id: 'Flame', label: 'شواء ومشويات' },
  { id: 'Cake', label: 'حلويات ومخابز' },
  { id: 'IceCream', label: 'آيس كريم ومثلجات' },
  { id: 'Fish', label: 'أسماك ومأكولات بحرية' },
  { id: 'Stethoscope', label: 'عيادة وطبيب' },
  { id: 'Tooth', label: 'طب أسنان / ابتسامة' },
  { id: 'Eye', label: 'عيون وليزر وبصريات' },
  { id: 'Glasses', label: 'نظارات وبصريات' },
  { id: 'Scissors', label: 'صالون وحلاقة' },
  { id: 'Flower2', label: 'سبا وتجميل' },
  { id: 'ShoppingBag', label: 'متجر وتسوق' },
  { id: 'Shirt', label: 'مغسلة ودراي كلين' },
  { id: 'Gem', label: 'ذهب ومجوهرات وألماس' },
  { id: 'Watch', label: 'ساعات ومجوهرات' },
  { id: 'Gift', label: 'هدايا وتوزيعات وورود' },
  { id: 'Camera', label: 'تصوير واستوديو' },
  { id: 'Plane', label: 'سياحة وسفر وطيران' },
  { id: 'Dumbbell', label: 'جيم ونادي لياقة' },
  { id: 'Building2', label: 'عقارات وبناء' },
  { id: 'Hotel', label: 'فندق وضيافة' },
  { id: 'Home', label: 'أثاث وديكور منزلي' },
  { id: 'Palette', label: 'رسم وتصميم وديكور' },
  { id: 'Music', label: 'صوتيات وحفلات وموسيقى' },
  { id: 'Key', label: 'مفاتيح وتأجير سيارات' },
  { id: 'Shield', label: 'حماية وتظليل عازل' },
  { id: 'Fuel', label: 'وقود وطاقة وخدمات طريق' },
  { id: 'BookOpen', label: 'مكتبات وقرطاسية' },
  { id: 'Laptop', label: 'حاسبات وتقنية وصيانة' },
  { id: 'GraduationCap', label: 'تعليم وتدريب' },
  { id: 'Briefcase', label: 'أعمال ومحاماة' },
  { id: 'Truck', label: 'شحن ونقل وتوصيل' },
  { id: 'MapPin', label: 'موقع جوجل ماب' },
  { id: 'Star', label: 'نجمة تقييم ذهبية' },
  { id: 'Crown', label: 'ملكي / VIP' },
  { id: 'ShieldCheck', label: 'موثوق وأمان' },
  { id: 'HeartHandshake', label: 'خدمة عملاء' },
  { id: 'BadgeCheck', label: 'معتمد وجودة' },
  { id: 'Smartphone', label: 'جوال وتطبيقات ذكية' }
];

export function generateRandomMix(currentConfig: PosterConfig): PosterConfig {
  // 1. Random Theme
  const randomTheme = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];

  // 2. Random Font
  const fonts: FontChoice[] = ['Cairo', 'Tajawal', 'Readex Pro', 'Amiri', 'Aref Ruqaa'];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

  // 3. Random Format
  const formats: PosterFormat[] = ['a4', 'a4_landscape', 'a4_quad', 'a5', 'square', 'badge', 'a3', 'a3_quad', 'a3_landscape'];
  const randomFormat = formats[Math.floor(Math.random() * formats.length)];

  // 4. Random CTA text from suggestions
  const randomCta = CTA_SUGGESTIONS[Math.floor(Math.random() * CTA_SUGGESTIONS.length)];

  // 5. Random Icon from AVAILABLE_ICONS
  const randomIcon = AVAILABLE_ICONS[Math.floor(Math.random() * AVAILABLE_ICONS.length)].id;

  // 6. Random Stars
  const randomStars = Math.random() > 0.15 ? 5 : 4;

  // 7. Random toggles
  const randomNfc = Math.random() > 0.5;
  const randomGoogleBadge = Math.random() > 0.55;
  const randomMapPin = Math.random() > 0.65;

  // 8. Random border style
  const borderStyles: PosterConfig['borderStyle'][] = ['none', 'thin-gold', 'double-frame', 'ornament-corners', 'modern-dashed'];
  const randomBorderStyle = borderStyles[Math.floor(Math.random() * borderStyles.length)];

  // 9. Random texture
  const textures: PosterConfig['bgTexture'][] = ['paper', 'clean', 'gradient', 'dots', 'noise'];
  const randomTexture = textures[Math.floor(Math.random() * textures.length)];

  // 10. Random phone / WhatsApp icons toggle
  const randomShowWa = Math.random() > 0.25;
  const randomShowPh = Math.random() > 0.35;

  return {
    ...currentConfig,

    // PRESERVED STRICTLY: Business name, subtitle, activity number, phone, QR & center logo
    businessName: currentConfig.businessName,
    businessSubtitle: currentConfig.businessSubtitle,
    activityNumber: currentConfig.activityNumber,
    activityNumberLabel: currentConfig.activityNumberLabel,
    footerPhone: currentConfig.footerPhone,
    footerWhatsApp: currentConfig.footerWhatsApp,
    qrUrl: currentConfig.qrUrl,
    uploadedQrDataUrl: currentConfig.uploadedQrDataUrl,
    qrColor: currentConfig.qrColor,
    qrBgColor: currentConfig.qrBgColor,
    qrLogoCenter: currentConfig.qrLogoCenter,
    qrCenterLogoType: currentConfig.qrCenterLogoType,
    showFooter: currentConfig.showFooter,
    showDalilakBranding: currentConfig.showDalilakBranding,
    dalilakText: currentConfig.dalilakText,
    dalilakSubtext: currentConfig.dalilakSubtext,
    footerWebsite: currentConfig.footerWebsite,

    // SHUFFLED / REMIXED ATTRIBUTES:
    mainText: randomCta,
    starCount: randomStars,
    themeId: randomTheme.id,
    bgColor: randomTheme.bgColor,
    bgTexture: randomTexture,
    textColor: randomTheme.textColor,
    accentColor: randomTheme.accentColor,
    footerBgColor: randomTheme.footerBgColor,
    footerTextColor: randomTheme.footerTextColor,
    footerAccentColor: randomTheme.footerAccentColor,
    borderStyle: randomBorderStyle,
    fontFamily: randomFont,
    format: randomFormat,
    
    // Icon (shuffled unless user uploaded custom logo)
    logoType: currentConfig.logoType === 'upload' && currentConfig.uploadedLogoDataUrl ? 'upload' : 'icon',
    selectedIcon: randomIcon,
    logoScale: 1.0 + Math.floor(Math.random() * 3) * 0.1,

    // Badges & Features
    showNfcBadge: randomNfc,
    showGoogleBadge: randomGoogleBadge,
    showMapPinBadge: randomMapPin,

    // Activity number icons presence
    activityShowWhatsAppIcon: randomShowWa,
    activityShowPhoneIcon: randomShowPh,
    showActivityNumber: !!currentConfig.activityNumber
  };
}
