import React, { useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection = () => {
  const { t, lang } = useLanguage();
  const rawTestimonials = t('testimonials.items') || [];
  const sliderRef = useRef(null);
  const touchTimerRef = useRef(null);
  const isRu = lang === 'RU';
  
  // Provide fallbacks to avoid map over undefined
  const testimonials = rawTestimonials.length > 0 ? rawTestimonials : [
    { type: "stat", value: "0", label: "Loading..." }
  ];

  // Дублируем элементы для непрерывного бесконечного потока
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  /* ── Pause / resume helpers (RU only) ── */
  const pauseSlider = useCallback(() => {
    if (!isRu || !sliderRef.current) return;
    sliderRef.current.style.animationPlayState = 'paused';
  }, [isRu]);

  const resumeSlider = useCallback(() => {
    if (!isRu || !sliderRef.current) return;
    sliderRef.current.style.animationPlayState = 'running';
  }, [isRu]);

  const handleTouchStart = useCallback(() => {
    if (!isRu) return;
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    pauseSlider();
  }, [isRu, pauseSlider]);

  const handleTouchEnd = useCallback(() => {
    if (!isRu) return;
    touchTimerRef.current = setTimeout(resumeSlider, 1500);
  }, [isRu, resumeSlider]);

  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  /* ── Card size classes: compact for RU, original for EN ── */
  const statCardClass = isRu
    ? "flex-shrink-0 w-[260px] md:w-[300px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl px-5 py-6 flex flex-col items-center justify-center"
    : "flex-shrink-0 w-[280px] md:w-[350px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-center h-auto min-h-[250px]";

  const testimonialCardClass = isRu
    ? "flex-shrink-0 w-[300px] md:w-[340px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl px-5 py-5 flex flex-col justify-between"
    : "flex-shrink-0 w-[300px] md:w-[400px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 flex flex-col justify-between h-auto min-h-[250px]";

  const textClass = isRu
    ? "whitespace-normal break-words text-zinc-300 text-sm leading-relaxed italic mb-3"
    : "whitespace-normal break-words text-zinc-300 text-base leading-relaxed italic mb-4";

  const resultClass = isRu
    ? "text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3"
    : "text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-6";

  const authorClass = isRu
    ? "flex items-center gap-3 mt-auto pt-2"
    : "flex items-center gap-3 mt-4";

  return (
    <section className="relative z-10 py-16 md:py-24 w-full flex flex-col items-center overflow-hidden">
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            animation: slide 40s linear infinite;
          }
        `}
      </style>
      <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/5 to-rose-500/10 blur-[60px] md:blur-[60px] md:blur-[120px] w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight relative z-20">
        {t('testimonials.title')}
      </h2>

      <div className="w-full max-w-[100vw] overflow-hidden relative z-20">
        {/* Left Shadow Overlay */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9), transparent)' }}
        ></div>

        {/* Right Shadow Overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.9), transparent)' }}
        ></div>

        <div
          ref={sliderRef}
          className="flex flex-nowrap items-stretch gap-6 animate-slide w-max px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {duplicatedTestimonials.map((t, idx) => {
            /* ── Stat accent card ── */
            if (t.type === 'stat') {
              return (
                <div 
                  key={idx}
                  className={statCardClass}
                >
                  <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3 tracking-tight">
                    {t.value}
                  </span>
                  <span className="text-zinc-400 text-sm md:text-base text-center font-medium leading-snug">
                    {t.label}
                  </span>
                </div>
              );
            }

            /* ── Testimonial card ── */
            return (
              <div 
                key={idx}
                className={testimonialCardClass}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
              >
                <div>
                  <div className={`flex gap-1 ${isRu ? 'mb-3' : 'mb-4'}`}>
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className={textClass}>
                    "{t.text}"
                  </p>
                  {t.result && (
                    <p className={resultClass}>
                      {t.result}
                    </p>
                  )}
                </div>
                <div className={authorClass}>
                  <img src={t.avatar} alt={`${t.name} - GoToFlow AI content generator user`} className="w-10 h-10 rounded-full object-cover border border-white/10" loading="lazy" />
                  <div className="flex flex-col">
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-zinc-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
