import { useAuthenticatedUser } from '@lens-protocol/react';
import { useConnection } from 'wagmi';

import { AuthScreen, ProfileSelectionScreen } from '@/features/auth/components';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const connection = useConnection();
  const { data: authenticatedUser } = useAuthenticatedUser();

  if (!connection.isConnected) {
    return <AuthScreen />;
  }

  if (!authenticatedUser) {
    return <ProfileSelectionScreen />;
  }

  return <>{children}</>;
};
