import { SOCIAL_CONFIG } from '@/features/profile/model/social.config';
import { type LensProfile } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { chains } from '@lens-chain/sdk/viem';
import { lensAccountOnly, StorageClient } from '@lens-chain/storage-client';
import { uri } from '@lens-protocol/client';
import { setAccountMetadata } from '@lens-protocol/client/actions';
import { handleOperationWith } from '@lens-protocol/client/viem';
import {
  account as createMetadata,
  MetadataAttributeType,
} from '@lens-protocol/metadata';
import { useSessionClient } from '@lens-protocol/react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useWalletClient } from 'wagmi';
import { z } from 'zod';

import { Button } from '@/components/ui';
import { EditableIdentity } from './EditableIdentity';
import { SocialLinksForm } from './SocialLinksForm';

const storageClient = StorageClient.create();

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
  const { data: sessionClient } = useSessionClient();
  const { data: walletClient } = useWalletClient();

  const acl = lensAccountOnly(profile.address, chains.mainnet.id);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: profile.avatar ?? '',
      name: profile.name ?? '',
      bio: profile.bio ?? '',
      socialLinks: Object.keys(SOCIAL_CONFIG).map((key) => ({
        type: key,
        url: '',
      })),
    },
  });
  const { reset } = methods;

  useEffect(() => {
    // TODO: replace links with socialLinks
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

    reset({ socialLinks: defaultValues });
  }, [profile, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!sessionClient || !walletClient) return;

    // 1. Upload avatar if it's a new File
    const avatarUri =
      values.avatar instanceof File
        ? (await storageClient.uploadFile(values.avatar, { acl })).uri
        : values.avatar || profile.avatar;

    // 2. Handle attributes
    const linkAttributes: Array<{
      key: string;
      type: MetadataAttributeType.STRING;
      value: string;
    }> = values.socialLinks
      .filter((l): l is { type: string; url: string } => !!l.url?.trim())
      .map((l) => ({
        key: `links.${l.type}`,
        type: MetadataAttributeType.STRING,
        value: l.url.trim(),
      }));
    const allAttributes = [...(profile.attributes ?? []), ...linkAttributes];

    // 3. Create metadata object
    const data = createMetadata({
      name: values.name || profile.name || undefined,
      bio: values.bio || profile.bio || undefined,
      picture: avatarUri || undefined,
      ...(allAttributes.length > 0 && { attributes: allAttributes }),
    });

    console.log(JSON.stringify(data, null, 2));

    const { uri: metadataUri } = await storageClient.uploadAsJson(data, {
      acl,
    });
    console.log('metadataUri', metadataUri);

    const result = await setAccountMetadata(sessionClient, {
      metadataUri: uri(metadataUri),
    }).andThen(handleOperationWith(walletClient));
    console.log(result);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <EditableIdentity profile={profile} />
        <SocialLinksForm />
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
