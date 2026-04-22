import {
  SOCIAL_CONFIG,
  type SocialType,
} from '@/features/profile/model/social.config';
import { useFormContext, useWatch } from 'react-hook-form';

import { SocialLinkForm } from './SocialLinkForm';

// TODO: import this type from a common file
type FormValues = {
  socialLinks: Array<{ type: string; url: string }>;
};

export const EditableSocialLinks = () => {
  const { control } = useFormContext<FormValues>();
  const socialLinks = useWatch({ control, name: 'socialLinks' });

  // Show platforms that have a non-empty url OR have been toggled open (url can be empty but type is present)
  const activeLinks = socialLinks.filter((l) => l.url.trim() !== '');

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex max-w-prose flex-wrap items-center justify-center gap-3">
      {activeLinks.map((link) => {
        const config = SOCIAL_CONFIG[link.type as SocialType];

        if (!config) return null;

        return (
          <SocialLinkForm
            key={link.type}
            icon={config.icon('size-6')}
            label={config.label}
            type={link.type}
          />
        );
      })}
    </div>
  );
};
