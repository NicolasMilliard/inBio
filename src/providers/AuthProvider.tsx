import { client } from '@/lib';
import { useAuthenticatedUser } from '@lens-protocol/react';
import { useEffect, useRef, useState } from 'react';

/*
 * Silently resumes a Lens session from localStorage on mount.
 * No wallet signature is ever triggered here: that only happens
 * when the user explicitly picks a profile in AuthButton.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: authenticatedUser, loading } = useAuthenticatedUser();

  const [resumeAttempted, setResumeAttempted] = useState(false);
  const resumingRef = useRef(false);

  useEffect(() => {
    // Only attempt once, and only if not already authenticated
    if (resumeAttempted || resumingRef.current) return;
    if (loading) return; // wait for the SDK to finish its own hydration check

    // If the SDK already picked up the session (e.g. from its internal storage
    // layer), there's nothing to do.
    if (authenticatedUser) {
      setResumeAttempted(true);
      return;
    }

    // No active session in SDK memory: try to resume from localStorage tokens
    const tryResume = async () => {
      resumingRef.current = true;
      try {
        const resumed = await client.resumeSession();
        if (resumed.isErr()) {
          // Tokens expired or missing: user must log in again manually
          console.info(
            '[AuthProvider] No valid session to resume:',
            resumed.error,
          );
        }
        // On success, the SDK internally updates its state and
        // useAuthenticatedUser / useSessionClient will reflect the session.
      } catch (error) {
        console.error('[AuthProvider] resumeSession threw:', error);
      } finally {
        resumingRef.current = false;
        setResumeAttempted(true);
      }
    };

    tryResume();
  }, [loading, authenticatedUser, resumeAttempted]);

  return <>{children}</>;
};
