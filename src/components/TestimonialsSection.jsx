import React, { useState, useEffect, useRef } from 'react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Анна Смирнова",
      role: "Маркетолог",
      text: "Раньше мне казалось, что любой сгенерированный текст — это бездушный пластик. Главной болью было то, что AI убивал мой авторский стиль. Здесь же система подстраивается под мой Tone of Voice настолько точно, что даже преданные читатели не замечают разницы. Карусели получаются живыми, с моими словечками и структурой."
    },
    {
      name: "Михаил Дорохов",
      role: "Эксперт по продажам",
      text: "До внедрения системы я мог убить целый выходной на написание пяти постов на неделю вперед. Сейчас я могу собрать мощную контент-линейку менее чем за час. Структура, смыслы, вовлечение — всё расписывается четко и по делу. Это освободило мне десятки часов в месяц для работы с клиентами."
    },
    {
      name: "Елена Карпова",
      role: "Предприниматель",
      text: "Больше всего выматывала необходимость прыгать между пятью разными нейросетями: в одной ищешь идеи, в другой пишешь текст, в третьей проверяешь. Это приводило к дикому выгоранию. Сейчас у меня единый слаженный процесс: от идеи до готовой карусели всё происходит в одном окне. Я снова полюбила создавать контент."
    },
    {
      name: "Дмитрий Власов",
      role: "Founder",
      text: "Я выкладывал посты каждый день на интуиции, но это не приносило целевых заявок. Тратил уйму времени на пустые охваты. Система помогла выстроить логику контента так, что каждый пост стал шагом в воронке. Как итог — целевые лиды начали писать в директ уже после второй выложенной карусели. Это магия структуры, а не просто текст."
    },
    {
      name: "Виктория Новикова",
      role: "Автор каруселей",
      text: "Обожаю функцию 'Шпион'! Раньше я боялась, что буду просто копировать конкурентов, пытаясь повторить их успех, либо сидела в ступоре перед чистым листом. Теперь инструмент анализирует тренды и вытаскивает лучшие смыслы и упаковку из ниши, предлагая мне свежий угол обзора. Мои карусели стали выглядеть на миллион."
    },
    {
      name: "Алексей Макаров",
      role: "Блогер",
      text: "Главная беда с типовым AI — это когда ты пишешь промпт, а потом еще два часа правишь получившийся бред. Здесь алгоритмы настроены так, что на выходе получается практически готовый, фактурный текст. Максимум 5 минут на легкую редактуру, и пост отправляется в ленту. Настоящий спасательный круг для тех, кто ценит свое время."
    },
    {
      name: "Ольга Лебедева",
      role: "SMM-стратег",
      text: "Вечная проблема моих клиентов — отсутствие системности. Никто не знает, о чем писать завтра. Платформа полностью закрыла эту боль: генерация логичного и продуманного контент-плана занимает минуты. Больше никакого стресса 'что же сегодня выложить', публикации идут регулярно и бьют точно в цель."
    },
    {
      name: "Игорь Тихонов",
      role: "Креатор",
      text: "Раньше мои текстовые посты набирали минимум реакций, несмотря на экспертность. Я боялся, что сложные темы просто не заходят аудитории. С помощью платформы я начал переупаковывать свои знания в структурированные карусели. Результат феноменальный: сохранения и репосты выросли кратно, контент наконец-то начал 'работать'."
    },
    {
      name: "София Мельникова",
      role: "PR Менеджер",
      text: "Функция 'Шпион' — это просто легальный чит-код. Я устала от заезженных заголовков, которые никто не читает. Инструмент анализирует, за что цепляется глаз аудитории сейчас, и генерирует для меня мощные хуки и нестандартные заходы. Мои посты снова начали пробивать баннерную слепоту читателей."
    },
    {
      name: "Павел Костин",
      role: "Контент-продюсер",
      text: "Для меня критически важна стабильность. У меня был жуткий страх, что каждая новая генерация будет звучать как другой человек, и придется всё сшивать руками. Но система держит Tone of Voice железно. От первого до пятого поста в цепочке стиль остается узнаваемым и полностью 'моим'. Это невероятное облегчение."
    }
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
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-full md:w-[calc(33.333333%-1rem)] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col justify-between h-auto min-h-[250px]"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="whitespace-normal break-words text-zinc-300 text-base leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>
              <div className="flex flex-col">
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-zinc-500 text-sm">{t.role}</div>
              </div>
            </div>
          ))}
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
