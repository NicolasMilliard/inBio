import { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import {
  POPULAR_SOCIAL_PLATFORMS,
  SOCIAL_PLATFORMS,
  type SocialValue,
} from '../constants';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Plus } from 'lucide-react';

// TODO: import this type from a common file
type FormValues = {
  socialLinks: Array<{ type: string; url: string }>;
};

export const AddSocialLink = () => {
  const [open, setOpen] = useState(false);
  const [pendingType, setPendingType] = useState<SocialValue | null>(null);
  const [pendingUrl, setPendingUrl] = useState('');

  const { control } = useFormContext<FormValues>();
  const { fields, update } = useFieldArray({ control, name: 'socialLinks' });
  const socialLinks = useWatch({ control, name: 'socialLinks' });

  const activePlatformTypes = new Set(
    socialLinks.filter((l) => l.url.trim() !== '').map((l) => l.type),
  );

  const filterInactive = <T extends { value: SocialValue }>(platforms: T[]) =>
    platforms.filter((p) => !activePlatformTypes.has(p.value));

  const handleSelect = (value: SocialValue) => {
    setPendingType(value);
    setPendingUrl('');
  };

  const handleConfirm = () => {
    if (!pendingType || !pendingUrl.trim()) return;
    const idx = fields.findIndex((f) => f.type === pendingType);
    if (idx !== -1) update(idx, { type: pendingType, url: pendingUrl.trim() });
    setPendingType(null);
    setPendingUrl('');
    setOpen(false);
  };

  const handleCancel = () => {
    setPendingType(null);
    setPendingUrl('');
  };

  const inactivePopular = filterInactive(POPULAR_SOCIAL_PLATFORMS);
  const inactiveAll = filterInactive(SOCIAL_PLATFORMS);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) handleCancel();
      }}
    >
      <PopoverTrigger asChild>
        <Button role="button" variant="outline">
          <Plus size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" sideOffset={4}>
        {pendingType ? (
          // Step 2: enter the url for the selected platform
          (() => {
            const platform = SOCIAL_PLATFORMS.find(
              (p) => p.value === pendingType,
            );
            return (
              <div className="space-y-3 p-4">
                <p className="text-sm font-medium">{platform?.label} link</p>
                <Input
                  type="url"
                  placeholder={platform?.placeholder}
                  value={pendingUrl}
                  onChange={(e) => setPendingUrl(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={handleConfirm}
                    disabled={!pendingUrl.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Back
                  </Button>
                </div>
              </div>
            );
          })()
        ) : (
          // Step 1: pick a platform
          <Command>
            <CommandInput placeholder="Search platforms…" className="h-9" />
            <CommandEmpty>No platform found.</CommandEmpty>
            {inactivePopular.length > 0 && (
              <CommandGroup
                heading="Popular"
                className="max-h-64 overflow-y-auto"
              >
                {inactivePopular.map(({ value, label, Icon }) => (
                  <CommandItem
                    key={value}
                    value={label}
                    onSelect={() => handleSelect(value)}
                    className="cursor-pointer gap-2"
                  >
                    <Icon className="text-primary size-4 shrink-0" />
                    <span className="flex-1 text-sm">{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            {inactiveAll.length > 0 && (
              <CommandGroup
                heading="All Platforms"
                className="max-h-64 overflow-y-auto"
              >
                {inactiveAll.map(({ value, label, Icon }) => (
                  <CommandItem
                    key={value}
                    value={label}
                    onSelect={() => handleSelect(value)}
                    className="cursor-pointer gap-2"
                  >
                    <Icon className="text-primary size-4 shrink-0" />
                    <span className="flex-1 text-sm">{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};
