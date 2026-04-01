import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radar, CalendarDays, Video, Layers, Fingerprint, Link2, Play, Sparkles } from 'lucide-react';

export const ToolsSection = () => {
  const tools = [
    {
      title: "Из вирального тренда — в готовый пост",
      desc: "Увидели крутую идею? Просто вставьте ссылку. GoToFlow адаптирует структуру и подачу под вашу нишу.",
      icon: Zap,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex items-center justify-center p-2 mt-6 md:mt-0 md:pl-8">
           <div className="w-full max-w-sm rounded-[1.25rem] border border-zinc-200 dark:border-white/10 p-4 bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg group-hover:border-pink-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-4 rounded-lg bg-zinc-100 dark:bg-white/5 p-2">
                 <Link2 className="w-4 h-4 text-zinc-400 ml-1 shrink-0"/>
                 <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full"/>
                 <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-700 rounded-full mr-2"/>
              </div>
              <div className="flex items-center justify-center py-2.5 w-full rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-bold text-white text-sm shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                 Сгенерировать магию
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Радар шпиона",
      desc: "Анализируйте, что залетает у конкурентов, и создавайте улучшенные форматы.",
      icon: Radar,
      spanClass: "md:col-span-1"
    },
    {
      title: "Из видео в Карусель",
      desc: "Превращайте YouTube-ролики или подкасты в сочные карточки для Instagram.",
      icon: Layers,
      spanClass: "md:col-span-1"
    },
    {
      title: "Сценарии Reels и Хуки",
      desc: "Генератор динамичных структур и хуков, которые цепляют с первой секунды.",
      icon: Video,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex flex-col gap-3 p-2 mt-6 md:mt-0 md:pl-8 justify-center">
           <div className="h-12 w-full max-w-[90%] rounded-xl bg-white border border-zinc-200 dark:bg-[#111] dark:border-white/10 flex items-center px-4 gap-4 shadow-sm relative group-hover:translate-x-2 transition-transform">
              <Play className="w-4 h-4 text-pink-500 fill-pink-500/20" />
              <div className="h-2 w-[60%] bg-zinc-200 dark:bg-zinc-800 rounded-full"/>
           </div>
           <div className="h-12 w-full max-w-[80%] rounded-xl bg-white border border-zinc-200 dark:bg-[#111] dark:border-white/10 flex items-center px-4 gap-4 shadow-sm ml-auto relative group-hover:-translate-x-2 transition-transform">
              <div className="h-2 w-[70%] bg-zinc-200 dark:bg-zinc-800 rounded-full"/>
              <Sparkles className="w-4 h-4 text-orange-400 ml-auto" />
           </div>
        </div>
      )
    },
    {
      title: "Клонирование голоса",
      desc: "AI запоминает ваш Tone of Voice, любимые слова и визуальный стиль.",
      icon: Fingerprint,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex gap-5 p-2 mt-6 md:mt-0 md:pl-8 items-center justify-center">
           <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shrink-0 shadow-lg">
              <Fingerprint className="w-8 h-8 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-20" />
           </div>
           <div className="space-y-3 w-full max-w-[160px]">
              <div className="h-2.5 w-full bg-gradient-to-r from-pink-500/80 to-orange-400/80 rounded-full"/>
              <div className="h-2 w-[85%] bg-zinc-200 dark:bg-zinc-700 rounded-full"/>
              <div className="h-2 w-[65%] bg-zinc-200 dark:bg-zinc-700 rounded-full"/>
           </div>
        </div>
      )
    },
    {
      title: "Автопилот контента",
      desc: "Искусственный интеллект сам распишет контент-план на месяц вперед.",
      icon: CalendarDays,
      spanClass: "md:col-span-1"
    }
  ];

  return (
    <section className="py-32 md:py-40 px-6 relative z-10 w-full overflow-hidden">
      {/* Тонкие линии разделители */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      
      {/* Огромное мягкое свечение-бренд в центре секции */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-pink-500/10 dark:bg-pink-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6">
            <Layers className="w-4 h-4" />
            <span>Workflow, а не чат-бот</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Единая экосистема.<br className="hidden md:block"/> Никаких «костылей».
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Больше не нужно жонглировать десятком вкладок. Мы собрали все профессиональные инструменты в одном премиальном пространстве.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
          {tools.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-7 rounded-[2rem] border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl group hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-pink-500/5 ${t.spanClass}`}
            >
               <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-orange-400/0 group-hover:from-pink-500/5 group-hover:to-orange-400/5 transition-colors duration-500 pointer-events-none" />
               <div className={`relative z-10 flex h-full ${t.visual ? 'flex-col md:flex-row' : 'flex-col'}`}>
                 <div className={`flex flex-col ${t.visual ? 'md:w-[55%] lg:w-1/2 justify-center' : 'w-full'}`}>
                   <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/10 transition-transform duration-300">
                     <t.icon className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-pink-500 transition-colors" />
                   </div>
                   <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                     {t.title}
                   </h3>
                   <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                     {t.desc}
                   </p>
                 </div>
                 {t.visual && t.visual}
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
