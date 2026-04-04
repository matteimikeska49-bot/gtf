import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

/* ─── Данные табов ─── */
const TABS = ['Маркетинг', 'Личный бренд', 'E-commerce', 'Бьюти', 'Образование'];

/* ─── Карточки-плейсхолдеры: чередующий ритм Reels + Post ─── */
const cards = [
  { id: 1, format: 'reel',   tag: 'Reels',   likes: '4.2K', label: 'Продвижение SaaS' },
  { id: 2, format: 'square', tag: 'Пост',    likes: '1.8K', label: 'Личный бренд' },
  { id: 3, format: 'reel',   tag: 'Reels',   likes: '6.7K', label: 'Бьюти-блог' },
  { id: 4, format: 'square', tag: 'Карусель', likes: '3.1K', label: 'E-commerce' },
  { id: 5, format: 'reel',   tag: 'Reels',   likes: '5.9K', label: 'Фитнес' },
  { id: 6, format: 'square', tag: 'Пост',    likes: '2.4K', label: 'Образование' },
  { id: 7, format: 'reel',   tag: 'Reels',   likes: '8.1K', label: 'Маркетинг' },
  { id: 8, format: 'square', tag: 'Карусель', likes: '980',  label: 'Путешествия' },
];

/* Пропорции плейсхолдеров (aspect-ratio) */
const formatAspect = {
  reel:   'aspect-[9/16]',  // высокий / Stories / Reels
  square: 'aspect-square',  // 1:1 Пост / Карусель
};

/* Accent цвет bg для тега */
const tagColor = {
  Reels:    'bg-pink-500/20 text-pink-300',
  Пост:     'bg-indigo-500/20 text-indigo-300',
  Карусель: 'bg-violet-500/20 text-violet-300',
};

/* ─── Одна карточка ─── */
const SlideCard = ({ card }) => (
  <div className="shrink-0 w-[280px] md:w-[320px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-3">
    {/* Плейсхолдер изображения */}
    <div className={`relative w-full ${formatAspect[card.format]} rounded-xl bg-[#111] overflow-hidden`}>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-transparent to-white/[0.02]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:18px_18px]" />
      {/* Тег формата */}
      <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${tagColor[card.tag]}`}>
        {card.tag}
      </span>
    </div>

    {/* Соц. интерфейс снизу */}
    <div className="flex flex-col gap-2 px-1">
      <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
      <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
      <div className="flex items-center gap-2 mt-1">
        <Heart className="w-3.5 h-3.5 text-pink-500/70" />
        <span className="text-xs text-zinc-500 font-medium">{card.likes}</span>
        <span className="ml-auto text-[11px] text-zinc-600 truncate">{card.label}</span>
      </div>
    </div>
  </div>
);

/* ─── Трек слайдера ─── */
const MarqueeTrack = ({ speed = 40 }) => (
  <div
    className="flex items-center gap-5"
    style={{
      animation: `marquee-scroll ${speed}s linear infinite`,
      width: 'max-content',
    }}
  >
    {[...cards, ...cards].map((card, i) => (
      <SlideCard key={`${card.id}-${i}`} card={card} />
    ))}
  </div>
);

/* ─── Главный экспортируемый компонент ─── */
export const ShowcaseSlider = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 md:py-32 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-pink-600/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        {/* ─── Траст-бейдж ─── */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            {/* Аватарки */}
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
            {/* Звёзды */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-zinc-400 font-medium">Уже генерируют контент в GoToFlow</span>
          </div>
        </div>

        {/* ─── H2 ─── */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight mb-8 px-6">
          Готовый контент для <span className="text-gradient-brand">любой ниши</span>
        </h2>

        {/* ─── Табы-фильтры ─── */}
        <div className="flex flex-wrap justify-center gap-2 px-6 mb-12">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeTab === i
                  ? 'border-pink-500/40 bg-pink-500/10 text-white shadow-[0_0_16px_rgba(236,72,153,0.15)]'
                  : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

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
