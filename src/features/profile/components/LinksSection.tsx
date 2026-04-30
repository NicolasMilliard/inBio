import { formatUrlLabel } from '@/helpers';
import type { LensLink } from '@/schemas/inBioMetadata.schema';

import { WebsiteLink } from '@/features/profile/components';

export const LinksSection = ({ links }: { links?: LensLink[] }) => {
  if (!links || links.length === 0) return null;

  return (
    <>
      {links.map((link) => (
        <WebsiteLink
          key={link.key}
          href={link.value}
          label={formatUrlLabel(link.value)}
        />
      ))}
    </>
  );
};
