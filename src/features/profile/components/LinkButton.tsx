import { getHostname } from '@/helpers';
import { useState } from 'react';

import { Image } from '@/components/ui';
import { ExternalLink } from 'lucide-react';

type LinkButtonProps = {
  href?: string;
  label: string;
  onClick?: () => void;
};

export const LinkButton = ({ href, label, onClick }: LinkButtonProps) => {
  const isButton = !!onClick;

  const hostname = getHostname(href);

  const [imgSrc, setImgSrc] = useState<string | null>(
    hostname ? `https://${hostname}/favicon.ico` : null,
  );

  const fallbackFavicon = hostname
    ? `https://www.google.com/s2/favicons?domain=${hostname}`
    : null;

  const handleImageError = () => {
    if (imgSrc && imgSrc !== fallbackFavicon) {
      setImgSrc(fallbackFavicon);
      return;
    }

    setImgSrc(null);
  };

  const Wrapper = isButton ? 'button' : 'a';

  const wrapperProps = isButton
    ? {
        type: 'button' as const,
        onClick,
      }
    : {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      };

  return (
    <div className="mb-4 w-full max-w-prose animate-[fadeUp_0.3s_ease_both]">
      <Wrapper
        {...wrapperProps}
        className="group bg-muted/50 text-foreground hover:bg-muted/80 active:bg-muted focus-visible:ring-primary/20 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 will-change-transform focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] active:shadow-inner"
      >
        <div className="flex size-6 shrink-0 items-center justify-center">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={label}
              referrerPolicy="no-referrer"
              className="size-4 rounded-sm"
              onError={handleImageError}
            />
          ) : (
            <span className="text-sm opacity-60">🔗</span>
          )}
        </div>

        <span className="flex-1 truncate text-left">{label}</span>

        <ExternalLink className="size-4 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-80" />
      </Wrapper>
    </div>
  );
};
