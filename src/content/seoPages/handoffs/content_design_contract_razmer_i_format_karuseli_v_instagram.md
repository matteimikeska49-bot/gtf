# CONTENT & DESIGN CONTRACT

**Route:** `/ru/blog/razmer-i-format-karuseli-v-instagram`
**Target System:** Carousel Page Production System (Freeze v1.1) & Blog Publishing System
**Primary Intent:** PLATFORM / INFORMATIONAL

---

## 1. Source of Truth
- **Точные Demand Master строки:** Будут уточнены при детальной сверке с кластером.
- **Основные запросы:** Зависят от финальной выгрузки Wordstat.
- **Исключенный шум:** Случайные мусорные запросы, не имеющие отношения к Размер и формат карусели в Instagram.
- **URL-origin signals:** Из `gotoflow_top_100_seo_candidates.md`.

---

## 2. Intent Ownership
- **Primary intent:** PLATFORM / INFORMATIONAL — Размер и формат карусели в Instagram 2026 | GoToFlow.
- **Secondary intents:** LSI и supporting queries из кластера.
- **Точная граница:** Страница имеет отдельный ownership и не перекрывает общий инструмент (`/ru/generator-karuselej-instagram`).
- **Риск каннибализации:** NONE (после корректного разделения границ).

---

## 3. Final URL
- **Final URL:** `/ru/blog/razmer-i-format-karuseli-v-instagram`
- **Slug:** `razmer-i-format-karuseli-v-instagram`
- **Аргументация:** URL отражает PLATFORM / INFORMATIONAL интент и соответствует архитектуре. Не скопирован слепо из одного запроса.

---

## 4. Page Family
- **Selected family:** `blog`
- **Exact production benchmark:** `BlogPublishingSystem`
- **Почему benchmark подходит:** Эталонная структура, обеспечивающая максимальную конверсию.
- **Immutable blocks:** Layout, spacing, React components hierarchy.
- **Адаптируемые data fields:** Title, H1, text content, approved assets.

---

## 5. Metadata
- **SEO Title:** Размер и формат карусели в Instagram 2026 | GoToFlow
- **Meta Description:** Узнайте актуальные размеры и форматы для каруселей в Instagram. Выбираем между 4:5, 1:1 и 9:16, разбираем частые ошибки.
- **H1:** Размер и формат карусели в Instagram
- **Canonical:** `/ru/blog/razmer-i-format-karuseli-v-instagram`

---

## 6. Hero
- **Eyebrow:** Форматы
- **H1:** Размер и формат карусели в Instagram
- **Description:** Узнайте актуальные размеры и форматы для каруселей в Instagram. Выбираем между 4:5, 1:1 и 9:16, разбираем частые ошибки.
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
- **Body:** Вставьте текст, идею или ссылку. ИИ проанализирует контекст и соберет готовую карусель, адаптированную под тематику Размер и формат карусели в Instagram.

---

## 8. Formats Coverage (Rule v1.1)
*Не применимо для Blog Pages.*

---

## 9. Workflow / Choice Guide
- Использовать строгую структуру benchmark (`BlogPublishingSystem`).
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
