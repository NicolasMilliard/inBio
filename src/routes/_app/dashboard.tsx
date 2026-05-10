import { createFileRoute } from '@tanstack/react-router';

import { Button, Text } from '@/components/ui';
import { AuthGuard } from '@/features/auth/components';
import { DashboardCard } from '@/features/dashboard/components';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AuthGuard>
      <div className="mx-auto mt-30 flex w-full max-w-6xl flex-col gap-8 px-4">
        <Text variant="h1" className="text-foreground">
          Dashboard
        </Text>
        <section className="grid gap-4 md:grid-cols-2">
          <DashboardCard
            title="Edit your Profile"
            description="Update your identity, links and public data."
            footer={
              <Button asChild>
                <Link to="/edit">Edit profile</Link>
              </Button>
            }
            className="animate-[blurFadeIn_0.8s_ease-out_forwards] opacity-0"
          />
          <DashboardCard
            title="Statistics"
            description="Consult your activity and usage."
            footer={<Button disabled>Coming soon</Button>}
            className="animate-[blurFadeIn_0.8s_ease-out_0.15s_forwards] opacity-0"
          />
        </section>
      </div>
    </AuthGuard>
  );
}
