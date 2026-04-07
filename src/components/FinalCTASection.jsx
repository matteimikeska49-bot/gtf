import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505]">

      {/* ─── Мягкое фоновое свечение секции ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[110%] h-[120%] bg-gradient-to-r from-violet-700/30 via-fuchsia-700/25 to-violet-700/30 blur-[120px] md:blur-[180px] pointer-events-none -z-10 rounded-full" />

      {/* ─── Главная стеклянная капсула (Шире и глубже) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-6xl mx-auto bg-[#070314] backdrop-blur-3xl border border-white/[0.08] p-10 md:p-20 lg:py-28 flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* === БОГАТЫЙ ТЁМНЫЙ ФОН И ГЛУБИНА === */}
        {/* Базовая глубина */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070314] via-[#09031c] to-[#04010a] -z-20" />
        
        {/* Легкая сетка для ощущения масштаба и технологичности */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-20" />

        {/* Окружающий ambient core glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,30,150,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />

        {/* ─── Светящиеся атмосферные лучи / арки (Нижний горизонт) ─── */}
        <div className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[60%] bg-gradient-to-tr from-violet-600/30 via-fuchsia-600/10 to-transparent rounded-[100%] rotate-12 blur-[60px] md:blur-[90px] mix-blend-screen pointer-events-none -z-10" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[60%] bg-gradient-to-tl from-pink-600/25 via-purple-600/10 to-transparent rounded-[100%] -rotate-12 blur-[60px] md:blur-[90px] mix-blend-screen pointer-events-none -z-10" />

        {/* Массивное теплое свечение из-под обреза капсулы */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.3)_0%,rgba(236,72,153,0.15)_40%,transparent_70%)] blur-[50px] mix-blend-screen pointer-events-none -z-10" />

        {/* Тонкие световые акценты (High-fidelity lines) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent shadow-[0_-5px_30px_rgba(236,72,153,1)] -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-[2px] -z-10" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent -z-10" />

        {/* ─── Звездные/Атмосферные частицы (Многослойный SVG) ─── */}
        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-lighten pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFF">
            <circle cx="15%" cy="30%" r="1" opacity="0.4" />
            <circle cx="85%" cy="20%" r="1" opacity="0.6" />
            <circle cx="75%" cy="65%" r="1.5" fill="#f472b6" opacity="0.4" className="animate-pulse" />
            <circle cx="20%" cy="75%" r="1" opacity="0.3" />
            <circle cx="50%" cy="10%" r="1.5" fill="#c084fc" opacity="0.5" />
            <circle cx="10%" cy="50%" r="1.5" opacity="0.3" />
            <circle cx="88%" cy="75%" r="1" opacity="0.5" className="animate-pulse" />
            <circle cx="45%" cy="85%" r="2" fill="#ec4899" opacity="0.3" className="animate-[pulse_3s_ease-in-out_infinite]" />
            <circle cx="60%" cy="40%" r="1" opacity="0.4" />
          </g>
        </svg>

        {/* === КОНТЕНТ (Увеличенная ширина для десктопа) === */}
        <div className="flex flex-col items-center gap-8 relative z-20 w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.12] bg-[#ffffff08] text-zinc-200 text-xs tracking-[0.15em] uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Начните бесплатно сегодня</span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mx-auto mt-2">
            <h2 className="text-4xl md:text-5xl lg:text-[4.2rem] font-bold text-white tracking-tight leading-[1.05] text-balance">
              Хватит работать{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                нянькой у своего AI.
              </span>
              <br className="hidden md:block" />
              {' '}Начните создавать.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed text-balance mt-4">
            Присоединяйтесь к создателям контента нового поколения, которые уже экономят часы и создают контент, звучащий как они сами.
          </p>

          {/* CTA Button & Note */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-semibold text-white text-lg group transition-transform duration-500 ease-out hover:scale-[1.03] active:scale-[0.98]">
              {/* Премиальное "дыхание" света за кнопкой */}
              <div className="absolute inset-[-4px] bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 group-hover:inset-[-8px] transition-all duration-700 ease-out animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              
              {/* Поверхность кнопки */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-600 rounded-full border border-white/20 z-10 shadow-[inset_0_1px_rgba(255,255,255,0.3)]" />
              
              <span className="relative z-30 tracking-wide drop-shadow-md">Запустить бесплатно</span>
              <ArrowRight className="relative z-30 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <p className="text-sm text-zinc-500/80 font-medium mt-1">
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
        className="flex flex-wrap justify-center gap-5 mt-12 relative z-10 px-4"
      >
        {['✓ Tone of Voice сохраняется', '✓ Готово за 3 шага', '✓ Все соцсети'].map((chip, i) => (
          <span key={i} className="bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 text-zinc-300 flex items-center gap-2.5 backdrop-blur-md text-sm font-medium shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {chip}
          </span>
        ))}
      </motion.div>

    </section>
  );
};
