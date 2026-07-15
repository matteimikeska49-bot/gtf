# Upgrade Plan: Legacy RU SEO Pages

Этот документ содержит аудит и план улучшений для шести старых (legacy) RU SEO-страниц инструментов на основе стандартов новой **GoToFlow Carousel Page Production System**. 

**Цель:** Точечное улучшение конверсии, SEO-метрик и UX на старых страницах без их полного переписывания, изменения дизайна, замены базовой структуры Hero или перехода на новый шаблон `CarouselProductSeoPageTemplate`.

---

## 10 критериев аудита

Каждая страница проверялась по следующим стандартам:
1. **Quick Answer Block:** Наличие выделенного блока с прямым текстом для Google Featured Snippets сразу после Hero.
2. **Contextual CTAs:** Тексты на кнопках (CTA) должны отражать конкретную задачу (а не просто "Начать").
3. **Mobile Sticky Navigation:** Наличие плавающего мобильного меню (anchor links) с корректным offset.
4. **Hero Asset Alignment:** Точечная оптимизация визуального ассета первого экрана под интент страницы (без перестройки самого Hero).
5. **Formats Coverage (Cross-linking):** Блок визуальных карточек, перенаправляющий на смежные форматы и кейсы.
6. **Related Links:** Навигационный блок релевантных ссылок (статьи, шаблоны, промпты) перед футером.
7. **FAQ Internal Linking:** Встроенные контекстные ссылки внутри ответов FAQ.
8. **Config-Driven Content:** Вынос контентных массивов (FAQ, Cards, Steps) из JSX-разметки.
9. **Content & Design Contract:** Наличие задокументированного MD-контракта с текстами.
10. **Semantic Hierarchy:** Правильная вложенность заголовков (H1 -> H2 -> H3).

---

## 1. /ru/ii-generator-karuseley
**Компонент:** `RuAICarouselGeneratorPage`

- [ ] 1. **Quick Answer Block:** Отсутствует. Необходимо добавить SEO-блок ответов.
- [ ] 2. **Contextual CTAs:** Используются общие призывы. Заменить на специфичные ("Создать ИИ-карусель").
- [ ] 3. **Mobile Sticky Navigation:** Отсутствует. Добавить мобильную навигацию по странице.
- [ ] 4. **Hero Asset Alignment:** Мокап абстрактный, необходимо обновить изображение для соответствия интенту.
- [ ] 5. **Formats Coverage:** Отсутствует. Внедрить правило "Formats Coverage Rule".
- [ ] 6. **Related Links:** Нет релевантной перелинковки в конце страницы.
- [ ] 7. **FAQ Internal Linking:** В ответах FAQ нет ссылок на блог или другие страницы.
- [ ] 8. **Config-Driven Content:** Данные захардкожены внутри компонента. Требуется вынос.
- [ ] 9. **Content Contract:** Markdown контракт отсутствует.
- [ ] 10. **Semantic Hierarchy:** Отсутствует строгая связка между H2 и текстами-ответами.

## 2. /ru/ii-generator-kontenta
**Компонент:** `AIContentPageRu`

- [ ] 1. **Quick Answer Block:** Отсутствует.
- [ ] 2. **Contextual CTAs:** Кнопки не отражают интент "генератора контента".
- [ ] 3. **Mobile Sticky Navigation:** Отсутствует.
- [ ] 4. **Hero Asset Alignment:** Требует точечной корректировки под задачу контента.
- [ ] 5. **Formats Coverage:** Блок смежных форматов не интегрирован.
- [ ] 6. **Related Links:** Нет ссылок на шаблоны и промпты.
- [ ] 7. **FAQ Internal Linking:** Отсутствует.
- [ ] 8. **Config-Driven Content:** Массивы данных жестко прописаны в JSX.
- [ ] 9. **Content Contract:** Не существует.
- [ ] 10. **Semantic Hierarchy:** Необходимо актуализировать SEO-заголовки.

## 3. /ru/generator-karuselej-instagram
**Компонент:** `RuAICarouselGeneratorPage`

- [ ] 1. **Quick Answer Block:** Отсутствует.
- [ ] 2. **Contextual CTAs:** Должны указывать на "Instagram" (сейчас общие).
- [ ] 3. **Mobile Sticky Navigation:** Отсутствует.
- [ ] 4. **Hero Asset Alignment:** Ассет должен отражать Instagram-специфику, а не базовый вид.
- [ ] 5. **Formats Coverage:** Отсутствует.
- [ ] 6. **Related Links:** Отсутствует.
- [ ] 7. **FAQ Internal Linking:** Нет ссылок на специфичные Instagram-статьи.
- [ ] 8. **Config-Driven Content:** Захардкожено.
- [ ] 9. **Content Contract:** Не существует.
- [ ] 10. **Semantic Hierarchy:** Заголовки общие, без Instagram-интента в H2-подразделах.

## 4. /ru/ii-generator-postov-dlya-instagram
**Компонент:** `InstagramPostPageRu`

- [ ] 1. **Quick Answer Block:** Отсутствует.
- [ ] 2. **Contextual CTAs:** Слишком универсальные ("Начать").
- [ ] 3. **Mobile Sticky Navigation:** Не реализовано.
- [ ] 4. **Hero Asset Alignment:** Абстрактные элементы в Hero.
- [ ] 5. **Formats Coverage:** Нет ссылок на карусели или контент.
- [ ] 6. **Related Links:** Отсутствует.
- [ ] 7. **FAQ Internal Linking:** Отсутствует.
- [ ] 8. **Config-Driven Content:** Контент внутри функции рендера.
- [ ] 9. **Content Contract:** Отсутствует.
- [ ] 10. **Semantic Hierarchy:** SEO-заголовки требуют ревизии.

## 5. /ru/generator-karuselej-linkedin
**Компонент:** `LinkedInCarouselPageRu`

- [ ] 1. **Quick Answer Block:** Отсутствует прямой текстовый ответ после Hero.
- [ ] 2. **Contextual CTAs:** "Создать карусель" — необходимо расширить до LinkedIn контекста.
- [ ] 3. **Mobile Sticky Navigation:** Отсутствует (длинный мобильный скролл).
- [ ] 4. **Hero Asset Alignment:** Используются общие мокапы и абстрактные свечения.
- [ ] 5. **Formats Coverage:** Блок Formats отсутствует.
- [ ] 6. **Related Links:** Отсутствует перелинковка перед футером.
- [ ] 7. **FAQ Internal Linking:** В FAQ нет ссылок на гайды по LinkedIn (например, PDF-экспорт).
- [ ] 8. **Config-Driven Content:** `carouselCards`, `problemCards` и `hiwSteps` находятся прямо в JSX.
- [ ] 9. **Content Contract:** Нет `.md` файла в директории `handoffs`.
- [ ] 10. **Semantic Hierarchy:** Нужно выровнять структуру H2.

## 6. /ru/ii-generator-postov-dlya-linkedin
**Компонент:** `LinkedInPostPageRu`

- [ ] 1. **Quick Answer Block:** Отсутствует.
- [ ] 2. **Contextual CTAs:** Общие призывы к действию.
- [ ] 3. **Mobile Sticky Navigation:** Отсутствует.
- [ ] 4. **Hero Asset Alignment:** Мокапы не отображают LinkedIn интерфейс или посты.
- [ ] 5. **Formats Coverage:** Нет кросс-линковки.
- [ ] 6. **Related Links:** Нет ссылок на статьи о LinkedIn.
- [ ] 7. **FAQ Internal Linking:** Нет ссылок.
- [ ] 8. **Config-Driven Content:** Контент внутри компонента.
- [ ] 9. **Content Contract:** Отсутствует.
- [ ] 10. **Semantic Hierarchy:** SEO-блок содержит H2, но в целом структура недостаточна.
