import { formatUrlLabel } from '@/helpers';
import type { LensLink } from '@/schemas/inBioMetadata.schema';

import { LinkButton } from '@/features/profile/components';

export const LinksSection = ({ links }: { links?: LensLink[] }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="animate-[blurFadeIn_0.4s_ease-out_0.75s_both]">
      {links.map((link) => (
        <LinkButton
          key={link.key}
          href={link.value}
          label={formatUrlLabel(link.value)}
        />
      ))}
    </div>
  );
};
