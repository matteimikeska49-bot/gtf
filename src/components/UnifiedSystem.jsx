import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Target, CreditCard, Rocket, ArrowRight } from 'lucide-react';

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
  <div className="absolute inset-[-25%] pointer-events-none -z-10">
    {/* Левый свет */}
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-[5%] top-[25%] w-[50%] h-[55%] bg-pink-500/10 blur-[150px] rounded-full"
    />
    {/* Правый свет */}
    <motion.div
      animate={{ y: [10, -10, 10] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      className="absolute -right-[5%] bottom-[25%] w-[50%] h-[55%] bg-orange-500/10 blur-[150px] rounded-full"
    />
  </div>
);

export const UnifiedSystem = () => (
  <>
    {/* АРХИТЕКТУРНЫЙ ФИКС: Убрано overflow-hidden/clip с секции, чтобы свет мог свободно смешиваться с фоном страницы */}
    <section className="py-24 md:py-32 px-6 relative z-10 w-full bg-[#050505]">
      
      {/* ИСТИННЫЙ ФОНОВЫЙ СВЕТ БЛОКА СРАВНЕНИЯ */}
      {/* ТЕХНИЧЕСКОЕ РЕШЕНИЕ: Отказ от filter: blur.
          Filter: blur(150px) заставляет GPU резать рендер по хитбоксу.
          Мы используем 200vw контейнер и чистый radial-gradient. 
          Он математически затухает до 0% (transparent), не оставляя обрубленных краев. */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[250vw] max-w-[2000px] h-[1200px] pointer-events-none -z-0 opacity-100 flex justify-center">
        <div 
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 35%), radial-gradient(circle at 40% 50%, rgba(236, 72, 153, 0.12) 0%, transparent 35%)'
          }}
        />
      </div>

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
          {/* Плавный теплый фон */}
          <DriftHaze />

          {/* Стеклянная подложка. АРХИТЕКТУРНЫЙ ФИКС: */}
          {/* Выносим фон в абсолютный слой, чтобы backdrop-blur не создавал bounding box для свечения */}
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14">
            <div
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.05] pointer-events-none -z-30"
              style={{ boxShadow: '0 50px 100px -20px rgba(0,0,0,1)' }}
            />
            {/* Верхний линейный блик (Теплый) */}
            <div className="absolute inset-0 pointer-events-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-transparent -z-20">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
              {/* Микро-звёздная текстура */}
              <div
                className="absolute inset-0 opacity-[0.015]"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
            </div>

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
              <div className="relative w-full mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-20">
                  {/* Левая — Обычный путь */}
                  <div 
                    className="rounded-2xl p-6 md:p-8 flex flex-col h-full relative"
                    style={{
                      background: 'rgba(5, 5, 5, 0.6)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      boxShadow: 'inset 0 4px 24px rgba(0,0,0,0.4)'
                    }}
                  >
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

                  {/* Правая — GoToFlow */}
                  <div 
                    className="rounded-2xl p-6 md:p-8 flex flex-col h-full relative group transition-all duration-500"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)'
                    }}
                  >
                    {/* Тёплый прожектор был полностью удалён по требованию (он мог пересвечивать карточку изнутри) */}

                    <p className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent relative z-10">
                      GoToFlow
                    </p>
                    <div className="flex flex-col gap-5 flex-1 relative z-10">
                      {newWay.map((text, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="shrink-0 mt-1 w-5 h-5 rounded-full border border-pink-500/30 bg-[rgba(244,63,94,0.1)] flex items-center justify-center">
                            <Check className="w-3 h-3 text-pink-400" strokeWidth={3} />
                          </div>
                          <p className="text-sm md:text-base text-white font-medium leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Кнопка ─── */}
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group text-base border border-pink-400/20 z-20 relative">
                  Запустить бесплатно
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-zinc-500 text-center">
                  Первый результат за 60 секунд
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);
