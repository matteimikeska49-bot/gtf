import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, Layers3, Sparkles } from 'lucide-react';
import { getAppUrlWithRef } from '../../../utils/url';

const CTA_URL = 'https://app.gotoflow.io';

const formatMonthYear = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch (e) {
    return null;
  }
};

const getArticleFreshnessMeta = (article) => {
  if (article.lastReviewed) {
    const formatted = formatMonthYear(article.lastReviewed);
    return formatted ? { source: "lastReviewed", label: "Reviewed", blockLabel: "LAST REVIEWED", formattedDate: formatted, displayText: `Reviewed ${formatted}` } : null;
  }
  if (article.updatedAt) {
    const formatted = formatMonthYear(article.updatedAt);
    return formatted ? { source: "updatedAt", label: "Updated", blockLabel: "UPDATED", formattedDate: formatted, displayText: `Updated ${formatted}` } : null;
  }
  if (article.createdAt) {
    const formatted = formatMonthYear(article.createdAt);
    return formatted ? { source: "createdAt", label: "Published", blockLabel: "PUBLISHED", formattedDate: formatted, displayText: `Published ${formatted}` } : null;
  }
  return null;
};

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

const parseInlineMarkdown = (text, context = 'normal') => {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={parts.length} className="font-semibold text-zinc-200">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={parts.length} className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.92em] text-pink-100">{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        let linkClass = "text-pink-300 underline decoration-pink-300/30 underline-offset-4 transition-colors hover:text-orange-200 hover:decoration-orange-200/50";
        if (context === 'related') {
          linkClass = "text-purple-300 font-semibold underline decoration-purple-300/30 underline-offset-4 transition-colors hover:text-purple-200";
        }
        parts.push(
          <ArticleLink key={parts.length} href={linkMatch[2]} className={linkClass}>
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

      const fullText = quote.join(' ');
      const calloutMatch = fullText.match(/^\[!([a-zA-Z0-9-]+)\]\s*(.*)$/i);

      if (calloutMatch) {
        const calloutLines = [...quote];
        calloutLines[0] = calloutLines[0].replace(/^\[!([a-zA-Z0-9-]+)\]\s*/i, '');
        if (!calloutLines[0]) calloutLines.shift();

        blocks.push({ 
          type: 'callout', 
          calloutType: calloutMatch[1].toLowerCase(), 
          text: calloutMatch[2],
          lines: calloutLines
        });
      } else {
        blocks.push({ type: 'quote', text: fullText, lines: quote });
      }
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

    if (trimmed.startsWith('|') && trimmed.endsWith('|') && index + 1 < lines.length && lines[index + 1].trim().startsWith('|') && lines[index + 1].trim().includes('---')) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith('|') && lines[index].trim().endsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const headers = tableLines[0].split('|').slice(1, -1).map(cell => cell.trim());
      const rows = tableLines.slice(2).map(rowLine => rowLine.split('|').slice(1, -1).map(cell => cell.trim()));
      blocks.push({ type: 'table', headers, rows });
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
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().startsWith('|') && lines[index].trim().endsWith('|'))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
};

const parseCalloutContent = (lines) => {
  if (!lines || lines.length === 0) return { title: null, bodyLines: [], actionLink: null };
  
  let title = null;
  let actionLink = null;
  let bodyLines = [...lines];

  if (bodyLines.length > 0 && bodyLines[0].startsWith('**') && bodyLines[0].endsWith('**')) {
    title = bodyLines[0];
    bodyLines.shift();
  }

  if (bodyLines.length > 0) {
    const lastLine = bodyLines[bodyLines.length - 1].trim();
    const linkMatch = lastLine.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      actionLink = { label: linkMatch[1], href: linkMatch[2] };
      bodyLines.pop();
    }
  }

  return { title, bodyLines, actionLink };
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
          if (block.level <= 2) {
            return (
              <h2 key={index} className="pt-10 pb-4 text-2xl font-bold leading-tight tracking-tight text-white md:text-[32px]">
                {renderFormattedHeading(block.text)}
              </h2>
            );
          }
          return (
            <div key={index} className="mt-10 mb-4 flex items-center gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
              <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight text-white">
                {parseInlineMarkdown(block.text)}
              </h3>
            </div>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="mb-6 text-[15px] leading-[1.85] text-zinc-400 md:text-base">
              {parseInlineMarkdown(block.text)}
            </p>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={index} className="my-8 w-full overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-lg">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    {block.headers.map((header, i) => (
                      <th key={i} className="border-b border-white/[0.1] bg-[#050505] px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-100">
                        {parseInlineMarkdown(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                      {row.map((cell, j) => (
                        <td key={j} className={`border-b border-white/[0.05] px-4 py-3 text-[15px] leading-relaxed ${j === 0 ? 'font-medium text-zinc-200' : 'text-zinc-400'}`}>
                          {parseInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'list') {
          return (
            <div key={index} className="space-y-4 my-8">
              {block.items.map((item, i) => (
                <div key={item} className="flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3 transition-colors hover:bg-white/[0.03] text-[15px] leading-[1.7] text-zinc-400 md:text-base">
                  {block.ordered ? (
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[11px] font-semibold text-zinc-300 mt-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                      {i + 1}
                    </span>
                  ) : (
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-pink-400/60" />
                  )}
                  <span>{parseInlineMarkdown(item)}</span>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'callout') {
          let badgeText = '';
          let badgeColor = '';
          let bgClass = '';
          let borderClass = '';
          let gradientLine = '';
          let icon = null;
          
          switch(block.calloutType) {
            case 'takeaway':
              badgeText = 'Key takeaway';
              badgeColor = 'text-pink-400';
              bgClass = 'bg-pink-500/[0.03]';
              borderClass = 'border-pink-500/15';
              gradientLine = 'from-pink-500/40 to-orange-500/40';
              break;
            case 'why':
            case 'why-matters':
              badgeText = 'Why this matters';
              badgeColor = 'text-pink-400';
              bgClass = 'bg-pink-500/[0.04]';
              borderClass = 'border-pink-500/20';
              gradientLine = 'from-pink-500/50 to-orange-500/50';
              icon = <Sparkles className="w-4 h-4 text-pink-400" />;
              break;
            case 'insight':
            case 'workflow':
              badgeText = 'Workflow insight';
              badgeColor = 'text-purple-400';
              bgClass = 'bg-purple-500/[0.03]';
              borderClass = 'border-purple-500/15';
              gradientLine = 'from-purple-500/40 to-pink-500/40';
              break;
            case 'mistake':
              badgeText = 'Common mistake';
              badgeColor = 'text-red-400';
              bgClass = 'bg-red-500/[0.03]';
              borderClass = 'border-red-500/15';
              gradientLine = 'from-red-500/40 to-orange-500/40';
              break;
            case 'tip':
              badgeText = 'Pro tip';
              badgeColor = 'text-emerald-400';
              bgClass = 'bg-emerald-500/[0.03]';
              borderClass = 'border-emerald-500/15';
              gradientLine = 'from-emerald-500/40 to-teal-500/40';
              break;
            case 'bestfor':
            case 'best-for':
              badgeText = 'Best for';
              badgeColor = 'text-blue-400';
              bgClass = 'bg-blue-500/[0.03]';
              borderClass = 'border-blue-500/15';
              gradientLine = 'from-blue-500/40 to-cyan-500/40';
              break;
            case 'product':
              badgeText = 'PRODUCT WORKFLOW';
              badgeColor = 'text-pink-400';
              bgClass = 'bg-[#0a0a0a]';
              borderClass = 'border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]';
              gradientLine = 'from-pink-500/80 to-orange-500/80 w-1.5';
              break;
            case 'related':
              badgeText = 'READ NEXT';
              badgeColor = 'text-purple-300';
              bgClass = 'bg-[#080808]';
              borderClass = 'border-purple-500/20';
              gradientLine = 'from-purple-500/40 to-indigo-500/40';
              break;
            default:
              badgeText = 'Note';
              badgeColor = 'text-zinc-400';
              bgClass = 'bg-white/[0.03]';
              borderClass = 'border-white/[0.1]';
              gradientLine = 'from-white/40 to-white/10';
              break;
          }

          let content = null;
          if (block.calloutType === 'product' || block.calloutType === 'related') {
            content = parseCalloutContent(block.lines);
          }

          return (
            <div key={index} className={`my-8 rounded-2xl border ${borderClass} ${bgClass} p-5 md:p-6 relative overflow-hidden`}>
              <div className={`absolute left-0 top-0 bottom-0 ${gradientLine.includes('w-') ? gradientLine : `w-1 ${gradientLine}`}`} />
              <div className="flex items-center gap-2 mb-3">
                {icon}
                <span className={`text-[12px] font-bold uppercase tracking-[0.15em] ${badgeColor}`}>{badgeText}</span>
              </div>
              {content ? (
                <div className="flex flex-col gap-3">
                  {content.title && (
                    <strong className="font-semibold text-zinc-200">
                      {parseInlineMarkdown(content.title.replace(/\*\*/g, ''))}
                    </strong>
                  )}
                  <div className="text-[15px] leading-[1.65] text-zinc-300 space-y-2">
                    {content.bodyLines.map((line, i) => (
                      <p key={i}>{parseInlineMarkdown(line, block.calloutType)}</p>
                    ))}
                  </div>
                  {content.actionLink && block.calloutType === 'product' && (
                    <div className="mt-2">
                      <ArticleLink 
                        href={content.actionLink.href} 
                        className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2.5 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-transform hover:scale-105 active:scale-[0.98]"
                      >
                        {content.actionLink.label}
                      </ArticleLink>
                    </div>
                  )}
                  {content.actionLink && block.calloutType === 'related' && (
                    <div className="mt-1">
                      <ArticleLink 
                        href={content.actionLink.href} 
                        className="text-purple-300 font-semibold underline decoration-purple-300/30 underline-offset-4 transition-colors hover:text-purple-200"
                      >
                        {content.actionLink.label}
                      </ArticleLink>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[15px] leading-[1.65] text-zinc-300">
                  {parseInlineMarkdown(block.text, block.calloutType)}
                </p>
              )}
            </div>
          );
        }

        if (block.type === 'quote') {
          return (
            <div key={index} className="rounded-xl border border-white/[0.08] bg-[#050505] p-5 md:p-6 my-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/40 to-orange-500/40" />
              <div className="text-[15px] md:text-base leading-[1.75] text-zinc-300 italic">
                {parseInlineMarkdown(block.text)}
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] my-6 overflow-hidden shadow-lg">
            {block.language && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-[#050505]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500/40" />
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-400">{block.language}</span>
                </div>
              </div>
            )}
            <div className="p-5 md:p-6 bg-[#0a0a0a]">
              <pre className="overflow-x-auto text-[13px] md:text-sm leading-[1.8] text-zinc-300 font-mono">
                <code>{block.text}</code>
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderFormattedTitle = (title) => {
  if (!title) return null;
  const words = title.split(' ');
  if (words.length >= 2) {
    const highlightWords = words.length > 2 ? words.slice(-2).join(' ') : words.slice(-1).join(' ');
    const normalWords = words.length > 2 ? words.slice(0, -2).join(' ') : words.slice(0, -1).join(' ');
    return (
      <>
        {normalWords} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{highlightWords}</span>
      </>
    );
  }
  return title;
};

const renderFormattedHeading = (title) => {
  if (!title) return null;
  const words = title.split(' ');
  if (words.length >= 2) {
    const highlightWords = words.length > 2 ? words.slice(-2).join(' ') : words.slice(-1).join(' ');
    const normalWords = words.length > 2 ? words.slice(0, -2).join(' ') : words.slice(0, -1).join(' ');
    return (
      <>
        {parseInlineMarkdown(normalWords)}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{parseInlineMarkdown(highlightWords)}</span>
      </>
    );
  }
  return parseInlineMarkdown(title);
};

const SectionShell = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-16 md:mb-20">
    <div className="mb-6 flex items-center gap-3">
      {eyebrow && (
        <span className="rounded-full border border-pink-400/15 bg-pink-500/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-200">
          {eyebrow}
        </span>
      )}
    </div>
    {title && <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-[32px] leading-[1.15]">{renderFormattedTitle(title)}</h2>}
    {children}
  </section>
);

const QuickAnswer = ({ items, title }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_24px_120px_rgba(236,72,153,0.08)] md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-500/10">
          <Sparkles className="h-5 w-5 text-pink-300" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-200">Quick Answer</p>
          <h2 className="text-xl font-bold text-white md:text-2xl">{title || "What you need to know"}</h2>
        </div>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {items.slice(0, 5).map((item, i) => {
          let content = null;
          let key = i;
          
          if (typeof item === 'string') {
            content = parseInlineMarkdown(item);
            key = item;
          } else if (item && typeof item === 'object') {
            if (item.title && item.text) {
              content = <><strong className="font-semibold text-white">{parseInlineMarkdown(item.title)}</strong> {parseInlineMarkdown(item.text)}</>;
              key = item.title;
            }
          }

          if (!content) return null;

          return (
            <li key={key} className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-[15px] leading-relaxed text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
              <span>{content}</span>
            </li>
          );
        })}
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
      <div className="space-y-10 mt-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.phase || phaseIndex}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-gradient-to-r from-pink-500/15 to-orange-500/15 border border-pink-500/20 text-[10px] font-bold uppercase tracking-[0.15em] text-pink-300 shadow-[0_0_16px_rgba(236,72,153,0.08)]">
                  Phase {phaseIndex + 1}
                </span>
                <span className="text-base md:text-lg font-semibold text-zinc-200 tracking-tight">{phase.phase}</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {(phase.items || []).map((item, i) => (
                <article key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6 shadow-[0_0_40px_rgba(236,72,153,0.02)] relative overflow-hidden transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-white/[0.08]">
                      <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{i + 1}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-white tracking-tight leading-snug">{item.title}</h4>
                  </div>
                  <p className="text-[13px] md:text-sm leading-relaxed text-zinc-400">{parseInlineMarkdown(item.text || '')}</p>
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
      <div className="space-y-3 mt-6">
        {prompts.map((prompt, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={prompt.title || index} className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-lg ${isOpen ? 'border-pink-500/20 bg-[#0a0a0a] shadow-[0_0_30px_rgba(236,72,153,0.03)]' : 'border-white/[0.08] bg-[#0a0a0a] hover:border-white/[0.15]'}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between px-4 py-3.5 border-b border-white/[0.05] bg-[#050505] cursor-pointer text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isOpen ? 'bg-pink-500/60' : 'bg-pink-500/30'}`} />
                  <span className={`text-xs font-bold uppercase tracking-[0.1em] transition-colors ${isOpen ? 'text-zinc-200' : 'text-zinc-400'}`}>{prompt.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-semibold">Prompt</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 md:p-6 bg-[#0a0a0a]">
                    <div className="whitespace-pre-wrap break-words text-[13px] md:text-sm leading-[1.8] text-zinc-400 font-mono">
                      {parseInlineMarkdown(prompt.text || '')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
};

const FormatsGrid = ({ formats }) => {
  if (!Array.isArray(formats) || formats.length === 0) return null;

  let gridClass = "grid gap-4 ";
  if (formats.length === 1) {
    gridClass += "grid-cols-1 max-w-2xl";
  } else if (formats.length === 2) {
    gridClass += "grid-cols-1 sm:grid-cols-2";
  } else if (formats.length === 3) {
    gridClass += "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  } else {
    gridClass += "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <SectionShell eyebrow="Formats" title="Useful article formats">
      <div className={gridClass}>
        {formats.map((format) => (
          <article key={format.title} className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6 transition-colors hover:bg-white/[0.03] hover:border-white/[0.12]">
            <Layers3 className="mb-4 h-6 w-6 text-pink-300" />
            <h3 className="mb-2 text-[15px] md:text-base font-bold text-zinc-100 tracking-tight leading-snug">{format.title}</h3>
            <p className="mb-4 text-[13px] leading-[1.6] text-zinc-400">{parseInlineMarkdown(format.text || '')}</p>
            {format.example && (
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2.5">
                <p className="text-[12px] leading-[1.5] text-zinc-300 italic">Example: {parseInlineMarkdown(format.example)}</p>
              </div>
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
      <div className="relative my-16 overflow-hidden rounded-[32px] border border-pink-300/15 bg-gradient-to-br from-pink-500/[0.12] via-white/[0.035] to-orange-500/[0.10] p-7 shadow-[0_30px_140px_rgba(236,72,153,0.12)] md:p-10">
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

const ArticleHero = ({ article }) => {
  const freshness = getArticleFreshnessMeta(article);
  return (
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

        <h1 className={`mx-auto mb-6 max-w-4xl font-bold leading-[1.1] tracking-tight text-white ${article.title.length > 50 ? 'text-3xl md:text-4xl lg:text-[40px]' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
          {renderFormattedTitle(article.title)}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-[1.65] text-zinc-400 md:text-xl">
          {article.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-500">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{article.articleType}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{article.primaryKeyword}</span>
          {freshness && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              {freshness.displayText}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

const ArticleFreshnessBlock = ({ article }) => {
  const freshness = getArticleFreshnessMeta(article);
  if (!freshness) return null;
  
  return (
    <div className="mb-2 -mt-4 flex items-start gap-4 rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] p-5 shadow-lg max-w-[800px]">
      <div className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-pink-200/80 mb-1.5">{freshness.blockLabel}</p>
        <p className="text-[14px] leading-relaxed text-zinc-300">
          <strong className="text-white font-semibold">{freshness.displayText}</strong> — this guide is kept up to date for current AI content workflow practices.
        </p>
      </div>
    </div>
  );
};

export const MarkdownSeoArticleTemplateV2 = ({ article }) => (
  <>
    <ArticleHero article={article} />
    <main className="relative bg-[#050505] px-4 pb-20 sm:px-6 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[520px] max-w-5xl rounded-full bg-gradient-to-b from-pink-500/[0.035] to-transparent blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col gap-14 md:gap-18 pt-6">
        <ArticleFreshnessBlock article={article} />
        <QuickAnswer items={article.quickAnswer} title={article.quickAnswerTitle} />
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
