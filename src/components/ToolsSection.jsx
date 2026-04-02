import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radar, CalendarDays, Video, Layers, Fingerprint, Link2, Play, Sparkles } from 'lucide-react';

export const ToolsSection = () => {
  const tools = [
    {
      title: "Из вирального тренда — в готовый пост",
      desc: "Увидели крутую идею? Просто вставьте ссылку. GoToFlow безупречно адаптирует структуру и подачу под вашу нишу.",
      icon: Zap,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex flex-col items-center justify-center p-4 mt-6 md:mt-0 md:pl-8 relative z-10 w-full">
           <div className="w-full max-w-md rounded-2xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md shadow-2xl overflow-hidden group-hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] p-3">
                 <div className="flex gap-1.5 ml-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50" />
                 </div>
              </div>
              <div className="p-5 flex flex-col gap-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 p-3 relative z-10">
                   <Link2 className="w-4 h-4 text-zinc-500 shrink-0"/>
                   <div className="h-1.5 w-full bg-zinc-800 rounded-full"/>
                   <div className="h-1.5 w-12 bg-zinc-700/50 rounded-full shrink-0"/>
                </div>
                {/* CTA Button */}
                <div className="flex items-center justify-center py-3 w-full rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105 font-bold text-white text-sm border border-pink-400/20 transition-all cursor-pointer relative z-10">
                   Сгенерировать
                </div>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Радар шпиона",
      desc: "Анализируйте, что залетает у конкурентов, и создавайте улучшенные форматы быстрее.",
      icon: Radar,
      spanClass: "md:col-span-1",
      visual: (
        <div className="flex-1 flex flex-col justify-end p-4 mt-auto">
           <div className="flex items-end gap-1.5 h-24 w-full opacity-50 group-hover:opacity-100 transition-opacity duration-700">
              {[30, 50, 40, 80, 60, 100, 70].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t border-t border-white/10 ${i === 5 ? 'bg-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.5)] border-indigo-400' : 'bg-white/5'}`} style={{ height: `${h}%` }} />
              ))}
           </div>
        </div>
      )
    },
    {
      title: "Из видео в Карусель",
      desc: "Превращайте YouTube-ролики или подкасты в сочные карточки для Instagram.",
      icon: Layers,
      spanClass: "md:col-span-1",
      visual: (
        <div className="flex-1 flex items-center justify-center p-4 mt-auto relative">
           <div className="absolute inset-0 bg-indigo-500/0 blur-[30px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700" />
           <div className="relative z-10 flex gap-[-20px] w-full max-w-[140px] items-center justify-center">
             <div className="w-16 h-20 rounded-xl bg-white/[0.03] border border-white/10 shrink-0 transform -rotate-12 translate-x-4 shadow-xl" />
             <div className="w-16 h-20 rounded-xl bg-indigo-500/20 border border-indigo-500/30 shrink-0 z-10 group-hover:-translate-y-4 transition-transform shadow-[0_10px_20px_rgba(99,102,241,0.2)]" />
           </div>
        </div>
      )
    },
    {
      title: "Сценарии Reels и Хуки",
      desc: "Генератор динамичных структур и хуков, которые цепляют внимание с первой секунды.",
      icon: Video,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex flex-col gap-4 p-4 mt-6 md:mt-0 md:pl-8 justify-center relative w-full">
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700" />
           
           <div className="h-16 w-full max-w-[90%] rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center px-5 gap-4 shadow-xl relative group-hover:translate-x-3 transition-transform duration-500 z-10">
              <Play className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
              <div className="space-y-2 flex-1">
                 <div className="h-1.5 w-[70%] bg-zinc-700/80 rounded-full"/>
                 <div className="h-1.5 w-[40%] bg-zinc-800 rounded-full"/>
              </div>
           </div>
           <div className="h-16 w-full max-w-[85%] rounded-2xl bg-white/[0.02] border border-indigo-500/20 flex items-center px-5 gap-4 shadow-xl ml-auto relative group-hover:-translate-x-3 transition-transform duration-500 z-10 backdrop-blur-md">
              <div className="space-y-2 flex-1">
                 <div className="h-1.5 w-[80%] bg-indigo-400/50 rounded-full"/>
                 <div className="h-1.5 w-[50%] bg-indigo-400/20 rounded-full"/>
              </div>
              <Sparkles className="w-4 h-4 text-indigo-300 ml-auto" />
           </div>
        </div>
      )
    },
    {
      title: "Клонирование голоса",
      desc: "AI запоминает ваш Tone of Voice, словесные обороты и уникальный визуальный стиль.",
      icon: Fingerprint,
      spanClass: "md:col-span-2",
      visual: (
        <div className="flex-1 flex gap-6 p-4 mt-6 md:mt-0 md:pl-8 items-center justify-center relative w-full">
           <div className="relative w-20 h-20 rounded-3xl bg-[#050505] border border-white/5 flex items-center justify-center shrink-0 shadow-2xl group-hover:border-indigo-500/30 transition-colors duration-500 z-10 overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl animate-pulse" />
              <Fingerprint className="w-8 h-8 text-indigo-400 relative z-10" />
           </div>
           
           <div className="space-y-4 w-full max-w-[200px] z-10 p-5 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-indigo-400/80" />
                 </div>
                 <div className="h-1.5 w-[60%] bg-zinc-600 rounded-full"/>
              </div>
              <div className="space-y-2">
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full"/>
                 <div className="h-1.5 w-[85%] bg-zinc-800 rounded-full"/>
                 <div className="h-1.5 w-[70%] bg-zinc-800 rounded-full"/>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Автопилот контента",
      desc: "Искусственный интеллект сам распишет контент-план на месяц вперед.",
      icon: CalendarDays,
      spanClass: "md:col-span-1",
      visual: (
         <div className="flex-1 flex items-center justify-center p-4 mt-auto">
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[120px] opacity-40 group-hover:opacity-100 transition-opacity duration-700">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
                 <div key={i} className={`aspect-square rounded-md border border-white/5 ${i === 4 || i === 7 ? 'bg-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.4)] border-indigo-400' : 'bg-white/5'}`} />
               ))}
            </div>
         </div>
      )
    }
  ];

  return (
    <section className="py-20 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      {/* Background radial glow */}
      <div className="absolute left-[20%] top-[40%] -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5" />
            <span>Workflow, а не чат-бот</span>
          </div>
          
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">
              Единая экосистема. <br className="hidden md:block"/>Никаких «костылей».
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed text-balance">
            Больше не нужно жонглировать десятком вкладок. Все профессиональные инструменты в одном премиальном пространстве.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {tools.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`p-px rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/0 relative group overflow-hidden ${t.spanClass}`}
            >
              {/* Inner wrapper for card */}
              <div className="relative z-10 h-full bg-[#0a0a0a]/80 p-8 rounded-[2.5rem] group-hover:bg-[#0a0a0a] transition-colors duration-700 flex flex-col overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-transparent group-hover:from-indigo-500/5 transition-colors duration-700 pointer-events-none" />
                
                <div className={`relative z-10 flex h-full ${t.visual ? 'flex-col md:flex-row gap-8 lg:gap-12' : 'flex-col'}`}>
                  <div className={`flex flex-col ${t.visual ? 'md:w-1/2 lg:w-5/12 justify-center' : 'w-full'}`}>
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
                      <t.icon className="w-6 h-6 text-indigo-300 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-100 transition-colors duration-500">
                      {t.title}
                    </h3>
                    <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">
                      {t.desc}
                    </p>
                  </div>
                  {t.visual && t.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
