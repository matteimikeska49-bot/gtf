import { RuMetaDisclaimerFootnote } from '../common/RuMetaDisclaimerFootnote';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { getAppUrlWithRef } from '../../utils/url';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { useIsMobile } from '../../hooks/useIsMobile';

const CTA_URL = 'https://app.gotoflow.io';

/* ── SEO Head ── */
const ArticleSEOHead = () => {
  useEffect(() => {
    document.title = 'Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей';
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href, extra = {}) => {
      const sel = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel); el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };
    
    setMeta('title', 'Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей');
    setMeta('description', 'Сравниваем лучшие AI-генераторы каруселей для Instagram, LinkedIn и соцсетей: GoToFlow, Canva, ChatGPT, Claude, Gemini, Gamma, Figma и другие инструменты.');
    setMeta('og:title', 'Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей', true);
    setMeta('og:description', 'Сравниваем лучшие AI-генераторы каруселей для Instagram, LinkedIn и соцсетей: GoToFlow, Canva, ChatGPT, Claude, Gemini, Gamma, Figma и другие инструменты.', true);
    setMeta('og:url', 'https://gotoflow.io/ru/blog/luchshie-ai-generatory-karuselej', true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', 'Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей', true);
    setMeta('twitter:description', 'Сравниваем лучшие AI-генераторы каруселей для Instagram, LinkedIn и соцсетей: GoToFlow, Canva, ChatGPT, Claude, Gemini, Gamma, Figma и другие инструменты.', true);
    setMeta('twitter:url', 'https://gotoflow.io/ru/blog/luchshie-ai-generatory-karuselej', true);
    
    setLink('canonical', 'https://gotoflow.io/ru/blog/luchshie-ai-generatory-karuselej');
    document.documentElement.lang = 'ru';
    return () => {
      document.title = 'GoToFlow';
    };
  }, []);
  return null;
};

/* ── Breadcrumbs ── */
const Breadcrumbs = () => (
  <nav className="pt-28 pb-4 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-[920px] mx-auto flex items-center gap-1.5 text-sm text-zinc-500">
      <Link to="/ru" className="hover:text-zinc-300 transition-colors">Главная</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link to="/ru/blog" className="hover:text-zinc-300 transition-colors">Блог</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-400 truncate">Лучшие AI-генераторы каруселей</span>
    </div>
  </nav>
);

/* ── Hero ── */
const ArticleHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pb-16 md:pb-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[60px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">AI-инструменты</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          Лучшие AI-генераторы каруселей <span className="text-gradient-brand">в 2026 году</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          Сравниваем лучшие AI-генераторы каруселей для Instagram*, LinkedIn и соцсетей: GoToFlow, Canva, ChatGPT, Claude, Gemini, Gamma, Figma и другие инструменты.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            Попробовать AI Carousel Maker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Inline Product Block ── */
const InlineProductBlock = ({ text, to }) => (
  <div className="relative my-16 md:my-20 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.03] via-transparent to-orange-500/[0.02] blur-xl" />
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug">{text}</p>
    </div>
    <a href={getAppUrlWithRef('https://app.gotoflow.io')} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.2)] border border-pink-400/20 group whitespace-nowrap">
      Попробовать GoToFlow AI Carousel Maker <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </a>
  </div>
);

/* ── Article Body ── */
const ArticleBody = () => (
  <article className="pt-4 pb-8 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="max-w-[920px] mx-auto relative z-10">
      <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">

        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI-генераторов контента стало много. Но когда речь заходит о каруселях для Instagram*, LinkedIn, Telegram, VK или других соцсетей, не каждый инструмент реально закрывает задачу.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Одни сервисы помогают с дизайном.<br />
          Другие — с текстом.<br />
          Третьи — с идеями.<br />
          Но хорошая карусель требует не только красивого шаблона.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Нужны:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сильная идея;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />первый слайд, который цепляет;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />логичная структура;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />короткий текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуальный стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />CTA;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />возможность быстро доработать результат.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Поэтому лучший AI-генератор каруселей — это не просто инструмент, который “разбивает текст на слайды”. Это инструмент, который помогает пройти весь путь: от темы, ссылки, видео или исходного текста до структуры, текста, визуального стиля и готовой карусели.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          В этой статье разберём лучшие AI-инструменты для создания каруселей в 2026 году и покажем, какой сервис выбрать под разные задачи: Instagram*, LinkedIn, Telegram, VK, личный бренд, экспертный контент и маркетинг.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Коротко: какой AI-генератор каруселей выбрать</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-6">
          Если нужен быстрый выбор:
        </p>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-7 mb-6">
          <ul className="space-y-4">
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[10px] font-bold text-pink-400 mt-0.5">★</span><span><strong className="text-white">GoToFlow</strong> — лучший вариант для полного workflow: тема, ссылка, видео или пример конкурента → структура, текст, стиль и готовая карусель.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">2</span><span><strong className="text-white">Canva</strong> — хороший вариант для дизайна, шаблонов и ручной сборки каруселей.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">3</span><span><strong className="text-white">ChatGPT / Claude / Gemini</strong> — подходят для идей, структуры, промптов и текстовых набросков.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">4</span><span><strong className="text-white">Gamma</strong> — удобна для презентационного формата и слайдовых объяснений.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">5</span><span><strong className="text-white">Figma</strong> — лучший вариант для дизайнеров и кастомного визуального стиля.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">6</span><span><strong className="text-white">Taplio / ContentIn</strong> — больше подходят для LinkedIn-workflow и планирования контента.</span></li>
            <li className="flex items-start gap-3.5 text-zinc-200 text-[15px] md:text-base leading-[1.6]"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-zinc-400 mt-0.5">7</span><span><strong className="text-white">Jasper / Copy.ai</strong> — полезны командам, которым важен brand voice и маркетинговые тексты.</span></li>
          </ul>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если вам нужна не просто идея, а готовый процесс создания карусели, смотрите в сторону инструментов, которые закрывают не один этап, а всю цепочку: идея → структура → текст → визуал → готовая карусель.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Что такое AI-генератор каруселей</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI-генератор каруселей — это инструмент, который помогает создавать многостраничные посты для соцсетей.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель обычно состоит из нескольких слайдов. Каждый слайд раскрывает часть одной идеи.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для LinkedIn это чаще всего PDF-документ.<br />
          Для Instagram* — серия изображений.<br />
          Для Telegram или VK — серия карточек, слайдов или визуальных постов.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Базовый AI-инструмент может просто написать текст для слайдов. Более продвинутый — помогает с полной цепочкой:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />анализ входных данных;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />выбор угла;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />первый слайд;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />структура;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуальный стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />генерация карусели;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />доработка.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Разница важна.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если инструмент даёт только текст, вам всё равно нужно отдельно идти в Canva, Figma или другой редактор. Если инструмент помогает сразу собрать структуру и визуальный результат, процесс становится быстрее.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как создать карусель с помощью AI: простой workflow</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Хорошая карусель начинается не с дизайна, а с мысли. Правильный workflow выглядит так:
        </p>

        <div className="space-y-4 mb-14 md:mb-16 text-zinc-300 text-[15px] md:text-base leading-[1.7]">
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">1</span><span><strong>Вставьте тему, ссылку, видео или исходный текст.</strong><br/>Это может быть идея поста, статья, видео конкурента, заметки, тезисы из созвона или старый материал.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">2</span><span><strong>Определите аудиторию и платформу.</strong><br/>Карусель для Instagram, LinkedIn, Telegram и VK должна быть разной по ритму, длине и визуалу.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">3</span><span><strong>Сгенерируйте первый слайд.</strong><br/>Первый слайд должен цеплять. Если он слабый, остальную карусель просто не долистают.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">4</span><span><strong>Соберите структуру.</strong><br/>У карусели должна быть логика: проблема → объяснение → решение → вывод → CTA.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">5</span><span><strong>Сократите текст.</strong><br/>Один слайд — одна мысль. Если на слайде слишком много текста, он будет плохо читаться с телефона.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">6</span><span><strong>Выберите визуальный стиль.</strong><br/>Это может быть премиальный SaaS-стиль, editorial, минимализм, яркий Instagram-стиль или стиль личного бренда.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">7</span><span><strong>Проверьте и доработайте результат.</strong><br/>AI даёт готовую структуру. Финальную версию всё равно нужно проверить: факты, тон, читаемость, логику и визуал.</span></div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Именно поэтому обычного “сделай мне карусель” часто недостаточно. Нужен инструмент, который помогает пройти весь процесс, а не просто выдаёт текст.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Чем AI-генератор каруселей отличается от Canva, Figma и обычного ChatGPT</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Обычный дизайн-инструмент помогает оформить карусель. AI-генератор помогает начать раньше: с идеи, структуры и текста.
        </p>
        
        <div className="mb-8 space-y-4">
          <div className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <div className="font-semibold text-white mb-2">Canva / Figma:</div>
            <div className="text-zinc-300 text-[15px]">у вас уже есть идея и текст → вы собираете дизайн</div>
          </div>
          <div className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <div className="font-semibold text-white mb-2">ChatGPT / Claude / Gemini:</div>
            <div className="text-zinc-300 text-[15px]">у вас есть тема → AI помогает придумать структуру и текст</div>
          </div>
          <div className="p-5 rounded-xl border border-pink-500/20 bg-pink-500/[0.05]">
            <div className="font-semibold text-white mb-2">AI-генератор каруселей:</div>
            <div className="text-zinc-300 text-[15px]">у вас есть тема, ссылка, видео или исходный текст → AI помогает собрать структуру, текст, стиль и готовую карусель</div>
          </div>
        </div>

        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Поэтому важно понимать задачу.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если у вас уже есть готовый текст и нужен только дизайн — подойдут Canva или Figma.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если у вас есть только идея, видео, ссылка, пост конкурента или общий запрос — удобнее использовать AI-инструмент, который помогает собрать саму логику карусели.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI-генератор каруселей для Instagram и LinkedIn: в чём разница</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Карусель для Instagram* и карусель для LinkedIn — это не одно и то же.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Instagram</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для Instagram* важны:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуальность;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />короткие формулировки;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />быстрый ритм;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />крупные заголовки;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />эмоциональная подача;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />читаемость на телефоне;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />яркий первый слайд.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Instagram*-карусель должна быстро привлекать внимание. Человек листает ленту, поэтому первый слайд должен быть максимально понятным и заметным.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">LinkedIn</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для LinkedIn важны:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />экспертность;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />структура;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />логика аргумента;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />полезность;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />PDF/document-формат;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />фреймворки;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />кейсы;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />профессиональная подача.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          LinkedIn-карусель чаще работает как мини-статья или обучающий документ. Там важнее последовательность мысли, экспертность и понятная структура.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Telegram и VK</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для Telegram и VK карусели можно адаптировать как:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />серию карточек;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуальный пост;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />подборку советов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />мини-инструкцию;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />экспертный разбор.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Здесь важно учитывать не только визуал, но и то, как именно аудитория потребляет контент в конкретной платформе.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Есть ли бесплатные AI-генераторы каруселей</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Да, у некоторых инструментов есть бесплатный старт, пробный доступ или ограниченное количество генераций.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Но важно понимать: “бесплатный AI-генератор каруселей” не всегда означает, что вы получите полностью готовый результат без ограничений.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Обычно бесплатные версии могут ограничивать:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />количество генераций;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />экспорт;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />качество шаблонов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />бренд-стили;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />доступ к продвинутым функциям;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />командную работу;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />загрузку ссылок, видео или файлов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />количество вариантов дизайна.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Поэтому при выборе важно смотреть не только на цену, но и на то, какую часть процесса инструмент реально закрывает.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Один сервис может быть бесплатным, но давать только текст.<br />
          Другой может быть платным, но экономить часы на структуре, визуале и доработке.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как мы сравнивали AI-генераторы каруселей</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Чтобы сравнение было честным, важно смотреть не только на популярность инструмента. Мы оцениваем сервисы по нескольким критериям:
        </p>
        <ul className="space-y-6 mb-14 md:mb-16">
          <li>
            <strong className="text-white block mb-1">1. Идея и первый слайд</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Помогает ли инструмент найти сильный угол и хук.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">2. Структура</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Собирает ли он логичную последовательность слайдов.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">3. Текст</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Помогает ли писать короткие, понятные формулировки.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">4. Визуальный стиль</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Можно ли получить не просто текст, а готовый результат.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">5. Работа с источниками</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Можно ли использовать ссылку, видео, статью, заметки или пример конкурента.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">6. Доработка</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Можно ли пересоздать, изменить стиль, сократить текст или поменять подачу.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">7. Платформы</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Подходит ли инструмент для Instagram, LinkedIn, Telegram, VK и других соцсетей.</span>
          </li>
          <li>
            <strong className="text-white block mb-1">8. Скорость</strong>
            <span className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Насколько быстро можно пройти путь от идеи до готовой карусели.</span>
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">На что смотреть при выборе AI-генератора каруселей</h2>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">1. Качество первого слайда</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Первый слайд решает, будут ли листать дальше.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-3">Слабый первый слайд:</p>
        <blockquote className="border-l-[3px] border-pink-500 pl-5 pr-5 py-4 my-4 bg-white/[0.02] rounded-r-xl italic text-zinc-400">
          5 советов по маркетингу
        </blockquote>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-3">Сильнее:</p>
        <blockquote className="border-l-[3px] border-pink-500 pl-5 pr-5 py-4 my-4 bg-white/[0.02] rounded-r-xl italic text-zinc-400">
          Почему ваш AI-контент звучит как у всех
        </blockquote>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Хороший инструмент должен помогать генерировать не один вариант первого слайда, а несколько.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">2. Логика структуры</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель должна читаться как последовательность. Пример структуры:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />Слайд 1 — хук</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />Слайд 2 — проблема</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />Слайды 3–7 — основная польза</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />Слайд 8 — вывод / CTA</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Если инструмент просто выдаёт набор слайдов без логики, вам всё равно придётся всё пересобирать вручную.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">3. Короткий текст для слайдов</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель читают быстро, часто с телефона. Поэтому важно:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />меньше текста;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />больше воздуха;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />один слайд — одна мысль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />понятный заголовок;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />без длинных абзацев;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />без мелкого шрифта.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">4. Работа с разными источниками</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Хорошо, если инструмент умеет начинать не только с темы, но и с:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />ссылки;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />видео;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />поста конкурента;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />статьи;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />PDF;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />заметок;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />готового результата;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />идеи.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          У многих уже есть материалы. Им не нужна “идея с нуля”. Им нужно быстро превратить существующий источник в карусель.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">5. Визуальный стиль</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель — это визуальный формат. Текст без нормального визуала часто проигрывает. Важно, чтобы можно было:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />выбрать стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />задать свой стиль промптом;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />пересоздать результат;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />адаптировать под бренд;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />получить готовый результат, а не только текст.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">6. Удобство доработки</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Первый результат не всегда идеален. Это нормально. Важна возможность:
        </p>
        <ul className="space-y-3 mb-14 md:mb-16">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />пересоздать;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />изменить стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />изменить тон;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сократить текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />поменять структуру;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />адаптировать под другую платформу.</li>
        </ul>

        <div className="my-12 md:my-14 flex items-center gap-4"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /><div className="w-1 h-1 rounded-full bg-pink-500/40" /><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Лучшие AI-генераторы каруселей в 2026 году</h2>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5 mt-12">1. GoToFlow — лучший для полного workflow</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          GoToFlow помогает пройти путь от идеи, ссылки, видео или примера конкурента до структуры, текста, визуального стиля и готовой карусели.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Это удобно для:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />основателей;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />экспертов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />маркетологов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />агентств;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />контент-команд;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />авторов LinkedIn;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />предпринимателей;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />SMM-специалистов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />создателей контента.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Что можно делать в GoToFlow:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />начать с темы;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />вставить ссылку;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />использовать видео;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />взять пример конкурента;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />получить структуру карусели;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сгенерировать текст слайдов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />выбрать визуальный стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />задать свой стиль промптом;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />пересоздать вариант;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />доработать результат перед публикацией.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Главное отличие GoToFlow — он не ограничивается текстом. Он помогает собрать саму карусель как контент-формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Лучше всего подходит:</strong> тем, кто хочет быстро создавать карусели без ручной сборки с нуля.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Вставьте тему, ссылку или видео и получите структуру, текст и готовый результат.
        </p>
        <div className="mb-12">
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-sm hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.25)] border border-pink-400/20 group">
            Попробовать GoToFlow AI Carousel Maker <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">2. Canva — лучший вариант для шаблонов</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Canva — один из самых популярных инструментов для дизайна.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Она хорошо подходит, если у вас уже есть:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />готовый текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />структура;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />понимание визуального стиля;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />брендовые цвета;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />желание вручную управлять дизайном.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Плюсы Canva:</strong> много шаблонов; простой редактор; бренд-кит; экспорт; удобно для соцсетей; подходит новичкам.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> слабее помогает с логикой карусели; AI-текст может быть слишком общим; структуру часто нужно готовить отдельно; шаблоны могут выглядеть типовыми.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          <strong>Лучше всего подходит:</strong> тем, кому нужен визуальный редактор и шаблоны.
        </p>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">3. ChatGPT / Claude / Gemini — для идей и текстов</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Обычные AI-чаты полезны на раннем этапе. Они помогают:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />придумать темы;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />собрать структуру;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />написать первый набросок текста;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />улучшить текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сделать варианты заголовков;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />адаптировать статью в карусель;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сократить длинный текст.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Плюсы:</strong> гибкость; можно работать с длинными текстами; удобно для brainstorming; можно быстро получить варианты; хорошо подходят для промптов и набросков текста.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> нет встроенного визуального workflow; результат нужно переносить в дизайн-инструмент; нужен хороший промпт; текст часто требует редактуры; карусель не собирается как готовый визуальный формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          <strong>Лучше всего подходит:</strong> тем, кто умеет писать промпты и отдельно работает с дизайном.
        </p>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">4. Gamma — для презентационного формата</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Gamma помогает создавать структурированные слайды и презентации. Для каруселей он может быть полезен, если контент похож на мини-презентацию:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />фреймворк;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />обучение;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />разбор;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />B2B-тема;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />экспертный материал;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />пошаговая инструкция.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Плюсы:</strong> хорошо структурирует материал; выглядит аккуратно; подходит для образовательного контента; помогает быстро получить слайдовую основу.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> может выглядеть больше как презентация, чем как нативная карусель для соцсетей; не всегда подходит для Instagram*-стиля; визуал может требовать ручной доработки.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          <strong>Лучше всего подходит:</strong> консультантам, экспертам, B2B-командам и тем, кто делает обучающие материалы.
        </p>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">5. Figma — для полного контроля дизайна</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Figma — не AI-генератор каруселей в прямом смысле, но это сильный инструмент для тех, кто хочет полный контроль над визуалом.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Плюсы:</strong> кастомный дизайн; компоненты; дизайн-система; командная работа; уникальный визуальный стиль; удобно для агентств и дизайнеров.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> нужна дизайнерская насмотренность; не решает проблему текста и структуры; дольше, чем готовые AI-инструменты; новичку может быть сложнее.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          <strong>Лучше всего подходит:</strong> дизайнерам, агентствам и командам с сильным визуальным брендом.
        </p>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">6. Taplio / ContentIn — для LinkedIn-workflow</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Такие инструменты помогают не только создавать контент, но и работать с LinkedIn-системой:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />идеи;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />публикации;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />планирование;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />аналитика;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />контент-календарь;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />регулярная работа с личным брендом.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Плюсы:</strong> фокус на LinkedIn; удобны для регулярной публикации; могут помогать с контент-планом; подходят авторам, которые системно ведут LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> не всегда дают лучший визуальный результат; могут быть дороже; часть функций может быть лишней, если нужна только карусель; больше ориентированы на международный рынок.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          <strong>Лучше всего подходит:</strong> тем, кто системно ведёт LinkedIn и хочет связать карусели с регулярным контент-планом.
        </p>

        <div className="my-10 md:my-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-5">7. Jasper / Copy.ai — для команд и brand voice</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Эти сервисы больше про AI-копирайтинг и маркетинговые тексты. Они могут быть полезны, если команде нужно:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />соблюдать tone of voice;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />генерировать много текстов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />сохранять стиль бренда;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />работать с разными форматами;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />делать контент для маркетинговых кампаний.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          <strong>Минусы:</strong> это не специализированные генераторы каруселей; визуал и структуру часто нужно делать отдельно; могут быть избыточны, если нужна только карусель; часть инструментов больше ориентирована на англоязычный рынок.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          <strong>Лучше всего подходит:</strong> маркетинговым командам и агентствам.
        </p>

        <div className="my-12 md:my-14 flex items-center gap-4"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /><div className="w-1 h-1 rounded-full bg-pink-500/40" /><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Сравнение AI-генераторов каруселей</h2>
        <div className="hidden md:block overflow-x-auto mb-14 md:mb-16 rounded-2xl border border-white/[0.08] bg-white/[0.015]">
          <table className="w-full min-w-[800px] text-left border-collapse text-zinc-300 text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className="p-4 lg:p-5 border-b border-white/10 font-bold text-white text-sm">Инструмент</th>
                <th className="p-4 lg:p-5 border-b border-white/10 font-bold text-white text-sm">Лучше всего для</th>
                <th className="p-4 lg:p-5 border-b border-white/10 font-bold text-white text-sm">Сильная сторона</th>
                <th className="p-4 lg:p-5 border-b border-white/10 font-bold text-white text-sm">Что учитывать</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>GoToFlow</strong></td>
                <td className="p-4 lg:p-5">Полный workflow карусели</td>
                <td className="p-4 lg:p-5">Тема/ссылка/видео → структура, текст, стиль, готовая карусель</td>
                <td className="p-4 lg:p-5">Чем точнее входные данные, тем лучше результат</td>
              </tr>
              <tr className="border-b border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>Canva</strong></td>
                <td className="p-4 lg:p-5">Дизайн и шаблоны</td>
                <td className="p-4 lg:p-5">Много шаблонов, простой редактор</td>
                <td className="p-4 lg:p-5">Слабее в структуре и смысле</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>ChatGPT / Claude / Gemini</strong></td>
                <td className="p-4 lg:p-5">Идеи и текст</td>
                <td className="p-4 lg:p-5">Гибкость, brainstorming</td>
                <td className="p-4 lg:p-5">Нет визуальной сборки</td>
              </tr>
              <tr className="border-b border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>Gamma</strong></td>
                <td className="p-4 lg:p-5">Презентационный формат</td>
                <td className="p-4 lg:p-5">Структура и слайды</td>
                <td className="p-4 lg:p-5">Может выглядеть как презентация</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>Figma</strong></td>
                <td className="p-4 lg:p-5">Кастомный дизайн</td>
                <td className="p-4 lg:p-5">Полный контроль</td>
                <td className="p-4 lg:p-5">Нужно делать вручную</td>
              </tr>
              <tr className="border-b border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>Taplio / ContentIn</strong></td>
                <td className="p-4 lg:p-5">LinkedIn-workflow</td>
                <td className="p-4 lg:p-5">Планирование и регулярный контент</td>
                <td className="p-4 lg:p-5">Больше ориентированы на LinkedIn</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 lg:p-5 font-medium text-white"><strong>Jasper / Copy.ai</strong></td>
                <td className="p-4 lg:p-5">Brand voice</td>
                <td className="p-4 lg:p-5">Тексты для команд</td>
                <td className="p-4 lg:p-5">Не специализированы под карусели</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-3 mb-14 md:mb-16">
          {[
            { name: 'GoToFlow', when: 'Полный workflow карусели', strength: 'Тема/ссылка/видео → структура, текст, стиль, готовая карусель', note: 'Чем точнее входные данные, тем лучше результат' },
            { name: 'Canva', when: 'Дизайн и шаблоны', strength: 'Много шаблонов, простой редактор', note: 'Слабее в структуре и смысле' },
            { name: 'ChatGPT / Claude / Gemini', when: 'Идеи и текст', strength: 'Гибкость, brainstorming', note: 'Нет визуальной сборки' },
            { name: 'Gamma', when: 'Презентационный формат', strength: 'Структура и слайды', note: 'Может выглядеть как презентация' },
            { name: 'Figma', when: 'Кастомный дизайн', strength: 'Полный контроль', note: 'Нужно делать вручную' },
            { name: 'Taplio / ContentIn', when: 'LinkedIn-workflow', strength: 'Планирование и регулярный контент', note: 'Больше ориентированы на LinkedIn' },
            { name: 'Jasper / Copy.ai', when: 'Brand voice', strength: 'Тексты для команд', note: 'Не специализированы под карусели' },
          ].map((t, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2.5">
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="flex flex-col gap-0.5"><span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Лучше всего для</span><span className="text-zinc-300 text-[13px] leading-relaxed">{t.when}</span></div>
              <div className="flex flex-col gap-0.5"><span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Сильная сторона</span><span className="text-zinc-300 text-[13px] leading-relaxed">{t.strength}</span></div>
              <div className="flex flex-col gap-0.5"><span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Что учитывать</span><span className="text-zinc-300 text-[13px] leading-relaxed">{t.note}</span></div>
            </div>
          ))}
        </div>

        <div className="my-12 md:my-14 flex items-center gap-4"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /><div className="w-1 h-1 rounded-full bg-pink-500/40" /><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Почему обычного AI-чата часто недостаточно</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Можно попросить ChatGPT:
        </p>
        <blockquote className="border-l-[3px] border-pink-500 pl-5 pr-5 py-4 my-4 bg-white/[0.02] rounded-r-xl italic text-zinc-400">
          Сделай карусель на тему X
        </blockquote>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          И он действительно выдаст структуру. Но часто результат будет таким:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />много текста;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нет визуальной логики;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />слабый первый слайд;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нет ритма;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нет ощущения карусели;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужен ручной перенос в дизайн.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель — это не просто текст. Это последовательность. Нужно думать о том, как человек будет листать слайды.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Поэтому хороший AI-workflow должен помогать не только с текстом, но и со структурой, визуальным стилем и финальной сборкой.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Лучший workflow для создания карусели с AI</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Хороший процесс выглядит так:
        </p>
        <div className="space-y-4 mb-8 text-zinc-300 text-[15px] md:text-base leading-[1.7]">
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">1</span><span><strong>Вход:</strong> тема, ссылка, видео или пример конкурента.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">2</span><span><strong>Анализ:</strong> что за идея, для кого она и под какую платформу.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">3</span><span><strong>Первый слайд:</strong> хук, который заставляет листать дальше.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">4</span><span><strong>Структура:</strong> логика слайдов.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">5</span><span><strong>Текст:</strong> короткие формулировки.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">6</span><span><strong>Визуальный стиль:</strong> внешний вид.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">7</span><span><strong>Готовая основа:</strong> результат для финальной редактуры.</span></div>
          <div className="flex items-start gap-3.5"><span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5">8</span><span><strong>Доработка:</strong> финальный контроль автора.</span></div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          GoToFlow закрывает именно этот workflow.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Когда использовать GoToFlow</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          GoToFlow подойдёт, если вы хотите:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />быстро делать карусели;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />не начинать с пустого листа;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />использовать ссылки или видео как входные данные;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />адаптировать идеи конкурентов без копирования;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />получать структуру и текст слайдов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />выбирать визуальный стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />создавать визуальный результат;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />быстрее публиковать контент.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Это особенно полезно, если вы создаёте контент регулярно и не хотите каждый раз вручную собирать структуру, писать слайды и переносить всё в дизайн.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Когда лучше использовать Canva</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Canva лучше, если:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />текст уже готов;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />структура уже понятна;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужен только дизайн;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />вы хотите работать с шаблонами;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />вам важен ручной визуальный контроль.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Canva — хороший выбор для визуальной упаковки. Но если проблема именно в идее, структуре и тексте, одного шаблона может быть недостаточно.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Когда лучше использовать ChatGPT, Claude или Gemini</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI-чаты лучше, если:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно придумать темы;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно сделать план;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно переписать текст;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно получить варианты заголовков;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно сделать промпты;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуал вы делаете отдельно.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Это хороший вариант для текстовых набросков. Но если нужен готовый carousel workflow, придётся соединять несколько инструментов.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Когда лучше использовать Figma</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Figma лучше, если:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужен уникальный дизайн;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />есть дизайнер;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />есть брендовая система;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужны компоненты;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />нужно вручную контролировать каждый слайд.</li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Это сильный вариант для команд, которым важен визуальный уровень. Но для быстрых ежедневных каруселей Figma может быть слишком медленной.
        </p>

        <div className="my-12 md:my-14 flex items-center gap-4"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /><div className="w-1 h-1 rounded-full bg-pink-500/40" /><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Частые ошибки при выборе AI-генератора каруселей</h2>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Выбирать только по дизайну</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Красивый шаблон не спасёт слабую идею. Сначала структура и смысл, потом визуал.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Использовать один промпт и ждать идеал</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Хороший результат часто появляется после 2–3 итераций. Нужно уточнять:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />аудиторию;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />формат;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />тон;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />длину;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />визуальный стиль;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />CTA.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Публиковать сырой AI-текст</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI может дать хорошую основу, но финальный текст должен звучать как ваш. Добавьте:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />примеры;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />опыт;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />позицию;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />конкретику;</li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />проверку фактов.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Делать одинаковые карусели для LinkedIn и Instagram</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          У платформ разная логика, скорость чтения и визуальный стиль.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          LinkedIn чаще любит экспертные PDF-карусели и фреймворки.<br />
          Instagram* чаще требует более визуального, быстрого и эмоционального формата.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight mb-4 mt-10">Не проверять читаемость на телефоне</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если слайд плохо читается на мобильном, его нужно упростить.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Большинство людей смотрят карусели с телефона, поэтому маленький текст и перегруженные слайды убивают результат.
        </p>

        <div className="my-12 md:my-14 flex items-center gap-4"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /><div className="w-1 h-1 rounded-full bg-pink-500/40" /><div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" /></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Какой AI-генератор каруселей выбрать</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Выбор зависит от задачи.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если вам нужна только визуальная упаковка — используйте Canva или Figma.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если нужны идеи и текст — ChatGPT, Claude или Gemini.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если нужен презентационный формат — Gamma.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если вы системно работаете с LinkedIn — Taplio или ContentIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если нужен полный путь от темы, ссылки или видео до структуры, текста, визуального стиля и готовой карусели — лучше использовать GoToFlow.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Итог</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Лучший AI-генератор каруселей зависит от того, какую часть процесса вы хотите ускорить.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если нужен дизайн — подойдёт Canva или Figma.<br />
          Если нужны идеи — ChatGPT, Claude или Gemini.<br />
          Если нужен LinkedIn-workflow — Taplio или ContentIn.<br />
          Если нужен полный путь от темы, ссылки или видео до структуры, текста, визуального стиля и готовой карусели — лучше смотреть в сторону GoToFlow.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для сильной карусели важны не только картинки. Нужны идея, первый слайд, логика, короткий текст, визуальный стиль и финальная редактура.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Создайте карусель из темы, ссылки или видео быстрее.
        </p>

        <div className="mb-12 md:mb-16">
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-sm hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.25)] border border-pink-400/20 group">
            Попробовать GoToFlow AI Carousel Maker <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <InlineProductBlock text="Превратите любую идею в структурированную карусель быстрее" />

      </div>
    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'Какой AI-генератор каруселей лучший?', a: 'Если нужен полный workflow от идеи до готового результата, подойдёт GoToFlow. Если нужен только дизайн, можно использовать Canva или Figma. Для идей и текстов подойдут ChatGPT, Claude или Gemini.' },
  { q: 'Можно ли сделать карусель для Instagram* с помощью AI?', a: 'Да. AI может помочь с идеей, структурой, текстом и визуальным направлением. Но для Instagram* особенно важно проверить визуал и читаемость на мобильном.' },
  { q: 'Можно ли сделать карусель для LinkedIn с помощью AI?', a: 'Да. AI может помочь с первым слайдом, структурой, текстом, CTA и визуальным стилем. Для LinkedIn важно, чтобы карусель была логичной, полезной и хорошо читалась в PDF-формате.' },
  { q: 'Чем GoToFlow отличается от Canva?', a: 'Canva сильна в шаблонах и ручном дизайне. GoToFlow помогает пройти workflow карусели: тема/ссылка/видео → структура → текст → стиль → готовая карусель.' },
  { q: 'Нужен ли дизайнер, чтобы делать карусели?', a: 'Не всегда. Для базовых и регулярных каруселей можно использовать AI-инструменты. Но если нужен уникальный брендовый стиль, Figma и дизайнер всё ещё могут быть полезны.' },
  { q: 'Можно ли использовать видео конкурента как источник?', a: 'Да, если инструмент поддерживает работу с видео или ссылками. Важно не копировать, а использовать источник как основу для новой структуры и своего угла.' },
  { q: 'Что лучше: AI-генератор каруселей или ChatGPT?', a: 'ChatGPT хорош для идей и текста. AI-генератор каруселей лучше, если вам нужен не только текст, но и структура, визуальный стиль и готовая карусель.' },
  { q: 'Как сделать карусель быстрее?', a: 'Используйте готовый workflow: тема или ссылка → хук → структура → текст → визуальный стиль → готовый результат → финальная редактура. Так вы не начинаете каждый раз с пустого листа.' },
  { q: 'Есть ли бесплатные AI-генераторы каруселей?', a: 'Да, у некоторых инструментов есть бесплатный старт или пробный доступ. Но часто бесплатные версии ограничивают количество генераций, экспорт, бренд-стили или продвинутые функции.' },
  { q: 'Можно ли создать карусель онлайн без дизайнера?', a: 'Да. AI-инструменты помогают собрать структуру, текст и готовую карусель. Но финальную карусель всё равно стоит проверить: читаемость, стиль, факты и соответствие платформе.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden" transition={{ duration: 0.35 }}><p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-300 leading-[1.7] text-sm md:text-base">{item.a}</p></motion.div>
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
          <h2 className="text-[22px] md:text-[28px] font-bold text-white tracking-tight mb-2">Частые вопросы</h2>
          <p className="text-zinc-400 text-sm md:text-base mb-8">Ответы на популярные вопросы о создании каруселей</p>
          <div className="space-y-3">
            {faqItems.map((item, i) => <FAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
          </div>
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: isMobile ? 0.6 : 0.8 }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
            Создавайте карусели <span className="text-gradient-brand">за минуты</span>
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-[1.7] mb-8 max-w-lg mx-auto">
            Сделайте структурированные карусели с помощью AI.
          </p>
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
            Попробовать GoToFlow <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-zinc-500 mt-4">Бесплатно — Без привязки карты</p>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Back to Blog Hub ── */
const BackToBlog = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <Link to="/ru/blog" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors text-sm font-medium">
      Больше инструментов и идей <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </section>
);

/* ── Page ── */
export const BestAiCarouselGeneratorsPageRu = () => (
  <MainLayout>
    <ArticleSEOHead />
    <Header />
    <Breadcrumbs />
    <ArticleHero />
    <ArticleBody />
    <ArticleFAQ />
    <ArticleCTA />
    <BackToBlog />
    <RuMetaDisclaimerFootnote />
      <Footer />
    <CookieBanner />
  </MainLayout>
);
