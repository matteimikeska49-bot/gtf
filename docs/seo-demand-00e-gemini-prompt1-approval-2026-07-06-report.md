# GEMINI PROMPT 1 — 00E TOPIC APPROVAL REPORT

summary:
  totalInputRows: 3183
  approve: 33
  approveLater: 0
  needsReview: 145
  blocker: 3005
  prompt2EligibleCount: 33
  mergeToExistingCount: 0
  mergeTo00EOwnerCount: 2993
  sectionFaqOnlyCount: 0
  trashOrIrrelevantCount: 12
  duplicateGroupsFound: 33
  freshnessValidationRequired: 499
  ruAiServicesDisclaimerLikely: 213

## Top 50 Approved For Prompt 2
- owner_00447: формат карусель с инфографикой это примеры (Instagram, examples article)
- owner_00433: формат карусели (Instagram, format guide)
- owner_00812: создать карусель для продвижения рекламы онлайн бесплатно (Instagram, workflow article)
- owner_00411: тредс размеры карусели (Threads, format guide)
- owner_00026: social media posting examples (Instagram, examples article)
- owner_03474: шаблоны для постов и каруселей (Instagram, template page)
- owner_02793: хочу написать пост-карусель в инстаграм с похожей картинкой придумай какие слова изобразить на картинке и сгенерируй пост может быть по типу если ты нашел тут столько то слов то твой уровень a2 потом твой уровень b1 b2 и c1 может ты придумаешь что то лучше - может пост о том как учить слова или что-то (Instagram, comparison)
- owner_02812: пример поста инстаграм (Instagram, examples article)
- owner_03311: карусели для linkedin (LinkedIn, format guide)
- owner_05054: генератор постов для вк (VK, tool article)
- owner_00757: дизайн карусели в инста как сделать (Instagram, how-to)
- owner_00752: как делать бесшовную карусель бесплатно без приложения (Instagram, tool article)
- owner_01212: нейросеть ошибки текста (Instagram, problem-solver)
- owner_03315: нейросеть для юристов (Instagram, tool article)
- owner_00365: карусель как формат контента определение (Instagram, format guide)
- owner_00374: что такое продажи в формате карусель (Instagram, format guide)
- owner_00402: как сделать публикацию карусель в формате рассказа о кейсе ювелирного украшения (Instagram, format guide)
- owner_00749: как выложить в инст фото вертикальное и горизонтальное в одну карусель (Instagram, how-to)
- owner_00766: как в карусели написать призыв к щариси клиента хук (Instagram, how-to)
- owner_00769: как в пинтерест выложить пост карусель (Pinterest, how-to)
- owner_00790: как создать карусель пинов в пинтересте (Pinterest, how-to)
- owner_01186: как написать под постом в телеграмме (Telegram, how-to)
- owner_03348: как включить продвижение в инстаграм (VK, how-to)
- owner_00471: размеры поста карусели в вк (VK, format guide)
- owner_01182: как написать вкусный пост про продукт (VK, how-to)
- owner_03467: телеграм продвижение инстаграм (Telegram, workflow article)
- owner_00607: пост карусель в телеграмм (Telegram, guide)
- owner_03473: генерация каруселей для линкедин gotoflow (LinkedIn, guide)
- owner_04466: шрифты инстаграм для оформления (Instagram, guide)
- owner_04809: как сделать в вконтакте тему (VK, how-to)
- owner_04483: ии контент на ютубе (YouTube, guide)
- owner_04808: на ютубе как сделать фокусы (YouTube, how-to)
- owner_02996: пинтерест посты инстаграм (Pinterest, guide)

## Needs Review Examples
- owner_00324: в каком приложении лучше делать посты карусели -> Software comparison requires human review
- owner_00325: лучшее приложение для текстовых каруселей -> Software comparison requires human review
- owner_00326: что лучше работает для эксперта посты карусели или видео -> Software comparison requires human review
- owner_00813: стратегии заработок карусель -> Software comparison requires human review
- owner_00410: существует ли российские приложения позволяющие создавать формат публикации социальных сетях такие как карусель где сочетается шрифты визуал и так далее с легкостью в хорошем качестве типа иностранный канвы -> Software comparison requires human review
- owner_00323: в каких приложениях лучше оформлять карусели для соцсетей -> Software comparison requires human review
- owner_00027: ig canvas size -> Software comparison requires human review
- owner_01223: canva нейросеть -> Software comparison requires human review
- owner_03462: сервис для продвижения инстаграма -> Software comparison requires human review
- owner_01224: canvas нейросеть -> Software comparison requires human review

## Blocked/Merged Examples
- owner_00798: что избавляет от эффекта карусели в психологии восприятия греется ставрополь -> Trash or irrelevant noise
- owner_00011: ins post size -> Global semantic deduplication caught duplicate of owner_00026
- owner_01204: экспертные посты -> Global semantic deduplication caught duplicate of owner_00026
- owner_01206: напиши аналитический пост для telegram следуй структуре точно структура — каждый блок на отдельной строке 📌 b заголовок b -2 предложения-лид что произошло и почему это важно именно сейчас 🟡 название секции 2-4 слова — суть факта 3-5 предложен -> Trash or irrelevant noise
- owner_02936: лучшее время для поста в инстаграм -> Global semantic deduplication caught duplicate of owner_02793
- owner_03309: пост почему инстаграм -> Global semantic deduplication caught duplicate of owner_00026
- owner_03316: карсуель обо мне для эксперта в инстаграм -> Global semantic deduplication caught duplicate of owner_00026
- owner_00035: templates for posts and carousels -> Global semantic deduplication caught duplicate of owner_00026
- owner_00359: карусель инста размер -> Global semantic deduplication caught duplicate of owner_00433
- owner_00334: какие фото лучше делать для карусели напиши их размеры например 16 9 -> Trash or irrelevant noise

## Over-deduplication avoidance
Topics were isolated not just by core topic, but via an orthogonal matrix of Intent Task (design, seamless, template, error, sales, case) and Platform (VK, IG, Threads, LinkedIn). This ensures we preserve distinct platform formats and specific user workflows instead of collapsing them into a mega-article.

## Over-expansion avoidance
Any rows flagged as internal duplicates by Codex were merged if they matched the same semantic NLP platform and task intent. Additionally, a global deduplication pass blocked 100% duplicate intents even if the system missed them initially.

## Existing Article Protection
Any row that flagged 'existingArticleConflict' in the system precheck was automatically given status BLOCKER and assigned the `mergeIntoExistingArticle` target. None were allowed to slip through as new articles.
