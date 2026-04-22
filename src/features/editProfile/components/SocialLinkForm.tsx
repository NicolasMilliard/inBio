import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

// TODO: import this type from a common file
type FormValues = {
  socialLinks: Array<{ type: string; url: string }>;
};

export const SocialLinkForm = ({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
}) => {
  const { control, register, watch } = useFormContext<FormValues>();
  const { fields, update } = useFieldArray({ control, name: 'socialLinks' });

  const idx = fields.findIndex((f) => f.type === type);
  const url = watch(`socialLinks.${idx}.url`);

  const handleRemove = () => {
    if (idx !== -1) update(idx, { type, url: '' });
  };

  if (idx === -1) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          role="button"
          className="text-primary hover:text-chart-2 cursor-pointer transition"
        >
          {icon}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-8">
        <Label>Edit your {label} link:</Label>
        <Input {...register(`socialLinks.${idx}.url`)} defaultValue={url} />
        <Button role="button" variant="destructive" onClick={handleRemove}>
          Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};
