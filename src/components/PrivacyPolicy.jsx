import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sections = [
  {
    title: "1. Общие положения",
    items: [
      "GoToFlow — это онлайн-сервис SaaS, предоставляемый ИП Черенок Андрей Александрович (ИНН: 524706758400, ОГРНИП: 318527500118742) по адресу https://gotoflow.io",
      "Настоящая Политика описывает порядок сбора, хранения, использования и защиты персональных данных пользователей.",
      "Используя Сервис, вы соглашаетесь с условиями настоящей Политики конфиденциальности.",
      "Политика соответствует требованиям Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».",
    ]
  },
  {
    title: "2. Перечень собираемых данных",
    items: [
      "Адрес электронной почты (e-mail) и имя (если указано пользователем).",
      "Данные OAuth-авторизации (Google, Яндекс, Telegram, MAX): идентификатор аккаунта, имя профиля, e-mail.",
      "Технические данные: IP-адрес, тип браузера, устройство и ОС, файлы cookie, время доступа.",
      "Данные о действиях в Сервисе и сведения о платежах (без хранения полных данных банковских карт).",
      "Иные данные, добровольно предоставленные пользователем.",
    ]
  },
  {
    title: "3. Цели обработки данных",
    items: [
      "Регистрация, авторизация и предоставление доступа к функционалу Сервиса.",
      "Исполнение лицензионного договора, начисление токенов и управление подпиской.",
      "Осуществление расчётов, техническая поддержка и обеспечение безопасности.",
      "Предотвращение мошенничества, ведение бухгалтерского и налогового учёта.",
      "Направление сервисных уведомлений и (при наличии согласия) рекламных материалов.",
      "Улучшение качества работы Сервиса и разработка новых функций.",
    ]
  },
  {
    title: "4. Передача данных третьим лицам",
    items: [
      "Данные передаются только в объёме, необходимом для функционирования Сервиса.",
      "Получатели: платёжные провайдеры, сервисы хостинга, поставщики техподдержки, сервисы авторизации.",
      "В случае использования международных сервисов данные могут передаваться за рубеж (с согласия пользователя).",
      "Государственным органам — исключительно в случаях, предусмотренных законодательством РФ.",
    ]
  },
  {
    title: "5. Срок хранения и отзыв согласия",
    items: [
      "Данные хранятся в течение срока действия договорных отношений и далее — в сроки, установленные законодательством.",
      "Пользователь вправе отозвать согласие, направив заявление на: gotoflow.io@gmail.com",
      "Отзыв влечёт прекращение обработки данных, кроме случаев, когда хранение обязательно по закону.",
    ]
  },
  {
    title: "6. Безопасность данных",
    items: [
      "Оператор применяет организационные и технические меры для защиты персональных данных.",
      "Данные хранятся на защищённых серверах с применением шифрования.",
      "Доступ к данным имеет ограниченный круг сотрудников, связанных обязательством конфиденциальности.",
    ]
  },
  {
    title: "Реквизиты оператора",
    items: [
      "ИП Черенок Андрей Александрович",
      "ИНН: 524706758400 · ОГРНИП: 318527500118742",
      "E-mail: gotoflow.io@gmail.com",
    ]
  },
];

export const PrivacyPolicy = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Modal */}
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
              <h2 className="text-xl font-bold text-white tracking-tight">Политика конфиденциальности</h2>
              <p className="text-xs text-zinc-500 mt-1">GoToFlow · https://gotoflow.io</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content — scrollable */}
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
