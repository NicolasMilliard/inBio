import { createFileRoute, useParams } from '@tanstack/react-router';

import MyPage from '../../components/MyPage';

export const Route = createFileRoute('/$pageId/')({
  component: PageContent,
});

function PageContent() {
  const { pageId } = useParams({ from: '/$pageId/' });

  return <MyPage handleLens={pageId} />;
}
