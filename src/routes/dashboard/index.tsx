import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui';
import { AuthGuard } from '@/features/auth/components';
import { DashboardCard } from '@/features/dashboard/components';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <div className="mt-20 flex flex-col gap-8 px-4">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <section className="grid gap-4 md:grid-cols-2">
          <DashboardCard
            title="Edit your Profile"
            description="Update your identity, links and public data."
            footer={
              <Button asChild>
                <Link to="/edit">Edit profile</Link>
              </Button>
            }
          />
          <DashboardCard
            title="Statistics"
            description="Consult your activity and usage."
            footer={<Button disabled>Coming soon</Button>}
          />
        </section>
      </div>
    </AuthGuard>
  );
}
