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
      desc: "Забудьте о перетаскивании текста между десятком вкладок. Все инструменты для рендера собраны здесь."
    }
  ];

  return (
    <section className="py-32 md:py-40 px-6 relative z-10 w-full overflow-hidden">
      {/* Тонкие линии разделители */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Typography & Points */}
        <div className="flex-1 flex flex-col gap-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
              AI подстраивается под вас, <br className="hidden md:block"/> а не наоборот
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-xl">
              Мы не загоняем вас в рамки бездушных шаблонов. GoToFlow — это продолжение вашего бренда, дающее вам креативную суперсилу, а не заменяющее вас на конвейер.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-6 group"
              >
                {/* Обертка для неон-иконки */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-300 bg-[#0a0a0a]">
                  <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30 rounded-full group-hover:opacity-50 transition-opacity" />
                  <point.icon className="w-5 h-5 text-orange-400 relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
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
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full h-[400px] md:h-[600px] flex items-center justify-center"
        >
           {/* Огромное мягкое свечение-бренд позади графики */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
           
           {/* Glassmorphism Abstract Interface */}
           <div className="relative w-full max-w-md aspect-square rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-colors duration-700" />
              
              <div className="space-y-4 relative z-10">
                 <div className="h-3 w-1/3 bg-zinc-800 rounded-full" />
                 <div className="h-3 w-2/3 bg-zinc-800 rounded-full" />
              </div>

              <div className="relative z-10 flex flex-col gap-3 my-auto">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]" />
                       <div className="h-2.5 w-24 bg-zinc-700 rounded-full" />
                    </div>
                    <Settings2 className="w-4 h-4 text-zinc-500" />
                 </div>
                 <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between ml-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-zinc-800" />
                       <div className="h-2.5 w-20 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="h-4 w-4 bg-zinc-800 rounded" />
                 </div>
              </div>

              <div className="relative z-10 w-full h-12 rounded-xl bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center">
                 <div className="h-2 w-1/4 bg-pink-400/50 rounded-full" />
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
