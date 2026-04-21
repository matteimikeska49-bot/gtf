import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BillingToggle } from './pricing/BillingToggle';
import { PlanCard } from './pricing/PlanCard';

/* ─── Main Pricing Section ─── */
export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { t, lang } = useLanguage();
  const rawPlans = t('pricing.plans') || [];

  const plans = [
    {
      id: 'lite',
      name: 'LITE',
      tagline: rawPlans[0]?.tagline || "",
      icon: Zap,
      monthlyPrice: 1500,
      tokens: rawPlans[0]?.tokens || "",
      tokenNote: rawPlans[0]?.tokenNote || null,
      features: rawPlans[0]?.features || [],
      featured: false,
      accent: 'zinc',
    },
    {
      id: 'pro',
      name: 'PRO',
      tagline: rawPlans[1]?.tagline || "",
      icon: Crown,
      monthlyPrice: 3500,
      tokens: rawPlans[1]?.tokens || "",
      tokenNote: rawPlans[1]?.tokenNote || null,
      features: rawPlans[1]?.features || [],
      featured: true,
      accent: 'brand',
    },
    {
      id: 'power',
      name: 'POWER',
      tagline: rawPlans[2]?.tagline || "",
      icon: Rocket,
      monthlyPrice: 6990,
      tokens: rawPlans[2]?.tokens || "",
      tokenNote: rawPlans[2]?.tokenNote || null,
      features: rawPlans[2]?.features || [],
      featured: false,
      accent: 'violet',
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14 flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/15 bg-pink-500/[0.06] text-pink-300 text-xs tracking-widest uppercase font-bold backdrop-blur-md">
            <Crown className="w-3.5 h-3.5" />
            <span>{t('pricing.badge')}</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-balance">
              {t('pricing.titlePart1')}{' '}
              <span className="text-gradient-brand">{t('pricing.titleHighlight')}</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed text-balance font-medium">
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Billing Toggle */}
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start md:items-center">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} isYearly={isYearly} index={i} t={t} lang={lang} />
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs text-zinc-600 font-medium mt-10"
        >
          {t('pricing.bottomNote')}
        </motion.p>
      </div>
    </section>
  );
};
