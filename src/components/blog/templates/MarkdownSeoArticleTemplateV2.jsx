import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, Layers3, Sparkles } from 'lucide-react';
import { getAppUrlWithRef } from '../../../utils/url';

const CTA_URL = 'https://app.gotoflow.io';

const isExternalHref = (href) => /^https?:\/\//.test(href);

const ArticleLink = ({ href, className, children }) => {
  if (!href) return <span className={className}>{children}</span>;

  if (href.startsWith('/')) {
    return <Link to={href} className={className}>{children}</Link>;
  }

  return (
    <a href={href} className={className} target={isExternalHref(href) ? '_blank' : undefined} rel={isExternalHref(href) ? 'noreferrer' : undefined}>
      {children}
    </a>
  );
};

const parseInlineMarkdown = (text) => {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={parts.length} className="font-semibold text-white">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={parts.length} className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.92em] text-pink-100">{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <ArticleLink key={parts.length} href={linkMatch[2]} className="text-pink-300 underline decoration-pink-300/30 underline-offset-4 transition-colors hover:text-orange-200 hover:decoration-orange-200/50">
            {linkMatch[1]}
          </ArticleLink>
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const parseMarkdownBlocks = (markdown) => {
  const lines = markdown.split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: 'code', language, text: code.join('\n') });
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quote.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push({ type: 'quote', text: quote.join(' ') });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().match(/^(#{1,4})\s+/) &&
      !lines[index].trim().startsWith('```') &&
      !lines[index].trim().startsWith('> ') &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
};

const MarkdownBody = ({ markdown, title }) => {
  const blocks = parseMarkdownBlocks(markdown);
  const normalizedTitle = title.trim().toLowerCase();
  const displayBlocks = blocks.filter((block, index) => !(
    index === 0 &&
    block.type === 'heading' &&
    block.level === 1 &&
    block.text.trim().toLowerCase() === normalizedTitle
  ));

  return (
    <div className="space-y-7">
      {displayBlocks.map((block, index) => {
        if (block.type === 'heading') {
          const HeadingTag = block.level <= 2 ? 'h2' : 'h3';
          return (
            <HeadingTag key={index} className={block.level <= 2 ? 'pt-5 text-2xl font-bold leading-tight tracking-tight text-white md:text-[32px]' : 'pt-3 text-xl font-semibold leading-snug tracking-tight text-white'}>
              {parseInlineMarkdown(block.text)}
            </HeadingTag>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="text-[15px] leading-[1.85] text-zinc-400 md:text-base">
              {parseInlineMarkdown(block.text)}
            </p>
          );
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag key={index} className={`space-y-3 text-[15px] leading-[1.75] text-zinc-300 md:text-base ${block.ordered ? 'list-decimal pl-6' : ''}`}>
              {block.items.map((item) => (
                <li key={item} className={block.ordered ? 'pl-1' : 'flex items-start gap-3'}>
                  {!block.ordered && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400/80" />}
                  <span>{parseInlineMarkdown(item)}</span>
                </li>
              ))}
            </ListTag>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={index} className="rounded-2xl border border-pink-400/15 bg-pink-500/[0.06] px-5 py-4 text-[15px] leading-[1.75] text-pink-50 md:px-6 md:text-base">
              {parseInlineMarkdown(block.text)}
            </blockquote>
          );
        }

        return (
          <pre key={index} className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-relaxed text-zinc-200">
            <code>{block.text}</code>
          </pre>
        );
      })}
    </div>
  );
};

const SectionShell = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="mb-6 flex items-center gap-3">
      {eyebrow && (
        <span className="rounded-full border border-pink-400/15 bg-pink-500/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-200">
          {eyebrow}
        </span>
      )}
    </div>
    {title && <h2 className="mb-7 text-2xl font-bold tracking-tight text-white md:text-[32px]">{title}</h2>}
    {children}
  </section>
);

const QuickAnswer = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_24px_120px_rgba(236,72,153,0.08)] md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-500/10">
          <Sparkles className="h-5 w-5 text-pink-300" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-200">Quick Answer</p>
          <h2 className="text-xl font-bold text-white md:text-2xl">What this article confirms</h2>
        </div>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {items.slice(0, 5).map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-[15px] leading-relaxed text-zinc-300">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
            <span>{parseInlineMarkdown(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const KeyTakeaway = ({ text }) => {
  if (!text) return null;

  return (
    <aside className="rounded-3xl border border-orange-300/15 bg-orange-400/[0.06] p-5 md:p-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">Key takeaway</p>
      <p className="text-base leading-relaxed text-orange-50 md:text-lg">{parseInlineMarkdown(text)}</p>
    </aside>
  );
};

const StepPhases = ({ phases }) => {
  if (!Array.isArray(phases) || phases.length === 0) return null;

  return (
    <SectionShell eyebrow="Workflow" title="Step-by-step phases">
      <div className="space-y-5">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.phase || phaseIndex} className="rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-5 md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 to-orange-500/15 text-sm font-bold text-orange-100 ring-1 ring-white/10">
                {phaseIndex + 1}
              </span>
              <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {(phase.items || []).map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                  <h4 className="mb-2 text-base font-semibold text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-zinc-400">{parseInlineMarkdown(item.text || '')}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};

const PromptAccordion = ({ prompts }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!Array.isArray(prompts) || prompts.length === 0) return null;

  return (
    <SectionShell eyebrow="Prompt library" title="Reusable prompts">
      <div className="space-y-3">
        {prompts.map((prompt, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={prompt.title || index} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-white">{prompt.title}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.06] bg-black/20 px-5 py-4">
                  <p className="text-sm leading-[1.8] text-zinc-300 md:text-[15px]">{parseInlineMarkdown(prompt.text || '')}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
};

const FormatsGrid = ({ formats }) => {
  if (!Array.isArray(formats) || formats.length === 0) return null;

  return (
    <SectionShell eyebrow="Formats" title="Useful article formats">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {formats.map((format) => (
          <article key={format.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <Layers3 className="mb-4 h-5 w-5 text-pink-300" />
            <h3 className="mb-2 text-base font-semibold text-white">{format.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">{parseInlineMarkdown(format.text || '')}</p>
            {format.example && (
              <p className="rounded-xl border border-white/[0.06] bg-black/25 px-3 py-2 text-xs leading-relaxed text-zinc-300">
                Example: {parseInlineMarkdown(format.example)}
              </p>
            )}
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

const ArticleExploreZone = ({ explore }) => {
  const tools = Array.isArray(explore?.tools) ? explore.tools : [];
  const guides = Array.isArray(explore?.guides) ? explore.guides : [];

  if (tools.length === 0 && guides.length === 0) return null;

  const renderCard = (item) => (
    <ArticleLink key={`${item.href}-${item.title}`} href={item.href} className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-pink-300/25 hover:bg-pink-500/[0.05]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-pink-100">{item.title}</h3>
        {isExternalHref(item.href || '') ? <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" /> : <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5" />}
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
    </ArticleLink>
  );

  return (
    <SectionShell id="explore-more" eyebrow="Explore more" title="Related tools and guides">
      <div className="grid gap-6 md:grid-cols-2">
        {tools.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Tools</p>
            <div className="space-y-3">{tools.map(renderCard)}</div>
          </div>
        )}
        {guides.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Guides</p>
            <div className="space-y-3">{guides.map(renderCard)}</div>
          </div>
        )}
      </div>
    </SectionShell>
  );
};

const FaqBlock = ({ faq }) => {
  if (!Array.isArray(faq) || faq.length === 0) return null;

  return (
    <SectionShell eyebrow="FAQ" title="Frequently asked questions">
      <div className="space-y-3">
        {faq.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-sm leading-[1.8] text-zinc-400 md:text-[15px]">{parseInlineMarkdown(item.answer || '')}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
};

const FinalCta = ({ cta }) => {
  if (!cta) return null;

  return (
    <section className="text-center">
      <div className="relative overflow-hidden rounded-[32px] border border-pink-300/15 bg-gradient-to-br from-pink-500/[0.12] via-white/[0.035] to-orange-500/[0.10] p-7 shadow-[0_30px_140px_rgba(236,72,153,0.12)] md:p-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-4xl">{cta.title}</h2>
          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-zinc-300">{cta.description}</p>
          <a href={getAppUrlWithRef(CTA_URL)} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_0_40px_rgba(236,72,153,0.35)] transition-all hover:scale-105 active:scale-[0.98] sm:w-auto">
            {cta.buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          {cta.microcopy && <p className="mt-4 text-xs text-zinc-500">{cta.microcopy}</p>}
        </div>
      </div>
      {cta.secondaryText && (
        <ArticleLink href={cta.secondaryHref || '#explore-more'} className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300">
          {cta.secondaryText}
        </ArticleLink>
      )}
    </section>
  );
};

const ArticleHero = ({ article }) => (
  <section className="relative overflow-hidden bg-[#050505] px-4 pb-12 pt-28 sm:px-6 md:pb-20">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-pink-500/[0.08] blur-[120px]" />
    <div className="pointer-events-none absolute left-1/4 top-28 h-[280px] w-[280px] rounded-full bg-orange-500/[0.06] blur-[100px]" />
    <div className="relative z-10 mx-auto max-w-[940px] text-center">
      <div className="mb-10 flex min-w-0 items-center justify-center gap-1.5 text-sm text-zinc-500">
        <Link to="/" className="transition-colors hover:text-zinc-300">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link to="/blog" className="transition-colors hover:text-zinc-300">Blog</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate text-zinc-400">{article.title}</span>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-pink-400" />
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-pink-200">{article.cluster}</span>
        </div>
      </div>

      <h1 className="mx-auto mb-6 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
        {article.title}
      </h1>
      <p className="mx-auto max-w-2xl text-lg leading-[1.65] text-zinc-400 md:text-xl">
        {article.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-500">
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{article.articleType}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{article.primaryKeyword}</span>
        {article.lastReviewed && <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Reviewed {article.lastReviewed}</span>}
      </div>
    </div>
  </section>
);

export const MarkdownSeoArticleTemplateV2 = ({ article }) => (
  <>
    <ArticleHero article={article} />
    <main className="relative bg-[#050505] px-4 pb-20 sm:px-6 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[520px] max-w-5xl rounded-full bg-gradient-to-b from-pink-500/[0.035] to-transparent blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col gap-14 md:gap-18">
        <QuickAnswer items={article.quickAnswer} />
        <KeyTakeaway text={article.keyTakeaway} />
        {article.body && (
          <article className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 md:p-8">
            <MarkdownBody markdown={article.body} title={article.title} />
          </article>
        )}
        <StepPhases phases={article.steps} />
        <PromptAccordion prompts={article.prompts} />
        <FormatsGrid formats={article.formats} />
        <ArticleExploreZone explore={article.explore} />
        <FaqBlock faq={article.faq} />
        <FinalCta cta={article.finalCta} />
      </div>
    </main>
  </>
);
