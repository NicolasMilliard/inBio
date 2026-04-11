import { createFileRoute } from '@tanstack/react-router';

import { AuthButton } from '@/features/auth/components/AuthButton';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-2">
      <h3>Welcome Home!</h3>
      <AuthButton />
    </div>
  );
}
