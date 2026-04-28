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
    document.title = '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки';

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
    };

    const desc = '50 идей каруселей для LinkedIn: примеры, структура, ошибки и как делать посты, которые получают охваты и клиентов.';
    setMeta('description', desc);
    setMeta('og:title', '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки', true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin', true);
    setLink('canonical', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin');

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
    <section className="pb-14 px-6 relative z-10 w-full bg-[#050505]">
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
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
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
  <div className="my-14 p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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
  <div className="mb-12">
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">{title}</h2>
      {count && <span className="text-xs text-zinc-600 font-medium tracking-wide">{count} идей</span>}
    </div>
    {children}
  </div>
);

/* ── Idea card (numbered, visually separated) ── */
const IdeaList = ({ items, startNum = 1 }) => (
  <div className="space-y-4">
    {items.map((item, i) => (
      <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.025] transition-colors">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/15 flex items-center justify-center text-[11px] font-bold text-pink-400/80 tabular-nums mt-0.5">
          {startNum + i}
        </span>
        <div className="min-w-0">
          <p className="text-zinc-200 font-medium text-[15px] leading-snug">{item.title}</p>
          {item.desc && <p className="text-zinc-500 text-[13px] mt-1 leading-relaxed">{item.desc}</p>}
        </div>
      </div>
    ))}
  </div>
);

/* ── Article Body ── */
const ArticleBody = () => (
  <article className="py-8 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto">

      <p className="text-zinc-400 text-[15px] leading-[1.8] mb-6">
        Карусели в LinkedIn сейчас работают лучше всего остального. Они дают в 3–5 раз больше охватов, чем обычные текстовые посты, отлично задерживают внимание и приносят лиды.
      </p>
      <p className="text-zinc-400 text-[15px] leading-[1.8] mb-6">
        Проблема не в том, чтобы сверстать слайды в Figma. Главный затык — <strong className="text-zinc-200">о чем вообще писать?</strong>
      </p>
      <p className="text-zinc-400 text-[15px] leading-[1.8] mb-12">
        Я собрал 50 готовых идей для LinkedIn каруселей, которые можно брать и использовать прямо сегодня. Разбил их по категориям, чтобы было проще собирать контент-план.
      </p>

      {/* ── 1. Экспертность и инсайты рынка (7 идей) ── */}
      <Section title="Экспертность и инсайты рынка" count="7">
        <IdeaList startNum={1} items={[
          { title: '"5 трендов, которые изменят [ваша ниша] в 2026 году"', desc: 'Покажите, что вы держите руку на пульсе и видите рынок дальше остальных.' },
          { title: '"Чему меня научили 10 лет работы в [сфера]"', desc: 'Формат рефлексии. Люди любят чужой опыт без прикрас.' },
          { title: '"Непопулярное мнение о [тема]"', desc: 'Отличный триггер для комментов. Поспорьте с общепринятым стереотипом.' },
          { title: '"Будущее [ваша индустрия]: мои прогнозы"', desc: 'Дайте прогноз с опорой на факты и цифры.' },
          { title: '"3 мифа о [тема], в которые пора перестать верить"', desc: 'Разрушение мифов всегда собирает много репостов и сохранений.' },
          { title: '"Разбор стратегии: как [известная компания] сделала X"', desc: 'Кейс на чужом примере. Покажите свою экспертность через анализ чужого успеха.' },
          { title: '"Как [новая технология/AI] повлияет на работу [профессия]"', desc: 'Свяжите хайповую тему с вашей нишей.' },
        ]} />
      </Section>

      {/* ── 2. Обучение и How-To (8 идей) ── */}
      <Section title="Обучение и форматы How-To" count="8">
        <IdeaList startNum={8} items={[
          { title: '"Пошаговый гайд: как сделать [результат]"', desc: 'Один шаг на один слайд. Максимально практично.' },
          { title: '"Дорожная карта для новичков в [сфера]"', desc: 'С чего начать, чтобы не наломать дров. Идеально для сохранения в закладки.' },
          { title: '"Как достичь [результат] без [популярный инструмент/бюджет]"', desc: 'Дайте альтернативный, более дешевый или быстрый путь.' },
          { title: '"5 фреймворков, которые должен знать каждый [профессия]"', desc: 'Структурируйте хаос. Фреймворки обожают сохранять.' },
          { title: '"Как мы выросли с [точка А] до [точка Б] за [время]"', desc: 'История трансформации через конкретные шаги.' },
          { title: '"Точный процесс: как я делаю [задача]"', desc: 'Покажите внутрянку своей работы, ваши шаблоны и подходы.' },
          { title: '"Ошибки, которые я совершил, чтобы вы их не повторяли"', desc: 'Формат «учись на чужих ошибках». Работает на доверие.' },
          { title: '"Полный чек-лист для запуска [проект/задача]"', desc: 'Высокая конверсия в репосты. Чек-листы — это классика.' },
        ]} />
      </Section>

      {/* ── 3. Данные, цифры и аналитика (6 идей) ── */}
      <Section title="Цифры, кейсы и аналитика" count="6">
        <IdeaList startNum={16} items={[
          { title: '"10 цифр, которые доказывают, что [факт]"', desc: 'Добавьте авторитета вашим словам через статистику.' },
          { title: '"Было / Стало: как внедрение [инструмент] повлияло на [метрика]"', desc: 'Визуальное сравнение до и после работает лучше тысячи слов.' },
          { title: '"Что на самом деле говорят данные о [тема]"', desc: 'Сделайте выжимку из скучного отчета на 50 страниц в 5 слайдов.' },
          { title: '"Разбор ROI: стоит ли вкладываться в [инструмент/канал]"', desc: 'Контент, который цепляет фаундеров и руководителей (B2B).' },
          { title: '"Бенчмарки индустрии на 2026 год"', desc: 'Покажите средние показатели по рынку. Люди хотят знать, где они находятся.' },
          { title: '"Почему 90% [компаний/специалистов] проваливают [задача]"', desc: 'Статистика с негативным оттенком всегда привлекает внимание.' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Сгенерируйте карусель из этих идей прямо сейчас"
        to="/ru/generator-karuselej-linkedin"
      />

      {/* ── 4. Личный бренд и закулисье (7 идей) ── */}
      <Section title="Личный бренд и закулисье" count="7">
        <IdeaList startNum={22} items={[
          { title: '"Моя утренняя рутина как [роль/должность]"', desc: 'Лайфстайл-пост. Очеловечивает вас как специалиста.' },
          { title: '"Что бы я хотел знать до того, как стал [профессия]"', desc: 'Отличный формат для нетворкинга с коллегами по цеху.' },
          { title: '"О чем молчат [профессия] (и никто вам не расскажет)"', desc: 'Взгляд изнутри. Инсайдерская информация.' },
          { title: '"Мой набор инструментов: что я использую каждый день"', desc: 'Люди обожают подборки софта и сервисов.' },
          { title: '"Мой самый большой провал и какой урок я извлек"', desc: 'Уязвимость продает. Никто не любит идеальных.' },
          { title: '"5 книг, которые изменили мой подход к работе"', desc: 'Классическая подборка, которая всегда собирает комменты.' },
          { title: '"Закулисье: как мы делали [проект/продукт]"', desc: 'Расскажите о сложностях и решениях в процессе работы.' },
        ]} />
      </Section>

      {/* ── 5. Подборки и быстрые победы (7 идей) ── */}
      <Section title="Подборки и быстрые форматы" count="7">
        <IdeaList startNum={29} items={[
          { title: '"7 бесплатных инструментов для [задача]"', desc: 'Сохраняемость таких постов всегда зашкаливает.' },
          { title: '"10 лайфхаков для [инструмент], о которых вы не знали"', desc: 'Секретные фишки популярных программ (например, Notion, Figma).' },
          { title: '"5 промптов для ChatGPT, которые заменят вам ассистента"', desc: 'Промпты сейчас на пике популярности. Делитесь рабочими.' },
          { title: '"8 привычек высокоэффективных [профессия]"', desc: 'Пост-вдохновение. Хорошо расходится через репосты.' },
          { title: '"3 вещи, которые нужно перестать делать в [сфера]"', desc: 'Советы от обратного (что НЕ надо делать).' },
          { title: '"6 рассылок / блогов, которые я читаю каждое утро"', desc: 'Полезные ресурсы. Отмечайте авторов, чтобы получить от них репост.' },
          { title: '"Набор новичка: что нужно для старта в [сфера]"', desc: 'Минимум инструментов или знаний для быстрого старта.' },
        ]} />
      </Section>

      {/* ── 6. Вовлечение и дискуссии (5 идей) ── */}
      <Section title="Вовлечение и дискуссии" count="5">
        <IdeaList startNum={36} items={[
          { title: '"Согласны или нет? [спорное утверждение]"', desc: 'Лучший способ раскачать аудиторию на комментарии.' },
          { title: '"Отсортируйте эти [варианты] от лучшего к худшему"', desc: 'Интерактив. Заставляет людей писать свое мнение.' },
          { title: '"Что выберете вы: А или Б?"', desc: 'Простое A/B сравнение (например, офис или удаленка).' },
          { title: '"Продолжите фразу: Лучший способ найти клиента — это ___"', desc: 'Вовлечение через открытый вопрос.' },
          { title: '"Отметьте в комментах человека, которому это сейчас нужно"', desc: 'Прямой призыв, который расширяет ваш органический охват.' },
        ]} />
      </Section>

      {/* ── 7. Создание контента и стратегия (5 идей) ── */}
      <Section title="Стратегия и контент" count="5">
        <IdeaList startNum={41} items={[
          { title: '"Моя контентная стратегия на одной картинке"', desc: 'Мета-контент (пост о том, как вы делаете посты) заходит на ура.' },
          { title: '"Как из одного видео сделать 10 единиц контента"', desc: 'Тема дистрибуции и переиспользования контента.' },
          { title: '"Анатомия вирусного поста в LinkedIn"', desc: 'Разберите свой (или чужой) успешный пост по косточкам.' },
          { title: '"Шаблон контент-плана на месяц для B2B"', desc: 'Дайте готовый шаблон. Можно прикрепить ссылку на Notion.' },
          { title: '"Как писать хуки (заголовки), которые останавливают скролл"', desc: 'Копирайтерские фишки с наглядными примерами.' },
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
          { title: '"Навыки, за которые будут платить в 2027 году"', desc: 'Взгляд в будущее. Что учить прямо сейчас.' },
          { title: '"Как просить повышение зарплаты (пошагово)"', desc: 'Супер-практичный пост для наемных сотрудников.' },
          { title: '"Красные флаги в вакансиях и на собеседованиях"', desc: 'То, о чем все думают, но редко говорят.' },
          { title: '"Как перейти из [сфера А] в [сфера Б] без потери в деньгах"', desc: 'Гайд по смене профессии или ниши.' },
          { title: '"Что на самом деле ищут HR в вашем резюме"', desc: 'Взгляд со стороны работодателя. Очень полезно для соискателей.' },
        ]} />
      </Section>

      {/* ── How to create ── */}
      <Section title="Как делать такие карусели быстро">
        <div className="space-y-4">
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            Идеи — это круто, но их реализация обычно съедает кучу времени. Стандартный процесс: написать текст, продумать структуру, открыть Canva/Figma, сверстать 10 слайдов, скачать PDF. Это 1,5–2 часа на один пост.
          </p>
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            С ИИ-генератором <strong className="text-zinc-200">GoToFlow</strong> вы пропускаете всю рутину. Берете любую идею из списка выше, вбиваете пару слов (или вставляете ссылку на статью), и ИИ сам пишет текст, бьет его на слайды и генерирует готовый PDF с вашим дизайном.
          </p>
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            Весь процесс занимает около 60 секунд. Вы просто проверяете результат и публикуете. Это решает главную проблему LinkedIn — позволяет постить регулярно, не тратя на это полдня.
          </p>
        </div>
      </Section>

      {/* ── Tips ── */}
      <Section title="Чек-лист успешной карусели">
        <ul className="space-y-3">
          {[
            'Первый слайд (Хук) решает все. Сделайте заголовок крупным и интригующим.',
            'Один слайд = одна мысль. Не пишите полотна текста, 2-4 короткие строчки — максимум.',
            'Используйте единый визуальный стиль. Люди должны узнавать ваши посты в ленте по цветам и шрифтам.',
            'Последний слайд — всегда призыв к действию (CTA). Задайте вопрос, попросите репост или дайте ссылку в комменты.',
            'Публикуйте со вторника по четверг в первой половине дня (8:00 - 11:00) — это лучшее время для LinkedIn.',
            'Переиспользуйте. Удачная карусель может стать статьей, тредом в X (Twitter) или сценарием для Reels.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400 text-[15px] leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500/60 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </Section>

    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'Обязательно ли делать именно карусели в LinkedIn?', a: 'Нет, текстовые посты тоже работают. Но алгоритмы LinkedIn сейчас отдают приоритет PDF-документам (каруселям), так как они заставляют пользователя дольше задерживаться на посте, кликая слайды.' },
  { q: 'Сколько слайдов должно быть в идеале?', a: 'Оптимально — от 6 до 12 слайдов. Если меньше — не хватает глубины, если больше 15 — люди устают скроллить и уходят.' },
  { q: 'В каком формате нужно загружать карусель?', a: 'LinkedIn не поддерживает формат "картинка за картинкой" как Instagram. Вам нужно сохранить слайды в единый многостраничный PDF-файл и прикрепить его к посту как документ.' },
  { q: 'Какой размер слайдов использовать?', a: 'Лучше всего работают вертикальные слайды (портретная ориентация) размером 1080 x 1350 пикселей (соотношение 4:5). Они занимают максимум места на экране смартфона.' },
  { q: 'Может ли ИИ полностью сделать карусель за меня?', a: 'Да. Инструменты вроде GoToFlow могут не только придумать идеи, но и написать текст для каждого слайда, подобрать структуру и сразу выдать готовый PDF в фирменном стиле за пару минут.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.35 }}><p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-400 leading-relaxed text-sm md:text-base">{item.a}</p></motion.div>}
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-16 md:py-20 px-6 relative z-10 w-full bg-[#050505]">
      <div className="max-w-3xl mx-auto">
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
            Создавайте карусели для LinkedIn в два клика
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Хватит тратить часы на верстку и дизайн. Введите тему, и ИИ GoToFlow соберет готовую карусель — с текстами, структурой и дизайном.
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
