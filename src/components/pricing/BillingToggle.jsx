import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const BillingToggle = ({ isYearly, setIsYearly }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-1 p-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md w-fit mx-auto shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
        <button
          onClick={() => setIsYearly(false)}
          className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            !isYearly
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {!isYearly && (
            <motion.div
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12] shadow-[0_0_12px_rgba(255,255,255,0.04)]"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{t('pricing.billingMonth')}</span>
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            isYearly
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {isYearly && (
            <motion.div
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12] shadow-[0_0_12px_rgba(255,255,255,0.04)]"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {t('pricing.billingYear')}
            <span className="text-[10px] font-bold tracking-wider uppercase text-pink-400">{t('pricing.discountBadge')}</span>
          </span>
        </button>
      </div>
      <p className="text-xs text-zinc-600 font-medium">
        {t('pricing.savingNote')}
      </p>
    </div>
  );
};
