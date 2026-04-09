import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-32 md:py-40 px-6 relative w-full overflow-hidden bg-[#030303]">

      {/* ─── Absolute dark base ─── */}
      <div className="absolute inset-0 bg-[#030303] pointer-events-none" />

      {/* Noise grain layer */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }} />

      {/* ─── Deep ambient light sources (very subtle) ─── */}
      {/* Left: warm pink — drifts slowly */}
      <motion.div
        animate={{ x: [0, 15, -10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-pink-600/[0.06] blur-[200px] rounded-full pointer-events-none"
      />
      {/* Right: cool violet — counter-drifts */}
      <motion.div
        animate={{ x: [0, -12, 18, 0], y: [0, 15, -8, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-violet-600/[0.05] blur-[200px] rounded-full pointer-events-none"
      />
      {/* Center: barely-there warm accent */}
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/[0.04] blur-[180px] rounded-full pointer-events-none"
      />

      {/* ─── Glass Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-[860px] mx-auto"
      >
        {/* Outer ambient glow — creates the "floating" feeling */}
        <div className="absolute -inset-8 rounded-[3.5rem] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(236,72,153,0.05) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Glass panel */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.7)]"
          style={{ backdropFilter: 'blur(40px)' }}
        >
          {/* Dark glass fill */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] to-white/[0.008] pointer-events-none" />
          
          {/* Top edge light reflection */}
          <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

          {/* Bottom faint reflection */}
          <div className="absolute bottom-0 left-[30%] right-[30%] h-px bg-gradient-to-r from-transparent via-pink-400/[0.06] to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 md:px-16 md:py-20 gap-8">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold text-white tracking-tight leading-[1.2] text-balance max-w-2xl">
              Хватит работать
              <br className="hidden md:block" />
              {' '}нянькой у своего{' '}
              <span className="text-gradient-brand">AI.</span>
              <br />
              Начните создавать.
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-zinc-500 max-w-md leading-relaxed text-balance font-medium">
              Присоединяйтесь к тысячам креаторов и предпринимателей,
              которые уже делают контент быстрее и без лишней рутины.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3.5 mt-2">
              <div className="relative group">
                
                {/* Idle breathing glow — very soft */}
                <motion.div
                  animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.97, 1.03, 0.97] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-2.5 bg-gradient-to-r from-pink-500/50 to-orange-500/50 rounded-full blur-[22px] pointer-events-none group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                />

                {/* Button */}
                <button className="relative flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-[0.95rem] overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] active:scale-[0.98] bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_6px_25px_rgba(236,72,153,0.2)] group-hover:shadow-[0_10px_35px_rgba(236,72,153,0.35)] border border-white/[0.15] group-hover:border-white/25 z-10">
                  
                  {/* Shine sweep */}
                  <motion.div
                    animate={{ x: ['-220%', '420%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    <div className="w-[20%] h-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </motion.div>

                  <span className="relative z-30">Создать карусель</span>
                  <ArrowRight className="relative z-30 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              <p className="text-[11px] text-zinc-600 font-medium tracking-wide">
                Бесплатно • Без привязки карты
              </p>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ─── Trust chips ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mt-12 relative z-10 px-4"
      >
        {['✓ Tone of Voice сохраняется', '✓ Готово за 60 секунд', '✓ Подходит для любых ниш'].map((chip, i) => (
          <span key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-full px-5 py-2 text-zinc-600 text-[11px] font-medium">
            {chip}
          </span>
        ))}
      </motion.div>

    </section>
  );
};
