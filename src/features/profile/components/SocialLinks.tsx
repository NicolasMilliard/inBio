import { SOCIAL_CONFIG, type SocialType } from '../model/social.config';

import type { LensProfile } from '../hooks/useLensAccount';

export const SocialLinks = ({
  socialLinks,
}: {
  socialLinks: LensProfile['socialLinks'];
}) => {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="flex max-w-xs flex-wrap items-center justify-center gap-3">
      {socialLinks.map((link) => {
        const config = SOCIAL_CONFIG[link.type as SocialType];

        if (!config) return null;

        return (
          <a
            key={link.key}
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-chart-2 transition"
            aria-label={config.label}
          >
            {config.icon('size-6')}
          </a>
        );
      })}
    </div>
  );
};
