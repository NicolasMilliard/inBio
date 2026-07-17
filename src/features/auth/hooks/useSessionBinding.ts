import { useAuthenticatedUser } from '@lens-protocol/react';
import { useConnection } from 'wagmi';
import { resolveSessionBinding } from '../sessionBinding';

export const useSessionBinding = () => {
  const connection = useConnection();
  const authenticatedUser = useAuthenticatedUser();

  const state = resolveSessionBinding({
    walletStatus: connection.status,
    walletAddress: connection.address,
    lensLoading: authenticatedUser.loading,
    session: authenticatedUser.data,
  });

  return {
    state,
    authenticatedUser: authenticatedUser.data,
    walletAddress: connection.address,
  };
};
