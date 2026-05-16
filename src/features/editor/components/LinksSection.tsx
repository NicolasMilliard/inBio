import { useFormContext, useWatch } from 'react-hook-form';
import { buildLinkAttributes } from '../hooks';
import type { MetadataFormValues } from '../schemas/metadataForm.schema';

import { Links } from '@/features/profile/components';

export const LinksSection = () => {
  const { control } = useFormContext<MetadataFormValues>();
  const links = useWatch({ control, name: 'links' });

  const formattedLinks = buildLinkAttributes(links);

  return <Links links={formattedLinks} />;
};
