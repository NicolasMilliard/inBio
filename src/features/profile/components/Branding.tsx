export const Branding = () => {
  return (
    <p className="text-foreground mt-auto animate-[blurFadeIn_0.4s_ease-out_0.90s_both] pt-2 text-center text-xs">
      Powered by{' '}
      <a
        href="https://3bio.social"
        className="text-foreground font-bold hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        3Bio
      </a>{' '}
      · built on Lens
    </p>
  );
};
