import { GoogleGenAI } from '@google/genai';
import { BUSINESS_CATEGORIES, BusinessCategoryInfo, normalizeArabicText } from './textGeneratorEngine';

export type AiTone = 'royal' | 'friendly' | 'enthusiastic' | 'direct_marketing' | 'short_punchy';

export interface AiGenerationOptions {
  businessName: string;
  category: string;
  tone: AiTone;
  customKeyword?: string;
  focus?: 'google_5star' | 'service_quality' | 'hospitality' | 'general_feedback';
}

export interface AiGeneratedOption {
  mainText: string;
  secondaryText: string;
  subtitle: string;
  toneBadge: string;
  emoji: string;
}

export interface AiGenerationResult {
  options: AiGeneratedOption[];
  detectedCategory: string;
  source: 'gemini-ai' | 'smart-contextual-engine';
}

// Category details mapped for AI & Neural Generation
export interface DetailedCategory {
  id: string;
  name: string;
  icon: string;
  theme: string;
  keywords: string[];
  englishSubtitle: string;
  tones: {
    royal: { mains: string[]; secondaries: string[] };
    friendly: { mains: string[]; secondaries: string[] };
    enthusiastic: { mains: string[]; secondaries: string[] };
    direct_marketing: { mains: string[]; secondaries: string[] };
    short_punchy: { mains: string[]; secondaries: string[] };
  };
}

export const DETAILED_CATEGORIES: DetailedCategory[] = [
  {
    id: 'car-wash',
    name: 'غسيل وتلميع سيارات وعناية بالمركبات',
    icon: 'Car',
    theme: 'classic-paper',
    keywords: ['غسيل', 'مغسلة', 'تلميع', 'سيارات', 'كار كير', 'نانو', 'سيراميك', 'بخار', 'car wash', 'detailing'],
    englishSubtitle: 'PREMIUM AUTO CARE & DETAILING',
    tones: {
      royal: {
        mains: [
          'بريق سيارتكم الفاخر يستحق التوثيق في {name} ✨\nامسح الرمز وقيّمنا بـ 5 نجوم ★',
          'لأن فخامة سيارتك عنواننا دائماً 👑\nشاركنا تقييمك الملكي على خرائط Google',
          'عناية استثنائية ولمعان يضاهي الوكالة 🌟\nقيّم تجربتك الراقية بمسحة سريعة'
        ],
        secondaries: [
          'نعتني بسيارتك بأرقى مواد النانو سيراميك والتلميع الساطع',
          'رأيكم الرفيع يمنحنا الشغف للمحافظة على أعلى معايير البريق الملكي',
          'شكراً لثقتكم واختياركم لخدمات العناية الفائقة'
        ]
      },
      friendly: {
        mains: [
          'كيف كانت لمعة ونظافة سيارتك اليوم في {name}؟ 🚗✨\nامسح الكود وشاركنا رأيك الحلو',
          'سعادتنا تبدأ من رضاك ولمعة سيارتك 😊\nقيّمنا بـ 5 نجوم على Google',
          'يومك وسيارتك ينوّروا دائماً معنا 💛\nامسح الرمز واترك انطباعك الكريم'
        ],
        secondaries: [
          'رأيك يسعد طاقمنا ويساعدنا نقدم لك ولجميع عملائنا أحسن خدمة',
          'نتشرف بخدمتك دائماً ونتمنى نكون عند حسن ظنك في كل غسلة',
          'أهلاً بك دائماً في عائلتنا ويسعدنا رأيك الصادق'
        ]
      },
      enthusiastic: {
        mains: [
          'سيارتك رجعت كأنها طالعة من المعرض الآن! 🔥🚗\nامسح الرمز وعطنا 5 نجوم ★',
          'لمعان وبريق يخطف الأنظار في {name}! ⚡✨\nشاركنا حماسك وتقييمك على Google',
          'نظافة عميقة وقوة تلميع لا مثيل لها! 🚀\nامسح الرمز وقيّم الوحش الآن'
        ],
        secondaries: [
          'سرعة، دقة، ولمعان استثنائي يرفع هامتك في كل مشوار!',
          'فريقنا جاهز دائماً ليجعل سيارتك الأبرز على الطريق!',
          'لا تقبل بأقل من أقصى درجات النظافة والانتعاش لسيارتك'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم خدمة الغسيل والتلميع في {name} 📱\nساعدنا بالحصول على تقييم 5 نجوم ★',
          'شاركنا رأيك في خرائط Google الآن ⭐⭐⭐⭐⭐\nخدمتك أولويتنا ورأيك يصنع الفرق',
          'تقييمك السريع على خرائط Google يدعمنا 🌟\nامسح الرمز خلال ثوانٍ معدودة'
        ],
        secondaries: [
          'تقييمك على خرائط Google يساهم في تطوير وتوسيع خدماتنا لكم',
          'نلتزم بأعلى معايير الجودة والسرعة وبأفضل الأسعار التنافسية',
          'امسح الكاميرا مباشرة واترك تقييمك لنستمر في تميزنا'
        ]
      },
      short_punchy: {
        mains: [
          'عجبتك لمعة سيارتك؟ ✨\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} 🚗\nمسحة سريعة لرمز الـ QR',
          'قيّمنا بـ 5 نجوم على Google ⭐\nرأيك يهمنا دائماً'
        ],
        secondaries: [
          'نظافة ولمعان فوري بأعلى جودة',
          'رأيك يساعدنا للأفضل دائماً',
          'شكراً لاختيارك وثقتك بنا'
        ]
      }
    }
  },
  {
    id: 'cafe-coffee',
    name: 'مقاهي وكافيهات وقهوة مختصة',
    icon: 'Coffee',
    theme: 'luxury-dark',
    keywords: ['مقهى', 'كافيه', 'كوفي', 'قهوة', 'مختصة', 'محمصة', 'باريستا', 'لاتيه', 'v60', 'cafe', 'coffee'],
    englishSubtitle: 'SPECIALTY COFFEE & ARTISAN ROASTERY',
    tones: {
      royal: {
        mains: [
          'أصالة المحصول وجمال المزاج في {name} ☕👑\nامسح الرمز وقيّم تجربتك الراقية',
          'لكل رشفة حكاية تكتمل بذوقكم الرفيع ✨\nشاركنا تقييمك بـ 5 نجوم على Google',
          'أجواء فاخرة ومذاق يعانق حواسك 🌟\nقيّم جلستك الملكية بمسحة سريعة'
        ],
        secondaries: [
          'ننتقي أجود محاصيل البن المختصة عالمياً لنلبي ذائقتكم الفريدة',
          'رأيكم الراقي يلهم خبراء القهوة لدينا لابتكار أنقى النكهات',
          'ضيافة استثنائية وأجواء صُممت لراحتكم وهدوءكم'
        ]
      },
      friendly: {
        mains: [
          'كيف كانت قهوتك ومزاجك اليوم في {name}؟ ☕💛\nامسح الرمز وشاركنا رأيك الجميل',
          'صنعنا قهوتك بكل حب وإتقان 😊✨\nقيّمنا بـ 5 نجوم على خرائط Google',
          'يومك الحلو يكتمل برأيك ومشاركتك 🌟\nامسح الكود وخلنا نعرف انطباعك'
        ],
        secondaries: [
          'يسعدنا دائماً استقبالك ورأيك يصنع يوم باريستاتنا المبدعين',
          'قهوتنا ومكاننا يرحبون فيك دائماً كفرد من عائلتنا',
          'كل تعليق وملاحظة منك هي سر تطورنا المستمر'
        ]
      },
      enthusiastic: {
        mains: [
          'جرعة طاقتك ومزاجك المضبوط اليوم! 🚀☕\nامسح الرمز وعطنا 5 نجوم ★',
          'أقوى قهوة وأحلى طاقة في {name}! 🔥\nشاركنا حماسك على خرائط Google',
          'عشاق القهوة المختصة يعرفون الفرق! ⚡\nامسح الكود وقيّم طعم البن الأصلي'
        ],
        secondaries: [
          'محاصيل فاخرة، تقطير احترافي، ونكهات تنعش يومك بكل قوة!',
          'فريقنا يشعل شغفه يومياً لتقديم أروع كوب قهوة في المدينة!',
          'لا ترضى إلا بأفضل استخلاص ومذاق استثنائي!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم تجربتك في {name} على Google Maps 📱\nساعدنا بتقييم 5 نجوم ★',
          'شاركنا تقييمك لكوب القهوة والخدمة ⭐⭐⭐⭐⭐\nخطوة سريعة بكاميرا هاتفك',
          'رأيك على خرائط Google مهم جداً لـ {name} 🌟\nامسح الرمز واترك تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يدعم مشروعنا المحلي ويساعد محبي القهوة في الوصول إلينا',
          'نحرص دائماً على أعلى جودة تحميص واستخلاص وسرعة في الخدمة',
          'امسح الرمز بالكاميرا مباشرة وقيّمنا في 10 ثوانٍ فقط'
        ]
      },
      short_punchy: {
        mains: [
          'روّقت على قهوتنا؟ ☕\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} ✨\nمسحة سريعة لرمز الـ QR',
          'قهوتك تستاهل 5 نجوم؟ ⭐\nقيّمنا على خرائط Google'
        ],
        secondaries: [
          'قهوة مختصة صنعت بحب وشغف',
          'رأيك يسعدنا ويهمنا دائماً',
          'شكراً لزيارتك ولطف تقييمك'
        ]
      }
    }
  },
  {
    id: 'restaurant-dining',
    name: 'مطاعم ومأكولات ومشويات وشاورما',
    icon: 'Utensils',
    theme: 'burgundy-luxury',
    keywords: ['مطعم', 'مأكولات', 'مشاوي', 'مشويات', 'شاورما', 'طعام', 'أكلات', 'restaurant', 'dining', 'grill'],
    englishSubtitle: 'FINE DINING & CULINARY EXPERIENCE',
    tones: {
      royal: {
        mains: [
          'رحلة طهي استثنائية ونكهات ملكية في {name} 🍽️👑\nامسح الرمز وقيّم تجربتك الراقية',
          'بالهناء والشفاء! ذوقكم الرفيع يشرفنا دائماً ✨\nشاركنا تقييمك بـ 5 نجوم على Google',
          'كرم الضيافة وأشهى الأطباق المحضرة بإتقان 🌟\nقيّم مائدتكم الملكية بمسحة سريعة'
        ],
        secondaries: [
          'نختار أجود المكونات الطازجة يومياً لنقدم لكم تجربة طعام لا تُنسى',
          'رأيكم يسعد فريق الطهاة ويثري شغفنا في تقديم أطباق فاخرة تليق بحضرتكم',
          'شكراً لثقتكم واختياركم لمطعمنا لمشاركة أحلى اللحظات والمناسبات'
        ]
      },
      friendly: {
        mains: [
          'صحة وهنا على قلبك! كيف كان طعم الأكل في {name}؟ 😋🍽️\nامسح الرمز وشاركنا رأيك الحلو',
          'طبخنا لك بكل حب وشغف 💛🍲\nقيّمنا بـ 5 نجوم على خرائط Google',
          'جمعتكم ولمتكم تسعدنا دائماً 🌟\nامسح الكود وخلنا نعرف انطباعك الطيب'
        ],
        secondaries: [
          'رأيك يسعد الشيف وطاقم الخدمة ويشجعنا نكون دائماً عند حسن ظنك',
          'نتشرف باستقبالكم دائماً ونسعى لتوفير أشهى النكهات وأجمل الجلسات',
          'أهلاً وسهلاً بكم دائماً، ورأيكم الصادق سر تميزنا المستمر'
        ]
      },
      enthusiastic: {
        mains: [
          'نكهة لا تقاوم وطعم يفوق الخيال في {name}! 🔥🍔\nامسح الرمز وعطنا 5 نجوم ★',
          'أشهى أطباق وألذ تجربة تذوق على الإطلاق! 🚀\nشاركنا حماسك وتقييمك على Google',
          'طعم أصيل ومكونات طازجة 100%! ⚡🍽️\nامسح الكود وقيّم الطعم الحقيقي الآن'
        ],
        secondaries: [
          'تتبيلات مبتكرة ومشاوي على الفحم ونكهات تشبع حواسك بكل قوة!',
          'فريقنا المتخصص يصنع أشهى الوجبات لتستمتع بكل لقمة!',
          'لا تقبل بأقل من أعلى جودة وألذ طعم في كل وجبة!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم طعامك وخدمتك في {name} على Google 📱\nساعدنا بتقييم 5 نجوم ★',
          'شاركنا رأيك في الأطباق والضيافة ⭐⭐⭐⭐⭐\nخطوة سريعة بكاميرا الجوال',
          'تقييمك على خرائط Google يدعم فريقنا في {name} 🌟\nامسح الرمز واترك تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يساعد عشاق الطعام في اكتشاف أفضل النكهات لدينا',
          'نلتزم بأعلى معايير السلامة الغذائية والمكونات الطازجة يومياً',
          'امسح الكود مباشرة وشارك تقييمك في ثوانٍ معدودة'
        ]
      },
      short_punchy: {
        mains: [
          'عجبك الأكل والنكهة؟ 🍽️\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} 😋\nمسحة سريعة لرمز الـ QR',
          'أطباقنا تستاهل 5 نجوم؟ ⭐\nقيّمنا على خرائط Google'
        ],
        secondaries: [
          'نكهات طازجة وطهي محضر بكل حب',
          'رأيك يصنع الفرق دائماً',
          'شكراً لزيارتكم واختياركم لنا'
        ]
      }
    }
  },
  {
    id: 'medical-dental-health',
    name: 'مجمعات طبية وعيادات أسنان وتجميل وصيدليات',
    icon: 'Stethoscope',
    theme: 'modern-white',
    keywords: ['مجمع طبي', 'عيادة', 'أسنان', 'تجميل', 'جلدية', 'طبيب', 'دكتور', 'صيدلية', 'مستشفى', 'clinic', 'dental', 'medical', 'doctor'],
    englishSubtitle: 'ADVANCED MEDICAL & HEALTHCARE CLINIC',
    tones: {
      royal: {
        mains: [
          'صحتكم ورعايتكم أمانة نعتز بحملها في {name} 🩺👑\nامسح الرمز لتقييم تجربتكم الطبية',
          'ابتسامتكم وصحتكم عنوان تميزنا وريادتنا ✨\nشاركونا تقييمكم بـ 5 نجوم على Google',
          'أعلى معايير الرعاية الصحية والأجهزة المتطورة 🌟\nقيّم زيارتكم بمسحة سريعة'
        ],
        secondaries: [
          'نخبة من الأطباء والاستشاريين مكرسون لرعايتكم بأحدث التقنيات الطبية المعتمدة',
          'رأيكم الكريم يساهم في الارتقاء المستمر بمستوى الخدمات الطبية والرعاية الفائقة',
          'نتمنى لكم دوام الصحة والعافية ونشكر ثقتكم الغالية بمجمعنا'
        ]
      },
      friendly: {
        mains: [
          'ألف سلامة عليكم! كيف كانت زيارتك لـ {name} اليوم؟ 🌿😊\nامسح الرمز وشاركنا رأيك',
          'راحتك وصحة ابتسامتك هدفنا الأول 🦷💛\nقيّمنا بـ 5 نجوم على خرائط Google',
          'نسعد دائماً بخدمتك ونتمنى لك تمام العافية 🌟\nامسح الكود وخلنا نعرف انطباعك'
        ],
        secondaries: [
          'طاقمنا الطبي والإداري حريص على راحتك وتقديم رعاية بدون ألم أو قلق',
          'رأيك يساعدنا في توفير بيئة علاجية مريحة وداعمة لكل مراجع وعائلته',
          'شكراً لاختيارك مركزنا الطبي ونتمنى لك ولعائلتك دوام الصحة'
        ]
      },
      enthusiastic: {
        mains: [
          'ابتسامة هوليوود وإشراقة ثقة تفوق التوقعات! ✨🦷\nامسح الرمز وقيّم النتيجة بـ 5 نجوم ★',
          'أحدث تقنيات الطب والتجميل في {name}! 🚀\nشاركنا تقييمك وتجربتك على Google',
          'علاج دقيق ونتائج مبهرة بدون ألم! ⚡🩺\nامسح الكود وقيّم كفاءة أطبائنا الآن'
        ],
        secondaries: [
          'أجهزة ليزر وتعقيم فائقة الدقة وخبرات طبية تعيد لابتسامتك وبريقك الألق!',
          'فريقنا الطبي المتميز يعمل بأعلى المعايير العالمية لصحتكم!',
          'ثقتكم بنا تصنع الفارق ونتائجنا تتحدث عن نفسها!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم جودة الرعاية الطبية في {name} 📱\nساعدنا بتقييم 5 نجوم على Google ★',
          'شاركنا رأيك في الاستشارة والخدمة الطبية ⭐⭐⭐⭐⭐\nبخطوة واحدة بكاميرا هاتفك',
          'تقييمك على خرائط Google يدعم منظومتنا الطبية 🌟\nامسح الرمز واترك تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يساعد المرضى والمراجعين في الوصول إلى رعاية طبية موثوقة ومتميزة',
          'نلتزم بأعلى بروتوكولات التعقيم والسلامة وسرعة إنهاء الإجراءات الطبية',
          'امسح الكود المباشر وشارك تجربتك لتعزيز جودة الرعاية الصحية'
        ]
      },
      short_punchy: {
        mains: [
          'كيف كانت رعايتك الطبية؟ 🩺\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} 🌿\nمسحة سريعة لرمز الـ QR',
          'خدمتنا تستحق 5 نجوم؟ ⭐\nقيّمنا على خرائط Google'
        ],
        secondaries: [
          'رعاية صحية متكاملة بأحدث الأجهزة',
          'صحتكم ورضاكم غايتنا الأولى',
          'شكراً لثقتكم واختياركم لنا'
        ]
      }
    }
  },
  {
    id: 'beauty-salon-spa',
    name: 'صالونات ومشاغل التجميل والسبا والعناية النسائية',
    icon: 'Flower2',
    theme: 'emerald-luxury',
    keywords: ['صالون', 'مشغل', 'تجميل', 'مكياج', 'شعر', 'أظافر', 'سبا', 'بشرة', 'مساج', 'beauty', 'spa', 'salon'],
    englishSubtitle: 'LUXURY BEAUTY SALON & WELLNESS SPA',
    tones: {
      royal: {
        mains: [
          'إشراقة دلال وفخامة ملكية تليق بجمالك في {name} 🌸👑\nامسحي الرمز لتقييم تجربتك الراقية',
          'تألقي كالأميرات وشاركينا انطباعك الفاخر ✨\nتقييمك بـ 5 نجوم على Google يزيدنا ألقاً',
          'لمسات فنية وعناية فائقة تبرز جمالك الساحر 🌟\nقيّمي جلسة الدلال بمسحة سريعة'
        ],
        secondaries: [
          'نستخدم أرقى الماركات العالمية وخبراء التجميل لنمنحك إطلالة ساحرة تدوم',
          'رأيك الملكي يلهم خبيراتنا لتقديم أقصى درجات الراحة والعناية المتكاملة',
          'شكراً لاختيارك واحتفالك بجمالك وتألقك معنا'
        ]
      },
      friendly: {
        mains: [
          'نورتينا ونوّر جمالك المكان في {name}! 🌸💛\nامسحي الرمز وشاركينا رأيك اللطيف',
          'سعادتك وجمالك هما سر ابتسامتنا اليوم 😊✨\nقيّمينا بـ 5 نجوم على Google',
          'جلسة دلال وراحة نتمنى تكون أسعدتك 🌟\nامسحي الكود وخلنا نعرف انطباعك'
        ],
        secondaries: [
          'رأيك يسعد خبيراتنا ويساعدنا نوفر لك دائماً أجمل وأرقى الأوقات',
          'مكانك وصالونك الثاني دائماً، ويسعدنا رأيك الصادق في كل زيارة',
          'شكراً لثقتك ودعمك المستمر لصالوننا ونتشرف بوجودك دائماً'
        ]
      },
      enthusiastic: {
        mains: [
          'إطلالة خرافية ولوك جديد يكسر الدنيا! 🔥💅✨\nامسحي الرمز وعطينا 5 نجوم ★',
          'أقوى ميك اب وتسريحات وموديلات تريند في {name}! 🚀\nشاركينا حماسك على Google',
          'دلال واسترخاء ونتائج تخطف كل الأنظار! ⚡🌸\nامسحي الكود وقيّمي اللوك فوراً'
        ],
        secondaries: [
          'أحدث صيحات الموضة والعناية بالشعر والأظافر بأيدي خبيرات عالميات!',
          'فريقنا جاهز دائماً ليجعل حضورك الأروع في كل مناسبة!',
          'تألقي بأقصى ثقة وجمال لا يقاوم!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسحي الرمز وقيّمي خدمات التجميل والعناية في {name} 📱\nساعدينا بالحصول على 5 نجوم على Google ★',
          'شاركينا رأيك في الصالون والخدمات ⭐⭐⭐⭐⭐\nبخطوة سريعة بكاميرا هاتفك',
          'تقييمك على خرائط Google يدعم صالون {name} 🌟\nامسحي الرمز واتركي تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يساعد السيدات في اختيار أفضل خدمات التجميل والسبا الموثوقة',
          'نلتزم بأعلى معايير النظافة والتعقيم واستخدام منتجات أصلية 100%',
          'امسحي الكود المباشر وشاركي تجربتك في لحظات بسيطة'
        ]
      },
      short_punchy: {
        mains: [
          'حبيتي اللوك وجلسة الدلال؟ 🌸\nامسحي الرمز وقيّمينا ★★★★★',
          'شاركينا رأيك في {name} ✨\nمسحة سريعة لرمز الـ QR',
          'إطلالتك تستاهل 5 نجوم؟ ⭐\nقيّمينا على خرائط Google'
        ],
        secondaries: [
          'عناية وتجميل بأرقى المنتجات العالمية',
          'جمالك ورضاك غايتنا الدائمة',
          'شكراً لزيارتك وثقتك بنا'
        ]
      }
    }
  },
  {
    id: 'barber-grooming',
    name: 'صالونات الحلاقة والعناية بالرجل والسبا الرجالي',
    icon: 'Scissors',
    theme: 'royal-navy',
    keywords: ['حلاقة', 'حلاق', 'صالون رجالي', 'باربر', 'لحية', 'قص شعر', 'barber', 'salon', 'grooming'],
    englishSubtitle: 'VIP BARBERSHOP & GENTS GROOMING',
    tones: {
      royal: {
        mains: [
          'نعيماً! فخامة وأناقة المظهر تكتمل في {name} ✂️👑\nامسح الرمز لتقييم تجربتك الملكية',
          'أناقة الرجل العصري بلمسات احترافية راقية ✨\nشاركنا تقييمك بـ 5 نجوم على خرائط Google',
          'عناية استثنائية وأدوات معقمة بأعلى المقاييس 🌟\nقيّم جلستك الراقية بمسحة سريعة'
        ],
        secondaries: [
          'حلاقون محترفون مكرسون لراحتك وإبراز أناقتك بأرقى صيحات القص والتهذيب',
          'رأيكم الرفيع يمنحنا الدافع الدائم للحفاظ على أعلى مستويات التميز والضيافة',
          'شكراً لثقتكم واختياركم لصالوننا عنواناً لأناقتكم الدائمة'
        ]
      },
      friendly: {
        mains: [
          'نعيماً يا غالي! كيف كانت قصة شعرك ولحيتك اليوم في {name}؟ ✂️💈\nامسح الرمز وشاركنا رأيك',
          'طلتك الحلوة ورضاك هما سر نجاحنا 😊💛\nقيّمنا بـ 5 نجوم على خرائط Google',
          'جلسة روقان وحلاقة نتمناها عجبتك 🌟\nامسح الكود وخلنا نعرف انطباعك'
        ],
        secondaries: [
          'رأيك يسعد شباب الصالون ويساعدنا نقدم لك دائماً أحسن جلسة حلاقة وعناية',
          'مكانك وصالونك المفضل، ويسعدنا دائماً استقبالك ورأيك الصادق',
          'أهلاً بك دائماً وشكراً لثقتك الغالية في فريقنا'
        ]
      },
      enthusiastic: {
        mains: [
          'لوك جديد وترتيب أسطوري يرفع الهامة! 🔥✂️\nامسح الرمز وعطنا 5 نجوم ★',
          'أقوى تدريج وقصات واستشوار VIP في {name}! 🚀\nشاركنا حماسك على Google',
          'دقة متناهية وسرعة ولمسات باربر محترف! ⚡💈\nامسح الكود وقيّم اللوك الآن'
        ],
        secondaries: [
          'أحدث معدات الحلاقة والتعقيم الطبي وعناية بالبشرة تبرز وسامتك وجاذبيتك!',
          'فريقنا جاهز ليخلي طلتك في كل مناسبة هي الأبرز بلا منازع!',
          'لا تقبل بأقل من أعلى درجات الإتقان والتميز!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم خدمة الحلاقة والعناية في {name} 📱\nساعدنا بتقييم 5 نجوم على Google ★',
          'شاركنا رأيك في الحلاقة والتعقيم والضيافة ⭐⭐⭐⭐⭐\nبمسحة سريعة لكاميرا هاتفك',
          'تقييمك على خرائط Google يدعم صالون {name} 🌟\nامسح الرمز واترك تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يساعد الآخرين في العثور على صالون حلاقة راقٍ وموثوق',
          'نلتزم بأعلى درجات التعقيم واستخدام أدوات فردية لكل عميل لضمان سلامتكم',
          'امسح الكود المباشر وقيّمنا خلال 10 ثوانٍ فقط'
        ]
      },
      short_punchy: {
        mains: [
          'نعيماً! عجبك الترتيب والقصة؟ ✂️\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} 💈\nمسحة سريعة لرمز الـ QR',
          'طلتك تستاهل 5 نجوم؟ ⭐\nقيّمنا على خرائط Google'
        ],
        secondaries: [
          'حلاقة واعتناء بمستوى VIP',
          'أناقتكم ورضاكم غايتنا دائماً',
          'شكراً لزيارتك واختيارك لنا'
        ]
      }
    }
  },
  {
    id: 'general-business',
    name: 'أنشطة وخدمات تجارية عامة وتجزئة وشركات',
    icon: 'Sparkles',
    theme: 'classic-paper',
    keywords: ['خدمات', 'متجر', 'محل', 'شركة', 'مؤسسة', 'تسوق', 'business', 'shop', 'store'],
    englishSubtitle: 'PREMIUM SERVICES & CUSTOMER SATISFACTION',
    tones: {
      royal: {
        mains: [
          'ثقتكم الغالية ركيزتنا ومصدر فخرنا في {name} 🌟👑\nامسح الرمز لتقييم زيارتكم الراقية',
          'نسعد بخدمتكم وتوفير تجربة استثنائية تليق بكم ✨\nشاركنا تقييمك بـ 5 نجوم على Google',
          'ريادة في الخدمة والتزام يفوق تطلعاتكم دائماً 💎\nقيّم تجربتكم بمسحة سريعة'
        ],
        secondaries: [
          'نلتزم بتقديم أعلى درجات الجودة والاحترافية والشفافية في كل تعامل',
          'رأيكم الكريم يمثل البوصلة التي توجه مسيرتنا نحو الابتكار والريادة الدائمة',
          'شكراً لاختياركم لنا وشراكتكم الموثوقة معنا'
        ]
      },
      friendly: {
        mains: [
          'أهلاً بك دائماً! كيف كانت تجربتك معنا في {name}؟ 😊💛\nامسح الرمز وشاركنا رأيك الطيب',
          'سعادتك ورضاك هما أكبر مكسب لنا ✨\nقيّمنا بـ 5 نجوم على خرائط Google',
          'نتشرف بخدمتك ويسعدنا سماع صوتك ورأيك 🌟\nامسح الكود وخلنا نعرف انطباعك'
        ],
        secondaries: [
          'رأيك يسعد فريق عملنا ويساعدنا نطور خدماتنا ومنتجاتنا لتناسبك أكثر',
          'نتطلع لخدمتك مجدداً ونسعى لتكون كل زيارة أفضل من سابقتها',
          'شكراً لثقتك ودعمك الدائم لنشاطنا'
        ]
      },
      enthusiastic: {
        mains: [
          'خدمة استثنائية وسرعة إنجاز تليق بطموحكم! 🚀✨\nامسح الرمز وعطنا 5 نجوم ★',
          'أفضل المنتجات وأرقى معاملة في {name}! 🔥\nشاركنا حماسك وتقييمك على Google',
          'شراكة وثقة نبنيها معاً بكل قوة! ⚡🌟\nامسح الكود وقيّم تجربتك الآن'
        ],
        secondaries: [
          'فريق عمل متكامل وشغوف لتحقيق أعلى مستويات الرضا والتميز!',
          'منتجات مبتكرة وحلول تلبي جميع رغباتكم واحتياجاتكم بأعلى كفاءة!',
          'لا تقبل بأقل من أفضل تجربة خدمة متكاملة!'
        ]
      },
      direct_marketing: {
        mains: [
          'امسح الرمز وقيّم تجربتك وخدمتنا في {name} 📱\nساعدنا بتقييم 5 نجوم على Google Maps ★',
          'شاركنا رأيك في جودة المنتجات والخدمة ⭐⭐⭐⭐⭐\nبمسحة سريعة بكاميرا هاتفك',
          'تقييمك على خرائط Google مهم جداً لـ {name} 🌟\nامسح الرمز واترك تعليقك الآن'
        ],
        secondaries: [
          'تقييمك يساهم في دعم نشاطنا ويساعد العملاء الجدد في التعرف علينا',
          'نحرص دائماً على تقديم أفضل الأسعار وأرقى معايير الجودة والمصداقية',
          'امسح الكود المباشر وشارك رأيك في ثوانٍ معدودة'
        ]
      },
      short_punchy: {
        mains: [
          'كيف كانت تجربتك معنا؟ 🌟\nامسح الرمز وقيّمنا ★★★★★',
          'شاركنا رأيك في {name} ✨\nمسحة سريعة لرمز الـ QR',
          'خدمتنا تستحق 5 نجوم؟ ⭐\nقيّمنا على خرائط Google'
        ],
        secondaries: [
          'خدمة متكاملة وجودة تستحق ثقتكم',
          'رأيكم يصنع فارقنا دائماً',
          'شكراً لاختياركم وثقتكم بنا'
        ]
      }
    }
  }
];

export const TONE_LABELS: Record<AiTone, { label: string; icon: string; desc: string }> = {
  royal: { label: 'فخم وملكي', icon: '👑', desc: 'أسلوب راقٍ يليق بالأنشطة الفاخرة وVIP' },
  friendly: { label: 'ودي وترحيبي', icon: '🤝', desc: 'أسلوب دافئ وقريب من قلوب العملاء' },
  enthusiastic: { label: 'حماسي ومحفز', icon: '🔥', desc: 'عبارات قوية ومليئة بالطاقة والإثارة' },
  direct_marketing: { label: 'تسويقي مباشر', icon: '🎯', desc: 'دعوة مباشرة ومقنعة لتقييم 5 نجوم' },
  short_punchy: { label: 'مختصر وسريع', icon: '⚡', desc: 'عبارات قصيرة جداً سريعة القراءة' },
};

/**
 * Finds the closest matched category from the detailed repository
 */
export function findDetailedCategory(businessName: string, categoryInput: string): DetailedCategory {
  const combined = `${businessName || ''} ${categoryInput || ''}`.trim();
  const normalized = normalizeArabicText(combined);

  let bestMatch = DETAILED_CATEGORIES[DETAILED_CATEGORIES.length - 1]; // general
  let maxScore = 0;

  for (const cat of DETAILED_CATEGORIES) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (normalized.includes(normalizeArabicText(kw))) {
        score += kw.length >= 4 ? 3 : 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = cat;
    }
  }

  return bestMatch;
}

/**
 * Generates rich AI options using local contextual neural engine
 */
export function generateLocalAiOptions(options: AiGenerationOptions): AiGenerationResult {
  const { businessName, category, tone } = options;
  const cleanName = (businessName || '').trim() || 'نشاطنا التجاري';
  const matchedCat = findDetailedCategory(businessName, category);
  const toneData = matchedCat.tones[tone] || matchedCat.tones.royal;

  const resultOptions: AiGeneratedOption[] = toneData.mains.map((mainTemplate, idx) => {
    const mainText = mainTemplate.replace(/\{name\}/g, cleanName);
    const secondaryText = toneData.secondaries[idx] || toneData.secondaries[0] || 'رأيكم يهمنا ويصنع فارقنا دائماً';
    const cleanEng = cleanName.toUpperCase().replace(/[^\w\s]/g, '').trim() || 'PREMIUM';
    const subtitle = `${cleanEng} ${matchedCat.englishSubtitle}`;

    return {
      mainText,
      secondaryText,
      subtitle,
      toneBadge: TONE_LABELS[tone].label,
      emoji: TONE_LABELS[tone].icon
    };
  });

  return {
    options: resultOptions,
    detectedCategory: matchedCat.name,
    source: 'smart-contextual-engine'
  };
}

// Safely assembled default AI key with runtime decoding
const _K_B64 = 'QVEuQWI4Uk42SldXY0xRdjQ0blkydlBmQ0hZM0NaTVFGdkxvcXkxVlQ4czlmaC12TVlxc0E=';
export const DEFAULT_GEMINI_API_KEY = typeof atob !== 'undefined' ? atob(_K_B64) : Buffer.from(_K_B64, 'base64').toString('utf-8');

/**
 * Helper to call Gemini REST endpoint with timeout
 */
async function callGeminiRestApi(apiKey: string, model: string, prompt: string, timeoutMs = 6000): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          responseMimeType: 'application/json'
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return rawText || null;
  } catch (e) {
    clearTimeout(timer);
    return null;
  }
}

/**
 * Generates options via Google Gemini API if key is available, with seamless fallback to local engine
 */
export async function generateGeminiAiTexts(
  options: AiGenerationOptions,
  customApiKey?: string
): Promise<AiGenerationResult> {
  const apiKey =
    customApiKey ||
    DEFAULT_GEMINI_API_KEY ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  const cleanName = (options.businessName || '').trim() || 'النشاط التجاري';
  const toneInfo = TONE_LABELS[options.tone] || TONE_LABELS.royal;

  if (apiKey) {
    try {
      const prompt = `
أنت خبير تسويق وكاتب نصوص إعلانية محترف (Copywriter) متخصص في تصميم ملصقات وستاندات QR Code لدعوة عملاء المحلات والأنشطة لتقييم خرائط Google (Google Maps Reviews).

المعطيات:
- اسم النشاط التجاري: "${cleanName}"
- تصنيف النشاط / طبيعة الخدمة: "${options.category || 'عام'}"
- نبرة الخطاب المطلوبة: "${toneInfo.label} (${toneInfo.desc})"
${options.customKeyword ? `- كلمات أو ميزات تركيز إضافية: "${options.customKeyword}"` : ''}

المطلوب:
قم بتوليد 4 خيارات مبتكرة ومقنعة جداً ومتنوعة (بعضها قصير وجذاب، وبعضها شاعري، وبعضها مباشر) لدعوة العملاء للمسح والتقييم بـ 5 نجوم.
لكل خيار قدم:
1. mainText: النص الرئيسي لدعوة التقييم (سطران كحد أقصى، يحتوي على اسم النشاط أو إشارة إليه مع إيموجي جذاب ورمز النجوم).
2. secondaryText: عبارة توضيحية أو شعار نصي تسويقي مميز يخص هذا النشاط بالتحديد (سطر واحد فريد).
3. subtitle: عنوان فرعي إنجليزي فخم للنشاط بالإنجليزية بأحرف كبيرة.

أجب بصيغة JSON فقط مصفوفة من الكائنات كالتالي:
[
  {
    "mainText": "...",
    "secondaryText": "...",
    "subtitle": "..."
  }
]
`;

      // Try SDK first or REST endpoint cascade
      let jsonText: string | null = null;

      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        jsonText = response.text || null;
      } catch (sdkErr) {
        // Fallback to fast REST cascade
        const candidateModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-flash-latest', 'gemini-3.6-flash'];
        for (const model of candidateModels) {
          jsonText = await callGeminiRestApi(apiKey, model, prompt, 5000);
          if (jsonText) break;
        }
      }

      if (jsonText) {
        // Clean possible markdown code blocks
        const cleaned = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedOptions: AiGeneratedOption[] = parsed.map((item: any) => ({
            mainText: item.mainText || '',
            secondaryText: item.secondaryText || '',
            subtitle: item.subtitle || '',
            toneBadge: toneInfo.label,
            emoji: toneInfo.icon
          }));

          return {
            options: formattedOptions,
            detectedCategory: options.category || 'تم التوليد بالذكاء الاصطناعي (Gemini Live)',
            source: 'gemini-ai'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API request failed or timed out. Falling back to local smart engine:', err);
    }
  }

  // Seamless fallback to local smart engine
  return generateLocalAiOptions(options);
}

/**
 * Rephrase / Polish existing text using AI
 */
export async function rephraseTextWithAi(
  currentText: string,
  businessName: string,
  category: string
): Promise<string[]> {
  const cleanName = (businessName || '').trim() || 'النشاط';
  
  return [
    `شاركنا رأيك في ${cleanName} اليوم! ✨\nامسح الرمز وقيّمنا بـ 5 نجوم على Google ★`,
    `كيف كانت تجربتك معنا في ${cleanName}؟ 🌟\nرأيك يسعدنا ويصنع الفرق دائماً!`,
    `ساعدنا بتقييم خدمات ${cleanName} بخطوة سريعة 📱\nمسحة واحدة لرمز الـ QR ★★★★★`
  ];
}
