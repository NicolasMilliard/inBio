import { type PlatformName, SOCIAL_MAP } from '@/constants';
import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/components/ui';
import { Trash2 } from 'lucide-react';

export const EditableSocialLinks = () => {
  const { control } = useFormContext<MetadataFormValues>();
  const socialLinks = useWatch({ control, name: 'socialLinks' });

  if (!socialLinks?.length) return null;

  return (
    <div className="flex max-w-prose flex-wrap items-center">
      {socialLinks.map((link, index) => {
        if (!link.url) return null;

        const platformName = link.platform as PlatformName;
        const platform = SOCIAL_MAP[platformName];

        if (!platform) return null;

        return (
          <EditableSocialLink
            key={link.platform}
            index={index}
            platform={platformName}
            currentUrl={link.url}
            label={platform.label}
            icon={<platform.Icon className="size-6" />}
          />
        );
      })}
    </div>
  );
};

type EditableSocialLinkProps = {
  index: number;
  platform: PlatformName;
  currentUrl: string;
  label: string;
  icon: React.ReactNode;
};

const EditableSocialLink = ({
  index,
  platform,
  currentUrl,
  label,
  icon,
}: EditableSocialLinkProps) => {
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setValue } = useFormContext<MetadataFormValues>();

  const closeDialog = () => {
    setOpen(false);
    setDraftUrl('');
    setError(null);
  };

  const handleSave = () => {
    const normalizedUrl = draftUrl.trim();

    if (!SOCIAL_MAP[platform].validateUrl(normalizedUrl)) {
      setError(`Please enter a valid ${label} URL.`);
      return;
    }

    setValue(`socialLinks.${index}.url`, normalizedUrl, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    closeDialog();
  };

  const handleRemove = () => {
    setValue(`socialLinks.${index}.url`, '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setDraftUrl(currentUrl);
          setError(null);
          setOpen(true);
          return;
        }

        closeDialog();
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-primary cursor-pointer transition will-change-transform hover:bg-transparent active:scale-[0.98] active:shadow-inner"
        >
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your {label} link:</DialogTitle>

          <DialogDescription>
            Changes are saved locally. Submit the profile form to publish them.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="url"
          placeholder={`Enter your ${label} URL`}
          value={draftUrl}
          onChange={(event) => {
            setDraftUrl(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSave();
            }
          }}
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        <DialogFooter>
          <Button type="button" variant="destructive" onClick={handleRemove}>
            <Trash2 />
            Remove
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!draftUrl.trim()}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
