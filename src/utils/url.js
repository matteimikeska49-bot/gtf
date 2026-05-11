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

    if (ref) {
      url.searchParams.set('ref', ref);
    }

    return url.toString();
  } catch (error) {
    return baseUrl;
  }
}
