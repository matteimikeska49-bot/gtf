import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAppUrlWithRef } from '../../utils/url';
import { getSeoCtaEventName, trackSeoEvent } from './seoAnalytics';

const isExternalHref = (href) => /^https?:\/\//.test(href || '');

const getCtaHref = (href) => (
  href?.startsWith('https://app.gotoflow.io') ? getAppUrlWithRef(href) : href
);

export const SeoPageCTA = ({ cta, compact = false, page, ctaPosition = 'primary' }) => {
  if (!cta?.href || !cta?.label) return null;

  const handleClick = () => {
    trackSeoEvent(cta.analyticsEvent || getSeoCtaEventName(ctaPosition), page, {
      cta_position: ctaPosition,
      cta_label: cta.label,
      target_url: cta.href,
      target_action: cta.action || page?.conversion?.targetAction,
      destination_type: page?.conversion?.destinationType,
    });
  };

  const className = compact
    ? 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_45px_rgba(236,72,153,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 sm:w-auto'
    : 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-7 py-4 text-sm font-bold text-white shadow-[0_22px_60px_rgba(236,72,153,0.35)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 sm:w-auto';

  const content = (
    <>
      <span>{cta.label}</span>
      <ArrowRight className="h-4 w-4" />
    </>
  );

  if (isExternalHref(cta.href)) {
    return <a href={getCtaHref(cta.href)} className={className} onClick={handleClick}>{content}</a>;
  }

  return <Link to={cta.href} className={className} onClick={handleClick}>{content}</Link>;
};
