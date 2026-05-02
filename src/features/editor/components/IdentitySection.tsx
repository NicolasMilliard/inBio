import type { InBioProfile } from '@/schemas/inBioMetadata.schema';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { MetadataFormValues } from '../schemas/metadataForm.schema';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Textarea,
} from '@/components/ui';

export const IdentitySection = ({
  lensHandle,
  profile,
}: {
  lensHandle?: string;
  profile: InBioProfile;
}) => {
  const { avatar, name, bio } = profile;

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<MetadataFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(avatar ?? null);
  const displayAvatar = preview ?? avatar ?? '';

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);

    setValue('avatar.file', selectedFile, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <button
        type="button"
        onClick={openFilePicker}
        className="cursor-pointer rounded-full transition hover:opacity-60 focus:ring-2 focus:outline-none"
      >
        <Avatar size="xl">
          <AvatarImage src={displayAvatar} alt={name ?? lensHandle} />
          <AvatarFallback>
            {name
              ? name[0].toUpperCase()
              : lensHandle
                ? lensHandle[0].toUpperCase()
                : 'U'}
          </AvatarFallback>
        </Avatar>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="flex animate-[fadeUp_0.3s_ease_0.15s_both] flex-col items-center">
        <Input
          {...register('name')}
          placeholder={name ?? 'Your name'}
          className="hover:bg-accent/30 w-fit cursor-pointer bg-transparent text-center text-[1.375rem] leading-tight font-bold"
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
        <Textarea
          {...register('bio')}
          rows={1}
          defaultValue={bio ?? undefined}
          className="hover:bg-accent/30 placeholder:text-muted-foreground focus:border-secondary mt-2 w-fit max-w-prose cursor-pointer resize-none overflow-hidden rounded-md bg-transparent text-center leading-relaxed tracking-tight focus:ring-0"
          placeholder="Write something about yourself in your bio to let people know more about you."
        />
        {errors.bio && (
          <p className="text-destructive text-xs">{errors.bio.message}</p>
        )}
      </div>
    </div>
  );
};
