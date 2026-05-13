import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

// Legacy key — used for RU to stay backward-compatible
const LEGACY_KEY = 'cookiesAccepted';
// New structured key — used for EN
const CONSENT_KEY = 'gtf_cookie_consent';
const CONSENT_DATE = '2026-02-19';

export const CookieBanner = () => {
  const { t, lang } = useLanguage();
  const isEN = lang === 'EN';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let alreadySet = false;
    if (isEN) {
      alreadySet = !!localStorage.getItem(CONSENT_KEY);
    } else {
      alreadySet = !!localStorage.getItem(LEGACY_KEY);
    }
    if (!alreadySet) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isEN]);

  // EN: Accept all
  const handleAcceptAll = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ necessary: true, optional: true, updatedAt: CONSENT_DATE })
    );
    setVisible(false);
  };

  // EN: Reject optional
  const handleReject = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ necessary: true, optional: false, updatedAt: CONSENT_DATE })
    );
    setVisible(false);
  };

  // RU: legacy single accept
  const handleAcceptLegacy = () => {
    localStorage.setItem(LEGACY_KEY, 'true');
    setVisible(false);
  };

  return (
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
                  <Cookie className="w-3 h-3 text-pink-400/80" aria-hidden="true" />
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  {t('cookie.message')}
                  {isEN && (
                    <>
                      {' '}
                      <Link
                        to="/privacy-policy"
                        className="text-pink-400/80 hover:text-pink-300 underline underline-offset-2 transition-colors duration-200"
                        onClick={() => setVisible(false)}
                      >
                        {t('cookie.privacyPolicy')}
                      </Link>
                    </>
                  )}
                </p>
              </div>

              {/* Buttons */}
              {isEN ? (
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <button
                    id="cookie-accept-all"
                    onClick={handleAcceptAll}
                    className="px-3.5 py-1 rounded-md text-[11px] font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-lg shadow-pink-500/20 transition-all duration-200 hover:shadow-pink-500/30"
                  >
                    {t('cookie.acceptAll')}
                  </button>
                  <button
                    id="cookie-reject"
                    onClick={handleReject}
                    className="px-3 py-1 rounded-md text-[11px] font-medium text-zinc-400 hover:text-zinc-200 border border-white/[0.08] hover:border-white/20 transition-all duration-200"
                  >
                    {t('cookie.reject')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    id="cookie-accept-ru"
                    onClick={handleAcceptLegacy}
                    className="px-3.5 py-1 rounded-md text-[11px] font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-lg shadow-pink-500/20 transition-all duration-200 hover:shadow-pink-500/30"
                  >
                    {t('cookie.accept')}
                  </button>
                  <button
                    id="cookie-learn-more-ru"
                    onClick={handleAcceptLegacy}
                    className="px-2 py-1 rounded-md text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {t('cookie.learnMore')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
