import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Check, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (PWA installed)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    
    setIsStandalone(isStandaloneMode);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      // Check if iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
      if (isIOS) {
        setShowIOSGuide(true);
      } else {
        alert('To install Adha Music on your phone:\n\n1. Open browser menu (3 dots)\n2. Tap "Add to Home Screen" or "Install App"');
      }
    }
  };

  if (isStandalone || !showBanner || installed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-slate-900/90 border-b border-indigo-500/30 px-4 py-3 text-white text-sm backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-100 flex items-center gap-1.5">
              Keep Adha Music on your Phone!
              <span className="text-xs bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-medium">
                PWA App
              </span>
            </p>
            <p className="text-xs text-slate-300">
              Install to home screen to play Hindi & Nepali music offline anytime without internet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleInstallClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Install as Phone App
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              Install Adha Music on iPhone / iPad
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Follow these simple steps in Safari to add Adha Music to your iPhone home screen:
            </p>
            <ol className="space-y-3 text-sm text-slate-200 mb-6">
              <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span>Tap the <strong className="text-indigo-300 flex inline-flex items-center gap-1"><Share className="w-3.5 h-3.5" /> Share</strong> button in Safari browser bar.</span>
              </li>
              <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span>Scroll down and select <strong className="text-indigo-300">"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span>Tap <strong className="text-indigo-300">"Add"</strong> on top right. Open anytime from home screen!</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
