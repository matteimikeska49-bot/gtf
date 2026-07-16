# CONTENT & DESIGN CONTRACT

**Route:** `/ru/alternatives/canva-dlya-karuseley`
**Target System:** Carousel Page Production System (Freeze v1.1)
**Primary Intent:** ALTERNATIVE

---

## 1. Source of Truth
- **Точные Demand Master строки:** Будут уточнены при детальной сверке с кластером.
- **Основные запросы:** Зависят от финальной выгрузки Wordstat.
- **Исключенный шум:** Случайные мусорные запросы, не имеющие отношения к GoToFlow — умная альтернатива Canva для каруселей.
- **URL-origin signals:** Из `gotoflow_top_100_seo_candidates.md`.

---

## 2. Intent Ownership
- **Primary intent:** ALTERNATIVE — Canva для каруселей: альтернативы и сравнение | GoToFlow.
- **Secondary intents:** LSI и supporting queries из кластера.
- **Точная граница:** Страница имеет отдельный ownership и не перекрывает общий инструмент (`/ru/generator-karuselej-instagram`).
- **Риск каннибализации:** NONE (после корректного разделения границ).

---

## 3. Final URL
- **Final URL:** `/ru/alternatives/canva-dlya-karuseley`
- **Slug:** `canva-dlya-karuseley`
- **Аргументация:** URL отражает ALTERNATIVE интент и соответствует архитектуре. Не скопирован слепо из одного запроса.

---

## 4. Page Family
- **Selected family:** `alternatives`
- **Exact production benchmark:** `/ru/generator-karuselej-instagram`
- **Почему benchmark подходит:** Эталонная структура, обеспечивающая максимальную конверсию.
- **Immutable blocks:** Layout, spacing, React components hierarchy.
- **Адаптируемые data fields:** Title, H1, text content, approved assets.

---

## 5. Metadata
- **SEO Title:** Canva для каруселей: альтернативы и сравнение | GoToFlow
- **Meta Description:** Ищете аналог Canva для создания постов-каруселей? Узнайте, почему специализированный AI-генератор GoToFlow быстрее и удобнее для SMM.
- **H1:** GoToFlow — умная альтернатива Canva для каруселей
- **Canonical:** `/ru/alternatives/canva-dlya-karuseley`

---

## 6. Hero
- **Eyebrow:** Аналог Canva
- **H1:** GoToFlow — умная альтернатива Canva для каруселей
- **Description:** Ищете аналог Canva для создания постов-каруселей? Узнайте, почему специализированный AI-генератор GoToFlow быстрее и удобнее для SMM.
- **Primary CTA:** Создать карусель
- **Secondary CTA:** Смотреть примеры (если применимо)
- **Approved Hero Asset Slots:**
  - Слайд 1 (Слева): `instagram-template-hero-product-case`
  - Слайд 2 (По центру): `instagram-template-hero-expert-post`
  - Слайд 3 (Справа): `instagram-template-hero-template-cover`
  *(Если подходящих assets нет — VISUAL BLOCKER)*

---

## 7. Quick Answer
- **Heading:** Как это работает?
- **Body:** Вставьте текст, идею или ссылку. ИИ проанализирует контекст и соберет готовую карусель, адаптированную под тематику GoToFlow — умная альтернатива Canva для каруселей.

---

## 8. Formats Coverage (Rule v1.1)
- **Ровно 6 карточек**
- **Карточка 1 (Canonical):** 🤖 Автоматически. (GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал).
- **Карточка 2 (Canonical):** 📝 Строго по готовому сценарию. (GoToFlow следует выбранной структуре без самостоятельной смены логики подачи).
- **Карточка 3 (Canonical):** 💡 Любая идея. (Если нужного сценария нет в списке, пользователь может задать собственную тему или идею).
- **Карточки 4-6 (Page-specific):** Адаптированы под ALTERNATIVE.

---

## 9. Workflow / Choice Guide
- Использовать строгую структуру benchmark (`/ru/generator-karuselej-instagram`).
- **Количество шагов:** Как в benchmark (обычно 5).
- **UI/Mockup slots:** Сохраняются.

---

## 10. Parameters / Capabilities
- Строго подтвержденные возможности GoToFlow.
- Без вымышленных функций (например, без калькуляторов или автоматической обрезки, если их нет в продукте).

---

## 11. Visual Proof / Examples
- **Heading:** Галерея готовых решений
- **Условие:** Использовать только approved asset IDs. Не заменять мокапы интерфейса случайными картинками.

---

## 12. FAQ (12–16 вопросов)
- Минимум 12 уникальных вопросов (предпочтительно 15).
- Visible FAQ и FAQPage schema должны совпадать 1:1.
- Каждый вопрос закрывает отдельный long-tail интент.

---

## 13. Related Links
- Точные анкоры на смежные owner pages.
- Не создавать ссылки на еще не существующие страницы без lifecycle-логики.

---

## 14. Final CTA
- **Heading:** Начните создание прямо сейчас
- **CTA:** Попробовать бесплатно (или аналогичный из benchmark).
- Ведет на реальный продукт. Layout immutable.

---

## 15. Product Truth & Visual Rules
- **Product Truth:** Никаких ложных обещаний (в т.ч. о функционале конкурентов в comparison/alternative статьях).
- **Visual Rules:** Точный benchmark, approved asset IDs, сохранение white/accent balance.

---

## 16. Lifecycle
- noindex: true
- indexable: false
- sitemapEligible: false
- approvedForRelease: false
- ownerVisualApprovalReceived: false
- productionIntegrationCompleted: false

*(На стадии Contract lifecycle в runtime не меняется)*
