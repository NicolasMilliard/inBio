import type { InBioProfile } from '@/schemas/inBioMetadata.schema';

export const CoverPicture = ({
  coverPicture,
}: {
  coverPicture: InBioProfile['coverPicture'];
}) => {
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
