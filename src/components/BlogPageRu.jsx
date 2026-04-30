import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { useIsMobile } from '../hooks/useIsMobile';

const CTA_URL = 'https://app.gotoflow.io';

const BlogSEOHeadRu = () => {
  useEffect(() => {
    document.title = 'Блог GoToFlow — AI, контент и карусели для соцсетей';
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
    
    setMeta('title', 'Блог GoToFlow — AI, контент и карусели для соцсетей');
    setMeta('description', 'Практические статьи о создании контента, каруселей, постов и контент-стратегии с помощью AI.');
    setMeta('og:title', 'Блог GoToFlow — AI, контент и карусели для соцсетей', true);
    setMeta('og:description', 'Практические статьи о создании контента, каруселей, постов и контент-стратегии с помощью AI.', true);
    setMeta('og:url', 'https://gotoflow.io/ru/blog', true);
    setMeta('twitter:title', 'Блог GoToFlow — AI, контент и карусели для соцсетей', true);
    setMeta('twitter:description', 'Практические статьи о создании контента, каруселей, постов и контент-стратегии с помощью AI.', true);
    setMeta('twitter:url', 'https://gotoflow.io/ru/blog', true);
    
    setLink('canonical', 'https://gotoflow.io/ru/blog');
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/blog', { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'x-default' });
    document.documentElement.lang = 'ru';
    return () => { document.title = 'GoToFlow'; document.documentElement.lang = 'en'; };
  }, []);
  return null;
};

const BlogHeroRu = () => {
  const isMobile = useIsMobile();
  return (
  <section className="pt-32 pb-8 px-6 relative z-10 w-full bg-[#050505] flex flex-col items-center justify-center">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 mb-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-zinc-300">Hub</span>
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
        Идеи, хуки и примеры контента для соцсетей
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Готовые идеи, подписи и шаблоны, которые можно сразу превратить в пост или карусель.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
        <button onClick={() => window.location.href = CTA_URL} className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center gap-2 group text-base border border-pink-400/20">
          Начать бесплатно <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);
};

const PopularBlockRu = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <div className="text-center">
      <h3 className="text-zinc-500 text-sm font-medium mb-3">Популярное:</h3>
      <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base justify-center items-center">
        <li><Link to="/blog/idei-kontenta" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 100 идей контента</Link></li>
        <li><Link to="/blog/idei-karuselej" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 50 идей каруселей</Link></li>
        <li><Link to="/blog/idei-karuselej-linkedin" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 50 идей каруселей для LinkedIn</Link></li>
      </ul>
    </div>
  </section>
);

const categoriesRu = [
  {
    title: 'Идеи',
    links: [
      { to: '/blog/idei-karuselej', title: '50 идей каруселей', desc: 'готовые темы и примеры' },
      { to: '/blog/idei-kontenta', title: '100 идей контента', desc: 'темы, которые приносят охваты' }
    ]
  },
  {
    title: 'Хуки',
    links: [
      { to: '/blog/huki-dlya-postov', title: '50 хуков для постов', desc: 'заголовки, которые останавливают скролл' }
    ]
  },
  {
    title: 'Подписи',
    links: [
      { to: '/blog/podpisi-instagram', title: '100 подписей Instagram', desc: 'тексты для постов' }
    ]
  },
  {
    title: 'Шаблоны',
    links: [
      { to: '/blog/primery-karuselej', title: '50 примеров каруселей', desc: 'эффективные визуальные форматы' }
    ]
  }
];

const BlogCategoriesRu = () => (
  <section className="py-20 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      {categoriesRu.map((cat, i) => (
        <div key={i} className="flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight border-b border-white/10 pb-4">{cat.title}</h2>
          <div className="flex flex-col gap-6">
            {cat.links.map((link, j) => (
              <Link key={j} to={link.to} className="group block">
                <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-pink-400 transition-colors mb-1">{link.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">→ {link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BlogInternalLinksRu = () => (
  <section className="py-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <div className="max-w-3xl w-full p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
      <h3 className="text-white font-medium mb-4 text-base md:text-lg">Инструменты:</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm md:text-base">
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/ai-generator-karuselej" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор каруселей</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/ai-generator-karuselej" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор каруселей для Instagram</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-karuselej-linkedin" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор каруселей для LinkedIn</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-kontenta" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор контента</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-postov-instagram" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор постов</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-kontenta" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Генератор постов для Threads</Link></li>
      </ul>
    </div>
  </section>
);

const BlogSEOTextRu = () => (
  <section className="py-8 px-6 relative z-10 w-full bg-[#050505] text-center">
    <div className="max-w-2xl mx-auto">
      <p className="text-zinc-500 text-sm leading-relaxed mb-4">
        Этот раздел содержит идеи контента, хуки, подписи и шаблоны для соцсетей.
      </p>
      <p className="text-zinc-500 text-sm leading-relaxed">
        Используйте их, чтобы быстрее создавать посты и карусели с помощью ИИ.
      </p>
    </div>
  </section>
);

export const BlogPageRu = () => (
  <MainLayout>
    <BlogSEOHeadRu />
    <Header />
    <BlogHeroRu />
    <PopularBlockRu />
    <BlogCategoriesRu />
    <BlogInternalLinksRu />
    <BlogSEOTextRu />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
