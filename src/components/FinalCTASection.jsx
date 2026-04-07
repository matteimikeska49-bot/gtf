import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505]">

      {/* ─── Мягкое фоновое свечение секции (Теплое, фирменное) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[110%] h-[120%] bg-gradient-to-r from-rose-500/20 via-pink-600/15 to-orange-500/20 blur-[120px] md:blur-[180px] pointer-events-none -z-10 rounded-full" />

      {/* ─── Главная стеклянная капсула (Более собранная, max-w-5xl) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1100px] mx-auto backdrop-blur-3xl border border-white/[0.08] p-10 md:p-14 lg:p-16 xl:py-20 flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* === БОГАТЫЙ ТЁМНЫЙ ФОН В ФИРМЕННЫХ ЦВЕТАХ === */}
        {/* Базовая глубина (Тёплый сверхтёмный цвет) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0505] via-[#0d0508] to-[#070303] -z-20" />
        
        {/* Легкая деликатная сетка для ощущения масштаба и Premium-стиля */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.35] -z-20" />

        {/* Ambient base glow из центра */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(159,18,57,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />

        {/* ─── Анимированные атмосферные лучи / арки (Нижний горизонт) ─── */}
        {/* Левое крыло: Magenta/Pink */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[60%] bg-gradient-to-tr from-pink-600/30 via-rose-500/10 to-transparent rounded-[100%] rotate-12 blur-[70px] md:blur-[100px] mix-blend-screen pointer-events-none -z-10" 
        />
        {/* Правое крыло: Pink/Orange */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[60%] bg-gradient-to-tl from-orange-500/25 via-pink-600/10 to-transparent rounded-[100%] -rotate-12 blur-[70px] md:blur-[100px] mix-blend-screen pointer-events-none -z-10" 
        />

        {/* Центральное насыщенное теплое свечение, анимированное */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.35)_0%,rgba(249,115,22,0.15)_40%,transparent_70%)] blur-[50px] mix-blend-screen pointer-events-none -z-10" 
        />

        {/* Тонкие световые акценты (High-fidelity lines) - Теплые */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-rose-400/80 to-transparent shadow-[0_-5px_30px_rgba(244,63,94,0.8)] -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35%] h-[2px] bg-gradient-to-r from-transparent via-orange-300 to-transparent blur-[2px] -z-10" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-300/20 to-transparent -z-10" />

        {/* ─── Звездные/Атмосферные частицы (Многослойный SVG) ─── */}
        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-lighten pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFF">
            <circle cx="15%" cy="30%" r="1" opacity="0.3" />
            <circle cx="85%" cy="20%" r="1" opacity="0.5" />
            <circle cx="75%" cy="65%" r="1.5" fill="#f43f5e" opacity="0.4" className="animate-pulse" />
            <circle cx="20%" cy="75%" r="1" opacity="0.3" />
            <circle cx="50%" cy="10%" r="1.5" fill="#f97316" opacity="0.4" />
            <circle cx="10%" cy="50%" r="1.5" opacity="0.3" />
            <circle cx="88%" cy="75%" r="1" opacity="0.5" className="animate-pulse" />
            <circle cx="45%" cy="85%" r="2" fill="#ec4899" opacity="0.3" className="animate-[pulse_3s_ease-in-out_infinite]" />
            <circle cx="60%" cy="40%" r="1" opacity="0.4" />
          </g>
        </svg>

        {/* === КОНТЕНТ (Собранная композиция) === */}
        <div className="flex flex-col items-center gap-7 relative z-20 w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.12] bg-[#ffffff08] text-zinc-200 text-xs tracking-[0.15em] uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Начните бесплатно сегодня</span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mx-auto mt-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
              Хватит работать{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                нянькой у своего AI.
              </span>
              <br className="hidden md:block" />
              {' '}Начните создавать.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed text-balance mt-3">
            Присоединяйтесь к создателям контента нового поколения, которые уже экономят часы и создают контент, звучащий как они сами.
          </p>

          {/* CTA Button & Note */}
          <div className="flex flex-col items-center gap-4 mt-8 relative">
            <button className="relative flex items-center justify-center gap-3 px-9 py-4 md:px-10 md:py-5 rounded-full font-semibold text-white text-lg group overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.03] active:scale-[0.98]">
              
              {/* Premium breathing glow (анимация дыхания за кнопкой) */}
              <motion.div 
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.98, 1.05, 0.98] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[2px] bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-xl z-0" 
              />

              {/* Сильный Glow при Hover */}
              <div className="absolute inset-[-8px] bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out z-0 pointer-events-none" />
              
              {/* Поверхность кнопки (Фирменные цвета) */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 rounded-full border border-white/20 z-10 shadow-[inner_0_1px_rgba(255,255,255,0.4)] transition-all duration-300" />
              
              {/* Деликатный Shimmer-блик при Hover */}
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12" />

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
        className="flex flex-wrap justify-center gap-5 mt-10 relative z-10 px-4"
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
