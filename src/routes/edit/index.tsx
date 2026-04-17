import { createFileRoute } from '@tanstack/react-router';

import { AuthGuard } from '@/features/auth/components';
import EditProfile from '@/features/editProfile/EditProfile';

export const Route = createFileRoute('/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <EditProfile />
    </AuthGuard>
  );
}
