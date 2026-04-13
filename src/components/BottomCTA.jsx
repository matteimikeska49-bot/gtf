import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BottomCTA — Final conversion block
   Wide-format, deep glass, button-focused
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
      style={{ background: '#040406' }}
    >
      {/* ═══════════════════════════════════
          LAYER 0 — Living gradient background
          ═══════════════════════════════════ */}

      {/* Deep blue base wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,12,35,1) 0%, rgba(4,4,6,1) 100%)',
        }}
      />

      {/* Orb A — upper-left: deep indigo/blue */}
      <motion.div
        animate={{
          x: [0, 25, -12, 18, 0],
          y: [0, -20, 8, -14, 0],
          opacity: [0.5, 0.65, 0.45, 0.6, 0.5],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[8%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0.02) 55%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Orb B — lower-right: warm rose/orange */}
      <motion.div
        animate={{
          x: [0, -18, 22, -10, 0],
          y: [0, 15, -18, 10, 0],
          opacity: [0.35, 0.5, 0.3, 0.45, 0.35],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-[10%] right-[2%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(251,146,60,0.04) 50%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      {/* Orb C — center: soft violet */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.97, 1.03, 1],
          opacity: [0.25, 0.38, 0.22, 0.32, 0.25],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)',
          filter: 'blur(130px)',
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
          {/* Card ambient glow — float effect */}
          <motion.div
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 md:-inset-6 rounded-[2.5rem] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(139,92,246,0.06) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)',
              filter: 'blur(45px)',
            }}
          />

          {/* Card surface */}
          <div
            className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(16,15,22,0.92) 0%, rgba(10,9,14,0.96) 100%)',
              backdropFilter: 'blur(60px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(60px) saturate(1.2)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: `
                0 0 0 0.5px rgba(255,255,255,0.03),
                0 50px 100px -25px rgba(0,0,0,0.5),
                0 20px 50px -15px rgba(0,0,0,0.35)
              `,
            }}
          >
            {/* Top-light refraction line */}
            <div className="absolute top-0 inset-x-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

            {/* Subtle top-down light wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 35%)',
              }}
            />

            {/* Inner focal glow — draws eye to center/button */}
            <div
              className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(236,72,153,0.04) 0%, transparent 70%)',
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
                      ? { opacity: 0.8, scale: 1.22 }
                      : { opacity: [0.18, 0.35, 0.18], scale: [0.95, 1.08, 0.95] }
                  }
                  transition={
                    btnHover
                      ? { duration: 0.3 }
                      : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute -inset-5 md:-inset-6 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(236,72,153,0.35) 0%, rgba(249,115,22,0.18) 45%, transparent 72%)',
                    filter: 'blur(24px)',
                  }}
                />

                <button
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  className="relative z-10 flex items-center justify-center gap-3 px-12 py-4.5 rounded-xl font-semibold text-white text-base overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.92) 0%, rgba(249,115,22,0.88) 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: btnHover
                      ? '0 14px 50px rgba(236,72,153,0.4), 0 6px 20px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                      : '0 4px 24px rgba(236,72,153,0.15), 0 2px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                    transform: btnHover ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
                    transition: 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ['-280%', '480%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    <div className="w-[15%] h-full skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                  </motion.div>

                  <span className="relative z-30 tracking-[0.01em]">Создать карусель</span>
                  <ArrowRight
                    className="relative z-30 w-[18px] h-[18px] transition-all duration-300"
                    style={{
                      opacity: btnHover ? 1 : 0.6,
                      transform: btnHover ? 'translateX(3px)' : 'translateX(0)',
                    }}
                  />
                </button>
              </motion.div>

              {/* 5 — Micro-trust */}
              <motion.p
                {...(inView ? stagger(4) : { initial: stagger(4).initial })}
                animate={inView ? stagger(4).animate : stagger(4).initial}
                transition={stagger(4).transition}
                className="text-[10px] text-zinc-600 font-medium tracking-[0.08em] uppercase mb-12"
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
                    className="group/pill flex items-center gap-1.5 px-3.5 py-[6px] rounded-full border border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                  >
                    <Check className="w-3 h-3 text-pink-500/50 group-hover/pill:text-pink-400/70 transition-colors duration-300 shrink-0" />
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
