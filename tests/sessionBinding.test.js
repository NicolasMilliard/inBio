import { expect, test } from 'bun:test';

import {
  isLensSessionBoundToWallet,
  resolveAccountSessionBinding,
  resolveSessionBinding,
  sameEvmAddress,
} from '../src/features/auth/sessionBinding.ts';

const WALLET = '0x52908400098527886E0F7030069857D2E4169EE7';
const SAME_WALLET_LOWERCASE = WALLET.toLowerCase();
const OTHER_WALLET = '0xde709f2102306220921060314715629080e2fb77';

const accountOwnerSession = {
  signer: WALLET,
  role: 'ACCOUNT_OWNER',
};

const ACCOUNT = '0x5A384227B65FA093DEC03Ec34e111Db80A040615';

test('compares valid EVM addresses case-insensitively', () => {
  expect(sameEvmAddress(WALLET, SAME_WALLET_LOWERCASE)).toBe(true);
  expect(sameEvmAddress(WALLET, OTHER_WALLET)).toBe(false);
  expect(sameEvmAddress(WALLET, 'not-an-address')).toBe(false);
});

test('binds owner and manager sessions to their signing wallet', () => {
  expect(
    isLensSessionBoundToWallet(accountOwnerSession, SAME_WALLET_LOWERCASE),
  ).toBe(true);
  expect(
    isLensSessionBoundToWallet(
      { signer: WALLET, role: 'ACCOUNT_MANAGER' },
      SAME_WALLET_LOWERCASE,
    ),
  ).toBe(true);
});

test('rejects another wallet and non-account Lens roles', () => {
  expect(
    isLensSessionBoundToWallet(accountOwnerSession, OTHER_WALLET),
  ).toBe(false);
  expect(
    isLensSessionBoundToWallet(
      { signer: WALLET, role: 'ONBOARDING_USER' },
      WALLET,
    ),
  ).toBe(false);
});

test('waits through wallet and Lens hydration', () => {
  expect(
    resolveSessionBinding({
      walletStatus: 'reconnecting',
      lensLoading: false,
      session: accountOwnerSession,
    }),
  ).toBe('pending');
  expect(
    resolveSessionBinding({
      walletStatus: 'connected',
      walletAddress: WALLET,
      lensLoading: true,
      session: accountOwnerSession,
    }),
  ).toBe('pending');
});

test('requires both a connected wallet and a matching Lens session', () => {
  expect(
    resolveSessionBinding({
      walletStatus: 'disconnected',
      lensLoading: false,
      session: accountOwnerSession,
    }),
  ).toBe('wallet-disconnected');
  expect(
    resolveSessionBinding({
      walletStatus: 'connected',
      walletAddress: WALLET,
      lensLoading: false,
    }),
  ).toBe('session-missing');
  expect(
    resolveSessionBinding({
      walletStatus: 'connected',
      walletAddress: WALLET,
      lensLoading: false,
      session: accountOwnerSession,
    }),
  ).toBe('bound');
  expect(
    resolveSessionBinding({
      walletStatus: 'connected',
      walletAddress: OTHER_WALLET,
      lensLoading: false,
      session: accountOwnerSession,
    }),
  ).toBe('mismatch');
});

test('binds an editor session to both its wallet and Lens account', () => {
  const session = { ...accountOwnerSession, address: ACCOUNT };

  expect(
    resolveAccountSessionBinding({
      walletStatus: 'connected',
      walletAddress: WALLET,
      lensLoading: false,
      session,
      accountAddress: ACCOUNT.toLowerCase(),
    }),
  ).toBe('bound');

  expect(
    resolveAccountSessionBinding({
      walletStatus: 'connected',
      walletAddress: WALLET,
      lensLoading: false,
      session,
      accountAddress: OTHER_WALLET,
    }),
  ).toBe('account-mismatch');
});
