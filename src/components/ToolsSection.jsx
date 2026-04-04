import React from 'react';
import { motion } from 'framer-motion';
import { Play, Radar, Search, Layers, Fingerprint, CalendarDays, Rss, Clock, Zap, Sparkles } from 'lucide-react';

/* ─── Gif Placeholder ─── */
const GifPlaceholder = ({ icon: Icon }) => (
  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-white/10 transition-colors duration-500">
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-indigo-500/5 animate-pulse" />
    {/* Center icon */}
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-zinc-500" />
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
        <Play className="w-3 h-3 text-zinc-500" />
        <span className="text-xs text-zinc-500 font-medium">GIF preview</span>
      </div>
    </div>
  </div>
);

/* ─── БЛОК 1: Главные инструменты ─── */
const coreTools = [
  {
    icon: Radar,
    title: "Радар конкурентов",
    desc: "Анализируйте, что залетает у конкурентов, находите вирусные форматы и в один клик превращайте их в готовый контент.",
    accentColor: "from-pink-500/10 to-pink-500/0",
    iconGlow: "bg-pink-500",
    iconColor: "text-pink-300",
    borderHover: "group-hover:border-pink-500/20",
    featured: false,
  },
  {
    icon: Layers,
    title: "Из идеи — в карусель",
    desc: "Собирайте готовую карусель из темы, идеи, pdf, ссылки или видео — за 60 секунд.",
    accentColor: "from-pink-500/15 to-orange-500/10",
    iconGlow: "bg-gradient-to-r from-pink-500 to-orange-500",
    iconColor: "text-orange-300",
    borderHover: "group-hover:border-pink-500/30",
    featured: true,
  },
  {
    icon: Search,
    title: "Поиск сильных Reels",
    desc: "Ищите сильные Reels по своей теме, забирайте сильные механики и в один клик превращайте их в карусели, посты, видео.",
    accentColor: "from-violet-500/10 to-violet-500/0",
    iconGlow: "bg-violet-500",
    iconColor: "text-violet-300",
    borderHover: "group-hover:border-violet-500/20",
    featured: false,
  },
];

/* ─── БЛОК 2: Coming Soon ─── */
const comingSoon = [
  { icon: CalendarDays, label: "Автопилот контента" },
  { icon: Rss,          label: "Контент-план" },
  { icon: Clock,        label: "Автопостинг" },
  { icon: Play,         label: "Короткие Reels (5–10 с)" },
];

/* ─── БЛОК 3: Персонализация ─── */
const personalizePoints = [
  {
    icon: Fingerprint,
    title: "Ваш Tone of Voice",
    desc: "Система запоминает ваш стиль письма, любимые обороты и манеру подачи — контент звучит как вы, а не как робот.",
  },
  {
    icon: Zap,
    title: "Визуальная подача",
    desc: "Настройте эстетику раз и забудьте. GoToFlow адаптирует структуру карточек под ваш бренд.",
  },
  {
    icon: Sparkles,
    title: "Свои темы и промпты",
    desc: "Добавляйте собственные тематики, стоп-слова и правила. Система обучается вашему подходу со временем.",
  },
];

export const ToolsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

      {/* Background ambient */}
      <div className="absolute left-[10%] top-1/3 w-[800px] h-[800px] bg-indigo-950/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute right-[5%] bottom-1/3 w-[600px] h-[600px] bg-pink-950/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">

        {/* ═══════════════════════════════
            БЛОК 1 — Главные инструменты
        ═══════════════════════════════ */}
        <div>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-14 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5" />
              <span>Ядро продукта</span>
            </div>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight text-balance">
                <span className="text-gradient-brand">Три инструмента</span> — всё,{' '}
                <br className="hidden md:block" />
                что нужно для роста
              </h2>
            </div>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">
              Находите идеи, анализируйте конкурентов и превращайте это в готовый контент — в один клик
            </p>
          </motion.div>

          {/* Стеклянная подложка */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreTools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`group p-px rounded-[2rem] relative overflow-hidden ${
                    tool.featured
                      ? 'bg-gradient-to-b from-pink-500/30 to-orange-500/10 shadow-[0_0_40px_rgba(236,72,153,0.12)]'
                      : 'bg-gradient-to-b from-white/10 to-white/0'
                  }`}
                >
                  <div className={`h-full rounded-[2rem] p-7 flex flex-col gap-6 border transition-colors duration-500 overflow-hidden relative ${
                    tool.featured
                      ? 'bg-[#0f0a0c] border-pink-500/25 group-hover:border-pink-500/40'
                      : `bg-[#0a0a0a]/90 border-white/[0.03] ${tool.borderHover}`
                  }`}>
                    {/* Featured label */}
                    {tool.featured && (
                      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-pink-300 tracking-widest uppercase">Популярное</span>
                      </div>
                    )}

                    {/* Hover accent gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                    {/* GIF placeholder */}
                    <GifPlaceholder icon={tool.icon} />

                    {/* Content */}
                    <div className="flex flex-col gap-4 relative z-10">
                      <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] group-hover:scale-110 transition-transform duration-500">
                        <div className={`absolute inset-0 ${tool.iconGlow} blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`} />
                        <tool.icon className={`w-5 h-5 ${tool.iconColor} relative z-10`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold mb-2 tracking-tight ${
                          tool.featured ? 'text-white' : 'text-white'
                        }`}>
                          {tool.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            БЛОК 2 — Coming Soon
        ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-zinc-600 font-bold mb-2">В разработке</p>
            <h3 className="text-2xl font-bold text-zinc-300 tracking-tight">Что появится скоро</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {comingSoon.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] text-center group hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
                <span className="text-sm text-zinc-400 font-medium leading-snug group-hover:text-zinc-300 transition-colors">
                  {item.label}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-zinc-700/60 text-zinc-500 bg-zinc-900/60">
                  Скоро
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════
            БЛОК 3 — Персонализация
        ═══════════════════════════════ */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Персонализация</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight text-balance">
                Работает в{' '}
                <span className="text-gradient-brand">вашем стиле,</span>
                <br />а не по шаблонам
              </h2>
              <p className="text-zinc-400 leading-relaxed font-medium max-w-lg">
                GoToFlow — не очередной генератор текста. Это система, которая запоминает вас: ваш голос, подачу, темы и правила. С каждым использованием — точнее.
              </p>
            </motion.div>

            {/* Right: feature list */}
            <div className="flex flex-col gap-5">
              {personalizePoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                  className="flex items-start gap-5 group"
                >
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 bg-[#050505] shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
                    <point.icon className="w-5 h-5 text-indigo-300 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 tracking-tight group-hover:text-indigo-100 transition-colors">
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
        </div>

      </div>
    </section>
  );
};
