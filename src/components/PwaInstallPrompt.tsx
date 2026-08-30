import React, { useState, useEffect } from 'react';
import { 
  DownloadCloud, 
  Smartphone, 
  Share, 
  PlusSquare, 
  X, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback instruction
      alert('لتثبيت التطبيق: افتح قائمة المتصفح (⋮) ثم اضغط على "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"');
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || dismissed) return null;

  return (
    <>
      {/* Top / Floating Install Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shadow-lg shadow-amber-500/20 text-xs font-bold z-40 sticky top-0 border-b border-amber-600/30">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-black text-slate-950 block sm:inline">
              تثبيت التطبيق كتطبيق هاتف تقادمي (PWA)
            </span>
            <span className="text-[11px] text-slate-900 hidden sm:inline mr-1 font-semibold">
              - وصول فوري وسرعة فائقة بدون إنترنت
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="bg-slate-950 hover:bg-slate-900 text-amber-400 px-3 py-1.5 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer min-h-[34px]"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>تثبيت الآن 📲</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-800 hover:text-slate-950 rounded-lg transition-colors cursor-pointer"
            title="إخفاء"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Install Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl text-right space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">تثبيت التطبيق على آيفون / آيباد</h3>
                  <span className="text-xs text-slate-400">Safari Browser</span>
                </div>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p>
                  اضغط على زر <strong>المشاركة (Share <Share className="inline w-3.5 h-3.5 text-amber-400" />)</strong> في أسفل شاشة متصفح Safari.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p>
                  مرر للأسفل واختر <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen <PlusSquare className="inline w-3.5 h-3.5 text-amber-400" />)</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p>
                  اضغط على <strong>"إضافة" (Add)</strong> في أعلى الزاوية. سيظهر التطبيق كأيقونة مستقلة فوراً!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
            >
              فهمت، شكراً لك!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
