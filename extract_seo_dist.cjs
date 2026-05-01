const fs = require('fs');
const path = require('path');

const ROUTES = [
  '/',
  '/ru',
  '/ai-carousel-maker',
  '/ru/ai-generator-karuselej',
  '/ai-content-generator',
  '/ru/generator-kontenta',
  '/ai-instagram-post-generator',
  '/ru/generator-postov-instagram',
  '/linkedin-carousel-maker',
  '/ru/generator-karuselej-linkedin',
  '/blog',
  '/ru/blog',
  '/blog/linkedin-carousel-ideas',
  '/ru/blog/idei-karuselej-linkedin',
];

const results = [];

for (const route of ROUTES) {
  const parts = route === '/' ? [] : route.replace(/^\//, '').split('/');
  const filePath = path.join(__dirname, 'dist', ...parts, 'index.html');
  
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    const title = titleMatch ? titleMatch[1] : null;
    
    const descMatches = [...html.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const desc = descMatches.map(m => m[1]);
    
    const canMatches = [...html.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/gi)];
    const canonical = canMatches.map(m => m[1]);
    
    const hrefEnMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']en["'][^>]*href=["']([^"']*)["'][^>]*>/gi)];
    const hrefEn = hrefEnMatches.map(m => m[1]);
    
    const hrefRuMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']ru["'][^>]*href=["']([^"']*)["'][^>]*>/gi)];
    const hrefRu = hrefRuMatches.map(m => m[1]);
    
    const hrefXMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']x-default["'][^>]*href=["']([^"']*)["'][^>]*>/gi)];
    const hrefX = hrefXMatches.map(m => m[1]);
    
    const ogUrlMatches = [...html.matchAll(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const ogUrl = ogUrlMatches.map(m => m[1]);
    
    const ogTitleMatches = [...html.matchAll(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const ogTitle = ogTitleMatches.map(m => m[1]);
    
    const ogDescMatches = [...html.matchAll(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const ogDesc = ogDescMatches.map(m => m[1]);
    
    const twTitleMatches = [...html.matchAll(/<meta[^>]*property=["']twitter:title["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const twTitle = twTitleMatches.map(m => m[1]);
    
    const twDescMatches = [...html.matchAll(/<meta[^>]*property=["']twitter:description["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
    const twDesc = twDescMatches.map(m => m[1]);
    
    const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["'][^>]*>/i);
    const lang = langMatch ? langMatch[1] : null;
    
    const hasDuplicates = (
      desc.length > 1 || canonical.length > 1 || hrefEn.length > 1 || hrefRu.length > 1 || hrefX.length > 1 || 
      ogTitle.length > 1 || ogUrl.length > 1 || ogDesc.length > 1 || twTitle.length > 1 || twDesc.length > 1
    );
    
    results.push({
      route,
      hasDuplicates,
      lang,
      title,
      description: desc.length > 0 ? desc[0] : null,
      canonical: canonical.length > 0 ? canonical[0] : null,
      ogTitle: ogTitle.length > 0 ? ogTitle[0] : null,
      ogDescription: ogDesc.length > 0 ? ogDesc[0] : null,
      ogUrl: ogUrl.length > 0 ? ogUrl[0] : null,
      twitterTitle: twTitle.length > 0 ? twTitle[0] : null,
      twitterDescription: twDesc.length > 0 ? twDesc[0] : null,
      hrefEn: hrefEn.length > 0 ? hrefEn[0] : null,
      hrefRu: hrefRu.length > 0 ? hrefRu[0] : null,
      hrefX: hrefX.length > 0 ? hrefX[0] : null,
    });
  } catch (err) {
    results.push({ route, error: err.message });
  }
}

console.log(JSON.stringify(results, null, 2));
