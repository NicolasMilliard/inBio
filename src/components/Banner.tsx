// For now, banner is equal to coverPicture. Later, it will be the fallback value

export const Banner = ({ banner }: { banner?: string }) => {
  return (
    <>
      {banner && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center blur-2xl brightness-85 saturate-130"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}
      <div className="fixed inset-0 z-1 bg-slate-100/60" />
    </>
  );
};
