import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Target } from 'lucide-react';

const metrics = [
  { icon: <Clock className="w-5 h-5 text-pink-400" />, text: "До 10 часов экономии в неделю" },
  { icon: <Zap className="w-5 h-5 text-pink-400" />, text: "Готовая карусель за ~60 секунд" },
  { icon: <Target className="w-5 h-5 text-pink-400" />, text: "Один процесс вместо 5 сервисов" },
];

const oldWay = [
  "Ищете Viral Reels вручную или в отдельном сервисе",
  "Анализируете конкурентов в отдельном инструменте",
  "Собираете карусель по кускам",
  "Получаете сырой AI-текст и допиливаете его вручную",
  "Шаблонный дизайн и “пластиковый” текст",
];

const newWay = [
  "Находите идеи за минуты и сразу превращаете их в контент",
  "Сразу видите, что работает, и используете это в своей подаче",
  "Получаете готовую карусель в одном процессе за ~60 секунд",
  "Сразу получаете структуру и текст под формат",
  "Контент в вашем стиле: свои фото, свои промпты, своя подача",
];

export const UnifiedSystem = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
    <div className="max-w-5xl mx-auto relative">

      {/* ─── Фоновое свечение позади секции ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ─── Заголовок и Подзаголовок ─── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
          4 задачи - 1 система
        </h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium text-balance">
          Шпион, viral Reels, карусели и тексты обычно живут в разных сервисах. В GoToFlow это работает как один связанный процесс.
        </p>
      </motion.div>

      {/* ─── Три верхних бокса с метриками ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 relative z-10">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-3 bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:bg-white/[0.04] transition-colors"
          >
             <div className="p-3 rounded-full bg-pink-500/10 mb-1 border border-pink-500/20 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                {m.icon}
             </div>
             <p className="text-zinc-200 font-semibold text-sm leading-snug">{m.text}</p>
          </motion.div>
        ))}
      </div>

      {/* ─── Главная парящая карточка (Монолит) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 relative z-10 shadow-2xl overflow-hidden"
      >
        {/* Внутренний шум-блик для карточки */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        {/* ─── Сравнительная таблица (2 колонки) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10">

          {/* Левая — «Обычный путь» */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col h-full">
            <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-8 text-center">
              Обычный путь
            </p>
            <div className="flex flex-col gap-6 flex-1">
              {oldWay.map((text, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                    <X className="w-3 h-3 text-zinc-500" />
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Правая — «GoToFlow» (ПОБЕДИТЕЛЬ) */}
          <div className="bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)] rounded-2xl p-6 md:p-8 md:scale-[1.02] flex flex-col h-full z-10 origin-center transition-transform">
            <p className="text-sm uppercase tracking-widest font-bold text-pink-400 mb-8 text-center shadow-pink-500 drop-shadow-sm">
              В GoToFlow
            </p>
            <div className="flex flex-col gap-6 flex-1 text-zinc-100">
              {newWay.map((text, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-pink-500/50 bg-pink-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                    <Check className="w-4 h-4 text-pink-300" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-zinc-100 font-semibold leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  </section>
);
