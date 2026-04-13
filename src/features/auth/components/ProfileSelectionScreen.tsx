import { useAccountsAvailable } from '@lens-protocol/react';
import { useConnection } from 'wagmi';
import { useLensLogin } from '../hooks/useLensLogin';

export const ProfileSelectionScreen = () => {
  const connection = useConnection();
  const { data: accounts } = useAccountsAvailable({
    managedBy: connection.address,
  });

  const loginWithLens = useLensLogin();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Welcome back!</h1>
      <p className="max-w-xs">Please select the profile you want to access.</p>

      <div className="flex flex-col gap-1">
        {!accounts?.items.length && (
          <div className="text-ring px-2 py-2 text-sm">No Lens accounts</div>
        )}

        {accounts?.items.map((item) => {
          return (
            <button
              key={item.account.address}
              onClick={() => {
                loginWithLens(item);
              }}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition"
            >
              <div className="bg-background text-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs">
                {item.account.username?.value?.[0]?.toUpperCase() ?? 'U'}
              </div>

              <span className="truncate">
                {item.account.username?.value ??
                  item.account.address.slice(0, 6) + '...'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
