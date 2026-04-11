import { useState } from 'react';
import { useConnect, useConnection, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import {
  useAccount,
  useAccountsAvailable,
  useAuthenticatedUser,
  useLogout,
} from '@lens-protocol/react';

import { useLensLogin } from '../hooks/useLensLogin';

import { Button } from '@/components/ui/button';

export const AuthButton = () => {
  const connect = useConnect();
  const connection = useConnection();
  const disconnect = useDisconnect();
  const { execute: lensLogout } = useLogout();

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
      <Button
        disabled={connect.isPending}
        onClick={() => connect.mutate({ connector: injected() })}
      >
        {connect.isPending ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  const activeAddress = authenticatedUser?.address?.toLowerCase();

  return (
    <div className="relative inline-block text-left">
      <Button onClick={() => setOpen((prev) => !prev)}>
        <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
          {account?.metadata?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>

        <span className="max-w-30 truncate">
          {account?.metadata?.name ??
            account?.username?.value ??
            (activeAddress
              ? `${activeAddress.slice(0, 6)}...`
              : 'No profile selected')}
        </span>

        <span className="text-xs">▾</span>
      </Button>

      {open && (
        <div className="border-border bg-background absolute right-0 z-50 mt-2 w-64 rounded-xl border p-2 shadow-lg">
          <div className="text-ring px-2 py-1 text-xs">Lens profiles</div>

          <div className="flex flex-col gap-1">
            {!accounts?.items.length && (
              <div className="text-ring px-2 py-2 text-sm">
                No Lens accounts
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
                      ? 'text-foreground bg-secondary'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <div className="bg-background text-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs">
                    {item.account.username?.value?.[0]?.toUpperCase() ?? 'U'}
                  </div>

                  <span className="truncate">
                    {item.account.username?.value ??
                      item.account.address.slice(0, 6) + '...'}
                  </span>

                  {isActive && (
                    <span className="text-ring ml-auto text-xs">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-border my-2 h-px" />

          <div className="flex flex-col gap-1">
            <button
              onClick={async () => {
                await lensLogout();
                disconnect.mutate();
                setOpen(false);
              }}
              className="text-foreground hover:bg-secondary w-full rounded-lg px-2 py-2 text-left text-sm"
            >
              Disconnect wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
