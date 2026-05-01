export const getOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": "https://gotoflow.io/#organization",
  "name": "GoToFlow",
  "url": "https://gotoflow.io/",
  "logo": "https://gotoflow.io/favicon-96x96.png",
  "sameAs": []
});

export const getWebSiteSchema = (lang = 'en') => ({
  "@type": "WebSite",
  "@id": "https://gotoflow.io/#website",
  "url": "https://gotoflow.io/",
  "name": "GoToFlow",
  "publisher": { "@id": "https://gotoflow.io/#organization" },
  "inLanguage": lang
});

export const getWebPageSchema = (path, name, desc, lang = 'en') => ({
  "@type": "WebPage",
  "@id": `https://gotoflow.io${path}#webpage`,
  "url": `https://gotoflow.io${path}`,
  "name": name,
  "description": desc,
  "inLanguage": lang,
  "isPartOf": { "@id": "https://gotoflow.io/#website" }
});

export const getSoftwareSchema = (path, name, desc, lang = 'en') => ({
  "@type": "SoftwareApplication",
  "@id": `https://gotoflow.io${path}#software`,
  "name": "GoToFlow",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": `https://gotoflow.io${path}`,
  "image": "https://gotoflow.io/favicon-96x96.png",
  "description": desc,
  "brand": { "@id": "https://gotoflow.io/#organization" }
});

export const getArticleSchema = (path, title, desc, lang = 'en') => ({
  "@type": "Article",
  "@id": `https://gotoflow.io${path}#article`,
  "headline": title,
  "description": desc,
  "inLanguage": lang,
  "mainEntityOfPage": `https://gotoflow.io${path}`,
  "author": { "@type": "Organization", "@id": "https://gotoflow.io/#organization", "name": "GoToFlow", "url": "https://gotoflow.io/" },
  "publisher": { "@id": "https://gotoflow.io/#organization" }
});

export const getBreadcrumbSchema = (crumbs, path) => ({
  "@type": "BreadcrumbList",
  "@id": `https://gotoflow.io${path}#breadcrumb`,
  "itemListElement": crumbs.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": c.name,
    "item": `https://gotoflow.io${c.path}`
  }))
});

export const getFAQPageSchema = (faqItems, path) => ({
  "@type": "FAQPage",
  "@id": `https://gotoflow.io${path}#faq`,
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }))
});

export const buildSchema = (items) => ({
  "@context": "https://schema.org",
  "@graph": items
});
