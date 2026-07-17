import { useSessionBinding } from '@/features/auth/hooks';
import { useSessionReconciliation } from '@/providers/authSessionContext';

import { SpinnerScreen } from '@/components/ui';
import { AuthScreen } from './AuthScreen';
import { ProfileSelectionScreen } from './ProfileSelectionScreen';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSessionBinding();
  const reconciliationState = useSessionReconciliation();

  if (state === 'pending') {
    return <SpinnerScreen text="Restoring your session..." />;
  }

  if (state === 'wallet-disconnected') return <AuthScreen />;

  if (state === 'session-missing') return <ProfileSelectionScreen />;

  if (state === 'mismatch') {
    if (reconciliationState === 'failed') {
      return (
        <ProfileSelectionScreen notice="Your wallet changed. Choose a Lens profile managed by the connected wallet." />
      );
    }

    return <SpinnerScreen text="Updating your wallet session..." />;
  }

  return <>{children}</>;
};
