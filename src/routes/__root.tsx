import { TooltipProvider } from '@/components/ui/tooltip';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppHeader } from '@/components/layout';

const RootLayout = () => (
  <>
    <TooltipProvider>
      <AppHeader />
      <Outlet />
    </TooltipProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
