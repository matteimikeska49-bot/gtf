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
  <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md w-fit mx-auto">
    <button
      onClick={() => setIsYearly(false)}
      className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${
        !isYearly
          ? 'text-white'
          : 'text-zinc-500 hover:text-zinc-300'
      }`}
    >
      {!isYearly && (
        <motion.div
          layoutId="billing-pill"
          className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">Месяц</span>
    </button>
    <button
      onClick={() => setIsYearly(true)}
      className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${
        isYearly
          ? 'text-white'
          : 'text-zinc-500 hover:text-zinc-300'
      }`}
    >
      {isYearly && (
        <motion.div
          layoutId="billing-pill"
          className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        Год
        <span className="text-[10px] font-bold tracking-wider uppercase text-pink-400">−45%</span>
      </span>
    </button>
  </div>
);

/* ─── Price Display with animation ─── */
const PriceDisplay = ({ price, isYearly }) => (
  <div className="flex items-baseline gap-1.5">
    <AnimatePresence mode="wait">
      <motion.span
        key={price}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="text-4xl md:text-5xl font-bold text-white tracking-tight"
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
          : 'bg-gradient-to-b from-white/[0.08] to-transparent'
      }`}>
        {/* Card body */}
        <div className={`rounded-[calc(1.5rem-1px)] p-7 md:p-8 flex flex-col gap-7 relative overflow-hidden transition-all duration-500 ${
          plan.featured
            ? 'bg-[#0c0a0e] group-hover:shadow-[0_0_50px_rgba(236,72,153,0.06)]'
            : 'bg-[#0a0a0a]/90 group-hover:bg-[#0c0c0c]/90'
        }`}
          style={{
            transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = plan.featured ? 'scale(1.03)' : 'scale(1)';
          }}
        >
          {/* Subtle background gradient */}
          {plan.featured && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.04] via-transparent to-orange-500/[0.03] pointer-events-none" />
          )}

          {/* Plan Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                plan.featured
                  ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-pink-500/20'
                  : plan.accent === 'violet'
                    ? 'bg-violet-500/10 border-violet-500/15'
                    : 'bg-white/[0.03] border-white/[0.06]'
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  plan.featured
                    ? 'text-pink-400'
                    : plan.accent === 'violet'
                      ? 'text-violet-400'
                      : 'text-zinc-400'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
                <p className="text-xs text-zinc-500 font-medium">{plan.tagline}</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="relative z-10">
            <PriceDisplay price={price} isYearly={isYearly} />
            {isYearly && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-pink-400/80 font-medium mt-2"
              >
                Экономия 45% при оплате за год
              </motion.p>
            )}
          </div>

          {/* Tokens */}
          <div className={`relative z-10 px-4 py-3 rounded-xl border ${
            plan.featured
              ? 'bg-gradient-to-r from-pink-500/[0.06] to-orange-500/[0.04] border-pink-500/15'
              : plan.accent === 'violet'
                ? 'bg-violet-500/[0.04] border-violet-500/10'
                : 'bg-white/[0.02] border-white/[0.04]'
          }`}>
            <p className="text-sm font-bold text-white">{plan.tokens}</p>
            {plan.tokenNote && (
              <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">{plan.tokenNote}</p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.04]" />

          {/* Features */}
          <ul className="flex flex-col gap-3 relative z-10 flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  plan.featured
                    ? 'bg-pink-500/15'
                    : plan.accent === 'violet'
                      ? 'bg-violet-500/10'
                      : 'bg-white/[0.04]'
                }`}>
                  <Check className={`w-3 h-3 ${
                    plan.featured
                      ? 'text-pink-400'
                      : plan.accent === 'violet'
                        ? 'text-violet-400'
                        : 'text-zinc-500'
                  }`} />
                </div>
                <span className="text-sm text-zinc-400 font-medium leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 relative overflow-hidden group/btn ${
              plan.featured
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:shadow-[0_0_40px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-[0.98]'
                : plan.accent === 'violet'
                  ? 'bg-white/[0.06] border border-violet-500/15 text-white hover:bg-violet-500/10 hover:border-violet-500/25 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.15] hover:scale-[1.02] active:scale-[0.98]'
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
          className="text-center mb-12 flex flex-col items-center gap-6"
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
      </div>
    </section>
  );
};
