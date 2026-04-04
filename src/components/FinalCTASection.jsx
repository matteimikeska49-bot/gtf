import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-zinc-950 border-t border-white/[0.04]">

      {/* ─── Огромное радиальное свечение — розово-оранжевый взрыв ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-radial from-pink-600/20 via-orange-600/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs tracking-widest uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Начните бесплатно сегодня</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              Хватит работать{' '}
              <span className="text-gradient-brand">нянькой у своего AI.</span>
              <br className="hidden md:block" />
              Начните создавать.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">
            Присоединяйтесь к создателям контента нового поколения, которые уже экономят часы и создают контент, звучащий как они сами.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-white text-lg bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_50px_rgba(236,72,153,0.45)] hover:shadow-[0_0_80px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group border border-pink-400/20 relative overflow-hidden">
            {/* Inner shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-full" />
            <span className="relative z-10">Запустить бесплатно</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
          <p className="text-sm text-zinc-500 font-medium">
            Бесплатно · Без карты
          </p>
        </motion.div>

        {/* Social proof chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-2"
        >
          {['✓ Tone of Voice сохраняется', '✓ Готово за 3 шага', '✓ Все соцсети'].map((chip, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-zinc-500 text-xs font-medium backdrop-blur-sm">
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
