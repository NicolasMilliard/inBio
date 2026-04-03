import { useAccount, type Account } from '@lens-protocol/react';

const mapAccountData = (account: Account) => {
  const attributes = account.metadata?.attributes ?? [];
  const website = attributes.find((a) => a.key === 'website')?.value;

  return {
    avatar: account.metadata?.picture as string | undefined,
    banner: account.metadata?.coverPicture as string | undefined,
    name: account.metadata?.name,
    bio: account.metadata?.bio,
    handle: account.username?.value,
    address: account.address,
    website,
  };
};

export const useLensAccount = (handleLens: string) => {
  const query = useAccount({ username: { localName: handleLens } });

  return {
    ...query,
    data: query.data ? mapAccountData(query.data) : null,
  };
};
