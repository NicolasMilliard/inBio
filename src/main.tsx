import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen.ts';

import { LensProvider } from '@lens-protocol/react';
import { client } from './client';

import '@fontsource/dm-sans/400.css';
import './styles/index.css';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LensProvider client={client}>
      <RouterProvider router={router} />
    </LensProvider>
  </StrictMode>,
);
