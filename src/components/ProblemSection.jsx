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
    },
    {
      title: "Лишние действия",
      desc: "Регистрации, подписки, оплаты, переключения между сервисами — время и деньги уходят не на контент, а на постоянную возню с инструментами."
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#030105] via-[#06030c] to-[#030105]">
      
      {/* ─── Атмосферное мягкое свечение ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[80%] bg-indigo-900/10 blur-[150px] md:blur-[180px] pointer-events-none -z-10 rounded-[100%]" />
      
      <div className="max-w-6xl mx-auto relative z-10 bg-[#06030c]/40 backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 lg:p-20 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center mb-16 md:mb-24"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/[0.04] bg-transparent text-zinc-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-8">
            <span>Знакомая ситуация?</span>
          </div>
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">
              Создание контента <br className="hidden md:block"/> превратилось в <span className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">хаос?</span>
            </h2>
          </div>
          
          {/* Подзаголовок */}
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mt-2 leading-relaxed">
            Тратите часы на правки, а результат всё равно выглядит как AI
          </p>
        </motion.div>

        {/* ─── Премиальная сетка карточек 2x2 ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto relative place-items-stretch">
          
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="group p-8 md:p-10 lg:p-12 rounded-[2rem] flex flex-col justify-center min-h-[240px] bg-[#0c0814] border border-[#1a1423] hover:border-[#2a1d3d] hover:bg-[#0f091a] transition-all duration-300"
            >
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="text-zinc-400/90 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed text-[15px] md:text-base font-medium">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
