import { useMatchRoute } from '@tanstack/react-router';

import { AuthButton } from '@/features/auth/components';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

export const AppHeader = () => {
  const matchRoute = useMatchRoute();
  const isHome = !!matchRoute({ to: '/' });

  return (
    <header className="w-full">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/">
          <div className="flex items-center gap-2 font-semibold">
            <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md">
              iB
            </div>
            <span>inBio</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {isHome ? (
            <Button asChild>
              <Link to="/dashboard">Open app</Link>
            </Button>
          ) : (
            <AuthButton />
          )}
        </nav>
      </div>
    </header>
  );
};
