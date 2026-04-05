import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505]">
      
      {/* ─── Мощный широкий Glow позади капсулы ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[110%] h-[120%] bg-gradient-to-r from-red-600/50 via-orange-500/40 to-purple-600/50 blur-[100px] md:blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* ─── Главная стеклянная капсула ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-5xl mx-auto bg-[#050505]/60 backdrop-blur-3xl border border-white/10 p-10 md:p-16 lg:py-20 flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl"
      >
        {/* Легкий белый блик сверху капсулы */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col items-center gap-8 relative z-10 w-full">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-sm tracking-widest uppercase font-bold backdrop-blur-md">
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

          {/* CTA Button & Note */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-white text-lg bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:from-rose-400 hover:to-orange-400 hover:shadow-[0_0_45px_rgba(244,63,94,0.5)] active:scale-[0.98] hover:scale-[1.02] transition-all duration-300 group">
              <span>Запустить бесплатно</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-zinc-500 font-medium">
              Бесплатно · Без карты
            </p>
          </div>

        </div>
      </motion.div>

      {/* ─── Нижние плашки с фичами (под капсулой) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mt-8 relative z-10 px-4"
      >
        {['✓ Tone of Voice сохраняется', '✓ Готово за 3 шага', '✓ Все соцсети'].map((chip, i) => (
          <span key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 text-zinc-300 flex items-center gap-2 backdrop-blur-md text-sm">
            {chip}
          </span>
        ))}
      </motion.div>

    </section>
  );
};
