import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { useFormContext, useWatch } from 'react-hook-form';

import { Field, Label, Switch } from '@/components/ui';

export const BrandingSwitch = () => {
  const { setValue, control } = useFormContext<MetadataFormValues>();

  const isChecked = useWatch({ control, name: 'displayBranding' });

  return (
    <Field orientation="horizontal">
      <Switch
        id="display-branding"
        checked={isChecked}
        onCheckedChange={(pressed) =>
          setValue('displayBranding', pressed, { shouldDirty: true })
        }
        size="sm"
      />
      <Label htmlFor="display-branding">Branding</Label>
    </Field>
  );
};
