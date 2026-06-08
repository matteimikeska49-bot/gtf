# Mockup Relevance Contract

This document defines the rules for embedding mockups in SEO articles.

## Mockup relevance rule
A mockup must match:
* article language;
* platform;
* source type;
* search intent;
* product capability;
* visible text;
* product workflow.

## Forbidden behavior
* Do not use a mockup because the slot exists.
* Do not use Instagram mockup for LinkedIn/PDF article.
* Do not use EN mockup in RU article.
* Do not use a result mockup whose visible text contradicts article topic.
* Do not use a file/video mockup unless the product capability is supported or carefully worded.
* Do not use mockups that imply unsupported upload/direct publishing features.

## Safe fallback
If no relevant mockup exists:
* use `mockupStatus: "not_available"`;
* add a clear `mockupReason`;
* do not insert `:::mockup`.
