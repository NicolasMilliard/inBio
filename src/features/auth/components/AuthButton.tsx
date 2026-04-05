import { useState } from 'react';
import { useConnect, useConnection, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import {
  useAccount,
  useAccountsAvailable,
  useAuthenticatedUser,
} from '@lens-protocol/react';

import { useLensLogin } from '../hooks/useLensLogin';

export const AuthButton = () => {
  const connect = useConnect();
  const connection = useConnection();
  const disconnect = useDisconnect();

  const loginWithLens = useLensLogin();

  const { data: accounts } = useAccountsAvailable({
    managedBy: connection.address,
  });

  const { data: authenticatedUser } = useAuthenticatedUser();

  const { data: account } = useAccount({
    address: authenticatedUser?.address ?? '',
  });

  const [open, setOpen] = useState(false);

  if (!connection.isConnected) {
    return (
      <button
        disabled={connect.isPending}
        onClick={() => connect.mutate({ connector: injected() })}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {connect.isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  const activeAddress = authenticatedUser?.address?.toLowerCase();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
          {account?.metadata?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>

        <span className="max-w-30 truncate text-slate-800">
          {!accounts?.items.length && <p>Aucun compte Lens trouvé</p>}
        </span>

        <span className="text-xs text-slate-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="px-2 py-1 text-xs text-slate-400">Lens profiles</div>

          {/* 👤 Accounts */}
          <div className="flex flex-col gap-1">
            {!accounts?.items.length && (
              <div className="px-2 py-2 text-sm text-slate-500">
                Aucun compte
              </div>
            )}

            {accounts?.items.map((item) => {
              const isActive =
                activeAddress === item.account.address.toLowerCase();

              return (
                <button
                  key={item.account.address}
                  onClick={() => {
                    loginWithLens(item);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition ${
                    isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600">
                    {item.account.username?.value?.[0]?.toUpperCase() ?? 'U'}
                  </div>

                  <span className="truncate">
                    {item.account.username?.value ??
                      item.account.address.slice(0, 6) + '...'}
                  </span>

                  {isActive && (
                    <span className="ml-auto text-xs text-slate-400">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-2 h-px bg-slate-200" />

          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                disconnect.mutate();
                setOpen(false);
              }}
              className="w-full rounded-lg px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
            >
              Disconnect wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
