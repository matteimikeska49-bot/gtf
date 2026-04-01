import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Search, PenTool, Play, CheckCircle2, Zap, ArrowRight, BarChart3, Settings } from 'lucide-react';

const AbstractUIMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-5xl mt-20 relative mx-auto perspective-1000"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-gradient-to-tr from-pink-500/20 to-orange-400/20 dark:from-pink-500/30 dark:to-orange-400/30 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="relative rounded-2xl md:rounded-3xl border border-zinc-200/60 dark:border-white/10 bg-white/60 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-left ring-1 ring-black/5 dark:ring-white/5">
        
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-white/5 p-5 flex flex-col gap-6 bg-zinc-50/40 dark:bg-black/20">
          <div className="flex items-center gap-2 px-1">
             <div className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm" />
             <div className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm" />
             <div className="w-3 h-3 rounded-full bg-green-400/90 shadow-sm" />
          </div>
          
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-orange-400/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 font-medium text-sm shadow-inner group cursor-pointer">
              <Zap className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" /> Создать контент
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/5">
              <LayoutDashboard className="w-4 h-4" /> Мои Проекты
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/5">
              <Search className="w-4 h-4" /> Анализ конкурентов
            </div>
          </div>

          <div className="mt-auto px-3 py-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center gap-3 text-sm text-zinc-500">
             <Settings className="w-4 h-4" /> Настройки
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">Post Generation Flow</h3>
            <div className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-2 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 animate-pulse shadow-[0_0_8px_#ec4899]" />
               AI Активен
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 p-5 rounded-2xl border border-zinc-200/60 dark:border-white/5 bg-white/80 dark:bg-[#121212]/80 shadow-sm relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <PenTool className="w-4 h-4 text-zinc-500" />
                 </div>
                 <div className="h-2 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>
              
              <div className="space-y-4">
                 <div className="h-2 w-[90%] bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                 <div className="h-2 w-[80%] bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                 <div className="h-2 w-[60%] bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>

              <div className="mt-8 p-3 rounded-xl border border-pink-500/20 bg-pink-500/5 flex items-center gap-3 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                 <Sparkles className="w-4 h-4 text-pink-500" />
                 <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full opacity-80" />
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200/60 dark:border-white/5 bg-white/80 dark:bg-[#121212]/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-4 h-4 text-zinc-500" />
                  <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                </div>
                <div className="text-3xl font-light text-zinc-900 dark:text-white tracking-tighter">84.2%</div>
                <div className="h-1.5 w-12 bg-emerald-400 rounded-full mt-2" />
              </div>
              
              <div className="flex items-end gap-1.5 w-full h-16 mt-6">
                 {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                     className={`flex-1 rounded-sm ${i === 5 ? 'bg-gradient-to-t from-pink-500 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
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
    <section className="pt-36 pb-20 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 md:mt-0 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4" />
          <span>Новая эра создания контента</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400"
        >
          Перестаньте быть нянькой <br className="hidden md:block"/> у своего AI.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Устали собирать посты по кускам из разных нейросетей и переписывать «пластиковый» текст? GoToFlow — это чистый workflow. От первой идеи до готовой публикации, которая звучит как вы.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 group">
            Запустить workflow
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <Play className="w-4 h-4" />
            Смотреть демо
          </button>
        </motion.div>

        <AbstractUIMockup />
      </div>
    </section>
  );
}
