import { createConfig, createStorage, http } from 'wagmi';
import { lens } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [lens],
  storage: createStorage({
    storage: window.localStorage,
  }),
  transports: {
    [lens.id]: http(),
  },
});
