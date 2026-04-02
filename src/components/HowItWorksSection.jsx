import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Download,
      title: "1. Ввод (Input)",
      desc: "Загружаете сырую идею, голос, ссылку на статью или запись вебинара. Платформа принимает любой формат для старта."
    },
    {
      icon: Sparkles,
      title: "2. Генерация (Generation)",
      desc: "AI собирает готовый черновик поста или карусели, идеально адаптируясь под ваш tone of voice и структуру ниши."
    },
    {
      icon: CheckCircle2,
      title: "3. Полировка (Refinement)",
      desc: "Легкая и прозрачная доработка в удобном визуальном редакторе. После этого — мгновенный экспорт в ваши соцсети."
    }
  ];

  return (
    <section className="py-32 md:py-40 px-6 relative z-10 w-full overflow-hidden">
      {/* Тонкие линии разделители */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-500 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Чистый Workflow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            От идеи до публикации <br className="hidden md:block"/> за 3 простых шага
          </h2>
        </motion.div>

        <div className="relative">
          {/* Сетка соединяющих линий навигации */}
          <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-px bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-orange-400/0" />
          <div className="md:hidden absolute left-[3.25rem] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-pink-500/0 via-pink-500/30 to-orange-400/0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0"
              >
                {/* Обертка для неон-иконки */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl border border-white/5 shrink-0 md:mb-8 group-hover:scale-110 transition-transform duration-300 bg-[#0a0a0a] z-10 shadow-lg">
                  <div className="absolute inset-0 bg-pink-500 blur-xl opacity-30 rounded-full group-hover:opacity-50 transition-opacity" />
                  <step.icon className="w-5 h-5 text-pink-400 relative z-10" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-sm mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
