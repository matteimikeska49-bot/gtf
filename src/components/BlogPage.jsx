import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';

const CTA_URL = 'https://app.gotoflow.io';

const BlogSEOHead = () => {
  useEffect(() => {
    document.title = 'Blog | GoToFlow';
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    setMeta('description', 'Ideas, examples and templates to create content faster');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://gotoflow.io/blog';
    return () => { document.title = 'GoToFlow'; };
  }, []);
  return null;
};

const BlogHero = () => (
  <section className="pt-32 pb-16 px-6 relative z-10 w-full bg-[#050505] flex flex-col items-center justify-center">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[700px] md:h-[900px] bg-[#ec4899]/[0.07] blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 mb-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-zinc-300">Hub</span>
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
        Blog
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Ideas, examples and templates to create content faster
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <button onClick={() => window.location.href = CTA_URL} className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center gap-2 group text-base border border-pink-400/20">
          Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);

const categories = [
  {
    title: 'Ideas',
    links: [
      { to: '/blog/linkedin-carousel-ideas', title: 'LinkedIn Carousel Ideas', desc: '50 ready-to-use ideas for your next post' },
      { to: '/blog/content-ideas-for-social-media', title: 'Content Ideas', desc: 'Proven topics that drive engagement' }
    ]
  },
  {
    title: 'Hooks',
    links: [
      { to: '/blog/linkedin-hooks-examples', title: 'LinkedIn Hooks', desc: 'Scroll-stopping openers for B2B' }
    ]
  },
  {
    title: 'Captions',
    links: [
      { to: '/blog/instagram-captions', title: 'Instagram Captions', desc: 'Copywriting formulas that convert' }
    ]
  },
  {
    title: 'Templates',
    links: [
      { to: '/blog/carousel-examples', title: 'Carousel Examples', desc: 'High-performing structures' },
      { to: '/blog/linkedin-post-templates', title: 'Post Templates', desc: 'Fill-in-the-blank frameworks' }
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
      <ul className="space-y-3 text-sm md:text-base">
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-carousel-maker" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">AI Carousel Maker</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-content-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">AI Content Generator</Link></li>
        <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-instagram-post-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Instagram Post Generator</Link></li>
      </ul>
    </div>
  </section>
);

export const BlogPage = () => (
  <MainLayout>
    <BlogSEOHead />
    <Header />
    <BlogHero />
    <BlogCategories />
    <BlogInternalLinks />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
