import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Контент не будет выглядеть как шаблонная генерация ChatGPT?",
    a: "Нет. GoToFlow — не просто обёртка над GPT. Платформа обучается на вашем стиле: анализирует ваши прошлые посты, запоминает любимые речевые обороты, структуры и тон. Результат звучит как вы, а не как усреднённый интернет."
  },
  {
    q: "Нужно ли уметь писать сложные промпты?",
    a: "Нет. Весь workflow работает под капотом — вы просто вставляете идею, ссылку или голосовое сообщение. GoToFlow сам разберётся с промптингом, структурой и адаптацией. Никакого промпт-инжиниринга не требуется."
  },
  {
    q: "Какие социальные сети поддерживаются?",
    a: "На старте — Instagram (посты, карусели, Reels), Telegram-каналы и ВКонтакте. В ближайшем роадмапе: YouTube Shorts, TikTok и LinkedIn. Контент автоматически адаптируется под формат каждой площадки."
  },
  {
    q: "Есть ли бесплатный период?",
    a: "Да. После регистрации вы получаете 7 дней полного доступа без привязки карты. Все инструменты доступны без ограничений, чтобы вы могли убедиться в ценности платформы до принятия решения."
  },
  {
    q: "Моя контентная стратегия и тексты в безопасности?",
    a: "Абсолютно. Мы не используем ваши данные для обучения общих моделей. Ваш Tone of Voice, тексты и стратегия — ваша интеллектуальная собственность. Данные хранятся на зашифрованных серверах."
  }
];

const FAQItem = ({ item, isOpen, onClick }) => (
  <div
    className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
      isOpen
        ? 'border-pink-500/30 bg-white/[0.03]'
        : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between gap-4 p-6">
      <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>
        {item.q}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03]"
      >
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-pink-400' : 'text-zinc-500'}`} />
      </motion.div>
    </div>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="px-6 pb-6 text-zinc-400 leading-relaxed font-medium text-sm md:text-base">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/15 blur-[140px] rounded-full pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs tracking-widest uppercase font-bold mb-8 backdrop-blur-md">
            <span>Поддержка</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight text-balance">
              Остались <span className="text-gradient-brand">вопросы?</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed text-balance">
            Собрали ответы на самые частые вопросы. Если не нашли своего — напишите нам напрямую.
          </p>
        </motion.div>

        {/* Accordion wrapper — стеклянная подложка */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8 backdrop-blur-md"
        >
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
