import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Heart, Eye, Star, X, Check, Clock, Zap, Target } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

const CTA_URL = 'https://app.gotoflow.io';

/* ── SEO Head (RU) ── */
export const SEOHeadRu = () => {
  useEffect(() => {
    document.title = 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow';
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
    
    setMeta('title', 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow');
    setMeta('description', 'Создавайте карусели для Instagram, LinkedIn и других соцсетей с помощью AI: идеи, структура слайдов, текст и CTA.');
    setMeta('og:title', 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow', true);
    setMeta('og:description', 'Создавайте карусели для Instagram, LinkedIn и других соцсетей с помощью AI: идеи, структура слайдов, текст и CTA.', true);
    setMeta('og:url', 'https://gotoflow.io/ru/ai-generator-karuselej', true);
    setMeta('twitter:title', 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow', true);
    setMeta('twitter:description', 'Создавайте карусели для Instagram, LinkedIn и других соцсетей с помощью AI: идеи, структура слайдов, текст и CTA.', true);
    setMeta('twitter:url', 'https://gotoflow.io/ru/ai-generator-karuselej', true);
    
    setLink('canonical', 'https://gotoflow.io/ru/ai-generator-karuselej');
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/ai-generator-karuselej', { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'x-default' });
    document.documentElement.lang = 'ru';
    return () => { document.title = 'GoToFlow'; document.documentElement.lang = 'en'; };
  }, []);
  return null;
};

/* ── Hero (RU) ── */
export const CarouselHeroRu = () => {
  const isMobile = useIsMobile();
  return (
  <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center justify-center">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 md:mt-0 mb-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2 shrink-0"><span className="md:animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" /></span>
          <span className="text-sm text-zinc-300 whitespace-nowrap">Генератор каруселей для Instagram</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="max-w-3xl mx-auto w-full">
        <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.1rem] font-bold text-white tracking-[-0.035em] leading-[1.12] mb-8 text-balance">
          Генератор каруселей для Instagram с&nbsp;ИИ —<br className="hidden md:block" /> <span className="text-gradient-brand">готовая карусель за 60 секунд</span>
        </h1>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-sm md:text-[0.92rem] text-zinc-500 max-w-lg mx-auto mb-12 leading-[1.75] font-medium text-balance">
        От идеи до готовых слайдов — структура, текст и логика карусели генерируются автоматически.<br className="hidden md:block" /> Без навыков дизайна, без команды, без шаблонов.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }} className="flex flex-col items-center gap-4 w-full sm:w-auto">
        <button onClick={() => window.location.href = CTA_URL} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
          Создать карусель <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-3 gap-y-1"><span>✓ Без привязки карты</span><span className="text-zinc-700">•</span><span>✓ Первая карусель за 60 секунд</span></p>
      </motion.div>
    </div>
  </section>
);
};

/* ── Showcase (RU) ── */
const carouselCards = [
  { id: 2, likes: '8.1K', views: '20K', label: 'Карусель про маркетинг', microLabel: 'создано за 60 секунд', image: '/images/niches/image_2.png.jpg' },
  { id: 3, likes: '1.8K', views: '5K', label: 'Карусель для продвижения', microLabel: 'на основе тренда', image: '/images/niches/image_3.png.jpg' },
  { id: 5, likes: '6.7K', views: '18K', label: 'Карусель для бьюти', microLabel: 'готово к публикации', image: '/images/niches/image_5.png.jpg' },
  { id: 6, likes: '5.9K', views: '14K', label: 'Карусель для фитнеса', microLabel: 'в стиле автора', image: '/images/niches/image_6.png.jpg' },
  { id: 7, likes: '2.4K', views: '7K', label: 'Обучающая карусель', microLabel: 'создано за 60 секунд', image: '/images/niches/image_7.png.jpg' },
  { id: 8, likes: '980', views: '3.2K', label: 'Карусель для путешествий', microLabel: 'на основе тренда', image: '/images/niches/image_8.png.jpg' },
  { id: 9, likes: '10K', views: '25K', label: 'Карусель для лайфстайл', microLabel: 'готово к публикации', image: '/images/niches/image_9.png.jpg' },
  { id: 10, likes: '7.2K', views: '15K', label: 'Карусель для IT-услуг', microLabel: 'в стиле автора', image: '/images/niches/image_10.png' },
];

const SlideCard = ({ card }) => (
  <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
    <div className="relative w-full aspect-square rounded-xl bg-[#111] overflow-hidden">
      <img src={card.image} alt={`Карусель Instagram: ${card.label}`} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
      <div className="absolute inset-0 md:animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] z-[1]" />
      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full z-[2] bg-violet-500/20 text-violet-300">Карусель</span>
      {card.microLabel && (
        <span className="absolute bottom-2.5 right-2.5 text-[9px] font-medium px-2 py-1 rounded-md z-[2] bg-black/60 backdrop-blur-md text-white/90 border border-white/10 flex items-center gap-1 shadow-lg">
          {card.microLabel}
        </span>
      )}
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
          <span className="text-sm text-zinc-300 font-medium tracking-tight"><span className="text-white font-semibold">+10k</span> уже создают карусели</span>
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
  { title: "Тратите 3 часа → одна карусель", text: "Написать хуки, придумать структуру слайдов и подготовить текст занимает вечность — даже если ИИ выдаёт черновик, его нужно переписывать." },
  { title: "Первый слайд не останавливает скролл", text: "Слабые хуки — и никто не свайпает дальше. Карусель умирает на первом слайде, даже если дальше всё хорошо." },
  { title: "Структура разваливается", text: "Нет логики между слайдами. Смысл рассеян, читатель уходит, вовлечённость падает." },
  { title: "Слишком много инструментов", text: "ChatGPT для текста, Canva для дизайна, заметки для идей — переключения убивают продуктивность." },
];

export const CarouselProblemRu = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, margin: isMobile ? '0px' : '-80px' });
  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 w-full flex flex-col items-center bg-[#050505]">
      <motion.div animate={{ opacity: [0.35,0.55,0.35], scale: [1,1.05,1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full -z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, rgba(249,115,22,0.07) 50%, transparent 75%)', filter: 'blur(100px)' }} />
      <motion.h2 initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center relative z-20 px-6">
        Тратишь часы на контент — <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">и всё равно приходится переделывать</span>
      </motion.h2>
      <motion.p initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7,delay:0.08 }} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-16 relative z-20 px-6">
        Вы тратите часы на слайды, но результат всё равно не конвертирует
      </motion.p>
      <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration: isMobile ? 0.6 : 0.8,delay:0.15 }} className="relative w-full max-w-6xl mx-auto px-4 z-10">
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
export const CarouselComparisonRu = () => {
  const isMobile = useIsMobile();
  return (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full bg-[#050505]">
    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[250vw] max-w-[2000px] h-[1200px] pointer-events-none -z-0 opacity-100 flex justify-center">
      <div className="absolute inset-0 mix-blend-screen" style={{ background: 'radial-gradient(circle at 60% 50%, rgba(251,146,60,0.15) 0%, transparent 35%), radial-gradient(circle at 40% 50%, rgba(236,72,153,0.12) 0%, transparent 35%)' }} />
    </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
          Старый процесс vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">GoToFlow</span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">Поиск идей, написание хуков, структура слайдов и копирайтинг обычно живут в 4+ разных инструментах. В GoToFlow это один процесс создания карусели.</p>
      </motion.div>
      <motion.div initial={{ opacity:0,y:56 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration: isMobile ? 0.6 : 0.9 }} className="relative">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.05] pointer-events-none -z-30" style={{ boxShadow:'0 50px 100px -20px rgba(0,0,0,1)' }} />
          <div className="relative z-10 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto w-full">
              {[{ icon:<Clock className="w-6 h-6"/>, color:'text-amber-400', ring:'bg-amber-500/10 border-amber-500/20', text:'Экономьте 5+ часов в неделю' },
                { icon:<Zap className="w-6 h-6"/>, color:'text-violet-400', ring:'bg-violet-500/10 border-violet-500/20', text:'Готовая карусель за ~60 секунд' },
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
                  {['Пишете хуки вручную в ChatGPT','Структурируете слайды в отдельном документе','Каждый раз собираете дизайн в Canva с нуля','Получаете сырой AI-текст и переписываете слайд за слайдом','Нет системы — каждая карусель начинается с нуля'].map((t,i)=>(
                    <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center"><X className="w-3 h-3 text-zinc-600"/></div><p className="text-sm md:text-base text-zinc-500 leading-relaxed">{t}</p></div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6 md:p-8 flex flex-col h-full relative group transition-all duration-500" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter:'blur(16px)' }}>
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent relative z-10">GoToFlow</p>
                <div className="flex flex-col gap-5 flex-1 relative z-10">
                  {['Введите тему или вставьте ссылку — получите готовую карусель','ИИ пишет хук, структурирует слайды и заполняет текст','Получите готовую к публикации карусель в один клик','Мгновенно генерируйте несколько вариантов','Ваш tone of voice сохраняется в каждом слайде'].map((t,i)=>(
                    <div key={i} className="flex items-start gap-4"><div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-pink-500/30 bg-[rgba(244,63,94,0.1)] flex items-center justify-center"><Check className="w-3 h-3 text-pink-400" strokeWidth={3}/></div><p className="text-sm md:text-base text-white font-medium leading-relaxed">{t}</p></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <button onClick={()=>window.location.href=CTA_URL} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
                Создать карусель <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
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
