import { zodResolver } from '@hookform/resolvers/zod';
import { chains } from '@lens-chain/sdk/viem';
import { lensAccountOnly, StorageClient } from '@lens-chain/storage-client';
// import { uri } from '@lens-protocol/client';
// import { setAccountMetadata } from '@lens-protocol/client/actions';
// import { handleOperationWith } from '@lens-protocol/client/viem';
import {
  account as createMetadata,
  MetadataAttributeType,
} from '@lens-protocol/metadata';
import { useSessionClient } from '@lens-protocol/react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useWalletClient } from 'wagmi';
import { z } from 'zod';

import { type LensProfile } from '@/helpers';

import { SOCIAL_CONFIG } from '@/features/profile/model/social.config';

import { Button } from '@/components/ui';
import { EditableIdentity } from './EditableIdentity';

import { SocialLinksForm } from './SocialLinksForm';

const socialLinkSchema = z.object({
  type: z.string(),
  url: z.url().optional().or(z.literal('')),
});

const formSchema = z.object({
  avatar: z.union([z.instanceof(File), z.url(), z.literal('')]).optional(),
  name: z.string(),
  bio: z.string().optional(),
  socialLinks: z.array(socialLinkSchema),
});

type FormValues = z.infer<typeof formSchema>;

export const EditProfileForm = ({ profile }: { profile: LensProfile }) => {
  const { avatar, name, bio } = profile;

  const { data: sessionClient } = useSessionClient();
  const { data: walletClient } = useWalletClient();
  // const { data: authenticatedUser } = useAuthenticatedUser();
  // const { data: account } = useAccount({
  //   address: authenticatedUser?.address ?? '',
  // });

  const storageClient = StorageClient.create();
  const acl = lensAccountOnly(profile.address, chains.mainnet.id);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: avatar ?? '',
      name: name ?? '',
      bio: bio ?? '',
      socialLinks: Object.keys(SOCIAL_CONFIG).map((key) => ({
        type: key,
        url: '',
      })),
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log('values', values);
    if (!sessionClient || !walletClient) return;

    // 1. Liens remplis par l'utilisateur
    const validLinks = values.socialLinks.filter(
      (l): l is { type: string; url: string } => !!l.url?.trim(),
    );

    // 2. Attributs existants NON-links (website, location, etc.) qu'on conserve
    const nonLinkAttributes = profile?.attributes ?? [];

    // 3. Nouveaux attributs links (seuls les valides = suppression implicite des vides)
    const linkAttributes: Array<{
      key: string;
      type: MetadataAttributeType.STRING;
      value: string;
    }> = validLinks.map((l) => ({
      key: `links.${l.type}`,
      type: MetadataAttributeType.STRING,
      value: l.url.trim(),
    }));

    // 4. Fusion — peut être vide si l'utilisateur a tout supprimé
    const allAttributes = [...nonLinkAttributes, ...linkAttributes];

    // 5. `attributes` est omis si vide, car le builder exige NonEmptyArray
    const data = createMetadata({
      name: values.name || profile.name || undefined,
      bio: values.bio || profile.bio || undefined,
      ...(allAttributes.length > 0 && { attributes: allAttributes }),
    });

    console.log(JSON.stringify(data, null, 2));

    // const response = await storageClient.uploadAsJson(data, { acl });
    // console.log('response', response);

    // const result = await setAccountMetadata(sessionClient, {
    //   metadataUri: uri(response.uri),
    // }).andThen(handleOperationWith(walletClient));
    // console.log(result);
  };

  useEffect(() => {
    if (!profile) return;

    const existingLinks =
      profile.attributes
        ?.filter((attr) => attr.key.startsWith('links.'))
        .map((attr) => ({
          type: attr.key.replace('links.', ''),
          url: attr.value,
        })) ?? [];

    const defaultValues = Object.keys(SOCIAL_CONFIG).map((key) => {
      const existing = existingLinks.find((l) => l.type === key);
      return {
        type: key,
        url: existing?.url ?? '',
      };
    });

    methods.reset({ socialLinks: defaultValues });
  }, [profile, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <EditableIdentity profile={profile} />
        <SocialLinksForm />
        <Button type="submit" className="col-span-2">
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
