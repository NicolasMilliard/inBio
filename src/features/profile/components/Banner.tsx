// For now, banner is equal to coverPicture. Later, it will be the fallback value

export const Banner = ({ banner }: { banner?: string | null }) => {
  return (
    <>
      {banner && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur brightness-85 saturate-130"
            style={{ backgroundImage: `url(${banner})` }}
          />
        </div>
      )}
      <div className="bg-muted/18 fixed inset-0 z-1 sm:hidden" />
    </>
  );
};
