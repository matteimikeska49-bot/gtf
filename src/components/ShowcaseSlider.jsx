import React from 'react';
import { Heart, Star, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ─── Карточки-плейсхолдеры: чередующий ритм Reels + Post ─── */
const cards = [
  { id: 1, format: 'square', tag: 'post',     likes: '4.2K', views: '12K', labelKey: 'personalBrand', image: '/images/niches/image_1.png.jpg' },
  { id: 2, format: 'reel',   tag: 'carousel', likes: '8.1K', views: '20K', labelKey: 'marketing', image: '/images/niches/image_2.png.jpg' },
  { id: 3, format: 'square', tag: 'carousel', likes: '1.8K', views: '5K',  labelKey: 'promotion', image: '/images/niches/image_3.png.jpg' },
  { id: 4, format: 'square', tag: 'post',     likes: '3.1K', views: '9K',  labelKey: 'ecommerce', image: '/images/niches/image_4.png.jpg' },
  { id: 5, format: 'reel',   tag: 'carousel', likes: '6.7K', views: '18K', labelKey: 'beauty', image: '/images/niches/image_5.png.jpg' },
  { id: 6, format: 'square', tag: 'carousel', likes: '5.9K', views: '14K', labelKey: 'fitness', image: '/images/niches/image_6.png.jpg' },
  { id: 7, format: 'square', tag: 'carousel', likes: '2.4K', views: '7K',  labelKey: 'education', image: '/images/niches/image_7.png.jpg' },
  { id: 8, format: 'square', tag: 'carousel', likes: '980',  views: '3.2K',labelKey: 'travel', image: '/images/niches/image_8.png.jpg' },
  { id: 9, format: 'reel',   tag: 'carousel', likes: '10K',  views: '25K', labelKey: 'lifestyle', image: '/images/niches/image_9.png.jpg' },
  { id: 10, format: 'square', tag: 'carousel', likes: '7.2K', views: '15K', labelKey: 'it', image: '/images/niches/image_10.png' },
  { id: 11, format: 'square', tag: 'carousel', likes: '4.5K', views: '11K', labelKey: 'expert', image: '/images/niches/image_1.png.jpg' },
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
  const { t } = useLanguage();
  return (
    <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
      {/* Плейсхолдер изображения */}
      <div className={`relative w-full ${formatAspect[card.format]} rounded-xl bg-[#111] overflow-hidden`}>
        {/* Изображение (нижний слой) */}
        <img
          src={card.image}
          alt={`AI generated social media carousel example for ${t('showcase.labels.' + card.labelKey)}`}
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        {/* Эффекты/overlay поверх */}
        <div className="absolute inset-0 md:animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] z-[1]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:18px_18px] z-[1]" />
        {/* Тег формата */}
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full z-[2] ${tagColor[card.tag]}`}>
          {t(`showcase.tags.${card.tag}`)}
        </span>
      </div>

      {/* Соц. интерфейс снизу */}
      <div className="flex flex-col gap-2 px-1">
        <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
        <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500/70" />
            <span className="text-xs text-zinc-500 font-medium">{card.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-zinc-400/50" />
            <span className="text-xs text-zinc-500 font-medium">{card.views}</span>
          </div>
          <span className="ml-auto text-[11px] text-zinc-600 truncate">{t(`showcase.labels.${card.labelKey}`)}</span>
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
            {/* Аватарки */}
            <div className="flex -space-x-2">
              {[
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/46.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg"
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="GoToFlow carousel maker user profile"
                  className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover bg-zinc-800"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
            {/* Звёзды */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 drop-shadow-sm" />
              ))}
            </div>
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
