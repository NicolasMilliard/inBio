import { createContext, useContext } from 'react';

export type SessionReconciliationState = 'idle' | 'clearing' | 'failed';

export const AuthSessionContext =
  createContext<SessionReconciliationState | null>(null);

export const useSessionReconciliation = () => {
  const context = useContext(AuthSessionContext);

  if (context === null) {
    throw new Error(
      'useSessionReconciliation must be used within an AuthProvider',
    );
  }

  return context;
};
