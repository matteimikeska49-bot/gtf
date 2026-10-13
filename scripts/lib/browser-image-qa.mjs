// Browser-only QA. No lazy-loading attributes or application settings are changed.
export async function checkBrowserImages(page) {
  return page.evaluate(async () => {
    const urls = [...new Set([...document.images].map((image) => image.currentSrc || image.src).filter(Boolean))];
    return Promise.all(urls.map(async (url) => {
      const image = new Image();
      let timer;
      try {
        await Promise.race([
          new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error('Image load failed'));
            image.src = url;
          }).then(() => image.decode()),
          new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Image load/decode timeout')), 5000); }),
        ]);
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('Empty decoded image');
        return { url, passed: true, width: image.naturalWidth, height: image.naturalHeight };
      } catch (error) {
        return { url, passed: false, error: error.message };
      } finally {
        clearTimeout(timer);
      }
    }));
  });
}

// Classification is diagnostic only: the existing overall console gate stays strict.
export function isAnalyticsDependency(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && (
      (parsed.hostname === 'www.googletagmanager.com' && ['/gtag/js', '/gtm.js'].includes(parsed.pathname)) ||
      (parsed.hostname === 'mc.yandex.ru' && parsed.pathname.startsWith('/metrika/')) ||
      ['mdd.yandex.net', 'hdrc.yandex.net'].includes(parsed.hostname)
    );
  } catch { return false; }
}

export function isDecodedMediaCancellation(request, media) {
  return request.resourceType === 'media' && request.error === 'net::ERR_ABORTED' &&
    media.some((item) => item.url === request.url && item.readyState >= 2 &&
      item.width > 0 && item.height > 0 && item.error === null);
}
