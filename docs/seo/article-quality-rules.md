# Production SEO Article Rules

These rules dictate the visual and content quality standards for all production SEO articles. They must be strictly followed during article generation and review.

1. **FAQ Size:** The FAQ section must contain a minimum of 5 questions. The optimal number is 5–7 questions.
2. **No Literal Asterisks:** Do not use markdown asterisks (`*...*` or `**...**`) to highlight CTAs or paragraphs if this content is intended to render as plain text or if it causes literal asterisks to appear on the production page.
3. **Clean HTML Output:** Production HTML must not display literal `*`, `**`, or any other raw markdown syntax around normal phrases.
4. **Quick Answer Layout:** The "Quick Answer" block must not render as a tiny narrow card inside a huge empty container. It should take up the full available width appropriately. If the text is short, the block must remain compact or well-distributed.
5. **No Duplicate Headings:** Do not allow duplicate semantic labels/headings in the same block (e.g., having an eyebrow "КОРОТКИЙ ОТВЕТ" directly above an H2 "Краткий ответ"). Remove the redundant label so it doesn't feel repetitive.
6. **Visual QA is Mandatory:** Visual QA must be performed after build. Specifically check:
   - Hero section
   - Quick Answer block
   - Tables
   - FAQ block
   - CTAs
   - Mobile rendering

7. **Typography and line-break quality:**
   - Для всех production SEO-статей RU/EN обязательна visual QA-проверка переносов.
   - Нельзя оставлять “обгрызенные” строки: когда после двоеточия, тире или смыслового разделителя остаётся одно слово/короткий обрывок.
   - Проверять нужно H1/H2/H3, hero subtitle, CTA, Quick Answer, карточки и крупные текстовые блоки.
   - Для RU и EN переносы проверяются отдельно: русский текст часто требует другой формулировки из-за длинных слов и падежей; английский — из-за коротких служебных слов и headline-style фраз.
   - Если `text-wrap: balance` или layout не решают проблему, нужно переформулировать текст так, чтобы строки делились естественно.
   - Не жертвовать смыслом/SEO-интентом ради красивой строки, но убирать очевидно некрасивые переносы.
   - Visual QA должен включать desktop и mobile.
