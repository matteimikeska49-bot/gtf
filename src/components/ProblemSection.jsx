import React from 'react';

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
      {/* Фоновое свечение (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[60%] -z-10 pointer-events-none bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-orange-500/10 blur-[120px]"></div>

      {/* Заголовки */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20">
        Создание контента превратилось в хаос?
      </h2>
      <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20">
        Тратите часы на правки, а результат всё равно выглядит как AI
      </p>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto px-4 relative z-20">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="bg-[#0a0a0a]/80 border border-white/[0.08] backdrop-blur-2xl rounded-[2rem] p-8 transition-all duration-300 hover:bg-[#111]/90 hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
          >
            <h3 className="text-xl font-semibold text-white mb-4 tracking-tight leading-snug">
              {card.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-base">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};



