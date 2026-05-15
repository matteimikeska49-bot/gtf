import React, { useEffect, useState } from 'react';
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
    document.title = 'Как сделать карусель LinkedIn с помощью AI: пошаговая инструкция';
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
    
    setMeta('title', 'Как сделать карусель LinkedIn с помощью AI: пошаговая инструкция');
    setMeta('description', 'Пошагово разбираем, как сделать карусель LinkedIn с помощью AI: идея, хук, структура слайдов, текст, визуальный стиль, PDF и публикация.');
    setMeta('og:title', 'Как сделать карусель LinkedIn с помощью AI: пошаговая инструкция', true);
    setMeta('og:description', 'Пошагово разбираем, как сделать карусель LinkedIn с помощью AI: идея, хук, структура слайдов, текст, визуальный стиль, PDF и публикация.', true);
    setMeta('og:url', 'https://gotoflow.io/ru/blog/kak-sdelat-karusel-linkedin-s-ai', true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', 'Как сделать карусель LinkedIn с помощью AI: пошаговая инструкция', true);
    setMeta('twitter:description', 'Пошагово разбираем, как сделать карусель LinkedIn с помощью AI: идея, хук, структура слайдов, текст, визуальный стиль, PDF и публикация.', true);
    setMeta('twitter:url', 'https://gotoflow.io/ru/blog/kak-sdelat-karusel-linkedin-s-ai', true);
    
    setLink('canonical', 'https://gotoflow.io/ru/blog/kak-sdelat-karusel-linkedin-s-ai');
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
      <span className="text-zinc-400 truncate">Как сделать карусель LinkedIn с помощью AI</span>
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
            <span className="text-xs text-zinc-300 font-medium">Гайд</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          Как сделать карусель LinkedIn с помощью AI
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          Пошагово разбираем, как сделать карусель LinkedIn с помощью AI: идея, хук, структура слайдов, текст, визуальный стиль, PDF и публикация.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            Попробовать GoToFlow AI Carousel Maker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Inline Product Block ── */
const InlineProductBlock = ({ text, to }) => (
  <div className="relative my-12 md:my-16 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.03] via-transparent to-orange-500/[0.02] blur-xl" />
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug">{text}</p>
    </div>
    <a href={getAppUrlWithRef('https://app.gotoflow.io')} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.2)] border border-pink-400/20 group whitespace-nowrap">
      Попробовать <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </a>
  </div>
);

const ArticleBody = () => (
  <article className="pt-4 pb-8 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="max-w-[920px] mx-auto relative z-10">
      <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
        
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусели в LinkedIn хорошо работают, потому что они превращают сложную мысль в понятный визуальный формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Человек не читает длинный пост сразу.<br />Он видит первый слайд.<br />Если тема цепляет — листает дальше.<br />Если структура полезная — сохраняет.<br />Если мысль попала в боль — комментирует или переходит по CTA.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Но сделать сильную LinkedIn-карусель вручную сложнее, чем кажется.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Нужно придумать идею, написать первый слайд, собрать структуру, разбить мысль на слайды, сократить текст, выбрать визуальный стиль, подготовить PDF и проверить, как всё читается на телефоне.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5 font-semibold text-white">
          AI помогает ускорить этот процесс.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Не потому что он “сделает всё вместо вас”, а потому что он снимает самую тяжёлую часть: пустой лист, структуру, первые варианты текста и черновик карусели.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          В этой статье разберём, как сделать карусель LinkedIn с помощью AI: от идеи до готового черновика, PDF и публикации.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Коротко: как сделать карусель LinkedIn с помощью AI</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Если нужен быстрый план, процесс выглядит так:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">1</span><span>Выберите одну конкретную тему.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">2</span><span>Определите аудиторию.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">3</span><span>Сформулируйте формат карусели.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">4</span><span>Сгенерируйте 5–10 вариантов первого слайда.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">5</span><span>Соберите структуру слайдов.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">6</span><span>Напишите короткий текст для каждого слайда.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">7</span><span>Выберите визуальный стиль.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">8</span><span>Получите черновик карусели.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">9</span><span>Проверьте факты, тон и читаемость.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">10</span><span>Экспортируйте карусель в PDF или изображения и загрузите в LinkedIn.</span></div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Главная ошибка — начинать с дизайна.<br />Сначала должна быть мысль. Потом структура. Потом визуал.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Что такое карусель LinkedIn</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель LinkedIn — это многостраничный пост, который пользователь листает как слайды.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Чаще всего карусель публикуют как document post: вы создаёте несколько слайдов, экспортируете их в PDF или другой поддерживаемый формат, а затем загружаете документ в LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          После публикации LinkedIn показывает файл как свайпаемую карусель.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Карусели используют для:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>экспертных разборов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>пошаговых инструкций;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>чек-листов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>фреймворков;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>ошибок и решений;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>мини-кейсов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сравнений;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>обучающих материалов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>личного бренда;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>B2B-контента;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>прогрева аудитории.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Хорошая карусель — это не просто “текст на слайдах”. Это последовательность, где каждый слайд ведёт к следующему.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Почему LinkedIn-карусели работают</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Карусель даёт больше точек контакта с пользователем.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Обычный текстовый пост человек может пролистать за секунду.<br />Карусель заставляет остановиться, прочитать первый слайд, свайпнуть второй, потом третий.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Если материал полезный, пользователь может:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>досмотреть до конца;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сохранить пост;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>отправить коллеге;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>написать комментарий;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>перейти по ссылке;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>подписаться на автора.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Для экспертов, SaaS-команд, агентств, консультантов и основателей LinkedIn-карусель особенно полезна, потому что позволяет упаковать экспертность в короткий визуальный формат.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Где AI помогает в создании LinkedIn-карусели</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI может помочь почти на каждом этапе.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Он может:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>предложить темы;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>найти сильный угол;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>написать варианты первого слайда;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>собрать структуру;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>превратить длинный текст в слайды;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сократить формулировки;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>предложить CTA;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>адаптировать статью, видео или ссылку в карусель;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>дать визуальное направление;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>помочь с caption для публикации.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Но важно понимать: AI не должен заменять вашу экспертизу.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Лучший результат получается, когда AI делает черновик, а вы добавляете:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>свой опыт;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>конкретные примеры;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>позицию;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>проверку фактов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>финальную редактуру;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>понимание аудитории.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          AI ускоряет процесс. Но финальное качество всё равно зависит от автора.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI-чат или AI-генератор каруселей: в чём разница</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Создать LinkedIn-карусель можно двумя способами.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Вариант 1. Использовать обычный AI-чат</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Например, ChatGPT, Claude или Gemini.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          AI-чат хорошо помогает с:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>идеями;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>хуками;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>структурой;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>текстом;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>переписыванием;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сокращением;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>промптами.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Но у него есть ограничение: он обычно даёт текст.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          После этого вам всё равно нужно:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>перенести текст в Canva, Figma, Gamma или другой инструмент;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>создать визуальный формат;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>разложить текст по слайдам;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>подобрать стиль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>экспортировать PDF;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>проверить, как всё выглядит.</span></li>
        </ul>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Вариант 2. Использовать AI-генератор каруселей</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI-генератор каруселей закрывает больше этапов.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Он помогает пройти путь:
        </p>
        <div className="flex flex-wrap items-center gap-2 text-pink-400 font-medium bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 text-[13px] md:text-sm">
          <span>тема / ссылка / видео / черновик</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>хук</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>структура</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>текст слайдов</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>визуальный стиль</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>черновик карусели</span>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Это удобнее, если вы хотите не просто получить текст, а быстрее дойти до визуального результата.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          GoToFlow как раз работает в этой логике: помогает превратить идею, ссылку, видео или пример конкурента в структуру, текст и визуальный черновик карусели.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Генератор каруселей LinkedIn: когда он лучше обычного AI-чата</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Обычный AI-чат помогает написать текст, но не всегда помогает собрать карусель как формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Например, ChatGPT, Claude или Gemini могут дать хороший черновик: тему, структуру, варианты первого слайда и текст для слайдов. Но дальше вам всё равно нужно вручную перенести всё в дизайн-инструмент, разложить по слайдам, подобрать стиль, проверить читаемость и экспортировать результат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Генератор каруселей LinkedIn полезнее, если вам нужно не просто получить идеи, а быстрее пройти весь путь:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>тема или ссылка;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>первый слайд;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>структура;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>текст слайдов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуальный стиль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>черновик карусели;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>доработка перед публикацией.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Такой workflow особенно удобен, если вы регулярно публикуете экспертный контент и не хотите каждый раз вручную переносить текст между AI-чатом, Canva, Figma и LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          GoToFlow работает именно в этой логике: помогает превратить тему, ссылку, видео или пример конкурента в структуру, текст и визуальный черновик LinkedIn-карусели.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как сделать карусель LinkedIn с помощью AI: пошагово</h2>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">1. Выберите одну конкретную тему</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Слабая тема:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Маркетинг</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Сильнее:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">5 ошибок, из-за которых AI-контент звучит одинаково</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Ещё сильнее:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Почему ваши посты, написанные с AI, не дочитывают до конца</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Хорошая тема должна быть конкретной.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Проверьте её по трём вопросам:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>кому это полезно;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>какую проблему решает;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>какой результат человек получит после просмотра.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Если тема слишком широкая, карусель получится общей.<br />Если тема конкретная, AI лучше соберёт структуру и текст.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">2. Определите аудиторию</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Одна и та же тема будет звучать по-разному для разных людей.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Например, тема:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">как использовать AI для контента</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Для основателя SaaS это может быть:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Как основателю SaaS делать LinkedIn-контент быстрее без отдельной контент-команды</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Для маркетолога:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Как маркетологу превращать вебинары и статьи в LinkedIn-карусели</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Для эксперта:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Как эксперту упаковать опыт в LinkedIn-карусели без дизайнера</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Перед генерацией укажите аудиторию:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>основатели;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>маркетологи;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>эксперты;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>консультанты;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>агентства;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>B2B-команды;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>авторы LinkedIn;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>SaaS-команды;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>фрилансеры;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>создатели контента.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Чем точнее аудитория, тем лучше результат.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">3. Выберите формат карусели</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI работает лучше, когда ему понятен формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Популярные форматы LinkedIn-каруселей:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>пошаговая инструкция;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>ошибки и решения;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>чек-лист;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>фреймворк;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сравнение;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>“до / после”;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>мини-кейс;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>разбор процесса;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>список идей;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>контраргумент;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>экспертный вывод.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Пример слабого запроса:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Сделай карусель про AI-контент</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Пример сильного запроса:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Сделай LinkedIn-карусель на 8 слайдов в формате “ошибки и решения” для B2B-основателей, которые используют AI для контента, но получают слишком общий текст.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Формат задаёт логику.<br />Без формата AI часто создаёт набор общих советов.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">4. Сгенерируйте варианты первого слайда</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Первый слайд — самый важный.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Он решает, будет ли человек листать дальше.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Плохой первый слайд:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Как улучшить контент</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Сильнее:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Ваш AI-контент звучит одинаково по 5 причинам</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Ещё сильнее:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Люди не устали от AI-контента. Они устали от пустого AI-контента</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Попросите AI дать не один вариант, а 10–15.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Промпт:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Напиши 15 вариантов первого слайда для LinkedIn-карусели на тему “[тема]”.

Аудитория: [кто читает].
Формат: [ошибки / чек-лист / фреймворк / инструкция].
Стиль: конкретно, без кликбейта, без общих фраз.
Каждый вариант — до 12 слов.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Выберите тот, который точнее всего попадает в боль аудитории.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">5. Соберите структуру карусели</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Хорошая LinkedIn-карусель должна читаться как мини-история.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Базовая структура на 8 слайдов:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>1. Хук.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>2. Контекст или проблема.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>3. Первый ключевой тезис.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>4. Второй ключевой тезис.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>5. Третий ключевой тезис.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>6. Пример или объяснение.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>7. Краткий вывод.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>8. CTA.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Пример:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">Слайд 1 — Ваш AI-контент звучит одинаково по 5 причинам
Слайд 2 — Проблема не в AI, а в слабом входе
Слайд 3 — Ошибка 1: слишком общий запрос
Слайд 4 — Ошибка 2: нет аудитории
Слайд 5 — Ошибка 3: нет позиции автора
Слайд 6 — Как исправить
Слайд 7 — Короткий чек-лист
Слайд 8 — CTA</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Не делайте карусель длинной только ради количества слайдов.<br />Лучше 7 сильных слайдов, чем 14 слабых.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">6. Напишите короткий текст для каждого слайда</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          LinkedIn-карусель чаще читают с телефона.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Поэтому текст должен быть коротким.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Правила:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>один слайд — одна мысль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>короткие предложения;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>крупные заголовки;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>минимум абзацев;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>без длинных вступлений;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>без “воды”;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>без мелкого текста;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>без перегруза.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Промпт:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Преврати эту структуру в текст для LinkedIn-карусели.

Условия:
- 8 слайдов;
- один слайд — одна мысль;
- до 40 слов на слайд;
- короткие предложения;
- без корпоративных клише;
- стиль экспертный, но простой;
- финальный слайд с CTA.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          AI может дать хороший черновик, но после этого текст нужно сократить ещё раз.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">7. Выберите визуальный стиль</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Визуальный стиль должен помогать смыслу, а не отвлекать.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Для LinkedIn хорошо работают:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>чистый экспертный стиль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>минимализм;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>dark SaaS;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>editorial;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>B2B-презентационный стиль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>крупная типографика;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>спокойные акценты;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>много воздуха;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуальная логика между слайдами.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Промпт для визуального стиля:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Сделай карусель в чистом premium SaaS-стиле:
тёмный фон, крупная типографика, розово-оранжевые акценты, аккуратные карточки, много воздуха, профессиональный B2B-вид.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Если у вас есть бренд-стиль, добавьте:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-10 md:mb-12 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Используй стиль бренда: [цвета], [тон], [визуальные элементы], [ограничения].</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">8. Сгенерируйте черновик карусели</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Когда есть тема, аудитория, формат, структура и визуальный стиль, можно генерировать черновик.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          В GoToFlow процесс проще: вы можете начать с темы, ссылки, видео или примера, а дальше получить структуру, текст и визуальный черновик.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Вместо того чтобы прыгать между AI-чатом, заметками, Canva и Figma, вы сразу идёте по логике:
        </p>
        <div className="flex flex-wrap items-center gap-2 text-pink-400 font-medium bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 text-[13px] md:text-sm">
          <span>входные данные</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>анализ</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>хук</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>структура</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>текст</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>стиль</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>черновик</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>доработка</span>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Это особенно удобно, если вы регулярно делаете контент и не хотите каждый раз собирать карусель с нуля.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">9. Проверьте и отредактируйте результат</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Нельзя публиковать сырой AI-черновик без проверки.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Перед публикацией задайте себе вопросы:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>первый слайд реально цепляет;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>понятно, для кого эта карусель;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>каждый слайд несёт одну мысль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>структура логичная;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>текст звучит по-человечески;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>нет фактических ошибок;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>нет слишком общих формулировок;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуал читается на телефоне;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>CTA понятный;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>карусель звучит как ваш контент, а не как шаблон.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          AI помогает дойти до черновика быстрее.<br />Финальная редактура делает карусель вашей.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как создать карусель LinkedIn онлайн без дизайнера</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Чтобы создать LinkedIn-карусель онлайн, не обязательно начинать с дизайна.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Более быстрый путь:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">1</span><span>Возьмите тему, ссылку, видео или черновик.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">2</span><span>Сгенерируйте хук и структуру.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">3</span><span>Сократите текст до формата “один слайд — одна мысль”.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">4</span><span>Выберите визуальный стиль.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">5</span><span>Получите черновик карусели.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">6</span><span>Проверьте читаемость на мобильном.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">7</span><span>Экспортируйте результат и загрузите в LinkedIn.</span></div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Такой подход удобен для экспертов, основателей, маркетологов и B2B-команд, которым нужно регулярно публиковать карусели без отдельного дизайнера.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если вы делаете карусели вручную, процесс часто распадается на несколько инструментов: AI-чат для текста, Canva или Figma для дизайна, отдельный документ для структуры и LinkedIn для публикации.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          AI-workflow сокращает этот путь. Вы начинаете с идеи или источника, а дальше быстрее получаете структуру, текст и визуальный черновик.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Карусель LinkedIn и PDF: что важно перед публикацией</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          LinkedIn-карусель чаще всего публикуют как document post. На практике это означает, что вы создаёте слайды, экспортируете их в PDF и загружаете файл в LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Перед загрузкой проверьте:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>каждая страница PDF соответствует одному слайду;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>порядок слайдов правильный;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>текст читается с телефона;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>первый слайд не обрезается;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>CTA виден на финальном слайде;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>нет ошибок в тексте;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>файл открывается корректно.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Если вы публикуете карусель как PDF, лучше заранее проверить финальный файл. После публикации исправить ошибку в самом документе сложнее, чем поправить текст поста.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          PDF должен быть не просто “красивым файлом”, а удобным для чтения документом: с крупным текстом, понятной последовательностью и нормальным контрастом.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как опубликовать карусель в LinkedIn</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          После того как карусель готова, её нужно загрузить в LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Обычно процесс такой:</p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">1</span><span>Экспортируйте карусель в PDF или подходящий формат.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">2</span><span>Откройте LinkedIn.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">3</span><span>Начните новый пост.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">4</span><span>Загрузите документ.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">5</span><span>Напишите caption.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">6</span><span>Проверьте предпросмотр.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">7</span><span>Опубликуйте.</span></div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Перед публикацией проверьте:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>порядок слайдов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>читаемость;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>обрезку;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>качество изображения;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>отсутствие ошибок в тексте;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>финальный CTA.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если в файле есть ошибка, проще исправить её до публикации, чем переделывать пост после.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Какой размер использовать для LinkedIn-карусели</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Для LinkedIn чаще используют вертикальный или квадратный формат.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">На практике хорошо работают:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>квадратные слайды;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>вертикальные слайды;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>PDF-документ;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>крупные заголовки;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>хороший контраст;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>достаточно воздуха вокруг текста.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Главное — не формат сам по себе, а читаемость.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Проверьте карусель на телефоне.<br />Если вам приходится напрягаться, чтобы прочитать текст, его нужно сократить.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Сравнение: AI-чат, Canva/Figma и генератор каруселей LinkedIn</h2>
        <div className="w-full overflow-x-auto pb-4 mb-8">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-3 border-b border-white/10 pb-4 mb-4 font-semibold text-white">
              <div className="px-4">Инструмент</div>
              <div className="px-4">Что делает лучше</div>
              <div className="px-4">Ограничение</div>
            </div>
            <div className="grid grid-cols-3 border-b border-white/[0.05] pb-4 mb-4 text-zinc-300 text-sm md:text-base">
              <div className="px-4">ChatGPT / Claude / Gemini</div>
              <div className="px-4">Идеи, хук, структура, текст, промпты</div>
              <div className="px-4 text-zinc-400">Не собирает визуальную карусель</div>
            </div>
            <div className="grid grid-cols-3 border-b border-white/[0.05] pb-4 mb-4 text-zinc-300 text-sm md:text-base">
              <div className="px-4">Canva / Figma</div>
              <div className="px-4">Дизайн, шаблоны, ручная сборка</div>
              <div className="px-4 text-zinc-400">Нужна готовая структура и текст</div>
            </div>
            <div className="grid grid-cols-3 border-b border-white/[0.05] pb-4 mb-4 text-zinc-300 text-sm md:text-base">
              <div className="px-4">Gamma</div>
              <div className="px-4">Презентационный формат, быстрые слайды</div>
              <div className="px-4 text-zinc-400">Может выглядеть как презентация, а не нативная карусель</div>
            </div>
            <div className="grid grid-cols-3 pb-2 text-zinc-300 text-sm md:text-base">
              <div className="px-4 font-medium text-pink-300">GoToFlow</div>
              <div className="px-4">Структура, текст, визуальный стиль и черновик карусели</div>
              <div className="px-4 text-zinc-400">Результат всё равно нужно проверить перед публикацией</div>
            </div>
          </div>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если нужна только идея — хватит AI-чата.<br />Если нужен только дизайн — подойдут Canva или Figma.<br />Если нужен путь от идеи, ссылки или видео до черновика карусели — удобнее использовать AI-генератор каруселей.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Пример структуры LinkedIn-карусели на 8 слайдов</h2>
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-14 md:mb-16">
          <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide font-medium">Тема:</p>
          <p className="text-white font-medium text-lg mb-8 pb-4 border-b border-white/10">Почему AI-контент звучит одинаково</p>

          <div className="space-y-8">
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 1 — Хук</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Ваш AI-контент звучит одинаково по 5 причинам.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 2 — Проблема</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Люди не устали от AI-контента.<br />Они устали от текста без мысли, примеров и позиции.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 3 — Причина 1</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Вы даёте слишком общий запрос.</p>
              <p className="text-zinc-400 text-sm mt-2">Если вход слабый, результат будет средним.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 4 — Причина 2</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Вы не указываете аудиторию.</p>
              <p className="text-zinc-400 text-sm mt-2">AI не понимает, для кого писать: для новичков, экспертов, основателей или маркетологов.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 5 — Причина 3</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">В тексте нет вашей позиции.</p>
              <p className="text-zinc-400 text-sm mt-2">AI может собрать формулировки.<br />Но точку зрения должен дать автор.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 6 — Причина 4</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Слишком много текста на слайде.</p>
              <p className="text-zinc-400 text-sm mt-2">Карусель читают быстро.<br />Один слайд — одна мысль.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 7 — Решение</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Давайте AI контекст: аудиторию, цель, формат, примеры, тон и ограничения.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Слайд 8 — CTA</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Сохраните этот чек-лист перед следующей AI-каруселью.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Промпты для создания LinkedIn-карусели с AI</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Используйте эти промпты, чтобы получить лучшие черновики.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для идеи</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Я [кто вы] и создаю контент для [аудитория].

Предложи 15 идей для LinkedIn-каруселей на тему [тема].

Условия:
- идеи должны решать конкретную боль аудитории;
- без общих тем;
- каждая идея должна быть понятна по одному заголовку;
- формат: инструкция, ошибки, чек-лист, фреймворк или разбор.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для первого слайда</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Напиши 15 вариантов первого слайда для LinkedIn-карусели на тему [тема].

Аудитория: [аудитория].
Цель: заставить человека листать дальше.
Стиль: конкретно, экспертно, без кликбейта.
Длина: до 12 слов.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для структуры</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Собери структуру LinkedIn-карусели на 8 слайдов.

Тема: [тема].
Аудитория: [аудитория].
Формат: [инструкция / ошибки / чек-лист / фреймворк].
Цель: [сохранение / комментарии / переход / прогрев].

Для каждого слайда дай:
- заголовок;
- основную мысль;
- короткое пояснение.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для текста слайдов</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Преврати эту структуру в текст для LinkedIn-карусели.

Условия:
- 8 слайдов;
- до 40 слов на слайд;
- короткие предложения;
- один слайд — одна мысль;
- без воды;
- без корпоративных клише;
- текст должен легко читаться с телефона.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для визуального стиля</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Предложи визуальный стиль для LinkedIn-карусели.

Тема: [тема].
Аудитория: [аудитория].
Стиль бренда: [описание].
Требования:
- крупная типографика;
- много воздуха;
- хороший контраст;
- профессиональный B2B-вид;
- без перегруженного дизайна.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Промпт для caption</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-14 md:mb-16 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Напиши caption для LinkedIn-поста с каруселью.

Тема карусели: [тема].
Цель поста: [сохранения / комментарии / переходы / подписки].
Стиль: живой, экспертный, без продаж в лоб.

Структура:
1. короткий хук;
2. почему тема важна;
3. что внутри карусели;
4. CTA.</div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Частые ошибки при создании LinkedIn-карусели с AI</h2>
        
        <div className="space-y-6 mb-14 md:mb-16">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Делать карусель из слишком общей темы</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">“Маркетинг” — слишком широко.<br />“5 ошибок в AI-контенте для B2B-основателей” — конкретно.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Публиковать первый AI-черновик</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">AI может собрать основу. Но без редактуры текст часто звучит шаблонно.<br /><br />Добавьте свои примеры, опыт и выводы.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Делать слишком много текста на слайдах</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Если слайд выглядит как абзац из статьи, его нужно сократить.<br /><br />Карусель должна сканироваться быстро.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Начинать с дизайна</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Дизайн не спасёт слабую структуру.<br /><br />Сначала идея, хук и логика.<br />Потом визуал.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Не проверять мобильную версию</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Большая часть пользователей смотрит контент с телефона.<br /><br />Если текст мелкий или слайды перегружены, карусель будет хуже работать.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Не добавлять CTA</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">У карусели должен быть финальный шаг.<br /><br />Например:<br />- сохранить пост;<br />- написать комментарий;<br />- перейти по ссылке;<br />- подписаться;<br />- попробовать инструмент;<br />- скачать чек-лист;<br />- задать вопрос.</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Как GoToFlow помогает делать LinkedIn-карусели быстрее</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          GoToFlow помогает пройти путь от идеи до черновика карусели быстрее.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Вы можете начать с:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>темы;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>ссылки;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>видео;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>заметок;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>поста конкурента;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>старого материала;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>черновика;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>контент-идеи.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">GoToFlow помогает:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>проанализировать входные данные;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>найти угол;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сгенерировать первый слайд;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>собрать структуру;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>написать текст слайдов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>выбрать визуальный стиль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>получить черновик карусели;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>пересоздать или доработать результат.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Это полезно, если вы хотите не просто “попросить AI написать текст”, а получить более цельный workflow для каруселей.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Вставьте тему, ссылку или видео и получите структуру, текст и визуальный черновик карусели.
        </p>
        
        <InlineProductBlock
          text="Попробовать GoToFlow AI Carousel Maker"
          to="/ru/generator-karuselej-linkedin"
        />

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI против ручного создания карусели</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">AI лучше всего помогает с:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>идеями;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>хуками;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>структурой;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>первым черновиком;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>сокращением текста;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>адаптацией статьи или видео;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуальным направлением.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Ручная работа всё ещё нужна для:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>проверки фактов;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>финального тона;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>личного опыта;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>позиции автора;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуальной аккуратности;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>публикации;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>оценки результата.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16 font-semibold text-white">
          Лучший подход — не AI вместо автора, а AI как быстрый черновик и автор как финальный редактор.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Финальный чек-лист перед публикацией</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Перед тем как загрузить карусель в LinkedIn, проверьте:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>первый слайд цепляет;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>тема конкретная;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>аудитория понятна;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>структура логичная;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>каждый слайд раскрывает одну мысль;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>текст короткий;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>визуал читается на телефоне;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>CTA понятный;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>PDF экспортирован корректно;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>слайды идут в правильном порядке;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>нет ошибок в тексте;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>нет недостоверных утверждений;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>пост звучит как ваш контент, а не как шаблонный AI-текст.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          Если всё это соблюдено, AI-карусель уже можно превращать в полноценную публикацию.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Итог</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Сделать карусель LinkedIn с помощью AI — это не просто попросить нейросеть “написать слайды”.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Сильная карусель начинается с идеи, аудитории, формата и первого слайда. Потом идут структура, текст, визуальный стиль, PDF и финальная проверка.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI помогает ускорить путь от пустого листа до черновика.<br />Но хороший результат появляется тогда, когда вы добавляете свою экспертизу, примеры, позицию и финальную редактуру.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Если вы хотите создавать LinkedIn-карусели быстрее, начните с простого workflow:
        </p>
        <div className="flex flex-wrap items-center gap-2 text-pink-400 font-medium bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 text-[13px] md:text-sm">
          <span>тема или ссылка</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>хук</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>структура</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>текст</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>визуальный стиль</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>черновик</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>редактура</span> <ArrowRight className="w-3.5 h-3.5 text-zinc-500" /> <span>публикация</span>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
          А если не хотите собирать всё вручную из нескольких инструментов, попробуйте <Link to="/ru/generator-karuselej-linkedin" className="text-pink-400 hover:underline">GoToFlow AI Carousel Maker</Link>.
        </p>

      </div>
    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'Можно ли создать карусель LinkedIn с помощью AI?', a: 'Да. AI может помочь с идеей, первым слайдом, структурой, текстом, визуальным стилем, caption и CTA. Но финальный результат всё равно нужно проверить и отредактировать.' },
  { q: 'Какой AI лучше использовать для LinkedIn-каруселей?', a: 'Для текста и структуры подойдут ChatGPT, Claude или Gemini. Если нужен полный workflow от темы, ссылки или видео до структуры, текста и визуального черновика, удобнее использовать AI-генератор каруселей вроде GoToFlow.' },
  { q: 'Как опубликовать карусель в LinkedIn?', a: 'Обычно карусель создают как PDF-документ или набор слайдов, затем загружают в LinkedIn как document post. После загрузки нужно добавить caption и проверить предпросмотр.' },
  { q: 'Сколько слайдов должно быть в LinkedIn-карусели?', a: 'Чаще всего хорошо работают 7–10 слайдов. Этого достаточно, чтобы раскрыть одну мысль, но не перегрузить пользователя.' },
  { q: 'Можно ли сделать LinkedIn-карусель из видео или ссылки?', a: 'Да. С помощью AI можно взять видео, статью, ссылку или другой материал и превратить его в структуру карусели. Главное — не копировать источник, а создать новый угол и свою подачу.' },
  { q: 'Нужно ли использовать Canva или Figma?', a: 'Если у вас уже есть структура и текст, Canva или Figma помогут с дизайном. Если нужно быстрее пройти путь от идеи до черновика, лучше использовать AI-workflow, который помогает со структурой, текстом и визуальным стилем.' },
  { q: 'Что важнее: дизайн или структура?', a: 'Сначала структура. Красивый дизайн не спасёт слабую мысль. Хорошая карусель начинается с идеи, первого слайда и логики слайдов.' },
  { q: 'Можно ли публиковать AI-карусель без редактуры?', a: 'Не стоит. AI-черновик нужно проверить: факты, тон, читаемость, примеры, визуал и CTA. Финальная карусель должна звучать как ваш контент.' },
  { q: 'Как сделать так, чтобы карусель дочитывали до конца?', a: 'Нужны сильный первый слайд, одна мысль на каждый слайд, короткий текст, логичная последовательность и понятный визуальный ритм. Не перегружайте слайды.' },
  { q: 'Как быстро сделать LinkedIn-карусель?', a: 'Используйте workflow: тема или ссылка → хук → структура → текст слайдов → визуальный стиль → черновик → проверка → публикация. Такой процесс быстрее, чем начинать каждый раз с пустого листа.' }
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
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">FAQ</h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Main Component ── */
export const HowToMakeLinkedInCarouselWithAiPageRu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <ArticleSEOHead />
      <Header />
      <div className="min-h-screen bg-[#050505] selection:bg-pink-500/30 selection:text-white flex flex-col font-sans relative overflow-hidden">
        <Breadcrumbs />
        <ArticleHero />
        <ArticleBody />
        <ArticleFAQ />
        <Footer />
      </div>
      <CookieBanner />
    </MainLayout>
  );
};
