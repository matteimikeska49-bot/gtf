import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BottomCTA — Premium glass conversion block
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TRUST_ITEMS = [
  'Tone of Voice сохраняется',
  'Готово за 60 секунд',
  'Подходит для любых ниш',
];

export const BottomCTA = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] isolate py-28 md:py-36 px-5">

      {/* ═══ BACKGROUND LAYER ═══ */}

      {/* Orb 1 — top-left, pink-magenta */}
      <motion.div
        animate={{
          x: [0, 30, -15, 20, 0],
          y: [0, -25, 15, -10, 0],
          scale: [1, 1.12, 0.94, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[10%] -left-[8%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Orb 2 — bottom-right, orange-amber */}
      <motion.div
        animate={{
          x: [0, -20, 25, -10, 0],
          y: [0, 20, -20, 12, 0],
          scale: [1, 0.95, 1.1, 0.97, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-[15%] -right-[10%] w-[550px] h-[550px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.16) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)',
          filter: 'blur(110px)',
        }}
      />

      {/* Orb 3 — center, purple accent */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.96, 1.04, 1],
          opacity: [0.3, 0.45, 0.28, 0.4, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Noise grain — very subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.028] mix-blend-overlay" aria-hidden="true">
        <filter id="bottomcta-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bottomcta-noise)" />
      </svg>

      {/* ═══ MAIN CARD ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[680px] mx-auto"
      >
        {/* Ambient glow behind the card */}
        <div
          className="absolute -inset-10 rounded-[3.5rem] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(236,72,153,0.07) 0%, rgba(251,146,60,0.04) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Glass card */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 40%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(50px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(50px) saturate(1.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.03),
              0 30px 100px -20px rgba(0,0,0,0.55),
              0 10px 40px -10px rgba(0,0,0,0.35),
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -1px 0 rgba(255,255,255,0.02)
            `,
          }}
        >
          {/* Top edge highlight */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

          {/* Shimmer sweep — slow, subtle */}
          <motion.div
            animate={{ x: ['-200%', '400%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 8 }}
            className="absolute inset-0 pointer-events-none z-30"
          >
            <div
              className="w-[25%] h-full skew-x-[-18deg]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
              }}
            />
          </motion.div>

          {/* Inner gradient wash — pink→orange at low opacity */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              background: 'linear-gradient(145deg, rgba(236,72,153,0.6) 0%, rgba(251,146,60,0.4) 50%, transparent 80%)',
            }}
          />

          {/* ─── CONTENT ─── */}
          <div className="relative z-10 px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 flex flex-col items-center text-center">

            {/* 1. Pill label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_6px_rgba(236,72,153,0.6)]" />
              <span className="text-[11px] font-semibold text-zinc-400 tracking-[0.08em] uppercase">
                Начните бесплатно
              </span>
            </motion.div>

            {/* 2. Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[1.7rem] sm:text-3xl md:text-4xl lg:text-[2.7rem] font-bold text-white tracking-[-0.03em] leading-[1.18] mb-6"
            >
              Хватит работать{'\n'}нянькой у своего{' '}
              <span
                className="bg-clip-text [-webkit-text-fill-color:transparent]"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
                }}
              >
                AI.
              </span>
              <br />
              <span className="text-zinc-400 font-semibold text-[0.82em]">
                Начните создавать.
              </span>
            </motion.h2>

            {/* 3. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[0.85rem] md:text-[0.92rem] text-zinc-500 max-w-[26rem] leading-[1.7] font-medium mb-10"
            >
              Присоединяйтесь к тысячам креаторов и предпринимателей,
              которые уже делают контент быстрее и без лишней рутины.
            </motion.p>

            {/* 4. CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative group mb-4"
            >
              {/* Button glow — breathing */}
              <motion.div
                animate={
                  hovered
                    ? { opacity: 0.7, scale: 1.2 }
                    : { opacity: [0.25, 0.4, 0.25], scale: [0.97, 1.05, 0.97] }
                }
                transition={
                  hovered
                    ? { duration: 0.35 }
                    : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                }
                className="absolute -inset-5 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(236,72,153,0.35) 0%, rgba(251,146,60,0.18) 50%, transparent 75%)',
                  filter: 'blur(22px)',
                }}
              />

              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative z-10 flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-[0.95rem] overflow-hidden cursor-pointer transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.9) 0%, rgba(249,115,22,0.85) 100%)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  boxShadow: hovered
                    ? '0 10px 50px rgba(236,72,153,0.35), 0 4px 16px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.18)'
                    : '0 4px 28px rgba(236,72,153,0.15), 0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
                  transform: hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
                }}
              >
                {/* Shimmer pass on button */}
                <motion.div
                  animate={{ x: ['-300%', '500%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5.5 }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <div className="w-[18%] h-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                </motion.div>

                <span className="relative z-30 tracking-[0.015em]">Создать карусель</span>
                <ArrowRight className="relative z-30 w-[18px] h-[18px] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>

            {/* 5. Trust text under button */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-[11px] text-zinc-600 font-medium tracking-[0.06em] uppercase mb-10"
            >
              Бесплатно • Без привязки карты
            </motion.p>

            {/* 6. Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {TRUST_ITEMS.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03]"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center border border-pink-500/20">
                    <Check className="w-2.5 h-2.5 text-pink-400" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

    </section>
  );
};
