import { useFormContext, useWatch } from 'react-hook-form';
import { type MetadataFormValues } from '../schemas/metadataForm.schema';

import { Statistics } from '@/features/profile/components';

export const StatisticsSection = ({
  followers,
  following,
  posts,
}: {
  followers?: number;
  following?: number;
  posts?: number;
}) => {
  const { control } = useFormContext<MetadataFormValues>();

  const displayStatistics = useWatch({ control, name: 'displayStatistics' });

  return (
    displayStatistics && (
      <Statistics followers={followers} following={following} posts={posts} />
    )
  );
};
