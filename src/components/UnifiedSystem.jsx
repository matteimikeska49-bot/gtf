import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Zap } from 'lucide-react';

const cards = [
  {
    title: 'Viral Reels и идеи',
    icon: '🎬',
    problem: 'поиск вручную или отдельный сервис',
    solution: 'нашли → адаптировали → сделали контент',
  },
  {
    title: 'Анализ конкурентов',
    icon: '🔍',
    problem: 'отдельный spy-tool',
    solution: 'увидели, что работает → использовали в своей подаче',
  },
  {
    title: 'Карусели',
    icon: '🎠',
    problem: 'текст + дизайн + сборка в разных местах',
    solution: 'всё в одном процессе',
  },
  {
    title: 'Тексты и структура',
    icon: '✍️',
    problem: 'сырой AI-черновик',
    solution: 'готовый результат под формат и задачу',
  },
];

const Card = ({ card, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 lg:p-8 group hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300"
  >
    {/* Заголовок карточки */}
    <div className="flex items-center gap-3 mb-5">
      <span className="text-2xl">{card.icon}</span>
      <h3 className="text-lg font-bold text-white tracking-tight">{card.title}</h3>
    </div>

    {/* Старый подход */}
    <div className="flex items-start gap-2.5 mb-4">
      <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
        <X className="w-2.5 h-2.5 text-zinc-600" />
      </div>
      <div>
        <span className="text-[11px] uppercase tracking-widest font-bold text-zinc-600 block mb-0.5">
          Обычно
        </span>
        <p className="text-sm text-zinc-500 leading-relaxed">{card.problem}</p>
      </div>
    </div>

    {/* Стрелка-разделитель */}
    <div className="flex items-center gap-2 mb-4 pl-6">
      <ArrowRight className="w-3.5 h-3.5 text-pink-500/60" />
    </div>

    {/* Новый подход — выделенный блок */}
    <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 relative overflow-hidden">
      {/* Лёгкий блик */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
      <div className="flex items-start gap-2.5 relative z-10">
        <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
          <Zap className="w-2.5 h-2.5 text-pink-400" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-widest font-bold text-pink-400/80 block mb-0.5">
            В GoToFlow
          </span>
          <p className="text-sm text-zinc-200 font-medium leading-relaxed">{card.solution}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const UnifiedSystem = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

    {/* Фоновый ambient */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

    <div className="max-w-5xl mx-auto relative z-10">

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-14"
      >
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-xs tracking-widest uppercase font-bold mb-6 backdrop-blur-md">
          <Zap className="w-3 h-3 text-pink-400" />
          <span>Единый workflow</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
          4 задачи.{' '}
          <span className="text-gradient-brand">1 система.</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium text-balance">
          Шпион, viral Reels, карусели и тексты обычно живут в разных сервисах. В GoToFlow это работает как один связанный процесс.
        </p>
      </motion.div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>
    </div>
  </section>
);
