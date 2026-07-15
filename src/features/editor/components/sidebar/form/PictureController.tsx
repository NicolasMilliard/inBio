import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FieldSet,
  Image,
  Label,
  Text,
} from '@/components/ui';
import { ImageIcon } from 'lucide-react';

type PictureControllerProps = {
  formValue: 'coverPicture' | 'avatar';
  label: string;
  description?: string;
};

export const PictureController = ({
  formValue,
  label,
  description,
}: PictureControllerProps) => {
  const { setValue, watch } = useFormContext<MetadataFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);
  const currentPicture = watch(`${formValue}.preview`);
  const normalizedLabel = label.toLowerCase();
  const inputId = `${formValue}-image`;

  useEffect(
    () => () => {
      if (currentPicture?.startsWith('blob:')) {
        URL.revokeObjectURL(currentPicture);
      }
    },
    [currentPicture],
  );

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

  const removePicture = () => {
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
          <FieldSet className="gap-2">
            <Label htmlFor={inputId}>{label}</Label>
            <div className="bg-input/50 flex items-center gap-4 rounded-3xl px-3 py-1">
              {currentPicture ? (
                <Image
                  src={currentPicture}
                  className={cn(
                    formValue === 'avatar'
                      ? 'size-6 rounded-full'
                      : 'h-6 w-auto rounded-md',
                  )}
                />
              ) : (
                <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                  <ImageIcon />
                </div>
              )}
              <Text className="text-sm">{label}</Text>
            </div>
            {description && (
              <Text className="text-muted-foreground text-xs leading-snug">
                {description}
              </Text>
            )}
          </FieldSet>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={openFilePicker}>
            Change {normalizedLabel}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={removePicture}>
            Remove {normalizedLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </>
  );
};
