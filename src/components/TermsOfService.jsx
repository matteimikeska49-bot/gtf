import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sections = [
  {
    title: "1. Предмет договора",
    items: [
      "ИП Черенок Андрей Александрович (Лицензиар) предоставляет Лицензиату право использования онлайн-сервиса GoToFlow (https://gotoflow.io) на условиях простой лицензии.",
      "Сервис предоставляется по модели SaaS. Доступ осуществляется через личный кабинет (email + пароль) или OAuth (Google, Яндекс, Telegram, MAX).",
      "Акцептом оферты считается: регистрация, авторизация, получение бонусных токенов, использование функционала или оплата подписки.",
      "Сервис предназначен для лиц 18 лет и старше.",
    ]
  },
  {
    title: "2. Начало исполнения и утрата права на отказ",
    items: [
      "Исполнение начинается с момента предоставления доступа и/или начисления токенов (включая бонусные).",
      "Лицензиат прямо соглашается на немедленное начало исполнения цифровой услуги.",
      "После начала исполнения право на отказ утрачивается.",
    ]
  },
  {
    title: "3. Бонусные токены (демо-доступ)",
    items: [
      "При регистрации может начисляться 55 бонусных токенов — это ознакомительный (демо) доступ.",
      "Бонусные токены не являются денежным средством, не подлежат возврату и могут быть аннулированы.",
      "Бонусные токены не создают права на бесплатное использование в будущем.",
    ]
  },
  {
    title: "4. Подписка и автопродление",
    items: [
      "Подписка действует 1 месяц с автоматическим продлением и списанием средств.",
      "Отключение автопродления — обязанность Лицензиата.",
      "Средства, списанные в рамках автопродления, возврату не подлежат.",
      "Неиспользованные токены сгорают по окончании подписки.",
    ]
  },
  {
    title: "5. Ограничения использования",
    items: [
      "Запрещается: декомпиляция, реверс-инжиниринг, создание конкурентного продукта.",
      "Запрещается передача доступа третьим лицам и массовое извлечение данных.",
      "При создании конкурентного продукта Лицензиар вправе требовать компенсацию до 5 000 000 рублей.",
    ]
  },
  {
    title: "6. Запрещённый контент",
    items: [
      "Запрещена генерация контента, нарушающего законодательство или права третьих лиц.",
      "Запрещён контент с элементами экстремизма, насилия, порнографии и незаконных инструкций.",
      "Ответственность за генерируемый контент полностью лежит на Лицензиате.",
    ]
  },
  {
    title: "7. Расчёты и чарджбек",
    items: [
      "Услуга считается оказанной с момента предоставления доступа. Неиспользование не является основанием для возврата.",
      "До инициирования чарджбека Лицензиат обязан направить претензию на e-mail: gotoflow.io@gmail.com",
      "При необоснованном чарджбеке Лицензиар вправе заблокировать доступ и взыскать понесённые расходы.",
    ]
  },
  {
    title: "8. Ограничение ответственности",
    items: [
      "Сервис предоставляется «как есть». Лицензиар не гарантирует бесперебойность или достижение конкретного результата.",
      "Лицензиар не несёт ответственности за упущенную выгоду и косвенные убытки.",
      "Совокупная ответственность ограничивается суммой оплаты за последний расчётный период.",
    ]
  },
  {
    title: "Реквизиты лицензиара",
    items: [
      "ИП Черенок Андрей Александрович",
      "ИНН: 524706758400 · ОГРНИП: 318527500118742",
      "E-mail: gotoflow.io@gmail.com",
    ]
  },
];

export const TermsOfService = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06] bg-[#050505]/60 backdrop-blur-sm shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Публичная оферта (условия использования)</h2>
              <p className="text-xs text-zinc-500 mt-1">GoToFlow · https://gotoflow.io</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-8 py-7 flex flex-col gap-8">
            {sections.map((sec, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-white mb-3 tracking-tight">{sec.title}</h3>
                <ul className="flex flex-col gap-2">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-pink-500/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-white/[0.06] bg-[#050505]/60 shrink-0">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
            >
              Закрыть
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
