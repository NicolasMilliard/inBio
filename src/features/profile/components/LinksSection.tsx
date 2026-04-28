import { formatUrlLabel, type LensProfile } from '@/helpers';

import { WebsiteLink } from '@/features/profile/components';

export const LinksSection = ({ links }: { links: LensProfile['links'] }) => (
  <>
    {links?.map((link) => (
      <WebsiteLink key={link} href={link} label={formatUrlLabel(link)} />
    ))}
  </>
);
