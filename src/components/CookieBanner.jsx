import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PrivacyPolicy } from './PrivacyPolicy';

const STORAGE_KEY = 'cookiesAccepted';

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // Small delay so banner slides in after page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-auto md:max-w-xs z-[180] pointer-events-auto"
          >
            <div className="relative rounded-xl border border-white/[0.08] bg-[#0d0d0d]/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

              <div className="px-3.5 py-3 md:px-4 md:py-3.5">
                {/* Cookie icon + text */}
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 w-6 h-6 rounded-md bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
                    <Cookie className="w-3 h-3 text-pink-400/80" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-400">
                    {t('cookie.message')}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={handleAccept}
                    className="px-3.5 py-1 rounded-md text-[11px] font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-lg shadow-pink-500/20 transition-all duration-200 hover:shadow-pink-500/30"
                  >
                    {t('cookie.accept')}
                  </button>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="px-2 py-1 rounded-md text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {t('cookie.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy modal (reusing existing component) */}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </>
  );
};
