import { cn } from '@/lib/utils';
import { useFormContext, useWatch } from 'react-hook-form';
import { type MetadataFormValues } from '../schemas/metadataForm.schema';

export const CoverPictureSection = () => {
  const { control } = useFormContext<MetadataFormValues>();
  const coverPicture = useWatch({ control, name: 'coverPicture.preview' });

  const hasCoverPicture = !!coverPicture;

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 scale-110 bg-cover bg-center blur brightness-85 saturate-130',
            hasCoverPicture ? 'bg-none' : 'bg-background',
          )}
          style={
            hasCoverPicture
              ? { backgroundImage: `url(${coverPicture})` }
              : undefined
          }
        />
        {!hasCoverPicture && (
          <div className="absolute inset-0 bg-[radial-gradient(#ebeafa_1px,#fdfdfd_1px)] bg-size-[20px_20px]" />
        )}
      </div>
      <div className="bg-muted/18 fixed inset-0 z-1 sm:hidden" />
    </>
  );
};
