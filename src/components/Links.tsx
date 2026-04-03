import { LinkButton, type LinkButtonProps } from './LinkButton';

export const Links = ({ links }: { links: LinkButtonProps[] }) => {
  return (
    <>
      {links.length > 0 && (
        <div className="mb-5 flex w-full max-w-85 animate-[fadeUp_0.4s_ease_0.25s_both] flex-col gap-2.5">
          {links.map((link, i) => (
            <LinkButton key={i} {...link} />
          ))}
        </div>
      )}
    </>
  );
};
