import { useFormContext, useWatch } from 'react-hook-form';
import type { MetadataFormValues } from '../schemas/metadataForm.schema';

import { Toggle } from '@/components/ui';
import { BarChart3 } from 'lucide-react';

export const StatisticsToggle = () => {
  const { setValue, control } = useFormContext<MetadataFormValues>();

  const isPressed = useWatch({ control, name: 'displayStatistics' });

  return (
    <Toggle
      aria-label="Toggle statistics"
      variant="outline"
      pressed={isPressed}
      onPressedChange={(pressed) =>
        setValue('displayStatistics', pressed, { shouldDirty: true })
      }
    >
      <BarChart3 />
      Statistics
    </Toggle>
  );
};
