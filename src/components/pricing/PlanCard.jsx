import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PriceDisplay } from './PriceDisplay';

export const pricingConfig = {
  lite: {
    RU: { monthly: 1500, yearly: 1125 },
    EN: { monthly: 1500, yearly: 1125 }
  },
  pro: {
    RU: { monthly: 3500, yearly: 2625 },
    EN: { monthly: 3500, yearly: 2625 }
  },
  power: {
    RU: { monthly: 6990, yearly: 5243 },
    EN: { monthly: 6990, yearly: 5243 }
  }
};

export const PlanCard = ({ plan, isYearly, index, t, lang }) => {
  const pricing = pricingConfig[plan.id][lang] || pricingConfig[plan.id]['RU'];
  const price = isYearly ? pricing.yearly : pricing.monthly;
  const Icon = plan.icon;

  const orderClass = plan.id === 'pro' ? 'order-1 md:order-2' 
                   : plan.id === 'lite' ? 'order-2 md:order-1' 
                   : 'order-3 md:order-3';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group transform-gpu ${plan.featured ? 'md:-mt-4 md:mb-4 z-20' : 'z-10'} ${orderClass}`}
    >
      {/* Featured badge */}
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0c0a0e]/90 border border-pink-500/25 shadow-[0_4px_20px_rgba(236,72,153,0.12)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_6px_rgba(236,72,153,0.6)] animate-pulse" />
          <span className="text-[10px] font-bold text-pink-300 tracking-widest uppercase">{t('pricing.popularBadge')}</span>
        </div>
      )}

      {/* Outer gradient border wrapper */}
      <div className={`p-px rounded-[1.5rem] ${
        plan.featured
          ? 'bg-gradient-to-b from-pink-500/30 via-orange-500/15 to-pink-500/5 shadow-[0_4px_60px_rgba(236,72,153,0.10),0_0_100px_rgba(236,72,153,0.05)]'
          : plan.accent === 'violet'
            ? 'bg-gradient-to-b from-violet-500/15 via-white/[0.05] to-transparent shadow-[0_2px_30px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-b from-white/[0.1] via-white/[0.05] to-transparent shadow-[0_2px_30px_rgba(0,0,0,0.4)]'
      }`}>
        {/* Card body */}
        <div className={`rounded-[calc(1.5rem-1px)] p-8 md:p-9 flex flex-col relative overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 ${
          plan.featured
            ? 'bg-[#0c0a0e] border border-pink-500/[0.12] group-hover:border-pink-500/20 group-hover:shadow-[0_8px_60px_rgba(236,72,153,0.08)]'
            : plan.accent === 'violet'
              ? 'bg-[#0b0a0e]/95 group-hover:bg-[#0d0b10]/95 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-[#0a0a0b]/95 group-hover:bg-[#0d0d0e]/95 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
        }`}
          style={{
            transform: plan.featured ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.21, 0.47, 0.32, 0.98)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.04) translateY(-4px)' : 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.02)' : 'scale(1)';
          }}
        >
          {/* Subtle inner gradient for all cards */}
          <div className={`absolute inset-0 pointer-events-none ${
            plan.featured
              ? 'bg-gradient-to-br from-pink-500/[0.04] via-transparent to-orange-500/[0.03]'
              : plan.accent === 'violet'
                ? 'bg-gradient-to-br from-violet-500/[0.03] via-transparent to-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                : 'bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500'
          }`} />

          {/* ── Plan Header ── */}
          <div className="relative z-10 mb-7">
            <div className="flex items-center gap-3.5 mb-1">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                plan.featured
                  ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-pink-500/20'
                  : plan.accent === 'violet'
                    ? 'bg-violet-500/[0.08] border-violet-500/15 group-hover:border-violet-500/25 transition-colors duration-300'
                    : 'bg-white/[0.04] border-white/[0.07] group-hover:border-white/[0.12] transition-colors duration-300'
              }`}>
                <Icon className={`w-[18px] h-[18px] ${
                  plan.featured
                    ? 'text-pink-400'
                    : plan.accent === 'violet'
                      ? 'text-violet-400'
                      : 'text-zinc-400'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{plan.name}</h3>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">{plan.tagline}</p>
              </div>
            </div>
          </div>

          {/* ── Price ── */}
          <div className="relative z-10 mb-6">
            <PriceDisplay price={price} />
            {isYearly && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-pink-400/80 font-medium mt-2.5"
              >
                {t('pricing.savingNote')}
              </motion.p>
            )}
          </div>

          {/* ── Tokens ── */}
          <div className={`relative z-10 px-4 py-4 rounded-xl border mb-6 ${
            plan.featured
              ? 'bg-gradient-to-r from-pink-500/[0.06] to-orange-500/[0.04] border-pink-500/15'
              : plan.accent === 'violet'
                ? 'bg-violet-500/[0.03] border-violet-500/[0.08] group-hover:border-violet-500/15 transition-colors duration-300'
                : 'bg-white/[0.02] border-white/[0.05] group-hover:border-white/[0.08] transition-colors duration-300'
          }`}>
            <p className={`text-base font-bold tracking-tight ${
              plan.featured ? 'text-white' : 'text-zinc-200'
            }`}>{plan.tokens}</p>
            {plan.tokenNote && (
              <p className="text-[11px] text-zinc-500 mt-1 font-medium leading-snug">{plan.tokenNote}</p>
            )}
          </div>

          {/* ── Divider ── */}
          <div className={`h-px mb-6 ${
            plan.featured
              ? 'bg-white/[0.06]'
              : 'bg-white/[0.04]'
          }`} />

          {/* ── Features ── */}
          <ul className="flex flex-col gap-3.5 relative z-10 flex-1 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  plan.featured
                    ? 'bg-pink-500/15'
                    : plan.accent === 'violet'
                      ? 'bg-violet-500/10'
                      : 'bg-white/[0.05]'
                }`}>
                  <Check className={`w-3 h-3 ${
                    plan.featured
                      ? 'text-pink-400'
                      : plan.accent === 'violet'
                        ? 'text-violet-400'
                        : 'text-zinc-400'
                  }`} />
                </div>
                <span className="text-sm text-zinc-400 font-medium leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          <button
            onClick={() => window.location.href = 'https://app.gotoflow.io'}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-[transform,box-shadow,background-color,border-color,color] duration-300 relative overflow-hidden group/btn ${
              plan.featured
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:shadow-[0_0_40px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-[0.98]'
                : plan.accent === 'violet'
                  ? 'bg-white/[0.06] border border-violet-500/20 text-zinc-200 hover:text-white hover:bg-violet-500/[0.08] hover:border-violet-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/[0.06] border border-white/[0.1] text-zinc-200 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.18] hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {plan.featured && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            )}
            <span className="relative z-10">{t('pricing.cta')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
