import { type InBioMetadata } from '@/schemas/inBioMetadata.schema';
import { type Account } from '@lens-protocol/react';

function findAttribute<T extends string, V>(
  attributes: { key: string; value: unknown }[] | undefined,
  key: T,
): V | undefined {
  return attributes?.find((a) => a.key === key)?.value as V | undefined;
}

export const formatToInBioMetadata = (account: Account) => {
  const metadata = account.metadata;
  const attributes = metadata?.attributes;

  const rawInBioMetadata = findAttribute<'inBio', unknown>(attributes, 'inBio');
  const inBioMetadata: InBioMetadata | undefined =
    typeof rawInBioMetadata === 'string'
      ? JSON.parse(rawInBioMetadata)
      : rawInBioMetadata;

  const inBioProfile = inBioMetadata?.profile;
  const inBioTheme = inBioMetadata?.theme;
  const inBioSettings = inBioMetadata?.settings;

  const profile = {
    coverPicture: inBioProfile?.coverPicture ?? metadata?.coverPicture,
    avatar: inBioProfile?.avatar ?? metadata?.picture,
    name: inBioProfile?.name ?? metadata?.name,
    bio: inBioProfile?.bio ?? metadata?.bio,
    socialLinks: inBioProfile?.socialLinks,
    links: inBioProfile?.links,
  };

  return {
    profile,
    theme: inBioTheme,
    settings: inBioSettings,
  };
};
