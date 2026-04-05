import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Target, CreditCard, Rocket } from 'lucide-react';

const metrics = [
  { icon: <Clock className="w-5 h-5 text-zinc-400 mb-2" />, text: "До 10 часов экономии в неделю" },
  { icon: <Zap className="w-5 h-5 text-zinc-400 mb-2" />, text: "Готовая карусель за ~60 секунд" },
  { icon: <Target className="w-5 h-5 text-zinc-400 mb-2" />, text: "Один процесс вместо 5 сервисов" },
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
    <div className="max-w-5xl mx-auto relative z-10">

      {/* ─── Фоновое свечение позади монолита (Вне его) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-transparent blur-[120px] -z-10 pointer-events-none" />

      {/* ─── Главная обертка (Монолит) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] p-8 md:p-12 relative z-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
      >
        {/* Внутренний шум-блик для карточки */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
            {/* ─── Заголовок и Подзаголовок ─── */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
                4 задачи - 1 система
              </h2>
              <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium text-balance">
                Шпион, viral Reels, карусели и тексты обычно живут в разных сервисах. В GoToFlow это работает как один связанный процесс.
              </p>
            </div>

            {/* ─── Три верхних бокса с метриками ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center hover:bg-white/[0.05] transition-colors"
                >
                  {m.icon}
                  <p className="text-zinc-300 font-semibold text-sm leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* ─── Сравнительная таблица (2 колонки) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">

              {/* Левая — «Обычный путь» */}
              <div className="bg-black/40 border border-white/[0.05] rounded-2xl p-6 flex flex-col h-full">
                <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-8 text-center">
                  Обычный путь
                </p>
                <div className="flex flex-col gap-6 flex-1">
                  {oldWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <X className="w-3 h-3 text-zinc-500" />
                      </div>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая — «GoToFlow» (ПОБЕДИТЕЛЬ) */}
              <div className="bg-white/[0.02] border border-pink-500/40 rounded-2xl p-6 relative overflow-hidden flex flex-col h-full transform transition-transform md:scale-[1.02]">
                 {/* Легкий градиент внутри */}
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none" />

                 <div className="relative z-10 flex flex-col h-full">
                    <p className="text-sm uppercase tracking-widest font-bold text-pink-400 mb-8 text-center drop-shadow-sm">
                      GoToFlow
                    </p>
                    <div className="flex flex-col gap-6 flex-1 text-zinc-100">
                      {newWay.map((text, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-pink-500/20 bg-pink-500/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-pink-500" strokeWidth={3} />
                          </div>
                          <p className="text-sm text-zinc-100 font-semibold leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

            </div>

             {/* ─── Кнопки (Внизу) ─── */}
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
                {/* Кнопка Демо */}
                <button className="group flex flex-col items-center gap-1 px-7 py-4 rounded-2xl border border-white/10 bg-transparent text-white font-semibold text-base hover:bg-white/[0.03] transition-all duration-300 min-w-[200px]">
                  <span>Посмотреть демо</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-normal text-zinc-500">
                    <CreditCard className="w-3 h-3" />
                    Без привязки карты
                  </span>
                </button>

                {/* Кнопка CTA */}
                <button className="group flex flex-col items-center gap-1 px-7 py-4 rounded-2xl border border-pink-500/50 bg-pink-500/5 text-white font-semibold text-base shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:bg-pink-500/10 transition-all duration-300 min-w-[200px]">
                  <span>Запустить бесплатно</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-normal text-pink-400/80">
                    <Rocket className="w-3 h-3" />
                    Первый результат за 60 секунд
                  </span>
                </button>
             </div>
        </div>
      </motion.div>
    </div>
  </section>
);
