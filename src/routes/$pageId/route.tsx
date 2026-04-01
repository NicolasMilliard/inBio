import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$pageId')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return <Outlet />;
}
