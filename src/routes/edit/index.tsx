import { useEditorAccount } from '@/features/editor/hooks';
import { createFileRoute } from '@tanstack/react-router';

import { SidebarProvider, SpinnerScreen } from '@/components/ui';
import { AuthGuard } from '@/features/auth/components';
import { EditorScreen } from '@/features/editor/components/EditorScreen';
import { NotFoundScreen } from '@/features/profile/components';

export const Route = createFileRoute('/edit/')({
  component: EditorPage,
});

function EditorPage() {
  const { account, stats, loading, error } = useEditorAccount();

  if (loading) return <SpinnerScreen text="Loading profile..." />;

  if (error || !account) {
    return <NotFoundScreen />;
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <EditorScreen account={account} stats={stats} />
      </SidebarProvider>
    </AuthGuard>
  );
}
