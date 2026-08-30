import { PosterConfig, FontChoice, PosterFormat } from '../types';

export interface BusinessCategoryInfo {
  id: string;
  name: string;
  keywords: string[];
  suggestedIcon: string;
  suggestedTheme: string;
  sampleSubtitles: string[];
  ctaTemplates: {
    main: string;
    secondary: string;
  }[];
}

export const BUSINESS_CATEGORIES: BusinessCategoryInfo[] = [
  {
    id: 'car-wash',
    name: 'غسيل وتلميع سيارات وعناية بالمركبات',
    keywords: ['غسيل', 'مغسلة', 'سيارات', 'تلميع', 'كار كير', 'نانو', 'سيراميك', 'بخار', 'تظليل', 'عازل', 'تنظيف سيارة', 'car wash', 'detailing', 'auto care', 'ceramic'],
    suggestedIcon: 'Car',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['CAR WASH & DETAILING', 'AUTO CARE & NANO CERAMIC', 'PREMIUM STEAM CAR WASH', 'EXPRESS CAR WASH'],
    ctaTemplates: [
      {
        main: 'كيف كانت لمعة ونظافة سيارتك اليوم في {name}؟ ✨\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'رأيك يهمنا دائماً لنحافظ على بريق ولمعان سيارتك بأعلى جودة'
      },
      {
        main: 'سيارتك تستحق العناية الفائقة دائماً 🚗\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'نسعى دائماً لتقديم أقصى درجات النظافة والبريق الاستثنائي'
      },
      {
        main: 'لأن لمعة سيارتك شغفنا في {name} 🌟\nامسح الكود واترك تقييمك الكريم',
        secondary: 'خدمة احترافية تليق بسيارتك وبثقتكم الغالية'
      },
      {
        main: 'شاركنا انطباعك عن خدمة الغسيل والتلميع\nبمسحة سريعة لرمز الـ QR',
        secondary: 'فريقنا يسعد دائماً برضاكم ونسعى للأفضل معكم'
      }
    ]
  },
  {
    id: 'auto-mechanic',
    name: 'صيانة وميكانيكا وورش سيارات',
    keywords: ['ميكانيكا', 'ورشة', 'صيانة سيارات', 'فحص كمبيوتر', 'كهرباء سيارات', 'مركز صيانة', 'قطع غيار', 'زيوت', 'إطارات', 'بنشر', 'auto repair', 'service center', 'mechanic'],
    suggestedIcon: 'Wrench',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['ADVANCED AUTO CARE CENTER', 'AUTO REPAIR & DIAGNOSTICS', 'CAR MAINTENANCE SPECIALISTS'],
    ctaTemplates: [
      {
        main: 'ثقتكم وأمان سيارتكم غايتنا في {name} 🔧\nامسح الرمز وقيّم جودة الصيانة بـ 5 نجوم ★',
        secondary: 'نعتز بثقتكم ونضمن لكم صيانة دقيقة وقطع أصلية معتمدة'
      },
      {
        main: 'كيف كانت تجربة صيانة سيارتك معنا اليوم؟\nامسح الكود وشاركنا رأيك على Google Maps',
        secondary: 'رأيك يساعدنا في الحفاظ على أعلى معايير الجودة والأمان'
      },
      {
        main: 'خدمة صيانة معتمدة لراحتكم وأمانكم 🚗\nقيّمنا على خرائط جوجل بخطوة واحدة',
        secondary: 'فريق فني متخصص لخدمتكم بأسرع وقت وأفضل الأسعار'
      }
    ]
  },
  {
    id: 'cafe-coffee',
    name: 'مقاهي وكافيهات وقهوة مختصة ومحامص',
    keywords: ['مقهى', 'كافيه', 'كوفي', 'قهوة', 'قهوه', 'مختصة', 'محمصة', 'باريستا', 'لاتيه', 'إسبريسو', 'v60', 'cafe', 'coffee', 'roastery', 'specialty coffee', 'espresso'],
    suggestedIcon: 'Coffee',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['SPECIALTY COFFEE & ROASTERY', 'ARTISAN COFFEE BAR', 'PREMIUM SPECIALTY CAFE'],
    ctaTemplates: [
      {
        main: 'كيف كانت قهوتك وتجربتك اليوم في {name}؟ ☕\nامسح الرمز وقيّمنا بـ 5 نجوم على Google',
        secondary: 'يسعدنا دائماً استقبال رأيك ومشاركتك لأجوائنا المميزة'
      },
      {
        main: 'صُنعت قهوتك بكل حُب وإتقان ✨\nشاركنا رأيك وانطباعك بمسحة سريعة',
        secondary: 'محاصيل مختصة وتجربة استثنائية لكل عشاق القهوة'
      },
      {
        main: 'يومك الجميل يكتمل برأيك وتقييمك 🌟\nامسح الرمز واترك 5 نجوم في خرائط جوجل',
        secondary: 'نسعى دائماً لتقديم أشهى المشروبات وأرقى الجلسات'
      },
      {
        main: 'تجربة قهوة لا تُنسى في {name} ☕\nقيّمنا وكن جزءاً من عائلتنا',
        secondary: 'رأيكم يصنع فارقنا ويلهم باريستاتنا للإبداع اليومي'
      }
    ]
  },
  {
    id: 'restaurant-dining',
    name: 'مطاعم ومأكولات ومشويات',
    keywords: ['مطعم', 'مأكولات', 'مشاوي', 'مشويات', 'شاورما', 'طعام', 'أكلات', 'شعبي', 'restaurant', 'dining', 'grill', 'kitchen', 'food'],
    suggestedIcon: 'Utensils',
    suggestedTheme: 'burgundy-luxury',
    sampleSubtitles: ['ORIENTAL RESTAURANT & GRILL', 'FINE DINING & CATERING', 'TRADITIONAL & MODERN CUISINE'],
    ctaTemplates: [
      {
        main: 'بالهناء والشفاء! كيف كانت نكهة أطباقنا في {name}؟ 🍽️\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'نعتز بخدمتكم ونطهو أشهى الوصفات الطازجة يومياً بحب وإتقان'
      },
      {
        main: 'طعم لا يُنسى وتجربة مميزة ✨\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'تقييمك يسعد فريق الطهاة والخدمة ويحفزنا للأفضل دائماً'
      },
      {
        main: 'أهلاً بكم دائماً في {name}! 🌟\nامسح الكود واترك انطباعك الكريم',
        secondary: 'أجود المكونات الطازجة وخدمة راقية تليق بحضرتكم'
      }
    ]
  },
  {
    id: 'pizza-italian',
    name: 'بيتزا وباستا ومأكولات إيطالية',
    keywords: ['بيتزا', 'باستا', 'إيطالي', 'ايطالي', 'معجنات', 'فرن', 'pizza', 'pasta', 'italian'],
    suggestedIcon: 'Pizza',
    suggestedTheme: 'burgundy-luxury',
    sampleSubtitles: ['ARTISAN PIZZA & PASTA', 'AUTHENTIC ITALIAN CUISINE', 'WOOD FIRE PIZZA'],
    ctaTemplates: [
      {
        main: 'كيف كانت نكهة البيتزا والباستا اليوم في {name}؟ 🍕\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'عجينة مخمرة طبيعياً ومخبوزة على الحطب بأصالة إيطالية'
      },
      {
        main: 'قرمشة وطعم إيطالي أصيل! ✨\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'نسعد دائماً بمشاركتك لتجربة الطعام الفريدة معنا'
      }
    ]
  },
  {
    id: 'burger-fastfood',
    name: 'برجر ووجبات سريعة ومقرمشات',
    keywords: ['برجر', 'فاست فود', 'وجبات سريعة', 'ساندوتش', 'بطاطس', 'كرسبي', 'burger', 'fast food', 'crispy', 'fries'],
    suggestedIcon: 'Burger',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['SMOKE BURGER & CRISPY FRIES', 'ARTISAN BURGER STATION', 'PREMIUM HANDCRAFTED BURGERS'],
    ctaTemplates: [
      {
        main: 'طعم البرجر الحقيقي لا يُقاوم! 🍔\nامسح الرمز وقيّمنا بـ 5 نجوم في {name}',
        secondary: 'لحوم طازجة 100% يومياً وصوصاتنا الخاصة المبتكرة'
      },
      {
        main: 'كيف كان قرمشة وطعم وجبتك اليوم؟ 🍟\nشاركنا تقييمك على خرائط Google',
        secondary: 'نعدكم بألذ تجربة برجر ترضي شغفكم دائماً'
      }
    ]
  },
  {
    id: 'bakery-sweets',
    name: 'حلويات ومخابز وآيس كريم وشوكولاتة',
    keywords: ['حلويات', 'حلى', 'مخبز', 'مخبوزات', 'كيك', 'شوكولاته', 'شوكولاتة', 'آيس كريم', 'ايس كريم', 'دونات', 'bakery', 'sweets', 'cake', 'pastry', 'dessert', 'ice cream'],
    suggestedIcon: 'Cake',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['FINE PASTRY & SWEETS', 'ARTISAN BAKERY & CAKES', 'PREMIUM CHOCOLATE & DESSERTS'],
    ctaTemplates: [
      {
        main: 'حليت يومك معنا في {name}؟ 🍰\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'أشهى الحلويات والمخبوزات الطازجة المصنوعة بأرقى المكونات'
      },
      {
        main: 'لحظات حلوة ومذاق يسعد القلب ✨\nقيّمنا على خرائط Google بلمسة واحدة',
        secondary: 'نتشرف دائماً بمشاركتكم لأفراحكم ومناسباتكم السعيدة'
      }
    ]
  },
  {
    id: 'medical-health',
    name: 'مجمعات طبية وعيادات ومستشفيات ومختبرات',
    keywords: ['مجمع طبي', 'عيادة', 'طبي', 'دكتور', 'طبيب', 'مستشفى', 'مركز طبي', 'صيدلية', 'مختبر', 'تحاليل', 'clinic', 'medical', 'hospital', 'doctor', 'pharma', 'health'],
    suggestedIcon: 'Stethoscope',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['ELITE MEDICAL COMPLEX', 'SPECIALIZED HEALTH CARE CLINIC', 'ADVANCED MEDICAL CENTER'],
    ctaTemplates: [
      {
        main: 'صحتكم ورضاكم غايتنا الأولى في {name} 🩺\nامسح الرمز وقيّم تجربتك الطبية معنا',
        secondary: 'رأيكم يهمنا لتحسين جودة الرعاية والخدمات الطبية باستمرار'
      },
      {
        main: 'نتمنى لكم دوام الصحة والعافية دائماً 🌿\nشاركنا تقييمك لزيارتك على خرائط Google',
        secondary: 'نخبة من الأطباء الاستشاريين وأحدث الأجهزة الطبية لرعايتكم'
      },
      {
        main: 'كيف كانت جودة الخدمة والرعاية اليوم؟\nامسح الكود واترك تقييمك بـ 5 نجوم ★',
        secondary: 'نلتزم بأعلى معايير السلامة والجودة والتعقيم الطبي'
      }
    ]
  },
  {
    id: 'dental-clinic',
    name: 'طب وتجميل الأسنان وهوليوود سمايل',
    keywords: ['أسنان', 'اسنان', 'تجميل أسنان', 'تقويم', 'زراعة أسنان', 'هوليوود سمايل', 'ابتسامة', 'dental', 'teeth', 'dentist', 'smile'],
    suggestedIcon: 'Tooth',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['HOLLYWOOD SMILE DENTAL CLINIC', 'ADVANCED DENTAL & ORTHODONTIC CENTER', 'DENTAL CARE SPECIALISTS'],
    ctaTemplates: [
      {
        main: 'ابتسامتك الجميلة سر سعادتنا في {name} ✨\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'أحدث تقنيات طب وتجميل الأسنان بدون ألم وبأعلى معايير الجودة'
      },
      {
        main: 'كيف كانت زيارتك وتجربة علاج أسنانك اليوم؟ 🦷\nقيّمنا على خرائط Google بخطوة سريعة',
        secondary: 'نعتني بابتسامتكم ونمنحكم الثقة والإشراقة التي تستحقونها'
      }
    ]
  },
  {
    id: 'barber-gents',
    name: 'صالونات الحلاقة والعناية بالرجل',
    keywords: ['صالون رجالي', 'حلاقة', 'حلاق', 'باربر', 'تجميل رجالي', 'قص شعر', 'لحية', 'barber', 'salon', 'gents salon', 'grooming'],
    suggestedIcon: 'Scissors',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['PRINCE GENTS SALON & SPA', 'VIP BARBERSHOP & GROOMING', 'ROYAL GENTS CARE'],
    ctaTemplates: [
      {
        main: 'نعيماً! كيف كانت إطلالتك اليوم في {name}؟ ✂️\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
        secondary: 'إطلالتكم المميزة وأناقتكم هي شغفنا وفخرنا الدائم'
      },
      {
        main: 'شاركونا تقييمكم لخدمات العناية والحلاقة 💈\nامسح الرمز على خرائط Google',
        secondary: 'أحدث صيحات القص والتعقيم الطبي لراحتكم وأناقتكم'
      }
    ]
  },
  {
    id: 'ladies-beauty-spa',
    name: 'صالونات ومشاغل التجميل والسبا النسائي',
    keywords: ['صالون نسائي', 'مشغل', 'مكياج', 'ميك اب', 'تجميل نسائي', 'سبا', 'أظافر', 'بديكير', 'تسريحات', 'عناية بالبشرة', 'beauty salon', 'spa', 'women salon', 'nails', 'makeup'],
    suggestedIcon: 'Flower2',
    suggestedTheme: 'emerald-luxury',
    sampleSubtitles: ['LUXURY LADIES SALON & SPA', 'BEAUTY & WELLNESS LOUNGE', 'ROYAL WOMEN CARE & BEAUTY'],
    ctaTemplates: [
      {
        main: 'تألقي بجمالك وإشراقتك في {name} 🌸\nامسحي الرمز وشاركينا تقييمك بـ 5 نجوم ★',
        secondary: 'نسعى دائماً لتقديم أقصى درجات الدلال والعناية الملكية لجمالك'
      },
      {
        main: 'رأيك يسعدنا ويزيدنا تألقاً وإبداعاً ✨\nشاركينا انطباعك وتجربتك على خرائط Google',
        secondary: 'خبراء تجميل وعناية بالبشرة والشعر بأرقى الماركات العالمية'
      }
    ]
  },
  {
    id: 'perfume-cosmetics',
    name: 'عطور ومستحضرات تجميل وبخور',
    keywords: ['عطور', 'عطر', 'بخور', 'مسك', 'عود', 'دخون', 'مستحضرات تجميل', 'perfume', 'fragrance', 'oud', 'musk', 'cosmetics'],
    suggestedIcon: 'Sparkles',
    suggestedTheme: 'emerald-luxury',
    sampleSubtitles: ['ROYAL PERFUMES & OUD', 'LUXURY FRAGRANCE BOUTIQUE', 'DAR AL OUD & PERFUMES'],
    ctaTemplates: [
      {
        main: 'عطّر يومنا برأيك وتقييمك في {name} ✨\nامسح الرمز وشاركنا تجربتك العطرية',
        secondary: 'فخامة الرائحة وأصالة المكونات الملكية تدوم طويلاً'
      },
      {
        main: 'ثقتكم وذوقكم الرفيع مصدر فخرنا 🌟\nامسح الكود وقيّمنا بـ 5 نجوم على Google',
        secondary: 'نبتكر أزكى الروائح والخلطات الشرقية والغربية الفاخرة'
      }
    ]
  },
  {
    id: 'jewelry-gold',
    name: 'ذهب ومجوهرات وألماس وساعات فاخرة',
    keywords: ['ذهب', 'مجوهرات', 'ألماس', 'الماس', 'فضة', 'ساعات', 'مجوهرات فاخرة', 'gold', 'jewelry', 'diamond', 'watches', 'silver'],
    suggestedIcon: 'Gem',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['ROYAL GOLD & LUXURY JEWELRY', 'FINE DIAMOND & JEWELRY BOUTIQUE', 'PREMIUM WATCHES & GOLD'],
    ctaTemplates: [
      {
        main: 'بريق الفخامة يكتمل برأيكم الكريم في {name} 💎\nامسح الرمز لتقييم زيارتكم بـ 5 نجوم ★',
        secondary: 'تصاميم استثنائية ونقاء أصيل يليق بذوقكم الرفيع'
      },
      {
        main: 'نسعد دائماً باختياركم وتوثيق أجمل لحظاتكم ✨\nشاركنا رأيك وانطباعك على خرائط Google',
        secondary: 'أرقى قطع الذهب والمجوهرات الملكية المعتمدة'
      }
    ]
  },
  {
    id: 'fitness-gym',
    name: 'نوادي رياضية وجيم ولياقة بدنية',
    keywords: ['جيم', 'نادي رياضي', 'لياقة', 'فتنس', 'كروس فيت', 'كمال أجسام', 'تمرين', 'حديد', 'gym', 'fitness', 'crossfit', 'workout', 'sports club'],
    suggestedIcon: 'Dumbbell',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['POWER FITNESS CLUB & GYM', 'CROSSFIT & BODYBUILDING ARENA', 'ELITE HEALTH & FITNESS'],
    ctaTemplates: [
      {
        main: 'طاقتكم وإنجازكم هو دافعنا في {name}! 🏋️\nامسح الرمز وقيّم تجربتك الرياضية معنا',
        secondary: 'نساعدك لبناء أسلوب حياة رياضي متكامل بأحدث الأجهزة والمدربين'
      },
      {
        main: 'كيف كان تمرينك وأجواء النادي اليوم؟ 🔥\nشاركنا رأيك بـ 5 نجوم على خرائط Google',
        secondary: 'بيئة تدريب محفزة وبرامج لياقة مخصصة لتحقيق أهدافك'
      }
    ]
  },
  {
    id: 'real-estate-contracting',
    name: 'عقارات ومقاولات وتطوير عقاري وتصميم داخلي',
    keywords: ['عقارات', 'عقار', 'مقاولات', 'تطوير عقاري', 'وساطة', 'مكتب عقاري', 'فلل', 'شقق', 'ديكور', 'تصميم داخلي', 'تشطيب', 'real estate', 'properties', 'contracting', 'interior design'],
    suggestedIcon: 'Building2',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['SARH REAL ESTATE INVESTMENT', 'MODERN CONTRACTING & INTERIOR', 'PREMIUM PROPERTY DEVELOPMENT'],
    ctaTemplates: [
      {
        main: 'ثقتكم ركيزتنا الأولى في {name} 🏢\nامسح الرمز لتقييم مستشارينا وخدمتنا',
        secondary: 'نبتكر حلولاً عقارية وهندسية متميزة تلبي تطلعاتكم المستقبلية'
      },
      {
        main: 'شراكة وثقة مستدامة لبناء المستقبل ✨\nقيّمنا على خرائط Google بـ 5 نجوم',
        secondary: 'التزام بالمواعيد وجودة تشطيب تفوق التوقعات'
      }
    ]
  },
  {
    id: 'travel-tourism-hotels',
    name: 'سياحة وسفر وحجوزات وفنادق وشاليهات',
    keywords: ['سياحة', 'سفر', 'حجوزات', 'طيران', 'فندق', 'فنادق', 'شاليهات', 'منتجع', 'رحلات', 'travel', 'tourism', 'hotel', 'resort', 'flight', 'booking'],
    suggestedIcon: 'Plane',
    suggestedTheme: 'royal-navy',
    sampleSubtitles: ['WORLD HORIZON TRAVEL & TOURISM', 'LUXURY HOTEL & RESORTS', 'VIP TRAVEL & FLIGHT BOOKING'],
    ctaTemplates: [
      {
        main: 'رحلتكم المميزة تبدأ معنا في {name} ✈️\nامسح الرمز وقيّم تجربة حجزك وإقامتك',
        secondary: 'نصنع لكم ذكريات سياحية وضيافة استثنائية لا تُنسى'
      },
      {
        main: 'إقامة سعيدة وتجربة ممتعة 🌟\nشاركنا تقييمك على خرائط Google بـ 5 نجوم',
        secondary: 'أرقى مستويات الضيافة والراحة لخدمتكم على مدار الساعة'
      }
    ]
  },
  {
    id: 'photography-media',
    name: 'استوديوهات تصوير وتوثيق مناسبات وإنتاج إعلامي',
    keywords: ['استوديو', 'تصوير', 'مصور', 'فوتوغراف', 'مناسبات', 'فيديو', 'مونتاج', 'زواجات', 'photo studio', 'photography', 'production', 'media'],
    suggestedIcon: 'Camera',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['GOLDEN LENS PHOTO STUDIO', 'CINEMATIC EVENTS & PHOTOGRAPHY', 'CREATIVE MEDIA PRODUCTION'],
    ctaTemplates: [
      {
        main: 'نوثّق أجمل لحظاتكم باحتراف في {name} 📸\nامسح الرمز وقيّم تجربتك معنا بـ 5 نجوم ★',
        secondary: 'جلسات تصوير سينمائية ولقطات توثق ذكرياتكم بأرقى جودة'
      },
      {
        main: 'سعادتكم بذكرياتكم هي نجاحنا ✨\nشاركنا رأيك وتقييمك على خرائط Google',
        secondary: 'إبداع فني وتقنيات إضاءة متطورة لكل مناسباتكم'
      }
    ]
  },
  {
    id: 'laundry-dryclean',
    name: 'مغاسل ملابس ودراي كلين وعناية بالأقمشة',
    keywords: ['مغسلة ملابس', 'دراي كلين', 'غسيل وكوي', 'بخار', 'سجاد', 'مفارش', 'laundry', 'dry clean', 'steam wash'],
    suggestedIcon: 'Shirt',
    suggestedTheme: 'modern-white',
    sampleSubtitles: ['WHITE GLOW DRY CLEANING & STEAM', 'PREMIUM LAUNDRY & FABRIC CARE', 'EXPRESS DRY CLEANING'],
    ctaTemplates: [
      {
        main: 'نظافة فائقة وعناية تدوم بأناقتك في {name} ✨\nامسح الرمز وقيّم جودة الغسيل والكوي',
        secondary: 'غسيل وكوي بالبخار بأحدث الأجهزة لحماية أنسجة ملابسك'
      },
      {
        main: 'ملابسك في أيدٍ أمينة وخبيرة 👔\nشاركنا تقييمك بـ 5 نجوم على خرائط Google',
        secondary: 'نلتزم بالسرعة والدقة والتعقيم الشامل لجميع الأقمشة'
      }
    ]
  },
  {
    id: 'tech-repair-gadgets',
    name: 'صيانة هواتف وحاسبات وأجهزة إلكترونية',
    keywords: ['صيانة جوالات', 'صيانة لابتوب', 'حاسبات', 'كمبيوتر', 'إلكترونيات', 'ايفون', 'أجهزة ذكية', 'tech repair', 'computer', 'smartphone', 'electronics'],
    suggestedIcon: 'Laptop',
    suggestedTheme: 'luxury-dark',
    sampleSubtitles: ['TECH MASTER COMPUTER & SMARTPHONE', 'SMARTPHONE REPAIR & GADGETS', 'ADVANCED ELECTRONICS SERVICE'],
    ctaTemplates: [
      {
        main: 'سرعة ودقة في الصيانة والقطع الأصلية 💻\nامسح الرمز وقيّم خدمتنا في {name}',
        secondary: 'ضمان معتمد وصيانة فورية لجميع أجهزتك الذكية بأيدي خبراء'
      },
      {
        main: 'جهازك عاد كالجديد تماماً! 📱\nشاركنا رأيك وتقييمك بـ 5 نجوم على Google Maps',
        secondary: 'نحرص على بياناتك ونستخدم أجود قطع الغيار المعتمدة'
      }
    ]
  },
  {
    id: 'general-business',
    name: 'خدمات وأنشطة تجارية عامة',
    keywords: ['خدمات', 'متجر', 'محل', 'شركة', 'مؤسسة', 'تسوق', 'مكتب', 'business', 'store', 'shop', 'services', 'company'],
    suggestedIcon: 'Sparkles',
    suggestedTheme: 'classic-paper',
    sampleSubtitles: ['PREMIUM SERVICES & PRODUCTS', 'EXCELLENCE & INTEGRITY', 'YOUR TRUSTED BUSINESS PARTNER'],
    ctaTemplates: [
      {
        main: 'رأيكم يهمنا ويصنع فارقنا في {name} 🌟\nامسح الرمز وشاركنا تقييمك بـ 5 نجوم ★',
        secondary: 'نسعد دائماً بخدمتكم وتوفير تجربة استثنائية ترقى لتطلعاتكم'
      },
      {
        main: 'كيف كانت تجربتك معنا اليوم؟ ✨\nساعدنا بتقييم خدماتنا على خرائط Google',
        secondary: 'ثقتكم بنا هي رأس مالنا ونسعى للتطور المستمر معكم'
      },
      {
        main: 'كن شريكاً في قصة نجاحنا 🤝\nامسح الكود واترك انطباعك الكريم',
        secondary: 'فريق عمل متكامل مكرس لراحتكم وتلبية جميع متطلباتكم'
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
 * Predicts the business category and generates intelligent, personalized texts based on:
 * 1. Business Name (اسم المنشأة)
 * 2. Activity / Category / Nature of Service (طبيعة الخدمة أو التصنيف)
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

  // Generate personalized main texts with the business name embedded
  const suggestedMainTexts = bestMatch.ctaTemplates.map((template) =>
    template.main.replace(/\{name\}/g, cleanName)
  );

  // Add universal high-converting variations with the company name
  suggestedMainTexts.push(
    `كيف كانت تجربتك في ${cleanName} اليوم؟\nامسح الرمز وقيّمنا على خرائط Google ★`,
    `شاركنا رأيك وانطباعك في ${cleanName}\nرأيكم يسعدنا ويصنع الفرق دائماً ✨`,
    `ساعدنا بتقييم خدمات ${cleanName} بـ 5 نجوم ★\nامسح الرمز بخطوة واحدة سريعة`
  );

  // Generate personalized secondary texts
  const suggestedSecondaryTexts = bestMatch.ctaTemplates.map((template) => template.secondary);
  suggestedSecondaryTexts.push(
    `نسعى دائماً لتقديم أقصى درجات الجودة لعملاء ${cleanName} الكرام`,
    `رأيكم الكريم يلهم فريقنا لتقديم أفضل خدمة في كل زيارة`,
    `شكراً لثقتكم واختياركم لنا دائماً`
  );

  // English subtitles
  const cleanEnglishPrefix = cleanName.toUpperCase().replace(/[^\w\s]/g, '').trim() || 'PREMIUM';
  const suggestedSubtitles = bestMatch.sampleSubtitles.map((sub) => `${cleanEnglishPrefix} ${sub}`);

  return {
    detectedCategory: bestMatch,
    confidenceScore: maxScore,
    extractedCleanName: cleanName,
    suggestedMainTexts,
    suggestedSecondaryTexts,
    suggestedSubtitles,
    suggestedIcon: bestMatch.suggestedIcon,
    suggestedTheme: bestMatch.suggestedTheme
  };
}
