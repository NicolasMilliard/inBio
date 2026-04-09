import EditProfile from '@/features/editProfile/EditProfile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditProfile />;
}
