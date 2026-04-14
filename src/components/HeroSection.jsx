import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutDashboard, Search, PenTool, Play, Zap, ArrowRight, BarChart3, Settings } from 'lucide-react';

const BADGE_TEXTS = [
  "Для креаторов, экспертов и контент-команд",
  "Создавайте контент, даже если нет идей",
];

const RotatingBadge = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BADGE_TEXTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm overflow-hidden">
      {/* Мерцающая точка активности */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
      </span>

      {/* Обертка фиксированной высоты */}
      <div className="relative h-[1.2em] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block text-sm text-zinc-300 whitespace-nowrap"
          >
            {BADGE_TEXTS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── Subtle isometric grid (SVG pattern, 5-8% opacity) ─── */
const IsometricGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <svg className="w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="iso-grid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#iso-grid)" />
    </svg>
    {/* Fade-out mask so grid disappears at edges */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
  </div>
);

const AbstractUIMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-5xl mt-20 relative mx-auto perspective-1000"
    >
      {/* Огромное свечение за дашбордом — эффект «парения» */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-[#ec4899]/[0.08] blur-[140px] rounded-[100%] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-gradient-to-tr from-pink-900/25 via-purple-900/15 to-indigo-900/25 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-left ring-1 ring-white/5 group">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col gap-8 bg-[#050505]/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-2 px-1 relative z-10">
             <div className="w-3 h-3 rounded-full bg-zinc-700/60 transition-colors group-hover:bg-red-500/80" />
             <div className="w-3 h-3 rounded-full bg-zinc-700/60 transition-colors group-hover:bg-amber-500/80" />
             <div className="w-3 h-3 rounded-full bg-zinc-700/60 transition-colors group-hover:bg-green-500/80" />
          </div>
          
          <div className="space-y-3 mt-4 relative z-10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 text-pink-300 font-semibold text-sm shadow-inner cursor-pointer hover:border-pink-500/40 transition-colors">
              <Zap className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" /> Создать контент
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors text-sm cursor-pointer hover:bg-white/5 border border-transparent">
              <LayoutDashboard className="w-4 h-4" /> Мои Проекты
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors text-sm cursor-pointer hover:bg-white/5 border border-transparent">
              <Search className="w-4 h-4" /> Анализ конкурентов
            </div>
          </div>

          <div className="mt-auto px-4 py-4 border-t border-white/5 flex items-center gap-3 text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors relative z-10">
             <Settings className="w-4 h-4" /> Настройки
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-8 md:p-10 flex flex-col gap-10 relative z-10 bg-[#0a0a0a]/30">
          <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight">Post Generation Flow</h3>
            <div className="px-4 py-2 rounded-full border border-white/10 bg-[#050505] text-xs font-semibold text-zinc-300 flex items-center gap-2 shadow-lg backdrop-blur-md">
               <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse shadow-[0_0_10px_#ec4899]" />
               AI Активен
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="md:col-span-2 p-6 rounded-[1.5rem] border border-white/5 bg-[#050505]/80 shadow-xl relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <PenTool className="w-5 h-5 text-zinc-400" />
                 </div>
                 <div className="h-2.5 w-40 bg-zinc-800 rounded-full" />
              </div>
              
              <div className="space-y-4 flex-1">
                 <div className="h-2 w-[90%] bg-zinc-800 rounded-full" />
                 <div className="h-2 w-[80%] bg-zinc-800 rounded-full" />
                 <div className="h-2 w-[60%] bg-zinc-800 rounded-full" />
              </div>

              <div className="mt-8 p-4 rounded-xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-orange-500/5 flex items-center gap-3 relative overflow-hidden">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                 <Sparkles className="w-5 h-5 text-pink-400" />
                 <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-80" />
              </div>
            </div>

            <div className="p-6 rounded-[1.5rem] border border-white/5 bg-[#050505]/80 shadow-xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-zinc-500" />
                  <div className="h-2.5 w-20 bg-zinc-800 rounded-full" />
                </div>
                <div className="text-4xl font-light text-white tracking-tighter">84.2%</div>
                <div className="h-1.5 w-16 bg-emerald-400/80 rounded-full mt-3 shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
              </div>
              
              <div className="flex items-end gap-2 w-full h-20 mt-8 relative z-10">
                 {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                     className={`flex-1 rounded-sm border-t ${i === 5 ? 'bg-gradient-to-t from-pink-500 to-orange-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] border-pink-400' : 'bg-zinc-800 border-zinc-700'}`}
                   />
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Isometric grid background layer */}
      <IsometricGrid />
      
      {/* Deep Ambient Glow for Hero — magenta/purple, very low opacity */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4 md:mt-0 mb-8"
        >
          <RotatingBadge />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
           className="max-w-3xl mx-auto w-full"
        >
          <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-8 text-balance">
            Находите вирусные идеи <br className="hidden md:block" /> 
            и превращайте их в карусели <br className="hidden md:block" /> 
            <span className="text-gradient-brand">за 60 секунд</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg mx-auto mb-12 leading-[1.75] font-medium text-balance"
        >
          Анализируйте конкурентов, находите тренды <br className="hidden md:block"/> и создавайте контент в один клик — в вашем стиле
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 w-full sm:w-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
              Запустить бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Trust signals */}
          <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span>✓ Без привязки карты</span>
            <span className="text-zinc-700">•</span>
            <span>✓ Первый результат за 60 секунд</span>
          </p>
        </motion.div>

        <AbstractUIMockup />
      </div>
    </section>
  );
}
