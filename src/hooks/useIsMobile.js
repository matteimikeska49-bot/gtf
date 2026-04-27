import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Reactive hook that returns `true` when the viewport width is below 768 px.
 * Uses a `resize` listener so the value stays current if the window is resized
 * or the device orientation changes.
 *
 * Safe for SSR — defaults to `false` when `window` is unavailable.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (e) => setIsMobile(e.matches);

    // Set initial value from the media-query (more reliable than innerWidth)
    setIsMobile(mql.matches);

    // Modern browsers support addEventListener on MediaQueryList
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
};
