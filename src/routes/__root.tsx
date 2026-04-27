import { Toaster, TooltipProvider } from '@/components/ui';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppHeader } from '@/components/layout';

const RootLayout = () => (
  <>
    <TooltipProvider>
      <div className="flex min-h-dvh flex-col bg-white">
        <AppHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
