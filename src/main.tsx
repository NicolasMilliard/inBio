import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';

import { routeTree } from './routeTree.gen.ts';

import { LensProvider } from '@lens-protocol/react';
import { client } from './providers/client.ts';
import { wagmiConfig } from './providers/wagmi.ts';

import './styles/index.css';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LensProvider client={client}>
          <RouterProvider router={router} />
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
