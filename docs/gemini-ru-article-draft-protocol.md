# Gemini RU Article Draft Protocol

## 1. Purpose

Этот протокол нужен, чтобы Gemini генерировал RU SEO markdown articles безопасно и одинаково по системе GoToFlow.

Он должен предотвращать:
- неправильный frontmatter;
- published:true у черновиков;
- noindex:false у черновиков;
- неправильный canonical;
- EN route вместо RU route;
- fake hreflang;
- ссылки на draft/noindex;
- broken internal links;
- random mockups;
- generic AI-water;
- дословные переводы EN-статей;
- unsupported claims/statistics.

---

## 2. Input Gemini must receive

Gemini должен получать не просто тему, а полный brief из `docs/seo-ru-batch-01-briefs.md`.

Обязательные входные данные:
- Working title
- Language
- Primary keyword
- Secondary keywords
- Cluster
- Article type
- Priority
- Funnel stage
- Search intent
- Audience
- Slug
- Canonical
- Product angle
- Article structure
- Internal linking plan
- FAQ ideas
- Final CTA direction
- Mockup status
- SERP validation status

Если brief неполный — Gemini должен сначала указать, чего не хватает, а не писать статью вслепую.

---

## 3. Required output format

Gemini должен возвращать только markdown article.

Запрещено:
- писать объяснения до/после статьи;
- использовать HTML/JSX;
- использовать code fences вокруг всей статьи;
- создавать несколько статей за один ответ;
- добавлять commentary типа “Вот готовая статья”.

Output должен начинаться сразу с YAML frontmatter:

```yaml
---
title: ""
slug: ""
language: "ru"
description: ""
primaryKeyword: ""
secondaryKeywords: []
searchIntent: ""
cluster: ""
articleType: ""
priority: "P0"
published: false
noindex: true
canonical: "https://gotoflow.io/ru/blog/[slug]"
createdAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
lastReviewed: "YYYY-MM-DD"
requiresFreshResearch: true
localizationType: "original"
translationOf: null
mockups: []
quickAnswer:
  - ""
  - ""
  - ""
  - ""
faq:
  - question: ""
    answer: ""
explore:
  tools: []
  guides: []
finalCta:
  title: ""
  text: ""
  buttonText: ""
  href: "/ru"
  secondaryText: ""
  secondaryHref: "#explore-more"
---
```

Правила:
- `published` всегда `false`.
- `noindex` всегда `true`.
- `language` всегда `ru`.
- `canonical` всегда `https://gotoflow.io/ru/blog/[slug]`.
- `localizationType`: `original`/`adaptation`/`translation`. Для первой RU batch чаще использовать `original`.
- `translationOf`: `null`, если это не перевод/адаптация конкретной EN-статьи.
- `mockups`: `[]` пока approved RU assets нет.
- `finalCta.href` должен быть только внутренним существующим route. Пока безопасный fallback: `"/ru"`.
- `secondaryHref` должен быть `"#explore-more"`.

---

## 4. RU writing rules

Статья должна быть написана на русском для RU/СНГ аудитории.

Требования:
- не делать дословный перевод английской статьи;
- не использовать тяжёлый SaaS-жаргон;
- писать понятно для создателей контента, блогеров, экспертов, малого бизнеса, SMM, фрилансеров;
- не обещать гарантированный доход, рост подписчиков, вирусность, клиентов;
- не выдумывать статистику;
- не ссылаться на исследования без источников;
- не писать generic AI-water;
- давать practical outcome;
- использовать реальные сценарии:
  - тема → структура → слайды;
  - текст → карусель;
  - идея → пост/карусель;
  - промпты → структура;
  - ручная работа vs AI workflow.

### RU Meta Disclaimer Rule
- для RU-статей Gemini может использовать слова Instagram / Facebook / Meta / Инстаграм / Фейсбук / Мета только когда это нужно по смыслу;
- Gemini **НЕ должен** вручную вставлять юридическую сноску (disclaimer) в markdown;
- общий RU footer автоматически добавляет RU-only legal footnote (маленькая сноска "Instagram и Facebook принадлежат Meta...");
- article template не должен рендерить эту сноску внутри статьи;
- для EN-страниц сноска не добавляется;
- generic mentions типа “соцсети”, “social media” не требуют сноски.

---

## 5. Required article structure

Каждая RU article draft должна использовать структуру:

1. H1 из title
2. Короткое вступление
3. Quick Answer section
4. Основной explanation
5. Product-led workflow bridge
6. Step-by-step sections, если это how-to
7. Examples / formats / prompt groups, если релевантно
8. Compact cards для ошибок/советов/кейсов, если 3+ однотипных блока
9. Product CTA callout
10. Related / Explore block with id="explore-more"
11. FAQ
12. Conclusion
13. Final CTA через frontmatter, не дублировать огромным блоком в body

Важно:
- Quick Answer не должен дублировать весь step-by-step.
- Если шагов больше 5, группировать по фазам.
- Не делать 7–10 одинаковых H3 подряд, если лучше использовать `:::cards`.
- Не ставить product и related callouts подряд без текста между ними.

---

## 6. Supported markdown blocks

Gemini может использовать только поддерживаемые шаблоном блоки.

**Важно:** Нельзя использовать markdown block, который parser не поддерживает. Если используется prompts section, она должна быть через поддерживаемый component (например, `:::prompts`). На rendered page не должно быть сырых `:::` блоков.

### Callouts

Разрешённые callouts:
- `> [!takeaway]`
- `> [!product]`
- `> [!related]`
- `> [!mistake]`
- `> [!tip]`

Правила:
- Не ставить 3+ callouts подряд.
- Не вставлять `[!related]` внутрь prompt groups.
- Product callout должен быть контекстным, не рекламной плашкой.
- Между product и related callout должен быть обычный смысловой текст.

### Compact cards

Использовать для повторяющихся editorial sections:

```markdown
:::cards type: mistakes
### Ошибка 1
Текст

### Ошибка 2
Текст
:::
```

Allowed types:
- `mistakes`
- `tips`
- `takeaways`
- `workflow`
- `best-for`
- `examples`
- `checklist`
- `pros-cons`
- `default`

Правила:
- 2–8 карточек.
- Не использовать для одного элемента.
- Не использовать как замену всей статье.
- Использовать вместо длинной серии однотипных H3 или callouts.

### Tables

Таблицы разрешены для comparison/checklist sections.

Правила:
- максимум 4 колонки;
- компактные строки;
- не делать huge tables;
- не использовать таблицу, если список лучше.

### Prompt groups

Для prompt-library статей:
- использовать H2/H3/ordered lists;
- не вставлять callouts внутрь списка prompts;
- не делать 20 огромных prompt blocks подряд;
- группировать prompts по сценариям.

---

## 7. Mockup rules

Mockups теперь вставляются через slot-level архитектуру.

Разрешено:
- `:::mockup{slot="topic-input"}`
- `:::mockup{slot="result-preview"}`
- `:::mockup{slot="format-settings"}`
- `:::mockup{slot="style-choice"}`

Запрещено:
- `:::mockup{type="..." layout="..."}` (старый формат, deprecated)
- прямые image paths
- markdown images `![](...)`
- случайные screenshots
- opposite-language screenshots

Правило:
Gemini указывает только `slot`. Шаблон сам выбирает `type`, `layout`, `asset` и язык из registry.

В frontmatter оставить:
```yaml
mockups: []
```

---

## 8. Internal linking rules

Gemini может использовать только существующие безопасные internal links.

На текущем этапе безопасные ссылки:
- `/ru`
- `/ru/blog`
- `#explore-more`

Если product RU routes не подтверждены — не ссылаться на них как на готовые.

Запрещено:
- ссылки на draft;
- ссылки на будущие статьи как на опубликованные;
- ссылки на `/blog/...` из RU статьи без явной причины;
- внешние ссылки без необходимости;
- fake URLs;
- ссылки на `app.gotoflow.io`, если они не утверждены явно.

Если нужна будущая related article ссылка — упоминать её только в notes внутри brief, но не вставлять как markdown link в статью.

---

## 9. SEO and indexability rules

Для draft:
- `published: false`
- `noindex: true`
- не в sitemap
- не в `/ru/blog` index
- `canonical` правильный, но статья пока не индексируется

Для будущего publish:
- `published: true` только после QA
- `noindex: false` только после QA
- live URL должен отдавать HTML с текстом
- статья должна быть в sitemap
- статья должна быть в `/ru/blog` index
- canonical должен совпадать с RU URL

Gemini не должен сам переводить draft в publish.

---

## 10. Anti-AI-water quality rules

Статья должна пройти проверку:
- есть конкретный ответ;
- есть practical outcome;
- есть практические шаги;
- есть примеры;
- есть сценарии использования;
- есть product bridge;
- нет общих фраз без пользы;
- нет повторов;
- нет fake statistics;
- нет обещаний гарантированного результата;
- нет переспама ключом.

Primary keyword должен использоваться естественно:
- в title;
- в intro;
- в одном H2 или H3;
- в conclusion/FAQ при необходимости.

Не повторять primary keyword механически в каждом блоке.

---

## 11. SERP validation note

Если в brief стоит:
`Needs SERP validation before article generation`

Gemini должен:
- не выдумывать данные из SERP;
- писать статью как draft;
- добавить в frontmatter: `requiresFreshResearch: true`
- и в конце markdown body НЕ добавлять отдельную заметку “нужна SERP validation”. Это остаётся задачей редактора, а не публичным текстом.

---

## 12. Final self-check before output

Перед выдачей Gemini должен внутренне проверить:

1. language: ru
2. published: false
3. noindex: true
4. canonical starts with https://gotoflow.io/ru/blog/
5. no mockups inserted
6. no markdown images
7. no fake hreflang
8. no external app link
9. no draft links
10. finalCta.href is internal
11. FAQ exists
12. quickAnswer exists
13. body has H2 sections
14. no 3+ stacked callouts
15. no unsupported stats
16. article is not literal EN translation
17. no future unpublished links as active links
18. no product route unless verified
19. no raw HTML/JSX
20. output is one article only
21. no English UI labels in RU article
22. article is not ready until local rendered page is visually checked
23. check:blog:render auto-discovers all markdown articles (both drafts and published) and is mandatory before batch generation or publish. Build or check:blog alone without render-check is no longer sufficient.

---

## 13. Copy-paste Gemini Prompt

# Copy-paste Gemini Prompt

```text
Ты пишешь одну RU markdown SEO article для GoToFlow.
Используй brief ниже.
Верни только markdown article.
Начни с YAML frontmatter.
Не используй HTML/JSX.
Не вставляй mockups/images.
Не ставь published:true.
Не ставь noindex:false.
Не вставляй fake links.
Пиши для RU audience.
Не делай дословный перевод EN.
Сохраняй product angle.
Соблюдай supported blocks.
Пройди self-check.

[PASTE ONE FULL RU SEO BRIEF HERE]
```

## Mockup placement rules
- Мокапы не вставляются в каждую статью автоматически.
- Мокап вставляется только там, где он усиливает смысл блока.
- Gemini НЕ выбирает asset, path, image, language, layout. Gemini выбирает только смысловой slot.
- Preferred mockup syntax теперь slot-level:
  - `:::mockup{slot="topic-input"}`
  - `:::mockup{slot="result-preview"}`
  - `:::mockup{slot="format-settings"}`
  - `:::mockup{slot="style-choice"}`
- Для product-led how-to статей про создание карусели/поста/контента рекомендуется 2–4 мокапа:
  1. `slot="topic-input"` после блока про ввод темы/текста;
  2. `slot="result-preview"` после блока про результат/готовую карусель;
  3. `slot="format-settings"` после блока про формат/экспорт;
  4. `slot="style-choice"` после блока про визуальный стиль.
- Для comparison/best-tools статей обычно 0–1 product mockup, только если есть product-led section.
- Для prompt-library статей обычно 0–1 mockup, если он показывает, куда вставлять prompt/result.
- Нельзя вставлять случайный mockup без смысловой связи с текстом.
- Нельзя использовать markdown image syntax или hardcoded image paths.
- Использовать только `:::mockup{slot="..."}`. Старый формат deprecated.

### Required Publishing Checks

Для любых изменений в:
- markdown template;
- article blocks;
- mockup system;
- article draft;
- Explore/CTA/FAQ;

обязательно запускать:
```bash
npm run check:blog
npm run build
npm run check:blog:render
npm run check:blog:visual
```
И сохранять/прикладывать screenshots/report из:
`tmp/blog-visual-qa/`

Агент не имеет права писать “визуально всё ок”, если не запустил `check:blog:visual`.
