## 1. Purpose

RU/EN architecture нужна, чтобы GoToFlow мог масштабировать блог на русском и английском без проблем с SEO, индексацией, canonical, hreflang, sitemap и дублями.

Главное правило:
RU articles are local adaptations, not automatic literal translations.

---

## 2. Recommended URL structure

EN blog:
- /blog
- /blog/:slug

RU blog:
- /ru/blog
- /ru/blog/:slug

Почему:
- весь RU сайт уже находится в /ru;
- /ru/blog логичнее, чем /blog/ru;
- проще sitemap/hreflang/canonical;
- лучше для пользователей и поисковиков.

---

## 3. Article frontmatter fields for localization

language: "en" | "ru"
translationOf: "/blog/original-slug" | null
localizationType: "original" | "adaptation" | "translation"
hreflang:
  en: "https://gotoflow.io/blog/..."
  ru: "https://gotoflow.io/ru/blog/..."
canonical: "https://gotoflow.io/ru/blog/..."

Rules:
- EN original without RU version: localizationType original, hreflang optional.
- RU adapted article from EN: localizationType adaptation, translationOf points to EN source.
- RU original article: localizationType original, translationOf null.
- Literal translations should be avoided unless search intent is identical.

---

## 4. Canonical rules

EN article:
canonical = https://gotoflow.io/blog/slug

RU article:
canonical = https://gotoflow.io/ru/blog/slug

Do not canonical RU to EN if RU article is intended to rank separately.
Do not canonical EN to RU.
Canonical must match the current language URL.

---

## 5. Hreflang rules

If both EN and RU versions exist:
- EN page should reference EN and RU alternates.
- RU page should reference RU and EN alternates.
- x-default can point to EN or homepage if implemented later.

If only one language exists:
- do not invent hreflang pair.
- article can exist alone.

---

## 6. Sitemap rules

Future structure:

- sitemap.xml or sitemap-index.xml
- sitemap-pages.xml
- sitemap-blog-en.xml
- sitemap-blog-ru.xml

Current stage:
Document only, do not implement unless already supported.

Rules:
- published:true only.
- no drafts.
- RU published articles go to RU blog sitemap.
- EN published articles go to EN blog sitemap.
- noindex articles must never appear in sitemap.

---

## 7. RU adaptation rules

RU articles should adapt to:
- RU search intent;
- RU terminology;
- RU social platforms;
- RU examples;
- RU CTA;
- RU product routes;
- RU screenshots/mockups;
- RU audience maturity.

RU should not blindly copy EN topics.

Examples:
EN: LinkedIn carousel prompts  
RU adaptation may be: промпты для каруселей в соцсетях / Инстаграм / экспертного контента

EN: AI carousel maker vs manual design  
RU adaptation may be: нейросеть для создания каруселей или дизайн вручную — что быстрее

---

## 8. Internal linking rules

EN articles should primarily link to:
- EN product pages;
- EN guides;
- EN blog pages.

RU articles should primarily link to:
- RU product pages if they exist;
- RU guides;
- RU blog pages.

If RU product page does not exist:
- link to best available route only if intentional;
- mark as temporary;
- avoid broken links.

Do not link RU published articles to EN draft pages.
Do not link EN published articles to RU draft pages.

---

## 9. Mockup rules

RU articles:
- use RU approved mockups.

EN articles:
- use EN approved mockups.

If no approved mockup exists for article language:
- skip mockup.
- do not use opposite-language screenshot as fallback.

Mockup registry:
docs/mockup-asset-registry.md
src/content/blog/mockups/registry.json

---

## 10. check:blog future validations

- RU article URL must start with /ru/blog.
- language: ru must use RU canonical.
- language: en must use EN canonical.
- hreflang URLs must match existing published articles.
- RU article should not use EN mockup unless explicitly allowed.
- EN article should not use RU mockup.
- no links to draft/noindex pages across languages.
- no duplicate primaryKeyword within same language/cluster.
- cross-language duplication is allowed only when localization relationship is defined.

---

## 11. First RU article batch strategy

First RU batch should focus on Russian local intent, not LinkedIn-only topics.

Possible first RU topics:
- Нейросеть для создания каруселей
- Как сделать карусель для Инстаграм с помощью ИИ
- Идеи для каруселей в Инстаграм
- Как из текста сделать карусель для соцсетей
- Промпты для каруселей: хуки, структура, слайды

Status:
Do not generate yet. This is architecture planning only.
