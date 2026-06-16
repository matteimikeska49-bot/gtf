import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Layers,
  Palette,
  PlayCircle,
  Search,
  Sparkles,
  UserRound
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { RuMetaDisclaimerFootnote } from './common/RuMetaDisclaimerFootnote';
import { getAppUrlWithRef } from '../utils/url';

const CANONICAL_URL = 'https://gotoflow.io/ru/ii-generator-karuseley';
const APP_URL = 'https://app.gotoflow.io';
const PAGE_TITLE = 'ИИ-генератор каруселей — создать карусель с ИИ | GoToFlow';
const PAGE_DESCRIPTION = 'Создавайте карусели с ИИ в GoToFlow: идея, сценарий, структура, текст по слайдам, визуальный стиль, свои фото, AI-персонажи, слайды и CTA за пару минут.';

const features = [
  { icon: Sparkles, title: 'Помогает найти идею', text: 'Начните с нуля, темы, ссылки, видео или черновика — GoToFlow помогает найти угол подачи.' },
  { icon: Search, title: 'Анализирует конкурентов и виральные видео', text: 'Используйте контентные поводы и идеи из рынка, чтобы быстрее собрать сильную тему.' },
  { icon: Layers, title: 'Собирает сценарий и структуру', text: 'Логика слайдов строится как последовательность: хук, раскрытие, вывод и CTA.' },
  { icon: FileText, title: 'Пишет текст по слайдам', text: 'Текст распределяется по карточкам так, чтобы карусель читалась с телефона.' },
  { icon: Palette, title: 'Формирует визуальную подачу', text: 'GoToFlow помогает подобрать стиль, настроение и дизайн-подачу под задачу.' },
  { icon: ImageIcon, title: 'Позволяет использовать свои фото', text: 'Добавляйте собственные материалы, чтобы карусель выглядела ближе к вашему бренду.' },
  { icon: UserRound, title: 'Генерирует AI-персонажей', text: 'Используйте персонажей и визуальные элементы, когда нужен более живой формат.' },
  { icon: CheckCircle2, title: 'Делает слайды и CTA', text: 'На выходе получается готовая карусель со слайдами, текстом и финальным призывом.' },
];

const steps = [
  'Введите тему, идею или загрузите материал.',
  'Выберите сценарий и формат.',
  'Уточните стиль и визуальную подачу.',
  'Добавьте свои фото или персонажа, если нужно.',
  'Получите готовую карусель.',
  'Проверьте текст и CTA.',
];

const audiences = [
  'creators',
  'SMM-специалисты',
  'маркетологи',
  'агентства',
  'эксперты',
  'личные бренды',
  'владельцы продуктов',
];

const scenarios = [
  'экспертная карусель',
  'продающая карусель',
  'образовательная карусель',
  'LinkedIn carousel',
  'Instagram carousel',
  'карусель из готового текста',
  'карусель из идеи или темы',
  'карусель на основе вирального видео',
];

const faq = [
  {
    q: 'Что такое ИИ-генератор каруселей?',
    a: 'ИИ-генератор каруселей помогает собрать готовую серию слайдов: идею, сценарий, структуру, текст по слайдам, визуальную подачу и CTA.'
  },
  {
    q: 'Можно ли создать карусель без готовой идеи?',
    a: 'Да. В GoToFlow можно начать с нуля: использовать анализ конкурентов, виральные видео, ссылку, тему или короткое описание задачи.'
  },
  {
    q: 'Можно ли использовать свой текст?',
    a: 'Да. Вы можете загрузить или вставить свой текст, а GoToFlow поможет разложить его по слайдам, усилить структуру и добавить CTA.'
  },
  {
    q: 'Можно ли загрузить свои фото?',
    a: 'Да. GoToFlow поддерживает сценарии, где пользовательские фотографии и визуальные предпочтения становятся частью карусели.'
  },
  {
    q: 'GoToFlow заменяет Canva или ChatGPT?',
    a: 'У инструментов разный фокус. ChatGPT и Gemini помогают с отдельными частями, Canva удобна для ручного дизайна, а GoToFlow закрывает полный workflow карусели: от идеи до готовых слайдов.'
  },
  {
    q: 'Можно ли сделать карусель для Instagram и LinkedIn?',
    a: 'Да. GoToFlow подходит для каруселей под Instagram, LinkedIn и другие соцсети, где важны структура, читаемость и визуальная подача.'
  },
  {
    q: 'Можно ли управлять сценарием и текстом по слайдам?',
    a: 'Да. Вы можете задавать тему, сценарий, стиль и материалы, а затем проверять текст, логику слайдов и CTA перед публикацией.'
  },
];

const setMeta = (name, content, property = false) => {
  const attr = property ? 'property' : 'name';
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLink = (rel, href, attrs = {}) => {
  const selector = Object.entries(attrs).reduce(
    (acc, [key, value]) => `${acc}[${key}="${value}"]`,
    `link[rel="${rel}"]`
  );
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const RuAICarouselGeneratorSEOHead = () => {
  useEffect(() => {
    document.documentElement.lang = 'ru';
    document.title = PAGE_TITLE;

    setMeta('description', PAGE_DESCRIPTION);
    setMeta('og:title', PAGE_TITLE, true);
    setMeta('og:description', PAGE_DESCRIPTION, true);
    setMeta('og:url', CANONICAL_URL, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:title', PAGE_TITLE);
    setMeta('twitter:description', PAGE_DESCRIPTION);
    setMeta('twitter:url', CANONICAL_URL);

    setLink('canonical', CANONICAL_URL);
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'en' });
    setLink('alternate', CANONICAL_URL, { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'x-default' });
  }, []);

  return null;
};

const CtaButton = ({ children, variant = 'primary', href = getAppUrlWithRef(APP_URL), className = '' }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300';
  const styles = variant === 'primary'
    ? 'bg-white text-zinc-950 hover:bg-orange-100 hover:shadow-[0_0_30px_rgba(251,146,60,0.25)]'
    : 'border border-white/15 bg-white/[0.03] text-white hover:border-orange-300/50 hover:bg-white/[0.07]';

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
};

export const RuAICarouselGeneratorPage = () => {
  return (
    <MainLayout>
      <RuAICarouselGeneratorSEOHead />
      <Header />

      <main className="min-h-screen bg-zinc-950 text-white">
        <section className="relative overflow-hidden border-b border-white/10 px-4 pt-28 pb-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,146,60,0.22),transparent_38%),linear-gradient(180deg,rgba(24,24,27,0),rgba(9,9,11,1))]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                ИИ для каруселей
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                ИИ-генератор каруселей для Instagram, LinkedIn и соцсетей
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
                GoToFlow помогает пройти путь от идеи до готовой карусели: найти тему, собрать сценарий, разложить текст по слайдам, выбрать визуальную подачу, добавить свои фото или AI-персонажей и получить готовые слайды с CTA за пару минут.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton>Создать карусель с ИИ</CtaButton>
                <CtaButton variant="secondary" href="#workflow">Посмотреть, как работает GoToFlow</CtaButton>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-orange-950/30">
              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950 p-5">
                <div className="mb-5 flex items-center gap-2 text-sm text-zinc-400">
                  <PlayCircle className="h-4 w-4 text-orange-300" />
                  Workflow preview
                </div>
                {['Идея или видео', 'Сценарий и структура', 'Текст по слайдам', 'Визуальная подача', 'Слайды и CTA'].map((item, index) => (
                  <div key={item} className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/15 text-sm font-semibold text-orange-200">{index + 1}</span>
                    <span className="text-sm font-medium text-zinc-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-orange-300/20 bg-orange-400/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Краткий ответ</p>
            <p className="mt-3 text-xl leading-8 text-white">
              ИИ-генератор каруселей — это инструмент, который помогает не просто написать текст, а собрать готовую карусель: идею, сценарий, структуру, текст по слайдам, визуальный стиль, слайды и CTA. GoToFlow делает этот процесс внутри одного workflow.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Что делает GoToFlow</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Icon className="h-6 w-6 text-orange-300" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Как создать карусель с ИИ</h2>
                <p className="mt-4 text-zinc-300">
                  GoToFlow ведёт процесс от первого ввода до готовой карусели, чтобы не собирать текст, дизайн и слайды в разных местах.
                </p>
              </div>
              <div className="grid gap-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-950">{index + 1}</span>
                    <p className="pt-1 text-zinc-100">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Чем отличается GoToFlow</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ['ChatGPT / Gemini', 'помогают с отдельными частями: идеями, текстом или промптами.'],
                ['Canva', 'помогает вручную собрать дизайн.'],
                ['Midjourney', 'создаёт отдельные визуальные ассеты.'],
                ['GoToFlow', 'закрывает весь workflow карусели: от идеи и сценария до текста, визуала, слайдов и CTA.'],
              ].map(([name, text]) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                  <h3 className="font-semibold text-orange-200">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Для кого</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {audiences.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Сценарии</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {scenarios.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-200">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Подробнее про ИИ для каруселей</h2>
            <p className="mt-4 text-zinc-300">
              Эта страница — продуктовая посадочная под создание каруселей с ИИ. Для более подробного разбора подходов, сценариев и примеров есть отдельная статья.
            </p>
            <Link to="/ru/blog/ii-dlya-karuseley" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-200 hover:text-orange-100">
              Подробнее: как использовать ИИ для каруселей
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-8 space-y-4">
              {faq.map(({ q, a }) => (
                <details key={q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white">{q}</summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-orange-300/20 bg-orange-400/10 p-8 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Создайте первую карусель с ИИ в GoToFlow</h2>
            <p className="mx-auto mt-4 max-w-3xl text-zinc-200">
              Начните с темы, готового текста или идеи — GoToFlow поможет собрать сценарий, структуру, визуальную подачу, слайды и CTA в одном workflow.
            </p>
            <div className="mt-8">
              <CtaButton>Создать карусель с ИИ</CtaButton>
            </div>
          </div>
        </section>

        <RuMetaDisclaimerFootnote />
      </main>

      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
