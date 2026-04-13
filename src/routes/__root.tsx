import { TooltipProvider } from '@/components/ui/tooltip';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppHeader } from '@/components/layout';

const RootLayout = () => (
  <>
    <TooltipProvider>
      <div className="bg-secondary min-h-screen">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
