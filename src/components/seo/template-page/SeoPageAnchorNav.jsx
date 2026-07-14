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

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex flex-wrap items-center gap-2 py-2 md:gap-3 md:py-3" aria-label="Навигация по странице">
          <span className="min-h-11 inline-flex items-center text-sm font-medium text-zinc-500 shrink-0">На странице:</span>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/[0.08] bg-white/[0.025] px-3 text-sm font-medium text-zinc-300 transition-colors hover:border-pink-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
