import {
  SOCIAL_CONFIG,
  type SocialType,
} from '@/features/profile/model/social.config';
import type { LensProfile } from '@/helpers';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Plus } from 'lucide-react';
import { SocialLinkForm } from './SocialLinkForm';

export const EditableSocialLinks = ({
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
          <SocialLinkForm
            key={link.key}
            icon={config.icon('size-6')}
            label={config.label}
            value={link.value}
          />
        );
      })}
      <Popover>
        <PopoverTrigger asChild>
          <Button role="button" variant="outline">
            <Plus size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Add social media link</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
