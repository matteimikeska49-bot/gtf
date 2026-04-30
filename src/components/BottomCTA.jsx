import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BottomCTA — Final conversion block
   Wide-format, warm glass, button-focused
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TRUST = [
  'Tone of Voice сохраняется',
  'Готово за 60 секунд',
  'Подходит для любых ниш',
];

/* ── Stagger animation presets ── */
const stagger = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.12 * i, ease: [0.25, 1, 0.5, 1] },
});

export const BottomCTA = () => {
  const [btnHover, setBtnHover] = useState(false);
  const ref = useRef(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, margin: isMobile ? '0px' : '-100px' });
  const trustList = t('cta.trustList') || [];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden isolate"
      style={{ background: '#050505' }}
    >
      {/* ═══════════════════════════════════
          LAYER 0 — Deep Void Background
          ═══════════════════════════════════ */}

      {/* Base wash — absolute true black for maximum contrast, no diffuse clouds */}
      <div className="absolute inset-0 pointer-events-none bg-[#050505]" />

      {/* ═══════════════════════════════════
          CARD
          ═══════════════════════════════════ */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.6 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >

          {/* Floating glow — subtle warm halo behind card */}
          <div className="absolute -inset-6 md:-inset-10 rounded-[3rem] pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(236,72,153,0.05) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Card surface - Precision Premium Container */}
          <div
            className="group relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
              boxShadow: '0 0 30px rgba(236,72,153,0.04), 0 0 30px rgba(249,115,22,0.03), 0 1px 0 inset rgba(255,255,255,0.06), 0 40px 80px -25px rgba(0,0,0,0.8)',
            }}
          >

            {/* ─── CONTENT ─── */}
            <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 md:px-20 md:py-24 lg:px-28 lg:py-28 flex flex-col items-center text-center">

              {/* Text Block Halo (Subtle precision glow) */}
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-r from-pink-500/8 to-orange-500/5 blur-[30px] md:blur-[50px] rounded-[100%] pointer-events-none -z-10" />

              {/* 1 — Pill */}
              <motion.div
                {...(inView ? stagger(0) : { initial: stagger(0).initial })}
                animate={inView ? stagger(0).animate : stagger(0).initial}
                transition={stagger(0).transition}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-8"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="md:animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400/60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-pink-500 to-orange-400" />
                </span>
                <span className="text-[10px] font-semibold text-zinc-500 tracking-[0.1em] uppercase">
                  {t('cta.badge')}
                </span>
              </motion.div>

              {/* 2 — Headline */}
              <motion.h2
                {...(inView ? stagger(1) : { initial: stagger(1).initial })}
                animate={inView ? stagger(1).animate : stagger(1).initial}
                transition={stagger(1).transition}
                className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-6 max-w-2xl"
              >
                {t('cta.titlePart1')}
                <br />
                {t('cta.titlePart2')}{' '}
                <span className="text-gradient-brand">{t('cta.titleHighlight')}</span>
                <br />
                <span className="text-zinc-400 font-semibold" style={{ fontSize: '0.78em' }}>
                  {t('cta.titleSub')}
                </span>
              </motion.h2>

              {/* 3 — Sub */}
              <motion.p
                {...(inView ? stagger(2) : { initial: stagger(2).initial })}
                animate={inView ? stagger(2).animate : stagger(2).initial}
                transition={stagger(2).transition}
                className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg leading-[1.75] font-medium mb-12"
              >
                {t('cta.subtitle')}
              </motion.p>

              {/* 4 — BUTTON (main focus) */}
              <motion.div
                {...(inView ? stagger(3) : { initial: stagger(3).initial })}
                animate={inView ? stagger(3).animate : stagger(3).initial}
                transition={stagger(3).transition}
                className="relative group mb-5"
              >
                {/* Breathing glow */}
                <motion.div
                  animate={
                    btnHover
                      ? { opacity: 0.85, scale: 1.25 }
                      : { opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.1, 0.95] }
                  }
                  transition={
                    btnHover
                      ? { duration: 0.3 }
                      : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute -inset-5 md:-inset-7 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(236,72,153,0.38) 0%, rgba(249,115,22,0.2) 45%, transparent 72%)',
                    filter: 'blur(24px)',
                  }}
                />

                <button
                  onClick={() => window.location.href = 'https://app.gotoflow.io'}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  className="relative z-10 flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-[14px] font-semibold text-white text-[15px] overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: btnHover
                      ? '0 14px 55px rgba(236,72,153,0.5), 0 6px 24px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.25)'
                      : '0 8px 35px rgba(236,72,153,0.25), 0 3px 12px rgba(249,115,22,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
                    transform: btnHover ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ['-280%', '480%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5.5 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    <div className="w-[15%] h-full skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
                  </motion.div>

                  <span className="relative z-30 tracking-[0.01em]">{t('cta.button')}</span>
                  <ArrowRight
                    className="relative z-30 w-[17px] h-[17px] transition-all duration-300"
                    style={{
                      opacity: btnHover ? 1 : 0.65,
                      transform: btnHover ? 'translateX(3px)' : 'translateX(0)',
                    }}
                  />
                </button>
              </motion.div>

              {/* 5 — Micro-trust (larger, more readable) */}
              <motion.p
                {...(inView ? stagger(4) : { initial: stagger(4).initial })}
                animate={inView ? stagger(4).animate : stagger(4).initial}
                transition={stagger(4).transition}
                className="text-xs text-zinc-500 font-medium tracking-[0.06em] mb-12"
              >
                {t('cta.microTrust')}
              </motion.p>

              {/* 6 — Trust pills */}
              <motion.div
                {...(inView ? stagger(5) : { initial: stagger(5).initial })}
                animate={inView ? stagger(5).animate : stagger(5).initial}
                transition={stagger(5).transition}
                className="flex flex-wrap justify-center gap-2.5"
              >
                {trustList.map((text) => (
                  <div
                    key={text}
                    className="group/pill flex items-center gap-1.5 px-3.5 py-[6px] rounded-full border border-white/[0.05] bg-white/[0.02] hover:border-pink-500/15 hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                  >
                    <Check className="w-3 h-3 text-pink-500/50 group-hover/pill:text-pink-400/80 transition-colors duration-300 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] text-zinc-600 group-hover/pill:text-zinc-400 font-medium transition-colors duration-300 whitespace-nowrap">
                      {text}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
