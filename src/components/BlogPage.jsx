import React, { useEffect } from 'react';
import { getAppUrlWithRef } from '../utils/url';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { useIsMobile } from '../hooks/useIsMobile';
import { getPublicMarkdownArticlesByLanguage } from '../lib/blog/markdownArticles';

const CTA_URL = 'https://app.gotoflow.io';

const BlogSEOHead = () => {
  useEffect(() => {
    document.title = 'GoToFlow Blog | Practical Guides & AI Content Workflows';
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
    
    setMeta('title', 'GoToFlow Blog | Practical Guides & AI Content Workflows');
    setMeta('description', 'Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.');
    setMeta('og:title', 'GoToFlow Blog | Practical Guides & AI Content Workflows', true);
    setMeta('og:description', 'Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.', true);
    setMeta('og:url', 'https://gotoflow.io/blog', true);
    setMeta('twitter:title', 'GoToFlow Blog | Practical Guides & AI Content Workflows', true);
    setMeta('twitter:description', 'Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.', true);
    setMeta('twitter:url', 'https://gotoflow.io/blog', true);
    
    setLink('canonical', 'https://gotoflow.io/blog');
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/blog', { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'x-default' });
    document.documentElement.lang = 'en';
    return () => { document.title = 'GoToFlow'; };
  }, []);
  return null;
};

// --- Data Layer & Helpers ---

const LEGACY_ARTICLES = [
  {
    slug: 'ai-instagram-carousel-generator',
    title: 'AI Instagram Carousel Generator: How to Create Carousels with AI',
    description: 'Turn a topic, link, video, or article into hooks, slide structure, short copy, visual direction, and an Instagram carousel draft with AI.',
    articleType: 'guide',
    updatedAt: '2026-03-01'
  },
  {
    slug: 'how-to-make-linkedin-carousel-with-ai',
    title: 'How to Make a LinkedIn Carousel with AI: Step-by-Step Guide',
    description: 'A step-by-step guide to creating LinkedIn carousels with AI: hooks, structure, prompts, examples, visual style, and publishing tips.',
    articleType: 'guide',
    updatedAt: '2026-03-02'
  },
  {
    slug: 'best-ai-carousel-generators',
    title: 'Best AI Carousel Generators in 2026',
    description: 'Compare AI carousel generators for structure, hooks, visual style, and social media workflows.',
    articleType: 'best-tools',
    updatedAt: '2026-03-03'
  },
  {
    slug: 'linkedin-carousel-ideas',
    title: '50 LinkedIn Carousel Ideas for Growth',
    description: 'Ready-to-use ideas for professional and business content on LinkedIn.',
    articleType: 'ideas',
    updatedAt: '2026-03-04'
  }
];

const getArticleCategory = (article) => {
  if (article.category) return article.category;
  
  const type = (article.articleType || '').toLowerCase();
  
  if (['prompt-library', 'prompts'].includes(type)) return 'Prompts & Libraries';
  if (['guide', 'how-to'].includes(type)) return 'Guides';
  if (['ideas'].includes(type)) return 'Ideas';
  if (['comparison', 'best-tools', 'alternatives'].includes(type)) return 'Tools & Comparisons';
  if (['workflow'].includes(type)) return 'AI Content Workflows';
  
  return 'Articles & Tips';
};

const normalizeArticle = (article, isMarkdown = false) => {
  return {
    ...article,
    isMarkdown,
    categoryName: getArticleCategory(article),
    href: `/blog/${article.slug}`
  };
};

const CATEGORIES_CONFIG = [
  { id: 'guides', title: 'Guides', titleBase: 'Guides', titleAccent: '', description: 'Step-by-step workflows for creating carousels, posts, and content systems with AI.' },
  { id: 'prompts', title: 'Prompts & Libraries', titleBase: 'Prompts', titleAccent: '& Libraries', description: 'Copy-ready prompt collections and reusable content frameworks.' },
  { id: 'ideas', title: 'Ideas', titleBase: 'Ideas', titleAccent: '', description: 'Topic ideas and angles for creating better social content.' },
  { id: 'tools', title: 'Tools & Comparisons', titleBase: 'Tools', titleAccent: '& Comparisons', description: 'Tool roundups, alternatives, and buying guides.' },
  { id: 'workflows', title: 'AI Content Workflows', titleBase: 'AI Content', titleAccent: 'Workflows', description: 'Systems for repurposing, scaling, and improving AI-assisted content.' },
  { id: 'articles', title: 'Articles & Tips', titleBase: 'Articles', titleAccent: '& Tips', description: 'General tips and insights for social media growth.' }
];

const groupArticlesByCategory = (articles) => {
  const grouped = {};
  CATEGORIES_CONFIG.forEach(c => grouped[c.title] = []);
  
  articles.forEach(article => {
    const cat = article.categoryName;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(article);
  });
  
  return grouped;
};

const getAllArticles = () => {
  const markdownArticles = getPublicMarkdownArticlesByLanguage('en').map(a => normalizeArticle(a, true));
  const legacyNormalized = LEGACY_ARTICLES.map(a => normalizeArticle(a, false));
  return [...markdownArticles, ...legacyNormalized].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || '2000-01-01');
    const dateB = new Date(b.updatedAt || b.createdAt || '2000-01-01');
    return dateB - dateA;
  });
};

const getFeaturedArticles = (articles) => {
  const featuredSlugs = [
    'linkedin-carousel-prompts',
    'ai-instagram-carousel-generator',
    'how-to-make-linkedin-carousel-with-ai'
  ];
  return featuredSlugs.map(slug => articles.find(a => a.slug === slug)).filter(Boolean);
};

// --- Components ---

const SectionHeading = ({ label, titleBase, titleAccent, description, centered = false }) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center flex flex-col items-center' : 'flex flex-col'}`}>
      {label && (
        <div className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
          <span className="text-[11px] font-bold text-pink-400 tracking-widest uppercase">{label}</span>
        </div>
      )}
      <h2 className={`text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 ${centered ? '' : 'flex items-center gap-3'}`}>
        {!label && !centered && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <div className="w-4 h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
          </div>
        )}
        <span>
          {titleBase} {titleAccent && <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{titleAccent}</span>}
        </span>
      </h2>
      {description && (
        <p className={`text-zinc-400 text-sm md:text-base max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

const BlogHero = () => {
  const isMobile = useIsMobile();
  return (
  <section className="pt-32 pb-10 px-6 relative z-10 w-full bg-[#050505] flex flex-col items-center justify-center border-b border-white/[0.05]">
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[500px] bg-pink-500/[0.05] blur-[100px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-pink-200/80 font-medium tracking-wide uppercase">Content Hub</span>
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
        GoToFlow Blog
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.
      </motion.p>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <button onClick={() => window.location.href = getAppUrlWithRef(CTA_URL)} className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center gap-2 group text-base border border-pink-400/20">
          Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-zinc-500 text-sm font-medium mr-2 hidden sm:inline-block pt-2">Explore popular:</span>
          <Link to="/blog/linkedin-carousel-ideas" className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            LinkedIn carousel ideas
          </Link>
          <Link to="/blog/best-ai-carousel-generators" className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            AI carousel generators
          </Link>
          <Link to="/blog/linkedin-carousel-prompts" className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            LinkedIn carousel prompts
          </Link>
          <Link to="/blog/ai-instagram-carousel-generator" className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            Instagram carousel generator
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);
};

const ArticleCard = ({ article, featured = false }) => {
  return (
    <Link to={article.href} className="group flex flex-col bg-white/[0.02] border border-white/[0.05] hover:border-pink-500/30 rounded-2xl p-5 transition-all hover:bg-white/[0.04] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-white/5 text-pink-300 border border-white/10">
          {article.categoryName}
        </span>
        {article.updatedAt && (
          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>
      <h3 className={`font-bold text-white mb-2 group-hover:text-pink-400 transition-colors ${featured ? 'text-lg md:text-xl' : 'text-lg'}`}>
        {article.title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
        {article.description}
      </p>
      <div className="mt-auto flex items-center text-pink-500 text-sm font-medium">
        Read guide <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
      </div>
    </Link>
  );
};

const FeaturedSection = ({ articles }) => {
  if (!articles.length) return null;
  return (
    <section className="pt-12 pb-16 px-6 relative z-10 w-full bg-[#050505] border-b border-white/[0.02]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-pink-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          label="ESSENTIAL READING" 
          titleBase="Featured" 
          titleAccent="guides" 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryNavigation = ({ categories }) => {
  return (
    <section className="py-4 px-6 sticky top-16 md:top-20 z-40 w-full bg-[#050505]/95 backdrop-blur-xl border-y border-white/[0.05]">
      <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        {categories.map(cat => (
          <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.15] transition-all">
            {cat.title}
          </a>
        ))}
      </div>
    </section>
  );
};

const CategorySection = ({ config, articles, index }) => {
  if (!articles || articles.length === 0) return null;
  
  // Adaptive layout based on article count
  const getGridClass = (count) => {
    if (count === 1) return 'grid-cols-1 md:w-2/3 lg:w-1/2';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div id={config.id} className="scroll-mt-32 mb-20 relative">
      {index > 0 && <div className="absolute -top-10 left-0 w-full h-px bg-gradient-to-r from-white/[0.05] via-white/[0.01] to-transparent" />}
      <SectionHeading 
        titleBase={config.titleBase} 
        titleAccent={config.titleAccent} 
        description={config.description} 
      />
      <div className={`grid gap-5 ${getGridClass(articles.length)}`}>
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

const BlogContentSections = ({ groupedArticles }) => {
  return (
    <section className="pt-16 pb-16 px-6 relative z-10 w-full bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {CATEGORIES_CONFIG.map((catConfig, i) => (
          <CategorySection 
            key={catConfig.id} 
            config={catConfig} 
            articles={groupedArticles[catConfig.title]} 
            index={i} 
          />
        ))}
      </div>
    </section>
  );
};

const BottomWorkflowBlock = () => {
  return (
    <section className="py-20 px-6 relative z-10 w-full bg-[#050505] flex justify-center border-t border-white/[0.05] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl w-full relative z-10">
        <SectionHeading 
          label="PRODUCT PATH"
          titleBase="Build your content"
          titleAccent="workflow"
          description="Choose a tool to start creating faster with AI."
          centered={true}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Link to="/ai-carousel-maker" className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-orange-400 transition-colors">Create AI carousels</h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Carousel Maker</span>
          </Link>
          <Link to="/linkedin-carousel-maker" className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">Generate LinkedIn carousels</h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">LinkedIn Tool</span>
          </Link>
          <Link to="/ai-instagram-post-generator" className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-pink-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-pink-400 transition-colors">Write Instagram posts</h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Post Generator</span>
          </Link>
          <Link to="/blog/best-ai-carousel-generators" className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">Compare AI carousel tools</h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Review Guide</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const BlogPage = () => {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles(allArticles);
  const groupedArticles = groupArticlesByCategory(allArticles);
  
  const activeCategories = CATEGORIES_CONFIG.filter(cat => groupedArticles[cat.title]?.length > 0);

  return (
    <MainLayout>
      <BlogSEOHead />
      <Header />
      <BlogHero />
      <FeaturedSection articles={featuredArticles} />
      {activeCategories.length > 0 && <CategoryNavigation categories={activeCategories} />}
      <BlogContentSections groupedArticles={groupedArticles} />
      <BottomWorkflowBlock />
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
