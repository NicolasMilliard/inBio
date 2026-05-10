import {
  useLogin,
  type AccountAvailable,
  type EvmAddress,
} from '@lens-protocol/react';
import { signMessageWith } from '@lens-protocol/react/viem';
import { getWalletClient } from '@wagmi/core';
import { useConfig, useConnection } from 'wagmi';

export const useLensLogin = () => {
  const config = useConfig();
  const { address, connector } = useConnection();
  const { execute: login } = useLogin();

  return async (item: AccountAvailable) => {
    if (!address || !connector) return;

    const signer = await getWalletClient(config, {
      account: address,
      connector,
    });

    const ownerOrManager = signer?.account?.address ?? (address as EvmAddress);
    if (!ownerOrManager) return;

    const payload =
      item.__typename === 'AccountManaged'
        ? {
            accountManager: {
              account: item.account.address as EvmAddress,
              manager: ownerOrManager as EvmAddress,
            },
          }
        : {
            accountOwner: {
              account: item.account.address as EvmAddress,
              owner: ownerOrManager as EvmAddress,
            },
          };

    return login({
      ...payload,
      signMessage: signMessageWith(signer),
    });
  };
};
