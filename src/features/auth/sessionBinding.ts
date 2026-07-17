import { isAddress, isAddressEqual, type Address } from 'viem';

export type SessionBindingState =
  | 'pending'
  | 'wallet-disconnected'
  | 'session-missing'
  | 'bound'
  | 'mismatch';

export type AccountSessionBindingState =
  | SessionBindingState
  | 'account-mismatch';

export type WalletConnectionStatus =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'reconnecting';

type LensSessionIdentity = {
  signer: string;
  role: string;
};

type LensAccountSessionIdentity = LensSessionIdentity & {
  address: string;
};

type ResolveSessionBindingInput = {
  walletStatus: WalletConnectionStatus;
  walletAddress?: string;
  lensLoading: boolean;
  session?: LensSessionIdentity | null;
};

type ResolveAccountSessionBindingInput = Omit<
  ResolveSessionBindingInput,
  'session'
> & {
  accountAddress?: string;
  session?: LensAccountSessionIdentity | null;
};

const ACCOUNT_SESSION_ROLES = new Set(['ACCOUNT_OWNER', 'ACCOUNT_MANAGER']);

export const sameEvmAddress = (left?: string, right?: string) => {
  if (!left || !right || !isAddress(left) || !isAddress(right)) return false;

  return isAddressEqual(left as Address, right as Address);
};

export const isLensSessionBoundToWallet = (
  session: LensSessionIdentity | null | undefined,
  walletAddress?: string,
) =>
  !!session &&
  ACCOUNT_SESSION_ROLES.has(session.role) &&
  sameEvmAddress(session.signer, walletAddress);

export const resolveSessionBinding = ({
  walletStatus,
  walletAddress,
  lensLoading,
  session,
}: ResolveSessionBindingInput): SessionBindingState => {
  if (
    lensLoading ||
    walletStatus === 'connecting' ||
    walletStatus === 'reconnecting'
  ) {
    return 'pending';
  }

  if (walletStatus !== 'connected' || !walletAddress) {
    return 'wallet-disconnected';
  }

  if (!session) return 'session-missing';

  return isLensSessionBoundToWallet(session, walletAddress)
    ? 'bound'
    : 'mismatch';
};

export const resolveAccountSessionBinding = ({
  accountAddress,
  ...input
}: ResolveAccountSessionBindingInput): AccountSessionBindingState => {
  const state = resolveSessionBinding(input);

  if (state !== 'bound') return state;

  return sameEvmAddress(input.session?.address, accountAddress)
    ? 'bound'
    : 'account-mismatch';
};
