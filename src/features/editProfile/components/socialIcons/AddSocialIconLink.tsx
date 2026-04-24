import { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { SOCIAL_PLATFORMS, type SocialValue } from '../../constants';
import type { SocialLink } from '../EditProfileForm';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Plus } from 'lucide-react';
import { MenuSocialIcon } from './MenuSocialIcon';

export const AddSocialIconLink = () => {
  const [open, setOpen] = useState(false);
  const [pendingType, setPendingType] = useState<SocialValue | null>(null);
  const [pendingUrl, setPendingUrl] = useState('');

  const { control } = useFormContext<{ socialLinks: SocialLink[] }>();
  const { fields, update } = useFieldArray({ control, name: 'socialLinks' });
  const socialLinks = useWatch({ control, name: 'socialLinks' });

  const activePlatformTypes = new Set(
    socialLinks.filter((l) => l.url.trim() !== '').map((l) => l.type),
  );

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

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) handleCancel();
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Plus size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" sideOffset={4}>
        {pendingType ? (
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
          <MenuSocialIcon
            activePlatformTypes={activePlatformTypes}
            setPendingType={setPendingType}
            setPendingUrl={setPendingUrl}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
