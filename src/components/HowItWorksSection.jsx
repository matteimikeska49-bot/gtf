import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CornerDownLeft, Sparkles, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

/* ─── Микро-UI: Имитация поля ввода (Шаг 1) ─── */
const InputMockup = () => {
  const { t } = useLanguage();
  return (
    <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/20">
        <span className="text-xs text-zinc-500 flex-1 truncate font-mono">https://youtube.com/watch?v=...</span>
        <div className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center">
          <CornerDownLeft className="w-3 h-3 text-zinc-400" />
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/20">
        <span className="text-xs text-zinc-500 flex-1 truncate font-mono">{t('howItWorks.mockup.topic')}</span>
        <div className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center">
          <CornerDownLeft className="w-3 h-3 text-zinc-400" />
        </div>
      </div>
    </div>
  );
};

/* ─── Микро-UI: Анимированный прогресс-бар генерации (Шаг 2) ─── */
const ProgressMockup = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const DURATION = 2800; // ms for 0 -> 100
    const STEP = 16;       // ~60fps
    let current = 0;
    const tick = () => {
      current = (current + (100 * STEP) / DURATION);
      if (current >= 100) {
        setPct(100);
        setTimeout(() => { current = 0; setPct(0); }, 600);
      } else {
        setPct(Math.floor(current));
      }
    };
    const id = setInterval(tick, STEP);
    return () => clearInterval(id);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="mt-6 w-full max-w-xs flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-500 font-medium tracking-wide">{t('howItWorks.mockup.generation')}</span>
        <span className="text-[11px] text-zinc-400 font-bold tabular-nums">{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 transition-[width] duration-[16ms] ease-linear shadow-[0_0_20px_rgba(236,72,153,0.6)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* ─── Микро-UI: Кнопка экспорта (Шаг 3) ─── */
const ExportMockup = () => {
  const { t } = useLanguage();
  return (
    <div className="mt-6">
      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)] text-pink-300 text-xs font-semibold tracking-wide transition-all hover:shadow-[0_0_28px_rgba(236,72,153,0.4)] hover:bg-pink-500/15 hover:border-pink-500/70 group">
        <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        {t('howItWorks.mockup.download')}
      </button>
    </div>
  );
};

export const HowItWorksSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const rawSteps = t('howItWorks.steps') || [];
  
  const steps = [
    {
      icon: CornerDownLeft,
      number: 1,
      title: rawSteps[0]?.title || "",
      desc: rawSteps[0]?.desc || "",
      micro: <InputMockup />,
    },
    {
      icon: Sparkles,
      number: 2,
      title: rawSteps[1]?.title || "",
      desc: rawSteps[1]?.desc || "",
      micro: <ProgressMockup />,
    },
    {
      icon: Download,
      number: 3,
      title: rawSteps[2]?.title || "",
      desc: rawSteps[2]?.desc || "",
      micro: <ExportMockup />,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-black">

      {/* Фоновый свет под весь блок */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-orange-500/15 blur-[60px] md:blur-[60px] md:blur-[120px] -z-10 pointer-events-none rounded-full" />

      {/* ─── Парящий стеклянный контейнер ─── */}
      <div className="max-w-7xl mx-auto bg-[#050505]/60 border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl relative z-10 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_40px_rgba(236,72,153,0.15)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('howItWorks.badge')}</span>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight text-balance">
              {t('howItWorks.titlePart1')} <br className="hidden md:block"/> {t('howItWorks.titlePart2')} <span className="text-gradient-brand">{t('howItWorks.titleHighlight')}</span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="relative mt-12 max-w-5xl mx-auto">

          {/* ─── Фоновое свечение за карточками ─── */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-[30px] md:blur-[50px] md:blur-[30px] md:blur-[50px] md:blur-[100px] -z-10 pointer-events-none rounded-[3rem]" />

          {/* Соединяющая линия — desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />

          {/* Анимированная бегущая неон-линия */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_15px_#ffffff]"
            />
          </div>

          {/* Вертикальная линия — mobile */}
          <div className="md:hidden absolute left-[3.25rem] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                className={`relative group flex flex-col md:items-center text-left md:text-center transform-gpu ${
                  i === 1 ? 'lg:scale-105' : ''
                }`}
              >
                {/* Иконка с номером */}
                <div className={`relative w-16 h-16 flex items-center justify-center rounded-2xl border shrink-0 mb-10 z-20 shadow-2xl group-hover:scale-110 transition-transform duration-500 mx-0 md:mx-auto ${
                  i === 1
                    ? 'border-pink-500/50 bg-[#0a0a0a] shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'border-white/10 bg-[#0a0a0a] group-hover:border-pink-500/40 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                }`}>
                  <div className={`absolute inset-0 blur-xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 rounded-2xl ${
                    i === 1 ? 'bg-pink-500' : 'bg-white'
                  }`} />
                  <step.icon className={`w-6 h-6 relative z-10 ${
                    i === 1 ? 'text-pink-300' : 'text-zinc-100'
                  }`} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400">
                    {step.number}
                  </div>
                </div>

                {/* Карточка с микро-UI */}
                <div className={`w-full backdrop-blur-xl p-8 rounded-3xl border transition-[transform,border-color] duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1 md:hover:-translate-y-2 transform-gpu bg-gradient-to-b from-white/[0.08] to-white/[0.02] ${
                  i === 1
                    ? 'border-pink-500/40 hover:border-pink-500/60'
                    : 'border-white/[0.15] hover:border-white/25'
                }`}>
                  {/* Общий блик */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                  {/* Акцентный блик для центральной карточки */}
                  {i === 1 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />
                  )}

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 font-medium leading-relaxed text-sm relative z-10">
                    {step.desc}
                  </p>

                  {/* Микро-UI блок */}
                  <div className="relative z-10 flex md:justify-center">
                    {step.micro}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>{/* /grid */}
        </div>{/* /relative mt-12 */}
      </div>{/* /outer island */}
    </section>
  );
};
