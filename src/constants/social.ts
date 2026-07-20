const DEFAULT_PUBLIC_ORIGIN = 'https://3bio.social';

const resolvePublicOrigin = () => {
  const configuredOrigin = import.meta.env.VITE_PUBLIC_ORIGIN?.trim();
  const runtimeOrigin =
    typeof window === 'undefined' ? undefined : window.location.origin;

  try {
    const url = new URL(
      configuredOrigin || runtimeOrigin || DEFAULT_PUBLIC_ORIGIN,
    );

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.origin
      : DEFAULT_PUBLIC_ORIGIN;
  } catch {
    return DEFAULT_PUBLIC_ORIGIN;
  }
};

export const THREE_BIO_ORIGIN = resolvePublicOrigin();
export const THREEBIO_URL = `${new URL(THREE_BIO_ORIGIN).host}/`;
export const THREEBIO_GITHUB_URL = 'https://github.com/NicolasMilliard/3bio';
