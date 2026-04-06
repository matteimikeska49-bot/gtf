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
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

      {/* Легкое, чисто белое атмосферное свечение (без красного) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[80%] bg-white/[0.02] blur-[150px] md:blur-[180px] pointer-events-none -z-10 rounded-[100%]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Главный заголовок */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight text-center text-balance">
            Создание контента превратилось в хаос?
          </h2>
          
          {/* Подзаголовок */}
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-center mt-4">
            Тратите часы на правки, а результат всё равно выглядит как AI.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-16">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.15]"
            >
              <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                {p.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
