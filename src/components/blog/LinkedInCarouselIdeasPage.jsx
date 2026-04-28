import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainLayout } from '../MainLayout';
import { CookieBanner } from '../CookieBanner';
import { useIsMobile } from '../../hooks/useIsMobile';

const CTA_URL = 'https://gotoflow.io/linkedin-carousel-maker';

/* ── SEO Head ── */
const ArticleSEOHead = () => {
  useEffect(() => {
    document.title = '50 LinkedIn Carousel Ideas That Actually Get Engagement (2026) | GoToFlow';

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href, hreflang = null) => {
      let sel = `link[rel="${rel}"]`;
      if (hreflang) sel += `[hreflang="${hreflang}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      if (hreflang) el.setAttribute('hreflang', hreflang);
    };

    const desc = 'Explore 50 LinkedIn carousel ideas with examples, hooks, and structures. Learn how to create high-performing carousels faster using AI.';
    setMeta('description', desc);
    setMeta('og:title', '50 LinkedIn Carousel Ideas That Actually Get Engagement (2026) | GoToFlow', true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', 'https://gotoflow.io/blog/linkedin-carousel-ideas', true);
    setLink('canonical', 'https://gotoflow.io/blog/linkedin-carousel-ideas');

    /* Hreflang */
    setLink('alternate', 'https://gotoflow.io/blog/linkedin-carousel-ideas', 'en');
    setLink('alternate', 'https://gotoflow.io/ru/blog/idei-karuselej-linkedin', 'ru');

    /* JSON-LD Schema */
    const schemaId = 'linkedin-carousel-ideas-schema';
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '50 LinkedIn Carousel Ideas That Actually Get Engagement',
        description: desc,
        author: { '@type': 'Organization', name: 'GoToFlow' },
        publisher: { '@type': 'Organization', name: 'GoToFlow', url: 'https://gotoflow.io' },
        mainEntityOfPage: 'https://gotoflow.io/blog/linkedin-carousel-ideas',
        datePublished: '2026-04-28',
        dateModified: '2026-04-28',
      });
      document.head.appendChild(script);
    }

    return () => {
      document.title = 'GoToFlow';
      const s = document.getElementById(schemaId);
      if (s) s.remove();
      
      // Cleanup hreflangs on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, []);
  return null;
};

/* ── Breadcrumbs ── */
const Breadcrumbs = () => (
  <nav className="pt-28 pb-4 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto flex items-center gap-1.5 text-sm text-zinc-500">
      <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link to="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-400 truncate">LinkedIn Carousel Ideas</span>
    </div>
  </nav>
);

/* ── Hero ── */
const ArticleHero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="pb-16 md:pb-20 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">LinkedIn Content Guide</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          50 LinkedIn Carousel Ideas That Actually Get Engagement
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-[1.7] mb-10 max-w-2xl">
          Get 50 ready-to-use LinkedIn carousel ideas and turn them into high-performing slides in minutes.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.3 }}>
          <a href={CTA_URL} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_35px_rgba(236,72,153,0.3)] text-sm border border-pink-400/20 group">
            Try Carousel Generator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Inline Product Block ── */
const InlineProductBlock = ({ text, to }) => (
  <div className="relative my-16 md:my-20 p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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

/* ── Section heading ── */
const Section = ({ title, children, count }) => (
  <div className="mb-16 md:mb-20">
    <div className="flex items-baseline gap-3 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">{title}</h2>
      {count && <span className="text-xs text-zinc-500 font-medium tracking-wide">{count} ideas</span>}
    </div>
    {children}
  </div>
);

/* ── Idea card (numbered, visually separated) ── */
const IdeaList = ({ items, startNum = 1 }) => (
  <div className="space-y-3">
    {items.map((item, i) => (
      <div key={i} className="flex gap-4 py-4 px-4 md:px-5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.035] transition-colors">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[11px] font-bold text-pink-400 tabular-nums mt-0.5">
          {startNum + i}
        </span>
        <div className="min-w-0">
          <p className="text-zinc-100 font-medium text-[15px] leading-[1.5]">{item.title}</p>
          {item.desc && <p className="text-zinc-400 text-[13px] mt-1.5 leading-[1.6]">{item.desc}</p>}
        </div>
      </div>
    ))}
  </div>
);

/* ── Article Body ── */
const ArticleBody = () => (
  <article className="pt-4 pb-8 px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
    {/* Ambient glow — top of article */}
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-pink-500/[0.035] blur-[160px] rounded-full pointer-events-none" />
    {/* Ambient glow — mid article */}
    <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    {/* Ambient glow — lower article */}
    <div className="absolute top-[65%] left-[-10%] w-[500px] h-[400px] bg-orange-500/[0.025] blur-[180px] rounded-full pointer-events-none" />
    <div className="max-w-3xl mx-auto relative z-10">

      <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-5">
        LinkedIn carousels drive 3-5x more engagement than text-only posts. They boost dwell time, increase saves, and position you as a thought leader. But the biggest challenge isn't design — it's knowing <strong className="text-white">what to post</strong>.
      </p>
      <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85] mb-14 md:mb-16">
        Here are 50 carousel ideas, organized into 8 categories, that you can use right now. Each one is built to drive saves, shares, and profile visits.
      </p>

      {/* ── 1. Thought Leadership (7 ideas) ── */}
      <Section title="Thought Leadership and Industry Insights" count="7">
        <IdeaList startNum={1} items={[
          { title: '"5 trends reshaping [your industry] in 2026"', desc: 'Position yourself as a forward thinker with data-backed predictions.' },
          { title: '"What I learned from 10 years in [field]"', desc: 'Reflective carousel that builds trust through experience.' },
          { title: '"Unpopular opinions about [topic]"', desc: 'Drives comments and debate — high engagement format.' },
          { title: '"The future of [industry] — my predictions"', desc: 'Forecast slides with supporting data or observations.' },
          { title: '"3 myths about [topic] that need to die"', desc: 'Myth-busting format that educates and entertains.' },
          { title: '"Lessons from [famous company]\'s strategy"', desc: 'Case study breakdown — borrow authority from known brands.' },
          { title: '"How [new technology] will change [field]"', desc: 'Tech trend analysis — timely and shareable.' },
        ]} />
      </Section>

      {/* ── 2. How-To & Educational (8 ideas) ── */}
      <Section title="How-To and Educational" count="8">
        <IdeaList startNum={8} items={[
          { title: '"Step-by-step guide to [skill or process]"', desc: 'Actionable tutorial format — one step per slide.' },
          { title: '"The beginner\'s roadmap to [topic]"', desc: 'Visual onboarding for people new to your field.' },
          { title: '"How to [achieve result] without [common tool]"', desc: 'Contrarian alternative approach that sparks curiosity.' },
          { title: '"5 frameworks every [role] should know"', desc: 'Framework carousel — high save rate.' },
          { title: '"How I went from [A] to [B] in [timeframe]"', desc: 'Transformation story with clear before/after.' },
          { title: '"The exact process I use to [result]"', desc: 'Behind-the-scenes reveal of your workflow.' },
          { title: '"Mistakes I made so you don\'t have to"', desc: 'Learn-from-failure format — relatable and useful.' },
          { title: '"A complete checklist for [task]"', desc: 'Reference-style content people save and revisit.' },
        ]} />
      </Section>

      {/* ── 3. Data & Statistics (5 ideas) ── */}
      <Section title="Data and Statistics" count="5">
        <IdeaList startNum={16} items={[
          { title: '"10 stats that prove [point]"', desc: 'Data-driven authority — one stat per slide.' },
          { title: '"Before vs After: [metric] results"', desc: 'Visual comparison format with concrete numbers.' },
          { title: '"What the data says about [topic]"', desc: 'Research summary carousel — cite your sources.' },
          { title: '"ROI breakdown: [strategy or tool]"', desc: 'Numbers-first content that appeals to decision-makers.' },
          { title: '"Industry benchmarks for [metric] in 2026"', desc: 'Reference guide people will save and share.' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Generate carousel ideas instantly with AI"
        to="/linkedin-carousel-maker"
      />

      {/* ── 4. Personal Branding (7 ideas) ── */}
      <Section title="Personal Branding" count="7">
        <IdeaList startNum={21} items={[
          { title: '"My morning routine as a [role]"', desc: 'Day-in-the-life format — builds personal connection.' },
          { title: '"Things I wish I knew before starting [career]"', desc: 'Reflective storytelling that resonates with peers.' },
          { title: '"What nobody tells you about [role or industry]"', desc: 'Insider perspective — feels exclusive and honest.' },
          { title: '"The tools I use daily as a [role]"', desc: 'Tool stack carousel — practical and save-worthy.' },
          { title: '"My biggest failure and what I learned"', desc: 'Vulnerability-driven engagement — humanizes your brand.' },
          { title: '"5 books that changed how I work"', desc: 'Curated recommendation list with brief takeaways.' },
          { title: '"Behind the scenes of my [project or company]"', desc: 'Transparency content that builds trust.' },
        ]} />
      </Section>

      {/* ── 5. Listicles & Quick Wins (6 ideas) ── */}
      <Section title="Listicles and Quick Wins" count="6">
        <IdeaList startNum={28} items={[
          { title: '"7 free tools every [role] needs"', desc: 'Resource roundup — consistently high engagement.' },
          { title: '"10 LinkedIn tips that actually work"', desc: 'Platform-specific advice from personal experience.' },
          { title: '"5 prompts for better AI content"', desc: 'Prompt engineering guide — practical and timely.' },
          { title: '"8 habits of successful [role]s"', desc: 'Aspirational list backed by real observations.' },
          { title: '"3 things to stop doing on LinkedIn"', desc: 'Contrarian advice that sparks conversation.' },
          { title: '"6 newsletters worth subscribing to"', desc: 'Curated discovery — positions you as a connector.' },
        ]} />
      </Section>

      {/* ── 6. Engagement Drivers (5 ideas) ── */}
      <Section title="Engagement Drivers" count="5">
        <IdeaList startNum={34} items={[
          { title: '"Agree or disagree? [bold statement]"', desc: 'Debate-starter format — drives comments fast.' },
          { title: '"Rate these [options] from best to worst"', desc: 'Interactive ranking that invites participation.' },
          { title: '"Which one would you choose?"', desc: 'A/B comparison carousel — simple and effective.' },
          { title: '"Fill in the blank: The best [strategy] is ___"', desc: 'Comment magnet — boosts algorithmic reach.' },
          { title: '"Tag someone who needs to see this"', desc: 'Shareability hook — expands your audience.' },
        ]} />
      </Section>

      {/* ── 7. Content Creation & Strategy (6 ideas) ── */}
      <Section title="Content Creation and Strategy" count="6">
        <IdeaList startNum={39} items={[
          { title: '"My content strategy in one carousel"', desc: 'Meta content about content — creators love this.' },
          { title: '"How to repurpose 1 piece of content into 10"', desc: 'Content multiplication framework.' },
          { title: '"The anatomy of a viral LinkedIn post"', desc: 'Format deconstruction — educational and actionable.' },
          { title: '"Content calendar template for [month]"', desc: 'Planning resource people bookmark immediately.' },
          { title: '"How to write hooks that stop the scroll"', desc: 'Copywriting technique with real examples.' },
          { title: '"What I post vs what performs best"', desc: 'Honest analysis that builds credibility.' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Turn any idea into a ready-to-post carousel in seconds"
        to="/ai-content-generator"
      />

      {/* ── 8. Career & Professional Growth (6 ideas) ── */}
      <Section title="Career and Professional Growth" count="6">
        <IdeaList startNum={45} items={[
          { title: '"Skills that will be in demand by 2027"', desc: 'Future-proof career advice with a clear takeaway.' },
          { title: '"How to negotiate your salary — step by step"', desc: 'Practical career guidance in a visual format.' },
          { title: '"Red flags in job descriptions"', desc: 'Job seeker content — massively shareable.' },
          { title: '"How to transition into [new role]"', desc: 'Career pivot guide — structured and clear.' },
          { title: '"5 side projects that can boost your career"', desc: 'Actionable growth tips beyond the 9-to-5.' },
          { title: '"What hiring managers actually look for"', desc: 'Insider knowledge that helps job seekers stand out.' },
        ]} />
      </Section>

      {/* ── How to create ── */}
      <Section title="How to Create These Carousels">
        <div className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <div className="space-y-5">
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              The traditional carousel process — writing copy, designing slides in Canva, formatting everything — takes 1 to 3 hours per carousel. Most creators don't have that time.
            </p>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              With <strong className="text-white">GoToFlow</strong>, you enter a topic or paste a link. The AI builds a complete carousel — hook, slide copy, structure, and layout — in under 60 seconds.
            </p>
            <p className="text-zinc-300 text-[15px] md:text-base leading-[1.85]">
              You control the tone of voice, structure, and final result. It removes the bottleneck between having an idea and publishing it.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Tips ── */}
      <Section title="Tips for High-Performing LinkedIn Carousels">
        <div className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <ul className="space-y-5">
            {[
              'Start with a bold, specific hook on slide 1 — the scroll-stopper matters most',
              'Keep each slide to one clear idea, 2 to 4 short lines max',
              'Use a consistent visual style so people recognize your carousels instantly',
              'End with a CTA: ask a question, invite a comment, or link to a resource',
              'Post between 8-10am on Tuesday through Thursday for maximum reach',
              'Repurpose: turn one carousel into a text post, a newsletter excerpt, and a video script',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3.5 text-zinc-300 text-[15px] md:text-base leading-[1.7]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </Section>

    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'What makes a good LinkedIn carousel?', a: 'A strong hook on slide 1, one idea per slide, clean visuals, and a clear CTA at the end. The best carousels teach something valuable in a skimmable format.' },
  { q: 'How many slides should a LinkedIn carousel have?', a: 'Between 6 and 12 slides is the sweet spot. Enough to deliver value, not so many that people drop off.' },
  { q: 'Can AI generate LinkedIn carousel ideas?', a: 'Yes. Tools like GoToFlow can generate carousel ideas, write slide copy, and build the full structure from a single topic or link — in under 60 seconds.' },
  { q: 'How often should I post carousels on LinkedIn?', a: '2-3 times per week is ideal for most creators. Consistency matters more than volume.' },
  { q: 'What size should LinkedIn carousels be?', a: 'The recommended size is 1080x1350px (4:5 ratio). This takes up the most screen real estate in the feed.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.35 }}><p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-300 leading-[1.7] text-sm md:text-base">{item.a}</p></motion.div>}
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-16 md:py-20 px-6 relative z-10 w-full bg-[#050505] overflow-hidden">
      {/* Ambient glow — FAQ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => <FAQItem key={i} item={item} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />)}
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: isMobile ? 0.6 : 0.8 }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
            Create LinkedIn Carousels in Minutes
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-[1.7] mb-8 max-w-lg mx-auto">
            Stop spending hours designing slides. Generate structured, branded carousels instantly with GoToFlow.
          </p>
          <a href={CTA_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
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
      Explore more ideas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </section>
);

/* ── Page ── */
export const LinkedInCarouselIdeasPage = () => (
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
