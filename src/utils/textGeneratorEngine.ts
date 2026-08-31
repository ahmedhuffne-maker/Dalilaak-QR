import { PosterConfig, FontChoice, PosterFormat } from '../types';

export interface BusinessCategoryInfo {
  id: string;
  name: string;
  keywords: string[];
  suggestedIcon: string;
  suggestedTheme: string;
  sampleSubtitles: string[];
  slogans: string[]; // Unique domain taglines / slogans for the secondary text
  ctaTemplates: {
    main: string;
    secondary: string;
  }[];
}

export const BUSINESS_CATEGORIES: BusinessCategoryInfo[] = [
  // 1. ورش وأعمال الألوميتال والزجاج والشبابيك
  {
    id: 'aluminum-glass',
    name: 'أعمال وورش الألوميتال والزجاج والشبابيك والمطابخ',
    keywords: ['الوميتال', 'الومنيوم', 'الامنتال', 'ألوميتال', 'الومنتال', 'زجاج', 'واجهات', 'سكوريت', 'شبابيك', 'شباك', 'ابواب الوميتال', 'مطابخ الوميتال', 'تندات', 'شيش حصيره', 'aluminum', 'glass', 'windows', 'doors', 'facade'],
    suggestedIcon: 'Wrench',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['ALUMINUM & GLASS ARCHITECTURE', 'MODERN ALUMINUM WORKSHOP', 'PREMIUM ALUMINUM & GLASS FAÇADES'],
    slogans: [
      'نشكّل من الألوميتال فناً وإتقاناً يدوم',
      'دقة التصنيع ولمسات عصرية لمنزلك',
      'أبواب وشبابيك بعزل فائق وجودة تدوم لأجيال',
      'إبداع في التصميم ومتانة تفوق التوقعات'
    ],
    ctaTemplates: [
      {
        main: 'رأيك يهمنا في جودة وإتقان أعمالنا 🔧\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'نشكّل من الألوميتال فناً وإتقاناً يدوم'
      },
      {
        main: 'كيف كان تشطيب وتركيب أعمالك معنا؟ ✨\nشاركنا تقييمك على خرائط Google',
        secondary: 'دقة التصنيع ولمسات عصرية لمنزلك'
      },
      {
        main: 'شرفتنا بزيارتك واختيارك لنا 🌟\nقيّمنا بـ 5 نجوم بخطوة واحدة',
        secondary: 'أبواب وشبابيك بعزل فائق وجودة تدوم لأجيال'
      }
    ]
  },

  // 2. المكتبات والقرطاسية والطباعة والأدوات المدرسية
  {
    id: 'bookstore-stationery',
    name: 'مكتبات وقرطاسية وخدمات طباعة وأدوات مدرسية',
    keywords: ['مكتبة', 'مكتبه', 'قرطاسية', 'كتب', 'روايات', 'طباعة', 'تصوير مستندات', 'أدوات مدرسية', 'ادوات مكتبية', 'تجليد', 'bookstore', 'library', 'stationery', 'printing', 'books', 'school'],
    suggestedIcon: 'Sparkles',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['BOOKSTORE & STATIONERY', 'PRINTING & CREATIVE STATION', 'KNOWLEDGE & BOOK HAVEN'],
    slogans: [
      'بوابتك لعوالم المعرفة وشغف القراءة',
      'كل ما يحتاجه إبداعك ومستقبلك الدراسي',
      'حيث تلتقي الأفكار الملهمة بحب المعرفة',
      'وجهتك الأولى للأدوات المدرسية والمطبوعات الراقية'
    ],
    ctaTemplates: [
      {
        main: 'نتمنى أن تجد معنا شغفك وإلهامك 📚\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'بوابتك لعوالم المعرفة وشغف القراءة'
      },
      {
        main: 'رأيك يسعدنا ويدعم مسيرتنا ✨\nشاركنا تقييمك على خرائط Google',
        secondary: 'كل ما يحتاجه إبداعك ومستقبلك الدراسي'
      },
      {
        main: 'خدمتكم شرف وشغف دائم لنا 🌟\nامسح الكود وقيّم تجربتك معنا',
        secondary: 'حيث تلتقي الأفكار الملهمة بحب المعرفة'
      }
    ]
  },

  // 3. أسواق وسوبرماركت وبقالة وخضار وفواكه
  {
    id: 'supermarket-grocery',
    name: 'أسواق وسوبرماركت ومواد غذائية وبقالة',
    keywords: ['اسواق', 'أسواق', 'سوق', 'ماركت', 'سوبر ماركت', 'سوبرماركت', 'هايبر', 'هايبرماركت', 'بقالة', 'بقاله', 'تموينات', 'ميني ماركت', 'خضار', 'فواكه', 'عطارة', 'أغذية', 'مواد غذائية', 'supermarket', 'hypermarket', 'grocery', 'market', 'mart', 'food'],
    suggestedIcon: 'Store',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['SUPERMARKET & FRESH GROCERY', 'FOOD MARKET & DAILY ESSENTIALS', 'HYPERMARKET & FOOD CENTER'],
    slogans: [
      'أجود المنتجات الطازجة يومياً لخدمة عائلتك',
      'كل ما يلزم بيتك وعائلتك بأفضل جودة وأنسب سعر',
      'تسوق ممتع وتنوع لا ينتهي لكل احتياجاتكم',
      'طازج كل يوم ومنتجات مختارة بعناية فائقة'
    ],
    ctaTemplates: [
      {
        main: 'تسوقكم معنا يسعدنا ويشرّفنا دائماً 🛒\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'أجود المنتجات الطازجة يومياً لخدمة عائلتك'
      },
      {
        main: 'كيف كانت تجربة تسوقك في {name}؟ ✨\nشاركنا تقييمك على خرائط Google',
        secondary: 'كل ما يلزم بيتك وعائلتك بأفضل جودة وأنسب سعر'
      },
      {
        main: 'نسعد دائماً بخدمتكم وتوفير طلباتكم 🌟\nقيّمنا بـ 5 نجوم على Google Maps',
        secondary: 'تسوق ممتع وتنوع لا ينتهي لكل احتياجاتكم'
      }
    ]
  },
  {
    id: 'car-wash',
    name: 'غسيل وتلميع سيارات وعناية بالمركبات',
    keywords: ['غسيل', 'مغسلة سيارات', 'سيارات', 'تلميع', 'كار كير', 'نانو', 'سيراميك', 'بخار', 'تظليل', 'عازل', 'تنظيف سيارة', 'car wash', 'detailing', 'auto care', 'ceramic'],
    suggestedIcon: 'Car',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['CAR WASH & DETAILING', 'AUTO CARE & NANO CERAMIC', 'PREMIUM STEAM CAR WASH'],
    slogans: [
      'نعتني ببريق سيارتك كأنها سيارتنا',
      'لمعان استثنائي وحماية فائقة تدوم طويلاً',
      'عناية متكاملة تليق بسيارتك وأناقتها',
      'خدمة سريعة ونظافة احترافية بأدق التفاصيل'
    ],
    ctaTemplates: [
      {
        main: 'كيف كانت لمعة ونظافة سيارتك اليوم؟ ✨\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'نعتني ببريق سيارتك كأنها سيارتنا'
      },
      {
        main: 'رأيك يهمنا في نظافة ولمعان سيارتك 🚗\nقيّمنا على خرائط Google',
        secondary: 'لمعان استثنائي وحماية فائقة تدوم طويلاً'
      },
      {
        main: 'سيارتك تستحق العناية الفائقة دائماً 🌟\nشاركنا رأيك بمسحة سريعة',
        secondary: 'عناية متكاملة تليق بسيارتك وأناقتها'
      }
    ]
  },

  // 4. صيانة وميكانيكا وورش سيارات
  {
    id: 'auto-mechanic',
    name: 'صيانة وميكانيكا وورش سيارات وقطع غيار',
    keywords: ['ميكانيكا', 'ورشة سيارات', 'صيانة سيارات', 'فحص كمبيوتر', 'كهرباء سيارات', 'مركز صيانة', 'قطع غيار', 'زيوت', 'إطارات', 'عفشة', 'auto repair', 'service center', 'mechanic'],
    suggestedIcon: 'Wrench',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['ADVANCED AUTO CARE CENTER', 'AUTO REPAIR & DIAGNOSTICS', 'CAR MAINTENANCE SPECIALISTS'],
    slogans: [
      'خبرة وثقة تضمن أمان رحلتك على الطريق',
      'تشخيص دقيق وصيانة معتمدة لراحة بالك',
      'أداء مثالي لسيارتك بأيدي أمهر الفنيين',
      'قطع أصلية وضمان يحمي سيارتك دائماً'
    ],
    ctaTemplates: [
      {
        main: 'ثقتكم وأمانكم غايتنا الأولى 🔧\nامسح الرمز وقيّم جودة الصيانة بـ 5 نجوم ★',
        secondary: 'خبرة وثقة تضمن أمان رحلتك على الطريق'
      },
      {
        main: 'كيف كانت تجربة صيانة سيارتك معنا؟ 🚗\nشاركنا رأيك على Google Maps',
        secondary: 'تشخيص دقيق وصيانة معتمدة لراحة بالك'
      }
    ]
  },

  // 5. مقاهي وكافيهات وقهوة مختصة ومحامص
  {
    id: 'cafe-coffee',
    name: 'مقاهي وكافيهات وقهوة مختصة ومحامص',
    keywords: ['مقهى', 'كافيه', 'كوفي', 'قهوة', 'قهوه', 'مختصة', 'محمصة', 'باريستا', 'لاتيه', 'إسبريسو', 'v60', 'cafe', 'coffee', 'roastery', 'specialty coffee', 'espresso'],
    suggestedIcon: 'Coffee',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['SPECIALTY COFFEE & ROASTERY', 'ARTISAN COFFEE BAR', 'PREMIUM SPECIALTY CAFE'],
    slogans: [
      'فنجان يُصنع بشغف ويبقى في الذاكرة',
      'أجواء دافئة ومحاصيل مختصة تليق بذوقك',
      'بداية يومك تبدأ من رشفة قهوة مثالية',
      'نبتكر في كل قطرة قهوة تجربة فريدة'
    ],
    ctaTemplates: [
      {
        main: 'كيف كانت قهوتك وتجربتك معنا اليوم؟ ☕\nامسح الرمز وقيّمنا بـ 5 نجوم على Google',
        secondary: 'فنجان يُصنع بشغف ويبقى في الذاكرة'
      },
      {
        main: 'صُنعت قهوتك بكل حُب وإتقان ✨\nشاركنا رأيك وانطباعك بمسحة سريعة',
        secondary: 'أجواء دافئة ومحاصيل مختصة تليق بذوقك'
      },
      {
        main: 'يومك الجميل يكتمل برأيك وتقييمك 🌟\nقيّمنا على خرائط Google',
        secondary: 'بداية يومك تبدأ من رشفة قهوة مثالية'
      }
    ]
  },

  // 6. مطاعم ومأكولات ومشويات
  {
    id: 'restaurant-dining',
    name: 'مطاعم ومأكولات ومشويات وشاورما',
    keywords: ['مطعم', 'مأكولات', 'مشاوي', 'مشويات', 'شاورما', 'طعام', 'أكلات', 'شعبي', 'restaurant', 'dining', 'grill', 'kitchen', 'food'],
    suggestedIcon: 'Utensils',
    suggestedTheme: 'burgundy-luxury',
    sampleSubtitles: ['ORIENTAL RESTAURANT & GRILL', 'FINE DINING & CATERING', 'TRADITIONAL & MODERN CUISINE'],
    slogans: [
      'نكهات أصيلة تُطهى بحرفية وكرم الضيافة',
      'أطباق طازجة كل يوم لتسعد حواسك',
      'طعم يجمع الأحباب وذكريات لا تُنسى',
      'سر وصفتنا في جودة المكونات وحُب الطهي'
    ],
    ctaTemplates: [
      {
        main: 'بالهناء والشفاء! كيف كانت نكهة أطباقنا؟ 🍽️\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'نكهات أصيلة تُطهى بحرفية وكرم الضيافة'
      },
      {
        main: 'طعم لا يُنسى وتجربة مميزة ✨\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'أطباق طازجة كل يوم لتسعد حواسك'
      },
      {
        main: 'أهلاً بكم دائماً! تسعدنا زيارتكم 🌟\nامسح الكود وقيّم ضيافتنا',
        secondary: 'طعم يجمع الأحباب وذكريات لا تُنسى'
      }
    ]
  },

  // 7. بيتزا وباستا ومأكولات إيطالية
  {
    id: 'pizza-italian',
    name: 'بيتزا وباستا ومأكولات إيطالية ومعجنات',
    keywords: ['بيتزا', 'باستا', 'إيطالي', 'ايطالي', 'معجنات', 'فرن', 'فطائر', 'pizza', 'pasta', 'italian'],
    suggestedIcon: 'Pizza',
    suggestedTheme: 'burgundy-luxury',
    sampleSubtitles: ['ARTISAN PIZZA & PASTA', 'AUTHENTIC ITALIAN CUISINE', 'WOOD FIRE PIZZA'],
    slogans: [
      'عجينة مخبوزة على الحطب بأصالة إيطالية',
      'قرمشة ونكهات ساحرة من قلب إيطاليا',
      'صوصات طازجة وجبنة غنية في كل قضمة'
    ],
    ctaTemplates: [
      {
        main: 'كيف كانت نكهة البيتزا والباستا اليوم؟ 🍕\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'عجينة مخبوزة على الحطب بأصالة إيطالية'
      },
      {
        main: 'قرمشة وطعم إيطالي أصيل! ✨\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'قرمشة ونكهات ساحرة من قلب إيطاليا'
      }
    ]
  },

  // 8. برجر ووجبات سريعة
  {
    id: 'burger-fastfood',
    name: 'برجر ووجبات سريعة ومقرمشات وساندوتشات',
    keywords: ['برجر', 'فاست فود', 'وجبات سريعة', 'ساندوتش', 'بطاطس', 'كرسبي', 'برغر', 'burger', 'fast food', 'crispy', 'fries'],
    suggestedIcon: 'Burger',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['SMOKE BURGER & CRISPY FRIES', 'ARTISAN BURGER STATION', 'PREMIUM HANDCRAFTED BURGERS'],
    slogans: [
      'طعم الشواء الحقيقي مع صوصاتنا المبتكرة',
      'وجبات طازجة ومقرمشة تُرضي جوعك وشغفك',
      'لحم بلدي طازج 100% يُحضر أمامك بحرفية'
    ],
    ctaTemplates: [
      {
        main: 'طعم البرجر الحقيقي لا يُقاوم! 🍔\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'طعم الشواء الحقيقي مع صوصاتنا المبتكرة'
      },
      {
        main: 'كيف كانت قرمشة وطعم وجبتك اليوم؟ 🍟\nشاركنا تقييمك على خرائط Google',
        secondary: 'وجبات طازجة ومقرمشة تُرضي جوعك وشغفك'
      }
    ]
  },

  // 9. حلويات ومخابز وآيس كريم وشوكولاتة
  {
    id: 'bakery-sweets',
    name: 'حلويات ومخابز وآيس كريم وشوكولاتة',
    keywords: ['حلويات', 'حلى', 'مخبز', 'مخبوزات', 'كيك', 'شوكولاته', 'شوكولاتة', 'آيس كريم', 'ايس كريم', 'دونات', 'سينابون', 'bakery', 'sweets', 'cake', 'pastry', 'dessert', 'ice cream'],
    suggestedIcon: 'Cake',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['FINE PASTRY & SWEETS', 'ARTISAN BAKERY & CAKES', 'PREMIUM CHOCOLATE & DESSERTS'],
    slogans: [
      'حلاوة تُبهج قلبك وتُحلّي أوقاتك السعيدة',
      'مخبوزات طازجة من الفرن يومياً بكل حُب',
      'نصنع من الشوكولاتة والحلويات قطعاً فنية'
    ],
    ctaTemplates: [
      {
        main: 'حلّيت يومك معنا؟ 🍰\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'حلاوة تُبهج قلبك وتُحلّي أوقاتك السعيدة'
      },
      {
        main: 'لحظات حلوة ومذاق يسعد القلب ✨\nقيّمنا على خرائط Google بلمسة واحدة',
        secondary: 'مخبوزات طازجة من الفرن يومياً بكل حُب'
      }
    ]
  },

  // 10. صالونات الحلاقة والعناية بالرجل
  {
    id: 'barber-gents',
    name: 'صالونات الحلاقة والعناية بالرجل',
    keywords: ['صالون رجالي', 'حلاقة', 'حلاق', 'باربر', 'تجميل رجالي', 'قص شعر', 'لحية', 'تصفيف', 'barber', 'salon', 'gents salon', 'grooming'],
    suggestedIcon: 'Scissors',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['PRINCE GENTS SALON & SPA', 'VIP BARBERSHOP & GROOMING', 'ROYAL GENTS CARE'],
    slogans: [
      'إطلالة أنيقة وعناية ملكية تليق بالرجل العصري',
      'حلاقة دقيقة واهتمام بأدق تفاصيل وسامتك',
      'أعلى معايير النظافة والتعقيم لراحتك التامة'
    ],
    ctaTemplates: [
      {
        main: 'نعيماً! كيف كانت إطلالتك اليوم معنا؟ ✂️\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'إطلالة أنيقة وعناية ملكية تليق بالرجل العصري'
      },
      {
        main: 'شاركونا تقييمكم لخدمات الحلاقة 💈\nامسح الرمز على خرائط Google',
        secondary: 'حلاقة دقيقة واهتمام بأدق تفاصيل وسامتك'
      }
    ]
  },

  // 11. صالونات ومشاغل التجميل النسائي
  {
    id: 'ladies-beauty-spa',
    name: 'صالونات ومشاغل التجميل والسبا النسائي',
    keywords: ['صالون نسائي', 'مشغل', 'مكياج', 'ميك اب', 'تجميل نسائي', 'سبا', 'أظافر', 'بديكير', 'تسريحات', 'عناية بالبشرة', 'beauty salon', 'spa', 'women salon', 'nails', 'makeup'],
    suggestedIcon: 'Flower2',
    suggestedTheme: 'emerald-luxury',
    sampleSubtitles: ['LUXURY LADIES SALON & SPA', 'BEAUTY & WELLNESS LOUNGE', 'ROYAL WOMEN CARE & BEAUTY'],
    slogans: [
      'جمالكِ ورقتكِ في أيدٍ خبيرة ومحترفة',
      'عناية راقية تبرز إشراقتكِ وسحركِ الطبيعي',
      'واحتكِ الخاصة للدلال والراحة والجمال المتألق'
    ],
    ctaTemplates: [
      {
        main: 'تألقي بجمالك وإشراقتك الساحرة 🌸\nامسحي الرمز وشاركينا تقييمك بـ 5 نجوم ★',
        secondary: 'جمالكِ ورقتكِ في أيدٍ خبيرة ومحترفة'
      },
      {
        main: 'رأيك يسعدنا ويزيدنا تألقاً وإبداعاً ✨\nشاركينا انطباعك وتجربتك على Google Maps',
        secondary: 'عناية راقية تبرز إشراقتكِ وسحركِ الطبيعي'
      }
    ]
  },

  // 12. عطور ومستحضرات تجميل وبخور
  {
    id: 'perfume-cosmetics',
    name: 'عطور ومستحضرات تجميل وبخور ومسك',
    keywords: ['عطور', 'عطر', 'بخور', 'مسك', 'عود', 'دخون', 'مستحضرات تجميل', 'مكياج', 'perfume', 'fragrance', 'oud', 'musk', 'cosmetics'],
    suggestedIcon: 'Sparkles',
    suggestedTheme: 'emerald-luxury',
    sampleSubtitles: ['ROYAL PERFUMES & OUD', 'LUXURY FRAGRANCE BOUTIQUE', 'DAR AL OUD & PERFUMES'],
    slogans: [
      'عطرٌ يروي حكايتك ويترك أثراً ساحراً لا يُنسى',
      'نفحات تأسر الحواس بأصالة تدوم طويلاً',
      'أفخر خلطات العود والمسك بنقاء ملكي استثنائي'
    ],
    ctaTemplates: [
      {
        main: 'عطّر يومنا برأيك وتقييمك الكريم ✨\nامسح الرمز وشاركنا تجربتك العطرية',
        secondary: 'عطرٌ يروي حكايتك ويترك أثراً ساحراً لا يُنسى'
      },
      {
        main: 'ذوقكم الرفيع مصدر فخرنا الدائم 🌟\nقيّمنا بـ 5 نجوم على Google',
        secondary: 'نفحات تأسر الحواس بأصالة تدوم طويلاً'
      }
    ]
  },

  // 13. طب وتجميل الأسنان
  {
    id: 'dental-clinic',
    name: 'طب وتجميل الأسنان وهوليوود سمايل',
    keywords: ['أسنان', 'اسنان', 'تجميل أسنان', 'تقويم', 'زراعة أسنان', 'هوليوود سمايل', 'ابتسامة', 'طبيب أسنان', 'dental', 'teeth', 'dentist', 'smile'],
    suggestedIcon: 'Tooth',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['HOLLYWOOD SMILE DENTAL CLINIC', 'ADVANCED DENTAL & ORTHODONTIC CENTER', 'DENTAL CARE SPECIALISTS'],
    slogans: [
      'ابتسامتك الواثقة والمشرقة هي سر تميزنا',
      'عناية بأحدث التقنيات لأسنان صحية وناصعة بدون ألم',
      'نمنحك الابتسامة التي طالما حلمت بها بكل ثقة'
    ],
    ctaTemplates: [
      {
        main: 'ابتسامتك الجميلة سر سعادتنا ✨\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'ابتسامتك الواثقة والمشرقة هي سر تميزنا'
      },
      {
        main: 'كيف كانت تجربتك في علاج وتجميل أسنانك؟ 🦷\nقيّمنا على خرائط Google بخطوة سريعة',
        secondary: 'عناية بأحدث التقنيات لأسنان صحية وناصعة بدون ألم'
      }
    ]
  },

  // 14. مجمعات طبية وعيادات ومستشفيات
  {
    id: 'medical-health',
    name: 'مجمعات طبية وعيادات ومستشفيات ومختبرات',
    keywords: ['مجمع طبي', 'عيادة', 'طبي', 'دكتور', 'طبيب', 'مستشفى', 'مركز طبي', 'صيدلية', 'مختبر', 'تحاليل', 'اشعة', 'clinic', 'medical', 'hospital', 'doctor', 'health'],
    suggestedIcon: 'Stethoscope',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['ELITE MEDICAL COMPLEX', 'SPECIALIZED HEALTH CARE CLINIC', 'ADVANCED MEDICAL CENTER'],
    slogans: [
      'رعايتكم الصحية أمانتنا وعافيتكم غايتنا الأولى',
      'كفاءة طبية ورعاية إنسانية تعيد لك ولعائلتك العافية',
      'أحدث التجهيزات الطبية وكوادر استشارية متخصصة'
    ],
    ctaTemplates: [
      {
        main: 'صحتكم وسلامتكم غايتنا الأولى 🩺\nامسح الرمز وقيّم تجربتك الطبية معنا',
        secondary: 'رعايتكم الصحية أمانتنا وعافيتكم غايتنا الأولى'
      },
      {
        main: 'نتمنى لكم دوام الصحة والعافية دائماً 🌿\nشاركنا تقييمك لزيارتك على خرائط Google',
        secondary: 'كفاءة طبية ورعاية إنسانية تعيد لك ولعائلتك العافية'
      }
    ]
  },

  // 15. صيدليات ومستحضرات دوائية
  {
    id: 'pharmacy',
    name: 'صيدليات ومستحضرات دوائية ورعاية صحية',
    keywords: ['صيدلية', 'صيدليه', 'دواء', 'علاج', 'فيتامينات', 'مستلزمات طبية', 'pharmacy', 'drugstore', 'medicine'],
    suggestedIcon: 'Pill',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['COMMUNITY PHARMACY & CARE', 'WELLNESS & HEALTH PHARMACY', 'TRUSTED FAMILY PHARMACY'],
    slogans: [
      'صحتكم أولويتنا وخدمتنا معكم على مدار الساعة',
      'استشارة دوائية موثوقة وعناية صحية متكاملة',
      'صيدليتكم الموثوقة لكل احتياجات الأسرة الصحية'
    ],
    ctaTemplates: [
      {
        main: 'نسعد دائماً برعايتكم وتوفير أدويتكم 💊\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'صحتكم أولويتنا وخدمتنا معكم على مدار الساعة'
      },
      {
        main: 'كيف كانت استشارتك وخدمتنا اليوم؟ 🌿\nشاركنا رأيك على خرائط Google',
        secondary: 'استشارة دوائية موثوقة وعناية صحية متكاملة'
      }
    ]
  },

  // 16. نجارة وأثاث وديكور ومفروشات
  {
    id: 'carpentry-furniture',
    name: 'نجارة وأثاث ومطابخ وديكور ومفروشات',
    keywords: ['نجارة', 'نجار', 'أثاث', 'اثاث', 'موبيليا', 'مطابخ خشب', 'غرف نوم', 'دواليب', 'مفروشات', 'ستائر', 'furniture', 'carpentry', 'wood', 'kitchens'],
    suggestedIcon: 'Wrench',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['FINE WOODWORK & FURNITURE', 'MODERN KITCHENS & BEDROOMS', 'CUSTOM WOOD CRAFT'],
    slogans: [
      'إبداع في نحت الخشب وحرفية يد تدوم لأجيال',
      'أثاث خشبي راقٍ بتفاصيل صُنعت خصيصاً لذوقك',
      'نحوّل الخشب إلى قطع فنية تنبض بالفخامة والدفء'
    ],
    ctaTemplates: [
      {
        main: 'رأيك يهمنا في دقة وجودة تشطيب أعمالنا 🪵\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'إبداع في نحت الخشب وحرفية يد تدوم لأجيال'
      },
      {
        main: 'كيف كانت جودة الأثاث والتسليم؟ ✨\nشاركنا تقييمك على خرائط Google',
        secondary: 'أثاث خشبي راقٍ بتفاصيل صُنعت خصيصاً لذوقك'
      }
    ]
  },

  // 17. نوادي رياضية وجيم ولياقة بدنية
  {
    id: 'fitness-gym',
    name: 'نوادي رياضية وجيم ولياقة بدنية',
    keywords: ['جيم', 'نادي رياضي', 'لياقة', 'فتنس', 'كروس فيت', 'كمال أجسام', 'تمرين', 'حديد', 'gym', 'fitness', 'crossfit', 'workout', 'sports club'],
    suggestedIcon: 'Dumbbell',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['POWER FITNESS CLUB & GYM', 'CROSSFIT & BODYBUILDING ARENA', 'ELITE HEALTH & FITNESS'],
    slogans: [
      'قوتك وصحتك تبدأ هنا.. واصل تحدي أهدافك',
      'مدربون محترفون وبيئة تحفيزية لأفضل نسخة منك',
      'أسلوب حياة صحي ولياقة تدوم مع أفضل التجهيزات'
    ],
    ctaTemplates: [
      {
        main: 'طاقتكم وإنجازكم هو دافعنا الدائم! 🏋️\nامسح الرمز وقيّم تجربتك الرياضية معنا',
        secondary: 'قوتك وصحتك تبدأ هنا.. واصل تحدي أهدافك'
      },
      {
        main: 'كيف كان تمرينك وأجواء النادي اليوم؟ 🔥\nشاركنا رأيك بـ 5 نجوم على خرائط Google',
        secondary: 'مدربون محترفون وبيئة تحفيزية لأفضل نسخة منك'
      }
    ]
  },

  // 18. محلات الزهور والهدايا
  {
    id: 'flowers-gifts',
    name: 'محلات الزهور والهدايا وتنسيق الحفلات',
    keywords: ['ورد', 'زهور', 'هدايا', 'تغليف هدايا', 'تنسيق ورد', 'بوكيه', 'حفلات', 'flowers', 'gifts', 'florist', 'bouquets'],
    suggestedIcon: 'Flower2',
    suggestedTheme: 'emerald-luxury',
    sampleSubtitles: ['LUXURY FLOWERS & GIFTS', 'CREATIVE FLORAL BOUTIQUE', 'ELEGANT GIFTS & ARRANGEMENTS'],
    slogans: [
      'نصيغ مشاعرك بأجمل باقات الورد والهدايا الأنيقة',
      'لكل مناسبة حكاية نرويها بلمسة ورد ساحرة',
      'زهور طبيعية منتقاة بعناية لتبهج من تحب'
    ],
    ctaTemplates: [
      {
        main: 'نسعد بمشاركتكم لأجمل مناسباتكم 🌸\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'نصيغ مشاعرك بأجمل باقات الورد والهدايا الأنيقة'
      },
      {
        main: 'كيف كانت لمسة باقتنا وهديتنا اليوم؟ ✨\nشاركنا تقييمك على خرائط Google',
        secondary: 'لكل مناسبة حكاية نرويها بلمسة ورد ساحرة'
      }
    ]
  },

  // 19. مغاسل ملابس ودراي كلين
  {
    id: 'laundry-dryclean',
    name: 'مغاسل ملابس ودراي كلين وعناية بالأقمشة',
    keywords: ['مغسلة ملابس', 'دراي كلين', 'غسيل وكوي', 'بخار', 'سجاد', 'مفارش', 'laundry', 'dry clean', 'steam wash'],
    suggestedIcon: 'Shirt',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['WHITE GLOW DRY CLEANING & STEAM', 'PREMIUM LAUNDRY & FABRIC CARE', 'EXPRESS DRY CLEANING'],
    slogans: [
      'نظافة ناصعة وتعقيم فائق يعيد لملابسك رونقها',
      'عناية خاصة بأدق الأقمشة بأحدث تقنيات البخار',
      'التزام بالمواعيد وجودة تحافظ على أناقتك دائماً'
    ],
    ctaTemplates: [
      {
        main: 'نظافة فائقة وعناية تدوم بأناقتك ✨\nامسح الرمز وقيّم جودة الغسيل والكوي',
        secondary: 'نظافة ناصعة وتعقيم فائق يعيد لملابسك رونقها'
      },
      {
        main: 'ملابسك في أيدٍ أمينة وخبيرة 👔\nشاركنا تقييمك بـ 5 نجوم على Google',
        secondary: 'عناية خاصة بأدق الأقمشة بأحدث تقنيات البخار'
      }
    ]
  },

  // 20. صيانة هواتف وحاسبات وأجهزة إلكترونية
  {
    id: 'tech-repair-gadgets',
    name: 'صيانة جوالات وحاسبات وإلكترونيات',
    keywords: ['صيانة جوالات', 'صيانة لابتوب', 'حاسبات', 'كمبيوتر', 'إلكترونيات', 'ايفون', 'أجهزة ذكية', 'tech repair', 'computer', 'smartphone', 'electronics'],
    suggestedIcon: 'Laptop',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['TECH MASTER COMPUTER & SMARTPHONE', 'SMARTPHONE REPAIR & GADGETS', 'ADVANCED ELECTRONICS SERVICE'],
    slogans: [
      'سرعة ودقة في الصيانة وقطع أصلية بضمان معتمد',
      'أجهزتك في أمان وبأيدي أمهر الفنيين المتخصصين',
      'حلول تقنية فورية تحافظ على خصوصيتك وبياناتك'
    ],
    ctaTemplates: [
      {
        main: 'سرعة ودقة في الصيانة والقطع الأصلية 💻\nامسح الرمز وقيّم خدمتنا بـ 5 نجوم ★',
        secondary: 'سرعة ودقة في الصيانة وقطع أصلية بضمان معتمد'
      },
      {
        main: 'جهازك عاد كالجديد تماماً! 📱\nشاركنا رأيك وتقييمك على Google Maps',
        secondary: 'أجهزتك في أمان وبأيدي أمهر الفنيين المتخصصين'
      }
    ]
  },

  // 21. عام
  {
    id: 'general-business',
    name: 'خدمات وأنشطة تجارية عامة',
    keywords: ['خدمات', 'متجر', 'محل', 'شركة', 'مؤسسة', 'تسوق', 'مكتب', 'business', 'store', 'shop', 'services', 'company'],
    suggestedIcon: 'Sparkles',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['PREMIUM SERVICES & PRODUCTS', 'EXCELLENCE & INTEGRITY', 'YOUR TRUSTED BUSINESS PARTNER'],
    slogans: [
      'نسعد دائماً بخدمتكم وتوفير تجربة استثنائية ترقى لتطلعاتكم',
      'ثقتكم بنا هي رأس مالنا ونسعى للتطور المستمر معكم',
      'جودة تستحقونها وخدمة تليق بحضرتكم دائماً',
      'شكراً لثقتكم واختياركم لنا شريكاً لنجاحكم'
    ],
    ctaTemplates: [
      {
        main: 'رأيكم يهمنا ويصنع فارقنا 🌟\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'نسعد دائماً بخدمتكم وتوفير تجربة استثنائية ترقى لتطلعاتكم'
      },
      {
        main: 'كيف كانت تجربتك معنا اليوم؟ ✨\nساعدنا بتقييم خدماتنا على خرائط Google',
        secondary: 'ثقتكم بنا هي رأس مالنا ونسعى للتطور المستمر معكم'
      },
      {
        main: 'كن شريكاً في قصة نجاحنا 🤝\nامسح الكود واترك انطباعك الكريم',
        secondary: 'جودة تستحقونها وخدمة تليق بحضرتكم دائماً'
      }
    ]
  }
];

export interface SmartGeneratedTexts {
  detectedCategory: BusinessCategoryInfo;
  confidenceScore: number;
  extractedCleanName: string;
  suggestedMainTexts: string[];
  suggestedSecondaryTexts: string[];
  suggestedSubtitles: string[];
  suggestedIcon: string;
  suggestedTheme: string;
}

/**
 * Normalizes Arabic text for flexible matching (removes tashkeel, standardizes alef, taa marbouta, etc.)
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove harakat
    .replace(/[إأآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ي/g, 'ى')
    .replace(/[^\w\s\u0600-\u06FF]/gi, ' ')
    .trim();
}

/**
 * Cleans the business name by removing common generic prefixes if needed for natural phrase insertion
 */
export function extractCleanBusinessName(rawName: string): string {
  const trimmed = (rawName || '').trim();
  if (!trimmed) return 'نشاطنا التجاري';
  return trimmed;
}

/**
 * Predicts the business category and generates intelligent, balanced and personalized texts
 */
export function generateSmartContextualTexts(
  businessName: string,
  categoryInput: string = ''
): SmartGeneratedTexts {
  const combinedText = `${businessName || ''} ${categoryInput || ''}`.trim();
  const normalizedSearch = normalizeArabicText(combinedText);
  const cleanName = extractCleanBusinessName(businessName);

  let bestMatch: BusinessCategoryInfo = BUSINESS_CATEGORIES[BUSINESS_CATEGORIES.length - 1]; // default general
  let maxScore = 0;

  for (const cat of BUSINESS_CATEGORIES) {
    let score = 0;
    for (const keyword of cat.keywords) {
      const normalizedKeyword = normalizeArabicText(keyword);
      if (normalizedSearch.includes(normalizedKeyword)) {
        score += keyword.length >= 4 ? 3 : 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = cat;
    }
  }

  // 1. Balanced, Creative & Diverse Main CTAs (Short, Punchy, Warm, Direct, Inspiring)
  const suggestedMainTexts: string[] = [];

  // Option 1: Category Specific Core
  if (bestMatch.ctaTemplates[0]) {
    suggestedMainTexts.push(bestMatch.ctaTemplates[0].main.replace(/\{name\}/g, cleanName));
  }

  // Option 2: Short & Catchy
  suggestedMainTexts.push(`رأيك يهمنا ويصنع يومنا 🌟\nقيّمنا بـ 5 نجوم على خرائط Google`);

  // Option 3: Category Specific Warm
  if (bestMatch.ctaTemplates[1]) {
    suggestedMainTexts.push(bestMatch.ctaTemplates[1].main.replace(/\{name\}/g, cleanName));
  } else {
    suggestedMainTexts.push(`نسعد بابتسامتك وخدمتك ✨\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★`);
  }

  // Option 4: Direct Action & Minimal
  suggestedMainTexts.push(`شاركنا رأيك بـ 5 نجوم ★\nبخطوة واحدة عبر كاميرا هاتفك`);

  // Option 5: Community & Partnership
  suggestedMainTexts.push(`كن شريكاً في نجاحنا 🤝\nتقييمك يدعمنا لتقديم الأفضل دائماً`);

  // Option 6: Friendly question
  suggestedMainTexts.push(`كيف كانت تجربتك في ${cleanName}؟ 💫\nامسح الكود وقيّمنا على الخريطة`);

  // 2. Domain-tailored Slogans & Taglines for the Secondary Text
  const suggestedSecondaryTexts: string[] = [];
  if (bestMatch.slogans && bestMatch.slogans.length > 0) {
    suggestedSecondaryTexts.push(...bestMatch.slogans);
  }
  // Add common reassuring slogans if list is short
  if (suggestedSecondaryTexts.length < 4) {
    suggestedSecondaryTexts.push(
      `نسعى دائماً لتقديم أقصى درجات الجودة والتميز لعملائنا الكرام`,
      `شكراً لثقتكم واختياركم لنا دائماً`
    );
  }

  // 3. English Subtitles (Clean & properly styled without repetitive words)
  const englishOnlyName = cleanName.replace(/[^a-zA-Z0-9\s]/g, '').trim().toUpperCase();
  const suggestedSubtitles = bestMatch.sampleSubtitles.map((sub) => {
    const cleanSub = sub.replace(/\b(PREMIUM|QUALITY|LUXURY|VIP)\s+\1\b/gi, '$1').trim();
    if (englishOnlyName.length > 2 && !cleanSub.startsWith(englishOnlyName)) {
      return `${englishOnlyName} • ${cleanSub}`;
    }
    return cleanSub;
  });

  return {
    detectedCategory: bestMatch,
    confidenceScore: maxScore,
    extractedCleanName: cleanName,
    suggestedMainTexts: Array.from(new Set(suggestedMainTexts)).slice(0, 6),
    suggestedSecondaryTexts: Array.from(new Set(suggestedSecondaryTexts)).slice(0, 6),
    suggestedSubtitles: Array.from(new Set(suggestedSubtitles)),
    suggestedIcon: bestMatch.suggestedIcon,
    suggestedTheme: bestMatch.suggestedTheme
  };
}
