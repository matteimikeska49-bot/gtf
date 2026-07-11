import { SEO_ANALYTICS_EVENTS } from '../../content/seoPages/releaseContracts';

const getPagePayload = (page) => ({
  page_id: page?.id,
  page_path: page?.path,
  page_type: page?.pageType,
  page_state: page?.state,
  page_language: page?.language,
  page_entity: page?.seoBrief?.pageEntity,
  primary_intent: page?.seoBrief?.primaryIntent || page?.primaryIntent,
  primary_query: page?.seoBrief?.primaryQuery || page?.primaryKeyword,
});

export const trackSeoEvent = (eventName, page, params = {}) => {
  if (typeof window === 'undefined' || !eventName) return;

  const payload = {
    event: eventName,
    ...getPagePayload(page),
    ...params,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  window.dispatchEvent(new CustomEvent('seo-analytics', {
    detail: payload,
  }));
};

export const getSeoCtaEventName = (position) => {
  if (position === 'hero') return SEO_ANALYTICS_EVENTS.heroCtaClick;
  if (position === 'workflow') return SEO_ANALYTICS_EVENTS.workflowCtaClick;
  if (position === 'showcase') return SEO_ANALYTICS_EVENTS.showcaseCtaClick;
  if (position === 'final') return SEO_ANALYTICS_EVENTS.finalCtaClick;
  return 'seo_cta_click';
};
