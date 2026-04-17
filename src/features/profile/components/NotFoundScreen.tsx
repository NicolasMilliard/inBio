import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';

export const NotFoundScreen = ({ handleLens }: { handleLens: string }) => {
  return (
    <div className="bg-secondary flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Profile not found.</h1>
      <p>
        Did you misspell <strong>{handleLens}</strong>?
      </p>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
};
