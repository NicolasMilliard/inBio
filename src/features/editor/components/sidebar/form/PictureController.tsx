import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Image,
  Text,
} from '@/components/ui';
import { ImageIcon } from 'lucide-react';

type PictureControllerProps = {
  picturePath?: string;
  formValue: 'coverPicture' | 'avatar';
};

export const PictureController = ({
  picturePath,
  formValue,
}: PictureControllerProps) => {
  const { setValue, watch } = useFormContext<MetadataFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);
  const watchedPreview = watch(`${formValue}.preview`);

  const currentPicture =
    watchedPreview === undefined ? picturePath : watchedPreview;

  const label = formValue === 'coverPicture' ? 'background' : 'avatar';

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const previewURL = URL.createObjectURL(selectedFile);

    setValue(
      formValue,
      { file: selectedFile, preview: previewURL },
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );

    event.target.value = '';
  };

  const removeCoverPicture = () => {
    setValue(
      formValue,
      { file: undefined, preview: null },
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-input/50 flex items-center gap-4 rounded-3xl px-3 py-1">
            {currentPicture ? (
              <Image
                src={currentPicture}
                className={cn(
                  label === 'avatar'
                    ? 'size-6 rounded-full'
                    : 'h-6 w-auto rounded-md',
                )}
              />
            ) : (
              <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                <ImageIcon />
              </div>
            )}
            <Text className="text-sm first-letter:uppercase">{label}</Text>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={openFilePicker}>
            Change {label}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={removeCoverPicture}>
            Remove {label}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </>
  );
};
