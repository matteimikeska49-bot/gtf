import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

/* ─── Pricing Data ─── */
const plans = [
  {
    id: 'lite',
    name: 'LITE',
    tagline: 'Для старта',
    icon: Zap,
    monthlyPrice: 1500,
    tokens: '500 токенов',
    tokenNote: null,
    features: [
      'Карусели AI',
      'Базовые стили',
      'Безлимитное скачивание',
    ],
    featured: false,
    accent: 'zinc',
  },
  {
    id: 'pro',
    name: 'PRO',
    tagline: 'Для регулярного контента',
    icon: Crown,
    monthlyPrice: 3500,
    tokens: '1 400 токенов',
    tokenNote: 'Лучший баланс цены и объёма',
    features: [
      'Карусели AI',
      'Вирусные идеи Reels & TikTok',
      'Шпион конкурентов',
      'PRO стили (3D, Luxury)',
      'Приоритетная генерация',
      'Безлимитное скачивание',
    ],
    featured: true,
    accent: 'brand',
  },
  {
    id: 'power',
    name: 'POWER',
    tagline: 'Для масштаба и команд',
    icon: Rocket,
    monthlyPrice: 6990,
    tokens: '4 000 токенов',
    tokenNote: 'Максимальная выгода за объём',
    features: [
      'Карусели AI',
      'Вирусные идеи Reels & TikTok',
      'Шпион конкурентов',
      'Все стили',
      'Максимальная скорость генерации',
      'Приоритетная поддержка',
      'Безлимитное скачивание',
    ],
    featured: false,
    accent: 'violet',
  },
];

const DISCOUNT = 0.45;

const calcYearly = (monthly) => {
  const raw = monthly * (1 - DISCOUNT);
  // Round to nearest 10 for clean display
  return Math.round(raw / 10) * 10;
};

const formatPrice = (price) => {
  return price.toLocaleString('ru-RU');
};

/* ─── Billing Toggle ─── */
const BillingToggle = ({ isYearly, setIsYearly }) => (
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
        <span className="relative z-10">Месяц</span>
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
          Год
          <span className="text-[10px] font-bold tracking-wider uppercase text-pink-400">−45%</span>
        </span>
      </button>
    </div>
    <p className="text-xs text-zinc-600 font-medium">
      Экономия 45% при оплате за год
    </p>
  </div>
);

/* ─── Price Display with animation ─── */
const PriceDisplay = ({ price, isYearly }) => (
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
        {formatPrice(price)} ₽
      </motion.span>
    </AnimatePresence>
    <span className="text-sm text-zinc-500 font-medium">/мес</span>
  </div>
);

/* ─── Plan Card ─── */
const PlanCard = ({ plan, isYearly, index }) => {
  const price = isYearly ? calcYearly(plan.monthlyPrice) : plan.monthlyPrice;
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group ${plan.featured ? 'md:-mt-4 md:mb-4 z-20' : 'z-10'}`}
    >
      {/* Featured badge */}
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0c0a0e]/90 border border-pink-500/25 shadow-[0_4px_20px_rgba(236,72,153,0.12)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_6px_rgba(236,72,153,0.6)] animate-pulse" />
          <span className="text-[10px] font-bold text-pink-300 tracking-widest uppercase">Популярный</span>
        </div>
      )}

      {/* Outer gradient border wrapper */}
      <div className={`p-px rounded-[1.5rem] ${
        plan.featured
          ? 'bg-gradient-to-b from-pink-500/25 via-orange-500/10 to-transparent shadow-[0_0_40px_rgba(236,72,153,0.06)]'
          : plan.accent === 'violet'
            ? 'bg-gradient-to-b from-violet-500/15 via-white/[0.05] to-transparent shadow-[0_2px_30px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-b from-white/[0.1] via-white/[0.05] to-transparent shadow-[0_2px_30px_rgba(0,0,0,0.4)]'
      }`}>
        {/* Card body */}
        <div className={`rounded-[calc(1.5rem-1px)] p-8 md:p-9 flex flex-col relative overflow-hidden transition-all duration-500 ${
          plan.featured
            ? 'bg-[#0c0a0e] group-hover:shadow-[0_0_50px_rgba(236,72,153,0.06)]'
            : plan.accent === 'violet'
              ? 'bg-[#0b0a0e]/95 group-hover:bg-[#0d0b10]/95 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-[#0a0a0b]/95 group-hover:bg-[#0d0d0e]/95 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
        }`}
          style={{
            transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.21, 0.47, 0.32, 0.98)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.03)' : 'scale(1)';
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
            <PriceDisplay price={price} isYearly={isYearly} />
            {isYearly && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-pink-400/80 font-medium mt-2.5"
              >
                Экономия 45% при оплате за год
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
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 relative overflow-hidden group/btn ${
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
            <span className="relative z-10">Начать бесплатно</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Pricing Section ─── */
export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

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
            <span>Тарифы</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-balance">
              Выберите свой{' '}
              <span className="text-gradient-brand">тариф</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed text-balance font-medium">
              Начните бесплатно и масштабируйте по мере роста
            </p>
          </div>

          {/* Billing Toggle */}
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start md:items-center">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} isYearly={isYearly} index={i} />
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
          Вы можете изменить тариф в любой момент
        </motion.p>
      </div>
    </section>
  );
};
