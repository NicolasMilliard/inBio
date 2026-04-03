import { createConfig, http } from 'wagmi';
import { lens } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [lens],
  transports: {
    [lens.id]: http(),
  },
});
