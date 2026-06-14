export function normalizeRef(value) {
  if (!value) return '';
  return String(value)
    .trim()
    .replace(/^@+/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 64);
}

export function getSavedRef() {
  try {
    return normalizeRef(window.localStorage.getItem('gtf_ref'));
  } catch (error) {
    return '';
  }
}

export function getAppUrlWithRef(baseUrl) {
  try {
    const url = new URL(baseUrl);
    const ref = getSavedRef();

    // Preserve all existing query parameters from the current page URL
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
    }

    // Ensure the saved ref is applied if no ref is in the URL
    if (ref && !url.searchParams.has('ref')) {
      url.searchParams.set('ref', ref);
    }

    // Remove the trailing '?' if search params are empty
    const urlString = url.toString();
    return urlString.endsWith('?') ? urlString.slice(0, -1) : urlString;
  } catch (error) {
    return baseUrl;
  }
}
