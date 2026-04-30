import type { PlatformName } from '@/constants';
import type { LensLink } from '@/schemas/inBioMetadata.schema';
import { getHostname } from './getHostname';

export type SocialLink = {
  key: string;
  platform: PlatformName;
  value: string;
};

export const formatSocialLink = (link: LensLink) => {
  return {
    key: link.key,
    platform: getHostname(link.value),
    value: link.value,
  };
};
