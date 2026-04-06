export const Branding = () => {
  return (
    <p className="text-muted-foreground mt-auto animate-[fadeUp_0.4s_ease_0.35s_both] pt-2 text-center text-xs">
      Powered by{' '}
      <a
        href="https://inbio.social"
        className="text-muted-foreground hover:text-primary font-bold hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        inBio
      </a>{' '}
      · built on Lens
    </p>
  );
};
