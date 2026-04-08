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
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 backdrop-blur-xl overflow-hidden shadow-[0_0_1px_rgba(255,255,255,0.1),inset_0_0.5px_0_rgba(255,255,255,0.08)]">
      {/* Мерцающая точка активности */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400/60 opacity-50" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
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
            className="block text-sm text-zinc-400 whitespace-nowrap font-medium"
          >
            {BADGE_TEXTS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── Premium Noise Texture (SVG fractalNoise) ─── */
const NoiseTexture = () => (
  <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
    <svg className="w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
      <filter id="hero-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-noise)" />
    </svg>
  </div>
);

/* ─── Subtle dot grid (more modern than isometric lines) ─── */
const DotGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
    <div 
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
        backgroundSize: '28px 28px',
      }}
    />
    {/* Edge fade mask */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050505_100%)]" />
  </div>
);

/* ─── Ambient Light Orbs (ultra-soft, slow drifting) ─── */
const AmbientOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
    {/* Central warm bloom — the "light source" behind CTA area */}
    <motion.div 
      animate={{ 
        scale: [1, 1.08, 1],
        opacity: [0.06, 0.09, 0.06],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(251,113,133,0.12) 0%, rgba(251,146,60,0.04) 40%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
    
    {/* Upper-left cool accent — subtle depth contrast */}
    <motion.div
      animate={{ 
        x: [0, 30, 0],
        y: [0, -20, 0],
        opacity: [0.03, 0.05, 0.03],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[10%] left-[15%] w-[500px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)',
        filter: 'blur(100px)',
      }}
    />
    
    {/* Lower-right warm accent */}
    <motion.div
      animate={{ 
        x: [0, -25, 0],
        y: [0, 15, 0],
        opacity: [0.02, 0.04, 0.02],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-[5%] right-[10%] w-[450px] h-[350px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 60%)',
        filter: 'blur(90px)',
      }}
    />
  </div>
);

/* ─── Vignette (darkened edges → central light) ─── */
const Vignette = () => (
  <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, rgba(5,5,5,0.4) 60%, rgba(5,5,5,0.85) 100%)',
    }} />
  </div>
);

const AbstractUIMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-5xl mt-20 relative mx-auto perspective-1000"
    >
      {/* Refined glow behind dashboard — cohesive with central light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[85%] rounded-[100%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(251,113,133,0.06) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.06] bg-[#0a0a0a]/70 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col md:flex-row text-left ring-1 ring-white/[0.04] group">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/[0.05] p-6 flex flex-col gap-8 bg-[#060606]/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-2 px-1 relative z-10">
             <div className="w-3 h-3 rounded-full bg-zinc-700/50 transition-colors group-hover:bg-red-500/70" />
             <div className="w-3 h-3 rounded-full bg-zinc-700/50 transition-colors group-hover:bg-amber-500/70" />
             <div className="w-3 h-3 rounded-full bg-zinc-700/50 transition-colors group-hover:bg-green-500/70" />
          </div>
          
          <div className="space-y-2.5 mt-4 relative z-10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-rose-300/90 font-semibold text-sm shadow-inner cursor-pointer hover:border-white/[0.12] transition-colors">
              <Zap className="w-4 h-4 text-rose-400/80" /> Создать контент
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-300 transition-colors text-sm cursor-pointer hover:bg-white/[0.02] border border-transparent">
              <LayoutDashboard className="w-4 h-4" /> Мои Проекты
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-300 transition-colors text-sm cursor-pointer hover:bg-white/[0.02] border border-transparent">
              <Search className="w-4 h-4" /> Анализ конкурентов
            </div>
          </div>

          <div className="mt-auto px-4 py-4 border-t border-white/[0.04] flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors relative z-10">
             <Settings className="w-4 h-4" /> Настройки
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-8 md:p-10 flex flex-col gap-10 relative z-10 bg-transparent">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/[0.04] blur-[80px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-2xl font-bold text-white/90 tracking-tight">Post Generation Flow</h3>
            <div className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold text-zinc-400 flex items-center gap-2 shadow-lg backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
               AI Активен
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="md:col-span-2 p-6 rounded-[1.5rem] border border-white/[0.05] bg-white/[0.015] shadow-xl relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <PenTool className="w-5 h-5 text-zinc-500" />
                 </div>
                 <div className="h-2.5 w-40 bg-zinc-800/60 rounded-full" />
              </div>
              
              <div className="space-y-4 flex-1">
                 <div className="h-2 w-[90%] bg-zinc-800/50 rounded-full" />
                 <div className="h-2 w-[80%] bg-zinc-800/50 rounded-full" />
                 <div className="h-2 w-[60%] bg-zinc-800/50 rounded-full" />
              </div>

              <div className="mt-8 p-4 rounded-xl border border-rose-500/[0.12] bg-gradient-to-r from-rose-500/[0.06] to-orange-500/[0.03] flex items-center gap-3 relative overflow-hidden">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                 <Sparkles className="w-5 h-5 text-rose-400/70" />
                 <div className="h-2 w-32 bg-gradient-to-r from-rose-400/40 to-orange-400/30 rounded-full" />
              </div>
            </div>

            <div className="p-6 rounded-[1.5rem] border border-white/[0.05] bg-white/[0.015] shadow-xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-zinc-600" />
                  <div className="h-2.5 w-20 bg-zinc-800/50 rounded-full" />
                </div>
                <div className="text-4xl font-light text-white/90 tracking-tighter">84.2%</div>
                <div className="h-1.5 w-16 bg-emerald-400/60 rounded-full mt-3 shadow-[0_0_8px_rgba(52,211,153,0.2)]" />
              </div>
              
              <div className="flex items-end gap-2 w-full h-20 mt-8 relative z-10">
                 {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ duration: 1.2, delay: 0.9 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                     className={`flex-1 rounded-sm ${i === 5 ? 'bg-gradient-to-t from-rose-500/70 to-rose-400/50 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'bg-zinc-800/50'}`}
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

/* ─── Premium CTA Button with breathing aura ─── */
const PrimaryCTA = () => (
  <motion.button 
    className="relative w-full sm:w-auto px-9 py-4 rounded-full font-semibold text-white/95 text-base flex items-center justify-center gap-2.5 group z-20 overflow-hidden cursor-pointer"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    style={{
      background: 'linear-gradient(135deg, rgba(244,63,94,0.85) 0%, rgba(251,113,133,0.75) 40%, rgba(251,146,60,0.7) 100%)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 30px rgba(244,63,94,0.15), 0 2px 8px rgba(0,0,0,0.3)',
    }}
  >
    {/* Inner light — top highlight for glass effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-transparent to-transparent rounded-full pointer-events-none" />
    
    {/* Breathing outer aura */}
    <motion.div
      className="absolute -inset-2 rounded-full pointer-events-none z-[-1]"
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.08, 1],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(251,113,133,0.25) 0%, transparent 70%)',
        filter: 'blur(16px)',
      }}
    />
    
    {/* Shimmer sweep on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full pointer-events-none" />
    
    <span className="relative z-10 tracking-tight">Запустить бесплатно</span>
    <ArrowRight className="w-4.5 h-4.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
  </motion.button>
);

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
      
      {/* ═══ LAYER 1: Base texture ═══ */}
      <NoiseTexture />
      <DotGrid />
      
      {/* ═══ LAYER 2: Ambient light orbs (slow-drifting) ═══ */}
      <AmbientOrbs />
      
      {/* ═══ LAYER 3: Vignette (darkened edges, central light) ═══ */}
      <Vignette />
      
      {/* ═══ Content ═══ */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-4 md:mt-0 mb-8"
        >
          <RotatingBadge />
        </motion.div>

        {/* Headline */}
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
           className="max-w-3xl mx-auto w-full"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1] text-balance">
            Перестаньте быть нянькой <br className="hidden md:block"/> у своего <span className="text-gradient-brand">AI.</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mb-14 leading-relaxed font-medium text-balance"
        >
          GoToFlow помогает собирать посты, карусели, сценарии Reels и контент-планы в одном месте,{' '}
          <span className="text-zinc-400">избавляя вас от хаоса вкладок и десятков разных сервисов.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center gap-5 w-full sm:w-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <PrimaryCTA />
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-zinc-400 hover:text-zinc-200 border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-3 bg-white/[0.02] backdrop-blur-xl text-base z-20 relative">
              <Play className="w-4.5 h-4.5 fill-zinc-600" />
              Смотреть демо
            </button>
          </div>
          {/* Trust signals */}
          <p className="text-sm text-zinc-600 flex flex-wrap justify-center gap-x-4 gap-y-1 font-medium tracking-tight">
            <span>✓ Без привязки карты</span>
            <span className="text-zinc-800">•</span>
            <span>✓ Первый результат за 60 секунд</span>
          </p>
        </motion.div>

        <AbstractUIMockup />
      </div>
    </section>
  );
}
