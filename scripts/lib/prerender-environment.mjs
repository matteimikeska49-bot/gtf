// Injected by the build browser only, never included in the visitor bundle.
// Snapshot the initial demo/slide rather than an arbitrary periodic timer tick.
// One-shot timers, routing, requests and consent storage are not fabricated.
export function installPrerenderEnvironment(route) {
  window.__GTF_PRERENDER_ROUTE = route;
  window.setInterval = () => 0;
}

// Run the production referral operation on the ready DOM before capturing it.
// This is not an HTML transform; URL/query/ref handling stays in index.html.
export function applyPrerenderReferralState() {
  if (typeof window.__GTF_PRERENDER_ROUTE !== 'string'
    || typeof window.__GTF_PRERENDER_APPLY_REF !== 'function') {
    throw new Error('Prerender referral readiness hook is missing.');
  }
  window.__GTF_PRERENDER_APPLY_REF();
}
