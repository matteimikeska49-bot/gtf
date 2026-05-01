import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebPageSchema,
  getSoftwareSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  buildSchema
} from '../utils/schemaGenerator';

const ROUTES_CONFIG = {
  '/': {
    title: 'AI Content Generator for Social Media — Create Posts, Carousels & Reels Fast | GoToFlow',
    desc: 'Create high-converting social media content with AI. Generate carousels, posts, reels scripts and content plans in seconds with GoToFlow.',
    lang: 'en',
    type: 'software',
    crumbs: [{ name: 'Home', path: '/' }]
  },
  '/ru': {
    title: 'GoToFlow — AI-генератор контента для соцсетей',
    desc: 'Создавайте контент для соцсетей с помощью ИИ. Генерация постов, каруселей и сценариев за секунды.',
    lang: 'ru',
    type: 'software',
    crumbs: [{ name: 'Главная', path: '/ru' }]
  },
  '/ai-carousel-maker': {
    title: 'AI Carousel Maker — Create Carousels with AI | GoToFlow',
    desc: 'Create professional LinkedIn and Instagram carousels in seconds with AI.',
    lang: 'en',
    type: 'software',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'AI Carousel Maker', path: '/ai-carousel-maker' }]
  },
  '/ru/ai-generator-karuselej': {
    title: 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow',
    desc: 'Создавайте профессиональные карусели для LinkedIn и Instagram с помощью ИИ за секунды.',
    lang: 'ru',
    type: 'software',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Генератор каруселей', path: '/ru/ai-generator-karuselej' }]
  },
  '/ai-content-generator': {
    title: 'AI Content Generator for Social Media | GoToFlow',
    desc: 'Generate high-quality social media posts, carousels, and scripts with AI.',
    lang: 'en',
    type: 'software',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'AI Content Generator', path: '/ai-content-generator' }]
  },
  '/ru/generator-kontenta': {
    title: 'AI-генератор контента для соцсетей — посты, карусели и Reels | GoToFlow',
    desc: 'Генерируйте качественные посты, карусели и сценарии для соцсетей с помощью ИИ.',
    lang: 'ru',
    type: 'software',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Генератор контента', path: '/ru/generator-kontenta' }]
  },
  '/ai-instagram-post-generator': {
    title: 'AI Instagram Post Generator | GoToFlow',
    desc: 'Generate Instagram posts, captions, and carousels with AI.',
    lang: 'en',
    type: 'software',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Instagram Post Generator', path: '/ai-instagram-post-generator' }]
  },
  '/ru/generator-postov-instagram': {
    title: 'Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow',
    desc: 'Генерируйте посты, подписи и карусели для Instagram с помощью ИИ.',
    lang: 'ru',
    type: 'software',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Генератор постов Instagram', path: '/ru/generator-postov-instagram' }]
  },
  '/linkedin-carousel-maker': {
    title: 'LinkedIn Carousel Maker | Create LinkedIn Carousels with AI',
    desc: 'Create engaging LinkedIn carousels instantly with AI. Boost your reach and engagement.',
    lang: 'en',
    type: 'software',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'LinkedIn Carousel Maker', path: '/linkedin-carousel-maker' }]
  },
  '/ru/generator-karuselej-linkedin': {
    title: 'Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow',
    desc: 'Создавайте вовлекающие карусели для LinkedIn с ИИ. Увеличьте охваты и вовлеченность.',
    lang: 'ru',
    type: 'software',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Генератор каруселей LinkedIn', path: '/ru/generator-karuselej-linkedin' }]
  },
  '/blog': {
    title: 'Content Ideas, Hooks and Examples for Social Media | GoToFlow',
    desc: 'Discover content ideas, hooks, and examples for your social media strategy.',
    lang: 'en',
    type: 'blog',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]
  },
  '/ru/blog': {
    title: 'Блог GoToFlow — AI, контент и карусели для соцсетей',
    desc: 'Идеи, хуки и примеры контента для стратегии в соцсетях.',
    lang: 'ru',
    type: 'blog',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Блог', path: '/ru/blog' }]
  },
  '/blog/linkedin-carousel-ideas': {
    title: '50 LinkedIn Carousel Ideas That Actually Get Engagement | GoToFlow',
    desc: 'Explore 50 LinkedIn carousel ideas with examples, hooks, and structures. Learn how to create high-performing carousels faster using AI.',
    lang: 'en',
    type: 'article',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'LinkedIn Carousel Ideas', path: '/blog/linkedin-carousel-ideas' }]
  },
  '/ru/blog/idei-karuselej-linkedin': {
    title: '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки | GoToFlow',
    desc: '50 идей для каруселей в LinkedIn с примерами и структурой. Узнайте, как быстро создавать вовлекающие карусели с помощью ИИ.',
    lang: 'ru',
    type: 'article',
    crumbs: [{ name: 'Главная', path: '/ru' }, { name: 'Блог', path: '/ru/blog' }, { name: 'Идеи каруселей LinkedIn', path: '/ru/blog/idei-karuselej-linkedin' }]
  }
};

export const RouteSchemaInjector = () => {
  const location = useLocation();
  const path = location.pathname;
  
  useEffect(() => {
    const config = ROUTES_CONFIG[path];
    if (!config) return;

    const items = [
      getOrganizationSchema(),
      getWebSiteSchema(config.lang)
    ];

    if (config.type === 'software') {
      items.push(getWebPageSchema(path, config.title, config.desc, config.lang));
      items.push(getSoftwareSchema(path, config.title, config.desc, config.lang));
    } else if (config.type === 'article') {
      items.push(getArticleSchema(path, config.title, config.desc, config.lang));
    } else if (config.type === 'blog') {
      items.push(getWebPageSchema(path, config.title, config.desc, config.lang));
    }

    if (config.crumbs && config.crumbs.length > 0) {
      items.push(getBreadcrumbSchema(config.crumbs, path));
    }

    const schema = buildSchema(items);
    
    // We create a script tag to inject the schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-ld-json';
    script.text = JSON.stringify(schema);
    
    // Remove any existing dynamic schema
    const existing = document.getElementById('dynamic-ld-json');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [path]);

  return null;
};
