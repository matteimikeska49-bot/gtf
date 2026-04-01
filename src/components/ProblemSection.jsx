import React from 'react';
import { motion } from 'framer-motion';
import { Box, Clock, Bot, Flame } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      icon: Box,
      title: "Зоопарк сервисов",
      desc: "Вы прыгаете между ChatGPT для текстов, Midjourney для визуала и редакторами. Фокус теряется, а подписки съедают бюджет."
    },
    {
      icon: Clock,
      title: "Часы ручной доработки",
      desc: "AI выдает водянистую простыню, и вы тратите часы, вычищая из текста неестественный восторг и академические штампы."
    },
    {
      icon: Bot,
      title: "«Пластиковый» текст",
      desc: "Ваши зрители чувствуют неладное с первых строк. В бездушных генерациях нет ни вашего опыта, ни уникального стиля."
    },
    {
      icon: Flame,
      title: "Потеря консистентности",
      desc: "Цвета скачут от поста к посту, tone of voice постоянно меняется. Ваш бренд теряется в потоке случайных результатов."
    }
  ];

  return (
    <section className="py-32 md:py-40 px-6 relative z-10 overflow-hidden">
      {/* Тонкие линии разделители */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      
      {/* Огромное мягкое свечение-боль в центре секции */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-900/10 dark:bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Создание контента <br className="hidden md:block"/> превратилось в хаос?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Вы тратите больше времени на борьбу с промптами и инструментами, чем на само творчество и бизнес.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-red-500/5 dark:bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-zinc-200/80 dark:border-red-900/20 bg-white/40 dark:bg-[#0f0a0a]/60 backdrop-blur-xl relative group overflow-hidden hover:border-red-400/30 dark:hover:border-red-500/40 transition-colors duration-500 ring-1 ring-black/5 dark:ring-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-colors duration-500" />
              
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-500/10 dark:bg-red-500/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 shadow-sm shrink-0">
                  <p.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2.5 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
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
