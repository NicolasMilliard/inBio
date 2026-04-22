import { type MetadataAttribute } from '@lens-protocol/metadata';
import { type Account } from '@lens-protocol/react';

export type SocialLink = {
  type: string;
  key: string;
  value: string;
};

export type LensProfile = {
  handle: string;
  banner?: string | null;
  avatar?: string;
  name?: string | null;
  bio?: string | null;
  address: `0x${string}`;
  website?: string;
  attributes?: MetadataAttribute[];
  socialLinks?: SocialLink[];
};

export const formatLensProfile = (account: Account): LensProfile => {
  const attributes = account.metadata?.attributes ?? [];
  const website = attributes.find((a) => a.key === 'website')?.value;

  return {
    handle: account.username?.value,
    banner: account.metadata?.coverPicture as string | undefined,
    avatar: account.metadata?.picture as string | undefined,
    name: account.metadata?.name,
    bio: account.metadata?.bio,
    address: account.address,
    website,
    attributes: attributes.filter(
      (a) => a.key !== 'website' && !a.key.startsWith('links.'),
    ),
    socialLinks: attributes
      // replace links by socialLinks
      .filter((a) => a.key.startsWith('links.'))
      .map((a) => ({
        type: a.key.slice('links.'.length),
        key: a.key,
        value: a.value,
      })),
  };
};
