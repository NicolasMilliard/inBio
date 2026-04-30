import UserProfile from '@/features/profile/UserProfile';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/$pageId/')({
  component: PageContent,
});

function PageContent() {
  const { pageId } = useParams({ from: '/$pageId/' });

  const lensHandle = pageId.toLowerCase();

  return <UserProfile lensHandle={lensHandle} />;
}
