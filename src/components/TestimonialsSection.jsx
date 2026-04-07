import React, { useState, useEffect, useRef } from 'react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina K.",
      role: "Эксперт по питанию",
      text: "Я реально ненавидела этап «сесть и написать пост». Идея есть, а пока сформулируешь, пока оформишь — проходит два часа. Сейчас закидываю тему — получаю структуру, текст, визуал. И он звучит как я, а не как робот.",
      result: "С 2 постов в неделю → 5, без увеличения времени"
    },
    {
      name: "Daniel R.",
      role: "Marketing Lead, London",
      text: "I used to spend half my Sunday batching content for the week. Different tabs for AI text, another for design, another for competitor research. Now it's one flow — idea to carousel in minutes. The tone actually sounds like me, not like a chatbot wrote it.",
      result: "Content production time cut by 70%"
    },
    {
      name: "Artem N.",
      role: "Основатель студии интерьеров",
      text: "Контент — это то, что я откладываю каждый день. Я не копирайтер и не дизайнер. Но клиенты приходят из Instagram, и без постов просто нет заявок. За первую неделю сделал 6 каруселей. Две принесли заявки — впервые за два месяца.",
      result: "6 каруселей за неделю → 2 входящие заявки"
    },
    {
      type: "stat",
      value: "~60 сек",
      label: "Среднее время создания карусели"
    },
    {
      name: "Alina V.",
      role: "Блогер, лайфстайл",
      text: "Я перепробовала штук пять AI-сервисов. Везде одно и то же — текст, который надо полностью переписывать. Смысл тогда? Тут я первый раз получила текст и подумала «о, это прям можно выложить». Не всегда, но в 8 случаях из 10.",
      result: "8 из 10 текстов — сразу в публикацию"
    },
    {
      name: "Sophie van D.",
      role: "Content Strategist, Amsterdam",
      text: "We manage content for 6 clients. Before GoToFlow, each one needed 3–4 hours a week just for copy and carousels. Now the team handles the same volume in a fraction of the time. The Spy feature alone saves us hours of competitor research.",
      result: "~15 hours saved per week across the team"
    },
    {
      name: "Natalia G.",
      role: "Психолог, частная практика",
      text: "Мне важно, чтобы контент звучал как я, а не как «топ-5 способов справиться с тревогой». Все AI до этого выдавали именно такое. Здесь я настроила подачу под себя — и подписчики стали писать в личку чаще. Это лучшая метрика.",
      result: "Рост входящих сообщений на 40%"
    },
    {
      type: "stat",
      value: "3 000+",
      label: "Пользователей за первые 3 месяца"
    },
    {
      name: "Sasha L.",
      role: "Контент-менеджер, фриланс",
      text: "Самое бесячее — жонглировать ChatGPT, Canva, заметки, потом собирать всё вручную. К концу дня голова квадратная, а сделал три поста. Здесь весь процесс в одном окне. Идея → структура → текст → карусель. Просто стал успевать больше.",
      result: "×2 к объёму контента при том же рабочем дне"
    },
    {
      name: "James T.",
      role: "Founder, DTC Brand, NYC",
      text: "I was paying a freelance SMM $800/mo for templated posts that didn't convert. Decided to try doing it myself. Got the hang of GoToFlow in about 10 minutes. Now I post 4 times a week — nothing fancy, but real and on-brand. Saves me a fortune.",
      result: "Replaced freelance SMM → saving $800/mo"
    },
    {
      name: "Igor M.",
      role: "Владелец барбершопа, 2 точки",
      text: "Честно — я вообще не понимаю в контенте. Нанимал SMM, но 25 тысяч в месяц за шаблонные посты — было больно. Разобрался за 10 минут. Делаю 3–4 поста в неделю. Не шедевры, но живые и про нас.",
      result: "Заменил SMM-щика → экономия 25 000 ₽/мес"
    },
    {
      type: "stat",
      value: "84%",
      label: "Публикуют контент без правок"
    },
    {
      name: "Dmitry V.",
      role: "Founder, EdTech-стартап",
      text: "Выкладывал посты каждый день на интуиции, но заявок не было. Тратил уйму времени на пустые охваты. Система помогла выстроить логику контента — каждый пост стал шагом в воронке. Лиды начали писать в директ после второй карусели.",
      result: "Первые целевые лиды после 2-й карусели"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDelta, setSlideDelta] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const trackRef = useRef(null);

  useEffect(() => {
    const calcDelta = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const child = trackRef.current.children[0];
        setSlideDelta(child.offsetWidth + 24); // 24px = gap-6
      }
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };

    calcDelta();
    window.addEventListener('resize', calcDelta);
    return () => window.removeEventListener('resize', calcDelta);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = testimonials.length - itemsPerView;
        return prev >= max ? 0 : prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [itemsPerView, testimonials.length]);

  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  return (
    <section className="relative z-10 py-16 md:py-24 w-full flex flex-col items-center overflow-hidden">
      <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/5 to-rose-500/10 blur-[120px] w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight relative z-20">
        Что говорят креаторы
      </h2>

      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden relative z-20">
        <div 
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-6 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * slideDelta}px)` }}
        >
          {testimonials.map((t, idx) => {
            /* ── Stat accent card ── */
            if (t.type === 'stat') {
              return (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-full md:w-[calc(33.333333%-1rem)] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-center h-auto min-h-[250px]"
                >
                  <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3 tracking-tight">
                    {t.value}
                  </span>
                  <span className="text-zinc-400 text-sm md:text-base text-center font-medium leading-snug">
                    {t.label}
                  </span>
                </div>
              );
            }

            /* ── Testimonial card ── */
            return (
              <div 
                key={idx}
                className="flex-shrink-0 w-full md:w-[calc(33.333333%-1rem)] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col justify-between h-auto min-h-[250px]"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className="whitespace-normal break-words text-zinc-300 text-base leading-relaxed italic mb-4">
                    "{t.text}"
                  </p>
                  {t.result && (
                    <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-6">
                      {t.result}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-white font-medium">{t.name}</div>
                  <div className="text-zinc-500 text-sm">{t.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 relative z-20 flex-wrap px-4">
        {[...Array(testimonials.length - itemsPerView + 1)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              idx === currentIndex ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Слайд ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
