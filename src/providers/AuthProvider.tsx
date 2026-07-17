import { useSessionBinding } from '@/features/auth/hooks/useSessionBinding';
import { useLogout } from '@lens-protocol/react';
import { useEffect, useRef, useState } from 'react';
import { AuthSessionContext } from './authSessionContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, authenticatedUser, walletAddress } = useSessionBinding();
  const { execute: logout } = useLogout();
  const attemptedMismatchRef = useRef<string | null>(null);
  const [failedMismatchKey, setFailedMismatchKey] = useState<string | null>(
    null,
  );

  const mismatchKey =
    state === 'mismatch' && authenticatedUser
      ? `${authenticatedUser.authenticationId}:${walletAddress?.toLowerCase()}`
      : null;

  useEffect(() => {
    if (!mismatchKey) {
      attemptedMismatchRef.current = null;
      return;
    }

    if (attemptedMismatchRef.current === mismatchKey) return;

    attemptedMismatchRef.current = mismatchKey;

    const clearMismatchedSession = async () => {
      try {
        const result = await logout();

        if (result.isErr()) {
          console.error(
            '[AuthProvider] Failed to clear mismatched Lens session:',
            result.error,
          );
          setFailedMismatchKey(mismatchKey);
          return;
        }
      } catch (error) {
        console.error(
          '[AuthProvider] Clearing mismatched Lens session threw:',
          error,
        );
        setFailedMismatchKey(mismatchKey);
      }
    };

    void clearMismatchedSession();
  }, [logout, mismatchKey]);

  const reconciliationState = mismatchKey
    ? failedMismatchKey === mismatchKey
      ? 'failed'
      : 'clearing'
    : 'idle';

  return (
    <AuthSessionContext.Provider value={reconciliationState}>
      {children}
    </AuthSessionContext.Provider>
  );
};
