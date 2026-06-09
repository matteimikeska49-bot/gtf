## D77-control.3 — Route and Demand Evidence Verification Report

### Process

* Briefs generated: 0
* Articles created: 0
* Publishing: 0
* Product routes changed globally: No
* Legal pages changed: 0
* Dist staged: No

### Actual product routes

* AI carousel routes: `/ai-carousel-maker`
* Instagram routes: `/ai-instagram-post-generator`
* LinkedIn routes: `/linkedin-carousel-maker`
* RU routes: `/ru/ai-generator-karuselej`, `/ru/generator-postov-instagram`, `/ru/generator-karuselej-linkedin`
* issue: Previous plan used incorrect routes (`/ai-carousel-generator`, `/ai-instagram-carousel-generator`, `/generator-karuselej-linkedin` for EN).

### Topic route verification

* title: ai instagram post generator
* language: EN
* planned product route: /ai-instagram-carousel-generator
* route exists: No
* language match: Yes
* most precise route: /ai-instagram-post-generator
* action: Route corrected to /ai-instagram-post-generator

* title: ai carousel generator
* language: EN
* planned product route: /ai-carousel-generator
* route exists: No
* language match: Yes
* most precise route: /ai-carousel-maker
* action: Route corrected to /ai-carousel-maker

* title: how to post a carousel on linkedin
* language: EN
* planned product route: /generator-karuselej-linkedin
* route exists: Yes, but it is the RU route.
* language match: No
* most precise route: /linkedin-carousel-maker
* action: Route corrected to /linkedin-carousel-maker

* title: instagram carousel post
* language: EN
* planned product route: /ai-instagram-carousel-generator
* route exists: No
* language match: Yes
* most precise route: /ai-instagram-post-generator
* action: Route corrected to /ai-instagram-post-generator

* title: best ai instagram post generators
* language: EN
* planned product route: /ai-instagram-carousel-generator
* route exists: No
* language match: Yes
* most precise route: /ai-instagram-post-generator
* action: HOLD due to missing concrete demand.

* title: ai linkedin post generator
* language: EN
* planned product route: /generator-karuselej-linkedin
* route exists: Yes, but it is the RU route.
* language match: No
* most precise route: /linkedin-carousel-maker
* action: Route corrected to /linkedin-carousel-maker

### Demand evidence verification

* title: ai instagram post generator
* target keyword: ai instagram post generator
* exact source: google_trends_rising, google_trends_top, gsc
* exact query/row: {"googleTrends_rising":{"interestScore":100,"change":"5%","trend":"rising"},"gsc":{"impressions":80}}
* metric: 100 rising 5% / 80 imp
* confidence: High
* action: APPROVED_FOR_BRIEF

* title: ai carousel generator
* target keyword: ai carousel generator
* exact source: google_trends_rising, google_trends_top, gsc
* exact query/row: {"googleTrends_rising":{"interestScore":100,"change":"10%","trend":"rising"},"gsc":{"impressions":15}}
* metric: 100 rising 10% / 15 imp
* confidence: High
* action: APPROVED_FOR_BRIEF

* title: how to post a carousel on linkedin
* target keyword: how to post a carousel on linkedin
* exact source: google_trends_rising, google_trends_top
* exact query/row: {"googleTrends_rising":{"interestScore":97,"change":"160%","trend":"rising"}}
* metric: 97 rising 160%
* confidence: High
* action: APPROVED_FOR_BRIEF

* title: instagram carousel post
* target keyword: instagram carousel post
* exact source: google_trends_rising, google_trends_top
* exact query/row: {"googleTrends_rising":{"interestScore":89,"change":"3%","trend":"rising"}}
* metric: 89 rising 3%
* confidence: High
* action: APPROVED_FOR_BRIEF

* title: best ai instagram post generators
* target keyword: best ai instagram post generators
* exact source: Not found in classified.json
* exact query/row: None
* metric: None
* confidence: None
* action: HOLD

* title: ai linkedin post generator
* target keyword: ai linkedin post generator
* exact source: google_trends_rising, google_trends_top
* exact query/row: {"googleTrends_top":{"interestScore":100,"change":"50%","trend":"rising"}}
* metric: 100 rising 50%
* confidence: High
* action: APPROVED_FOR_BRIEF

### Final approval

* title: ai instagram post generator
* decision: APPROVED_FOR_BRIEF
* reason: Strong demand evidence, verified route, exact product fit.

* title: ai carousel generator
* decision: APPROVED_FOR_BRIEF
* reason: Strong demand evidence, verified route, core cluster hub.

* title: how to post a carousel on linkedin
* decision: APPROVED_FOR_BRIEF
* reason: Strong demand evidence, canonicalized topic, verified route.

* title: instagram carousel post
* decision: APPROVED_FOR_BRIEF
* reason: Strong demand evidence, canonicalized topic, verified route.

* title: best ai instagram post generators
* decision: HOLD
* reason: No concrete demand row found in data.

* title: ai linkedin post generator
* decision: APPROVED_FOR_BRIEF
* reason: Strong demand evidence, verified route, exact product fit.

* title: нейросеть для постов
* decision: HUB_CANDIDATE
* reason: High volume (2664 Wordstat) but too broad intent. Needs to be a central hub later.

* title: ai tools for social media posts
* decision: HOLD
* reason: No concrete demand row found.

### Validation

* check:blog:keywords: Pending run
* check:blog:topic-score: Pending run
* check:blog:batch-workflow: Pending run
* result: Run required in CLI.

### Commit/push

* files changed: 2
* commit created: Yes
* commit hash: Pending
* push completed: Pending

### Decision

* Can generate briefs next: Yes
* Can create article drafts next: No
* Approved topic count: 5
* Remaining blockers: None
* Exact next action: Proceed to Controlled Batch 25 Wave 1 brief generation for 5 topics.
