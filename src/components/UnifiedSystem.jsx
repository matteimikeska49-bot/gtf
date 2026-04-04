import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, CreditCard, Rocket } from 'lucide-react';

/* ─── Данные сравнения ─── */
const rows = [
  {
    label:   'Viral Reels и идеи',
    problem: 'поиск вручную или отдельный сервис',
    solution:'нашли → адаптировали → сделали контент',
  },
  {
    label:   'Анализ конкурентов',
    problem: 'отдельный spy-tool',
    solution:'увидели, что работает → использовали в своей подаче',
  },
  {
    label:   'Карусели',
    problem: 'текст + дизайн + сборка в разных местах',
    solution:'всё в одном процессе',
  },
  {
    label:   'Тексты и структура',
    problem: 'сырой AI-черновик',
    solution:'готовый результат под формат и задачу',
  },
];

export const UnifiedSystem = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">

    <div className="max-w-5xl mx-auto relative">

      {/* ─── Фоновое свечение позади монолита ─── */}
      <div className="absolute -inset-12 bg-pink-600/10 blur-[120px] opacity-20 rounded-[4rem] pointer-events-none -z-10" />

      {/* ─── Монолит ─── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] p-10 md:p-16 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Внутренний шум-блик */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        {/* ─── Заголовок ─── */}
        <div className="text-center mb-14 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            4 задачи.{' '}
            <span className="text-gradient-brand">1 система.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium text-balance">
            Шпион, viral Reels, карусели и тексты обычно живут в разных сервисах.
            В GoToFlow это работает как один связанный процесс.
          </p>
        </div>

        {/* ─── Две колонки сравнения ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 mb-14">

          {/* Левая — «Обычно» */}
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-6">
              Обычно
            </p>
            <div className="flex flex-col gap-6">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                    <X className="w-3 h-3 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500 mb-0.5">{row.label}</p>
                    <p className="text-sm text-zinc-600 leading-relaxed">{row.problem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая — «В GoToFlow» */}
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-pink-400/80 mb-6">
              В GoToFlow
            </p>
            <div className="flex flex-col gap-6">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-pink-500/40 bg-pink-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-300 mb-0.5">{row.label}</p>
                    <p className="text-sm text-zinc-400 font-medium leading-relaxed">{row.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Разделитель ─── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-10 relative z-10" />

        {/* ─── Кнопки ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">

          {/* Кнопка Демо */}
          <button className="group flex flex-col items-center gap-1 px-7 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-semibold text-base hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 min-w-[200px]">
            <span>Посмотреть демо</span>
            <span className="flex items-center gap-1.5 text-[11px] font-normal text-zinc-600">
              <CreditCard className="w-3 h-3" />
              Без привязки карты
            </span>
          </button>

          {/* Кнопка CTA */}
          <button className="group flex flex-col items-center gap-1 px-7 py-4 rounded-2xl border border-pink-500/40 bg-pink-500/10 text-white font-semibold text-base shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_36px_rgba(236,72,153,0.45)] hover:bg-pink-500/15 hover:border-pink-500/60 transition-all duration-300 min-w-[200px]">
            <span>Запустить бесплатно</span>
            <span className="flex items-center gap-1.5 text-[11px] font-normal text-pink-400/60">
              <Rocket className="w-3 h-3" />
              Первый результат за 60 секунд
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);
