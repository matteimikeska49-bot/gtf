import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0b080a] to-[#050505]">

      {/* ─── Внешнее яркое свечение секции (Делает блок заметным) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12)_0%,rgba(249,115,22,0.06)_50%,transparent_70%)] pointer-events-none -z-10" />

      {/* ─── Главная стеклянная капсула (Светлее, богаче, объёмнее) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1100px] mx-auto bg-white/[0.01] backdrop-blur-3xl border border-white/[0.15] p-10 md:p-14 lg:p-16 xl:py-24 flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(244,63,94,0.25),inset_0_2px_10px_rgba(255,255,255,0.1)]"
      >
        {/* === МНОГОСЛОЙНЫЙ АТМОСФЕРНЫЙ ФОН === */}
        {/* Базовая глубина (Тёплый винный/рубиновый премиум) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c0d16] via-[#14060c] to-[#120509] opacity-90 -z-20" />
        
        {/* Ambient Top Glow (Мощный базовый свет из центра) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.3)_0%,rgba(249,115,22,0.1)_60%,transparent_100%)] pointer-events-none -z-10" />

        {/* Сверкающая деликатная сетка для ощущения масштаба */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 -z-20" />

        {/* ─── Мощные анимированные источники света (Глубина) ─── */}
        {/* Левое крыло: Насыщенный Rose/Pink */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[-15%] w-[60%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.5)_0%,transparent_70%)] blur-[60px] mix-blend-screen pointer-events-none -z-10" 
        />
        {/* Правое крыло: Теплый Orange/Coral */}
        <motion.div 
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[-10%] right-[-15%] w-[60%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.4)_0%,transparent_70%)] blur-[60px] mix-blend-screen pointer-events-none -z-10" 
        />

        {/* Тонкие световые акценты (High-fidelity border reflections) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-rose-400/90 to-transparent shadow-[0_-10px_40px_rgba(244,63,94,1)] -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-gradient-to-r from-transparent via-orange-300 to-transparent blur-[2px] -z-10" />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-300/40 to-transparent -z-10" />

        {/* ─── Плавающие частицы энергии ─── */}
        <motion.svg 
          animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-lighten pointer-events-none -z-10" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#FFF">
            <circle cx="15%" cy="30%" r="1" opacity="0.4" />
            <circle cx="85%" cy="20%" r="2" opacity="0.6" fill="#f43f5e" />
            <circle cx="75%" cy="65%" r="1.5" fill="#f97316" opacity="0.5" className="animate-pulse" />
            <circle cx="20%" cy="80%" r="1" opacity="0.3" />
            <circle cx="50%" cy="10%" r="1.5" fill="#ec4899" opacity="0.6" />
            <circle cx="10%" cy="50%" r="1" opacity="0.3" />
            <circle cx="88%" cy="75%" r="1.5" opacity="0.5" className="animate-pulse" />
            <circle cx="45%" cy="85%" r="2" fill="#f43f5e" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite]" />
            <circle cx="30%" cy="40%" r="1" opacity="0.6" />
          </g>
        </motion.svg>

        {/* === КОНТЕНТ === */}
        <div className="flex flex-col items-center gap-7 relative z-20 w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.2] bg-white/10 text-white text-xs tracking-[0.15em] uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Начните бесплатно сегодня</span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mx-auto mt-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance drop-shadow-xl">
              Хватит работать{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]">
                нянькой у своего AI.
              </span>
              <br className="hidden md:block" />
              {' '}Начните создавать.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed text-balance mt-3 drop-shadow-md">
            Присоединяйтесь к создателям контента нового поколения, которые уже экономят часы и создают контент, звучащий как они сами.
          </p>

          {/* CTA Button & Note */}
          <div className="flex flex-col items-center gap-5 mt-10 relative">
            <button className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-white text-[1.1rem] overflow-hidden group transition-transform duration-500 ease-out hover:scale-[1.05] active:scale-[0.98]">
              
              {/* Premium breathing aura (пульсация света за кнопкой) */}
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.15, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[2px] bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-[24px] z-0" 
              />

              {/* Фоновое свечение, реагирующее на Hover */}
              <div className="absolute -inset-6 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0 pointer-events-none" />
              
              {/* ЖИВАЯ поверхность кнопки (Постоянно бегущий градиент) */}
              <motion.div 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-white/30 z-10 shadow-[inset_0_2px_15px_rgba(255,255,255,0.4)]"
                style={{
                  background: "linear-gradient(90deg, #f43f5e, #f97316, #ec4899, #f43f5e)",
                  backgroundSize: "200% 200%"
                }}
              />
              
              {/* Постоянный элегантный Shimmer, пролетающий сам по себе */}
              <motion.div
                 animate={{ x: ["-200%", "200%"] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                 className="absolute inset-0 z-20 w-1/2 h-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay"
              />

              <span className="relative z-30 tracking-wide drop-shadow-md">Запустить бесплатно</span>
              <ArrowRight className="relative z-30 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <p className="text-sm text-zinc-400 font-medium mt-1">
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
          <span key={i} className="bg-white/[0.04] border border-white/10 rounded-full px-6 py-3 text-white flex items-center gap-2.5 backdrop-blur-md text-sm font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {chip}
          </span>
        ))}
      </motion.div>

    </section>
  );
};
