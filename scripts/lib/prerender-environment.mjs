// Injected by the build browser only, never included in the visitor bundle.
// Snapshot the initial demo/slide rather than an arbitrary periodic timer tick.
// One-shot timers, routing, requests and consent storage are not fabricated.
export function installPrerenderEnvironment(route) {
  window.__GTF_PRERENDER_ROUTE = route;
  window.setInterval = () => 0;
}
