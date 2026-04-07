import React from 'react';
import { motion } from 'framer-motion';

// Подкомпонент с антигравитационными частицами и светящимися нитями
const Particles = () => {
  const particlesCount = 20;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[3rem] z-0">
      {/* Летающие светящиеся пылинки (антигравитация) */}
      {Array.from({ length: particlesCount }).map((_, i) => (
        <motion.div
           key={`particle-${i}`}
           className="absolute w-1 h-1 rounded-full blur-[1px]"
           style={{
             background: i % 2 === 0 ? '#f97316' : '#ec4899', // Orange or Pink
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100 + 10}%`,
           }}
           animate={{
             y: [0, - Math.random() * 300 - 100],
             x: [0, (Math.random() - 0.5) * 100],
             opacity: [0, 0.4, 0],
             scale: [0.5, 1.2, 0.5],
           }}
           transition={{
             duration: Math.random() * 15 + 15,
             repeat: Infinity,
             ease: "linear",
             delay: Math.random() * 10,
           }}
        />
      ))}
      
      {/* Нежные световые нити / световые столбы */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`filament-${i}`}
          className="absolute h-[800px] w-1 bg-gradient-to-t from-transparent via-orange-400/20 to-transparent blur-md transform -rotate-12"
          style={{ left: `${15 + i*25}%`, top: '-20%' }}
          animate={{ 
             rotate: [-12, -8, -12],
             opacity: [0.05, 0.25, 0.05],
             x: [0, 20, 0]
          }}
          transition={{ duration: 7 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export const ProblemSection = () => {
  const cards = [
    {
      title: "тратишь 3 часа → получаешь мусор",
      text: "AI вроде помогает, но на выходе всё равно сырой результат, который приходится переписывать и переделывать вручную."
    },
    {
      title: "контент выглядит как у всех",
      text: "Шаблонные тексты, одинаковая подача, безликий результат — выкладываешь, но нет отклика и смысла."
    },
    {
      title: "каждый раз всё по новой",
      text: "Нет цельного процесса, стиль плывёт, и каждый новый контент приходится собирать почти с нуля."
    },
    {
      title: "Лишние действия",
      text: "Регистрации, подписки, оплаты, переключения между сервисами — время и деньги уходят не на контент, а на постоянную возню с инструментами."
    }
  ];

  return (
    <section className="relative z-10 py-24 w-full flex flex-col items-center">
      {/* Очень плавное фоновое свечение (Только теплое розово-оранжевое, без фиолетового) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[70%] -z-20 pointer-events-none bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-orange-500/10 blur-[150px]"></div>

      {/* Заголовки */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20">
        Создание контента превратилось в <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">хаос?</span>
      </h2>
      <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20">
        Тратите часы на правки, а результат всё равно выглядит как AI
      </p>

      {/* Массивная задняя подложка (Massive Glass Plate) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 z-10">
        <div className="relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-[0_0_80px_rgba(249,115,22,0.03)] overflow-hidden">
          
          {/* Антигравитационный фон и нити */}
          <Particles />

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
            {cards.map((card, index) => {
              // У каждой карточки уникальная скорость и задержка флоатинга для хаотичности
              const floatDuration = 4 + (index % 3) * 1.5;
              const floatDelay = index * 0.4;
              const driftOffsets = index % 2 === 0 ? [0, -12, 0] : [0, -8, 0];

              return (
                <motion.div 
                  key={index}
                  initial={{ y: 0 }}
                  animate={{ y: driftOffsets }}
                  transition={{ 
                    duration: floatDuration, 
                    delay: floatDelay,
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                  className="bg-[#0a0a0a]/60 border border-white/[0.06] backdrop-blur-xl rounded-[2rem] p-8 transition-colors duration-300 hover:bg-[#111]/80 hover:border-white/[0.12] shadow-2xl relative overflow-hidden group"
                >
                  {/* Тонкий внутренний градиент при наведении (теплые тона) */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-pink-500/0 via-orange-500/0 to-rose-500/0 group-hover:from-pink-500/5 group-hover:via-orange-500/5 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>

                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-4 tracking-tight leading-snug relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base relative z-10">
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
