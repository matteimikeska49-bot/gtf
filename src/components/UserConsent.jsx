import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sections = [
  {
    title: "Оператор персональных данных",
    items: [
      "Индивидуальный предприниматель Черенок Андрей Александрович",
      "ИНН: 524706758400",
      "ОГРНИП: 318527500118742",
      "E-mail: gotoflow.io@gmail.com",
      "Дата публикации: «19» февраля 2026 г.",
    ]
  },
  {
    title: "1. Перечень персональных данных",
    items: [
      "e-mail и имя (если указано).",
      "Данные авторизации: Google, Яндекс, Telegram, MAX и др.",
      "IP-адрес, данные устройства и браузера, cookie, время доступа.",
      "Действия в сервисе и данные о платежах (без карт).",
      "Иные добровольно предоставленные данные.",
    ]
  },
  {
    title: "2. Цели обработки",
    items: [
      "Регистрация и авторизация; доступ к функционалу.",
      "Исполнение оферты, управление подпиской, обработка платежей.",
      "Техническая поддержка, безопасность, предотвращение мошенничества.",
      "Ведение бухгалтерии, направление уведомлений.",
      "Маркетинг (при наличии согласия), улучшение сервиса.",
    ]
  },
  {
    title: "3. Обработка данных",
    items: [
      "Оператор вправе: собирать, хранить, изменять, использовать, передавать, обезличивать и удалять данные.",
      "Обработка осуществляется автоматизированно и/или вручную.",
    ]
  },
  {
    title: "4. Передача третьим лицам",
    items: [
      "Данные передаются только при необходимости для работы сервиса.",
      "Получатели: платёжные системы, хостинг и облако, техподдержка, сервисы авторизации, бухгалтерия и юристы.",
      "Государственным органам — в случаях, предусмотренных законодательством РФ.",
    ]
  },
  {
    title: "5. Трансграничная передача",
    items: [
      "Данные могут передаваться за пределы РФ при использовании международных сервисов.",
      "Пользователь выражает на это своё согласие.",
    ]
  },
  {
    title: "6. Срок хранения",
    items: [
      "Данные хранятся в течение срока использования сервиса.",
      "После окончания — в сроки, установленные законодательством РФ.",
    ]
  },
  {
    title: "7. Отзыв согласия",
    items: [
      "Согласие можно отозвать, направив заявление на: gotoflow.io@gmail.com",
      "Отзыв прекращает обработку данных, кроме обязательных случаев по закону.",
    ]
  },
  {
    title: "8. Подтверждение",
    items: [
      "Согласие предоставляется добровольно.",
      "Пользователь подтверждает достоверность предоставленных данных.",
      "Пользователь ознакомлен с Политикой конфиденциальности.",
    ]
  },
  {
    title: "9. Заключение",
    items: [
      "Настоящее Согласие является частью условий использования сервиса GoToFlow.",
      "В случае расхождений между языковыми версиями приоритет имеет русский текст.",
    ]
  },
];

export const UserConsent = ({ onClose }) => {
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
              <h2 className="text-xl font-bold text-white tracking-tight">Согласие на обработку персональных данных</h2>
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
            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-pink-500/40 pl-4">
              Я, регистрируясь, авторизуясь и/или используя онлайн-сервис GoToFlow (https://gotoflow.io), свободно, своей волей и в своём интересе выражаю согласие Оператору на обработку моих персональных данных в соответствии со ст. 23, 24 Конституции РФ и Федеральным законом № 152-ФЗ «О персональных данных».
            </p>

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
