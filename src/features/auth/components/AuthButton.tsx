import { useState } from 'react';
import { useConnect, useConnection, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import {
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

  const [open, setOpen] = useState(false);

  if (connection.isConnected) {
    return (
      <div>
        <p>Wallet connecté : {connection.address}</p>
        <br />
        <hr />
        <br />

        {authenticatedUser && <p>Profil actif : {authenticatedUser.address}</p>}

        <br />
        <hr />
        <br />

        <button onClick={() => setOpen(!open)}>
          {open ? 'Cacher les comptes Lens' : 'Afficher les comptes Lens'}
        </button>

        {open && (
          <div>
            <p>Comptes Lens disponibles pour ce wallet :</p>

            {!accounts?.items.length && <p>Aucun compte Lens trouvé</p>}

            {accounts?.items.map((item) => {
              const isActive =
                authenticatedUser?.address.toLowerCase() ===
                item.account.address.toLowerCase();

              return (
                <button
                  key={item.account.address}
                  onClick={() => loginWithLens(item)}
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                >
                  - {item.account.username?.value ?? item.account.address}
                  {isActive && ' (actif)'}
                </button>
              );
            })}
          </div>
        )}

        <br />
        <hr />
        <br />

        <button
          disabled={disconnect.isPending}
          onClick={() => disconnect.mutate()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      disabled={connect.isPending}
      onClick={() => connect.mutate({ connector: injected() })}
    >
      {connect.isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};
