import type { LensProfile } from '../hooks/useLensAccount';
import { SOCIAL_CONFIG, type SocialType } from '../model/social.config';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const SocialLinks = ({
  socialLinks,
}: {
  socialLinks: LensProfile['socialLinks'];
}) => {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="flex max-w-prose flex-wrap items-center justify-center gap-3">
      {socialLinks.map((link) => {
        const config = SOCIAL_CONFIG[link.type as SocialType];

        if (!config) return null;

        return (
          <Tooltip>
            <TooltipTrigger>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>{config.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
