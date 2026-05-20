import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { getAppUrlWithRef } from '../../utils/url';
import { useIsMobile } from '../../hooks/useIsMobile';
import { InputToCarouselWorkflowMockup } from '../seo-visuals/InputToCarouselWorkflowMockup';

const CTA_URL = 'https://app.gotoflow.io';

const workflowSteps = ['input', 'angle', 'hook', 'slide structure', 'slide copy', 'visual direction', 'carousel draft', 'refinement'];
const goToFlowWorkflowSteps = ['topic / link / video / notes / competitor example', 'angle', 'hook', 'slide structure', 'slide copy', 'visual style', 'carousel draft', 'refinement'];

const comparisonRows = [
  {
    tool: 'ChatGPT / Claude / Gemini',
    bestFor: 'Ideas, hooks, outlines, captions, slide copy',
    limitation: 'They do not create a complete visual carousel workflow by themselves'
  },
  {
    tool: 'Canva / Figma',
    bestFor: 'Templates, layout, visual design, brand assets',
    limitation: 'You still need to create the angle, structure, and slide copy'
  },
  {
    tool: 'Generic AI carousel makers',
    bestFor: 'Fast drafts, templates, basic carousel generation',
    limitation: 'They can feel generic if they skip strategy, audience, and refinement'
  },
  {
    tool: 'GoToFlow',
    bestFor: 'Turning an input into angle, hook, structure, copy, visual direction, and draft',
    limitation: 'Best when you want a structured workflow, not just a one-click design'
  }
];

const formatCards = [
  {
    name: 'Educational guide',
    explanation: 'Use this when you want to teach a process.',
    example: 'How to turn one blog post into 5 Instagram carousel ideas',
    bestFor: 'creators, SaaS teams, coaches, educators, agencies.'
  },
  {
    name: 'Mistakes and fixes',
    explanation: 'This format works because it starts with pain.',
    example: '5 mistakes that make your AI content sound generic',
    bestFor: 'practical advice, expert positioning, service businesses.'
  },
  {
    name: 'Checklist',
    explanation: 'A checklist is easy to save and reuse.',
    example: 'Instagram carousel checklist before you publish',
    bestFor: 'tactical content, creators, marketers, teams.'
  },
  {
    name: 'Before / after',
    explanation: 'This format shows transformation.',
    example: 'Before: generic AI prompt. After: workflow-based prompt.',
    bestFor: 'product education, coaching, SaaS, design, content strategy.'
  },
  {
    name: 'Framework',
    explanation: 'A framework makes your expertise easier to remember.',
    example: 'The 4-part carousel framework: hook, problem, insight, action',
    bestFor: 'thought leadership and expert content.'
  },
  {
    name: 'Product explainer',
    explanation: 'Use this to explain how a feature or workflow works.',
    example: 'How GoToFlow turns a topic into a carousel draft',
    bestFor: 'SaaS products, product-led content, onboarding.'
  },
  {
    name: 'Case study',
    explanation: 'A case study gives the carousel more credibility.',
    example: 'How we turned one article into 3 carousel angles',
    bestFor: 'agencies, B2B brands, consultants, SaaS teams.'
  },
  {
    name: 'Tips list',
    explanation: 'Simple, familiar, and easy to produce.',
    example: '9 ways to make Instagram carousel slides easier to read',
    bestFor: 'broad educational content.'
  },
  {
    name: 'Myth vs truth',
    explanation: 'This format creates contrast.',
    example: 'Myth: AI content is always generic. Truth: weak inputs create generic output.',
    bestFor: 'opinion-led content and category education.'
  },
  {
    name: 'Comparison',
    explanation: 'Use this when people are deciding between approaches.',
    example: 'ChatGPT vs Canva vs AI carousel generator',
    bestFor: 'commercial and mid-funnel content.'
  }
];

const prompts = [
  {
    title: 'Idea prompt',
    text: `I want to create an Instagram carousel for [audience].

Topic: [topic]
Goal: [teach / explain / compare / promote / generate leads / build trust]
Tone: [clear / expert / bold / friendly / premium / practical]

Give me 10 carousel angle ideas. Each idea should include:
- a first-slide hook
- the core promise
- why this angle would be useful for the audience`
  },
  {
    title: 'Hook prompt',
    text: `Create 20 first-slide hook options for an Instagram carousel.

Audience: [audience]
Topic: [topic]
Pain point: [pain point]
Desired outcome: [outcome]

Make the hooks specific, clear, and swipe-worthy.
Avoid clickbait.
Avoid vague hooks like “how to improve your content.”`
  },
  {
    title: 'Slide structure prompt',
    text: `Turn this idea into an 8-slide Instagram carousel structure.

Topic: [topic]
Audience: [audience]
Hook: [chosen hook]
Goal: [goal]

Use this structure:
Slide 1 — Hook
Slide 2 — Problem
Slide 3 — Why it happens
Slide 4 — Key insight
Slide 5 — Step or fix 1
Slide 6 — Step or fix 2
Slide 7 — Checklist or summary
Slide 8 — CTA

For each slide, give:
- slide title
- main point
- short notes for the copy`
  },
  {
    title: 'Slide copy prompt',
    text: `Write short Instagram carousel slide copy based on this structure.

Rules:
- one idea per slide
- short lines
- no long paragraphs
- clear mobile readability
- practical tone
- no generic AI phrases
- keep the copy concise

Carousel structure:
[paste structure]`
  },
  {
    title: 'Visual style prompt',
    text: `Suggest a visual direction for this Instagram carousel.

Audience: [audience]
Topic: [topic]
Brand feel: [minimal / editorial / bold / SaaS / premium / creator-led]
Platform: Instagram

Give me:
- visual style
- typography direction
- color direction
- layout principles
- what to avoid`
  },
  {
    title: 'Caption prompt',
    text: `Write an Instagram caption for this carousel.

Carousel topic: [topic]
Audience: [audience]
Main takeaway: [takeaway]
CTA: [CTA]

Style:
- clear
- useful
- not too long
- no hype
- no fake urgency

Include 3 caption variations.`
  }
];

const slideExamples = [
  {
    number: 1,
    title: 'Hook',
    body: ['Your AI content sounds generic for 3 reasons', 'Most people blame the AI.', 'The real problem is usually the workflow.']
  },
  {
    number: 2,
    title: 'Problem',
    body: ['Generic input creates generic output', 'If your prompt is vague, the result will be vague.', 'Bad input:', '“Write me a post about marketing.”', 'Better input includes audience, goal, tone, examples, and format.']
  },
  {
    number: 3,
    title: 'Reason 1',
    body: ['You skipped the audience', 'AI needs to know who the content is for.', 'A founder, creator, coach, and agency owner do not need the same message.']
  },
  {
    number: 4,
    title: 'Reason 2',
    body: ['You asked for content before choosing an angle', 'The angle shapes everything:', 'the hook;', 'the structure;', 'the examples;', 'the CTA;', 'the tone.', 'No angle = flat content.']
  },
  {
    number: 5,
    title: 'Reason 3',
    body: ['You accepted the first draft', 'The first AI output is usually raw material.', 'It needs editing, tightening, and brand context.']
  },
  {
    number: 6,
    title: 'Fix',
    body: ['Use a workflow, not a one-line prompt', 'Start with:', '1. audience;', '2. pain;', '3. outcome;', '4. angle;', '5. structure;', '6. slide copy;', '7. visual direction.', 'Then create the draft.']
  },
  {
    number: 7,
    title: 'Checklist',
    body: ['Before publishing, check:', 'Is the hook specific?', 'Is each slide short?', 'Is the example useful?', 'Does it sound like your brand?', 'Is the CTA clear?']
  },
  {
    number: 8,
    title: 'CTA',
    body: ['Want better AI content?', 'Stop asking AI for finished posts.', 'Give it a workflow.']
  }
];

const finalChecklist = [
  'Is the first slide clear?',
  'Is the audience obvious?',
  'Does every slide have one job?',
  'Is the copy short?',
  'Is the visual hierarchy readable?',
  'Does it work on mobile?',
  'Is the CTA clear?',
  'Did you check the facts?',
  'Does it sound like your brand?',
  'Is the final draft ready to publish?'
];

const faqItems = [
  {
    q: 'What is an AI Instagram carousel generator?',
    a: 'An AI Instagram carousel generator is a tool that helps create multi-slide Instagram posts with AI. A basic version may only generate slide text. A stronger version helps with the full workflow: topic, angle, hook, slide structure, slide copy, visual style, draft, and refinement.'
  },
  {
    q: 'How do you create an Instagram carousel with AI?',
    a: 'Start with a clear topic, link, video, article, or rough idea. Define the audience and goal, generate hook options, build a slide-by-slide structure, write short slide copy, choose a visual direction, create a draft, and review it on mobile before publishing.'
  },
  {
    q: 'Can I turn a blog post, article, or video into an Instagram carousel?',
    a: 'Yes. A blog post, article, video, or link can be used as the source for a carousel. The key is to extract the main idea, choose a clear angle, simplify the message, and turn it into a slide-by-slide sequence.'
  },
  {
    q: 'Is ChatGPT enough to make Instagram carousels?',
    a: 'ChatGPT can help with ideas, hooks, outlines, and slide copy. But by itself, it does not give you a complete visual carousel workflow. You still need to structure the slides, choose the visual direction, design the carousel, and refine the final draft.'
  },
  {
    q: 'What is the difference between an AI carousel generator and Canva or Figma?',
    a: 'Canva and Figma are strong design tools. They help with templates, layout, visuals, and brand assets. An AI carousel generator focuses more on turning an idea or source into a structured carousel: angle, hook, slide flow, copy, visual direction, and draft.'
  },
  {
    q: 'How many slides can an Instagram carousel have?',
    a: 'Instagram supports multi-image and video carousel posts, but platform limits can change. Before publishing, check the latest Instagram requirements in your account or publishing tool. For content quality, use only as many slides as the idea needs.'
  },
  {
    q: 'What size should an Instagram carousel be?',
    a: 'A 4:5 portrait format is commonly used because it gives more vertical space in the feed and improves mobile readability. Still, Instagram previews and publishing flows can vary, so the safest approach is to design mobile-first, keep key text centered, and preview the final carousel before publishing.'
  },
  {
    q: 'Can I create an Instagram carousel with AI for free?',
    a: 'Some AI carousel tools offer free plans, trials, or limited free generations. The right choice depends on what you need: basic slide text, templates, visual drafts, brand styling, exports, or a full carousel workflow.'
  },
  {
    q: 'How do I write a better first-slide hook for an Instagram carousel?',
    a: 'Make the hook specific. Name a pain, mistake, outcome, contrast, or belief your audience already cares about. Avoid vague hooks like “Marketing tips” or “How to grow online.” A stronger hook would be: “Your AI content sounds generic for 3 reasons.”'
  },
  {
    q: 'What makes Instagram carousel slides readable on mobile?',
    a: 'Use large headings, short lines, strong spacing, clear hierarchy, and one idea per slide. Avoid long paragraphs and tiny text. Always preview the carousel on a phone before publishing.'
  },
  {
    q: 'Can AI generate captions for Instagram carousels too?',
    a: 'Yes. AI can help write captions, CTA variations, summaries, and hashtags. For best results, give it the carousel topic, audience, main takeaway, desired tone, and CTA.'
  },
  {
    q: 'What is the best Instagram carousel format for educational content?',
    a: 'The best formats for educational content are step-by-step guides, checklists, mistakes and fixes, frameworks, and myth vs truth carousels. These formats make complex ideas easier to understand and easier to save.'
  }
];

const inputItems = ['a topic;', 'a link;', 'a video;', 'an article;', 'notes;', 'a competitor example;', 'an old piece of content.'];
const outputItems = ['first-slide hook options;', 'a slide-by-slide structure;', 'short slide copy;', 'a visual direction;', 'a carousel draft you can refine.'];

const ArticleSEOHead = () => {
  useEffect(() => {
    const title = 'AI Instagram Carousel Generator: How to Create Carousels with AI';
    const description = 'Create Instagram carousels with AI. Turn a topic, link, video, or article into hooks, slide structure, short copy, and a carousel draft with GoToFlow.';
    const canonical = 'https://gotoflow.io/blog/ai-instagram-carousel-generator';
    document.title = title;

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };

    const setLink = (rel, href, extra = {}) => {
      const sel = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('link');
        document.head.appendChild(el);
      }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };

    setMeta('title', title);
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:url', canonical, true);
    setLink('canonical', canonical);
    document.documentElement.lang = 'en';

    return () => {
      document.title = 'GoToFlow';
    };
  }, []);
  return null;
};

const ArticleHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pt-28 pb-12 md:pb-20 px-4 sm:px-6 relative w-full bg-[#050505] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-500/[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-orange-500/[0.06] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-[940px] mx-auto relative z-10 text-center">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-1.5 text-sm text-zinc-500 min-w-0 mb-8 md:mb-12">
          <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-zinc-400 truncate">AI Instagram Carousel Generator</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-semibold text-pink-200 tracking-wide uppercase">Instagram Carousel Guide</span>
          </div>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
          AI Instagram Carousel Generator: <br className="hidden md:block" />
          How to Create Instagram Carousels with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">AI</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 leading-[1.6] max-w-2xl mx-auto">
          Create Instagram carousels with AI. Turn a topic, link, video, or article into hooks, slide structure, short copy, and a visual direction with GoToFlow.
        </motion.p>
      </div>
    </section>
  );
};

const P = ({ children, strong = false }) => (
  <p className={`text-[15px] md:text-base leading-[1.85] mb-5 ${strong ? 'text-white font-semibold' : 'text-zinc-400'}`}>
    {children}
  </p>
);

const Section = ({ title, children }) => {
  const words = typeof title === 'string' ? title.split(' ') : [];
  let formattedTitle = title;
  
  if (words.length > 2) {
    const highlightWords = words.slice(-2).join(' ');
    const normalWords = words.slice(0, -2).join(' ');
    formattedTitle = (
      <>
        {normalWords} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{highlightWords}</span>
      </>
    );
  } else if (words.length === 2) {
    const highlightWords = words.slice(-1).join(' ');
    const normalWords = words.slice(0, -1).join(' ');
    formattedTitle = (
      <>
        {normalWords} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{highlightWords}</span>
      </>
    );
  }

  return (
    <section className="mb-16 md:mb-20">
      <h2 className="text-2xl md:text-[32px] font-bold tracking-tight mb-8 leading-[1.15] text-white">
        {formattedTitle}
      </h2>
      {children}
    </section>
  );
};

const Subsection = ({ title, children }) => (
  <div className="mt-12 mb-8">
    <div className="flex items-center gap-3 mb-5">
      <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_12px_rgba(236,72,153,0.6)]" />
      <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">{title}</h3>
    </div>
    {children}
  </div>
);

const StepCard = ({ step, title, children }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8 mb-8 shadow-[0_0_40px_rgba(236,72,153,0.03)] relative overflow-hidden">
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-white/[0.08]">
        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{step}</span>
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">{title}</h3>
    </div>
    <div>
      {children}
    </div>
  </div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2.5 mb-6">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3 text-zinc-400 text-[15px] md:text-base leading-[1.6] transition-colors hover:bg-white/[0.03]">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/60 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const NumberList = ({ items }) => (
  <div className="space-y-3 mb-6">
    {items.map((item, index) => (
      <div key={item} className="flex items-start gap-3 text-[15px] md:text-base text-zinc-300 leading-[1.7]">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-semibold text-zinc-300 mt-0.5">
          {index + 1}
        </span>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const QuickAnswerSteps = ({ items }) => (
  <div className="my-8 grid gap-3">
    {items.map((item, index) => (
      <div
        key={item}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-4 sm:p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500/[0.08] via-transparent to-orange-500/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <div className="relative z-10 flex items-start gap-4">
          <span className="shrink-0 inline-flex h-9 w-11 items-center justify-center rounded-xl border border-pink-500/25 bg-pink-500/10 text-[11px] font-bold tabular-nums text-pink-200 shadow-[0_0_24px_rgba(236,72,153,0.12)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="min-w-0 pt-1 text-[15px] leading-[1.75] text-zinc-200 md:text-base">{item}</p>
        </div>
      </div>
    ))}
  </div>
);

const CTABox = ({ heading, text, button }) => (
  <div className="relative my-14 md:my-16 rounded-[28px] bg-gradient-to-br from-pink-500/35 via-white/[0.08] to-orange-500/30 p-px shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
    <div className="relative overflow-hidden rounded-[27px] bg-[#080808] p-6 sm:p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-pink-500/[0.12] blur-[90px]" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-orange-500/[0.1] blur-[95px]" />
      </div>
      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">GoToFlow</span>
          </div>
          <h3 className="mb-3 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">{heading}</h3>
          <p className="max-w-xl text-sm leading-[1.75] text-zinc-400 md:text-base">{text}</p>
        </div>
        <div className="shrink-0">
          <a href={getAppUrlWithRef(CTA_URL)} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-black shadow-[0_0_34px_rgba(255,255,255,0.16)] transition-all hover:scale-105 hover:bg-zinc-100 active:scale-[0.98] md:w-auto">
            {button} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FinalCTABlock = ({ heading, text, button }) => (
  <section className="py-12 md:py-16 relative w-full mt-8">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
    <div className="max-w-3xl mx-auto text-center relative z-10">
      <div className="p-8 sm:p-10 md:p-14 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-md shadow-[0_0_60px_rgba(236,72,153,0.03)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5 leading-snug relative z-10">
          {heading}
        </h2>
        <p className="text-zinc-300 text-[15px] md:text-base leading-[1.7] mb-8 max-w-xl mx-auto relative z-10">
          {text}
        </p>
        <div className="relative z-10 flex flex-col items-center">
          <a href={getAppUrlWithRef(CTA_URL)} className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] text-[15px] group border border-pink-400/20">
            {button} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-[13px] text-zinc-500 mt-5 tracking-wide">Free — No credit card required</p>
        </div>
      </div>
    </div>
  </section>
);

const WorkflowBlock = ({ steps = workflowSteps }) => (
  <div className="relative my-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.24)] sm:p-5 md:p-7">
    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/[0.06] blur-[80px]" aria-hidden="true" />
    <div className="relative z-10 flex flex-wrap items-center gap-2.5 md:gap-3">
      {steps.map((step, index) => (
        <React.Fragment key={`${step}-${index}`}>
          <div className="min-w-0 max-w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 shadow-sm sm:px-4">
            <span className="block max-w-full break-words text-sm font-semibold leading-snug text-zinc-200">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]">
              <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const PromptBlock = ({ title, text }) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] mb-6 overflow-hidden shadow-lg">
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-[#050505]">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-pink-500/40" />
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400">{title}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-semibold">Prompt</div>
    </div>
    <div className="p-5 md:p-6 bg-[#0a0a0a]">
      <pre className="whitespace-pre-wrap break-words text-[13px] md:text-sm leading-[1.8] text-zinc-300 font-mono">
        {text}
      </pre>
    </div>
  </div>
);

const ComparisonTable = () => (
  <div className="my-10">
    <div className="hidden md:grid grid-cols-[1fr_1.2fr_1.4fr] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-lg">
      <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 border-b border-white/[0.08] bg-[#050505]">Tool</div>
      <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 border-b border-white/[0.08] border-l border-white/[0.08] bg-[#050505]">Best for</div>
      <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 border-b border-white/[0.08] border-l border-white/[0.08] bg-[#050505]">Limitation</div>
      {comparisonRows.map((row) => (
        <React.Fragment key={row.tool}>
          <div className="px-6 py-5 text-sm font-semibold text-white border-t border-white/[0.05] flex items-center">{row.tool}</div>
          <div className="px-6 py-5 text-sm text-zinc-300 border-t border-l border-white/[0.05] leading-[1.6]">{row.bestFor}</div>
          <div className="px-6 py-5 text-sm text-zinc-400 border-t border-l border-white/[0.05] leading-[1.6]">{row.limitation}</div>
        </React.Fragment>
      ))}
    </div>
    <div className="space-y-4 md:hidden">
      {comparisonRows.map((row) => (
        <div key={row.tool} className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-5 shadow-sm">
          <h3 className="text-white font-semibold mb-4 text-lg">{row.tool}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-pink-400/80 mb-1.5">Best for</p>
              <p className="text-sm text-zinc-300 leading-[1.6]">{row.bestFor}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-1.5">Limitation</p>
              <p className="text-sm text-zinc-400 leading-[1.6]">{row.limitation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FormatCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
    {formatCards.map((format) => (
      <div key={format.name} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-zinc-100 tracking-tight mb-2">{format.name}</h3>
        <p className="text-sm text-zinc-500 leading-[1.7] mb-4">{format.explanation}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-pink-400/70 mb-1">Example</p>
        <p className="text-sm text-zinc-300 leading-[1.6] mb-4">{format.example}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600 mb-1">Best for</p>
        <p className="text-sm text-zinc-500 leading-[1.6]">{format.bestFor}</p>
      </div>
    ))}
  </div>
);

const SlideExampleCards = () => (
  <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {slideExamples.map((slide) => (
      <div key={slide.number} className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 lg:p-6 flex flex-col shadow-[0_0_40px_rgba(236,72,153,0.03)] transition-colors hover:bg-white/[0.05] relative overflow-hidden">
        <div className="flex items-start gap-3 mb-5">
          <span className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-300 tabular-nums shrink-0 mt-0.5 shadow-[0_0_10px_rgba(236,72,153,0.1)]">
            0{slide.number}
          </span>
          <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug">{slide.title}</h3>
        </div>
        <div className="space-y-2.5 flex-1 flex flex-col justify-start">
          {slide.body.map((line, i) => (
            <p key={`${slide.number}-${i}`} className={`leading-[1.6] text-sm ${i === 0 ? 'text-zinc-100 font-medium' : 'text-zinc-300'}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ChecklistGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
    {items.map((item) => (
      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-4">
        <span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mt-0.5">
          <Check className="w-3.5 h-3.5 text-pink-300" />
        </span>
        <span className="text-sm text-zinc-400 leading-[1.6]">{item}</span>
      </div>
    ))}
  </div>
);

const ExampleBox = ({ label, children }) => (
  <div className="rounded-xl border border-white/[0.08] bg-[#050505] p-5 md:p-6 my-6 relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/40 to-orange-500/40" />
    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4">{label}</p>
    <div className="text-sm md:text-base text-zinc-300 leading-[1.75] space-y-3">{children}</div>
  </div>
);

const ArticleExploreZone = () => (
  <section className="mt-16 mb-8 relative w-full overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/[0.02] blur-[140px] rounded-full pointer-events-none" />
    <div className="relative z-10 bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-12">
      
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 leading-[1.15] text-white">
          What else you can create with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">GoToFlow</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { title: 'Instagram Carousels', desc: 'Turn ideas into swipeable educational posts.', link: '/ai-carousel-maker' },
            { title: 'LinkedIn Carousels', desc: 'Create expert content for professional audiences.', link: '/linkedin-carousel-maker' },
            { title: 'Social Posts', desc: 'Generate short posts from topics, links, or notes.', link: '/ai-instagram-post-generator' },
            { title: 'Content Drafts', desc: 'Shape rough ideas into structured content.', link: '/ai-content-generator' }
          ].map((feature) => (
            <Link key={feature.title} to={feature.link} className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.18] hover:-translate-y-1 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.04] flex items-center justify-center transition-colors group-hover:bg-pink-500/10 group-hover:border-pink-500/20 shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-pink-400" />
                </div>
                <h3 className="text-[15px] font-bold text-zinc-100 tracking-tight transition-colors group-hover:text-white leading-snug">{feature.title}</h3>
              </div>
              <p className="text-[13px] text-zinc-400 leading-snug">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-white/[0.06] mb-12"></div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 leading-[1.15] text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Related</span> guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Best AI Carousel Generators', desc: 'Compare the top tools for creating social media carousels in 2026.', link: '/blog/best-ai-carousel-generators' },
            { title: 'How to Make a LinkedIn Carousel with AI', desc: 'Step-by-step guide to generating engaging LinkedIn carousels.', link: '/blog/how-to-make-linkedin-carousel-with-ai' },
            { title: '50 LinkedIn Carousel Ideas', desc: 'A list of proven hooks, formats, and structures that get reach.', link: '/blog/linkedin-carousel-ideas' }
          ].map((guide) => (
            <Link key={guide.title} to={guide.link} className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.18] hover:-translate-y-1 shadow-sm">
              <div>
                <h3 className="text-[16px] font-bold text-zinc-100 tracking-tight leading-snug mb-2 group-hover:text-white transition-colors">{guide.title}</h3>
                <p className="text-[13px] text-zinc-400 leading-[1.6] mb-6">{guide.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 mt-auto">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-[0.1em] group-hover:text-pink-400 transition-colors">
                  Read guide
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-pink-400 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  </section>
);

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-pink-500/[0.02] shadow-[0_0_30px_rgba(236,72,153,0.03)]' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.15]'}`} onClick={onClick}>
    <div className="flex items-start justify-between gap-4 p-5 md:p-6">
      <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors pt-0.5 ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</h3>
      <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-pink-500/10 border-pink-500/20' : 'bg-white/[0.03] border-white/10 group-hover:bg-white/[0.06]'}`}>
        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? '-rotate-90 text-pink-400' : 'rotate-90 text-zinc-500'}`} />
      </div>
    </div>
    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-400 leading-[1.7] text-sm md:text-base">{item.a}</p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return (
    <section className="py-8 relative w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-10 py-8 md:py-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-[22px] md:text-[28px] font-bold text-white tracking-tight mb-8">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {faqItems.map((item, i) => (
              <FAQItem key={item.q} item={item} isOpen={openIndex === i} onClick={() => toggle(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ArticleBody = () => (
  <article className="pt-4 pb-8 px-4 sm:px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    <div className="max-w-[940px] mx-auto relative z-10">
      <div className="bg-white/[0.015] border border-white/[0.06] rounded-3xl px-5 sm:px-8 md:px-12 py-8 md:py-14">
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 mb-14 md:mb-16 shadow-[0_0_40px_rgba(236,72,153,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <P>Instagram carousels can turn one idea into a swipeable story.</P>
            <P>That is why creators, founders, marketers, agencies, coaches, and SaaS teams use them to explain ideas, teach frameworks, break down problems, and make content easier to save.</P>
            
            <div className="my-8 rounded-2xl border border-pink-500/20 bg-pink-500/[0.04] p-5 md:p-6 relative overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/50 to-orange-500/50" />
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-pink-400">Why this matters</span>
              </div>
              <p className="text-[15px] leading-[1.65] text-zinc-300">
                Most carousel tools start too late. They help you design slides after you already know the angle, hook, and copy. But the real challenge is deciding what the carousel should say, why someone should swipe, and how slides should flow.
              </p>
            </div>

            <P>That is where an AI Instagram carousel generator should help earlier in the process.</P>
            <P>A stronger workflow starts with a topic, link, video, article, notes, competitor example, or rough idea — then turns it into a clear carousel flow:</P>
            <WorkflowBlock />
            <P>GoToFlow is built around that workflow.</P>
            <P>Instead of asking AI for random slide text, you can use GoToFlow to build the logic of the carousel before you polish the design.</P>
          </div>
        </div>

        <InputToCarouselWorkflowMockup
          eyebrow="What GoToFlow Helps You Create"
          title="Turn raw input into a carousel draft"
          subtitle="Stop writing from scratch. Start with a topic, link, video, or rough notes — and let AI shape the workflow."
          inputs={['Topic / Idea', 'Link / Article', 'Video', 'Competitor Example', 'Notes']}
          steps={['Angle', 'First-slide Hook', 'Slide Structure', 'Slide Copy', 'Visual Direction']}
          output="Carousel Draft"
        />



        <Section title="Quick answer: how to create an Instagram carousel with AI">
          <P>To create an Instagram carousel with AI:</P>
          <QuickAnswerSteps items={[
            'Start with a topic, link, video, article, notes, or rough idea.',
            'Define the audience and the outcome of the carousel.',
            'Generate several first-slide hook options.',
            'Build a slide-by-slide structure.',
            'Write short slide copy for each slide.',
            'Choose a visual direction.',
            'Create a carousel draft.',
            'Review it on mobile and refine before publishing.'
          ]} />
          <P>The key is to treat AI as a workflow assistant, not just a text generator.</P>
          <P>A strong Instagram carousel needs logic before design: the angle, the hook, the sequence, the message on each slide, and the final action you want the reader to take.</P>
          <CTABox heading="Create your first draft in minutes" text="Start with a topic, link, video, or rough idea. GoToFlow helps turn it into a hook, slide structure, copy, and visual direction." button="Try GoToFlow AI Carousel Maker" />
        </Section>

        <Section title="What is an AI Instagram carousel generator?">
          <P>An AI Instagram carousel generator is a tool that helps create multi-slide Instagram posts with AI.</P>
          <P>A basic tool may only generate slide text, captions, or design suggestions. A stronger AI Instagram carousel generator helps with the full creative workflow:</P>
          <WorkflowBlock />
          <P>That distinction matters.</P>
          <P>If you only ask AI to “write an Instagram carousel,” you often get generic advice, long slide text, and a weak first slide.</P>
          <P>But when the process is structured, AI can help you turn a rough idea into a clearer, more useful carousel.</P>
          <P>For example, you can start with:</P>
          <BulletList items={['a topic;', 'a blog post;', 'a YouTube video;', 'an article;', 'a competitor example;', 'old content;', 'notes from a call;', 'a rough content idea.']} />
          <P>Then AI can help extract the main point, shape the angle, create hook options, organize the slides, write concise copy, and suggest a visual style.</P>
          <P>That is the difference between “AI wrote some text” and “AI helped me build a carousel.”</P>
        </Section>

        <Section title="Who should use an AI Instagram carousel generator?">
          <P>An AI Instagram carousel generator is useful when you have an idea or source material, but you do not yet have a clear carousel structure.</P>
          <P>It is especially useful for:</P>
          <BulletList items={[
            'Founders turning product ideas, positioning, and lessons into educational posts.',
            'Creators building visual content faster without starting from a blank page.',
            'Marketers repurposing blog posts, videos, webinars, landing pages, and campaigns.',
            'Agencies creating carousel drafts for clients across different niches.',
            'Coaches and experts explaining frameworks, methods, and beliefs in a more visual format.',
            'SaaS teams turning features, use cases, and customer problems into educational content.',
            'Content teams producing recurring carousel content without rebuilding the workflow every time.'
          ]} />
          <P>If you already have the exact final copy and only need to make it look good, Canva, Figma, or another design tool may be enough.</P>
          <P>But if you have a topic, link, video, article, notes, competitor example, or rough idea — and need help turning it into a structured Instagram carousel — a workflow-first tool like GoToFlow is more useful.</P>
          <P>That is the key difference.</P>
          <P>Design tools help you polish the slides. GoToFlow helps you shape what the slides should say before you design them.</P>
        </Section>

        <Section title="What can you turn into an Instagram carousel with AI?">
          <P>A workflow-first AI carousel maker for Instagram does not require a perfect starting point.</P>
          <P>You can start with something rough and turn it into a clearer swipeable sequence.</P>
          <P>For example, you can turn these inputs into Instagram carousels:</P>
          <BulletList items={['a rough topic;', 'a blog post;', 'a YouTube video;', 'a landing page;', 'a product feature;', 'a customer question;', 'a competitor post;', 'notes from a call;', 'a webinar transcript;', 'an old social post;', 'a newsletter;', 'a product update;', 'a short content idea.']} />
          <P>The input does not need to be polished.</P>
          <P>The goal is to extract the angle, simplify the message, and turn it into a clear carousel structure.</P>
          <ExampleBox label="Example">
            <p><strong className="text-white">Input:</strong></p>
            <p>A long blog post about why AI content often sounds generic.</p>
            <p><strong className="text-white">Carousel angle:</strong></p>
            <p>“Your AI content sounds generic because your workflow is too vague.”</p>
            <p><strong className="text-white">Hook:</strong></p>
            <p>“Your AI content sounds generic for 3 reasons.”</p>
            <p><strong className="text-white">Slide structure:</strong></p>
            <p>Problem → reason 1 → reason 2 → reason 3 → fix → checklist → CTA.</p>
          </ExampleBox>
          <P>This is where AI becomes more useful than a blank design template.</P>
          <P>Instead of asking, “What should I put on each slide?”, you can start with the source and build the carousel logic step by step.</P>
        </Section>

        <Section title="Why Instagram carousels work">
          <P>Instagram carousels work because they let you break one idea into a swipeable sequence.</P>
          <P>A single image has to communicate everything at once. A carousel can build the message step by step:</P>
          <BulletList items={['Slide 1 grabs attention.', 'Slide 2 frames the problem.', 'Middle slides explain the idea.', 'Final slides summarize, prove, or invite action.']} />
          <P>This format is especially useful for:</P>
          <BulletList items={['educational content;', 'frameworks;', 'checklists;', 'product explainers;', 'expert tips;', 'before/after stories;', 'case studies;', 'comparisons;', 'myth vs truth content.']} />
          <P>Carousels are also easy to save when they teach something useful. If the post gives the reader a checklist, framework, or practical breakdown, they may come back to it later.</P>
          <P>For creators, brands, SaaS teams, coaches, consultants, marketers, and agencies, carousels are a practical way to turn expertise into visual content.</P>
          <P>But the format only works when the slides are clear.</P>
          <P>A carousel with too much text, a vague hook, and no structure is still hard to read — even if it looks polished.</P>
        </Section>

        <Section title="AI carousel generator vs ChatGPT vs Canva/Figma">
          <P>There are several ways to create Instagram carousels with AI.</P>
          <P>The right tool depends on where you struggle most.</P>
          <P>ChatGPT, Claude, and Gemini can help you think and write. Canva and Figma can help you design. An AI carousel workflow tool helps connect the full process.</P>
          <ComparisonTable />
          <P>The difference is where the tool starts.</P>
          <P>ChatGPT starts with text.</P>
          <P>Canva and Figma start with design.</P>
          <P>Many carousel generators start with templates.</P>
          <P>GoToFlow starts with the content workflow:</P>
          <WorkflowBlock steps={['source', 'angle', 'hook', 'structure', 'copy', 'visual direction', 'draft']} />
          <P>That matters because the hardest part of a carousel is not choosing a template.</P>
          <P>The hardest part is deciding what the carousel should say, why someone should swipe, how the idea should unfold, and what action should come next.</P>
          <P>A common manual workflow looks like this:</P>
          <NumberList items={[
            'Brainstorm in ChatGPT.',
            'Rewrite in a document.',
            'Build slides in Canva or Figma.',
            'Edit the text again.',
            'Create a caption somewhere else.',
            'Recheck everything on mobile.'
          ]} />
          <P>That process works, but it is slow and messy.</P>
          <P>A workflow-first AI Instagram carousel generator gives you a more organized path: start with the source idea, shape the message, structure the slides, write the copy, choose the visual direction, and refine the draft.</P>
          <CTABox heading="Stop switching between AI chat and design tools" text="Use one workflow to shape the angle, hook, slide copy, and visual draft before you start polishing the carousel." button="Build a carousel with GoToFlow" />
        </Section>

        <Section title="How to create an Instagram carousel with AI step by step">
          <StepCard step="1" title="Start with a clear topic or source">
            <P>A strong carousel starts with a clear input.</P>
            <P>You can begin with:</P>
            <BulletList items={['a topic;', 'a rough idea;', 'a link;', 'a video;', 'an article;', 'notes;', 'a competitor example;', 'old content;', 'a customer question;', 'a product insight.']} />
            <ExampleBox label="Input quality">
              <p><strong className="text-white">Bad input:</strong></p>
              <p>“Make a carousel about marketing.”</p>
              <p><strong className="text-white">Better input:</strong></p>
              <p>“Create an Instagram carousel for early-stage SaaS founders about why their AI-generated content sounds generic and how to fix it.”</p>
            </ExampleBox>
            <P>The second version gives AI a clear audience, pain point, and direction.</P>
            <P>If you are using GoToFlow, this is where the workflow starts: you bring the input, and the tool helps turn it into a usable carousel direction.</P>
          </StepCard>
          <StepCard step="2" title="Define the audience and outcome">
            <P>Before writing slides, define who the carousel is for and what it should do.</P>
            <P>Ask:</P>
            <BulletList items={['Who is this for?', 'What problem do they have?', 'What should they understand after swiping?', 'Should the post teach, persuade, compare, explain, or sell?', 'What action should the reader take at the end?']} />
            <P>Examples:</P>
            <BulletList items={['For founders: explain a growth mistake.', 'For creators: teach a repeatable content framework.', 'For agencies: show a client-facing checklist.', 'For coaches: simplify a complex idea.', 'For SaaS teams: explain a product workflow.', 'For marketers: compare two approaches.']} />
            <P>Without audience and outcome, AI usually produces generic content.</P>
            <P>With audience and outcome, the carousel becomes more specific and useful.</P>
          </StepCard>
          <StepCard step="3" title="Choose the carousel format">
            <P>The format gives the carousel a structure.</P>
            <P>Good carousel formats include:</P>
            <BulletList items={['educational guide;', 'mistakes and fixes;', 'checklist;', 'before/after;', 'framework;', 'myth vs truth;', 'comparison;', 'product explainer;', 'case study;', 'tips list.']} />
            <ExampleBox label="Example">
              <p><strong className="text-white">Topic:</strong></p>
              <p>“AI content sounds generic”</p>
              <p><strong className="text-white">Possible formats:</strong></p>
              <p>“7 reasons your AI content sounds generic”</p>
              <p>“Before/after: generic AI post vs useful AI post”</p>
              <p>“A checklist for making AI content sound like your brand”</p>
              <p>“Myth vs truth: AI content quality”</p>
              <p>“Framework: how to turn AI output into branded content”</p>
            </ExampleBox>
            <P>The format changes the whole article-to-carousel workflow.</P>
            <P>A checklist needs short, direct points. A case study needs context and proof. A comparison needs contrast.</P>
          </StepCard>
          <StepCard step="4" title="Generate first-slide hook options">
            <P>The first slide decides whether people swipe.</P>
            <P>A weak hook is broad, obvious, or too soft.</P>
            <P>Weak examples:</P>
            <BulletList items={['“How to create better AI content”', '“Tips for Instagram carousels”', '“AI content is important”']} />
            <P>Stronger examples:</P>
            <BulletList items={['“Your AI content sounds generic for 3 reasons”', '“Stop asking AI to write. Start giving it a workflow.”', '“The problem is not AI. It is your input.”', '“Most AI carousels fail before slide 2.”']} />
            <P>A good hook usually does one of these:</P>
            <BulletList items={['names a specific pain;', 'challenges a common belief;', 'promises a useful fix;', 'creates curiosity;', 'shows a before/after;', 'speaks to a clear audience.']} />
            <P>Use AI to generate options, but do not accept the first one.</P>
            <P>Ask for 10–20 variations, then choose the clearest one.</P>
          </StepCard>
          <StepCard step="5" title="Build a slide-by-slide structure">
            <P>A carousel should not feel like a blog post squeezed into slides.</P>
            <P>The rule is simple:</P>
            <P strong>One slide = one idea.</P>
            <P>A basic 8-slide structure can look like this:</P>
            <NumberList items={['Hook', 'Problem', 'Why it happens', 'Key insight', 'Step 1 / Fix 1', 'Step 2 / Fix 2', 'Checklist or summary', 'CTA']} />
            <P>This gives the reader a reason to keep swiping.</P>
            <P>Bad structure:</P>
            <BulletList items={['random tips;', 'repeated ideas;', 'too much context;', 'no progression;', 'no final takeaway.']} />
            <P>Good structure:</P>
            <BulletList items={['clear opening;', 'logical sequence;', 'short slides;', 'one takeaway per slide;', 'useful ending.']} />
          </StepCard>
          <StepCard step="6" title="Write short slide copy">
            <P>Instagram carousel copy must be easy to read on a phone.</P>
            <P>Avoid long paragraphs. Use short lines. Cut anything that does not help the slide.</P>
            <ExampleBox label="Instead of">
              <p>“Many brands struggle with AI content because they use generic prompts that do not include enough context about the audience, the desired outcome, the tone of voice, and the content format.”</p>
            </ExampleBox>
            <ExampleBox label="Use">
              <p>Generic AI content usually comes from generic input.</p>
              <p>Add:</p>
              <p>audience</p>
              <p>goal</p>
              <p>tone</p>
              <p>format</p>
            </ExampleBox>
            <P>Shorter copy creates stronger slides.</P>
            <P>AI can help you reduce text, but you should still edit for clarity and tone.</P>
          </StepCard>
          <StepCard step="7" title="Choose visual style">
            <P>The visual style should support the message.</P>
            <P>Examples:</P>
            <BulletList items={['Editorial: strong typography, clean layout, magazine-like feel.', 'Minimal: white space, simple headings, few elements.', 'Bold creator style: large hooks, high contrast, expressive layouts.', 'SaaS dark style: dark background, gradient accents, product-like visuals.', 'Brand-led style: consistent colors, fonts, and visual system.']} />
            <P>Do not choose style before structure.</P>
            <P>Design should make the idea easier to understand, not hide weak content.</P>
            <P>A good AI carousel workflow should help you connect the message with a visual direction.</P>
          </StepCard>
          <StepCard step="8" title="Create a draft and refine it">
            <P>An AI draft is a starting point.</P>
            <P>Before publishing, review:</P>
            <BulletList items={['Is the hook specific?', 'Is the structure logical?', 'Is each slide readable?', 'Is the tone consistent with your brand?', 'Are the facts accurate?', 'Is the CTA clear?', 'Does the carousel still work on mobile?']} />
            <P>AI speeds up the workflow, but human review makes the final content credible.</P>
            <P>That is especially important for expert, SaaS, educational, or brand content.</P>
          </StepCard>
        </Section>

        <Section title="Best Instagram carousel formats to create with AI">
          <FormatCards />
        </Section>

        <Section title="Instagram carousel size and readability">
          <P>Instagram formats, previews, and publishing flows can change, so it is better to design with a mobile-first approach instead of relying on one permanent specification.</P>
          <P>A 4:5 portrait format is commonly used because it gives more vertical space in the feed and makes slides easier to read on mobile.</P>
          <P>But size alone does not make a carousel good.</P>
          <P>Focus on readability:</P>
          <BulletList items={['Keep key text centered.', 'Use large headings.', 'Leave enough spacing.', 'Make one point per slide.', 'Avoid tiny body text.', 'Keep lines short.', 'Use strong contrast.', 'Preview the carousel on mobile before publishing.', 'Check the latest Instagram limits and publishing rules before final upload.']} />
          <P>Instagram currently supports multi-image and video carousel posts, but platform limits and interface details can change.</P>
          <P>The safest rule: design for a real phone screen, not for a desktop preview.</P>
        </Section>

        <Section title="Prompt examples for Instagram carousels">
          <P>Use these prompts as starting points. Replace the bracketed parts with your own context.</P>
          {prompts.map((prompt) => (
            <PromptBlock key={prompt.title} title={prompt.title} text={prompt.text} />
          ))}
        </Section>

        <Section title="Example: 8-slide Instagram carousel structure">
          <P><strong className="text-white">Topic:</strong></P>
          <P>Why your AI content sounds generic</P>
          <SlideExampleCards />
        </Section>

        <Section title="Common mistakes when creating Instagram carousels with AI">
          {[
            ['Starting with design before structure', 'A beautiful template cannot fix a weak message.', 'Start with the angle and slide flow first. Then choose the design.'],
            ['Using a weak first slide', 'If the first slide is vague, people will not swipe.', 'Avoid broad hooks. Name a specific pain, promise, mistake, or outcome.'],
            ['Adding too much text', 'A carousel is not a blog post.', 'Cut aggressively. Use one idea per slide. Make the copy easy to read on mobile.'],
            ['Accepting generic AI copy', 'AI often produces safe, generic phrasing.', 'Edit for specificity. Add real examples. Use your brand voice. Remove empty phrases.'],
            ['Forgetting the audience', 'Content for “everyone” usually feels weak.', 'Write for a specific person with a specific problem.'],
            ['Publishing without a CTA', 'Not every carousel has to sell, but it should give the reader a next step.', 'That might be:'],
            ['Ignoring mobile readability', 'Always preview before publishing.', 'If you have to zoom in to read the slide, the copy is too small or too dense.'],
            ['Using the same format every time', 'If every carousel is “7 tips,” your content starts to feel predictable.', 'Rotate formats: mistakes, frameworks, comparisons, checklists, case studies, and before/after posts.'],
            ['Publishing without editing', 'AI can create a strong starting point, but you still need human judgment.', 'Check clarity, accuracy, tone, and final flow.']
          ].map(([title, first, second]) => (
            <Subsection key={title} title={title}>
              <P>{first}</P>
              <P>{second}</P>
              {title === 'Publishing without a CTA' && (
                <BulletList items={['save this;', 'try this workflow;', 'comment with a question;', 'read the full guide;', 'try the tool;', 'book a call;', 'download a resource.']} />
              )}
            </Subsection>
          ))}
        </Section>

        <Section title="How GoToFlow helps create Instagram carousels faster">
          <P>GoToFlow helps you create Instagram carousels through a structured AI content workflow.</P>
          <P>Instead of jumping between AI chat, notes, documents, Canva, Figma, and separate caption tools, you can move through the carousel process in one flow:</P>
          <WorkflowBlock steps={goToFlowWorkflowSteps} />
          <P>That makes the process easier to manage.</P>
          <P>You can start with a rough idea and turn it into a clearer carousel direction. You can use a link, article, video, or old content as the source. You can shape hook options, build the slide sequence, write shorter slide copy, and define a visual direction before refining the final draft.</P>
          <P>GoToFlow is not just “AI writes a caption.”</P>
          <P>It helps with the parts that usually slow carousel creation down:</P>
          <BulletList items={['finding the angle;', 'making the first slide stronger;', 'turning long ideas into slide structure;', 'keeping slide copy concise;', 'choosing a visual direction;', 'creating a draft you can refine;', 'keeping the workflow organized.']} />
          <P>That is especially useful if you create carousels often for Instagram, LinkedIn, SaaS content, educational content, or client work.</P>
          <P>For a broader comparison of tools, you can also read GoToFlow’s guide to the <Link to="/blog/best-ai-carousel-generators" className="text-pink-400 hover:underline">best AI carousel generators</Link>.</P>
          <P>And if you create content for LinkedIn too, see the guide on <Link to="/blog/how-to-make-linkedin-carousel-with-ai" className="text-pink-400 hover:underline">how to make a LinkedIn carousel with AI</Link>.</P>
          <CTABox heading="Turn source content into a carousel draft" text="Paste a topic, link, article, video, or notes — and let GoToFlow help shape the carousel logic before design." button="Try GoToFlow" />
        </Section>

        <Section title="Final checklist before publishing">
          <P>Before you publish your Instagram carousel, check:</P>
          <ChecklistGrid items={finalChecklist} />
          <P>A strong carousel is not just a set of pretty slides. It is a sequence of ideas that feels easy to swipe through.</P>
        </Section>

        <Section title="The simplest Instagram carousel workflow">
          <P>The simplest Instagram carousel workflow is:</P>
          <P strong>Start with source material.</P>
          <P>That can be:</P>
          <BulletList items={inputItems} />
          <P>Use AI to shape the carousel logic.</P>
          <P>With GoToFlow, that means shaping:</P>
          <BulletList items={['the angle;', 'the first-slide hook;', 'the slide structure;', 'short slide copy;', 'the visual direction;', 'the carousel draft.']} />
          <P>Then refine the final version.</P>
          <P>Before publishing, review:</P>
          <BulletList items={['facts;', 'tone;', 'examples;', 'final CTA;', 'mobile readability.']} />
          <P>This is the part many creators skip.</P>
          <P>They start with a template before they know the message. Then they force the idea into a design.</P>
          <P>A better workflow is to build the carousel before you design it.</P>
          <P>First, clarify the idea. Then structure the slides. Then write the copy. Then choose the visual direction. Then polish the draft.</P>
          <P>That is where GoToFlow fits naturally: it helps you turn source material into a structured Instagram carousel draft before the design stage becomes messy.</P>
          <CTABox heading="Build the carousel before you design it" text="Use GoToFlow to turn a topic, link, video, or rough idea into a structured Instagram carousel draft." button="Try GoToFlow AI Carousel Maker" />
        </Section>

        <Section title="Conclusion">
          <P>A strong Instagram carousel is not just a design template.</P>
          <P>It needs a clear angle, a strong first-slide hook, a logical slide structure, short copy, a visual direction, and a final review before publishing.</P>
          <P>AI can make that process much faster, but only when you use it as a workflow — not as a one-line prompt machine.</P>
          <P>GoToFlow helps you move from topic, link, video, notes, or rough idea to a structured Instagram carousel draft with hook, slide flow, copy, and visual direction.</P>
        </Section>

        <ArticleExploreZone />

        <FAQSection />

        <FinalCTABlock
          heading="Still creating carousels manually?"
          text="Turn a topic, link, video, or rough note into a structured Instagram carousel draft with angle, hook, slide flow, copy, and visual direction."
          button="Try GoToFlow For Free"
        />
      </div>
    </div>
  </article>
);

export const AiInstagramCarouselGeneratorPage = () => (
  <MainLayout>
    <ArticleSEOHead />
    <Header />
    <ArticleHero />
    <ArticleBody />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
