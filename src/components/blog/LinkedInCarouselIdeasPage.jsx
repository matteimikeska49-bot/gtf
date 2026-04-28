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
    document.title = 'LinkedIn Carousel Ideas That Actually Get Engagement (2026)';

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
    };

    setMeta('description', '20+ LinkedIn carousel ideas that get real engagement. Learn how to create high-performing carousels and grow your reach faster.');
    setMeta('og:title', 'LinkedIn Carousel Ideas That Actually Get Engagement (2026)', true);
    setMeta('og:description', '20+ LinkedIn carousel ideas that get real engagement. Learn how to create high-performing carousels and grow your reach faster.', true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', 'https://gotoflow.io/blog/linkedin-carousel-ideas', true);
    setLink('canonical', 'https://gotoflow.io/blog/linkedin-carousel-ideas');

    /* JSON-LD Schema */
    const schemaId = 'linkedin-carousel-ideas-schema';
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'LinkedIn Carousel Ideas That Actually Get Engagement',
        description: '20+ LinkedIn carousel ideas that get real engagement. Learn how to create high-performing carousels and grow your reach faster.',
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
    <section className="pb-12 px-6 relative z-10 w-full bg-[#050505]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#ec4899]/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-zinc-300 font-medium">LinkedIn Content Ideas</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
          LinkedIn Carousel Ideas That Actually Get Engagement
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: 0.2 }} className="text-base md:text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
          Struggling with what to post? Here are proven carousel ideas — organized by category — that drive saves, shares, and profile visits on LinkedIn.
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
  <div className="my-12 p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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

/* ── Article Section Helper ── */
const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 leading-snug">{title}</h2>
    {children}
  </div>
);

const IdeaList = ({ items }) => (
  <ol className="space-y-3 list-decimal list-inside marker:text-pink-500/70 marker:font-semibold">
    {items.map((item, i) => (
      <li key={i} className="text-zinc-300 text-[15px] leading-relaxed pl-1">
        <span className="font-medium text-zinc-200">{item.title}</span>
        {item.desc && <span className="text-zinc-500"> — {item.desc}</span>}
      </li>
    ))}
  </ol>
);

/* ── Article Body ── */
const ArticleBody = () => (
  <article className="py-8 px-6 relative z-10 w-full bg-[#050505]">
    <div className="max-w-3xl mx-auto prose-invert">

      <p className="text-zinc-400 text-[15px] leading-[1.8] mb-8">
        LinkedIn carousels are one of the highest-performing formats on the platform. They drive 3–5× more engagement than text-only posts, boost dwell time, and position you as a thought leader. But the biggest challenge isn't design — it's knowing <strong className="text-zinc-200">what to post</strong>.
      </p>
      <p className="text-zinc-400 text-[15px] leading-[1.8] mb-10">
        Below are 50+ carousel ideas, organized into categories, that you can use right now. Each one is designed to drive saves, shares, and profile visits.
      </p>

      {/* ── Category 1 ── */}
      <Section title="🎯 Thought Leadership & Industry Insights">
        <IdeaList items={[
          { title: '"5 trends reshaping [your industry] in 2026"', desc: 'position yourself as a forward thinker' },
          { title: '"What I learned from 10 years in [field]"', desc: 'personal experience carousel' },
          { title: '"Unpopular opinions about [topic]"', desc: 'drive comments with controversy' },
          { title: '"The future of [industry] — my predictions"', desc: 'data-backed forecast slides' },
          { title: '"3 myths about [topic] that need to die"', desc: 'myth-busting format' },
          { title: '"Lessons from [famous company]\'s strategy"', desc: 'case study breakdown' },
          { title: '"How [new technology] will change [field]"', desc: 'tech trend analysis' },
        ]} />
      </Section>

      {/* ── Category 2 ── */}
      <Section title="📚 How-To & Educational">
        <IdeaList items={[
          { title: '"Step-by-step guide to [skill/process]"', desc: 'actionable tutorial carousel' },
          { title: '"The beginner\'s roadmap to [topic]"', desc: 'onboarding-style content' },
          { title: '"How to [achieve result] without [common tool]"', desc: 'alternative approach' },
          { title: '"5 frameworks every [role] should know"', desc: 'framework carousel' },
          { title: '"How I went from [A] to [B] in [timeframe]"', desc: 'transformation story' },
          { title: '"The exact process I use to [result]"', desc: 'behind-the-scenes reveal' },
          { title: '"Mistakes I made so you don\'t have to"', desc: 'learn-from-failure format' },
          { title: '"A complete checklist for [task]"', desc: 'save-worthy reference' },
        ]} />
      </Section>

      {/* ── Category 3 ── */}
      <Section title="📊 Data & Stats">
        <IdeaList items={[
          { title: '"10 stats that prove [point]"', desc: 'data-driven authority' },
          { title: '"Before vs After: [metric] results"', desc: 'visual comparison format' },
          { title: '"What the data says about [topic]"', desc: 'research summary carousel' },
          { title: '"ROI breakdown: [strategy/tool]"', desc: 'numbers-first content' },
          { title: '"Industry benchmarks for [metric] in 2026"', desc: 'reference guide' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Generate carousel ideas instantly with AI"
        to="/linkedin-carousel-maker"
      />

      {/* ── Category 4 ── */}
      <Section title="🧠 Personal Branding">
        <IdeaList items={[
          { title: '"My morning routine as a [role]"', desc: 'day-in-the-life format' },
          { title: '"Things I wish I knew before starting [career]"', desc: 'reflective storytelling' },
          { title: '"What nobody tells you about [role/industry]"', desc: 'insider perspective' },
          { title: '"The tools I use daily as a [role]"', desc: 'tool stack carousel' },
          { title: '"My biggest failure and what I learned"', desc: 'vulnerability-driven engagement' },
          { title: '"5 books that changed how I [work/think]"', desc: 'curated recommendation' },
          { title: '"Behind the scenes of my [project/company]"', desc: 'transparency content' },
        ]} />
      </Section>

      {/* ── Category 5 ── */}
      <Section title="⚡ Listicles & Quick Wins">
        <IdeaList items={[
          { title: '"7 free tools every [role] needs"', desc: 'resource roundup' },
          { title: '"10 LinkedIn tips that actually work"', desc: 'platform-specific advice' },
          { title: '"5 prompts for better AI content"', desc: 'prompt engineering guide' },
          { title: '"8 habits of successful [role]s"', desc: 'aspirational list' },
          { title: '"3 things to stop doing on LinkedIn"', desc: 'contrarian advice' },
          { title: '"6 newsletters worth subscribing to"', desc: 'curated discovery' },
        ]} />
      </Section>

      {/* ── Category 6 ── */}
      <Section title="🔥 Engagement Drivers">
        <IdeaList items={[
          { title: '"Agree or disagree? [bold statement]"', desc: 'debate-starter format' },
          { title: '"Rate these [options] from best to worst"', desc: 'interactive ranking' },
          { title: '"Which one would you choose?"', desc: 'A/B comparison carousel' },
          { title: '"Fill in the blank: The best [tool/strategy] is ___"', desc: 'comment magnet' },
          { title: '"Tag someone who needs to see this"', desc: 'shareability hook' },
        ]} />
      </Section>

      {/* ── Category 7 ── */}
      <Section title="💡 Content Creation & Strategy">
        <IdeaList items={[
          { title: '"My content strategy in one carousel"', desc: 'meta content about content' },
          { title: '"How to repurpose 1 piece of content into 10"', desc: 'content multiplication' },
          { title: '"The anatomy of a viral LinkedIn post"', desc: 'format deconstruction' },
          { title: '"Content calendar template for [month]"', desc: 'planning resource' },
          { title: '"How to write hooks that stop the scroll"', desc: 'copywriting technique' },
        ]} />
      </Section>

      <InlineProductBlock
        text="Turn your ideas into slides in seconds"
        to="/ai-content-generator"
      />

      {/* ── Category 8 ── */}
      <Section title="🛠 Career & Professional Growth">
        <IdeaList items={[
          { title: '"Skills that will be in demand by 2027"', desc: 'future-proof career advice' },
          { title: '"How to negotiate your salary — step by step"', desc: 'practical career guidance' },
          { title: '"Red flags in job descriptions"', desc: 'job seeker content' },
          { title: '"How to transition into [new role]"', desc: 'career pivot guide' },
          { title: '"5 side projects that can boost your career"', desc: 'actionable growth tips' },
        ]} />
      </Section>

      {/* ── How to create section ── */}
      <Section title="How to Actually Create These Carousels">
        <div className="space-y-4">
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            Having ideas is one thing — turning them into polished, multi-slide carousels is another. The traditional process involves writing copy, designing each slide in Canva or Figma, and formatting everything manually. That's 1–3 hours per carousel.
          </p>
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            With an AI carousel generator like <strong className="text-zinc-200">GoToFlow</strong>, you can skip the grunt work. Just enter your topic or paste a link, and the AI builds a complete carousel — hook, slide copy, structure, and visual layout — in under 60 seconds.
          </p>
          <p className="text-zinc-400 text-[15px] leading-[1.8]">
            You stay in control of the tone of voice, the structure, and the final result. It's not about replacing creativity — it's about removing the bottleneck between having an idea and publishing it.
          </p>
        </div>
      </Section>

      {/* ── Tips section ── */}
      <Section title="Tips for High-Performing LinkedIn Carousels">
        <ul className="space-y-3">
          {[
            'Start with a bold, specific hook on slide 1 — the scroll-stopper matters most',
            'Keep each slide to one clear idea, 2–4 short lines max',
            'Use a consistent visual style so people recognize your carousels instantly',
            'End with a CTA: ask a question, invite a comment, or link to a resource',
            'Post between 8–10am on Tuesday through Thursday for maximum reach',
            'Repurpose: turn one carousel into a text post, a newsletter excerpt, and a video script',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400 text-[15px] leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500/60 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </Section>

    </div>
  </article>
);

/* ── FAQ ── */
const faqItems = [
  { q: 'What makes a good LinkedIn carousel?', a: 'A strong hook on slide 1, one idea per slide, clean visuals, and a clear CTA at the end. The best carousels teach something valuable in a skimmable format.' },
  { q: 'How many slides should a LinkedIn carousel have?', a: 'Between 6 and 12 slides is the sweet spot. Enough to deliver value, not so many that people drop off.' },
  { q: 'Can AI generate LinkedIn carousel ideas?', a: 'Yes. Tools like GoToFlow can generate carousel ideas, write slide copy, and build the full structure from a single topic or link — in under 60 seconds.' },
  { q: 'How often should I post carousels on LinkedIn?', a: '2–3 times per week is ideal for most creators. Consistency matters more than volume.' },
  { q: 'What size should LinkedIn carousels be?', a: 'The recommended size is 1080×1350px (4:5 ratio). This takes up the most screen real estate in the feed.' },
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-pink-500/30 bg-white/[0.03]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'}`} onClick={onClick}>
    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
      <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>{item.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>
    {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.35 }}><p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-400 leading-relaxed text-sm md:text-base">{item.a}</p></motion.div>}
  </div>
);

const ArticleFAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="py-16 md:py-20 px-6 relative z-10 w-full bg-[#050505]">
      <div className="max-w-3xl mx-auto">
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
            Generate LinkedIn Carousels in Seconds
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Stop spending hours on slides. Enter a topic, and GoToFlow's AI builds a complete carousel — hook, copy, structure — ready to publish.
          </p>
          <a href={CTA_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.35)] text-base border border-pink-400/20 group">
            Try GoToFlow <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-zinc-500 mt-4">Free • No credit card required</p>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Back to Blog Hub ── */
const BackToBlog = () => (
  <section className="pb-16 px-6 relative z-10 w-full bg-[#050505] flex justify-center">
    <Link to="/blog" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors text-sm font-medium">
      Explore more content ideas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
