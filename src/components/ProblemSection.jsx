import React from 'react';
import { motion } from 'framer-motion';

export const ProblemSection = () => {
  const problems = [
    {
      title: "тратишь 3 часа → получаешь мусор",
      desc: "AI вроде помогает, но на выходе всё равно сырой результат, который приходится переписывать и переделывать вручную."
    },
    {
      title: "контент выглядит как у всех",
      desc: "Шаблонные тексты, одинаковая подача, безликий результат — выкладываешь, но нет отклика и смысла."
    },
    {
      title: "каждый раз всё по новой",
      desc: "Нет цельного процесса, стиль плывёт, и каждый новый контент приходится собирать почти с нуля."
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 overflow-hidden bg-[#050505]">
      
      {/* ─── Очень тусклый, холодный фоновый свет ─── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-[100%] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <span>Знакомая ситуация?</span>
          </div>
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-balance">
              Создание контента <br className="hidden md:block"/> превратилось в <span className="text-gradient-brand">хаос?</span>
            </h2>
          </div>
          
          {/* Подзаголовок */}
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-center mt-4">
            Тратите часы на правки, а результат всё равно выглядит как AI
          </p>
        </motion.div>

        {/* ─── Сетка и карточки (парящие, стеклянные) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] place-items-stretch">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] h-full flex flex-col"
            >
              <h3 className="text-xl font-semibold text-zinc-100 mb-4 tracking-tight leading-snug">
                {p.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-base flex-1">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
