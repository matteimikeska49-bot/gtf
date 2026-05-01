import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

const FAQItem = ({ item, isOpen, onClick }) => (
  <div
    className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${
      isOpen
        ? 'border-pink-500/30 bg-white/[0.03]'
        : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between gap-4 p-6">
      <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>
        {item.q}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]"
      >
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>

    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      className="overflow-hidden"
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <p className="px-6 pb-6 text-zinc-400 leading-relaxed font-medium text-sm md:text-base">
        {item.a}
      </p>
    </motion.div>
  </div>
);

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const faqs = t('faq.items') || [];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.6 : 0.8, ease: 'easeOut' }}
          className="text-center mb-14 flex flex-col items-center transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <span>{t('faq.badge')}</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight text-balance">
              {t('faq.titlePart1')} <span className="text-gradient-brand">{t('faq.titleHighlight')}</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* Accordion wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-8 lg:gap-y-4 items-start transform-gpu"
        >
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
