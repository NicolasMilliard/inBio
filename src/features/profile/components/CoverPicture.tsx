import type { ThreeBioProfile } from '@/schemas/threeBioMetadata.schema';

export const CoverPicture = ({
  coverPicture,
}: {
  coverPicture: ThreeBioProfile['coverPicture'] | null;
}) => {
  return (
    <>
      {coverPicture && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur brightness-95 saturate-130"
            style={{ backgroundImage: `url(${coverPicture})` }}
          />
        </div>
      )}
    </>
  );
};
