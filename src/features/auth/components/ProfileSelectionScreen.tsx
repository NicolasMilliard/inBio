import { useAccountsAvailable } from '@lens-protocol/react';
import { useConnection } from 'wagmi';
import { useLensLogin } from '../hooks/useLensLogin';

import { Avatar, AvatarFallback, AvatarImage, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

export const ProfileSelectionScreen = () => {
  const connection = useConnection();
  const { data: accounts } = useAccountsAvailable({
    managedBy: connection.address,
  });
  const loginWithLens = useLensLogin();

  return (
    <section className="mt-20 flex flex-col items-center gap-8 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Choose your profile
        </h1>
        <p className="text-muted-foreground max-w-md">
          Select the profile you want to use. You can switch later from your
          dashboard.
        </p>
      </div>

      <div className="grid w-full max-w-xl gap-4">
        {!accounts?.items.length && (
          <div className="border-border/60 bg-muted/40 text-muted-foreground rounded-lg border p-4 text-sm">
            No profiles found for this wallet.
          </div>
        )}

        {accounts?.items.map((item) => {
          const name = item.account.metadata?.name ?? 'Unnamed';
          const avatar =
            item.account.metadata?.picture ?? name[0]?.toUpperCase();

          return (
            <Card
              key={item.account.address}
              onClick={() => {
                loginWithLens(item);
              }}
              className={cn(
                // layout
                'border-border bg-background cursor-pointer flex-row items-center gap-8 border p-6 shadow-none backdrop-blur-md',

                // animation
                'transition-all duration-300',
                'hover:border-primary/30 hover:shadow-primary/5 hover:-translate-y-1 hover:shadow-md',
              )}
            >
              <Avatar size="xl">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>
                  {name ? name[0].toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-left">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground text-xs">
                  {item.account.address.slice(0, 6)}...
                  {item.account.address.slice(-4)}
                </span>
              </div>

              <div className="ml-auto">Select →</div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
