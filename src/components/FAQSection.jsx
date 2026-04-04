import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Я смогу редактировать результат под себя?",
    a: "Да. GoToFlow не запирает вас в жёсткий шаблон. Вы можете направлять генерацию, править результат во встроенном редакторе и экспортировать уже доведённую до идеала финальную версию."
  },
  {
    q: "Это просто очередной генератор текстов?",
    a: "Нет, GoToFlow не просто пишет тексты, а сразу собирает готовый контент в связке с визуалом. Вы получаете структурированные посты, слайды для каруселей или раскадровки для Reels. Вы задаёте свои темы, tone of voice и визуальные ориентиры, поэтому на выходе получается полноценный авторский контент, а не сырая текстовая заготовка."
  },
  {
    q: "Чем это лучше связки из нескольких разных сервисов?",
    a: "Платформа избавляет от хаоса и прыжков между вкладками. Обычно вам нужно искать идеи в одном месте, генерировать текст в другом, а собирать визуал в третьем. В GoToFlow вы работаете в единой системе: закинули идею или ссылку — и мгновенно получили цельный, оформленный результат."
  },
  {
    q: "Нужно ли уметь писать сложные промпты?",
    a: "Нет. Платформа создана как система, где не нужно каждый раз объяснять всё с нуля. Вы просто задаёте тему, идею, ссылку или видео — дальше ИИ сам помогает собрать готовый результат в нужном формате."
  },
  {
    q: "Для каких ниш и форматов это подходит?",
    a: "Система максимально гибкая. Вы можете генерировать вовлекающие Reels для экспертного блога, собирать продующие офферы для бизнеса или быстро верстать аккуратные прайс-листы для сторис."
  },
  {
    q: "На каких языках работает генерация?",
    a: "ИИ свободно понимает и генерирует контент на нескольких языках, включая русский и английский. Вы можете легко взять за основу англоязычный ролик конкурента и в один клик адаптировать его под русскоязычную аудиторию."
  },
  {
    q: "Что можно сделать в GoToFlow уже сейчас?",
    a: "Вам доступны ключевые инструменты: радар конкурентов, поиск сильных Reels и создание каруселей или постов из идеи, ссылки и видео. Функции автопилота, контент-плана и автопостинга находятся в активной разработке."
  },
  {
    q: "Что входит в бесплатный доступ и нужна ли карта?",
    a: "Вы можете начать работу бесплатно и без привязки банковской карты. На старте вам даётся базовый лимит генераций, чтобы вы могли без риска протестировать инструменты и получить свои первые результаты."
  },
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
    <section className="py-24 md:py-32 px-6 relative z-10 w-full overflow-hidden bg-[#050505] border-t border-white/[0.04]">

      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 lg:p-16 backdrop-blur-sm relative z-10">
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

        {/* Accordion wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col gap-3"
        >
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
