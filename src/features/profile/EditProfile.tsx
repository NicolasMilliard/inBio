import { useAccount, useAuthenticatedUser } from '@lens-protocol/react';

import { AuthButton } from '../auth/components/AuthButton';

import { StorageClient } from '@lens-chain/storage-client';

import { chains } from '@lens-chain/sdk/viem';
import { lensAccountOnly } from '@lens-chain/storage-client';

// import { uri } from '@lens-protocol/client';
// import { setAccountMetadata } from '@lens-protocol/client/actions';
// import { handleOperationWith } from '@lens-protocol/client/viem';
// import {
//   account as createMetadata,
//   MetadataAttributeType,
// } from '@lens-protocol/metadata';

import { useSessionClient } from '@lens-protocol/react';
import { useWalletClient } from 'wagmi';

const EditProfile = () => {
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { data: account } = useAccount({
    address: authenticatedUser?.address ?? '',
  });

  const storageClient = StorageClient.create();

  console.log('account', account);

  const acl = lensAccountOnly(account?.address, chains.mainnet.id);

  // const data = createMetadata({
  //   name: account?.metadata?.name ?? 'inBio',
  //   bio: account?.metadata?.bio ?? undefined,
  //   picture: account?.metadata?.picture ?? undefined,
  //   coverPicture: account?.metadata?.coverPicture ?? undefined,

  //   attributes: [
  //     ...(account?.metadata?.attributes ?? []),
  //     {
  //       key: 'links.github',
  //       type: MetadataAttributeType.STRING,
  //       value: 'https://github.com/nicolasmilliard',
  //     },
  //   ],
  // });

  // console.log(JSON.stringify(data, null, 2));

  // ✅ AJOUT ICI
  const { data: sessionClient } = useSessionClient();
  const { data: walletClient } = useWalletClient();

  console.log('sessionClient', sessionClient);
  console.log('walletClient', walletClient);

  async function uploadJson() {
    // const response = await storageClient.uploadAsJson(data, { acl });
    // console.log('response', response);
    // if (!sessionClient || !walletClient) {
    //   console.error('Session client or wallet client not available');
    //   return;
    // }
    // const result = await setAccountMetadata(sessionClient, {
    //   metadataUri: uri(response.uri),
    // }).andThen(handleOperationWith(walletClient));
    // console.log(result);
  }

  return (
    <div className="flex h-screen w-screen flex-1 flex-col items-center justify-center gap-6">
      <div>
        <AuthButton />
      </div>

      <div>
        <p>My profile :</p>
        <p>Name: {account?.metadata?.name ?? 'N/A'}</p>
        <p>
          Links:{' '}
          {account?.metadata?.attributes?.find((a) => a.key === 'links.github')
            ?.value ?? 'N/A'}
        </p>
      </div>

      <div>
        <button
          onClick={uploadJson}
          className="cursor-pointer rounded bg-slate-800 p-2 text-slate-50 hover:bg-slate-950"
        >
          Upload JSON
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
