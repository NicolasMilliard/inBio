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
import {
  useAccount,
  useAuthenticatedUser,
  useSessionClient,
} from '@lens-protocol/react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useWalletClient } from 'wagmi';
import { z } from 'zod';

import { SOCIAL_CONFIG } from '@/features/profile/model/social.config';

import { Button } from '@/components/ui';

import { SocialLinksForm } from './SocialLinksForm';

const socialLinkSchema = z.object({
  type: z.string(),
  url: z.url().optional().or(z.literal('')),
});

const formSchema = z.object({
  links: z.array(socialLinkSchema),
});

type FormValues = z.infer<typeof formSchema>;

export const EditProfileForm = () => {
  const { data: sessionClient } = useSessionClient();
  const { data: walletClient } = useWalletClient();
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { data: account } = useAccount({
    address: authenticatedUser?.address ?? '',
  });

  const storageClient = StorageClient.create();
  const acl = lensAccountOnly(account?.address, chains.mainnet.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: Object.keys(SOCIAL_CONFIG).map((key) => ({ type: key, url: '' })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const onSubmit = async (values: FormValues) => {
    if (!sessionClient || !walletClient || !account) return;

    // 1. Liens remplis par l'utilisateur
    const validLinks = values.links.filter(
      (l): l is { type: string; url: string } => !!l.url?.trim(),
    );

    // 2. Attributs existants NON-links (website, location, etc.) qu'on conserve
    const nonLinkAttributes =
      account.metadata?.attributes
        ?.filter((attr) => !attr.key.startsWith('links.'))
        .map((attr) => ({
          key: attr.key,
          type: attr.type,
          value: attr.value,
        })) ?? [];

    // 3. Nouveaux attributs links (seuls les valides = suppression implicite des vides)
    const linkAttributes = validLinks.map((l) => ({
      key: `links.${l.type}`,
      type: MetadataAttributeType.STRING,
      value: l.url.trim(),
    }));

    // 4. Fusion — peut être vide si l'utilisateur a tout supprimé
    const allAttributes = [...nonLinkAttributes, ...linkAttributes];

    // 5. `attributes` est omis si vide, car le builder exige NonEmptyArray
    const data = createMetadata({
      name: account.metadata?.name ?? 'inBio',
      bio: account.metadata?.bio ?? undefined,
      ...(allAttributes.length > 0 && { attributes: allAttributes }),
    });

    console.log(JSON.stringify(data, null, 2));

    const response = await storageClient.uploadAsJson(data, { acl });
    // console.log('response', response);

    const result = await setAccountMetadata(sessionClient, {
      metadataUri: uri(response.uri),
    }).andThen(handleOperationWith(walletClient));
    console.log(result);
  };

  useEffect(() => {
    if (!account) return;

    const existingLinks =
      account.metadata?.attributes
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

    form.reset({ links: defaultValues });
  }, [account, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <SocialLinksForm />
      {/* {fields.map((field, index) => {
        const config = SOCIAL_CONFIG[field.type as SocialType];

        return (
          <div key={field.id} className="flex items-center gap-2">
            <InputSocialLink
              label={config.label}
              placeholer={config.placeholder}
              icon={config.icon('size-6')}
              {...form.register(`links.${index}.url`)}
            />

            <button
              type="button"
              onClick={() => form.setValue(`links.${index}.url`, '')}
              className="text-red-500 transition hover:text-red-700"
            >
              -
            </button>
          </div>
        );
      })} */}
      <Button type="submit" className="col-span-2">
        Save
      </Button>
    </form>
  );
};
