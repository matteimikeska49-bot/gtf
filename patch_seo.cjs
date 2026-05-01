const fs = require('fs');
const path = require('path');

const seoData = {
  '/ai-carousel-maker': {
    title: 'AI Carousel Maker — Create Carousels with AI | GoToFlow',
    desc: 'Create a ready-to-publish Instagram or LinkedIn carousel in 60 seconds with AI. From idea to final slides — no design skills, no team, no templates.',
    url: 'https://gotoflow.io/ai-carousel-maker',
    en: 'https://gotoflow.io/ai-carousel-maker',
    ru: 'https://gotoflow.io/ru/ai-generator-karuselej',
    file: 'src/components/carousel/CarouselSections.jsx'
  },
  '/ru/ai-generator-karuselej': {
    title: 'AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow',
    desc: 'Создавайте карусели для Instagram, LinkedIn и других соцсетей с помощью AI: идеи, структура слайдов, текст и CTA.',
    url: 'https://gotoflow.io/ru/ai-generator-karuselej',
    en: 'https://gotoflow.io/ai-carousel-maker',
    ru: 'https://gotoflow.io/ru/ai-generator-karuselej',
    file: 'src/components/carousel/CarouselSectionsRu.jsx'
  },
  '/ai-content-generator': {
    title: 'AI Content Generator for Social Media | GoToFlow',
    desc: 'Generate posts, captions, and content ideas with AI in seconds.',
    url: 'https://gotoflow.io/ai-content-generator',
    en: 'https://gotoflow.io/ai-content-generator',
    ru: 'https://gotoflow.io/ru/generator-kontenta',
    file: 'src/components/AIContentPage.jsx'
  },
  '/ru/generator-kontenta': {
    title: 'AI-генератор контента для соцсетей — посты, карусели и Reels | GoToFlow',
    desc: 'Создавайте посты, карусели, сценарии Reels и идеи для соцсетей с помощью AI. GoToFlow помогает быстро делать контент под ваш стиль.',
    url: 'https://gotoflow.io/ru/generator-kontenta',
    en: 'https://gotoflow.io/ai-content-generator',
    ru: 'https://gotoflow.io/ru/generator-kontenta',
    file: 'src/components/AIContentPageRu.jsx'
  },
  '/ai-instagram-post-generator': {
    title: 'AI Instagram Post Generator | GoToFlow',
    desc: 'Generate Instagram posts, captions, and ideas instantly with AI.',
    url: 'https://gotoflow.io/ai-instagram-post-generator',
    en: 'https://gotoflow.io/ai-instagram-post-generator',
    ru: 'https://gotoflow.io/ru/generator-postov-instagram',
    file: 'src/components/InstagramPostPage.jsx'
  },
  '/ru/generator-postov-instagram': {
    title: 'Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow',
    desc: 'Создавайте посты, подписи, идеи и карусели для Instagram с помощью AI. Быстрая генерация контента для брендов, экспертов и бизнеса.',
    url: 'https://gotoflow.io/ru/generator-postov-instagram',
    en: 'https://gotoflow.io/ai-instagram-post-generator',
    ru: 'https://gotoflow.io/ru/generator-postov-instagram',
    file: 'src/components/InstagramPostPageRu.jsx'
  },
  '/linkedin-carousel-maker': {
    title: 'LinkedIn Carousel Maker | Create LinkedIn Carousels with AI',
    desc: 'Create LinkedIn carousels with AI in seconds. Turn ideas into ready-to-publish slides for thought leadership and content marketing.',
    url: 'https://gotoflow.io/linkedin-carousel-maker',
    en: 'https://gotoflow.io/linkedin-carousel-maker',
    ru: 'https://gotoflow.io/ru/generator-karuselej-linkedin',
    file: 'src/components/LinkedInCarouselPage.jsx'
  },
  '/ru/generator-karuselej-linkedin': {
    title: 'Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow',
    desc: 'Создавайте карусели для LinkedIn с помощью AI: темы, структура слайдов, хуки, тексты и CTA для экспертного контента.',
    url: 'https://gotoflow.io/ru/generator-karuselej-linkedin',
    en: 'https://gotoflow.io/linkedin-carousel-maker',
    ru: 'https://gotoflow.io/ru/generator-karuselej-linkedin',
    file: 'src/components/LinkedInCarouselPageRu.jsx'
  },
  '/blog': {
    title: 'Content Ideas, Hooks and Examples for Social Media | GoToFlow',
    desc: 'Ready-to-use ideas, captions and templates you can turn into posts or carousels in seconds.',
    url: 'https://gotoflow.io/blog',
    en: 'https://gotoflow.io/blog',
    ru: 'https://gotoflow.io/ru/blog',
    file: 'src/components/BlogPage.jsx'
  },
  '/ru/blog': {
    title: 'Блог GoToFlow — AI, контент и карусели для соцсетей',
    desc: 'Практические статьи о создании контента, каруселей, постов и контент-стратегии с помощью AI.',
    url: 'https://gotoflow.io/ru/blog',
    en: 'https://gotoflow.io/blog',
    ru: 'https://gotoflow.io/ru/blog',
    file: 'src/components/BlogPageRu.jsx'
  },
  '/blog/linkedin-carousel-ideas': {
    title: '50 LinkedIn Carousel Ideas That Actually Get Engagement | GoToFlow',
    desc: 'Explore 50 LinkedIn carousel ideas with examples, hooks, and structures. Learn how to create high-performing carousels faster using AI.',
    url: 'https://gotoflow.io/blog/linkedin-carousel-ideas',
    en: 'https://gotoflow.io/blog/linkedin-carousel-ideas',
    ru: 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin',
    file: 'src/components/blog/LinkedInCarouselIdeasPage.jsx'
  },
  '/ru/blog/idei-karuselej-linkedin': {
    title: '50 идей каруселей для LinkedIn, которые реально дают охваты и заявки | GoToFlow',
    desc: '50 идей каруселей для LinkedIn: примеры, структура, ошибки и как создавать посты, которые получают охваты и заявки.',
    url: 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin',
    en: 'https://gotoflow.io/blog/linkedin-carousel-ideas',
    ru: 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin',
    file: 'src/components/blog/LinkedInCarouselIdeasPageRu.jsx'
  }
};

const processedFiles = new Set();

for (const [route, data] of Object.entries(seoData)) {
  const filePath = path.join(__dirname, data.file);
  if (processedFiles.has(filePath)) continue;
  processedFiles.add(filePath);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const useEffMatch = content.match(/(?:export\s+)?const\s+\w*SEOHead\w*\s*=\s*\(\)\s*=>\s*\{\s*(?:const\s+desc\s*=\s*['"][^'"]+['"];\s*)?useEffect\(\(\) => \{([\s\S]*?)return \(\) => \{/);
  
  if (useEffMatch) {
    const isRu = route.includes('/ru');
    const newBody = `
    document.title = '${data.title}';
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? \`meta[property="\${name}"]\` : \`meta[name="\${name}"]\`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href, extra = {}) => {
      const sel = extra.hreflang ? \`link[rel="\${rel}"][hreflang="\${extra.hreflang}"]\` : \`link[rel="\${rel}"]\`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel); el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };
    
    setMeta('title', '${data.title}');
    setMeta('description', '${data.desc}');
    setMeta('og:title', '${data.title}', true);
    setMeta('og:description', '${data.desc}', true);
    setMeta('og:url', '${data.url}', true);
    setMeta('twitter:title', '${data.title}', true);
    setMeta('twitter:description', '${data.desc}', true);
    setMeta('twitter:url', '${data.url}', true);
    
    setLink('canonical', '${data.url}');
    setLink('alternate', '${data.en}', { hreflang: 'en' });
    setLink('alternate', '${data.ru}', { hreflang: 'ru' });
    setLink('alternate', '${data.en}', { hreflang: 'x-default' });
    document.documentElement.lang = '${isRu ? 'ru' : 'en'}';
    `;
    
    content = content.replace(useEffMatch[1], newBody);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated', filePath);
  } else {
    console.log('No match found for', filePath);
  }
}
