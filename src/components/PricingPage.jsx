import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Zap, Rocket, Shield, CreditCard, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { BillingToggle } from './pricing/BillingToggle';
import { PlanCard } from './pricing/PlanCard';
import { useLanguage } from '../context/LanguageContext';

/* ── SEO Head ── */
const PricingSEOHead = () => {
  useEffect(() => {
    const title = 'GoToFlow Pricing — AI Carousel Maker and AI Content Generator';
    const desc = 'Choose a GoToFlow plan for AI carousel generation, social media content creation, and AI-powered content workflows. Cancel anytime.';
    document.title = title;

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };

    const setLink = (rel, href, extra = {}) => {
      const sel = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel); el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };

    setMeta('title', title);
    setMeta('description', desc);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', 'https://gotoflow.io/pricing', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', desc, true);

    setLink('canonical', 'https://gotoflow.io/pricing');
    document.documentElement.lang = 'en';

    return () => { document.title = 'GoToFlow'; };
  }, []);

  return null;
};

/* ── FAQ Item (always visible) ── */
const FAQItem = ({ question, answer }) => (
  <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02] px-5 py-4">
    <p className="text-sm font-semibold text-zinc-200 mb-2">{question}</p>
    <p className="text-sm text-zinc-400 leading-relaxed">{answer}</p>
  </div>
);

/* ── Info Block ── */
const InfoBlock = ({ icon: Icon, title, children }) => (
  <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
    <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/15 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-pink-400/80" />
    </div>
    <div>
      <h3 className="text-sm font-bold text-zinc-200 mb-1.5">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{children}</p>
    </div>
  </div>
);

/* ── Main PricingPage ── */
export const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { t, lang } = useLanguage();
  const rawPlans = t('pricing.plans') || [];

  const plans = [
    {
      id: 'lite',
      name: 'LITE',
      tagline: rawPlans[0]?.tagline || '',
      icon: Zap,
      monthlyPrice: 1500,
      tokens: rawPlans[0]?.tokens || '',
      tokenNote: rawPlans[0]?.tokenNote || null,
      features: rawPlans[0]?.features || [],
      featured: false,
      accent: 'zinc',
    },
    {
      id: 'pro',
      name: 'PRO',
      tagline: rawPlans[1]?.tagline || '',
      icon: Crown,
      monthlyPrice: 3500,
      tokens: rawPlans[1]?.tokens || '',
      tokenNote: rawPlans[1]?.tokenNote || null,
      features: rawPlans[1]?.features || [],
      featured: true,
      accent: 'brand',
    },
    {
      id: 'power',
      name: 'POWER',
      tagline: rawPlans[2]?.tagline || '',
      icon: Rocket,
      monthlyPrice: 6990,
      tokens: rawPlans[2]?.tokens || '',
      tokenNote: rawPlans[2]?.tokenNote || null,
      features: rawPlans[2]?.features || [],
      featured: false,
      accent: 'violet',
    },
  ];

  const faqs = [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. You can cancel your subscription anytime. Cancellation stops future renewals, and access remains available until the end of the paid billing period.',
    },
    {
      q: 'Do I get access immediately?',
      a: 'Yes. After successful payment, your account receives access to the selected plan and digital features.',
    },
    {
      q: 'Are payments recurring?',
      a: 'Yes. Paid plans renew automatically according to the selected billing period unless cancelled before renewal.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Refund requests are reviewed individually according to our Refund & Cancellation Policy and applicable consumer protection laws.',
    },
  ];

  return (
    <div className="text-white min-h-screen relative overflow-clip font-sans">
      <PricingSEOHead />
      <Header />

      <main className="pt-28 md:pt-32 pb-16 md:pb-24 relative z-10 w-full bg-[#050505] flex-1">
        {/* ── Hero ── */}
        <section className="px-4 md:px-6 mb-16 md:mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/15 bg-pink-500/[0.06] text-pink-300 text-xs tracking-widest uppercase font-bold backdrop-blur-md mb-6">
                <Crown className="w-3.5 h-3.5" />
                <span>Pricing</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                GoToFlow{' '}
                <span className="text-gradient-brand">Pricing</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium mb-6">
                Choose a plan for AI carousel generation, content creation, and faster social media workflows.
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Cancel anytime · Secure payment · Digital access after payment
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Billing Toggle ── */}
        <section className="px-4 md:px-6 mb-10 md:mb-14">
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </section>

        {/* ── Pricing Cards ── */}
        <section className="px-4 md:px-6 mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start md:items-center">
              {plans.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} isYearly={isYearly} index={i} t={t} lang={lang} />
              ))}
            </div>
            <p className="text-center text-xs text-zinc-600 font-medium mt-10">
              {t('pricing.bottomNote')}
            </p>
          </div>
        </section>

        {/* ── Info Blocks ── */}
        <section className="px-4 md:px-6 mb-16 md:mb-20">
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <InfoBlock icon={CreditCard} title="Payment & Access">
              After successful payment, your GoToFlow account receives access to the selected plan and digital features. You can start using the service after payment confirmation.
            </InfoBlock>

            <InfoBlock icon={RefreshCw} title="Subscription Renewal">
              Subscriptions renew automatically at the end of each billing period unless cancelled before the next renewal date. You can cancel your subscription anytime through your account or by contacting support at gotoflow.io@gmail.com.
            </InfoBlock>

            <InfoBlock icon={Shield} title="Refund Policy">
              GoToFlow is a digital SaaS service. Refund requests are reviewed individually. Once digital access has been provided and paid features have been used, refunds may be limited except where required by applicable law.{' '}
              <Link to="/refund-policy" className="text-pink-400/80 hover:text-pink-300 underline underline-offset-2 transition-colors duration-200">
                Refund & Cancellation Policy
              </Link>
            </InfoBlock>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 md:px-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};
