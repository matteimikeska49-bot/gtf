import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Settings2, Zap, ImageIcon } from 'lucide-react';

/* ─── Screenshot placeholder ─── */
const ScreenshotPlaceholder = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className="relative w-full aspect-[4/3] rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group"
  >
    {/* Animated inner glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-indigo-500/5 animate-pulse" />
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />
    {/* Placeholder center */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-zinc-600" />
      </div>
      <span className="text-xs text-zinc-600 font-medium tracking-wide">Скриншот интерфейса</span>
    </div>
    {/* Hover shimmer */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent" />
  </motion.div>
);

const points = [
  {
    icon: Fingerprint,
    title: "Ваш стиль, а не типовой AI-текст",
    desc: "Сохраняйте tone of voice, визуальную подачу и структуру, чтобы контент выглядел как ваш, а не как шаблонная генерация.",
  },
  {
    icon: Settings2,
    title: "Контроль на каждом этапе",
    desc: "Задавайте темы, идеи и вводные, направляйте результат и редактируйте детали так, как нужно именно вам.",
  },
  {
    icon: Zap,
    title: "Меньше ручной доработки",
    desc: "GoToFlow берёт на себя черновую работу, чтобы вы не переписывали каждый текст с нуля и не собирали контент по кускам.",
  },
];

export const DifferentiationSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

      {/* Background ambient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/15 blur-[130px] opacity-25 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-900/15 blur-[120px] opacity-20 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ─── Колонка 1: Текст + список пунктов ─── */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Персонализация</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15] text-balance">
              GoToFlow <span className="text-gradient-brand">подстраивается</span>
              <br className="hidden lg:block" /> под вас, а не наоборот
            </h2>

            <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed text-balance mb-12">
              Пока другие чаты пишут как маркетологи, а сервисы предлагают жёсткие шаблоны — GoToFlow запоминает вашу подачу, чтобы контент звучал так, будто его написали вы, а не машина.
            </p>
          </motion.div>

          {/* Вертикальный список пунктов */}
          <div className="flex flex-col gap-5">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: "easeOut" }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-pink-500 blur-xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
                  <point.icon className="w-5 h-5 text-pink-300 relative z-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1 tracking-tight group-hover:text-pink-100 transition-colors">
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

        {/* ─── Колонка 2: Блок скриншотов ─── */}
        <div className="relative flex flex-col gap-5">
          {/* Радиальное неоновое свечение — «парящий» эффект */}
          <div className="absolute -inset-8 bg-pink-500/8 blur-[80px] rounded-[3rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

          <ScreenshotPlaceholder delay={0.2} />
          <ScreenshotPlaceholder delay={0.35} />
        </div>

      </div>
    </section>
  );
};
