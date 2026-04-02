import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Search, PenTool, Play, CheckCircle2, Zap, ArrowRight, BarChart3, Settings } from 'lucide-react';

const AbstractUIMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-5xl mt-24 relative mx-auto perspective-1000"
    >
      {/* Мягкое свечение сзади карточки в стилистике темного интерфейса */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-tr from-pink-900/30 via-purple-900/20 to-indigo-900/30 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen" />

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
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-300 font-semibold text-sm shadow-inner cursor-pointer hover:border-pink-500/40 transition-colors">
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

              <div className="mt-8 p-4 rounded-xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-purple-500/5 flex items-center gap-3 relative overflow-hidden">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                 <Sparkles className="w-5 h-5 text-pink-400" />
                 <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-80" />
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
                     className={`flex-1 rounded-sm border-t ${i === 5 ? 'bg-gradient-to-t from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] border-pink-400' : 'bg-zinc-800 border-zinc-700'}`}
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
    <section className="pt-40 pb-24 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Deep Ambient Glow for Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-pink-900/20 via-purple-900/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 md:mt-0 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-10 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Новая эра создания контента</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-8 max-w-4xl text-white leading-[1.1]"
        >
          Перестаньте быть нянькой <br className="hidden md:block"/> у своего AI.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium"
        >
          Устали собирать посты по кускам из разных нейросетей и переписывать «пластиковый» текст? GoToFlow — это чистый workflow. От первой идеи до готовой публикации.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-8 py-4.5 md:py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 group text-lg md:text-base border border-pink-400/20">
            Запустить workflow
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4.5 md:py-4 rounded-full font-semibold text-white border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md text-lg md:text-base">
            <Play className="w-5 h-5 fill-white/20" />
            Смотреть демо
          </button>
        </motion.div>

        <AbstractUIMockup />
      </div>
    </section>
  );
}
