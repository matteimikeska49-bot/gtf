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
  "Шаблонный дизайн и \u00abпластиковый\u00bb текст",
];

const newWay = [
  "Находите идеи за минуты и сразу превращаете их в контент",
  "Сразу видите, что работает, и используете это в своей подаче",
  "Получаете готовую карусель в одном процессе за ~60 секунд",
  "Сразу получаете структуру и текст под формат",
  "Контент в вашем стиле: свои фото, свои промпты, своя подача",
];

/* ─── Анимированные «Неоновые Крылья» ─── */
const NeonWings = () => (
  <div className="absolute inset-[-10%] pointer-events-none -z-10 overflow-hidden">
    {/* Левое крыло */}
    <motion.div
      animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.06, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-[15%] top-1/2 -translate-y-1/2 w-[65%] h-[90%] bg-fuchsia-700/35 blur-[130px] rounded-full"
    />
    {/* Правое крыло */}
    <motion.div
      animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.06, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      className="absolute -right-[15%] top-1/2 -translate-y-1/2 w-[65%] h-[90%] bg-purple-700/35 blur-[130px] rounded-full"
    />
    {/* Нижняя центральная волна */}
    <motion.div
      animate={{ opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-violet-600/20 blur-[110px] rounded-full"
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
          <span className="text-gradient-brand">1 система</span>
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
        {/* Анимированные неоновые крылья за монолитом */}
        <NeonWings />

        {/* Стеклянная подложка */}
        <div
          className="relative bg-[#06030a] backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-14 overflow-hidden"
          style={{
            border: '1px solid rgba(217,70,239,0.22)',
            boxShadow: '0 0 0 1px rgba(139,92,246,0.08), 0 50px_100px_-20px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Верхний неоновый блик */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
          {/* Нижняя линия */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

          {/* Микро-звёздная текстура */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.018]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '38px 38px' }}
          />

          <div className="relative z-10 flex flex-col">

            {/* ─── 3 метрики ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl border mb-3 ${m.ring}`}>
                    <span className={m.color}>{m.icon}</span>
                  </div>
                  <p className="text-white font-semibold text-base md:text-lg leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* ─── Сравнительная таблица (2 колонки на всю ширину) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">

              {/* Левая — матовый glass pod, тусклый */}
              <div className="bg-black/60 border border-white/[0.07] rounded-2xl p-6 md:p-8 flex flex-col h-full">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600 mb-8 text-center">
                  Обычный путь
                </p>
                <div className="flex flex-col gap-5 flex-1">
                  {oldWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <X className="w-3 h-3 text-zinc-600" />
                      </div>
                      <p className="text-base md:text-lg text-zinc-500 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая — чистый glass pod, победитель */}
              <div
                className="bg-black/40 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col h-full"
                style={{
                  border: '1px solid rgba(217,70,239,0.38)',
                  boxShadow: 'inset 0 0 50px rgba(139,92,246,0.05)',
                }}
              >
                {/* Угловое свечение */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-fuchsia-600/10 blur-[50px] rounded-full pointer-events-none" />

                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-400 bg-clip-text text-transparent relative z-10">
                  GoToFlow
                </p>
                <div className="flex flex-col gap-5 flex-1 relative z-10">
                  {newWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-fuchsia-500/50 bg-fuchsia-500/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-fuchsia-400" strokeWidth={3} />
                      </div>
                      <p className="text-base md:text-lg text-white font-medium leading-relaxed">{text}</p>
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

              {/* Правая — градиентная CTA */}
              <button
                className="flex flex-col items-center gap-1 py-4 px-8 rounded-2xl text-white font-bold text-lg min-w-[210px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                  boxShadow: '0 0 40px rgba(217,70,239,0.45), 0 0 80px rgba(217,70,239,0.15)',
                }}
              >
                <span className="flex items-center gap-2">
                  Запустить бесплатно
                  <Rocket className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-normal text-white/60">Первый результат за 60 секунд</span>
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
