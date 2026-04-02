import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sections = [
  {
    title: "Кто является оператором",
    items: [
      "Оператор персональных данных: ИП Черенок Андрей Александрович (ИНН: 524706758400, ОГРНИП: 318527500118742).",
      "E-mail: gotoflow.io@gmail.com · Сервис: https://gotoflow.io",
    ]
  },
  {
    title: "1. Перечень обрабатываемых персональных данных",
    items: [
      "Адрес электронной почты (e-mail); имя (если указано пользователем).",
      "Данные OAuth-сервисов: идентификатор аккаунта, имя профиля, e-mail (Google, Яндекс, Telegram, MAX).",
      "Технические данные: IP-адрес, браузер, устройство, ОС, файлы cookie, время доступа.",
      "Данные о действиях в Сервисе и сведения о платежах (без полных данных банковских карт).",
      "Иные данные, добровольно предоставленные пользователем.",
    ]
  },
  {
    title: "2. Цели обработки персональных данных",
    items: [
      "Регистрация и авторизация в Сервисе; предоставление доступа к функционалу.",
      "Исполнение лицензионного договора, начисление токенов и управление подпиской.",
      "Осуществление расчётов, техническая поддержка, обеспечение безопасности.",
      "Предотвращение мошенничества, ведение бухгалтерского и налогового учёта.",
      "Направление сервисных уведомлений и (при согласии) рекламных материалов.",
      "Улучшение качества работы Сервиса и разработка новых функций.",
    ]
  },
  {
    title: "3. Способы обработки данных",
    items: [
      "Оператор вправе: собирать, записывать, систематизировать, хранить, уточнять, использовать, передавать, обезличивать, блокировать, удалять и уничтожать персональные данные.",
      "Обработка осуществляется как с использованием средств автоматизации, так и без них.",
    ]
  },
  {
    title: "4. Передача данных третьим лицам",
    items: [
      "Данные передаются исключительно в объёме, необходимом для функционирования Сервиса.",
      "Получатели: платёжные провайдеры, сервисы хостинга, поставщики техподдержки, OAuth-сервисы, бухгалтерские и юридические сервисы.",
      "Государственным органам — в случаях, предусмотренных законодательством РФ.",
      "При использовании международных сервисов данные могут передаваться за рубеж. Пользователь выражает на это своё согласие.",
    ]
  },
  {
    title: "5. Срок хранения данных",
    items: [
      "Согласие действует с момента регистрации/авторизации до его отзыва.",
      "Данные хранятся в течение срока договорных отношений и далее — в сроки, установленные законодательством РФ.",
    ]
  },
  {
    title: "6. Отзыв согласия",
    items: [
      "Вы вправе отозвать согласие, направив заявление на: gotoflow.io@gmail.com",
      "Отзыв влечёт прекращение обработки данных, за исключением случаев, когда хранение обязательно по закону.",
      "Для отписки от рекламных рассылок — воспользуйтесь ссылкой в письме или направьте уведомление на e-mail.",
    ]
  },
  {
    title: "7. Подтверждение согласия",
    items: [
      "Датой предоставления согласия считается момент регистрации, авторизации или нажатия соответствующей кнопки.",
      "Пользователь подтверждает, что действует добровольно, предоставляет достоверные данные и ознакомлен с Политикой конфиденциальности.",
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
              Регистрируясь, авторизуясь и/или используя онлайн-сервис GoToFlow, я свободно, своей волей и в своём интересе выражаю согласие на обработку моих персональных данных на следующих условиях.
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
