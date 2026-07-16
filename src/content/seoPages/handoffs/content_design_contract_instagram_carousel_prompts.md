# CONTENT & DESIGN CONTRACT

**Route:** `/ru/prompts/instagram-carousel`
**Target System:** Carousel Page Production System (Freeze v1.1)
**Primary Intent:** PROMPT

---

## 1. Source of Truth
- **Точные Demand Master строки:** Будут уточнены при детальной сверке с кластером.
- **Основные запросы:** Зависят от финальной выгрузки Wordstat.
- **Исключенный шум:** Случайные мусорные запросы, не имеющие отношения к Готовые промпты для генерации каруселей.
- **URL-origin signals:** Из `gotoflow_top_100_seo_candidates.md`.

---

## 2. Intent Ownership
- **Primary intent:** PROMPT — Промпты для создания каруселей в Instagram с AI | GoToFlow.
- **Secondary intents:** LSI и supporting queries из кластера.
- **Точная граница:** Страница имеет отдельный ownership и не перекрывает общий инструмент (`/ru/generator-karuselej-instagram`).
- **Риск каннибализации:** NONE (после корректного разделения границ).

---

## 3. Final URL
- **Final URL:** `/ru/prompts/instagram-carousel`
- **Slug:** `instagram-carousel`
- **Аргументация:** URL отражает PROMPT интент и соответствует архитектуре. Не скопирован слепо из одного запроса.

---

## 4. Page Family
- **Selected family:** `prompts`
- **Exact production benchmark:** `/ru/use-cases/video-v-karusel`
- **Почему benchmark подходит:** Эталонная структура, обеспечивающая максимальную конверсию.
- **Immutable blocks:** Layout, spacing, React components hierarchy.
- **Адаптируемые data fields:** Title, H1, text content, approved assets.

---

## 5. Metadata
- **SEO Title:** Промпты для создания каруселей в Instagram с AI | GoToFlow
- **Meta Description:** Коллекция эффективных промптов для создания Instagram каруселей. Узнайте, как правильно ставить задачи ИИ для получения лучшего результата.
- **H1:** Готовые промпты для генерации каруселей
- **Canonical:** `/ru/prompts/instagram-carousel`

---

## 6. Hero
- **Eyebrow:** Библиотека промптов
- **H1:** Готовые промпты для генерации каруселей
- **Description:** Коллекция эффективных промптов для создания Instagram каруселей. Узнайте, как правильно ставить задачи ИИ для получения лучшего результата.
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
- **Body:** Вставьте текст, идею или ссылку. ИИ проанализирует контекст и соберет готовую карусель, адаптированную под тематику Готовые промпты для генерации каруселей.

---

## 8. Formats Coverage (Rule v1.1)
- **Ровно 6 карточек**
- **Карточка 1 (Canonical):** 🤖 Автоматически. (GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал).
- **Карточка 2 (Canonical):** 📝 Строго по готовому сценарию. (GoToFlow следует выбранной структуре без самостоятельной смены логики подачи).
- **Карточка 3 (Canonical):** 💡 Любая идея. (Если нужного сценария нет в списке, пользователь может задать собственную тему или идею).
- **Карточки 4-6 (Page-specific):** Адаптированы под PROMPT.

---

## 9. Workflow / Choice Guide
- Использовать строгую структуру benchmark (`/ru/use-cases/video-v-karusel`).
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
