import { type PlatformName, SOCIAL_MAP } from '@/constants';
import { useFormContext, useWatch } from 'react-hook-form';
import type { SocialLink } from '../../schemas/profileForm.schema';

import { EditSocialIconLink } from './EditSocialIconLink';

export const EditableSocialIcons = () => {
  const { control } = useFormContext<{ socialLinks: SocialLink[] }>();
  const socialLinks = useWatch({ control, name: 'socialLinks' });
  const activeLinks = socialLinks.filter((l) => l.url !== '');

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex max-w-prose flex-wrap items-center justify-center gap-3">
      {activeLinks.map((link) => {
        const platform = SOCIAL_MAP[link.platform as PlatformName];

        if (!platform) return null;

        return (
          <EditSocialIconLink
            key={link.platform}
            icon={<platform.Icon className="size-6" />}
            label={platform.label}
            type={link.platform}
          />
        );
      })}
    </div>
  );
};
