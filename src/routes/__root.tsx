import { TooltipProvider } from '@/components/ui/tooltip';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppHeader } from '@/components/layout';

const RootLayout = () => (
  <>
    <TooltipProvider>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4">
        <Outlet />
      </main>
    </TooltipProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
