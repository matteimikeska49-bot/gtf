import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, Layers3, Sparkles } from 'lucide-react';
import { getAppUrlWithRef } from '../../../utils/url';
import { getMockupsForArticle } from '../../../lib/blog/mockupRegistry';
import { MOCKUP_SLOT_MAP } from '../../../lib/blog/mockupSlots';
import { shouldShowRuMetaDisclaimer, applyRuAutoStar } from '../../../lib/blog/metaDisclaimerHelper';

const CTA_URL = 'https://app.gotoflow.io';

const ARTICLE_TEMPLATE_COPY = {
  en: {
    lastReviewedLabel: 'Last reviewed',
    publishedLabel: 'Published',
    updatedLabel: 'Updated',
    updatedBlockLabel: 'UPDATED',
    reviewedPrefix: 'Reviewed',
    reviewedSuffix: 'this guide is kept up to date for current AI content workflow practices.',
    quickAnswerLabel: 'Quick Answer',
    quickAnswerTitle: 'What you need to know',
    relatedLabel: 'Explore more',
    relatedTitleToolsGuides: 'Related tools and guides',
    relatedTitleTools: 'Related tools',
    relatedTitleGuides: 'Related guides',
    toolsLabel: 'Tools',
    guidesLabel: 'Guides',
    faqLabel: 'FAQ',
    faqTitle: 'Frequently asked questions',
    promptLibraryEyebrow: 'PROMPT LIBRARY',
    promptLibraryTitle: 'Reusable prompts',
    promptLabel: 'PROMPT',
    formatsEyebrow: 'Formats',
    formatsTitle: 'Useful article formats',
    productWorkflow: 'PRODUCT WORKFLOW',
    proTip: 'Pro tip',
    keyTakeaway: 'Key takeaway',
    commonMistake: 'Common mistake',
    whyItMatters: 'Why this matters',
    workflowInsight: 'Workflow insight',
    bestFor: 'Best for',
    readNext: 'READ NEXT',
    workflowEyebrow: 'Workflow',
    stepPhasesTitle: 'Step-by-step phases',
    phaseLabel: 'Phase',
    exampleLabel: 'Example',
    note: 'Note'
  },
  ru: {
    lastReviewedLabel: 'Последнее обновление',
    publishedLabel: 'Опубликовано',
    updatedLabel: 'Обновлено',
    updatedBlockLabel: 'ОБНОВЛЕНО',
    reviewedPrefix: 'Проверено',
    reviewedSuffix: 'материал актуален для текущих сценариев создания контента с ИИ.',
    quickAnswerLabel: 'Короткий ответ',
    quickAnswerTitle: 'Главное',
    relatedLabel: 'Смотрите также',
    relatedTitleToolsGuides: 'Связанные инструменты и гайды',
    relatedTitleTools: 'Связанные инструменты',
    relatedTitleGuides: 'Связанные гайды',
    toolsLabel: 'Инструменты',
    guidesLabel: 'Гайды',
    faqLabel: '',
    faqTitle: 'Частые вопросы',
    promptLibraryEyebrow: 'БИБЛИОТЕКА ПРОМПТОВ',
    promptLibraryTitle: 'Готовые промпты',
    promptLabel: 'ПРОМПТ',
    formatsEyebrow: 'Форматы',
    formatsTitle: 'Полезные форматы',
    productWorkflow: 'ИНСТРУМЕНТ ИЛИ ПРОЦЕСС',
    proTip: 'Совет',
    keyTakeaway: 'Главное',
    commonMistake: 'Частая ошибка',
    whyItMatters: 'Почему это важно',
    workflowInsight: 'Инсайт',
    bestFor: 'Идеально для',
    readNext: 'ЧИТАТЬ ТАКЖЕ',
    workflowEyebrow: 'Рабочий процесс',
    stepPhasesTitle: 'Пошаговый разбор',
    phaseLabel: 'Этап',
    exampleLabel: 'Пример',
    note: 'Заметка'
  }
};

const getArticleCopy = (language) => ARTICLE_TEMPLATE_COPY[language === 'ru' ? 'ru' : 'en'];

const formatMonthYear = (dateString, isRu = false) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString(isRu ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' });
  } catch (e) {
    return null;
  }
};

const getArticleFreshnessMeta = (article) => {
  const isRu = article.language === 'ru';
  const copy = getArticleCopy(article.language);

  if (article.lastReviewed) {
    const formatted = formatMonthYear(article.lastReviewed, isRu);
    return formatted ? { source: "lastReviewed", label: copy.lastReviewedLabel, blockLabel: copy.lastReviewedLabel.toUpperCase(), formattedDate: formatted, displayText: `${copy.reviewedPrefix}: ${formatted}` } : null;
  }
  if (article.updatedAt) {
    const formatted = formatMonthYear(article.updatedAt, isRu);
    return formatted ? { source: "updatedAt", label: copy.updatedLabel, blockLabel: copy.updatedBlockLabel, formattedDate: formatted, displayText: `${copy.updatedLabel}: ${formatted}` } : null;
  }
  if (article.createdAt) {
    const formatted = formatMonthYear(article.createdAt, isRu);
    return formatted ? { source: "createdAt", label: copy.publishedLabel, blockLabel: copy.publishedLabel.toUpperCase(), formattedDate: formatted, displayText: `${copy.publishedLabel}: ${formatted}` } : null;
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

const parseInlineMarkdown = (text, context = 'normal', isRu = false) => {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.slice(lastIndex, match.index);
      parts.push(isRu ? applyRuAutoStar(textPart, isRu) : textPart);
    }

    const token = match[0];
    if (token.startsWith('**')) {
      const innerText = token.slice(2, -2);
      parts.push(<strong key={parts.length} className="font-semibold text-zinc-200">{isRu ? applyRuAutoStar(innerText, isRu) : innerText}</strong>);
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
            {isRu ? applyRuAutoStar(linkMatch[1], isRu) : linkMatch[1]}
          </ArticleLink>
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    const textPart = text.slice(lastIndex);
    parts.push(isRu ? applyRuAutoStar(textPart, isRu) : textPart);
  }
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

    if (trimmed.startsWith(':::mockup')) {
      const match = trimmed.match(/^:::mockup\s*\{([^}]+)\}/);
      let type = null;
      let layout = null;
      let slot = null;
      
      if (match) {
        const attributes = match[1];
        const slotMatch = attributes.match(/slot\s*=\s*"([^"]+)"/);
        const typeMatch = attributes.match(/type\s*=\s*"([^"]+)"/);
        const layoutMatch = attributes.match(/layout\s*=\s*"([^"]+)"/);
        
        if (slotMatch) {
          slot = slotMatch[1];
          const mapped = MOCKUP_SLOT_MAP[slot];
          if (mapped) {
            type = mapped.type;
            layout = mapped.layout;
          }
        } else {
          if (typeMatch) type = typeMatch[1];
          if (layoutMatch) layout = layoutMatch[1];
        }
      }
      
      if (type && layout) {
        blocks.push({ type: 'mockup', mockupType: type, layout, slot });
      }
      
      index += 1;
      let tempIndex = index;
      while (tempIndex < lines.length && lines[tempIndex].trim() === '') {
        tempIndex += 1;
      }
      if (tempIndex < lines.length && lines[tempIndex].trim() === ':::') {
        index = tempIndex + 1;
      }
      
      continue;
    }

    if (trimmed === ':::cards') {
      let variant = 'default';
      const items = [];
      index += 1;
      
      if (index < lines.length && lines[index].trim().startsWith('type:')) {
        const typeMatch = lines[index].trim().match(/^type:\s*([a-zA-Z0-9-]+)$/i);
        if (typeMatch) variant = typeMatch[1].toLowerCase();
        index += 1;
      }
      
      const allowedVariants = ['mistakes', 'tips', 'takeaways', 'workflow', 'best-for', 'examples', 'checklist', 'pros-cons', 'default'];
      if (!allowedVariants.includes(variant)) {
        variant = 'default';
      }

      let currentItem = null;
      while (index < lines.length && lines[index].trim() !== ':::') {
        const cLine = lines[index].trim();
        const headingMatch = cLine.match(/^###\s+(.+)$/);
        
        if (headingMatch) {
          if (currentItem) items.push(currentItem);
          currentItem = { title: headingMatch[1], content: [] };
        } else if (currentItem && cLine !== '') {
          currentItem.content.push(cLine);
        }
        index += 1;
      }
      
      if (currentItem) items.push(currentItem);
      
      items.forEach(item => {
        item.content = item.content.join('\n').trim();
      });

      blocks.push({ type: 'cards', variant, items });
      if (index < lines.length && lines[index].trim() === ':::') {
        index += 1;
      }
      continue;
    }

    if (trimmed === ':::prompts') {
      const items = [];
      index += 1;
      
      let currentItem = null;
      while (index < lines.length && lines[index].trim() !== ':::') {
        const cLine = lines[index].trim();
        const headingMatch = cLine.match(/^###\s+(.+)$/);
        
        if (headingMatch) {
          if (currentItem) items.push(currentItem);
          currentItem = { title: headingMatch[1], text: [] };
        } else if (currentItem && cLine !== '') {
          if (!cLine.startsWith('```')) {
            currentItem.text.push(cLine);
          }
        }
        index += 1;
      }
      
      if (currentItem) items.push(currentItem);
      
      items.forEach(item => {
        item.text = item.text.join('\n').trim();
      });

      blocks.push({ type: 'prompts', items });
      if (index < lines.length && lines[index].trim() === ':::') {
        index += 1;
      }
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
      !lines[index].trim().startsWith(':::cards') &&
      !lines[index].trim().startsWith(':::mockup') &&
      !lines[index].trim().startsWith(':::prompts') &&
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

const MarkdownBody = ({ markdown, title, article, isRu }) => {
  const blocks = parseMarkdownBlocks(markdown);
  const copy = getArticleCopy(article ? article.language : (isRu ? 'ru' : 'en'));
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
              <h2 key={index} className="pt-10 pb-4 text-2xl font-bold leading-tight tracking-tight text-white md:text-[32px] text-balance">
                {renderFormattedHeading(block.text, isRu)}
              </h2>
            );
          }
          return (
            <div key={index} className="mt-10 mb-4 flex items-center gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
              <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight text-white">
                {parseInlineMarkdown(block.text, 'normal', isRu)}
              </h3>
            </div>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="mb-6 text-[15px] leading-[1.85] text-zinc-400 md:text-base">
              {parseInlineMarkdown(block.text, 'normal', isRu)}
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
                        {parseInlineMarkdown(header, 'normal', isRu)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                      {row.map((cell, j) => (
                        <td key={j} className={`border-b border-white/[0.05] px-4 py-3 text-[15px] leading-relaxed ${j === 0 ? 'font-medium text-zinc-200' : 'text-zinc-400'}`}>
                          {parseInlineMarkdown(cell, 'normal', isRu)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'cards') {
          return <MarkdownCardsBlock key={index} variant={block.variant} items={block.items} />;
        }
        
        if (block.type === 'prompts') {
          return <PromptAccordion key={index} prompts={block.items} isRu={isRu} />;
        }
        
        if (block.type === 'mockup' && article) {
          return (
            <ArticleMockupPlacement 
              key={`mockup-${index}`}
              article={article}
              type={block.mockupType}
              layout={block.layout}
            />
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
                  <span>{parseInlineMarkdown(item, 'normal', isRu)}</span>
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
              badgeText = copy.keyTakeaway;
              badgeColor = 'text-amber-400';
              bgClass = 'bg-amber-500/[0.03]';
              borderClass = 'border-amber-500/15';
              gradientLine = 'from-amber-500/40 to-yellow-500/40';
              icon = <Sparkles className="w-4 h-4 text-amber-400" />;
              break;
            case 'why':
            case 'why-matters':
              badgeText = copy.whyItMatters;
              badgeColor = 'text-pink-400';
              bgClass = 'bg-pink-500/[0.04]';
              borderClass = 'border-pink-500/20';
              gradientLine = 'from-pink-500/50 to-orange-500/50';
              icon = <Sparkles className="w-4 h-4 text-pink-400" />;
              break;
            case 'insight':
            case 'workflow':
              badgeText = copy.workflowInsight;
              badgeColor = 'text-purple-400';
              bgClass = 'bg-purple-500/[0.03]';
              borderClass = 'border-purple-500/15';
              gradientLine = 'from-purple-500/40 to-pink-500/40';
              break;
            case 'mistake':
              badgeText = copy.commonMistake;
              badgeColor = 'text-red-400';
              bgClass = 'bg-red-500/[0.03]';
              borderClass = 'border-red-500/15';
              gradientLine = 'from-red-500/40 to-orange-500/40';
              break;
            case 'tip':
              badgeText = copy.proTip;
              badgeColor = 'text-emerald-400';
              bgClass = 'bg-emerald-500/[0.03]';
              borderClass = 'border-emerald-500/15';
              gradientLine = 'from-emerald-500/40 to-teal-500/40';
              break;
            case 'bestfor':
            case 'best-for':
              badgeText = copy.bestFor;
              badgeColor = 'text-blue-400';
              bgClass = 'bg-blue-500/[0.03]';
              borderClass = 'border-blue-500/15';
              gradientLine = 'from-blue-500/40 to-cyan-500/40';
              break;
            case 'product':
              badgeText = copy.productWorkflow;
              badgeColor = 'text-pink-400';
              bgClass = 'bg-[#0a0a0a]';
              borderClass = 'border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]';
              gradientLine = 'from-pink-500/80 to-orange-500/80 w-1.5';
              break;
            case 'related':
              badgeText = copy.readNext;
              badgeColor = 'text-purple-300';
              bgClass = 'bg-[#080808]';
              borderClass = 'border-purple-500/20';
              gradientLine = 'from-purple-500/40 to-indigo-500/40';
              break;
            default:
              badgeText = copy.note;
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
                      <p key={i}>{parseInlineMarkdown(line, block.calloutType, isRu)}</p>
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
                  {parseInlineMarkdown(block.text, block.calloutType, isRu)}
                </p>
              )}
            </div>
          );
        }

        if (block.type === 'cards') {
          let glowClass = '';
          let borderClass = '';
          let bgClass = '';
          
          switch (block.variant) {
            case 'mistakes':
              glowClass = 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.6)]';
              borderClass = 'border-red-500/15 hover:border-red-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-red-500/[0.02]';
              break;
            case 'tips':
              glowClass = 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]';
              borderClass = 'border-emerald-500/15 hover:border-emerald-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-emerald-500/[0.02]';
              break;
            case 'takeaways':
              glowClass = 'bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.6)]';
              borderClass = 'border-pink-500/15 hover:border-pink-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-pink-500/[0.02]';
              break;
            case 'workflow':
              glowClass = 'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.6)]';
              borderClass = 'border-purple-500/15 hover:border-purple-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-purple-500/[0.02]';
              break;
            case 'best-for':
              glowClass = 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]';
              borderClass = 'border-blue-500/15 hover:border-blue-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-blue-500/[0.02]';
              break;
            case 'examples':
              glowClass = 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)]';
              borderClass = 'border-orange-500/15 hover:border-orange-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-orange-500/[0.02]';
              break;
            case 'checklist':
              glowClass = 'bg-pink-300 shadow-[0_0_10px_rgba(249,168,212,0.6)]';
              borderClass = 'border-pink-500/15 hover:border-pink-500/30';
              bgClass = 'bg-[#0a0a0a] hover:bg-pink-500/[0.02]';
              break;
            case 'pros-cons':
              glowClass = 'bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.6)]';
              borderClass = 'border-white/10 hover:border-white/20';
              bgClass = 'bg-[#0a0a0a] hover:bg-white/[0.02]';
              break;
            default:
              glowClass = 'bg-zinc-500 shadow-[0_0_10px_rgba(113,113,122,0.6)]';
              borderClass = 'border-white/10 hover:border-white/20';
              bgClass = 'bg-[#0a0a0a] hover:bg-white/[0.02]';
              break;
          }

          return (
            <div key={index} className="my-8 grid grid-cols-1 gap-4">
              {block.items.map((item, i) => (
                <div key={i} className={`p-5 md:p-6 rounded-2xl border transition-colors duration-300 ${borderClass} ${bgClass}`}>
                  <h4 className="text-white text-base md:text-lg font-bold mb-3 flex items-start gap-3">
                    <span className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full ${glowClass}`} />
                    <span>{parseInlineMarkdown(item.title, 'normal', isRu)}</span>
                  </h4>
                  <div className="pl-4 md:pl-4">
                    <div className="text-[15px] leading-[1.7] text-zinc-400 space-y-2">
                      {item.content.split('\n').map((line, j) => (
                        <p key={j}>{parseInlineMarkdown(line, 'normal', isRu)}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'quote') {
          return (
            <div key={index} className="rounded-xl border border-white/[0.08] bg-[#050505] p-5 md:p-6 my-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/40 to-orange-500/40" />
              <div className="text-[15px] md:text-base leading-[1.75] text-zinc-300 italic">
                {parseInlineMarkdown(block.text, 'normal', isRu)}
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
              <pre className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-[13px] md:text-sm leading-[1.8] text-zinc-300 font-mono">
                <code className="break-words [overflow-wrap:anywhere]">{block.text}</code>
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderFormattedTitle = (title, isRu = false) => {
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

const renderFormattedHeading = (title, isRu = false) => {
  if (!title) return null;
  const words = title.split(' ');
  if (words.length >= 2) {
    const highlightWords = words.length > 2 ? words.slice(-2).join(' ') : words.slice(-1).join(' ');
    const normalWords = words.length > 2 ? words.slice(0, -2).join(' ') : words.slice(0, -1).join(' ');
    return (
      <>
        {parseInlineMarkdown(normalWords, 'normal', isRu)}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">{parseInlineMarkdown(highlightWords, 'normal', isRu)}</span>
      </>
    );
  }
  return parseInlineMarkdown(title, 'normal', isRu);
};

const SectionShell = ({ id, eyebrow, title, children, isRu }) => (
  <section id={id} className="scroll-mt-24 mb-16 md:mb-20">
    <div className="mb-6 flex items-center gap-3">
      {eyebrow && (
        <span className="rounded-full border border-pink-400/15 bg-pink-500/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-200">
          {eyebrow}
        </span>
      )}
    </div>
    {title && <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-[32px] leading-[1.15] text-balance">{renderFormattedTitle(title, isRu)}</h2>}
    {children}
  </section>
);

const QuickAnswer = ({ items, title, isRu }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  return (
    <section className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_24px_120px_rgba(236,72,153,0.08)] md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-500/10">
          <Sparkles className="h-5 w-5 text-pink-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white md:text-2xl text-balance">{title || copy.quickAnswerTitle}</h2>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {items.slice(0, 5).map((item, i) => {
          let content = null;
          let key = i;
          
          if (typeof item === 'string') {
            content = parseInlineMarkdown(item);
            key = item;
          } else if (item && typeof item === 'object') {
            if (item.title && item.text) {
              content = <><strong className="font-semibold text-white">{parseInlineMarkdown(item.title, 'normal', isRu)}</strong> {parseInlineMarkdown(item.text)}</>;
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

const KeyTakeaway = ({ text, isRu }) => {
  if (!text) return null;
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  return (
    <aside className="rounded-3xl border border-orange-300/15 bg-orange-400/[0.06] p-5 md:p-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">{copy.keyTakeaway}</p>
      <p className="text-base leading-relaxed text-orange-50 md:text-lg">{parseInlineMarkdown(text)}</p>
    </aside>
  );
};

const StepPhases = ({ phases, isRu }) => {
  if (!Array.isArray(phases) || phases.length === 0) return null;
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  return (
    <SectionShell eyebrow={copy.workflowEyebrow} title={copy.stepPhasesTitle}>
      <div className="space-y-10 mt-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.phase || phaseIndex}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-gradient-to-r from-pink-500/15 to-orange-500/15 border border-pink-500/20 text-[10px] font-bold uppercase tracking-[0.15em] text-pink-300 shadow-[0_0_16px_rgba(236,72,153,0.08)]">
                  {copy.phaseLabel} {phaseIndex + 1}
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
                    <h4 className="text-[15px] font-bold text-white tracking-tight leading-snug text-balance">{item.title}</h4>
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

const PromptAccordion = ({ prompts, isRu }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  if (!Array.isArray(prompts) || prompts.length === 0) return null;

  return (
    <SectionShell eyebrow={copy.promptLibraryEyebrow} title={copy.promptLibraryTitle} isRu={isRu}>
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
                  <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-semibold">{copy.promptLabel}</span>
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

const FormatsGrid = ({ formats, isRu }) => {
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

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
    <SectionShell eyebrow={copy.formatsEyebrow} title={copy.formatsTitle} isRu={isRu}>
      <div className={gridClass}>
        {formats.map((format) => (
          <article key={format.title} className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6 transition-colors hover:bg-white/[0.03] hover:border-white/[0.12]">
            <Layers3 className="mb-4 h-6 w-6 text-pink-300" />
            <h3 className="mb-2 text-[15px] md:text-base font-bold text-zinc-100 tracking-tight leading-snug text-balance">{format.title}</h3>
            <p className="mb-4 text-[13px] leading-[1.6] text-zinc-400">{parseInlineMarkdown(format.text || '')}</p>
            {format.example && (
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2.5">
                <p className="text-[12px] leading-[1.5] text-zinc-300 italic">{copy.exampleLabel}: {parseInlineMarkdown(format.example)}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

const ArticleExploreZone = ({ explore, isRu }) => {
  const tools = Array.isArray(explore?.tools) ? explore.tools : [];
  const guides = Array.isArray(explore?.guides) ? explore.guides : [];

  if (tools.length === 0 && guides.length === 0) return null;
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  let title = copy.relatedTitleToolsGuides;
  if (tools.length > 0 && guides.length === 0) title = copy.relatedTitleTools;
  if (guides.length > 0 && tools.length === 0) title = copy.relatedTitleGuides;

  const renderCard = (item) => (
    <ArticleLink key={`${item.href}-${item.title}`} href={item.href} className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-pink-300/25 hover:bg-pink-500/[0.05]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-pink-100 text-balance">{isRu ? applyRuAutoStar(item.title, isRu) : item.title}</h3>
        {isExternalHref(item.href || '') ? <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" /> : <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5" />}
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{isRu ? applyRuAutoStar(item.description, isRu) : item.description}</p>
    </ArticleLink>
  );

  return (
    <SectionShell id="explore-more" eyebrow={copy.relatedLabel} title={title}>
      {tools.length > 0 && guides.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{copy.toolsLabel}</p>
            <div className="space-y-3">{tools.map(renderCard)}</div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{copy.guidesLabel}</p>
            <div className="space-y-3">{guides.map(renderCard)}</div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.length > 0 ? tools.map(renderCard) : guides.map(renderCard)}
        </div>
      )}
    </SectionShell>
  );
};

const FaqBlock = ({ faq, isRu }) => {
  if (!Array.isArray(faq) || faq.length === 0) return null;
  const copy = getArticleCopy(isRu ? 'ru' : 'en');

  return (
    <SectionShell eyebrow={copy.faqLabel} title={copy.faqTitle}>
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

const FinalCta = ({ cta, isRu }) => {
  if (!cta) return null;

  return (
    <section className="text-center">
      <div className="relative my-16 overflow-hidden rounded-[32px] border border-pink-300/15 bg-gradient-to-br from-pink-500/[0.12] via-white/[0.035] to-orange-500/[0.10] p-7 shadow-[0_30px_140px_rgba(236,72,153,0.12)] md:p-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-4xl text-balance">{isRu ? applyRuAutoStar(cta.title, isRu) : cta.title}</h2>
          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-zinc-300">{isRu ? applyRuAutoStar((cta.text || cta.description), isRu) : (cta.text || cta.description)}</p>
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

const ArticleHero = ({ article, isRu }) => {
  const freshness = getArticleFreshnessMeta(article);
  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 pb-12 pt-28 sm:px-6 md:pb-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-pink-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute left-1/4 top-28 h-[280px] w-[280px] rounded-full bg-orange-500/[0.06] blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-[940px] text-center">
        <div className="mb-10 flex min-w-0 items-center justify-center gap-1.5 text-sm text-zinc-500">
          <Link to={isRu ? "/ru" : "/"} className="transition-colors hover:text-zinc-300">
            {isRu ? 'Главная' : 'Home'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link to={isRu ? "/ru/blog" : "/blog"} className="transition-colors hover:text-zinc-300">
            {isRu ? 'Блог' : 'Blog'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate text-zinc-400">{article.title}</span>
        </div>

        {/* cluster hidden */}

        <h1 className={`mx-auto mb-6 max-w-4xl font-bold leading-[1.1] tracking-tight text-white text-balance ${article.title.length > 50 ? 'text-3xl md:text-4xl lg:text-[40px]' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
          {renderFormattedTitle(article.title, isRu)}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-[1.65] text-zinc-400 md:text-xl text-balance">
          {isRu ? applyRuAutoStar(article.description, isRu) : article.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-500">
          {formatArticleTypeBadge(article.articleType, isRu) && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              {formatArticleTypeBadge(article.articleType, isRu)}
            </span>
          )}
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

const formatArticleTypeBadge = (type, isRu) => {
  if (!type) return null;
  const map = {
    'guide': isRu ? 'Гайд' : 'Guide',
    'comparison': isRu ? 'Сравнение' : 'Comparison',
    'thought-leadership/comparison': isRu ? 'Сравнение' : 'Comparison',
    'ideas_article': isRu ? 'Примеры' : 'Examples',
    'listicle': isRu ? 'Примеры' : 'Examples',
    'prompt-library': isRu ? 'Библиотека промптов' : 'Prompt library',
    'workflow': isRu ? 'Рабочий процесс' : 'Workflow',
    'examples': isRu ? 'Примеры' : 'Examples',
  };
  return map[type] || null;
};

const ArticleFreshnessBlock = ({ article }) => {
  const freshness = getArticleFreshnessMeta(article);
  if (!freshness) return null;
  const copy = getArticleCopy(article.language);
  
  return (
    <div className="mb-2 -mt-4 flex items-start gap-4 rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] p-5 shadow-lg max-w-[800px]">
      <div className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-pink-200/80 mb-1.5">{freshness.blockLabel}</p>
        <p className="text-[14px] leading-relaxed text-zinc-300">
          <strong className="text-white font-semibold">{freshness.displayText}</strong> — {copy.reviewedSuffix}
        </p>
      </div>
    </div>
  );
};

const typeToSuitableFor = {
  'result': ['result', 'editor-preview', 'product-workflow'],
  'text-topic': ['input', 'text-topic', 'workflow-step'],
  'file-video': ['input', 'file-video', 'workflow-step'],
  'settings': ['settings', 'format', 'slide-count', 'cta'],
  'character': ['character', 'reference-photo', 'personalization'],
  'visual-style': ['visual-style', 'style-selection'],
  'custom-style': ['custom-style', 'style-prompt']
};

const MarkdownCardsBlock = ({ variant, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6 transition-colors hover:bg-white/[0.03] hover:border-white/[0.12] flex flex-col h-full">
          {item.title && <h3 className="mb-2 text-[15px] md:text-base font-bold text-zinc-100 tracking-tight leading-snug text-balance">{item.title}</h3>}
          <div className="text-[13px] leading-[1.6] text-zinc-400 whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

const NativeMockupBlock = ({ mockup, layout }) => {
  if (!mockup) return null;
  
  if (layout === 'featured') {
    return (
      <div data-blog-mockup="true" className="my-10 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0a0a] shadow-2xl">
        <div className="bg-black/40 flex justify-center p-4">
          <img 
            src={mockup.path} 
            alt={mockup.alt || ''} 
            className="w-full max-h-[600px] object-contain rounded-lg"
            loading="lazy"
          />
        </div>
        {mockup.caption && (
          <div className="border-t border-white/[0.05] p-5 text-center">
            <p className="text-[15px] font-medium text-zinc-300">{mockup.caption}</p>
          </div>
        )}
      </div>
    );
  }
  
  if (layout === 'inline') {
    return (
      <div data-blog-mockup="true" className="my-8 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] shadow-xl">
        <div className="bg-black/30 flex justify-center p-3">
          <img 
            src={mockup.path} 
            alt={mockup.alt || ''} 
            className="w-full max-h-[450px] object-contain rounded-md"
            loading="lazy"
          />
        </div>
        {mockup.caption && (
          <div className="border-t border-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-zinc-400">{mockup.caption}</p>
          </div>
        )}
      </div>
    );
  }

  if (layout === 'compact') {
    return (
      <div data-blog-mockup="true" className="my-8 max-w-2xl mx-auto overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-lg">
        <div className="bg-black/40 flex justify-center p-3">
          <img 
            src={mockup.path} 
            alt={mockup.alt || ''} 
            className="w-full max-h-[350px] object-contain rounded-md"
            loading="lazy"
          />
        </div>
        {mockup.caption && (
          <div className="border-t border-white/[0.05] p-3 text-center">
            <p className="text-xs font-medium text-zinc-400">{mockup.caption}</p>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

const ArticleMockupPlacement = ({ article, type, layout }) => {
  const suitableFor = typeToSuitableFor[type];
  if (!suitableFor) return null;
  
  const selected = getMockupsForArticle(article, {
    suitableFor: suitableFor,
    limit: 1
  });
  
  if (!selected || selected.length === 0) return null;
  const mockup = selected[0];
  
  return <NativeMockupBlock mockup={mockup} layout={layout} />;
};

const RuMetaDisclaimer = () => (
  <div className="mx-auto w-full max-w-[920px] mt-4 mb-10 px-2">
    <p className="text-[11px] md:text-[12px] leading-relaxed text-zinc-500/80">
      *Instagram, Facebook и Meta принадлежат Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
    </p>
  </div>
);

export const MarkdownSeoArticleTemplateV2 = ({ article }) => {
  const isRu = article?.language === 'ru';
  return (
  <>
    <ArticleHero article={article} isRu={isRu} />
    <main className="relative bg-[#050505] px-4 pb-20 sm:px-6 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[520px] max-w-5xl rounded-full bg-gradient-to-b from-pink-500/[0.035] to-transparent blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col gap-14 md:gap-18 pt-6">
        <ArticleFreshnessBlock article={article} />
        <QuickAnswer items={article.quickAnswer} title={article.quickAnswerTitle} isRu={isRu} />
        <KeyTakeaway text={article.keyTakeaway} isRu={isRu} />
        
        {article.body && (
          <article className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 md:p-8">
            <MarkdownBody markdown={article.body} title={article.title} article={article} isRu={isRu} />
          </article>
        )}
        
        <StepPhases phases={article.steps} isRu={isRu} />
        <PromptAccordion prompts={article.prompts} isRu={isRu} />
        <FormatsGrid formats={article.formats} isRu={isRu} />
        <ArticleExploreZone explore={article.explore} isRu={isRu} />
        {isRu && <RuMetaDisclaimer />}
        <FaqBlock faq={article.faq} isRu={isRu} />
        <FinalCta cta={article.finalCta} isRu={isRu} />
      </div>
    </main>
  </>
  );
}
