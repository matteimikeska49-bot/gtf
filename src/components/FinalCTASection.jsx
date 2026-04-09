import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-28 md:py-36 px-6 relative w-full overflow-hidden bg-[#050505]">

      {/* ─── Deep Background Layer ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080608] to-[#050505] pointer-events-none" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* ─── Animated Glow Orbs ─── */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-pink-500/[0.12] blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] bg-violet-500/[0.10] blur-[150px] rounded-full pointer-events-none"
      />
      {/* Subtle central warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* ─── Glass Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[900px] mx-auto"
      >
        {/* Card outer glow (floating effect) */}
        <div className="absolute -inset-6 bg-gradient-to-b from-pink-500/[0.06] via-transparent to-violet-500/[0.04] blur-[40px] rounded-[4rem] pointer-events-none" />

        {/* Glass container */}
        <div className="relative bg-white/[0.04] backdrop-blur-[32px] border border-white/[0.08] rounded-[2rem] p-10 md:p-14 lg:p-16 overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Inner gradient overlay (lighter top, darker bottom) */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.05] pointer-events-none rounded-[2rem]" />
          
          {/* Subtle edge highlights */}
          <div className="absolute top-0 inset-x-0 mx-auto w-[50%] h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

          {/* ── Content ── */}
          <div className="flex flex-col items-center text-center relative z-10 gap-7">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] text-balance">
              Хватит работать{' '}
              <br className="hidden md:block" />
              <span className="text-gradient-brand">нянькой у своего AI.</span>
              <br />
              Начните создавать.
            </h2>

            {/* Subtext */}
            <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance font-medium">
              Присоединяйтесь к тысячам креаторов и предпринимателей,
              которые уже делают контент быстрее и без лишней рутины.
            </p>

            {/* ── CTA Button ── */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="relative group">
                
                {/* Breathing glow behind the button */}
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-3 bg-gradient-to-r from-pink-500/60 to-orange-500/60 rounded-full blur-[25px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-2 bg-gradient-to-r from-pink-500/40 to-orange-500/40 rounded-full blur-[18px] pointer-events-none"
                />

                {/* Button */}
                <button className="relative flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-base overflow-hidden transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:scale-[1.03] active:scale-[0.98] bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_8px_30px_rgba(236,72,153,0.25)] group-hover:shadow-[0_12px_40px_rgba(236,72,153,0.4)] border border-pink-400/20 group-hover:border-white/30 z-10">
                  
                  {/* Shine sweep */}
                  <motion.div
                    animate={{ x: ['-200%', '400%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    <div className="w-[25%] h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </motion.div>

                  <span className="relative z-30">Создать карусель</span>
                  <ArrowRight className="relative z-30 w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              <p className="text-xs text-zinc-500 font-medium">
                Бесплатно • Без привязки карты
              </p>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ─── Trust chips ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mt-10 relative z-10 px-4"
      >
        {['✓ Tone of Voice сохраняется', '✓ Готово за 60 секунд', '✓ Подходит для любых ниш'].map((chip, i) => (
          <span key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2.5 text-zinc-400 text-xs font-medium backdrop-blur-md">
            {chip}
          </span>
        ))}
      </motion.div>

    </section>
  );
};
