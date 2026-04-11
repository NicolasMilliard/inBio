import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

export const AppHeader = () => {
  return (
    <header className="bg-background w-full border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md">
            iB
          </div>
          <span>inBio</span>
        </div>

        <nav className="flex items-center gap-2">
          <Button asChild>
            <Link to="/dashboard">Open app</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
