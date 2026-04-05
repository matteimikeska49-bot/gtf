import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Target, CreditCard, Rocket } from 'lucide-react';

const metrics = [
  { icon: <Clock className="w-5 h-5" />, color: 'text-amber-400', ring: 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.15)]', text: "До 10 часов экономии в неделю" },
  { icon: <Zap className="w-5 h-5" />,   color: 'text-violet-400', ring: 'bg-violet-500/10 border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.2)]',  text: "Готовая карусель за ~60 секунд" },
  { icon: <Target className="w-5 h-5" />, color: 'text-rose-400',  ring: 'bg-rose-500/10 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.15)]',    text: "Один процесс вместо 5 сервисов" },
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

      {/* ─── Уникальное «космическое» свечение позади монолита ─── */}
      {/* Слой 1: глубокий индиго-фиолетовый эллипс */}
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] bg-indigo-600/20 blur-[130px] -z-10 pointer-events-none rounded-full" />
      {/* Слой 2: правый акцент — персик/маджента */}
      <div className="absolute top-[40%] right-[5%] w-[45%] h-[60%] bg-fuchsia-600/15 blur-[100px] -z-10 pointer-events-none rounded-full" />
      {/* Слой 3: нижний якорь — тёмный синий */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-900/25 blur-[90px] -z-10 pointer-events-none rounded-full" />

      {/* ─── Главная обертка (Монолит) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#050505]/90 backdrop-blur-[120px] border border-white/[0.05] rounded-[3rem] p-8 md:p-12 relative z-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
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
                  className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-xl border mb-3 ${m.ring}`}>
                    <span className={m.color}>{m.icon}</span>
                  </div>
                  <p className="text-white font-semibold text-lg leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* ─── Сравнительная таблица (2 колонки) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">

              {/* Левая — «Обычный путь» */}
              <div className="bg-[#0a0a0a] backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col h-full">
                <p className="text-sm uppercase tracking-widest font-bold text-zinc-100 mb-8 text-center">
                  Обычный путь
                </p>
                <div className="flex flex-col gap-6 flex-1">
                  {oldWay.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <X className="w-3 h-3 text-zinc-400" />
                      </div>
                      <p className="text-lg text-zinc-400 font-medium leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая — «GoToFlow» (ПОБЕДИТЕЛЬ) */}
              <div className="bg-[#12080e] border border-transparent rounded-2xl p-6 relative overflow-hidden flex flex-col h-full md:scale-[1.02] transition-transform"
                style={{ boxShadow: '0 0 0 1px rgba(217,70,239,0.35), 0 0 50px -10px rgba(139,92,246,0.25)' }}>
                 {/* Тонкое внутреннее свечение — от верхнего левого угла */}
                 <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/[0.08] via-violet-600/[0.04] to-transparent pointer-events-none" />

                 <div className="relative z-10 flex flex-col h-full">
                    {/* Градиентный заголовок */}
                    <p className="text-sm uppercase tracking-widest font-bold mb-8 text-center bg-gradient-to-r from-pink-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                      GoToFlow
                    </p>
                    <div className="flex flex-col gap-6 flex-1">
                      {newWay.map((text, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 flex items-center justify-center shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                            <Check className="w-4 h-4 text-fuchsia-400" strokeWidth={3} />
                          </div>
                          <p className="text-lg text-zinc-300 font-semibold leading-relaxed">{text}</p>
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

                {/* Кнопка CTA — градиентная заливка */}
                <button className="group flex flex-col items-center gap-1 py-5 px-10 rounded-2xl text-white font-bold text-xl transition-all duration-300 min-w-[220px] shadow-[0_0_30px_rgba(217,70,239,0.35)] hover:shadow-[0_0_45px_rgba(217,70,239,0.5)] hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' }}>
                  <span>Запустить бесплатно</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-normal text-white/60">
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
