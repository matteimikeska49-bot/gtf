import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Settings2, Zap, ImageIcon } from 'lucide-react';

/* ─── Flexible Screenshot Component ─── */
const ScreenshotCard = ({ imageId, className = '', delay = 0 }) => {
  const [imgError, setImgError] = React.useState(false);
  const imageSrc = `/images/screens/screen-${imageId}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.55)] group transition-all duration-500 hover:scale-[1.02] ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Если картинка не сломалась, пробуем её загрузить */}
      {!imgError ? (
        <img
          src={imageSrc}
          alt={`Screenshot ${imageId}`}
          className="w-full h-auto object-cover block relative z-10"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Placeholder fallback (если файла пока нет) */
        <div className="w-full aspect-[16/10] flex flex-col items-center justify-center relative z-10 bg-[#0c0c0c]/50">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-indigo-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:18px_18px]" />
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3">
            <ImageIcon className="w-5 h-5 text-zinc-600" />
          </div>
          <span className="text-[11px] text-zinc-500 font-medium tracking-wide font-mono">
            /images/screens/screen-{imageId}.png
          </span>
        </div>
      )}
      
      {/* Свечение при наведении */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.05] to-transparent" />
    </motion.div>
  );
};

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
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0808] to-[#050505]">

      {/* Усиленное розовое/маджента свечение — эмоции */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-pink-600 opacity-[0.08] blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ─── Колонка 1: Текст + список ─── */}
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

          <div className="flex flex-col gap-4">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
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

        {/* ─── Колонка 2: 3 скриншота без пересечений ─── */}
        <div className="relative self-start w-full pt-4 md:pt-10">
          {/* Умеренное свечение (без пересвета) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Stagger-компоновка (лесенка) */}
          <div className="flex flex-col gap-6 md:gap-8 w-full relative z-10 pb-4">
            <ScreenshotCard 
              imageId="1" 
              delay={0.2} 
              className="w-full md:w-[90%] md:self-start" 
            />
            <ScreenshotCard 
              imageId="2" 
              delay={0.35} 
              className="w-full md:w-[90%] md:self-center" 
            />
            <ScreenshotCard 
              imageId="3" 
              delay={0.5} 
              className="w-full md:w-[90%] md:self-end" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};
