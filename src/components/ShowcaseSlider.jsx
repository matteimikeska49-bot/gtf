import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ─── Карточки-плейсхолдеры: чередующий ритм Reels + Post ─── */
// Illustrative layouts only: no invented customer results or performance claims.
const cards = [
  { id: 1, format: 'reel', ruFormat: 'reel', tag: 'post', labelKey: 'personalBrand', image: '/images/niches/en/content-en-4.webp', ruImage: '/images/niches/ru/content-ru-9.webp' },
  { id: 3, format: 'reel', ruFormat: 'reel', tag: 'carousel', labelKey: 'promotion', image: '/images/niches/en/content-en-3.webp', ruImage: '/images/niches/ru/content-ru-3.webp' },
  { id: 6, format: 'reel', ruFormat: 'reel', tag: 'carousel', labelKey: 'education', image: '/images/niches/en/content-en-6.webp', ruImage: '/images/niches/ru/content-ru-10.webp' },
];

/* Пропорции плейсхолдеров (aspect-ratio) */
const formatAspect = {
  reel:   'aspect-[4/5]',   // вертикальный 4:5 (Instagram)
  square: 'aspect-square',  // 1:1 Пост / Карусель
};

/* Accent цвет bg для тега */
const tagColor = {
  reels:    'bg-pink-500/20 text-pink-300',
  post:     'bg-indigo-500/20 text-indigo-300',
  carousel: 'bg-violet-500/20 text-violet-300',
};

/* ─── Одна карточка ─── */
const SlideCard = ({ card }) => {
  const { t, lang } = useLanguage();
  const isRu = lang === 'RU';
  const imageSrc = isRu ? card.ruImage : card.image;
  const currentFormat = isRu ? (card.ruFormat || card.format) : card.format;

  return (
    <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
      {/* Плейсхолдер изображения */}
      <div className={`relative w-full ${formatAspect[currentFormat]} rounded-xl bg-[#111] overflow-hidden`}>
        {/* Изображение (нижний слой) */}
        <img
          src={imageSrc}
          alt={`${isRu ? 'Иллюстративный макет' : 'Illustrative layout'}: ${t('showcase.labels.' + card.labelKey)}`}
          className="absolute inset-0 w-full h-full z-0 object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Эффекты/overlay поверх */}
        <div className="absolute inset-0 md:animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] z-[1]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:18px_18px] z-[1]" />
        {/* Тег формата */}
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full z-[2] ${tagColor[card.tag]}`}>
          {t(`showcase.tags.${card.tag}`)}
        </span>
        {/* Микро-лейбл (только для RU) */}
        {card.microLabelKey && lang === 'RU' && (
          <span className="absolute bottom-2.5 right-2.5 text-[9px] font-medium px-2 py-1 rounded-md z-[2] bg-black/60 backdrop-blur-md text-white/90 border border-white/10 flex items-center gap-1 shadow-lg">
            {t(`showcase.microLabels.${card.microLabelKey}`)}
          </span>
        )}
      </div>

      {/* Соц. интерфейс снизу */}
      <div className="flex flex-col gap-2 px-1">
        <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
        <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500/70" />
            <span className="text-xs text-zinc-500 font-medium">{isRu ? 'Пример' : 'Example'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-zinc-400/50" />
            <span className="text-xs text-zinc-500 font-medium">{isRu ? 'Не данные об эффективности' : 'Not performance data'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Трек слайдера ─── */
const MarqueeTrack = ({ speed = 40 }) => (
  <div
    className="flex items-center gap-5"
    style={{
      animation: `marquee-scroll ${speed}s linear infinite`,
      width: 'max-content',
      willChange: 'transform',
    }}
  >
    {[...cards, ...cards].map((card, i) => (
      <SlideCard key={`${card.id}-${i}`} card={card} />
    ))}
  </div>
);

/* ─── Главный экспортируемый компонент ─── */
export const ShowcaseSlider = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-pink-600/8 blur-[60px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        {/* ─── Траст-бейдж ─── */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/20">
            <span className="text-sm text-zinc-300 font-medium tracking-tight">
              <span className="text-white font-semibold">{t('showcase.trustBadgePart1')}</span> {t('showcase.trustBadgePart2')}
            </span>
          </div>
        </div>

        {/* ─── H2 ─── */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight mb-16 px-6">
          {t('showcase.titlePart1')} <span className="text-gradient-brand">{t('showcase.titleHighlight')}</span>
        </h2>

        {/* ─── Слайдер (Marquee) — один ряд ─── */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <MarqueeTrack speed={40} />
        </div>
      </div>

      {/* CSS-анимация marquee */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
