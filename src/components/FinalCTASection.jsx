import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#020202] isolate">
      {/* Massive vertical breathing room — the "void" effect */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] py-32 md:py-40 px-6">

        {/* ─── Background: Architectural Light Composition ─── */}

        {/* 1. Radial dot grid — spatial depth anchor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 55%, black 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 55%, black 0%, transparent 70%)',
          }}
        />

        {/* 2. Central light pool — emanates UP from beneath the CTA */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none">
          <motion.div
            animate={{ opacity: [0.5, 0.7, 0.5], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(236,72,153,0.08) 0%, rgba(168,85,247,0.04) 35%, transparent 65%)',
            }}
          />
          {/* Warm inner core */}
          <motion.div
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px]"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* 3. Horizon light line — the "stage edge" */}
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-px pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-pink-500/15 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[1px]" />
          {/* Upward bloom from the line */}
          <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[80%] h-[60px]"
            style={{
              background: 'linear-gradient(to top, rgba(236,72,153,0.04) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* 4. Subtle side accents — depth framing */}
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[25%] left-0 w-[300px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 0% 50%, rgba(168,85,247,0.06) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[30%] right-0 w-[250px] h-[350px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 100% 50%, rgba(236,72,153,0.05) 0%, transparent 70%)',
          }}
        />

        {/* ─── Content: Floating in the void ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto"
        >

          {/* Heading — clean, architectural typography */}
          <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-[-0.02em] leading-[1.15] mb-7">
            Хватит работать
            <br />
            нянькой у своего{' '}
            <span className="text-gradient-brand">AI.</span>
            <br />
            <span className="text-zinc-400 font-semibold">Начните создавать.</span>
          </h2>

          {/* Subtext — deliberately quieter */}
          <p className="text-sm md:text-[0.95rem] text-zinc-500 max-w-md leading-relaxed text-balance font-medium mb-10">
            Присоединяйтесь к тысячам креаторов и предпринимателей,
            которые уже делают контент быстрее и без лишней рутины.
          </p>

          {/* ── CTA Button ── */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              
              {/* Idle ambient glow — extremely subtle pulse */}
              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full pointer-events-none transition-all duration-700 group-hover:opacity-60 group-hover:scale-110"
                style={{
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,0.4) 0%, rgba(251,146,60,0.2) 50%, transparent 80%)',
                  filter: 'blur(20px)',
                }}
              />

              {/* The button itself */}
              <button className="relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white text-[0.9rem] overflow-hidden transition-all duration-400 ease-out group-hover:scale-[1.03] group-hover:-translate-y-px active:scale-[0.98] z-10 border border-white/[0.12] group-hover:border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.9) 0%, rgba(249,115,22,0.85) 100%)',
                  boxShadow: '0 4px 20px rgba(236,72,153,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                {/* Shine pass — long delay, very subtle */}
                <motion.div
                  animate={{ x: ['-250%', '450%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <div className="w-[15%] h-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>

                <span className="relative z-30 tracking-wide">Создать карусель</span>
                <ArrowRight className="relative z-30 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-600 font-medium tracking-[0.04em]">
              Бесплатно • Без привязки карты
            </p>
          </div>

        </motion.div>

        {/* ─── Trust signals — barely there ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-20 flex flex-wrap justify-center gap-6 mt-16 text-[11px] text-zinc-700 font-medium tracking-wide"
        >
          <span>✓ Tone of Voice сохраняется</span>
          <span>✓ Готово за 60 секунд</span>
          <span>✓ Подходит для любых ниш</span>
        </motion.div>

      </div>
    </section>
  );
};
