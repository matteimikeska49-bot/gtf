import React from 'react';
import { motion } from 'framer-motion';
import { Box, Clock, Bot, Flame } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      icon: Box,
      title: "Зоопарк сервисов",
      desc: "Вы прыгаете между ChatGPT для текстов, Midjourney для визуала и кучей редакторов. Фокус теряется, а подписки съедают бюджет."
    },
    {
      icon: Clock,
      title: "Часы ручной доработки",
      desc: "AI выдает водянистую простыню, и вы тратите часы, вычищая из текста неестественный восторг и академические стилистические штампы."
    },
    {
      icon: Bot,
      title: "«Пластиковый» текст",
      desc: "Ваши зрители тонко чувствуют неладное с первых строк. В бездушных AI-генерациях нет ни вашего живого опыта, ни уникального стиля."
    },
    {
      icon: Flame,
      title: "Потеря консистентности",
      desc: "Цвета скачут от поста к посту, tone of voice постоянно меняется. Ваш личный бренд растворяется в бесконечном потоке случайных результатов."
    }
  ];

  return (
    <section className="py-32 md:py-48 px-6 relative z-10 overflow-hidden bg-[#050505]">
      
      {/* Огромное мягкое свечение-боль в центре секции */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4a0404]/20 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5" />
            <span>Знакомая ситуация?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight max-w-3xl">
            Создание контента <br className="hidden md:block"/> превратилось в хаос?
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Вы тратите больше времени на борьбу с промптами и перенос текста из одного сервиса в другой, чем на само творчество и бизнес.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-rose-900/10 blur-[150px] rounded-[100%] pointer-events-none" />

          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="p-1 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-xl group-hover:bg-white/[0.03] transition-colors duration-700 rounded-[2rem]" />
              
              <div className="h-full relative z-10 bg-[#0a0a0a]/80 p-8 md:p-10 rounded-[1.9rem] border border-white/[0.03] group-hover:border-rose-500/30 transition-all duration-700 flex flex-col items-start gap-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-transparent group-hover:from-rose-500/5 transition-colors duration-700 pointer-events-none" />
                
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-rose-500/10 blur-[60px] rounded-full group-hover:bg-rose-500/20 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                
                <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl" />
                  <p.icon className="w-6 h-6 text-rose-400 relative z-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-rose-200 transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
