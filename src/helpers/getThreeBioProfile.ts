import { THREEBIO_ATTRIBUTE_KEY } from '@/constants';
import { type ThreeBioMetadata } from '@/schemas/threeBioMetadata.schema';

export const getThreeBioProfile = (
  attributes: { key: string; value: unknown }[] | undefined,
) => {
  const rawThreeBioMetadata = attributes?.find(
    (attribute) => attribute.key === THREEBIO_ATTRIBUTE_KEY,
  )?.value;

  if (typeof rawThreeBioMetadata === 'string') {
    try {
      return (JSON.parse(rawThreeBioMetadata) as ThreeBioMetadata | undefined)
        ?.profile;
    } catch {
      return undefined;
    }
  }

  return (rawThreeBioMetadata as ThreeBioMetadata | undefined)?.profile;
};
