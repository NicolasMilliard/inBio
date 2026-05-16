import { useFormContext, useWatch } from 'react-hook-form';
import { buildSocialLinkAttributes } from '../hooks';
import type { MetadataFormValues } from '../schemas/metadataForm.schema';

import { SocialLinks } from '@/features/profile/components';

export const SocialLinksSection = () => {
  const { control } = useFormContext<MetadataFormValues>();
  const formSocialLinks = useWatch({ control, name: 'socialLinks' });

  const formattedSocialLinks = buildSocialLinkAttributes(formSocialLinks);

  return <SocialLinks socialLinks={formattedSocialLinks} />;
};
