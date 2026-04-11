import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { AuthButton } from '@/features/auth/components/AuthButton';
import { DashboardCard } from '@/features/dashboard/components';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <AuthButton />
      </div>

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
  );
}
