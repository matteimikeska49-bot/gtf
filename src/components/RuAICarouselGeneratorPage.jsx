import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Sparkles, CornerDownLeft, Download, ChevronDown,
  Heart, Eye, Star, X, Check, Clock, Zap, Target, Fingerprint,
  Settings2, ImageIcon
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { TestimonialsSection } from './TestimonialsSection';
import { ProductRelatedResources } from './ProductRelatedResources';
import { RuMetaDisclaimerFootnote } from './common/RuMetaDisclaimerFootnote';
import { getAppUrlWithRef } from '../utils/url';
import { useIsMobile } from '../hooks/useIsMobile';

const CTA_URL = 'https://app.gotoflow.io';
const CANONICAL_URL = 'https://gotoflow.io/ru/ii-generator-karuseley';
const PAGE_TITLE = 'ИИ-генератор каруселей — создать карусель с ИИ | GoToFlow';
const PAGE_DESCRIPTION = 'Создавайте карусели с ИИ в GoToFlow: идея, сценарий, структура, текст по слайдам, визуальный стиль, свои фото, AI-персонажи, слайды и CTA за пару минут.';

/* ── SEO Head ── */
const RuSEOHead = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
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

    setMeta('title', PAGE_TITLE);
    setMeta('description', PAGE_DESCRIPTION);
    setMeta('og:title', PAGE_TITLE, true);
    setMeta('og:description', PAGE_DESCRIPTION, true);
    setMeta('og:url', CANONICAL_URL, true);
    setMeta('twitter:title', PAGE_TITLE);
    setMeta('twitter:description', PAGE_DESCRIPTION);
    setMeta('twitter:url', CANONICAL_URL);

    setLink('canonical', CANONICAL_URL);
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'en' });
    setLink('alternate', CANONICAL_URL, { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'x-default' });
    document.documentElement.lang = 'ru';
    return () => { document.title = 'GoToFlow'; };
  }, []);
  return null;
};

/* ── Hero ── */
const RuCarouselHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 md:mt-0 mb-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2 shrink-0"><span className="md:animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" /></span>
            <span className="text-sm text-zinc-300 whitespace-nowrap">ИИ для каруселей</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="max-w-4xl mx-auto w-full">
          <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-8 text-balance">
            ИИ-генератор каруселей для Instagram, <br className="hidden md:block" /> LinkedIn <span className="text-gradient-brand">и соцсетей</span>
          </h1>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-sm md:text-[0.92rem] text-zinc-500 max-w-2xl mx-auto mb-12 leading-[1.75] font-medium text-balance">
          GoToFlow создаёт готовую карусель от идеи до финального результата: помогает найти тему, собрать сценарий и структуру, написать текст, оформить визуальную подачу, сделать слайды и CTA — за пару минут.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }} className="flex flex-col items-center gap-4 w-full sm:w-auto">
          <button onClick={() => window.location.href = getAppUrlWithRef(CTA_URL)} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
            Создать карусель с ИИ <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-3 gap-y-1"><span>✓ Без привязки карты</span><span className="text-zinc-700">•</span><span>✓ Первая карусель за 60 секунд</span></p>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Showcase ── */
const carouselCards = [
  { id: 2, format: 'reel', likes: '8.1K', views: '20K', label: 'Пример карусели 2', image: '/images/niches/ru/content-ru-2.webp' },
  { id: 3, format: 'reel', likes: '1.8K', views: '5K', label: 'Пример карусели 3', image: '/images/niches/ru/content-ru-3.webp' },
  { id: 5, format: 'reel', likes: '6.7K', views: '18K', label: 'Пример карусели 5', image: '/images/niches/ru/content-ru-5.webp' },
  { id: 6, format: 'reel', likes: '5.9K', views: '14K', label: 'Пример карусели 6', image: '/images/niches/ru/content-ru-6.webp' },
  { id: 7, format: 'reel', likes: '2.4K', views: '7K', label: 'Пример карусели 7', image: '/images/niches/ru/content-ru-7.webp' },
  { id: 8, format: 'reel', likes: '980', views: '3.2K', label: 'Пример карусели 8', image: '/images/niches/ru/content-ru-8.webp' },
  { id: 9, format: 'reel', likes: '10K', views: '25K', label: 'Пример карусели 9', image: '/images/niches/ru/content-ru-9.webp' },
  { id: 10, format: 'reel', likes: '7.2K', views: '15K', label: 'Пример карусели 10', image: '/images/niches/ru/content-ru-10.webp' },
];

const SlideCard = ({ card }) => (
  <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
    <div className="relative w-full aspect-[4/5] rounded-xl bg-[#111] overflow-hidden">
      <img src={card.image} alt={`Сгенерировано ИИ ${card.label}`} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
      <div className="absolute inset-0 md:animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] z-[1]" />
      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full z-[2] bg-violet-500/20 text-violet-300">Карусель</span>
    </div>
    <div className="flex flex-col gap-2 px-1">
      <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
      <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-pink-500/70" /><span className="text-xs text-zinc-500 font-medium">{card.likes}</span></div>
        <div className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-zinc-400/50" /><span className="text-xs text-zinc-500 font-medium">{card.views}</span></div>
      </div>
    </div>
  </div>
);

const RuCarouselShowcase = () => (
  <section className="py-24 md:py-32 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-pink-600/8 blur-[60px] md:blur-[140px] rounded-full pointer-events-none" />
    <div className="relative z-10">
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/20">
          <div className="flex -space-x-2">
            {["https://randomuser.me/api/portraits/men/32.jpg","https://randomuser.me/api/portraits/women/44.jpg","https://randomuser.me/api/portraits/men/46.jpg","https://randomuser.me/api/portraits/women/68.jpg"].map((src,i)=>(
              <img key={i} src={src} alt="Пользователь GoToFlow" className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover bg-zinc-800" style={{zIndex:4-i}} />
            ))}
          </div>
          <div className="flex gap-0.5">{[...Array(5)].map((_,i)=>(<Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-sm" />))}</div>
          <span className="text-sm text-zinc-300 font-medium tracking-tight"><span className="text-white font-semibold">+10 000</span> уже создают карусели</span>
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight mb-16 px-6">
        Реальные карусели, <span className="text-gradient-brand">созданные с ИИ</span>
      </h2>
      <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
        <div className="flex items-center gap-5" style={{ animation: 'marquee-scroll 35s linear infinite', width: 'max-content' }}>
          {[...carouselCards, ...carouselCards].map((card, i) => <SlideCard key={`${card.id}-${i}`} card={card} />)}
        </div>
      </div>
    </div>
    <style>{`@keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </section>
);

/* ── Problem ── */
const problemCards = [
  { title: "Тратите часы на один пост", text: "Написание хуков, структура и формат отнимают время, особенно когда результат обычного ИИ приходится переписывать." },
  { title: "Слабый первый слайд", text: "Если хук не цепляет, никто не будет свайпать. Ваша карусель умирает на первом слайде." },
  { title: "Логика рассыпается", text: "Нет связи между слайдами. Читатель теряет фокус, уходит, а вовлеченность падает." },
  { title: "Слишком много инструментов", text: "ChatGPT для текста, Canva для дизайна, заметки для идей — переключение убивает весь процесс." },
];

const RuCarouselProblem = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, margin: isMobile ? '0px' : '-80px' });
  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 w-full flex flex-col items-center bg-[#050505]">
      <motion.div animate={{ opacity: [0.35,0.55,0.35], scale: [1,1.05,1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full -z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, rgba(249,115,22,0.07) 50%, transparent 75%)', filter: 'blur(100px)' }} />
      <motion.h2 initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20 px-6">
        Создание каруселей отнимает <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">слишком много времени?</span>
      </motion.h2>
      <motion.p initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20 px-6">
        Тратите часы на слайды, а охваты и вовлеченность не растут
      </motion.p>
      <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration: isMobile ? 0.6 : 0.8,delay:0.15 }} className="relative w-full max-w-6xl mx-auto px-4 z-10">
        <div className="relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 inset-x-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 relative z-20">
            {problemCards.map((card, i) => (
              <motion.div key={i} custom={i} initial={{ opacity:0,y:14 }} animate={inView?{ opacity:1,y:0,transition:{duration:0.7,delay:i*0.12} }:{}} className="group relative bg-white/[0.03] border border-white/[0.07] backdrop-blur-2xl rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/[0.14]">
                <h3 className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3 tracking-tight leading-snug relative z-10">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-[0.95rem] relative z-10 transition-colors duration-300 group-hover:text-zinc-300">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Comparison ── */
const RuCarouselComparison = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[250vw] max-w-[2000px] h-[1200px] pointer-events-none -z-0 opacity-100 flex justify-center">
        <div className="absolute inset-0 mix-blend-screen" style={{ background: 'radial-gradient(circle at 60% 50%, rgba(251,146,60,0.15) 0%, transparent 35%), radial-gradient(circle at 40% 50%, rgba(236,72,153,0.12) 0%, transparent 35%)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Старый подход vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">GoToFlow</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">Поиск идей, хуки, структура и текст обычно разбросаны по 4+ разным инструментам. В GoToFlow это единый процесс создания карусели.</p>
        </motion.div>
        <motion.div initial={{ opacity:0,y:56 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration: isMobile ? 0.6 : 0.9 }} className="relative">
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14">
            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.05] pointer-events-none -z-30" style={{ boxShadow:'0 50px 100px -20px rgba(0,0,0,1)' }} />
            <div className="relative z-10 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto w-full">
                {[{ icon:<Clock className="w-6 h-6"/>, color:'text-amber-400', ring:'bg-amber-500/10 border-amber-500/20', text:'Экономьте 5+ часов в неделю' },
                  { icon:<Zap className="w-6 h-6"/>, color:'text-violet-400', ring:'bg-violet-500/10 border-violet-500/20', text:'Готовая публикация за пару минут' },
                  { icon:<Target className="w-6 h-6"/>, color:'text-rose-400', ring:'bg-rose-500/10 border-rose-500/20', text:'Один процесс вместо 4 инструментов' }
                ].map((m,i)=>(
                  <div key={i} className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 backdrop-blur-3xl rounded-2xl py-4 px-6 text-center hover:bg-white/[0.06] transition-all duration-300">
                    <div className={`p-2.5 rounded-xl border mb-3 ${m.ring}`}><span className={m.color}>{m.icon}</span></div>
                    <p className="text-zinc-400 font-medium text-sm leading-snug">{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                <div className="rounded-2xl p-6 md:p-8 flex flex-col h-full" style={{ background:'rgba(5,5,5,0.6)', border:'1px solid rgba(255,255,255,0.03)', boxShadow:'inset 0 4px 24px rgba(0,0,0,0.4)' }}>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600 mb-8 text-center">Старый подход</p>
                  <div className="flex flex-col gap-5 flex-1">
                    {['Писать хуки вручную в ChatGPT','Собирать структуру в отдельном документе','Собирать дизайн в Canva с нуля каждый раз','Получать сухой ИИ-текст и переписывать его','Нет системы — каждая карусель начинается с нуля'].map((t,i)=>(
                      <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center"><X className="w-3 h-3 text-zinc-600"/></div><p className="text-sm md:text-base text-zinc-500 leading-relaxed">{t}</p></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-6 md:p-8 flex flex-col h-full relative group transition-all duration-500" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter:'blur(16px)' }}>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent relative z-10">GoToFlow</p>
                  <div className="flex flex-col gap-5 flex-1 relative z-10">
                    {['Введите тему или идею — получите готовую карусель','ИИ собирает хук, сценарий, текст, визуал и CTA','Получите готовую публикацию в один клик','Моментально генерируйте варианты для тестов','Ваш tone of voice сохраняется на каждом слайде'].map((t,i)=>(
                      <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-pink-500/30 bg-[rgba(244,63,94,0.1)] flex items-center justify-center"><Check className="w-3 h-3 text-pink-400" strokeWidth={3}/></div><p className="text-sm md:text-base text-white font-medium leading-relaxed">{t}</p></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <button onClick={()=>window.location.href = getAppUrlWithRef(CTA_URL)} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
                  Создать карусель с ИИ <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                </button>
                <p className="text-sm text-zinc-500 text-center">Первая карусель за 60 секунд</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── How It Works ── */
const InputMockup = () => (
  <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/20">
      <span className="text-xs text-zinc-500 flex-1 truncate font-mono">https://competitor.com/post/...</span>
      <div className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center"><CornerDownLeft className="w-3 h-3 text-zinc-400"/></div>
    </div>
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/20">
      <span className="text-xs text-zinc-500 flex-1 truncate font-mono">Тема: 5 ошибок в ценообразовании SaaS</span>
      <div className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center"><CornerDownLeft className="w-3 h-3 text-zinc-400"/></div>
    </div>
  </div>
);

const ProgressMockup = () => {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let cur = 0;
    const id = setInterval(() => { cur += (100*16)/2800; if(cur>=100){setPct(100);setTimeout(()=>{cur=0;setPct(0);},600);}else{setPct(Math.floor(cur));}}, 16);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-6 w-full max-w-xs flex flex-col gap-2">
      <div className="flex items-center justify-between"><span className="text-[11px] text-zinc-500 font-medium tracking-wide">Создание карусели...</span><span className="text-[11px] text-zinc-400 font-bold tabular-nums">{pct}%</span></div>
      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 transition-[width] duration-[16ms] ease-linear shadow-[0_0_20px_rgba(236,72,153,0.6)]" style={{width:`${pct}%`}}/></div>
    </div>
  );
};

const ExportMockup = () => (
  <div className="mt-6">
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)] text-pink-300 text-xs font-semibold tracking-wide transition-all hover:shadow-[0_0_28px_rgba(236,72,153,0.4)] group">
      <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300"/> Скачать карусель
    </button>
  </div>
);

const hiwSteps = [
  { icon: CornerDownLeft, number: 1, title: 'Введите идею или ссылку', desc: 'Начните с нуля, темы, ссылки или видео. GoToFlow поможет найти идею и угол подачи.', micro: <InputMockup/> },
  { icon: Sparkles, number: 2, title: 'ИИ собирает карусель', desc: 'ИИ пишет цепляющий хук, собирает сценарий, текст, визуальную подачу и CTA — за пару минут.', micro: <ProgressMockup/> },
  { icon: Download, number: 3, title: 'Готовая публикация', desc: 'Проверьте текст, внесите правки во встроенном редакторе и скачайте готовую карусель.', micro: <ExportMockup/> },
];

const RuCarouselHowItWorks = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-orange-500/15 blur-[60px] md:blur-[120px] -z-10 pointer-events-none rounded-full"/>
      <div className="max-w-7xl mx-auto bg-[#050505]/60 border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl relative z-10 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_40px_rgba(236,72,153,0.15)]">
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration: isMobile ? 0.6 : 0.8}} className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md"><Sparkles className="w-3.5 h-3.5"/>Как это работает</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">От идеи до готовой карусели за <span className="text-gradient-brand">3 простых шага</span></h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed text-balance">GoToFlow закрывает весь путь создания карусели: от идеи до готовых слайдов с текстом, визуалом и CTA.</p>
        </motion.div>
        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-[30px] md:blur-[50px] md:blur-[100px] -z-10 pointer-events-none rounded-[3rem]"/>
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"/>
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px overflow-hidden"><motion.div animate={{x:['-100%','200%']}} transition={{duration:3,repeat:Infinity,ease:'linear'}} className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_#ffffff]"/></div>
          <div className="md:hidden absolute left-[3.25rem] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent"/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 relative z-10">
            {hiwSteps.map((step,i) => (
              <motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:i*0.2}} className={`relative group flex flex-col md:items-center text-left md:text-center ${i===1?'lg:scale-105':''}`}>
                <div className={`relative w-16 h-16 flex items-center justify-center rounded-2xl border shrink-0 mb-10 z-20 shadow-2xl group-hover:scale-110 transition-transform duration-500 mx-0 md:mx-auto ${i===1?'border-pink-500/50 bg-[#0a0a0a] shadow-[0_0_15px_rgba(236,72,153,0.3)]':'border-white/10 bg-[#0a0a0a] group-hover:border-pink-500/40'}`}>
                  <step.icon className={`w-6 h-6 relative z-10 ${i===1?'text-pink-300':'text-zinc-100'}`}/>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400">{step.number}</div>
                </div>
                <div className={`w-full backdrop-blur-xl p-8 rounded-3xl border transition-[transform,border-color] duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1 md:hover:-translate-y-2 transform-gpu bg-gradient-to-b from-white/[0.08] to-white/[0.02] ${i===1?'border-pink-500/40 hover:border-pink-500/60':'border-white/[0.15] hover:border-white/25'}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"/>
                  {i===1&&<div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none"/>}
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight relative z-10">{step.title}</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed text-sm relative z-10">{step.desc}</p>
                  <div className="relative z-10 flex md:justify-center">{step.micro}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Differentiation ── */
const RuMockup1 = () => (
  <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0a0508]">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white"/></div><span className="text-[13px] font-bold text-white tracking-tight">Новая карусель</span></div>
      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col gap-2 shadow-inner">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Идея или текст</span>
        <div className="h-10 rounded bg-white/[0.02] border border-white/[0.05] flex items-center px-3"><span className="text-xs text-zinc-400">Как написать цепляющий хук...</span></div>
      </div>
    </div>
    <div className="mt-5 p-2.5 rounded-lg bg-pink-500 text-white text-[11px] font-bold text-center border border-pink-400/30 shadow-[0_4px_14px_rgba(236,72,153,0.3)]">Сгенерировать слайды</div>
  </div>
);

const RuMockup2 = () => (
  <div className="w-full h-full p-4 flex flex-col gap-3 bg-[#0a0508]">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-[11px] font-semibold text-zinc-300 tracking-wide">Структура слайдов</span>
      <span className="text-[9px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-bold border border-orange-500/20">1/8</span>
    </div>
    <div className="flex flex-col gap-2.5 flex-1">
      {[1,2,3].map(i => (
        <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.03]">
          <div className="w-4 h-4 rounded bg-white/10 text-[9px] flex items-center justify-center text-zinc-400 mt-0.5">{i}</div>
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-1.5 w-1/3 rounded-full bg-white/20"/>
            <div className="h-1.5 w-2/3 rounded-full bg-white/10"/>
            <div className="h-1 w-1/2 rounded-full bg-white/10 mt-1"/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RuMockup3 = () => (
  <div className="w-full h-full flex flex-col bg-[#050505]">
    <div className="flex items-center justify-between p-3 border-b border-white/5 bg-[#0a0a0a]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"/>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"/>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"/>
      </div>
      <div className="px-2.5 py-1 rounded bg-green-500/10 text-[9px] text-green-400 font-bold border border-green-500/20">Готово к публикации</div>
    </div>
    <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 opacity-50"/>
       <div className="w-[140px] aspect-[4/5] bg-[#111] rounded-xl border border-white/10 shadow-2xl relative flex flex-col p-4 z-10 justify-between">
          <div className="text-[13px] font-bold text-white leading-tight tracking-tight">5 секретов<br/><span className="text-pink-400">высоких охватов</span></div>
          <div className="w-full h-1/3 rounded bg-white/5"/>
          <div className="flex items-center gap-2 mt-2">
             <div className="w-5 h-5 rounded-full bg-white/20"/>
             <div className="h-1.5 w-12 rounded-full bg-white/10"/>
          </div>
       </div>
    </div>
    <div className="p-3 flex items-center justify-between border-t border-white/5 bg-[#0a0a0a]">
      <span className="text-[10px] text-zinc-400 font-medium">Дизайн применен</span>
      <button className="px-4 py-1.5 rounded-md bg-white/10 text-[10px] text-white font-bold hover:bg-white/20 transition-colors">Экспорт</button>
    </div>
  </div>
);

const ScreenshotCard = ({ imageId, className = '', delay = 0 }) => {
  return (
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay}} className={`relative group transition-transform duration-500 hover:-translate-y-1 transform-gpu ${className}`}>
      <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/20 via-rose-400/10 to-orange-500/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] z-0 pointer-events-none"/>
      <div className="relative z-10 p-2 md:p-3 bg-[#ffffff03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[1.25rem] flex flex-col justify-center h-full group-hover:border-white/[0.14] transition-colors duration-500">
        <div className="relative rounded-[0.75rem] overflow-hidden border border-white/[0.03] bg-[#0c0508] flex-grow flex items-center justify-center min-h-[220px]">
          {imageId === '1' && <RuMockup1 />}
          {imageId === '2' && <RuMockup2 />}
          {imageId === '3' && <RuMockup3 />}
        </div>
      </div>
    </motion.div>
  );
};

const diffPoints = [
  { icon: Fingerprint, title: 'Ваш стиль, а не сухой ИИ-текст', desc: 'GoToFlow сохраняет ваш tone of voice и визуальную подачу, поэтому каждая карусель звучит так, будто ее написали вы.' },
  { icon: Settings2, title: 'Управление каждым слайдом', desc: 'Задавайте темы, сценарий, корректируйте структуру и текст так, как нужно именно вам.' },
  { icon: Zap, title: 'Готовая карусель для публикации', desc: 'Получите готовые слайды с текстом и визуальной логикой, а не отдельный блок текста для ручной сборки.' },
];

const RuCarouselDifferentiation = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0808] to-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-pink-600 opacity-[0.08] blur-[80px] md:blur-[170px] rounded-full pointer-events-none"/>
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="flex flex-col">
          <motion.div initial={{opacity:0,x: isMobile ? 0 : -40, y: isMobile ? 24 : 0}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true}} transition={{duration: isMobile ? 0.6 : 0.8}}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md"><Fingerprint className="w-3.5 h-3.5"/>Почему GoToFlow</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15] text-balance">GoToFlow <span className="text-gradient-brand">закрывает весь процесс создания карусели</span></h2>
            <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed text-balance mb-12">Canva — ручной дизайн-редактор. ChatGPT помогает с отдельными частями. GoToFlow стартует от вашей идеи и строит хук, структуру, текст, визуал и слайды с CTA в едином процессе.</p>
          </motion.div>
          <div className="flex flex-col gap-4">
            {diffPoints.map((p,i) => (
              <motion.div key={i} initial={{opacity:0,x: isMobile ? 0 : -30, y: isMobile ? 20 : 0}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.13}} className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/10 hover:bg-white/[0.03] transition-colors duration-300 transform-gpu">
                <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-pink-500 blur-xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl"/>
                  <p.icon className="w-5 h-5 text-pink-300 relative z-10"/>
                </div>
                <div><h3 className="text-sm font-bold text-white mb-1 tracking-tight group-hover:text-pink-100 transition-colors">{p.title}</h3><p className="text-zinc-500 text-sm leading-relaxed font-medium">{p.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative self-center w-full max-w-[550px] lg:max-w-none mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12)_0%,transparent_60%)] blur-[40px] md:blur-[70px] rounded-full pointer-events-none z-0"/>
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full relative z-10 items-stretch">
            <div className="col-span-1"><ScreenshotCard imageId="1" delay={0.2} className="w-full h-full"/></div>
            <div className="col-span-1"><ScreenshotCard imageId="2" delay={0.3} className="w-full h-full"/></div>
            <div className="col-span-2"><ScreenshotCard imageId="3" delay={0.4} className="w-full"/></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── SEO Block ── */
const RuCarouselSEOBlock = () => (
  <section className="py-20 md:py-28 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">Краткий ответ</h2>
      <div className="text-zinc-400 leading-relaxed space-y-4 text-base">
        <p>ИИ-генератор каруселей — это инструмент, который помогает не просто написать текст, а собрать готовую карусель: идею, сценарий, структуру, текст по слайдам, визуальный стиль, слайды и CTA. GoToFlow делает этот процесс внутри одного workflow.</p>
        <p>GoToFlow — это не обычный AI-чат и не ручной дизайн-редактор. Это end-to-end система создания каруселей: от нуля до готового результата за пару минут. В отличие от ChatGPT или Canva, GoToFlow заточен именно под формат каруселей.</p>
      </div>
    </div>
  </section>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'Что такое ИИ-генератор каруселей?', a: 'ИИ-генератор каруселей помогает собрать готовую серию слайдов: идею, сценарий, структуру, текст по слайдам, визуальную подачу и CTA.' },
  { q: 'Можно ли создать карусель без готовой идеи?', a: 'Да. В GoToFlow можно начать с нуля: использовать анализ конкурентов, виральные видео, ссылку, тему или короткое описание задачи.' },
  { q: 'Можно ли использовать свой текст?', a: 'Да. Вы можете загрузить или вставить свой текст, а GoToFlow поможет разложить его по слайдам, усилить структуру и добавить CTA.' },
  { q: 'Можно ли загрузить свои фото?', a: 'Да. GoToFlow поддерживает сценарии, где пользовательские фотографии и визуальные предпочтения становятся частью карусели.' },
  { q: 'GoToFlow заменяет Canva или ChatGPT?', a: 'У инструментов разный фокус. ChatGPT и Gemini помогают с отдельными частями, Canva удобна для ручного дизайна, а GoToFlow закрывает полный workflow карусели: от идеи до готовых слайдов.' },
  { q: 'Можно ли сделать карусель для Instagram и LinkedIn?', a: 'Да. GoToFlow подходит для каруселей под Instagram, LinkedIn и другие соцсети, где важны структура, читаемость и визуальная подача.' },
  { q: 'Можно ли управлять сценарием и текстом по слайдам?', a: 'Да. Вы можете задавать тему, сценарий, стиль и материалы, а затем проверять текст, логику слайдов и CTA перед публикацией.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${isOpen?'border-pink-500/30 bg-white/[0.03]':'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-6">
      <span className={`font-semibold text-base leading-snug transition-colors ${isOpen?'text-white':'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{rotate:isOpen?180:0}} transition={{duration:0.3}} className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen?'text-pink-400':'text-zinc-500'}`}/>
      </motion.div>
    </div>
    <motion.div initial={false} animate={{height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0}} className="overflow-hidden" transition={{duration:0.35}}><p className="px-6 pb-6 text-zinc-400 leading-relaxed font-medium text-sm md:text-base">{item.a}</p></motion.div>
  </div>
);

const RuCarouselFAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const isMobile = useIsMobile();
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration: isMobile ? 0.6 : 0.8}} className="text-center mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">FAQ</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight text-balance">Популярные <span className="text-gradient-brand">вопросы</span></h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">Всё, что нужно знать о создании каруселей с ИИ</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item,i) => <FAQItem key={i} item={item} isOpen={openIdx===i} onClick={()=>setOpenIdx(openIdx===i?null:i)}/>)}
        </div>
      </div>
    </section>
  );
};

/* ── Bottom CTA ── */
const RuCarouselBottomCTA = () => {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, margin: isMobile ? '0px' : '-100px' });
  return (
    <section ref={ref} className="relative w-full overflow-hidden isolate" style={{background:'#050505'}}>
      <div className="absolute inset-0 pointer-events-none bg-[#050505]"/>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-24 md:py-32">
        <motion.div initial={{opacity:0,y:35}} animate={inView?{opacity:1,y:0}:{}} transition={{duration: isMobile ? 0.6 : 0.9}} className="relative">
          <div className="absolute -inset-6 md:-inset-10 rounded-[3rem] pointer-events-none -z-10" style={{background:'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(236,72,153,0.05) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)',filter:'blur(60px)'}}/>
          <div className="group relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',backdropFilter:'blur(40px) saturate(1.2)',boxShadow:'0 0 30px rgba(236,72,153,0.04), 0 40px 80px -25px rgba(0,0,0,0.8)'}}>
            <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 md:px-20 md:py-24 lg:px-28 lg:py-28 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-8">
                <span className="relative flex h-1.5 w-1.5"><span className="md:animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400/60"/><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-pink-500 to-orange-400"/></span>
                <span className="text-[10px] font-semibold text-zinc-500 tracking-[0.1em] uppercase">Попробуйте бесплатно</span>
              </div>
              <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-6 max-w-2xl">
                Хватит тратить часы на<br/>создание <span className="text-gradient-brand">каруселей.</span><br/><span className="text-zinc-400 font-semibold" style={{fontSize:'0.78em'}}>Создайте первую.</span>
              </h2>
              <p className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg leading-[1.75] font-medium mb-12">Тысячи креаторов уже создают карусели в GoToFlow за пару минут.</p>
              <div className="relative group mb-5">
                <button onClick={()=>window.location.href = getAppUrlWithRef(CTA_URL)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className="relative z-10 flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-[14px] font-semibold text-white text-[15px] overflow-hidden cursor-pointer" style={{background:'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',border:'1px solid rgba(255,255,255,0.18)',boxShadow:hover?'0 14px 55px rgba(236,72,153,0.5), inset 0 1px 0 rgba(255,255,255,0.25)':'0 8px 35px rgba(236,72,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',transform:hover?'translateY(-2px) scale(1.04)':'translateY(0) scale(1)',transition:'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'}}>
                  <span className="relative z-30 tracking-[0.01em]">Создать карусель с ИИ</span>
                  <ArrowRight className="relative z-30 w-[17px] h-[17px]" style={{opacity:hover?1:0.65,transform:hover?'translateX(3px)':'translateX(0)',transition:'all 0.3s'}}/>
                </button>
              </div>
              <p className="text-xs text-zinc-500 font-medium tracking-[0.06em] mb-12">Бесплатно • Без привязки карты</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {['Ваш стиль сохранен','Первая карусель за 60 секунд','Для любых ниш'].map(t=>(
                  <div key={t} className="flex items-center gap-1.5 px-3.5 py-[6px] rounded-full border border-white/[0.05] bg-white/[0.02] hover:border-pink-500/15 transition-all duration-300">
                    <Check className="w-3 h-3 text-pink-500/50 shrink-0"/><span className="text-[10px] sm:text-[11px] text-zinc-600 font-medium whitespace-nowrap">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const RuAICarouselGeneratorPage = () => {
  return (
    <MainLayout>
      <RuSEOHead />
      <Header />

      <RuCarouselHero />
      <RuCarouselShowcase />
      <RuCarouselProblem />
      <RuCarouselComparison />
      <RuCarouselHowItWorks />
      <RuCarouselDifferentiation />
      <RuCarouselSEOBlock />

      <ProductRelatedResources blocks={[
        {
          title: "Создавайте разный контент с ИИ:",
          links: [
            { url: "/ru/ii-generator-postov-dlya-linkedin", label: "Карусели для LinkedIn" },
            { url: "/ru/ii-generator-postov-dlya-instagram", label: "Посты для Instagram" },
            { url: "/ru/ii-generator-kontenta", label: "Любой контент" }
          ]
        },
        {
          title: "Полезные материалы:",
          links: [
            { url: "/ru/blog/ii-dlya-karuseley", label: "Как использовать ИИ для каруселей" },
            { url: "/ru/blog/shablony-karuseley-v-instagram", label: "Шаблоны каруселей" }
          ]
        }
      ]} />

      <TestimonialsSection />
      <RuCarouselFAQ />
      <RuCarouselBottomCTA />

      <div className="bg-[#050505] pt-12 pb-24">
        <RuMetaDisclaimerFootnote />
      </div>

      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
