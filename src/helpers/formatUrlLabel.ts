export const formatUrlLabel = (url: string) => {
  try {
    const parsed = new URL(url);

    return parsed.hostname + parsed.pathname.replace(/\/+$/, '');
  } catch {
    // fallback for invalid URLs
    return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
};
