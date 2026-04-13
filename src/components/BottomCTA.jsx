import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BottomCTA — Premium wide-format conversion block
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TRUST_ITEMS = [
  'Tone of Voice сохраняется',
  'Готово за 60 секунд',
  'Подходит для любых ниш',
];

export const BottomCTA = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] isolate py-24 md:py-32 px-5">

      {/* ═══ BACKGROUND ORBS ═══ */}

      {/* Orb — left, soft pink */}
      <motion.div
        animate={{
          x: [0, 20, -10, 15, 0],
          y: [0, -18, 12, -8, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] -left-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Orb — right, warm orange */}
      <motion.div
        animate={{
          x: [0, -15, 20, -8, 0],
          y: [0, 14, -16, 10, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[5%] -right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
      />

      {/* ═══ MAIN CARD ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[920px] mx-auto"
      >
        {/* Ambient glow behind card — creates floating effect */}
        <div
          className="absolute -inset-6 rounded-[2.5rem] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(236,72,153,0.05) 0%, rgba(251,146,60,0.025) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Card surface */}
        <div
          className="relative rounded-[1.75rem] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(18,18,22,0.95) 0%, rgba(12,12,15,0.98) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.04),
              0 40px 80px -20px rgba(0,0,0,0.5),
              0 16px 40px -12px rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* Top edge light — thin refraction line */}
          <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

          {/* Inner subtle glow — centered behind content, no noise */}
          <div
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[50%] h-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(236,72,153,0.04) 0%, rgba(251,146,60,0.02) 50%, transparent 80%)',
              filter: 'blur(60px)',
            }}
          />

          {/* ─── CONTENT ─── */}
          <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16 md:px-20 md:py-20 flex flex-col items-center text-center">

            {/* 1. Pill label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow-[0_0_6px_rgba(236,72,153,0.5)]" />
              <span className="text-[10px] font-semibold text-zinc-500 tracking-[0.1em] uppercase">
                Начните бесплатно
              </span>
            </motion.div>

            {/* 2. Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[1.65rem] sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] font-bold text-white tracking-[-0.03em] leading-[1.15] mb-5"
            >
              Хватит работать нянькой{' '}
              <br className="hidden sm:block" />
              у своего{' '}
              <span className="text-gradient-brand">AI.</span>
              <br />
              <span className="text-zinc-400 font-semibold text-[0.8em]">
                Начните создавать.
              </span>
            </motion.h2>

            {/* 3. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm md:text-[0.9rem] text-zinc-500 max-w-md leading-[1.7] font-medium mb-10"
            >
              Присоединяйтесь к тысячам креаторов и предпринимателей,
              которые уже делают контент быстрее и без лишней рутины.
            </motion.p>

            {/* 4. CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group mb-4"
            >
              {/* Button ambient glow — breathing */}
              <motion.div
                animate={
                  hovered
                    ? { opacity: 0.75, scale: 1.18 }
                    : { opacity: [0.2, 0.38, 0.2], scale: [0.96, 1.06, 0.96] }
                }
                transition={
                  hovered
                    ? { duration: 0.3 }
                    : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                }
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(236,72,153,0.3) 0%, rgba(251,146,60,0.15) 50%, transparent 75%)',
                  filter: 'blur(20px)',
                }}
              />

              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative z-10 flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-[0.95rem] overflow-hidden cursor-pointer transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.92) 0%, rgba(249,115,22,0.88) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: hovered
                    ? '0 12px 48px rgba(236,72,153,0.35), 0 4px 16px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.18)'
                    : '0 4px 24px rgba(236,72,153,0.12), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  transform: hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
                }}
              >
                {/* Shimmer pass */}
                <motion.div
                  animate={{ x: ['-300%', '500%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <div className="w-[16%] h-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.16] to-transparent" />
                </motion.div>

                <span className="relative z-30 tracking-[0.01em]">Создать карусель</span>
                <ArrowRight className="relative z-30 w-[18px] h-[18px] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>

            {/* 5. Trust text under button */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[10px] text-zinc-600 font-medium tracking-[0.08em] uppercase mb-10"
            >
              Бесплатно • Без привязки карты
            </motion.p>

            {/* 6. Trust badges — compact, clean */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2.5"
            >
              {TRUST_ITEMS.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02]"
                >
                  <Check className="w-3 h-3 text-pink-500/60 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium whitespace-nowrap">{label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

    </section>
  );
};
