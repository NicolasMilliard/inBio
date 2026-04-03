import { useAccountsAvailable } from '@lens-protocol/react';
import { injected, useConnect, useConnection, useDisconnect } from 'wagmi';
import { useLensLogin } from '../hooks/useLensLogin';

export const AuthButton = () => {
  const { isConnected, address } = useConnection();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  //   const { execute: logout } = useLogout();
  //   const { data: session } = useSession();
  const { data: accounts } = useAccountsAvailable({ managedBy: address });
  const loginWithLens = useLensLogin();

  console.log('AuthButton - accounts disponibles :', accounts);

  // Déjà authentifié avec Lens
  //   if (session?.authenticated) {
  //     return (
  //       <div className="flex items-center gap-3">
  //         <span className="text-sm text-black/60">{session.address}</span>
  //         <button
  //           onClick={() => logout()}
  //           className="rounded-xl bg-black/8 px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/12"
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     );
  //   }

  // Wallet connecté mais pas encore loggé sur Lens
  if (isConnected && accounts?.items.length) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-black/50">Choisir un compte Lens :</p>
        {accounts.items.map((item) => (
          <button
            key={item.account.address}
            onClick={() => loginWithLens(item)}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/80"
          >
            {item.account.username?.value ?? item.account.address}
          </button>
        ))}
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm text-black/40 transition-colors hover:text-black/60"
        >
          Déconnecter le wallet
        </button>
      </div>
    );
  }

  // Wallet connecté mais pas de compte Lens
  if (isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-black/50">
          Aucun compte Lens trouvé pour ce wallet.
        </p>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm text-black/40 transition-colors hover:text-black/60"
        >
          Déconnecter
        </button>
      </div>
    );
  }

  // Pas de wallet connecté
  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
    >
      Connecter le wallet
    </button>
  );
};
