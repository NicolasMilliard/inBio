import { createFileRoute } from '@tanstack/react-router';

import { AuthGuard } from '@/features/auth/components';
import { EditProfileForm } from '@/features/editProfile/components';

export const Route = createFileRoute('/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <div className="mt-20 flex flex-col gap-8 px-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit your Profile
        </h1>
        <EditProfileForm />
      </div>
    </AuthGuard>
  );
}
