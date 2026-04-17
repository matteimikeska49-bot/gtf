import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicy = ({ onClose }) => {
  const { t } = useLanguage();
  const sections = t('legal.privacy.sections');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06] bg-[#050505]/60 backdrop-blur-sm shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{t('legal.privacy.title')}</h2>
              <p className="text-xs text-zinc-500 mt-1">GoToFlow · https://gotoflow.io</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content — scrollable */}
          <div className="overflow-y-auto px-8 py-7 flex flex-col gap-8">
            {Array.isArray(sections) && sections.map((sec, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-white mb-3 tracking-tight">{sec.title}</h3>
                <ul className="flex flex-col gap-2">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-500/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-white/[0.06] bg-[#050505]/60 shrink-0">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
            >
              {t('legal.close')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
