import { useEditorContext } from '@/features/editor/context/editor.context';
import type { MetadataFormValues } from '@/features/editor/schemas/metadataForm.schema';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Image,
} from '@/components/ui';
import { ImageIcon } from 'lucide-react';

export const CoverPictureControl = () => {
  const { inBioMetadata } = useEditorContext();
  const coverPicturePath = inBioMetadata.profile?.coverPicture;

  const { setValue, watch } = useFormContext<MetadataFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);
  const watchedPreview = watch('coverPicture.preview');

  const currentCoverPicture =
    watchedPreview === undefined ? coverPicturePath : watchedPreview;

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const previewURL = URL.createObjectURL(selectedFile);

    setValue(
      'coverPicture',
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
      'coverPicture',
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
          <Button variant="ghost" className="w-fit gap-4">
            {currentCoverPicture ? (
              <Image
                src={currentCoverPicture}
                className="h-6 w-auto rounded-md"
              />
            ) : (
              <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                <ImageIcon />
              </div>
            )}
            Background image
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={openFilePicker}>
            Change background image
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={removeCoverPicture}>
            Remove background image
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
