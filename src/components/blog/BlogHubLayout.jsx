import React, { useEffect } from 'react';
import { getAppUrlWithRef } from '../../utils/url';
import { ArrowRight, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { getPublicMarkdownArticlesByLanguage } from '../../lib/blog/markdownArticles';

const CTA_URL = 'https://app.gotoflow.io';

const BlogSEOHead = ({ isRu }) => {
  useEffect(() => {
    const title = isRu 
      ? 'Блог GoToFlow — AI, контент и карусели для соцсетей' 
      : 'GoToFlow Blog | Practical Guides & AI Content Workflows';
    const description = isRu 
      ? 'Практические статьи о создании контента, каруселей, постов и контент-стратегии с помощью AI.' 
      : 'Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.';
    const url = isRu ? 'https://gotoflow.io/ru/blog' : 'https://gotoflow.io/blog';

    document.title = title;
    
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
    
    setMeta('title', title);
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:url', url, true);
    
    setLink('canonical', url);
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/blog', { hreflang: 'ru' });
    setLink('alternate', 'https://gotoflow.io/blog', { hreflang: 'x-default' });
    document.documentElement.lang = isRu ? 'ru' : 'en';
    
    return () => { document.title = 'GoToFlow'; document.documentElement.lang = 'en'; };
  }, [isRu]);
  return null;
};

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

const LEGACY_ARTICLES_RU = [
  {
    slug: 'luchshie-ai-generatory-karuselej',
    title: 'Лучшие AI-генераторы каруселей в 2026 году',
    description: 'Сравниваем лучшие AI-генераторы каруселей для Instagram, LinkedIn и соцсетей',
    articleType: 'best-tools',
    updatedAt: '2026-03-03'
  },
  {
    slug: 'kak-sdelat-karusel-linkedin-s-ai',
    title: 'Как сделать карусель LinkedIn с помощью AI',
    description: 'Пошаговая инструкция по созданию каруселей: идеи, структура, дизайн и публикация',
    articleType: 'guide',
    updatedAt: '2026-03-02'
  },
  {
    slug: 'idei-karuselej-linkedin',
    title: '50 идей каруселей для LinkedIn',
    description: 'готовые темы и примеры',
    articleType: 'ideas',
    updatedAt: '2026-03-04'
  }
];

const CATEGORY_NAMES = {
  en: {
    'Prompts & Libraries': 'Prompts & Libraries',
    'Guides': 'Guides',
    'Ideas': 'Ideas',
    'Tools & Comparisons': 'Tools & Comparisons',
    'AI Content Workflows': 'AI Content Workflows',
    'Articles & Tips': 'Articles & Tips'
  },
  ru: {
    'Prompts & Libraries': 'Промпты и библиотеки',
    'Guides': 'Руководства',
    'Ideas': 'Идеи',
    'Tools & Comparisons': 'Инструменты и обзоры',
    'AI Content Workflows': 'AI-контент воркфлоу',
    'Articles & Tips': 'Статьи'
  }
};

const getArticleCategory = (article) => {
  if (article.category) return article.category;
  const type = (article.articleType || '').toLowerCase();
  
  if (['prompt-library', 'prompts'].includes(type)) return 'Prompts & Libraries';
  if (['guide', 'how-to', 'tutorial'].includes(type)) return 'Guides';
  if (['ideas'].includes(type)) return 'Ideas';
  if (['comparison', 'best-tools', 'alternatives'].includes(type)) return 'Tools & Comparisons';
  if (['workflow'].includes(type)) return 'AI Content Workflows';
  
  return 'Articles & Tips';
};

const normalizeArticle = (article, isMarkdown = false, isRu = false) => {
  const baseCategory = getArticleCategory(article);
  const prefix = isRu ? '/ru' : '';
  return {
    ...article,
    isMarkdown,
    categoryName: CATEGORY_NAMES[isRu ? 'ru' : 'en'][baseCategory] || baseCategory,
    href: `${prefix}/blog/${article.slug}`,
    baseCategory
  };
};

const getCategoriesConfig = (isRu) => {
  if (isRu) {
    return [
      { id: 'guides', baseCategory: 'Guides', title: 'Руководства', titleBase: 'Руководства', titleAccent: '', description: 'Пошаговые инструкции по созданию контента с ИИ.' },
      { id: 'prompts', baseCategory: 'Prompts & Libraries', title: 'Промпты и библиотеки', titleBase: 'Промпты', titleAccent: 'и библиотеки', description: 'Готовые коллекции промптов и шаблоны.' },
      { id: 'ideas', baseCategory: 'Ideas', title: 'Идеи', titleBase: 'Идеи', titleAccent: '', description: 'Темы и идеи для постов.' },
      { id: 'tools', baseCategory: 'Tools & Comparisons', title: 'Инструменты и обзоры', titleBase: 'Инструменты', titleAccent: 'и обзоры', description: 'Обзоры AI-инструментов.' },
      { id: 'workflows', baseCategory: 'AI Content Workflows', title: 'AI-контент воркфлоу', titleBase: 'AI-контент', titleAccent: 'воркфлоу', description: 'Системы создания контента.' },
      { id: 'articles', baseCategory: 'Articles & Tips', title: 'Статьи', titleBase: 'Статьи', titleAccent: '', description: 'Общие советы.' }
    ];
  }
  return [
    { id: 'guides', baseCategory: 'Guides', title: 'Guides', titleBase: 'Guides', titleAccent: '', description: 'Step-by-step workflows for creating carousels, posts, and content systems with AI.' },
    { id: 'prompts', baseCategory: 'Prompts & Libraries', title: 'Prompts & Libraries', titleBase: 'Prompts', titleAccent: '& Libraries', description: 'Copy-ready prompt collections and reusable content frameworks.' },
    { id: 'ideas', baseCategory: 'Ideas', title: 'Ideas', titleBase: 'Ideas', titleAccent: '', description: 'Topic ideas and angles for creating better social content.' },
    { id: 'tools', baseCategory: 'Tools & Comparisons', title: 'Tools & Comparisons', titleBase: 'Tools', titleAccent: '& Comparisons', description: 'Tool roundups, alternatives, and buying guides.' },
    { id: 'workflows', baseCategory: 'AI Content Workflows', title: 'AI Content Workflows', titleBase: 'AI Content', titleAccent: 'Workflows', description: 'Systems for repurposing, scaling, and improving AI-assisted content.' },
    { id: 'articles', baseCategory: 'Articles & Tips', title: 'Articles & Tips', titleBase: 'Articles', titleAccent: '& Tips', description: 'General tips and insights for social media growth.' }
  ];
};

const groupArticlesByCategory = (articles, isRu) => {
  const grouped = {};
  const config = getCategoriesConfig(isRu);
  
  config.forEach(c => { grouped[c.id] = []; });
  grouped['other'] = [];
  
  const categoryToId = {};
  config.forEach(c => { categoryToId[c.baseCategory] = c.id; });
  
  articles.forEach(article => {
    const cat = article.baseCategory;
    const targetId = categoryToId[cat] || 'other';
    grouped[targetId].push(article);
  });
  
  return grouped;
};

const getAllArticles = (isRu) => {
  const lang = isRu ? 'ru' : 'en';
  const markdownArticles = getPublicMarkdownArticlesByLanguage(lang).map(a => normalizeArticle(a, true, isRu));
  const legacyList = isRu ? LEGACY_ARTICLES_RU : LEGACY_ARTICLES;
  const legacyNormalized = legacyList.map(a => normalizeArticle(a, false, isRu));
  
  return [...markdownArticles, ...legacyNormalized].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || '2000-01-01');
    const dateB = new Date(b.updatedAt || b.createdAt || '2000-01-01');
    return dateB - dateA;
  });
};

const getFeaturedArticles = (articles, isRu) => {
  const featuredSlugs = isRu 
    ? ['idei-karuselej-linkedin', 'kak-sdelat-karusel-linkedin-s-ai']
    : ['linkedin-carousel-prompts', 'ai-instagram-carousel-generator', 'how-to-make-linkedin-carousel-with-ai'];
  
  return featuredSlugs.map(slug => articles.find(a => a.slug === slug)).filter(Boolean);
};

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

const BlogHero = ({ isRu }) => {
  return (
  <section className="pt-32 pb-10 px-6 relative z-10 w-full bg-[#050505] flex flex-col items-center justify-center border-b border-white/[0.05]">
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[500px] bg-pink-500/[0.05] blur-[100px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <div className="mt-4 mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-pink-200/80 font-medium tracking-wide uppercase">
            {isRu ? 'Контент хаб' : 'Content Hub'}
          </span>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
        {isRu ? 'Блог GoToFlow' : 'GoToFlow Blog'}
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        {isRu 
          ? 'Идеи для постов и каруселей, практические гайды, промпты и AI-воркфлоу для авторов, маркетологов и команд.'
          : 'Practical guides, prompt libraries, carousel ideas, and AI content workflows for creators, founders, marketers, and teams.'}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <button onClick={() => window.location.href = getAppUrlWithRef(CTA_URL)} className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center gap-2 group text-base border border-pink-400/20">
          {isRu ? 'Начать бесплатно' : 'Start for free'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-zinc-500 text-sm font-medium mr-2 hidden sm:inline-block pt-2">
            {isRu ? 'Популярное:' : 'Explore popular:'}
          </span>
          <Link to={isRu ? "/ru/blog/idei-karuselej-linkedin" : "/blog/linkedin-carousel-ideas"} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            {isRu ? 'Идеи для каруселей' : 'LinkedIn carousel ideas'}
          </Link>
          <Link to={isRu ? "/ru/blog/luchshie-ai-generatory-karuselej" : "/blog/best-ai-carousel-generators"} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-sm text-zinc-300 transition-all">
            {isRu ? 'AI-генераторы каруселей' : 'AI carousel generators'}
          </Link>
        </div>
      </div>
    </div>
  </section>
);
};

const ArticleCard = ({ article, featured = false, isRu }) => {
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
            {new Date(article.updatedAt).toLocaleDateString(isRu ? 'ru-RU' : 'en-US', { month: 'short', year: 'numeric' })}
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
        {isRu ? 'Читать' : 'Read guide'} <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
      </div>
    </Link>
  );
};

const FeaturedSection = ({ articles, isRu }) => {
  if (!articles.length) return null;
  return (
    <section className="pt-12 pb-16 px-6 relative z-10 w-full bg-[#050505] border-b border-white/[0.02]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-pink-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          label={isRu ? "ПОПУЛЯРНОЕ" : "ESSENTIAL READING"} 
          titleBase={isRu ? "Популярные" : "Featured"} 
          titleAccent={isRu ? "статьи" : "guides"} 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} featured={true} isRu={isRu} />
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

const CategorySection = ({ config, articles, index, isRu }) => {
  if (!articles || articles.length === 0) return null;
  
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
          <ArticleCard key={article.slug} article={article} isRu={isRu} />
        ))}
      </div>
    </div>
  );
};

const BlogContentSections = ({ config, groupedArticles, isRu }) => {
  return (
    <section className="pt-16 pb-16 px-6 relative z-10 w-full bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {config.map((catConfig, i) => (
          <CategorySection 
            key={catConfig.id} 
            config={catConfig} 
            articles={groupedArticles[catConfig.id]} 
            index={i} 
            isRu={isRu}
          />
        ))}
      </div>
    </section>
  );
};

const BottomWorkflowBlock = ({ isRu }) => {
  return (
    <section className="py-20 px-6 relative z-10 w-full bg-[#050505] flex justify-center border-t border-white/[0.05] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl w-full relative z-10">
        <SectionHeading 
          label={isRu ? "ПРОДУКТЫ" : "PRODUCT PATH"}
          titleBase={isRu ? "Создавайте" : "Build your content"}
          titleAccent={isRu ? "с помощью ИИ" : "workflow"}
          description={isRu ? "Выберите инструмент для начала работы." : "Choose a tool to start creating faster with AI."}
          centered={true}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Link to={isRu ? "/ru/ai-generator-karuselej" : "/ai-carousel-maker"} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-orange-400 transition-colors">
              {isRu ? 'Генератор каруселей' : 'Create AI carousels'}
            </h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{isRu ? 'Инструмент' : 'Carousel Maker'}</span>
          </Link>
          <Link to={isRu ? "/ru/generator-karuselej-linkedin" : "/linkedin-carousel-maker"} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
              {isRu ? 'Карусели для LinkedIn' : 'Generate LinkedIn carousels'}
            </h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{isRu ? 'LinkedIn Tool' : 'LinkedIn Tool'}</span>
          </Link>
          <Link to={isRu ? "/ru/generator-postov-instagram" : "/ai-instagram-post-generator"} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-pink-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-pink-400 transition-colors">
              {isRu ? 'Генератор постов' : 'Write Instagram posts'}
            </h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{isRu ? 'Post Generator' : 'Post Generator'}</span>
          </Link>
          <Link to={isRu ? "/ru/generator-kontenta" : "/ai-content-generator"} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center">
            <h3 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              {isRu ? 'Генератор контента' : 'AI content generation'}
            </h3>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{isRu ? 'AI Writer' : 'AI Writer'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const BlogHubLayout = ({ isRu }) => {
  const allArticles = getAllArticles(isRu);
  const featuredArticles = getFeaturedArticles(allArticles, isRu);
  const groupedArticles = groupArticlesByCategory(allArticles, isRu);
  
  let config = getCategoriesConfig(isRu);
  
  // Guardrail: Ensure published articles with unknown categories are rendered
  if (groupedArticles['other'] && groupedArticles['other'].length > 0) {
    config.push({
      id: 'other',
      baseCategory: 'Other',
      title: isRu ? 'Другое' : 'Other',
      titleBase: isRu ? 'Другое' : 'Other',
      titleAccent: '',
      description: ''
    });
  }
  
  const activeCategories = config.filter(cat => groupedArticles[cat.id]?.length > 0);

  return (
    <MainLayout>
      <BlogSEOHead isRu={isRu} />
      <Header />
      <BlogHero isRu={isRu} />
      <FeaturedSection articles={featuredArticles} isRu={isRu} />
      {activeCategories.length > 0 && <CategoryNavigation categories={activeCategories} />}
      <BlogContentSections config={activeCategories} groupedArticles={groupedArticles} isRu={isRu} />
      <BottomWorkflowBlock isRu={isRu} />
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
