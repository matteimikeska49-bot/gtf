import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Settings2, Zap, ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

/* ─── Premium Bento Screenshot Component ─── */
const ScreenshotCard = ({ imageId, className = '', delay = 0 }) => {
  const [imgError, setImgError] = React.useState(false);
  const imageSrc = `/images/screens/screen-${imageId}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      {/* Деликатный внешний Ambient Glow от карточки */}
      <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/20 via-rose-400/10 to-orange-500/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] z-0 pointer-events-none" />
      
      {/* Premium Капсула (Рамка вокруг скриншота) */}
      <div className="relative z-10 p-2 md:p-3 bg-[#ffffff03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[1.25rem] flex flex-col justify-center h-full group-hover:border-white/[0.14] group-hover:bg-[#ffffff05] transition-colors duration-500">
        
        {/* Внутреннее аккуратное свечение (Inner Highlight) */}
        <div className="absolute inset-0 shadow-[inset_0_2px_15px_rgba(255,255,255,0.06)] rounded-[1.25rem] pointer-events-none" />
        
        {/* Контейнер самого контента (Изображение) */}
        <div className="relative rounded-[0.75rem] overflow-hidden border border-white/[0.03] bg-[#0c0508] shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] flex-grow flex items-center justify-center">
          {!imgError ? (
            <img
              src={imageSrc}
              alt={`GoToFlow AI social media content generator interface screen ${imageId}`}
              // w-full и h-auto: картинка сама задаёт пропорции, мы её не сжимаем и не обрезаем! 
              className="w-full h-auto block object-contain transition-transform duration-700 ease-[0.21,0.47,0.32,0.98] group-hover:scale-[1.02] transform-gpu origin-center"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full aspect-[4/3] flex flex-col items-center justify-center relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-orange-500/5 animate-pulse" />
              <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-2">
                <ImageIcon className="w-5 h-5 text-zinc-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const DifferentiationSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const rawPoints = t('differentiation.points') || [];

  const points = [
    {
      icon: Fingerprint,
      title: rawPoints[0]?.title || "",
      desc: rawPoints[0]?.desc || "",
    },
    {
      icon: Settings2,
      title: rawPoints[1]?.title || "",
      desc: rawPoints[1]?.desc || "",
    },
    {
      icon: Zap,
      title: rawPoints[2]?.title || "",
      desc: rawPoints[2]?.desc || "",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0808] to-[#050505]">

      {/* Усиленное розовое/маджента свечение — эмоции */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-pink-600 opacity-[0.08] blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ─── Колонка 1: Текст + список ─── */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 24 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>{t('differentiation.badge')}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15] text-balance">
              {t('differentiation.titlePart1')} <span className="text-gradient-brand">{t('differentiation.titleHighlight')}</span>
              <br className="hidden lg:block" /> {t('differentiation.titlePart2')}
            </h2>

            <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed text-balance mb-12">
              {t('differentiation.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.13, ease: "easeOut" }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-pink-500 blur-xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
                  <point.icon className="w-5 h-5 text-pink-300 relative z-10" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 tracking-tight group-hover:text-pink-100 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Колонка 2: Компактный Bento Grid ─── */}
        <div className="relative self-center w-full max-w-[550px] lg:max-w-none mx-auto lg:ml-auto lg:mr-0 pt-0">
          
          {/* Глубокая подсветка (Premium Depth Glow) под самим Grid-ом */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12)_0%,transparent_60%)] blur-[70px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_60%)] blur-[50px] pointer-events-none z-0" />

          {/* Bento-компоновка (Сетка растягивает элементы равномерно без обрезки) */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full relative z-10 items-stretch">
            {/* Левый верхний */}
            <div className="col-span-1">
              {/* className h-full заставляет карточку дотянуться до высоты соседней, если та выше */}
              <ScreenshotCard 
                imageId="1" 
                delay={0.2} 
                className="w-full h-full" 
              />
            </div>
            {/* Правый верхний */}
            <div className="col-span-1">
              <ScreenshotCard 
                imageId="2" 
                delay={0.3} 
                className="w-full h-full" 
              />
            </div>
            {/* Нижний широкий */}
            <div className="col-span-2">
              <ScreenshotCard 
                imageId="3" 
                delay={0.4} 
                className="w-full" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
