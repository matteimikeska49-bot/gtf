# Visual QA Contract

## Visual QA rule
No article can be published until:
* local preview route is verified;
* desktop view is checked;
* mobile view is checked;
* hero/Quick Answer/body/CTA/FAQ are visually acceptable;
* no horizontal overflow;
* no broken images;
* no empty sections;
* no mismatched mockups;
* user manually approves final visual preview.

## Preview URL rule
Do not tell the user to open a URL unless:
* preview server is actually running;
* the route returns HTTP 200;
* the exact route including trailing slash is verified;
* the article title or slug is found in the HTML.

## Manual approval rule
Automated visual QA can say “ready for manual review”.
It cannot publish.
Only user approval can move draft to publish.
