import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Target, CreditCard, Rocket } from 'lucide-react';

const metrics = [
  { icon: <Clock className="w-6 h-6" />, color: 'text-amber-400', ring: 'bg-amber-500/10 border-amber-500/20', text: "До 10 часов экономии в неделю" },
  { icon: <Zap className="w-6 h-6" />,   color: 'text-violet-400', ring: 'bg-violet-500/10 border-violet-500/20', text: "Готовая карусель за ~60 секунд" },
  { icon: <Target className="w-6 h-6" />, color: 'text-rose-400',  ring: 'bg-rose-500/10 border-rose-500/20',   text: "Один процесс вместо 5 сервисов" },
];

const oldWay = [
  "Ищете Viral Reels вручную или в отдельном сервисе",
  "Анализируете конкурентов в отдельном инструменте",
  "Собираете карусель по кускам",
  "Получаете сырой AI-текст и допиливаете его вручную",
  "Шаблонный дизайн и «пластиковый» текст",
];

const newWay = [
  "Находите идеи за минуты и сразу превращаете их в контент",
  "Сразу видите, что работает, и используете это в своей подаче",
  "Получаете готовую карусель в одном процессе за ~60 секунд",
  "Сразу получаете структуру и текст под формат",
  "Контент в вашем стиле: свои фото, свои промпты, своя подача",
];

/* ─── Анимированная дымка (Haze) ─── */
const DriftHaze = () => (
  <div className="absolute inset-[-10%] pointer-events-none -z-10 overflow-hidden">
    {/* Левый свет */}
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-[10%] top-[20%] w-[55%] h-[60%] bg-pink-500/15 blur-[150px] rounded-full"
    />
    {/* Правый свет */}
    <motion.div
      animate={{ y: [10, -10, 10] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      className="absolute -right-[10%] bottom-[20%] w-[55%] h-[60%] bg-orange-500/10 blur-[150px] rounded-full"
    />
  </div>
);

export const UnifiedSystem = () => (
  <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
    <div className="max-w-6xl mx-auto relative z-10">

      {/* ─── Заголовок секции ─── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
          4 задачи -{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">1 система</span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
          Шпион, viral Reels, карусели и тексты обычно живут в разных сервисах.
          В GoToFlow это работает как один связанный процесс.
        </p>
      </motion.div>

      {/* ─── Монолит ─── */}
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative"
      >
        {/* Плавный теплый фон вместо крыльев */}
        <DriftHaze />

        {/* Стеклянная подложка */}
        <div
          className="relative bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14 overflow-hidden border border-white/[0.05]"
          style={{ boxShadow: '0 50px 100px -20px rgba(0,0,0,1)' }}
        >
          {/* Верхний линейный блик (Теплый) */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
          
          {/* Микро-звёздная текстура */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />

          <div className="relative z-10 flex flex-col">

            {/* ─── 3 метрики (Уменьшенные) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto w-full">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 backdrop-blur-3xl rounded-2xl py-4 px-6 text-center hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-xl border mb-3 ${m.ring}`}>
                    <span className={m.color}>{m.icon}</span>
                  </div>
                  <p className="text-zinc-400 font-medium text-sm leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* ─── Сравнительная таблица ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">

              {/* Левая — Обычный путь */}
              <div className="bg-black/40 border border-white/[0.04] rounded-2xl p-6 md:p-8 flex flex-col h-full">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600 mb-8 text-center">
                  Обычный путь
                </p>
                <div className="flex flex-col gap-5 flex-1">
                  {oldWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <X className="w-3 h-3 text-zinc-600" />
                      </div>
                      <p className="text-sm md:text-base text-zinc-500 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая — С GoToFlow (Nested Glassmorphism) */}
              <div className="bg-white/[0.01] backdrop-blur-md border border-white/5 shadow-2xl rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col h-full">
                
                {/* Мягкий угловой глоу */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none" />

                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent relative z-10">
                  GoToFlow
                </p>
                <div className="flex flex-col gap-5 flex-1 relative z-10">
                  {newWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-pink-500/30 bg-pink-500/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-pink-400" strokeWidth={3} />
                      </div>
                      <p className="text-sm md:text-base text-white font-medium leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Кнопки ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Левая — темная */}
              <button className="flex flex-col items-center gap-1 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-semibold text-base hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 min-w-[210px]">
                <span>Посмотреть демо</span>
                <span className="flex items-center gap-1.5 text-[11px] font-normal text-zinc-500">
                  <CreditCard className="w-3 h-3" />
                  Без привязки карты
                </span>
              </button>

              {/* Правая — Градиентная кнопка (от Image_1) */}
              <button
                className="flex flex-col items-center gap-1 py-4 px-8 rounded-2xl text-white font-bold text-lg min-w-[210px] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(to right, #ec4899, #f43f5e, #fb923c)', // from-pink-500 via-rose-500 to-orange-400
                  boxShadow: '0 0 30px rgba(249,115,22,0.25), 0 0 60px rgba(236,72,153,0.15)',
                }}
              >
                <span className="flex items-center gap-2">
                  Запустить бесплатно
                  <Rocket className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-normal text-white/80">Первый результат за 60 секунд</span>
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
