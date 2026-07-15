import { useEffect, useRef, useState } from 'react';
import { isCarouselProductSeoPage } from '../../../content/seoPages/templateVariants';

const CAROUSEL_NAV_ITEMS = [
  { id: 'page-relevant-formats', label: 'Форматы' },
  { id: 'product-workflow', label: 'Как создать' },
  { id: 'product-capabilities', label: 'Возможности' },
  { id: 'ready-carousel-showcase', label: 'Примеры' },
  { id: 'page-specific-proof', label: 'Результат' },
  { id: 'use-cases', label: 'Сценарии' },
  { id: 'faq-section', label: 'Вопросы' },
];

const TEMPLATE_NAV_ITEMS = [
  { id: 'template-categories', label: 'Форматы' },
  { id: 'template-choice-guide', label: 'Как выбрать' },
  { id: 'product-workflow', label: 'Как создать' },
  { id: 'ready-carousel-showcase', label: 'Примеры' },
  { id: 'faq-section', label: 'Вопросы' },
];

export const SeoPageAnchorNav = ({ page }) => {
  const navItems = isCarouselProductSeoPage(page) ? CAROUSEL_NAV_ITEMS : TEMPLATE_NAV_ITEMS;
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [activeId, setActiveId] = useState(navItems[0]?.id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-24% 0px -62% 0px',
        threshold: [0.08, 0.16, 0.32],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeId];
    const nav = navRef.current;
    if (!activeItem || !nav || nav.scrollWidth <= nav.clientWidth) return;

    const centeredLeft = activeItem.offsetLeft - ((nav.clientWidth - activeItem.offsetWidth) / 2);
    nav.scrollTo({
      left: Math.max(0, centeredLeft),
      behavior: 'auto',
    });
  }, [activeId]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      setActiveId(id);

      if (window.matchMedia('(max-width: 767px)').matches) {
        const navHeight = navRef.current?.closest('[data-seo-anchor-nav]')?.getBoundingClientRect().height || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div data-seo-anchor-nav className="sticky top-16 z-40 w-full border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <nav
          ref={navRef}
          className="flex flex-nowrap items-center gap-1.5 overflow-x-auto overscroll-x-contain whitespace-nowrap py-1.5 [scrollbar-width:none] md:flex-wrap md:gap-3 md:overflow-visible md:py-3 [&::-webkit-scrollbar]:hidden"
          aria-label="Навигация по странице"
        >
          <span className="inline-flex min-h-9 shrink-0 items-center text-[13px] font-medium text-zinc-500 md:min-h-11 md:text-sm">На странице:</span>
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(node) => {
                if (node) itemRefs.current[item.id] = node;
              }}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={[
                'inline-flex min-h-9 shrink-0 items-center rounded-full border px-2.5 text-[13px] font-medium transition-colors hover:border-pink-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 md:min-h-11 md:border-white/[0.08] md:bg-white/[0.025] md:px-3 md:text-sm md:text-zinc-300',
                activeId === item.id
                  ? 'border-pink-400/35 bg-pink-500/[0.08] text-white md:border-white/[0.08] md:bg-white/[0.025] md:text-zinc-300'
                  : 'border-white/[0.08] bg-white/[0.025] text-zinc-300',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
