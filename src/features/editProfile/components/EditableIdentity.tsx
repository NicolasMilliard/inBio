import type { LensProfile } from '@/helpers';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

type IdentityFormValues = {
  avatar?: File;
  name: string;
  bio?: string;
};

export const EditableIdentity = ({ profile }: { profile: LensProfile }) => {
  const { avatar, name, handle, bio } = profile;

  const { setValue } = useFormContext<IdentityFormValues>();
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

    setValue('avatar', selectedFile, {
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
          <AvatarImage src={displayAvatar} alt={name ?? handle} />
          <AvatarFallback>
            {name
              ? name[0].toUpperCase()
              : handle
                ? handle[0].toUpperCase()
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
        {name && (
          <h1 className="text-[1.375rem] leading-tight font-bold">{name}</h1>
        )}
        {bio && (
          <p className="mt-2 max-w-prose leading-relaxed tracking-tight">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
};
