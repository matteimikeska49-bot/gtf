import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { useIsMobile } from '../../hooks/useIsMobile';

/* ── Breadcrumbs ── */
export const ArticleBreadcrumbs = ({ label }) => (
  <nav className="pt-28 pb-4 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-[920px] mx-auto flex items-center gap-1.5 text-sm text-zinc-500">
      <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link to="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-400 truncate">{label}</span>
    </div>
  </nav>
);

/* ── Hero ── */
export const ArticleHero = ({ badge, title, subtitle, ctaUrl, ctaText }) => {
  const isMobile = useIsMobile();
  return (
    <section className="pb-16 md:pb-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[60px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">{badge}</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          {subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={ctaUrl} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            {ctaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Article Content Wrapper ── */
export const ArticleContentWrapper = ({ children }) => (
  <article className="pt-4 pb-8 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    
    <div className="max-w-[920px] mx-auto relative z-10">
      {/* Article card panel */}
      <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
        {children}
      </div>
    </div>
  </article>
);

/* ── Typography primitives ── */
export const ArticleP = ({ children, className = '' }) => (
  <p className={`text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-6 ${className}`}>
    {children}
  </p>
);

export const ArticleH2 = ({ children, className = '' }) => (
  <h2 className={`text-[22px] md:text-[28px] font-bold text-white tracking-tight leading-[1.25] mb-5 mt-14 md:mt-16 first:mt-0 pt-6 md:pt-8 border-t border-white/[0.06] first:border-t-0 first:pt-0 ${className}`}>
    {children}
  </h2>
);

export const ArticleH3 = ({ children, className = '' }) => (
  <h3 className={`text-lg md:text-xl font-semibold text-zinc-100 tracking-tight leading-snug mb-4 mt-10 ${className}`}>
    {children}
  </h3>
);

export const ArticleHr = () => (
  <div className="my-12 md:my-14 flex items-center gap-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    <div className="w-1 h-1 rounded-full bg-pink-500/40" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </div>
);

/* ── Lists ── */
export const ArticleUl = ({ children, className = '' }) => (
  <ul className={`space-y-3 mb-6 ${className}`}>
    {children}
  </ul>
);

export const ArticleLi = ({ children }) => (
  <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.75]">
    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-pink-400/70 shrink-0" />
    <span>{children}</span>
  </li>
);

export const ArticleOl = ({ children, className = '' }) => (
  <div className={`space-y-3 mb-6 ${className}`}>
    {children}
  </div>
);

export const ArticleOlItem = ({ num, children }) => (
  <div className="flex items-start gap-3.5">
    <span className="shrink-0 w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 mt-0.5 tabular-nums">
      {num}
    </span>
    <span className="text-zinc-300 text-[15px] md:text-base leading-[1.75]">{children}</span>
  </div>
);

/* ── Blockquote ── */
export const ArticleBlockquote = ({ children }) => (
  <blockquote className="border-l-[3px] border-pink-500/60 pl-5 pr-5 py-4 my-8 bg-white/[0.025] rounded-r-xl text-zinc-400 italic text-[15px] md:text-base leading-[1.75]">
    {children}
  </blockquote>
);

/* ── Inline CTA card ── */
export const InlineProductBlock = ({ text, to }) => (
  <div className="relative my-12 md:my-14 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.03] via-transparent to-orange-500/[0.02] blur-xl" />
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug">{text}</p>
    </div>
    <Link to={to} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.2)] border border-pink-400/20 group whitespace-nowrap">
      Try it free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

/* ── CTA callout card ── */
export const ArticleCtaCard = ({ text, to, buttonText }) => (
  <div className="relative my-12 md:my-14 p-6 md:p-8 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/[0.06] via-white/[0.02] to-orange-500/[0.04]">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.04] via-transparent to-orange-500/[0.03] blur-xl" />
    <p className="text-zinc-200 font-medium text-sm md:text-base leading-[1.7] mb-5">{text}</p>
    <Link to={to} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-sm hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.25)] border border-pink-400/20 group">
      {buttonText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

/* ── Comparison Table ── */
export const ArticleComparisonTable = ({ headers, rows }) => (
  <div className="my-10 md:my-12">
    {/* Desktop: scrollable table */}
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.015]">
      <table className="w-full min-w-[800px] text-left border-collapse text-zinc-300 text-sm">
        <thead>
          <tr className="bg-white/[0.06]">
            {headers.map((h, i) => (
              <th key={i} className="p-4 lg:p-5 border-b border-white/10 font-bold text-white text-sm whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-white/[0.05] transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''} hover:bg-white/[0.03]`}>
              {row.map((cell, j) => (
                <td key={j} className={`p-4 lg:p-5 text-sm leading-relaxed ${j === 0 ? 'font-medium text-white' : 'text-zinc-300'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {/* Mobile: stacked cards */}
    <div className="md:hidden space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2.5">
          <div className="text-white font-semibold text-sm">{row[0]}</div>
          {headers.slice(1).map((h, j) => (
            <div key={j} className="flex flex-col gap-0.5">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{h}</span>
              <span className="text-zinc-300 text-[13px] leading-relaxed">{row[j + 1]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ── FAQ ── */
export const ArticleFAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden" transition={{ duration: 0.35 }}>
      <p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-300 leading-[1.75] text-sm md:text-base">{item.a}</p>
    </motion.div>
  </div>
);

export const ArticleFAQSection = ({ title, subtitle, items }) => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
          <h2 className="text-[22px] md:text-[28px] font-bold text-white tracking-tight mb-2">{title}</h2>
          {subtitle && <p className="text-zinc-400 text-sm md:text-base mb-8">{subtitle}</p>}
          <div className="space-y-3">
            {items.map((item, i) => <ArticleFAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Final CTA ── */
export const ArticleBottomCTA = ({ title, subtitle, ctaUrl, ctaText }) => {
  const isMobile = useIsMobile();
  return (
    <section className="py-14 md:py-24 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: isMobile ? 0.6 : 0.8 }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
            {title}
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-[1.7] mb-8 max-w-lg mx-auto">
            {subtitle}
          </p>
          <a href={ctaUrl} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
            {ctaText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-zinc-500 mt-4">Free — No credit card required</p>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Back to Blog ── */
export const BackToBlog = ({ text = 'Explore more tools and ideas' }) => (
  <section className="pb-16 px-4 sm:px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <Link to="/blog" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors text-sm font-medium">
      {text} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </section>
);

/* ── Full page wrapper ── */
export const BlogArticlePage = ({ seoHead, breadcrumbLabel, hero, children, faq, cta, backText }) => (
  <MainLayout>
    {seoHead}
    <Header />
    <ArticleBreadcrumbs label={breadcrumbLabel} />
    {hero}
    {children}
    {faq}
    {cta}
    <BackToBlog text={backText} />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
