import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

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
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden isolate"
      style={{ background: '#050505' }}
    >
      {/* ═══════════════════════════════════
          LAYER 0 — Warm living background
          ═══════════════════════════════════ */}

      {/* Base wash — warm dark graphite, no blue */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(18,14,12,1) 0%, rgba(5,5,5,1) 100%)',
        }}
      />

      {/* Orb A — upper-left: warm rose */}
      <motion.div
        animate={{
          x: [0, 22, -10, 16, 0],
          y: [0, -16, 10, -12, 0],
          opacity: [0.4, 0.55, 0.35, 0.5, 0.4],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[5%] left-[8%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.02) 50%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Orb B — lower-right: warm orange-amber */}
      <motion.div
        animate={{
          x: [0, -16, 20, -8, 0],
          y: [0, 14, -15, 8, 0],
          opacity: [0.35, 0.5, 0.28, 0.42, 0.35],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-[8%] right-[5%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.09) 0%, rgba(249,115,22,0.02) 50%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      {/* Orb C — center: very soft warm pink glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.97, 1.03, 1],
          opacity: [0.2, 0.32, 0.18, 0.28, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.05) 0%, rgba(251,146,60,0.02) 40%, transparent 65%)',
          filter: 'blur(120px)',
        }}
      />

      {/* ═══════════════════════════════════
          CARD
          ═══════════════════════════════════ */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Card ambient glow — warm float effect */}
          <motion.div
            animate={{
              opacity: [0.4, 0.65, 0.4],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-5 md:-inset-8 rounded-[2.5rem] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(236,72,153,0.045) 0%, rgba(251,146,60,0.025) 40%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Card surface */}
          <div
            className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
            style={{
              background: 'linear-gradient(175deg, rgba(18,16,16,0.95) 0%, rgba(12,10,10,0.97) 50%, rgba(10,8,9,0.98) 100%)',
              backdropFilter: 'blur(60px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(60px) saturate(1.2)',
              border: '1px solid rgba(255,255,255,0.055)',
              boxShadow: `
                0 0 0 0.5px rgba(255,255,255,0.025),
                0 50px 100px -25px rgba(0,0,0,0.55),
                0 20px 50px -15px rgba(0,0,0,0.35),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `,
            }}
          >
            {/* ── Top-light refraction line ── */}
            <div className="absolute top-0 inset-x-[12%] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

            {/* ── Animated border light sweep ── */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[1px] rounded-[inherit] pointer-events-none overflow-hidden"
              style={{ zIndex: 0 }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(236,72,153,0.12) 82%, rgba(251,146,60,0.1) 88%, transparent 95%, transparent 100%)',
                }}
              />
            </motion.div>

            {/* Re-fill interior so rotating border only shows at edge */}
            <div
              className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2rem-1px)] pointer-events-none"
              style={{
                background: 'linear-gradient(175deg, rgba(18,16,16,0.99) 0%, rgba(12,10,10,1) 50%, rgba(10,8,9,1) 100%)',
              }}
            />

            {/* Subtle top-down light wash */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 30%)',
              }}
            />

            {/* Inner warm focal glow — draws eye toward button */}
            <div
              className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[45%] h-[35%] pointer-events-none z-[1]"
              style={{
                background: 'radial-gradient(ellipse, rgba(236,72,153,0.035) 0%, rgba(251,146,60,0.015) 40%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            {/* ─── CONTENT ─── */}
            <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 md:px-20 md:py-24 lg:px-28 lg:py-28 flex flex-col items-center text-center">

              {/* 1 — Pill */}
              <motion.div
                {...(inView ? stagger(0) : { initial: stagger(0).initial })}
                animate={inView ? stagger(0).animate : stagger(0).initial}
                transition={stagger(0).transition}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-8"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400/60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-pink-500 to-orange-400" />
                </span>
                <span className="text-[10px] font-semibold text-zinc-500 tracking-[0.1em] uppercase">
                  Начните бесплатно
                </span>
              </motion.div>

              {/* 2 — Headline */}
              <motion.h2
                {...(inView ? stagger(1) : { initial: stagger(1).initial })}
                animate={inView ? stagger(1).animate : stagger(1).initial}
                transition={stagger(1).transition}
                className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-6 max-w-2xl"
              >
                Хватит работать нянькой
                <br />
                у своего{' '}
                <span className="text-gradient-brand">AI.</span>
                <br />
                <span className="text-zinc-400 font-semibold" style={{ fontSize: '0.78em' }}>
                  Начните создавать.
                </span>
              </motion.h2>

              {/* 3 — Sub */}
              <motion.p
                {...(inView ? stagger(2) : { initial: stagger(2).initial })}
                animate={inView ? stagger(2).animate : stagger(2).initial}
                transition={stagger(2).transition}
                className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg leading-[1.75] font-medium mb-12"
              >
                Присоединяйтесь к тысячам креаторов и предпринимателей,
                которые уже делают контент быстрее и без лишней рутины.
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
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  className="relative z-10 flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-[14px] font-semibold text-white text-[15px] overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.94) 0%, rgba(249,115,22,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: btnHover
                      ? '0 14px 50px rgba(236,72,153,0.4), 0 6px 20px rgba(249,115,22,0.22), inset 0 1px 0 rgba(255,255,255,0.22)'
                      : '0 6px 30px rgba(236,72,153,0.18), 0 2px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
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

                  <span className="relative z-30 tracking-[0.01em]">Создать карусель</span>
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
                Бесплатно • Без привязки карты
              </motion.p>

              {/* 6 — Trust pills */}
              <motion.div
                {...(inView ? stagger(5) : { initial: stagger(5).initial })}
                animate={inView ? stagger(5).animate : stagger(5).initial}
                transition={stagger(5).transition}
                className="flex flex-wrap justify-center gap-2.5"
              >
                {TRUST.map((text) => (
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
