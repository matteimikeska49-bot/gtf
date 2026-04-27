import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, CornerDownLeft, Download, ChevronDown, Heart, Eye, Star, X, Check, Clock, Zap, Target, Fingerprint, Settings2, Layers, ImageIcon } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';





const CTA_URL = 'https://app.gotoflow.io';

/* ── SEO Head (RU) ── */
export const SEOHeadRu = () => {
  useEffect(() => {
    document.title = 'Генератор постов Instagram с ИИ';
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
    setMeta('description', 'Создавайте посты и тексты для Instagram автоматически с помощью ИИ.');
    setLink('canonical', 'https://gotoflow.io/ru/generator-postov-instagram');
    setLink('alternate', 'https://gotoflow.io/ai-instagram-post-generator', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/generator-postov-instagram', { hreflang: 'ru' });
    document.documentElement.lang = 'ru';
    return () => { document.title = 'AI-генератор контента для соцсетей — Создавайте посты, посты и Reels | GoToFlow'; document.documentElement.lang = 'en'; };
  }, []);
  return null;
};

/* ── Hero (RU) ── */
export const CarouselHeroRu = () => (
  <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 md:mt-0 mb-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" /></span>
          <span className="text-sm text-zinc-300 whitespace-nowrap">Генератор постов для Instagram</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8, delay: 0.1 }} className="max-w-3xl mx-auto w-full">
        <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-8 text-balance">
          Генератор постов для Instagram с ИИ —<br className="hidden md:block" /> <span className="text-gradient-brand">готовый пост за 60 секунд</span>
        </h1>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8, delay: 0.2 }} className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg mx-auto mb-12 leading-[1.75] font-medium text-balance">
        От идеи до готовых слайдов — структура, текст и логика посты генерируются автоматически.<br className="hidden md:block" /> Без навыков дизайна, без команды, без шаблонов.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8, delay: 0.3 }} className="flex flex-col items-center gap-4 w-full sm:w-auto">
        <button onClick={() => window.location.href = CTA_URL} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
          Создать пост <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-3 gap-y-1"><span>✓ Без привязки карты</span><span className="text-zinc-700">•</span><span>✓ Первая пост за 60 секунд</span></p>
      </motion.div>
    </div>
  </section>
);

/* ── Showcase (RU) ── */
const carouselCards = [
  { id: 2, likes: '8.1K', views: '20K', label: 'Пост про маркетинг', image: '/images/niches/image_2.png.jpg' },
  { id: 3, likes: '1.8K', views: '5K', label: 'Пост для продвижения', image: '/images/niches/image_3.png.jpg' },
  { id: 5, likes: '6.7K', views: '18K', label: 'Пост для бьюти', image: '/images/niches/image_5.png.jpg' },
  { id: 6, likes: '5.9K', views: '14K', label: 'Пост для фитнеса', image: '/images/niches/image_6.png.jpg' },
  { id: 7, likes: '2.4K', views: '7K', label: 'Обучающая пост', image: '/images/niches/image_7.png.jpg' },
  { id: 8, likes: '980', views: '3.2K', label: 'Пост для путешествий', image: '/images/niches/image_8.png.jpg' },
  { id: 9, likes: '10K', views: '25K', label: 'Пост для лайфстайл', image: '/images/niches/image_9.png.jpg' },
  { id: 10, likes: '7.2K', views: '15K', label: 'Пост для IT-услуг', image: '/images/niches/image_10.png' },
];

const SlideCard = ({ card }) => (
  <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
    <div className="relative w-full aspect-square rounded-xl bg-[#111] overflow-hidden">
      <img src={card.image} alt={`Пост Instagram: ${card.label}`} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] z-[1]" />
      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full z-[2] bg-violet-500/20 text-violet-300">Пост</span>
    </div>
    <div className="flex flex-col gap-2 px-1">
      <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
      <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-pink-500/70" /><span className="text-xs text-zinc-500 font-medium">{card.likes}</span></div>
        <div className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-zinc-400/50" /><span className="text-xs text-zinc-500 font-medium">{card.views}</span></div>
        <span className="ml-auto text-[11px] text-zinc-600 truncate">{card.label}</span>
      </div>
    </div>
  </div>
);

export const CarouselShowcaseRu = () => (
  <section className="py-24 md:py-32 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-pink-600/8 blur-[140px] rounded-full pointer-events-none" />
    <div className="relative z-10">
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/20">
          <div className="flex -space-x-2">
            {["https://randomuser.me/api/portraits/men/32.jpg","https://randomuser.me/api/portraits/women/44.jpg","https://randomuser.me/api/portraits/men/46.jpg","https://randomuser.me/api/portraits/women/68.jpg"].map((src,i)=>(
              <img key={i} src={src} alt="Пользователь GoToFlow" className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover bg-zinc-800" style={{zIndex:4-i}} />
            ))}
          </div>
          <div className="flex gap-0.5">{[...Array(5)].map((_,i)=>(<Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-sm" />))}</div>
          <span className="text-sm text-zinc-300 font-medium tracking-tight"><span className="text-white font-semibold">+10k</span> уже создают посты</span>
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight mb-16 px-6">
        Примеры каруселей, <span className="text-gradient-brand">созданных с помощью ИИ</span>
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

/* ── Problem (RU) ── */
const problemCards = [
  { title: "Тратите 3 часа → одна пост", text: "Написать хуки, придумать структуру слайдов и подготовить текст занимает вечность — даже если ИИ выдаёт черновик, его нужно переписывать." },
  { title: "Первый слайд не останавливает скролл", text: "Слабые хуки — и никто не свайпает дальше. Пост умирает на первом слайде, даже если дальше всё хорошо." },
  { title: "Структура разваливается", text: "Нет логики между слайдами. Смысл рассеян, читатель уходит, вовлечённость падает." },
  { title: "Слишком много инструментов", text: "ChatGPT для текста, Canva для дизайна, заметки для идей — переключения убивают продуктивность." },
];

export const CarouselProblemRu = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : '-80px' });
  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 w-full flex flex-col items-center bg-[#050505]">
      <motion.div animate={{ opacity: [0.35,0.55,0.35], scale: [1,1.05,1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full -z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, rgba(249,115,22,0.07) 50%, transparent 75%)', filter: 'blur(100px)' }} />
      <motion.h2 initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20 px-6">
        Создание каруселей превратилось в <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">хаос?</span>
      </motion.h2>
      <motion.p initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20 px-6">
        Вы тратите часы на слайды, но результат всё равно не конвертирует
      </motion.p>
      <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8,delay:0.15 }} className="relative w-full max-w-6xl mx-auto px-4 z-10">
        <div className="relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 inset-x-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 relative z-20">
            {problemCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity:0,y:14 }} animate={inView?{ opacity:1,y:0,transition:{duration:0.7,delay:i*0.12} }:{}} className="group relative bg-white/[0.03] border border-white/[0.07] backdrop-blur-2xl rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/[0.14]">
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

/* ── Comparison (RU) ── */
export const CarouselComparisonRu = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full bg-[#050505]">
    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[250vw] max-w-[2000px] h-[1200px] pointer-events-none -z-0 opacity-100 flex justify-center">
      <div className="absolute inset-0 mix-blend-screen" style={{ background: 'radial-gradient(circle at 60% 50%, rgba(251,146,60,0.15) 0%, transparent 35%), radial-gradient(circle at 40% 50%, rgba(236,72,153,0.12) 0%, transparent 35%)' }} />
    </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
          Старый процесс vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">GoToFlow</span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">Поиск идей, написание хуков, структура слайдов и копирайтинг обычно живут в 4+ разных инструментах. В GoToFlow это один процесс создания посты.</p>
      </motion.div>
      <motion.div initial={{ opacity:0,y:56 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.9 }} className="relative">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.05] pointer-events-none -z-30" style={{ boxShadow:'0 50px 100px -20px rgba(0,0,0,1)' }} />
          <div className="relative z-10 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto w-full">
              {[{ icon:<Clock className="w-6 h-6"/>, color:'text-amber-400', ring:'bg-amber-500/10 border-amber-500/20', text:'Экономьте 5+ часов в неделю' },
                { icon:<Zap className="w-6 h-6"/>, color:'text-violet-400', ring:'bg-violet-500/10 border-violet-500/20', text:'Готовая пост за ~60 секунд' },
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
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600 mb-8 text-center">Обычный путь</p>
                <div className="flex flex-col gap-5 flex-1">
                  {['Пишете хуки вручную в ChatGPT','Структурируете слайды в отдельном документе','Каждый раз собираете дизайн в Canva с нуля','Получаете сырой AI-текст и переписываете слайд за слайдом','Нет системы — каждая пост начинается с нуля'].map((t,i)=>(
                    <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center"><X className="w-3 h-3 text-zinc-600"/></div><p className="text-sm md:text-base text-zinc-500 leading-relaxed">{t}</p></div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6 md:p-8 flex flex-col h-full relative group transition-all duration-500" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter:'blur(16px)' }}>
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent relative z-10">GoToFlow</p>
                <div className="flex flex-col gap-5 flex-1 relative z-10">
                  {['Введите тему или вставьте ссылку — получите готовую пост','ИИ пишет хук, структурирует слайды и заполняет текст','Получите готовую к публикации пост в один клик','Мгновенно генерируйте несколько вариантов','Ваш tone of voice сохраняется в каждом слайде'].map((t,i)=>(
                    <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-pink-500/30 bg-[rgba(244,63,94,0.1)] flex items-center justify-center"><Check className="w-3 h-3 text-pink-400" strokeWidth={3}/></div><p className="text-sm md:text-base text-white font-medium leading-relaxed">{t}</p></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <button onClick={()=>window.location.href=CTA_URL} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
                Создать пост <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </button>
              <p className="text-sm text-zinc-500 text-center">Первая пост за 60 секунд</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);







/* ── HowItWorks (RU) ── */
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
      <div className="flex items-center justify-between"><span className="text-[11px] text-zinc-500 font-medium tracking-wide">Создание посты...</span><span className="text-[11px] text-zinc-400 font-bold tabular-nums">{pct}%</span></div>
      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 transition-[width] duration-[16ms] ease-linear shadow-[0_0_20px_rgba(236,72,153,0.6)]" style={{width:`${pct}%`}}/></div>
    </div>
  );
};

const ExportMockup = () => (
  <div className="mt-6">
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)] text-pink-300 text-xs font-semibold tracking-wide transition-all hover:shadow-[0_0_28px_rgba(236,72,153,0.4)] group">
      <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300"/> Скачать пост
    </button>
  </div>
);

const hiwSteps = [
  { icon: CornerDownLeft, number: 1, title: 'Введите тему или ссылку', desc: 'Введите тему, URL или идею. ИИ изучит контекст и подготовит пост.', micro: <InputMockup/> },
  { icon: Sparkles, number: 2, title: 'ИИ создаёт пост', desc: 'ИИ пишет цепляющий хук, структурирует каждый слайд и пишет тексты.', micro: <ProgressMockup/> },
  { icon: Download, number: 3, title: 'Получите готовые слайды', desc: 'Проверьте, отредактируйте при необходимости и скачайте готовую пост.', micro: <ExportMockup/> },
];

export const CarouselHowItWorksRu = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-black">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-orange-500/15 blur-[120px] -z-10 pointer-events-none rounded-full"/>
    <div className="max-w-7xl mx-auto bg-[#050505]/60 border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl relative z-10 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_40px_rgba(236,72,153,0.15)]">
      <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8}} className="text-center mb-16 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md"><Sparkles className="w-3.5 h-3.5"/>Как это работает</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">От идеи до готовой посты за <span className="text-gradient-brand">3 простых шага</span></h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed text-balance">ИИ делает всю тяжёлую работу — вы принимаете финальное решение.</p>
      </motion.div>
      <div className="relative mt-12 max-w-5xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-[100px] -z-10 pointer-events-none rounded-[3rem]"/>
        <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"/>
        <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px overflow-hidden"><motion.div animate={{x:['-100%','200%']}} transition={{duration:3,repeat:Infinity,ease:'linear'}} className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_#ffffff]"/></div>
        <div className="md:hidden absolute left-[3.25rem] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 relative z-10">
          {hiwSteps.map((step,i) => (
            <motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:i*0.2}} className={`relative group flex flex-col md:items-center text-left md:text-center ${i===1?'lg:scale-105':''}`}>
              <div className={`relative w-16 h-16 flex items-center justify-center rounded-2xl border shrink-0 mb-10 z-20 shadow-2xl group-hover:scale-110 transition-all duration-500 mx-0 md:mx-auto ${i===1?'border-pink-500/50 bg-[#0a0a0a] shadow-[0_0_15px_rgba(236,72,153,0.3)]':'border-white/10 bg-[#0a0a0a] group-hover:border-pink-500/40'}`}>
                <step.icon className={`w-6 h-6 relative z-10 ${i===1?'text-pink-300':'text-zinc-100'}`}/>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400">{step.number}</div>
              </div>
              <div className={`w-full backdrop-blur-xl p-8 rounded-3xl border transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1 md:hover:-translate-y-2 transform bg-gradient-to-b from-white/[0.08] to-white/[0.02] ${i===1?'border-pink-500/40 hover:border-pink-500/60':'border-white/[0.15] hover:border-white/25'}`}>
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

/* ── Differentiation (RU) ── */
const ScreenshotCard = ({ imageId, className = '', delay = 0 }) => {
  const [err, setErr] = React.useState(false);
  return (
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay}} className={`relative group transition-all duration-500 hover:-translate-y-1 ${className}`}>
      <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/20 via-rose-400/10 to-orange-500/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] z-0 pointer-events-none"/>
      <div className="relative z-10 p-2 md:p-3 bg-[#ffffff03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[1.25rem] flex flex-col justify-center h-full group-hover:border-white/[0.14] transition-colors duration-500">
        <div className="relative rounded-[0.75rem] overflow-hidden border border-white/[0.03] bg-[#0c0508] flex-grow flex items-center justify-center">
          {!err ? <img src={`/images/screens/screen-${imageId}.png`} alt={`GoToFlow AI генератор постов экран ${imageId}`} className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.02]" onError={()=>setErr(true)}/> :
          <div className="w-full aspect-[4/3] flex flex-col items-center justify-center"><div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-2"><ImageIcon className="w-5 h-5 text-zinc-600"/></div></div>}
        </div>
      </div>
    </motion.div>
  );
};

const diffPoints = [
  { icon: Fingerprint, title: 'Ваш стиль, а не шаблонный текст', desc: 'GoToFlow сохраняет ваш tone of voice, поэтому каждая пост звучит так, будто её написали вы.' },
  { icon: Settings2, title: 'Контроль каждого слайда', desc: 'Задавайте темы, направляйте хук, корректируйте структуру и тексты так, как нужно вам.' },
  { icon: Zap, title: 'Готовая пост, а не просто текст', desc: 'Получите готовую структурированную пост — а не блок текста, который нужно вручную разбивать на слайды.' },
];

export const CarouselDifferentiationRu = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0808] to-[#050505]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-pink-600 opacity-[0.08] blur-[170px] rounded-full pointer-events-none"/>
    <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div className="flex flex-col">
        <motion.div initial={{opacity:0,x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -40, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 0}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md"><Fingerprint className="w-3.5 h-3.5"/>Почему GoToFlow</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15] text-balance">GoToFlow <span className="text-gradient-brand">создаёт контент</span><br className="hidden lg:block"/> а не просто дизайн</h2>
          <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed text-balance mb-12">Пока другие сервисы дают вам пустой холст, GoToFlow генерирует полную пост — структуру слайдов, тексты и логику — используя ИИ.</p>
        </motion.div>
        <div className="flex flex-col gap-4">
          {diffPoints.map((p,i) => (
            <motion.div key={i} initial={{opacity:0,x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -30, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.13}} className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12)_0%,transparent_60%)] blur-[70px] rounded-full pointer-events-none z-0"/>
        <div className="grid grid-cols-2 gap-4 md:gap-5 w-full relative z-10 items-stretch">
          <div className="col-span-1"><ScreenshotCard imageId="1" delay={0.2} className="w-full h-full"/></div>
          <div className="col-span-1"><ScreenshotCard imageId="2" delay={0.3} className="w-full h-full"/></div>
          <div className="col-span-2"><ScreenshotCard imageId="3" delay={0.4} className="w-full"/></div>
        </div>
      </div>
    </div>
  </section>
);

/* ── SEO Text Block (RU) ── */
export const CarouselSEOBlockRu = () => (
  <section className="py-20 md:py-28 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">Что такое генератор постов с ИИ</h2>
      <div className="text-zinc-400 leading-relaxed space-y-4 text-base">
        <p>Генератор постов с ИИ — это инструмент, который автоматически создает <strong className="text-zinc-200">пост Instagram</strong> и других соцсетей. Вместо того чтобы писать каждый слайд вручную, вы просто вводите тему или идею, и ИИ выдает структурированную пост с сильным хуком, готовую к публикации.</p>
        <p>Наш генератор постов работает не как обычные шаблоны. ИИ анализирует контекст, применяет проверенные контентные фреймворки и <strong className="text-zinc-200">создает пост</strong> с четкой целью для каждого слайда — от цепляющего заголовка до призыва к действию (CTA) в конце.</p>
        <p>Создать пост с помощью ИИ — значит ускорить производство контента, получить стабильное качество и возможность тестировать разные подходы. Будь вы эксперт или фаундер, генератор забирает на себя самую сложную часть работы.</p>
      </div>
    </div>
  </section>
);

/* ── FAQ (RU) ── */
const faqItems = [
  { q: 'Что такое генератор постов?', a: 'Это инструмент, который использует искусственный интеллект для автоматического создания каруселей. Вы задаете тему, а ИИ пишет хук, продумывает структуру и заполняет каждый слайд текстом — за считанные секунды.' },
  { q: 'Можно ли создать пост с помощью ИИ?', a: 'Да. GoToFlow генерирует контент, оптимизированный для Instagram и LinkedIn. ИИ пишет цепляющий текст, логично выстраивает слайды и делает всё, чтобы вашу пост сохраняли и репостили.' },
  { q: 'Нужно ли уметь дизайн?', a: 'Нет. GoToFlow создан для тех, кто хочет получать качественный контент для каруселей без навыков дизайна и профессионального копирайтинга.' },
  { q: 'Чем это лучше Canva?', a: 'Это разные инструменты. Canva помогает с дизайном, а GoToFlow создает контент. Наш ИИ генерирует идеи, хуки и текст для структуры посты, после чего вы получаете готовый результат.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen?'border-pink-500/30 bg-white/[0.03]':'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-6">
      <span className={`font-semibold text-base leading-snug transition-colors ${isOpen?'text-white':'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{rotate:isOpen?180:0}} transition={{duration:0.3}} className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen?'text-pink-400':'text-zinc-500'}`}/>
      </motion.div>
    </div>
    {isOpen && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} transition={{duration:0.35}}><p className="px-6 pb-6 text-zinc-400 leading-relaxed font-medium text-sm md:text-base">{item.a}</p></motion.div>}
  </div>
);

export const CarouselFAQRu = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8}} className="text-center mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">FAQ</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight text-balance">Частые <span className="text-gradient-brand">вопросы</span></h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">Всё, что нужно знать про генерацию каруселей</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item,i) => <FAQItem key={i} item={item} isOpen={openIdx===i} onClick={()=>setOpenIdx(openIdx===i?null:i)}/>)}
        </div>
      </div>
    </section>
  );
};

/* ── Bottom CTA (RU) ── */
export const CarouselBottomCTARu = () => {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : '-100px' });
  return (
    <section ref={ref} className="relative w-full overflow-hidden isolate" style={{background:'#050505'}}>
      <div className="absolute inset-0 pointer-events-none bg-[#050505]"/>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-24 md:py-32">
        <motion.div initial={{opacity:0,y:35}} animate={inView?{opacity:1,y:0}:{}} transition={{duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.9}} className="relative">
          <div className="absolute -inset-6 md:-inset-10 rounded-[3rem] pointer-events-none -z-10" style={{background:'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(236,72,153,0.05) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)',filter:'blur(60px)'}}/>
          <div className="group relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',backdropFilter:'blur(40px) saturate(1.2)',boxShadow:'0 0 30px rgba(236,72,153,0.04), 0 40px 80px -25px rgba(0,0,0,0.8)'}}>
            <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 md:px-20 md:py-24 lg:px-28 lg:py-28 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-8">
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400/60"/><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-pink-500 to-orange-400"/></span>
                <span className="text-[10px] font-semibold text-zinc-500 tracking-[0.1em] uppercase">Начать бесплатно</span>
              </div>
              <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-6 max-w-2xl">
                Готовая пост за 60 секунд. <span className="text-gradient-brand">Без дизайна.</span><br/><span className="text-zinc-400 font-semibold" style={{fontSize:'0.78em'}}>Без команды.</span>
              </h2>
              <p className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg leading-[1.75] font-medium mb-12">Присоединяйтесь к тысячам креаторов и предпринимателей, которые создают вовлекающие посты за секунды с помощью ИИ GoToFlow.</p>
              <div className="relative group mb-5">
                <button onClick={()=>window.location.href=CTA_URL} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className="relative z-10 flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-[14px] font-semibold text-white text-[15px] overflow-hidden cursor-pointer" style={{background:'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',border:'1px solid rgba(255,255,255,0.18)',boxShadow:hover?'0 14px 55px rgba(236,72,153,0.5), inset 0 1px 0 rgba(255,255,255,0.25)':'0 8px 35px rgba(236,72,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',transform:hover?'translateY(-2px) scale(1.04)':'translateY(0) scale(1)',transition:'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'}}>
                  <span className="relative z-30 tracking-[0.01em]">Создать пост &rarr;</span>
                  <ArrowRight className="relative z-30 w-[17px] h-[17px]" style={{opacity:hover?1:0.65,transform:hover?'translateX(3px)':'translateX(0)',transition:'all 0.3s'}}/>
                </button>
              </div>
              <p className="text-xs text-zinc-500 font-medium tracking-[0.06em] mb-12">Бесплатно • Без привязки карты</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {['Ваш Tone of Voice','Готово за 60 секунд','Для любой ниши'].map(t=>(
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

export const InstagramPostPageRu = () => (
  <MainLayout>
    <SEOHeadRu />
    <Header />
    <CarouselHeroRu />
    <CarouselShowcaseRu />
    <CarouselProblemRu />
    <CarouselComparisonRu />
    <CarouselHowItWorksRu />
    <CarouselDifferentiationRu />
    <CarouselSEOBlockRu />
    <section className="py-6 px-6 bg-[#050505] relative z-10 w-full flex justify-center">
      <div className="max-w-3xl w-full p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
        <h3 className="text-white font-medium mb-4 text-base md:text-lg">Расширьте возможности контента:</h3>
        <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/ai-generator-karuselej" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Карусели</Link></li>
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-kontenta" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор контента</Link></li>
        </ul>
      </div>
    </section>
    <CarouselFAQRu />
    <CarouselBottomCTARu />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
