import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

export const ThemeSelector = () => {
  const { setValue, control } = useFormContext<MetadataFormValues>();

  const theme = useWatch({
    control,
    name: 'theme',
  });

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        setValue('theme', value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
