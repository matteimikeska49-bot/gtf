import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';

const ConsentSEOHead = () => {
  useEffect(() => {
    const title = 'Согласие на обработку персональных данных — GoToFlow';
    document.title = title;

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(prop ? 'property' : 'name', name);
      el.setAttribute('content', content);
    };

    const setLink = (rel, href, extra = {}) => {
      const sel = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
      el.setAttribute('rel', rel); el.setAttribute('href', href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };

    setMeta('title', title);
    setMeta('description', 'Согласие на обработку персональных данных GoToFlow: категории данных, цели обработки, права пользователя и порядок отзыва согласия.');
    setMeta('og:title', title, true);
    setMeta('twitter:title', title, true);

    setLink('canonical', 'https://gotoflow.io/ru/soglasie-na-obrabotku-personalnyh-dannyh');
    document.documentElement.lang = 'ru';

    return () => { document.title = 'GoToFlow'; };
  }, []);

  return null;
};

export const RuPersonalDataConsentPage = () => {
  const effectiveDate = 'Дата вступления в силу: 19 февраля 2026';
  
  const intro = 'Я, регистрируясь, авторизуясь и/или используя онлайн-сервис GoToFlow (https://gotoflow.io), свободно, своей волей и в своём интересе выражаю согласие Оператору на обработку моих персональных данных в соответствии со ст. 23, 24 Конституции РФ и Федеральным законом № 152-ФЗ «О персональных данных».';

  const sections = [
    { title: "Оператор персональных данных", items: ["Индивидуальный предприниматель Черенок Андрей Александрович", "ИНН: 524706758400", "ОГРНИП: 318527500118742", "E-mail: gotoflow.io@gmail.com"] },
    { title: "1. Перечень персональных данных", items: ["e-mail и имя (если указано).", "Данные авторизации: Google, Яндекс, Telegram, MAX и др.", "IP-адрес, данные устройства и браузера, cookie, время доступа.", "Действия в сервисе и данные о платежах (без карт).", "Иные добровольно предоставленные данные."] },
    { title: "2. Цели обработки", items: ["Регистрация и авторизация; доступ к функционалу.", "Исполнение оферты, управление подпиской, обработка платежей.", "Техническая поддержка, безопасность, предотвращение мошенничества.", "Ведение бухгалтерии, направление уведомлений.", "Маркетинг (при наличии согласия), улучшение сервиса."] },
    { title: "3. Обработка данных", items: ["Оператор вправе: собирать, хранить, изменять, использовать, передавать, обезличивать и удалять данные.", "Обработка осуществляется автоматизированно и/или вручную."] },
    { title: "4. Передача третьим лицам", items: ["Данные передаются только при необходимости для работы сервиса.", "Получатели: платёжные системы, хостинг и облако, техподдержка, сервисы авторизации, бухгалтерия и юристы.", "Государственным органам — в случаях, предусмотренных законодательством РФ."] },
    { title: "5. Трансграничная передача", items: ["Данные могут передаваться за пределы РФ при использовании международных сервисов.", "Пользователь выражает на это своё согласие."] },
    { title: "6. Срок хранения", items: ["Данные хранятся в течение срока использования сервиса.", "После окончания — в сроки, установленные законодательством РФ."] },
    { title: "7. Отзыв согласия", items: ["Согласие можно отозвать, направив заявление на: gotoflow.io@gmail.com", "Отзыв прекращает обработку данных, кроме обязательных случаев по закону."] },
    { title: "8. Подтверждение", items: ["Согласие предоставляется добровольно.", "Пользователь подтверждает достоверность предоставленных данных.", "Пользователь ознакомлен с Политикой конфиденциальности."] },
    { title: "9. Заключение", items: ["Настоящее Согласие является частью условий использования сервиса GoToFlow.", "В случае расхождений между языковыми версиями приоритет имеет русский текст."] },
  ];

  return (
    <LegalPageLayout
      title="Согласие на обработку персональных данных"
      effectiveDate={effectiveDate}
      sections={sections}
      intro={intro}
    >
      <ConsentSEOHead />
    </LegalPageLayout>
  );
};
