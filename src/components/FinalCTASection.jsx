import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#090608] to-[#050505]">

      {/* ─── Внешнее сильное свечение ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* ─── Главная стеклянная капсула (Пространственная глубина) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1100px] mx-auto bg-[#14060b]/40 backdrop-blur-2xl border border-white/10 p-10 md:p-14 lg:p-16 xl:py-24 flex flex-col items-center justify-center text-center rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(244,63,94,0.2),inset_0_2px_15px_rgba(255,255,255,0.05),inset_0_-10px_60px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* === БАЗОВАЯ ГЛУБИНА И АТМОСФЕРА САМОЙ КАПСУЛЫ === */}
        
        {/* 1. Vignette: затемнение по краям, центр чуть светлее */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,10,20,0.4)_0%,rgba(5,2,3,0.95)_100%)] -z-20" />
        
        {/* 2. Тонкий шум (Premium Noise Effect) для избавления от 'окрашенности' */}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none -z-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* 3. Ограниченная сетка в центре (Исчезает к краям) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 -z-20 pointer-events-none" 
          style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' }}
        />

        {/* === ИСТОЧНИКИ СВЕТА (GLOW СЛОИ) === */}

        {/* Central Core Light (Непосредственно за текстом и кнопкой) */}
        <motion.div 
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.18)_0%,rgba(249,115,22,0.05)_50%,transparent_80%)] blur-[40px] mix-blend-screen pointer-events-none -z-10" 
        />

        {/* Soft Top Ambient Spotlight */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.25)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />
        
        {/* Subtle Bottom Ambient Spotlight */}
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.2)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

        {/* Тонкие световые отражения по рамке */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent shadow-[0_-5px_20px_rgba(244,63,94,0.8)] -z-10" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent -z-10" />

        {/* === КОНТЕНТ === */}
        <div className="flex flex-col items-center gap-7 relative z-20 w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-[#ffffff06] text-white text-xs tracking-[0.15em] uppercase font-bold backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
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

          {/* === КОНВЕРСИОННАЯ КНОПКА (CTA) === */}
          <div className="flex flex-col items-center gap-4 mt-8 relative">
            <div className="relative group">
              
              {/* Breeding Glow (Пульсирует вокруг кнопки, привлекая взгляд) */}
              <motion.div 
                animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-[18px] z-0 opacity-80 group-hover:opacity-100 group-hover:scale-[1.15] group-hover:blur-2xl transition-all duration-500 pointer-events-none" 
              />

              {/* Физический объем кнопки и hover-лифт */}
              <button className="relative flex items-center justify-center gap-3 px-10 py-[1.125rem] rounded-full font-bold text-white text-[1.1rem] overflow-hidden transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-[1.02] active:scale-[0.98] active:translate-y-0 shadow-[0_8px_20px_rgba(244,63,94,0.4)] group-hover:shadow-[0_20px_40px_rgba(249,115,22,0.5)] border border-white/20 group-hover:border-white/40 z-10 bg-gradient-to-r from-rose-500 via-[#ff4b72] to-orange-500">
                
                {/* Внутренняя структура (Выпуклость/Глубина) */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,0.4),inset_0_-2px_10px_rgba(0,0,0,0.15)] pointer-events-none" />

                {/* Еле заметное мягкое движение внутреннего градиента */}
                <motion.div 
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full z-10 mix-blend-overlay opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    backgroundSize: "200% 100%"
                  }}
                />

                {/* Регулярный Shimmer/Блик, привлекающий внимание */}
                <motion.div
                   animate={{ x: ["-200%", "300%"] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.5 }}
                   className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                >
                  <div className="w-1/2 h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
                </motion.div>

                <span className="relative z-30 drop-shadow-md tracking-wide">Запустить бесплатно</span>
                <ArrowRight className="relative z-30 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 drop-shadow-md" />
              </button>
            </div>
            
            <p className="text-sm text-zinc-400 font-medium mt-2">
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
