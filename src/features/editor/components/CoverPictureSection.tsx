import { useFormContext, useWatch } from 'react-hook-form';
import { type MetadataFormValues } from '../schemas/metadataForm.schema';

export const CoverPictureSection = () => {
  const { control } = useFormContext<MetadataFormValues>();
  const coverPicture = useWatch({ control, name: 'coverPicture.preview' });

  return (
    <>
      {coverPicture && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur brightness-85 saturate-130"
            style={{ backgroundImage: `url(${coverPicture})` }}
          />
        </div>
      )}
      <div className="bg-muted/18 fixed inset-0 z-1 sm:hidden" />
    </>
  );
};
