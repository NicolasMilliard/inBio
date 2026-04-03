import UserProfile from '@/features/profile/UserProfile';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/$pageId/')({
  component: PageContent,
});

function PageContent() {
  const { pageId } = useParams({ from: '/$pageId/' });

  return <UserProfile handleLens={pageId} />;
}
