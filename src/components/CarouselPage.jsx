import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Zap, Layers, Target, Users, BarChart3, CheckCircle2 } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';

/* ── SEO Head Manager ── */
const SEOHead = () => {
  useEffect(() => {
    // Title
    document.title = 'AI Carousel Maker — Create Instagram & LinkedIn Carousels with AI | GoToFlow';

    // Helpers
    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr === 'name' ? 'name' : 'property', attr === 'name' ? val : val);
      return el;
    };
    const setMetaContent = (name, content, useProperty = false) => {
      const selector = useProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(useProperty ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href, extra = {}) => {
      const selector = Object.keys(extra).length
        ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
        : `link[rel="${rel}"]`;
      let el = document.querySelector(selector);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };

    setMetaContent('description', 'Create high-converting Instagram and LinkedIn carousels with AI. Generate hooks, structure and slide content in seconds.');
    setLink('canonical', 'https://gotoflow.io/ai-carousel-maker');
    setLink('alternate', 'https://gotoflow.io/ai-carousel-maker', { hreflang: 'en' });
    setLink('alternate', 'https://gotoflow.io/ru/ai-generator-karuselej', { hreflang: 'ru' });

    // JSON-LD
    const existingLd = document.querySelector('#carousel-page-ld');
    if (!existingLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'carousel-page-ld';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GoToFlow AI Carousel Maker',
        applicationCategory: 'BusinessApplication',
        description: 'Create high-converting Instagram and LinkedIn carousels with AI in seconds.',
        url: 'https://gotoflow.io/ai-carousel-maker',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      });
      document.head.appendChild(script);
    }

    return () => {
      document.title = 'AI-генератор контента для соцсетей — Создавайте посты, карусели и Reels | GoToFlow';
    };
  }, []);
  return null;
};

/* ── Reusable Section Wrapper ── */
const Section = ({ children, className = '' }) => (
  <section className={`py-20 md:py-28 px-6 relative z-10 w-full ${className}`}>
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

/* ── Badge Pill ── */
const Badge = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
    {children}
  </div>
);

/* ── Gradient heading helper ── */
const GradSpan = ({ children }) => (
  <span className="text-gradient-brand">{children}</span>
);

/* ── FAQ Item ── */
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${open ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`}
    >
      <div className="flex items-center justify-between gap-4 p-6">
        <span className={`font-semibold text-base leading-snug transition-colors ${open ? 'text-white' : 'text-zinc-200'}`}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? 'text-pink-400' : 'text-zinc-500'}`} />
        </motion.div>
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}>
          <p className="px-6 pb-6 text-zinc-400 leading-relaxed text-sm md:text-base">{a}</p>
        </motion.div>
      )}
    </div>
  );
};

/* ── CTA Button ── */
const CTAButton = ({ label = 'Start Creating →', size = 'md' }) => {
  const padding = size === 'lg' ? 'px-10 py-4 text-base' : 'px-8 py-3.5 text-sm';
  return (
    <button
      onClick={() => window.location.href = 'https://app.gotoflow.io'}
      className={`${padding} rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] flex items-center gap-2 group transition-all border border-pink-400/20`}
    >
      {label}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

/* ═══════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════ */
export const CarouselPage = () => (
  <MainLayout>
    <SEOHead />
    <Header />

    {/* 1 ── HERO */}
    <section className="pt-36 pb-20 px-6 relative z-10 w-full bg-[#050505] overflow-hidden flex flex-col items-center text-center">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[#ec4899]/[0.07] blur-[160px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
        <Badge><Sparkles className="w-3 h-3 text-pink-400" /> AI-Powered</Badge>

        <h1 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-white tracking-[-0.035em] leading-[1.1] mb-6 text-balance">
          AI Carousel Maker<br />
          <GradSpan>for Social Media</GradSpan>
        </h1>

        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Create high-converting carousels in seconds using AI — no blank page, no weak hooks, no wasted hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton label="Start Creating →" size="lg" />
        </div>
        <p className="text-xs text-zinc-600 mt-4">✓ No card required &nbsp;•&nbsp; ✓ First carousel in 60 sec</p>
      </motion.div>
    </section>

    {/* 2 ── PROBLEM */}
    <Section className="bg-[#050505]">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="text-center mb-14">
          <Badge>The Problem</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Why creating carousels <GradSpan>is so hard</GradSpan>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Most creators spend hours on a single carousel — and it still underperforms.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '💡', title: 'No ideas', desc: 'Staring at a blank screen, not knowing where to start.' },
            { icon: '🎣', title: 'Weak hooks', desc: 'First slide fails to stop the scroll — nobody reads the rest.' },
            { icon: '🗂️', title: 'Messy slides', desc: 'Poor structure makes the message hard to follow.' },
            { icon: '⏱️', title: 'Time-consuming', desc: 'Writing, designing, and tweaking takes hours per post.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 transition-colors">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>

    {/* 3 ── SOLUTION */}
    <Section className="bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 md:p-14 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Badge><Zap className="w-3 h-3 text-pink-400" /> The Solution</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
            GoToFlow turns your idea into a <GradSpan>full carousel</GradSpan>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Our AI carousel generator analyzes your topic, writes a scroll-stopping hook, structures your slides with proven frameworks, and fills each one with compelling content — in seconds.
          </p>
          <CTAButton label="Try It Free →" size="lg" />
        </motion.div>
      </div>
    </Section>

    {/* 4 ── HOW IT WORKS */}
    <Section className="bg-[#050505]">
      <div className="text-center mb-14">
        <Badge>How It Works</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Three steps to your <GradSpan>carousel</GradSpan>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: '01', icon: <Target className="w-6 h-6 text-pink-400" />, title: 'Input your idea or link', desc: 'Paste a topic, URL, or competitor post. GoToFlow reads the context.' },
          { step: '02', icon: <Sparkles className="w-6 h-6 text-pink-400" />, title: 'AI generates the structure', desc: 'The AI writes a hook, outlines slides, and drafts all the copy.' },
          { step: '03', icon: <Layers className="w-6 h-6 text-pink-400" />, title: 'Get your full carousel', desc: 'Review, edit, export — ready for Instagram, LinkedIn, or Telegram.' },
        ].map((item) => (
          <motion.div key={item.step}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-pink-500/20 transition-colors group">
            <div className="text-5xl font-black text-white/[0.04] absolute top-4 right-6 select-none">{item.step}</div>
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>

    {/* 5 ── FEATURES */}
    <Section className="bg-[#050505]">
      <div className="text-center mb-14">
        <Badge><BarChart3 className="w-3 h-3 text-pink-400" /> Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Everything you need to <GradSpan>go viral</GradSpan>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: '🤖', title: 'AI Carousel Generator', desc: 'Full carousel from a single sentence — hooks, slides, CTA included.' },
          { icon: '🎣', title: 'Hook Generation', desc: 'Stop-scroll openers crafted by AI based on top-performing patterns.' },
          { icon: '🗂️', title: 'Slide Structure', desc: 'Logical flow built on proven carousel frameworks.' },
          { icon: '🔍', title: 'Competitor → Content', desc: 'Turn a competitor post or URL into fresh content ideas instantly.' },
          { icon: '🔄', title: 'Multiple Variations', desc: 'Generate several angles and pick the one that resonates most.' },
          { icon: '📐', title: 'Platform-ready Output', desc: 'Formats tuned for Instagram, LinkedIn, and Telegram.' },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 transition-colors">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white mb-1 text-sm">{f.title}</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* 6 ── DIFFERENTIATION */}
    <Section className="bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 md:p-14">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Badge>Why GoToFlow</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            GoToFlow is <GradSpan>not a template tool</GradSpan>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Canva, Slidesgo, and similar tools give you a blank canvas and a pretty template. You still have to come up with all the ideas, write all the copy, and figure out the structure yourself.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                GoToFlow starts with your intent and produces the actual content — hooks, body copy, slide-by-slide breakdowns — using AI trained on thousands of high-performing social media carousels.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'Writes the content, not just the design',
                'Generates ideas when you have none',
                'Uses proven viral frameworks automatically',
                'Works for any niche or industry',
                'Produces multiple variations instantly',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>

    {/* 7 ── USE CASES */}
    <Section className="bg-[#050505]">
      <div className="text-center mb-14">
        <Badge><Users className="w-3 h-3 text-pink-400" /> Who It's For</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Built for <GradSpan>everyone who posts</GradSpan>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { emoji: '🎨', role: 'Creators', desc: 'Grow your audience faster by posting educational and entertaining carousels without the creative block.' },
          { emoji: '🚀', role: 'Founders', desc: 'Share your expertise, build in public, and attract customers — without hiring a content team.' },
          { emoji: '📊', role: 'Marketers', desc: 'Scale content production across multiple accounts and campaigns with AI-generated carousel copy.' },
        ].map((u) => (
          <motion.div key={u.role}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-pink-500/20 transition-colors text-center">
            <div className="text-4xl mb-4">{u.emoji}</div>
            <h3 className="font-bold text-white text-lg mb-3">{u.role}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{u.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>

    {/* 8 ── SEO TEXT BLOCK */}
    <Section className="bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
          What is an AI Carousel Maker?
        </h2>
        <div className="text-zinc-400 leading-relaxed space-y-4 text-base">
          <p>
            An <strong className="text-zinc-200">AI carousel maker</strong> is a tool that uses artificial intelligence to automatically generate multi-slide social media posts — commonly known as carousels — for platforms like Instagram, LinkedIn, and Telegram. Instead of writing each slide manually, you provide a topic or idea, and the AI produces a structured, hook-led carousel ready to publish.
          </p>
          <p>
            GoToFlow's <strong className="text-zinc-200">Instagram carousel</strong> generator goes beyond simple templates. It understands context, applies proven content frameworks, and crafts each slide with a clear purpose — from a scroll-stopping opener to a closing call-to-action.
          </p>
          <p>
            The benefits of <strong className="text-zinc-200">AI content</strong> generation for carousels are significant: faster production, consistent quality, and the ability to test multiple angles without extra effort. Whether you're a creator, marketer, or founder, an AI carousel maker removes the hardest part of social media — knowing what to say.
          </p>
        </div>
      </div>
    </Section>

    {/* 9 ── FAQ */}
    <Section className="bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16">
        <div className="text-center mb-14">
          <Badge>FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Common <GradSpan>questions</GradSpan>
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              q: 'What is an AI carousel maker?',
              a: 'An AI carousel maker is a tool that automatically generates multi-slide social media posts using artificial intelligence. You provide a topic or idea, and the AI writes the hook, structures the slides, and fills each one with content — in seconds.',
            },
            {
              q: 'Can AI create Instagram carousels?',
              a: 'Yes. GoToFlow generates carousel content optimized for Instagram, LinkedIn, and Telegram. The AI writes hook-led copy, structures the slides logically, and ensures each carousel is built to drive saves and shares.',
            },
            {
              q: 'Is GoToFlow better than Canva for carousels?',
              a: 'They solve different problems. Canva helps you design; GoToFlow writes the content. GoToFlow generates the ideas, hooks, and copy — then you can use any design tool to format it. Many users combine both.',
            },
            {
              q: 'How long does it take to generate a carousel?',
              a: 'Under 60 seconds. Input your idea or paste a URL, and GoToFlow delivers a full carousel structure with copy for every slide, ready to review and publish.',
            },
            {
              q: 'Do I need to be a good writer to use GoToFlow?',
              a: 'No. GoToFlow is designed for people who want great carousel content without being professional copywriters. Just describe your topic and the AI handles the rest.',
            },
          ].map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </Section>

    {/* 10 ── FINAL CTA */}
    <section className="py-24 md:py-32 px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ec4899]/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <Badge><Sparkles className="w-3 h-3 text-pink-400" /> Get Started Free</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 text-balance">
          Start Creating Your <GradSpan>Carousel</GradSpan> Now
        </h2>
        <p className="text-zinc-500 mb-10 leading-relaxed">
          Join thousands of creators, founders and marketers who create scroll-stopping carousels in seconds with GoToFlow AI.
        </p>
        <CTAButton label="Start Creating Your Carousel →" size="lg" />
        <p className="text-xs text-zinc-600 mt-5">✓ Free to start &nbsp;•&nbsp; ✓ No credit card &nbsp;•&nbsp; ✓ Instant results</p>
      </motion.div>
    </section>

    <Footer />
    <CookieBanner />
  </MainLayout>
);
