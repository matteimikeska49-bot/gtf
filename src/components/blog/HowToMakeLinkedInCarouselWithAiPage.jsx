import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { getAppUrlWithRef } from '../../utils/url';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { useIsMobile } from '../../hooks/useIsMobile';

const CTA_URL = 'https://app.gotoflow.io';

const faqItems = [
  { q: 'Can AI create LinkedIn carousels?', a: 'Yes. AI can help create the hook, slide structure, copy, caption, CTA, and visual direction for a LinkedIn carousel. You should still review and edit the final version before publishing.' },
  { q: 'What is the best way to structure a LinkedIn carousel?', a: 'A strong structure usually includes a hook, context, several value slides, a summary, and a CTA. Each slide should have one clear job.' },
  { q: 'Can I create a LinkedIn carousel from a video or link?', a: 'Yes. With the right workflow, you can use a video, article, or competitor example as input, then turn it into a new carousel structure with your own angle.' },
  { q: 'How many slides should a LinkedIn carousel have?', a: 'Most LinkedIn carousels work well with 7–10 slides. Shorter carousels can work if the idea is simple. Longer carousels need stronger pacing.' },
  { q: 'What format should I use for a LinkedIn carousel?', a: 'PDF is usually the simplest format for a LinkedIn carousel because it keeps the slide layout consistent. Create one page per slide and check the file before uploading.' },
  { q: 'What is the best AI tool for LinkedIn carousels?', a: 'It depends on your workflow. GoToFlow is useful for turning a topic, link, video, or competitor example into a structured carousel draft with copy and visual style. ChatGPT or Claude can help with ideas and text, while Canva or Figma can help with manual design.' },
  { q: 'Should I publish AI-generated carousels without editing?', a: 'No. AI-generated drafts should be reviewed for accuracy, tone, readability, and originality. Add your examples and point of view before publishing.' }
];

/* ── SEO Head ── */
const ArticleSEOHead = () => {
  useEffect(() => {
    document.title = 'How to Make a LinkedIn Carousel with AI: Step-by-Step Guide';
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
    
    setMeta('title', 'How to Make a LinkedIn Carousel with AI: Step-by-Step Guide');
    setMeta('description', 'Learn how to make a LinkedIn carousel with AI using hooks, slide structure, prompts, visual style, examples, and a step-by-step carousel workflow.');
    setMeta('og:title', 'How to Make a LinkedIn Carousel with AI: Step-by-Step Guide', true);
    setMeta('og:description', 'Learn how to make a LinkedIn carousel with AI using hooks, slide structure, prompts, visual style, examples, and a step-by-step carousel workflow.', true);
    setMeta('og:url', 'https://gotoflow.io/blog/how-to-make-linkedin-carousel-with-ai', true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', 'How to Make a LinkedIn Carousel with AI: Step-by-Step Guide', true);
    setMeta('twitter:description', 'Learn how to make a LinkedIn carousel with AI using hooks, slide structure, prompts, visual style, examples, and a step-by-step carousel workflow.', true);
    setMeta('twitter:url', 'https://gotoflow.io/blog/how-to-make-linkedin-carousel-with-ai', true);
    
    setLink('canonical', 'https://gotoflow.io/blog/how-to-make-linkedin-carousel-with-ai');
    document.documentElement.lang = 'en';

    return () => {
      document.title = 'GoToFlow';
    };
  }, []);
  return null;
};

/* ── Breadcrumbs ── */
const Breadcrumbs = () => (
  <nav className="pt-28 pb-4 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-[920px] mx-auto flex items-center gap-1.5 text-sm text-zinc-500">
      <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link to="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-400 truncate">How to Make a LinkedIn Carousel with AI</span>
    </div>
  </nav>
);

/* ── Hero ── */
const ArticleHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pb-16 md:pb-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[60px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">Guide</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          How to Make a LinkedIn Carousel with AI
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          Learn how to make a LinkedIn carousel with AI using hooks, slide structure, prompts, visual style, examples, and a step-by-step carousel workflow.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            Try Carousel Generator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Inline Product Block ── */
const InlineProductBlock = ({ text, to }) => (
  <div className="relative my-12 md:my-16 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500/[0.03] via-transparent to-orange-500/[0.02] blur-xl" />
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug">{text}</p>
    </div>
    <a href={getAppUrlWithRef('https://app.gotoflow.io')} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(236,72,153,0.2)] border border-pink-400/20 group whitespace-nowrap">
      Try it free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </a>
  </div>
);

const ArticleBody = () => (
  <article className="pt-4 pb-8 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="max-w-[920px] mx-auto relative z-10">
      <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
        
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          You’ve seen them in your feed: swipeable LinkedIn posts that explain one idea clearly, keep people reading, and get saved because they feel useful.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          That format is often called a LinkedIn carousel. Technically, LinkedIn treats it as a document post: you upload a PDF or document, and each page becomes a swipeable slide.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          The problem is that creating a good carousel usually takes longer than expected.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          You need an idea, a hook, slide structure, short copy, visual style, a caption, and a CTA. If you start from a blank page, the process can easily turn into two hours of rewriting, resizing text, and moving boxes around.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5 font-semibold text-white">
          AI can make that workflow faster.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Not by replacing your thinking, but by helping you turn a rough idea, link, video, article, or competitor example into a structured carousel draft you can edit and publish.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          In this guide, you’ll learn how to make a LinkedIn carousel with AI step by step: from the first idea to the final carousel structure, prompts, visual style, and publishing checklist.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">What is a LinkedIn carousel?</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          A LinkedIn carousel is a swipeable document post. You create several slides, export them as a PDF or supported document file, and upload that file to LinkedIn.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          LinkedIn then displays the document as a carousel that people can swipe through.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Carousels work well because they are easy to consume. Instead of forcing people to read a long text post, you break one idea into a sequence.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          LinkedIn carousels are useful for:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>step-by-step guides;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>frameworks;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>mistakes and fixes;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>checklists;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>before-and-after breakdowns;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>expert opinions;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>mini case studies;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>educational posts;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>product explainers;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>content repurposing.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          A strong carousel is not just a blog post split into slides. It needs pacing. Each slide should make the next one feel natural.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">How to post a carousel on LinkedIn</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          To publish a carousel on LinkedIn, you usually create a document post.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          The basic workflow looks like this:
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">1</span><span>Create your carousel slides.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">2</span><span>Export the slides as a PDF or supported document file.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">3</span><span>Open LinkedIn and start a new post.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">4</span><span>Upload the document.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">5</span><span>Add a caption.</span></div>
          <div className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300"><span className="shrink-0 w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-medium text-zinc-400 mt-0.5">6</span><span>Publish the post.</span></div>
        </div>

        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          For most creators, PDF is the simplest format because it keeps the slide design consistent.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          A few practical tips:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>use one page per slide;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>keep text readable on mobile;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>avoid tiny font sizes;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>make the first slide strong enough to earn the swipe;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>check the PDF before uploading;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>remember that if the document itself has a mistake, you usually need to fix the file and upload it again.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          This is why it helps to build the carousel structure before designing. If the logic is weak, the PDF will not save it.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Where AI helps in carousel creation</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI can help with almost every part of the LinkedIn carousel workflow.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          The biggest value is not just “write text for slides.” The real value is turning messy input into a clear content structure.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          AI can help you:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>find a stronger angle;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>write several hook options;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>turn notes into slide structure;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>shorten long paragraphs into slide copy;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>create a stronger CTA;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>generate visual direction;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>adapt one idea for LinkedIn;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>turn a link, video, article, or competitor example into a new carousel concept.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          For example, you may find a competitor video that explains a topic well. Instead of manually watching it, taking notes, creating a structure, and writing every slide from zero, you can use AI to analyze the input and generate a new carousel draft.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          That does not mean copying the competitor. It means using the source as inspiration, then creating your own angle, structure, and message.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI chat vs AI LinkedIn carousel generator</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          You can use a general AI chat to create a LinkedIn carousel. Tools like ChatGPT or Claude can help with ideas, hooks, outlines, and slide copy.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          But a general AI chat usually stops at text. That means you still need to:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>create the slide format;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>move the copy into a design tool;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>choose visual style;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>resize text;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>build the slides;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>export the PDF;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>check readability.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          A dedicated AI LinkedIn carousel generator or AI carousel maker is more useful when you want a full workflow.
        </p>
        
        {/* Comparison Table */}
        <div className="w-full overflow-x-auto pb-4 mb-8">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-3 border-b border-white/10 pb-4 mb-4 font-semibold text-white">
              <div className="px-4">Workflow</div>
              <div className="px-4">What it helps with</div>
              <div className="px-4">Limitation</div>
            </div>
            <div className="grid grid-cols-3 border-b border-white/[0.05] pb-4 mb-4 text-zinc-300 text-sm md:text-base">
              <div className="px-4">General AI chat</div>
              <div className="px-4">Ideas, outlines, hooks, slide copy</div>
              <div className="px-4 text-zinc-400">No native visual carousel workflow</div>
            </div>
            <div className="grid grid-cols-3 border-b border-white/[0.05] pb-4 mb-4 text-zinc-300 text-sm md:text-base">
              <div className="px-4">Design tool</div>
              <div className="px-4">Layout, templates, manual visual editing</div>
              <div className="px-4 text-zinc-400">Structure and copy often need to be prepared first</div>
            </div>
            <div className="grid grid-cols-3 pb-2 text-zinc-300 text-sm md:text-base">
              <div className="px-4 font-medium text-pink-300">AI carousel workflow</div>
              <div className="px-4">Input, hook, structure, copy, visual style, carousel draft</div>
              <div className="px-4 text-zinc-400">Still needs final human review</div>
            </div>
          </div>
        </div>

        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          If you only need text, a chat assistant may be enough. If you want to move from an idea, link, or video to a structured visual draft, a carousel-focused tool is faster.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8 pt-2 border-l-[3px] border-pink-500/60 pl-4">How to make a LinkedIn carousel with AI: step by step</h2>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">1. Choose one clear topic</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Do not start with a broad topic like:
        </p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Marketing tips</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          That is too general. A better topic would be:
        </p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">5 mistakes that make your AI content sound generic</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">or:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 mb-4 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">How to turn one client call into 5 LinkedIn posts</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI works better when the input is specific.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          A good carousel topic should have:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>one clear problem;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>one specific audience;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>one useful outcome.</span></li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-12">
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
            <h4 className="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wide">Weak topic</h4>
            <p className="text-zinc-300">Content creation</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
            <h4 className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wide">Better topic</h4>
            <p className="text-zinc-300">How B2B founders can turn customer calls into LinkedIn carousel ideas</p>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">2. Define the audience</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          A carousel for a founder should not sound like a carousel for a junior marketer. Before generating slides, define who the carousel is for.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Examples:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>solo founders;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>B2B marketers;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>LinkedIn creators;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>consultants;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>agency owners;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>SaaS teams;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>coaches;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>product marketers.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          The more specific the audience, the sharper the carousel.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-12">
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
            <h4 className="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wide">Bad prompt</h4>
            <p className="text-zinc-300">Create a carousel about content marketing.</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
            <h4 className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wide">Better prompt</h4>
            <p className="text-zinc-300">Create a LinkedIn carousel for B2B SaaS founders who want to turn customer conversations into LinkedIn content.</p>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">3. Pick the carousel format</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Different formats create different reading experiences. Common LinkedIn carousel formats:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>How-to guide:</strong> teaches a process.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Mistakes:</strong> shows what to avoid.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Framework:</strong> gives a repeatable system.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Checklist:</strong> helps the reader evaluate something.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Before/after:</strong> shows transformation.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Contrarian take:</strong> challenges a common belief.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Case study:</strong> explains what happened and why.</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Tool breakdown:</strong> compares options or workflows.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          For AI generation, choosing the format matters because it gives the model a clear structure.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-2 font-medium">Example:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Turn this topic into an 8-slide LinkedIn carousel using the “mistakes and fixes” format.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          Without a format, AI often creates generic slides. With a format, it creates a sequence.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">4. Generate several hook options</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Slide 1 is the most important slide. If the hook is weak, the rest of the carousel will not matter.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Use AI to generate several versions, not just one. Good hook styles:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>problem-based;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>curiosity gap;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>specific result;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>contrarian opinion;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>mistake-based;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>“before you do X, read this.”</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-2 font-medium">Example prompt:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-6 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Write 10 LinkedIn carousel hook options about why AI-generated content often sounds generic. Keep each under 12 words. Make them specific and not clickbait.</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-12">
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
            <h4 className="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wide">A weak hook</h4>
            <p className="text-zinc-300">How to improve your AI content</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
            <h4 className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wide">A stronger hook</h4>
            <p className="text-zinc-300">Your AI content sounds generic for 5 fixable reasons</p>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">5. Build the slide structure</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Once you have the hook, build the carousel structure. A simple LinkedIn carousel structure:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Slide 1:</strong> Hook</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Slide 2:</strong> Problem/context</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Slides 3–7:</strong> Core points</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span><strong>Slide 8:</strong> Summary or CTA</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          A longer carousel may have 10–12 slides, but do not add slides just to make it longer. Every slide should have a job.
        </p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">Slide 1: Hook
Slide 2: Why this problem matters
Slide 3: Mistake 1
Slide 4: Mistake 2
Slide 5: Mistake 3
Slide 6: Mistake 4
Slide 7: Summary
Slide 8: CTA</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          The structure should create a reason to keep reading. A carousel is a sequence, not a collection of random tips.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">6. Write slide-by-slide copy</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Carousel copy should be shorter than normal post copy. On LinkedIn, many people read on mobile. If a slide has too much text, it will feel heavy.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">A good rule:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>one idea per slide;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>short sentences;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>no huge paragraphs;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>avoid tiny text;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>use clear hierarchy;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>write for scanning, not deep reading.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI is useful here because it can turn long notes into short slide copy.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-2 font-medium">Prompt example:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Turn this outline into slide-by-slide copy for an 8-slide LinkedIn carousel. Keep each slide under 45 words. Use short sentences and plain English.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-10 md:mb-12">
          The goal is not to say everything. The goal is to make the next slide worth reading.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">7. Choose a visual style</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          A carousel is not only text. It is a visual format. You need a style that supports the message.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Possible visual styles:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>clean SaaS;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>minimal editorial;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>bold founder-style;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>dark premium;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>light educational;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>magazine-style;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>high-contrast LinkedIn;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>brand-specific style.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          In GoToFlow, the workflow can include visual style selection or a custom style prompt. That matters because you are not just generating slide text — you are shaping the final carousel direction.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-2 font-medium">A useful style prompt:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Use a clean premium SaaS style, dark background, strong contrast, large typography, subtle gradient accents, and enough whitespace. Make it look professional but not corporate.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">8. Generate the carousel draft</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Now you can generate the full carousel draft. A complete AI carousel workflow should include:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>topic or input;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>audience;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>format;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>hook;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>slide structure;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>slide copy;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>visual style;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>CTA.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          This is where a dedicated AI carousel maker is more useful than a generic AI chat. It helps turn the idea into a structured carousel workflow instead of only giving you text.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">9. Review and edit manually</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI gives you the draft. You still need to review it. Check:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Is the hook specific?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Does each slide have one clear idea?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Is the sequence logical?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Does the copy sound human?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Is the visual style readable?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Is the CTA clear?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Are there any factual mistakes?</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>Would you actually publish this under your name?</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          The goal is not to publish raw AI output. The goal is to get from zero to a strong first draft faster.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">LinkedIn carousel format: PDF, slides, and readability</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Before publishing, check the format. For most LinkedIn carousels, the practical workflow is:
        </p>
        <div className="flex flex-wrap items-center gap-3 text-pink-400 font-medium bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 text-sm md:text-base">
          <span>slides</span> <ArrowRight className="w-4 h-4 text-zinc-500" /> <span>PDF</span> <ArrowRight className="w-4 h-4 text-zinc-500" /> <span>LinkedIn document post</span>
        </div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">A few best practices:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>use one page per slide;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>keep margins clean;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>make headlines large;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>avoid more than one main idea per slide;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>test readability on mobile;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>avoid tiny captions or dense paragraphs;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>export a clean PDF;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>check slide order before uploading.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          If you are using AI, do not only ask for “carousel text.” Ask for slide structure and visual direction too.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-2 font-medium">Example prompt:</p>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-5 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Create a LinkedIn carousel structure for this topic.
Include the slide title, slide body copy, visual direction, and CTA for each slide.
Keep the copy readable on mobile.</div>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          This gives you a better starting point than a plain paragraph.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Best AI tools for making LinkedIn carousels</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          There are several ways to create LinkedIn carousels with AI.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">GoToFlow</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          GoToFlow is best when you want a full AI carousel workflow: topic, link, video, or competitor example → hook → structure → slide copy → visual style → carousel draft.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          It is useful when you want to create a carousel faster without manually rebuilding the entire format from scratch.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Try it with <Link to="/ai-carousel-maker" className="text-pink-400 hover:underline">GoToFlow AI Carousel Maker</Link>.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">ChatGPT or Claude</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Good for:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>brainstorming ideas;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>writing hooks;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>creating outlines;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>rewriting copy;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>generating prompt variants.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Limitations:</p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>no native visual carousel workflow;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>you still need to move the copy into a design tool;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>results depend heavily on prompt quality.</span></li>
        </ul>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Canva</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Good for:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>templates;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>manual design;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>brand kits;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>exporting PDF slides.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Limitations:</p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>you still need strong content structure;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>AI-generated copy may need editing;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>many templates can feel generic.</span></li>
        </ul>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Gamma</h3>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Good for:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>slide-style drafts;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>educational content;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>mini-decks;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>structured explainers.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Limitations:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>can feel more like a presentation than a native LinkedIn carousel.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          For a full comparison, read our guide to the <Link to="/blog/best-ai-carousel-generators" className="text-pink-400 hover:underline">best AI carousel generators</Link>.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Example: 8-slide LinkedIn carousel structure</h2>
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-14 md:mb-16">
          <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide font-medium">Topic:</p>
          <p className="text-white font-medium text-lg mb-8 pb-4 border-b border-white/10">5 mistakes that make your content sound like generic AI</p>

          <div className="space-y-8">
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 1 — Hook</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Your AI content sounds generic for 5 fixable reasons.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 2 — Problem</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">People are not against AI content.<br />They are against content with no point of view.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 3 — Mistake 1</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">You start with generic openings.</p>
              <p className="text-zinc-400 text-sm mt-2">Bad:<br />“In today’s digital landscape…”</p>
              <p className="text-zinc-400 text-sm mt-1">Better:<br />“Most AI content fails before the second sentence.”</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 4 — Mistake 2</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Every sentence has the same rhythm.</p>
              <p className="text-zinc-400 text-sm mt-2">AI often writes smooth but boring paragraphs.<br />Break the rhythm. Use short lines. Add contrast.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 5 — Mistake 3</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">There are no real examples.</p>
              <p className="text-zinc-400 text-sm mt-2">Generic advice feels empty.<br />Add a client lesson, a mistake, a screenshot, or a specific observation.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 6 — Mistake 4</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">The carousel teaches too much at once.</p>
              <p className="text-zinc-400 text-sm mt-2">One carousel should explain one idea.<br />Not your entire content strategy.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 7 — Mistake 5</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">There is no opinion.</p>
              <p className="text-zinc-400 text-sm mt-2">AI gives you safe phrasing.<br />You need to add the point of view.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-bold mb-2">Slide 8 — CTA</h4>
              <p className="text-zinc-300 text-[15px] leading-relaxed">Save this before writing your next carousel.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI prompts for LinkedIn carousels</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-8">
          Use these prompts to get better drafts.
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Idea prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">I am a [role] helping [audience] with [topic].
Give me 10 LinkedIn carousel ideas that solve a specific pain point.
Avoid generic advice.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Hook prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Write 10 hook options for a LinkedIn carousel about [topic].
Use curiosity, specificity, and tension.
Keep each hook under 12 words.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Structure prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Turn this idea into an 8-slide LinkedIn carousel.
Slide 1 should be a strong hook.
Slide 2 should explain the problem.
Slides 3–7 should deliver the main value.
Slide 8 should be a clear CTA.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Slide copy prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Turn this outline into slide-by-slide copy.
Keep each slide under 45 words.
Use short sentences, plain English, and one idea per slide.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Humanize prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Rewrite this carousel to sound more natural and less like AI.
Use short sentences, plain English, and a clear point of view.
Remove generic phrases and corporate wording.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Visual style prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-8 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Create this carousel in a clean premium SaaS style.
Use strong typography, clear spacing, dark background, subtle gradient accents, and a professional LinkedIn look.</div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 pt-2">Caption prompt</h3>
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 mb-14 md:mb-16 text-zinc-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">Write a LinkedIn caption for this carousel.
Start with a short hook.
Explain why the topic matters.
End with a clear CTA.
Keep it natural and not salesy.</div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Common mistakes when using AI for LinkedIn carousels</h2>
        
        <div className="space-y-6 mb-14 md:mb-16">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Publishing raw AI output</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">AI drafts often sound too safe. Add your experience, opinion, and examples.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Making slides too text-heavy</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">If a slide needs tiny font to fit, it has too much text.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Starting with design before structure</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">A beautiful carousel with weak logic will not work. Start with the message.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Using the same format every time</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Mix how-to posts, mistakes, frameworks, checklists, and stories.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">No CTA</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Tell people what to do next: save, comment, follow, try the tool, or read another guide.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-lg font-bold text-white mb-2">Ignoring mobile readability</h3>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7]">Most people will see your carousel on a phone. If the text is hard to read on mobile, simplify the slide.</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">How GoToFlow helps create LinkedIn carousels faster</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          GoToFlow helps creators, founders, and marketers move from idea to carousel faster.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">You can start with:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a topic;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a rough idea;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a link;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a video;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a competitor example;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>a saved post;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>source material you want to repurpose.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">GoToFlow helps with:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>input analysis;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>hook generation;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>slide structure;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>slide copy;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>visual style;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>carousel draft generation;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>regeneration and refinement.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Instead of jumping between ChatGPT, Canva, notes, and design tools, you can create a structured carousel workflow in one place.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          This is especially useful when you do not want to start from a blank page. You can use a topic, link, or video and quickly move toward a structured draft.
        </p>
        
        <InlineProductBlock
          text="Paste a topic, link, or video and get a carousel structure, copy, and visual draft."
          to="/ai-carousel-maker"
        />

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">AI vs manual carousel creation</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">AI is best for:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>generating ideas;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>finding angles;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>building structure;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>writing first drafts;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>creating hook variants;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>adapting long content into slides;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>creating visual direction.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">Manual work is still needed for:</p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>fact-checking;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>personal experience;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>final tone;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>brand voice;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>publishing decision;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>checking whether the carousel actually sounds like you.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16 font-semibold text-white">
          The best workflow is not AI-only. It is AI-assisted.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Final checklist before publishing</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-4">
          Before you upload your carousel to LinkedIn, check:
        </p>
        <ul className="space-y-3 mb-5">
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the first slide has a clear hook;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>every slide has one idea;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the structure flows naturally;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the text is readable on mobile;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the visual style supports the message;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the CTA is clear;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the PDF exports correctly;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the caption supports the carousel;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>facts, claims, and examples are accurate;</span></li>
          <li className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" /><span>the post sounds like something you would actually publish.</span></li>
        </ul>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
          This final check is what turns an AI draft into a professional carousel.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6 pt-2 border-l-[3px] border-pink-500/60 pl-4">Final thoughts</h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Learning how to make a LinkedIn carousel with AI is not about removing the human from the process. It is about removing the blank-page stage.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          AI can help you move faster from idea to structure, from structure to slides, and from slides to a visual draft.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          But the final carousel still needs your judgment.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          Start with one clear idea. Build a strong hook. Keep each slide focused. Add your point of view. Then use AI to speed up the workflow instead of replacing the strategy.
        </p>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
          If you need more inspiration, check out our guide to <Link to="/blog/linkedin-carousel-ideas" className="text-pink-400 hover:underline">LinkedIn carousel ideas</Link>, compare the <Link to="/blog/best-ai-carousel-generators" className="text-pink-400 hover:underline">best AI carousel generators</Link>, or create your next carousel with <Link to="/ai-carousel-maker" className="text-pink-400 hover:underline">GoToFlow AI Carousel Maker</Link>.
        </p>
        
      </div>
    </div>
  </article>
);

/* ── FAQ ── */
const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden" transition={{ duration: 0.35 }}>
      <p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-300 leading-[1.7] text-sm md:text-base">{item.a}</p>
    </motion.div>
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-[920px] mx-auto relative z-10">
        <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
          <h2 className="text-[22px] md:text-[28px] font-bold text-white tracking-tight mb-2">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-sm md:text-base mb-8">Common questions about LinkedIn carousel generation</p>
          <div className="space-y-3">
            {faqItems.map((item, i) => <FAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Final CTA ── */
const ArticleCTA = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-16 md:py-24 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: isMobile ? 0.6 : 0.8 }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
            Create Carousels <span className="text-gradient-brand">Faster</span>
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-[1.7] mb-8 max-w-lg mx-auto">
            Create structured, branded LinkedIn carousels with GoToFlow.
          </p>
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
            Try GoToFlow <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-zinc-500 mt-4">Free — No credit card required</p>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Back to Blog Hub ── */
const BackToBlog = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <Link to="/blog" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors text-sm font-medium">
      Explore more tools and ideas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </section>
);

/* ── Page ── */
export const HowToMakeLinkedInCarouselWithAiPage = () => (
  <MainLayout>
    <ArticleSEOHead />
    <Header />
    <Breadcrumbs />
    <ArticleHero />
    <ArticleBody />
    <ArticleFAQ />
    <ArticleCTA />
    <BackToBlog />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
