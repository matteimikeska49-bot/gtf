import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { useIsMobile } from '../../hooks/useIsMobile';

const CTA_URL = '/ru/generator-karuselej-linkedin';

/* ── SEO Head ── */
const ArticleSEOHead = () => {
  useEffect(() => {
    document.title = '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки | GoToFlow';

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href, hreflang = null) => {
      let sel = `link[rel="${rel}"]`;
      if (hreflang) sel += `[hreflang="${hreflang}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      if (hreflang) el.setAttribute('hreflang', hreflang);
    };

    const desc = '50 идей каруселей для LinkedIn: примеры, структура, ошибки и как создавать посты, которые получают охваты и заявки';
    setMeta('description', desc);
    setMeta('og:title', '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки | GoToFlow', true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin', true);
    setLink('canonical', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin');
    
    /* Hreflang */
    setLink('alternate', 'https://gotoflow.io/blog/linkedin-carousel-ideas', 'en');
    setLink('alternate', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin', 'ru');

    /* JSON-LD Schema */
    const schemaId = 'linkedin-carousel-ideas-schema-ru';
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки',
        description: desc,
        author: { '@type': 'Organization', name: 'GoToFlow' },
        publisher: { '@type': 'Organization', name: 'GoToFlow', url: 'https://gotoflow.io' },
        mainEntityOfPage: 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin',
        datePublished: '2026-04-28',
        dateModified: '2026-04-28',
      });
      document.head.appendChild(script);
    }

    return () => {
      document.title = 'GoToFlow';
      const s = document.getElementById(schemaId);
      if (s) s.remove();
      
      // Cleanup hreflangs on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, []);
  return null;
};

/* ── Breadcrumbs ── */
const Breadcrumbs = () => (
  <nav className="pt-28 pb-4 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto flex items-center gap-1.5 text-sm text-zinc-500">
      <Link to="/ru" className="hover:text-zinc-300 transition-colors">Главная</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link to="/ru/blog" className="hover:text-zinc-300 transition-colors">Блог</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-400 truncate">Идеи каруселей LinkedIn</span>
    </div>
  </nav>
);

/* ── Hero ── */
const ArticleHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pb-16 md:pb-20 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">Гайд по контенту для LinkedIn</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          50 идей каруселей для LinkedIn, которые реально дают охваты и заявки
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          Забирайте 50 готовых идей для LinkedIn каруселей и превращайте их в конверсионные посты за считанные минуты.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={CTA_URL} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            Сделать карусель <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Inline Product Block ── */
const InlineProductBlock = ({ text, to, btnText = "Попробовать бесплатно" }) => (
  <div className="relative my-16 md:my-20 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.03] via-transparent to-orange-500/[0.02] blur-xl" />
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug">{text}</p>
    </div>
    <Link to={to} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.2)] border border-pink-400/20 group whitespace-nowrap">
      {btnText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

/* ── Section heading ── */
const Section = ({ title, children, count }) => (
  <div className="mb-16 md:mb-20">
    <div className="flex items-baseline gap-3 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">{title}</h2>
      {count && <span className="text-xs text-zinc-500 font-medium tracking-wide">{count} идей</span>}
    </div>
    {children}
  </div>
);

/* ── Idea card (numbered, visually separated) ── */
const IdeaList = ({ items, startNum = 1 }) => (
  <div className="space-y-3">
    {items.map((item, i) => (
      <div key={i} className="flex gap-4 py-4 px-4 md:px-5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.035] transition-colors">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 tabular-nums mt-0.5">
          {startNum + i}
        </span>
        <div className="min-w-0">
          <p className="text-zinc-100 font-medium text-[15px] leading-[1.5]">{item.title}</p>
          {item.desc && <p className="text-zinc-400 text-[13px] mt-1.5 leading-[1.6]">{item.desc}</p>}
        </div>
      </div>
    ))}
  </div>
);

/* ── Article Body ── */
const ArticleBody = () => (
  <article className="pt-4 pb-8 px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    {/* Ambient glow — top of article */}
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    {/* Ambient glow — mid article */}
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    {/* Ambient glow — lower article */}
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="max-w-3xl mx-auto relative z-10">

      <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
        Карусели в LinkedIn сейчас рвут охваты. Они дают в 3–5 раз больше просмотров, чем обычный текст. Отлично задерживают внимание. И главное — приносят лиды.
      </p>
      <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
        Сверстать слайды — не проблема. Главный затык — <strong className="text-white">о чем вообще писать?</strong>
      </p>
      <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
        Держите 50 готовых идей для LinkedIn каруселей. Берите и делайте посты прямо сейчас. Для удобства я разбил их на понятные категории.
      </p>

      {/* ── 1. Экспертность и инсайты рынка (7 идей) ── */}
      <Section title="Экспертность и инсайты рынка" count="7">
        <IdeaList startNum={1} items={[
          { title: '"5 трендов, которые изменят [ваша ниша] в 2026 году"', desc: 'Покажите, что вы видите тренды раньше других.' },
          { title: '"Чему меня научили 10 лет работы в [сфера]"', desc: 'Люди любят честный чужой опыт.' },
          { title: '"Непопулярное мнение о [тема]"', desc: 'Спорный пост собирает много комментариев.' },
          { title: '"Будущее [ваша индустрия]: мои прогнозы"', desc: 'Делайте прогнозы на основе цифр.' },
          { title: '"3 мифа о [тема], в которые пора перестать верить"', desc: 'Мифы отлично репостят и сохраняют.' },
          { title: '"Разбор стратегии: как [известная компания] сделала X"', desc: 'Разберите чужой успех. Покажите экспертность.' },
          { title: '"Как [новая технология/AI] повлияет на работу [профессия]"', desc: 'Свяжите тренд с вашей работой.' },
        ]} />
      </Section>

      {/* ── 2. Обучение и How-To (8 идей) ── */}
      <Section title="Обучение и форматы How-To" count="8">
        <IdeaList startNum={8} items={[
          { title: '"Пошаговый гайд: как сделать [результат]"', desc: 'Один шаг = один слайд. Очень наглядно.' },
          { title: '"Дорожная карта для новичков в [сфера]"', desc: 'План действий. Такое часто сохраняют.' },
          { title: '"Как достичь [результат] без [популярный инструмент/бюджет]"', desc: 'Покажите дешевый или быстрый путь.' },
          { title: '"5 фреймворков, которые должен знать каждый [профессия]"', desc: 'Наведите порядок. Фреймворки обожают.' },
          { title: '"Как мы выросли с [точка А] до [точка Б] за [время]"', desc: 'История роста через реальные шаги.' },
          { title: '"Точный процесс: как я делаю [задача]"', desc: 'Покажите ваши шаблоны и подход к работе.' },
          { title: '"Ошибки, которые я совершил, чтобы вы их не повторяли"', desc: 'Учеба на ошибках. Это вызывает доверие.' },
          { title: '"Полный чек-лист для запуска [проект/задача]"', desc: 'Чек-листы = много репостов.' },
        ]} />
      </Section>

      {/* ── 3. Данные, цифры и аналитика (6 идей) ── */}
      <Section title="Цифры, кейсы и аналитика" count="6">
        <IdeaList startNum={16} items={[
          { title: '"10 цифр, которые доказывают, что [факт]"', desc: 'Цифры дают вес вашим словам.' },
          { title: '"Было / Стало: как внедрение [инструмент] повлияло на [метрика]"', desc: 'Визуал «до/после» продает идею сразу.' },
          { title: '"Что на самом деле говорят данные о [тема]"', desc: 'Упакуйте скучный отчет в 5 слайдов.' },
          { title: '"Разбор ROI: стоит ли вкладываться в [инструмент/канал]"', desc: 'Такой контент цепляет руководителей.' },
          { title: '"Бенчмарки индустрии на 2026 год"', desc: 'Покажите средние цифры по рынку.' },
          { title: '"Почему 90% [компаний/специалистов] проваливают [задача]"', desc: 'Негативная статистика цепляет глаз.' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Сгенерируйте карусель из этих идей прямо сейчас"
        to="/ru/generator-karuselej-linkedin"
      />

      {/* ── 4. Личный бренд и закулисье (7 идей) ── */}
      <Section title="Личный бренд и закулисье" count="7">
        <IdeaList startNum={22} items={[
          { title: '"Моя утренняя рутина как [роль/должность]"', desc: 'Это очеловечивает вас как эксперта.' },
          { title: '"Что бы я хотел знать до того, как стал [профессия]"', desc: 'Хороший повод для общения в комментах.' },
          { title: '"О чем молчат [профессия] (и никто вам не расскажет)"', desc: 'Честный взгляд изнутри.' },
          { title: '"Мой набор инструментов: что я использую каждый день"', desc: 'Все любят подборки софта.' },
          { title: '"Мой самый большой провал и какой урок я извлек"', desc: 'Люди ценят открытость. Идеальных нет.' },
          { title: '"5 книг, которые изменили мой подход к работе"', desc: 'Сборник книг всегда дает комменты.' },
          { title: '"Закулисье: как мы делали [проект/продукт]"', desc: 'Как вы решали проблемы в проекте.' },
        ]} />
      </Section>

      {/* ── 5. Подборки и быстрые победы (7 идей) ── */}
      <Section title="Подборки и быстрые форматы" count="7">
        <IdeaList startNum={29} items={[
          { title: '"7 бесплатных инструментов для [задача]"', desc: 'Такие списки сохраняют чаще всего.' },
          { title: '"10 лайфхаков для [инструмент], о которых вы не знали"', desc: 'Секреты софта (Notion, Figma и т.д.).' },
          { title: '"5 промптов для ChatGPT, которые заменят вам ассистента"', desc: 'Промпты в топе. Дайте рабочие варианты.' },
          { title: '"8 привычек высокоэффективных [профессия]"', desc: 'Пост для вдохновения и репостов.' },
          { title: '"3 вещи, которые нужно перестать делать в [сфера]"', desc: 'Советы от обратного — чего избегать.' },
          { title: '"6 рассылок / блогов, которые я читаю каждое утро"', desc: 'Тегайте авторов ради репостов.' },
          { title: '"Набор новичка: что нужно для старта в [сфера]"', desc: 'База для старта.' },
        ]} />
      </Section>

      {/* ── 6. Вовлечение и дискуссии (5 идей) ── */}
      <Section title="Вовлечение и дискуссии" count="5">
        <IdeaList startNum={36} items={[
          { title: '"Согласны или нет? [спорное утверждение]"', desc: 'Отличный способ собрать комментарии.' },
          { title: '"Отсортируйте эти [варианты] от лучшего к худшему"', desc: 'Люди любят делиться мнением.' },
          { title: '"Что выберете вы: А или Б?"', desc: 'Простой выбор (например, офис или удаленка).' },
          { title: '"Продолжите фразу: Лучший способ найти клиента — это ___"', desc: 'Вовлечение через простой вопрос.' },
          { title: '"Отметьте в комментах человека, которому это сейчас нужно"', desc: 'Отметки растят ваш охват.' },
        ]} />
      </Section>

      {/* ── 7. Создание контента и стратегия (5 идей) ── */}
      <Section title="Стратегия и контент" count="5">
        <IdeaList startNum={41} items={[
          { title: '"Моя контентная стратегия на одной картинке"', desc: 'Людям интересно, как вы ведете блог.' },
          { title: '"Как из одного видео сделать 10 единиц контента"', desc: 'Как делать больше контента малыми силами.' },
          { title: '"Анатомия вирусного поста в LinkedIn"', desc: 'Покажите, почему пост стал вирусным.' },
          { title: '"Шаблон контент-плана на месяц для B2B"', desc: 'Дайте шаблон. Можно прикрепить ссылку на Notion.' },
          { title: '"Как писать хуки (заголовки), которые останавливают скролл"', desc: 'Как цеплять внимание с первой строки.' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Превратите любую идею в готовый контент-план"
        to="/ru/generator-kontenta"
        btnText="Попробовать ИИ-генератор"
      />

      {/* ── 8. Карьера и найм (5 идей) ── */}
      <Section title="Карьера и профессиональный рост" count="5">
        <IdeaList startNum={46} items={[
          { title: '"Навыки, за которые будут платить в 2027 году"', desc: 'Что учить прямо сейчас.' },
          { title: '"Как просить повышение зарплаты (пошагово)"', desc: 'Очень нужный пост для сотрудников.' },
          { title: '"Красные флаги в вакансиях и на собеседованиях"', desc: 'То, о чем часто молчат.' },
          { title: '"Как перейти из [сфера А] в [сфера Б] без потери в деньгах"', desc: 'Как сменить сферу без потерь.' },
          { title: '"Что на самом деле ищут HR в вашем резюме"', desc: 'Взгляд глазами HR.' },
        ]} />
      </Section>

      {/* ── How to create ── */}
      <Section title="Как делать такие карусели быстро">
        <div className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <div className="space-y-5">
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              Идеи — это круто. Но делать их долго. Нужно написать текст, собрать структуру, зайти в Figma, сверстать 10 слайдов, сохранить PDF. Это часа два на один пост.
            </p>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              С ИИ-генератором <strong className="text-white">GoToFlow</strong> рутины нет. Вы берете идею, пишете пару слов (или даете ссылку на статью). ИИ сам пишет текст, разбивает на слайды и делает PDF в вашем дизайне.
            </p>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              Все занимает около минуты. Вы просто проверяете и постите. Так можно вести LinkedIn регулярно и не тратить на это полдня.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Tips ── */}
      <Section title="Чек-лист успешной карусели">
        <div className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <ul className="space-y-5">
            {[
              'Первый слайд решает все. Делайте заголовок крупным и цепким.',
              'Один слайд = одна мысль. Никаких полотен текста. Максимум 3–4 строки.',
              'Держите один стиль. Люди должны узнавать ваши цвета и шрифты в ленте.',
              'Последний слайд — всегда призыв (CTA). Задайте вопрос или попросите репост.',
              'Постите со вторника по четверг утром (8:00 - 11:00). Это лучшее время.',
              'Переиспользуйте контент. Удачная карусель — это готовая статья или сценарий для Reels.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </Section>

    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'Обязательно делать именно карусели?', a: 'Текст тоже работает. Но LinkedIn любит PDF-документы (карусели). Они задерживают людей на посте, пока те листают слайды. Алгоритмам это нравится.' },
  { q: 'Сколько слайдов делать?', a: 'Оптимально — от 6 до 12. Меньше 6 — слишком мало пользы. Больше 15 — люди устают листать.' },
  { q: 'В каком формате грузить?', a: 'LinkedIn не понимает карусели из картинок (как Instagram). Нужно собрать все слайды в один PDF-файл и загрузить его как документ.' },
  { q: 'Какой размер выбрать?', a: 'Лучший вариант — вертикальный 1080 x 1350 пикселей (4:5). Он занимает весь экран телефона.' },
  { q: 'Сделает ли ИИ всю работу?', a: 'Да. GoToFlow сам пишет тексты, делит их на слайды и выдает готовый PDF в вашем стиле.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.35 }}><p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-300 leading-[1.7] text-sm md:text-base">{item.a}</p></motion.div>}
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-16 md:py-20 px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      {/* Ambient glow — FAQ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">Частые вопросы</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => <FAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
        </div>
      </div>
    </section>
  );
};

/* ── Final CTA ── */
const ArticleCTA = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-16 md:py-24 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: isMobile ? 0.6 : 0.8 }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
            Делайте карусели за пару минут
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-[1.7] mb-8 max-w-lg mx-auto">
            Хватит тратить часы на дизайн и верстку. Напишите тему, а ИИ GoToFlow сам соберет тексты и слайды.
          </p>
          <a href={CTA_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
            Попробовать бесплатно <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-zinc-500 mt-4">Без привязки карты • Первые генерации бесплатно</p>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Back to Blog Hub ── */
const BackToBlog = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <Link to="/ru/blog" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors text-sm font-medium">
      Смотреть другие статьи <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </section>
);

/* ── Page ── */
export const LinkedInCarouselIdeasPageRu = () => (
  <MainLayout>
    <ArticleSEOHead />
    <Header />
    <Breadcrumbs />
    <ArticleHero />
    <ArticleBody />
    <ArticleFAQ />
    <ArticleCTA />
    <BackToBlog />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
