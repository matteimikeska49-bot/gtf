import React from 'react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina K.",
      role: "Эксперт по питанию",
      text: "Я реально ненавидела этап «сесть и написать пост». Идея есть, а пока сформулируешь, пока оформишь — проходит два часа. Сейчас закидываю тему — получаю структуру, текст, визуал. И он звучит как я, а не как робот.",
      result: "С 2 постов в неделю → 5, без увеличения времени",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Daniel R.",
      role: "Marketing Lead, London",
      text: "I used to spend half my Sunday batching content for the week. Different tabs for AI text, another for design, another for competitor research. Now it's one flow — idea to carousel in minutes. The tone actually sounds like me, not like a chatbot wrote it.",
      result: "Content production time cut by 70%",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Artem N.",
      role: "Основатель студии интерьеров",
      text: "Контент — это то, что я откладываю каждый день. Я не копирайтер и не дизайнер. Но клиенты приходят из Instagram, и без постов просто нет заявок. За первую неделю сделал 6 каруселей. Две принесли заявки — впервые за два месяца.",
      result: "6 каруселей за неделю → 2 входящие заявки",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
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
      result: "8 из 10 текстов — сразу в публикацию",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Sophie van D.",
      role: "Content Strategist, Amsterdam",
      text: "We manage content for 6 clients. Before GoToFlow, each one needed 3–4 hours a week just for copy and carousels. Now the team handles the same volume in a fraction of the time. The Spy feature alone saves us hours of competitor research.",
      result: "~15 hours saved per week across the team",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: "Natalia G.",
      role: "Психолог, частная практика",
      text: "Мне важно, чтобы контент звучал как я, а не как «топ-5 способов справиться с тревогой». Все AI до этого выдавали именно такое. Здесь я настроила подачу под себя — и подписчики стали писать в личку чаще. Это лучшая метрика.",
      result: "Рост входящих сообщений на 40%",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
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
      result: "×2 к объёму контента при том же рабочий дне",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
      name: "James T.",
      role: "Founder, DTC Brand, NYC",
      text: "I was paying a freelance SMM $800/mo for templated posts that didn't convert. Decided to try doing it myself. Got the hang of GoToFlow in about 10 minutes. Now I post 4 times a week — nothing fancy, but real and on-brand. Saves me a fortune.",
      result: "Replaced freelance SMM → saving $800/mo",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg"
    },
    {
      name: "Igor M.",
      role: "Владелец барбершопа, 2 точки",
      text: "Честно — я вообще не понимаю в контенте. Нанимал SMM, но 25 тысяч в месяц за шаблонные посты — было больно. Разобрался за 10 минут. Делаю 3–4 поста в неделю. Не шедевры, но живые и про нас.",
      result: "Заменил SMM-щика → экономия 25 000 ₽/мес",
      avatar: "https://randomuser.me/api/portraits/men/60.jpg"
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
      result: "Первые целевые лиды после 2-й карусели",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
  ];

  // Дублируем элементы для непрерывного бесконечного потока
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  return (
    <section className="relative z-10 py-16 md:py-24 w-full flex flex-col items-center overflow-hidden">
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            animation: slide 40s linear infinite;
          }
        `}
      </style>

      <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/5 to-rose-500/10 blur-[120px] w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight relative z-20">
        Что говорят креаторы
      </h2>

      <div className="w-full max-w-[100vw] overflow-hidden relative z-20">
        {/* Left Shadow Overlay */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9), transparent)' }}
        ></div>

        {/* Right Shadow Overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.9), transparent)' }}
        ></div>

        <div className="flex flex-nowrap items-stretch gap-6 animate-slide w-max px-6">
          {duplicatedTestimonials.map((t, idx) => {
            /* ── Stat accent card ── */
            if (t.type === 'stat') {
              return (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-[280px] md:w-[350px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-center h-auto min-h-[250px]"
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
                className="flex-shrink-0 w-[300px] md:w-[400px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col justify-between h-auto min-h-[250px]"
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
                <div className="flex items-center gap-3 mt-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" loading="lazy" />
                  <div className="flex flex-col">
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-zinc-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
