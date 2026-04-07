import React from 'react';
import { motion } from 'framer-motion';

// Подкомпонент с антигравитационными частицами
const Particles = () => {
  const particlesCount = 15; // Слегка уменьшено для чистоты
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2rem] z-0 opacity-50"> 
      {/* Летающие светящиеся пылинки */}
      {Array.from({ length: particlesCount }).map((_, i) => (
        <motion.div
           key={`particle-${i}`}
           className="absolute w-1 h-1 rounded-full blur-[2px]"
           style={{
             background: i % 2 === 0 ? '#f97316' : '#ec4899',
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100 + 10}%`,
           }}
           animate={{
             y: [0, - Math.random() * 150 - 50],
             x: [0, (Math.random() - 0.5) * 30],
             opacity: [0, 0.15, 0],
             scale: [0.5, 1, 0.5],
           }}
           transition={{
             duration: Math.random() * 15 + 20, // Значительно медленнее
             repeat: Infinity,
             ease: "linear",
             delay: Math.random() * 10,
           }}
        />
      ))}
      
      {/* Нежные световые нити */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`filament-${i}`}
          className="absolute h-[800px] w-1 bg-gradient-to-t from-transparent via-orange-400/5 to-transparent blur-xl transform -rotate-12"
          style={{ left: `${20 + i*25}%`, top: '-20%' }}
          animate={{ 
             rotate: [-12, -10, -12],
             opacity: [0.02, 0.08, 0.02],
             x: [0, 10, 0]
          }}
          transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "easeInOut" }}
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
      {/* Radial soft glow point source (Subtle Lighting) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full -z-20 pointer-events-none bg-gradient-to-br from-pink-500/20 to-orange-500/10 blur-[130px] opacity-60"></div>

      {/* Заголовки */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20">
        Создание контента превратилось в <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">хаос?</span>
      </h2>
      <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20">
        Тратите часы на правки, а результат всё равно выглядит как AI
      </p>

      {/* Nested Glassmorphism - Layer 1 */}
      <div className="relative w-full max-w-6xl mx-auto px-4 z-10">
        <div className="relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <Particles />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {cards.map((card, index) => {
              // Tamed animations: Breathing y: [-2, 2] over 6-8 seconds
              const floatDuration = 6 + (index % 2) * 2; 
              const floatDelay = index * 0.5;

              return (
                <motion.div 
                  key={index}
                  initial={{ y: 0 }}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ 
                    duration: floatDuration, 
                    delay: floatDelay,
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                  /* Nested Glassmorphism - Layer 2 */
                  className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-3xl rounded-2xl p-8 transition-colors duration-500 hover:bg-white/[0.06] shadow-lg relative overflow-hidden group"
                >
                  {/* Soft inner glow and subtle border highlight on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-orange-500/20 bg-gradient-to-br from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/5 group-hover:to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>

                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-4 tracking-tight leading-snug relative z-10">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base relative z-10 transition-colors duration-300 group-hover:text-zinc-300">
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
