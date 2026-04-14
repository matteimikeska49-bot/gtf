import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Stagger animation preset ── */
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

export const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    {
      title: "Тратишь 3 часа → получаешь мусор",
      text: "AI вроде помогает, но на выходе всё равно сырой результат, который приходится переписывать и переделывать вручную."
    },
    {
      title: "Контент выглядит как у всех",
      text: "Шаблонные тексты, одинаковая подача, безликий результат — выкладываешь, но нет отклика и смысла."
    },
    {
      title: "Каждый раз всё по новой",
      text: "Нет цельного процесса, стиль плывёт, и каждый новый контент приходится собирать почти с нуля."
    },
    {
      title: "Лишние действия",
      text: "Регистрации, подписки, оплаты, переключения между сервисами — время и деньги уходят не на контент, а на постоянную возню с инструментами."
    }
  ];

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 w-full flex flex-col items-center bg-[#050505]">

      {/* Primary ambient glow — breathing, warm pink */}
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, rgba(249,115,22,0.07) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Secondary depth glow — warm orange floor, breathing offset */}
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[8%] left-[45%] -translate-x-1/2 w-[400px] h-[280px] rounded-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.16) 0%, rgba(236,72,153,0.06) 55%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Заголовки */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20 px-6"
      >
        Создание контента превратилось в <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">хаос?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20 px-6"
      >
        Тратите часы на правки, а результат всё равно выглядит как AI
      </motion.p>

      {/* Outer Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
        className="relative w-full max-w-6xl mx-auto px-4 z-10"
      >
        <div className="relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Ultra-subtle top edge refraction */}
          <div className="absolute top-0 inset-x-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />

          {/* Soft vertical light wash — adds depth without noise */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 25%, transparent 75%, rgba(236,72,153,0.015) 100%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 relative z-20">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="group relative bg-white/[0.03] border border-white/[0.07] backdrop-blur-2xl rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_12px_40px_-8px_rgba(236,72,153,0.12),0_6px_24px_-6px_rgba(249,115,22,0.08)]"
              >
                {/* Inner glow on hover — warm pink-orange tint */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/[0.04] group-hover:to-orange-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Visual hierarchy — top-row cards get a faint always-on warm accent */}
                {index < 2 && (
                  <div
                    className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full pointer-events-none opacity-60"
                    style={{
                      background: index === 0
                        ? 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)',
                      filter: 'blur(40px)',
                    }}
                  />
                )}

                <h3 className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3 tracking-tight leading-snug relative z-10">
                  {card.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[0.95rem] relative z-10 transition-colors duration-300 group-hover:text-zinc-300">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
