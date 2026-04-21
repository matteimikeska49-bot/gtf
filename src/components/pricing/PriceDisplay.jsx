import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const formatPrice = (price, lang) => {
  return price.toLocaleString(lang === 'EN' ? 'en-US' : 'ru-RU');
};

export const PriceDisplay = ({ price }) => {
  const { t, lang } = useLanguage();
  return (
    <div className="flex items-baseline gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={price}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-none"
        >
          {lang === 'EN' ? '$' : ''}{formatPrice(price, lang)}{lang === 'RU' ? ' ₽' : ''}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-zinc-500 font-medium">{t('pricing.perMonth')}</span>
    </div>
  );
};
