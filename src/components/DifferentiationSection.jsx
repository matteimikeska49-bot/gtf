import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Settings2, Infinity } from 'lucide-react';

export const DifferentiationSection = () => {
  const points = [
    {
      icon: Infinity,
      title: "100% Консистентность",
      desc: "Элегантно сохраняйте единый визуальный стиль и tone of voice во всех постах без дополнительных усилий."
    },
    {
      icon: Settings2,
      title: "Прозрачный контроль",
      desc: "Никаких черных ящиков AI. Вы управляете процессом на каждом шаге, гибко настраивая каждую деталь."
    },
    {
      icon: Layers,
      title: "Конец рутине",
      desc: "Забудьте о перетаскивании текста. Все профессиональные инструменты для рендера собраны в одном месте."
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      
      {/* Агрессивное свечение для заполнения пустоты */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] md:w-[1000px] h-[800px] bg-blue-600/15 blur-[120px] opacity-20 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/15 blur-[120px] opacity-20 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Typography & Points */}
        <div className="flex-1 flex flex-col gap-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15] text-balance">
              AI подстраивается <span className="text-gradient-brand">под вас,</span> <br className="hidden lg:block"/> а не наоборот
            </h2>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed text-balance">
              Мы не загоняем вас в рамки бездушных шаблонов. GoToFlow — это продолжение вашего бренда, дающее вам креативную суперсилу, а не заменяющее вас на конвейер.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex items-start gap-6 group"
              >
                {/* Обертка для неон-иконки */}
                <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-500 bg-[#050505] shadow-xl">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
                  <point.icon className="w-6 h-6 text-blue-400 relative z-10" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-100 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-medium">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Abstract Graphics Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 relative w-full flex items-center justify-center lg:justify-end"
        >
           {/* Glassmorphism Abstract Interface */}
           <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="space-y-4 relative z-10 w-full mb-12">
                 <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                 <div className="h-3 w-2/3 bg-white/5 rounded-full" />
              </div>

              <div className="relative z-10 flex flex-col gap-4 w-full">
                 <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between backdrop-blur-md hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-500/[0.15] border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] flex-shrink-0">
                          <div className="w-4 h-4 text-blue-400">✨</div>
                       </div>
                       <div className="space-y-2">
                         <div className="h-2.5 w-24 bg-zinc-300/80 rounded-full" />
                         <div className="h-2 w-16 bg-zinc-500/50 rounded-full" />
                       </div>
                    </div>
                    <Settings2 className="w-5 h-5 text-zinc-500" />
                 </motion.div>
                 
                 <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="p-5 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between ml-8 backdrop-blur-md hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center flex-shrink-0" />
                       <div className="space-y-2">
                         <div className="h-2.5 w-20 bg-zinc-500/50 rounded-full" />
                         <div className="h-2 w-12 bg-zinc-700/50 rounded-full" />
                       </div>
                    </div>
                    <div className="h-5 w-5 bg-zinc-800 rounded flex-shrink-0" />
                 </motion.div>
              </div>

              <div className="relative z-10 w-full mt-auto">
                 <div className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center px-4 overflow-hidden backdrop-blur-md">
                     <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 absolute left-0 top-0 border-r border-cyan-400/30"
                     />
                     <div className="relative z-10 h-2 w-1/4 bg-blue-400/50 rounded-full" />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
