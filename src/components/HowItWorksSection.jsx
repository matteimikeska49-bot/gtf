import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Download,
      title: "Ввод (Input)",
      desc: "Загрузите сырую идею, надиктуйте голос, вставьте ссылку на статью конкурента или запись вебинара."
    },
    {
      icon: Sparkles,
      title: "Генерация",
      desc: "AI собирает готовый черновик поста или карусели, идеально адаптируясь под ваш tone of voice и эстетику."
    },
    {
      icon: CheckCircle2,
      title: "Полировка",
      desc: "Легкая и прозрачная доработка в удобном встроенном визуальном редакторе перед экспортом."
    }
  ];

  return (
    <section className="py-20 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1000px] h-[800px] bg-zinc-800/10 blur-[150px] opacity-30 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Чистый Workflow</span>
          </div>
          
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">
              От сырой идеи до публикации <br className="hidden md:block"/> за 3 простых шага
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Мы спроектировали процесс так, чтобы искусственный интеллект выполнял черновую работу, а вы принимали финальные креативные решения.
          </p>
        </motion.div>

        <div className="relative mt-20 max-w-5xl mx-auto">
          {/* Сетка соединяющих линий навигации */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
          
          {/* Анимированная бегущая линия (Neon effect) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px overflow-hidden">
             <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_#ffffff]"
             />
          </div>

          <div className="md:hidden absolute left-[3.25rem] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                className="relative group flex flex-col md:items-center text-left md:text-center mt-0 md:mt-0"
              >
                {/* Обертка для неон-иконки, позиционируется на линии */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] shrink-0 mb-10 z-20 shadow-2xl group-hover:scale-110 group-hover:border-white/30 transition-all duration-500 mx-0 md:mx-auto">
                  <div className="absolute inset-0 bg-white blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl" />
                  <step.icon className="w-6 h-6 text-zinc-100 relative z-10" />
                  
                  {/* Circle number indicator */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400">
                    {i + 1}
                  </div>
                </div>
                
                {/* Стеклянная карточка-подложка для контента */}
                <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-colors duration-500 shadow-xl relative overflow-hidden flex-1 md:hover:-translate-y-2 transform">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">
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
