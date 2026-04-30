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

const BlogSEOHead = () => {
  useEffect(() => {
    document.title = 'Content Ideas, Hooks and Examples for Social Media | GoToFlow';
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
    
    setMeta('description', 'Ready-to-use ideas, captions and templates you can turn into posts or carousels in seconds.');
    setMeta('og:title', 'Content Ideas, Hooks and Examples for Social Media | GoToFlow', true);
    setMeta('og:description', 'Ready-to-use ideas, captions and templates you can turn into posts or carousels in seconds.', true);
    setMeta('og:url', 'https://gotoflow.io/blog', true);
    setMeta('twitter:title', 'Content Ideas, Hooks and Examples for Social Media | GoToFlow');
    setMeta('twitter:description', 'Ready-to-use ideas, captions and templates you can turn into posts or carousels in seconds.');
    
    setLink('canonical', 'https://gotoflow.io/blog');
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/blog', { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'x-default' });
    document.documentElement.lang = 'en';
    return () => { document.title = 'GoToFlow'; };
  }, []);
  return null;
};

const BlogHero = () => {
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
        Content Ideas, Hooks and Examples for Social Media
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Ready-to-use ideas, captions and templates you can turn into posts or carousels in seconds.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
        <button onClick={() => window.location.href = CTA_URL} className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center gap-2 group text-base border border-pink-400/20">
          Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);
};

const PopularBlock = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <div className="text-center">
      <h3 className="text-zinc-500 text-sm font-medium mb-3">Popular:</h3>
      <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base justify-center items-center">
        <li><Link to="/blog/content-ideas-for-social-media" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 100 Content Ideas</Link></li>
        <li><Link to="/blog/carousel-ideas" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 50 Carousel Ideas</Link></li>
        <li><Link to="/blog/linkedin-carousel-ideas" className="text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-2"><span className="text-pink-500">•</span> 50 LinkedIn Carousel Ideas</Link></li>
      </ul>
    </div>
  </section>
);

const categories = [
  {
    title: 'Ideas',
    links: [
      { to: '/blog/linkedin-carousel-ideas', title: '50 LinkedIn Carousel Ideas', desc: 'ideas for professional and business content' },
      { to: '/blog/content-ideas-for-social-media', title: '100 Content Ideas', desc: 'proven topics that drive engagement' }
    ]
  },
  {
    title: 'Hooks',
    links: [
      { to: '/blog/linkedin-hooks-examples', title: '50 LinkedIn Hooks', desc: 'scroll-stopping openers for B2B' }
    ]
  },
  {
    title: 'Captions',
    links: [
      { to: '/blog/instagram-captions', title: '100 Instagram Captions', desc: 'ready-to-use captions for posts' }
    ]
  },
  {
    title: 'Templates',
    links: [
      { to: '/blog/carousel-examples', title: '50 Carousel Examples', desc: 'high-performing structures' },
      { to: '/blog/linkedin-post-templates', title: '50 Post Templates', desc: 'fill-in-the-blank frameworks' }
    ]
  }
];

const BlogCategories = () => (
  <section className="py-20 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      {categories.map((cat, i) => (
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

const BlogInternalLinks = () => (
  <section className="py-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <div className="max-w-3xl w-full p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
      <h3 className="text-white font-medium mb-4 text-base md:text-lg">Explore tools:</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm md:text-base">
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-carousel-maker" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">AI Carousel Maker</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-carousel-maker" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Instagram Carousel Generator</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/linkedin-carousel-maker" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">LinkedIn Carousel Generator</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-content-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">AI Content Generator</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-instagram-post-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Post Generator</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-content-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Threads Content Generator</Link></li>
      </ul>
    </div>
  </section>
);

const BlogSEOText = () => (
  <section className="py-8 px-6 relative z-10 w-full bg-[#050505] text-center">
    <div className="max-w-2xl mx-auto">
      <p className="text-zinc-500 text-sm leading-relaxed mb-4">
        This section contains content ideas, hooks, captions and templates for social media.
      </p>
      <p className="text-zinc-500 text-sm leading-relaxed">
        Use these ideas to create posts, carousels and content faster using AI tools.
      </p>
    </div>
  </section>
);

export const BlogPage = () => (
  <MainLayout>
    <BlogSEOHead />
    <Header />
    <BlogHero />
    <PopularBlock />
    <BlogCategories />
    <BlogInternalLinks />
    <BlogSEOText />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
