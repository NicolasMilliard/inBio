import { useAccount, type Account } from '@lens-protocol/react';

export type LensProfile = {
  handle?: string;
  banner?: string;
  avatar?: string;
  name?: string | null;
  bio?: string | null;
  address?: string;
  website?: string;
  socialLinks?: Array<{
    key: string;
    type: string;
    value: string;
  }>;
};

const mapAccountData = (account: Account): LensProfile => {
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
    socialLinks: attributes
      // replace links by socialLinks
      .filter((a) => a.key.startsWith('links.'))
      .map((a) => ({
        key: a.key,
        type: a.key.split('.')[1],
        value: a.value,
      })),
  };
};

export const useLensAccount = (handleLens: string) => {
  const query = useAccount({ username: { localName: handleLens } });

  return {
    ...query,
    data: query.data ? mapAccountData(query.data) : null,
  };
};
