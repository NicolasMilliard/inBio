import { AppHeader, Footer } from '@/components/layout';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const AppLayout = () => (
  <div className="flex min-h-dvh flex-col">
    <AppHeader />
    <main className="-mt-20 flex flex-1 flex-col gap-30">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});
