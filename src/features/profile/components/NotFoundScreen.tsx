import { buttonVariants } from '@/components/ui/button';

export const NotFoundScreen = ({ handleLens }: { handleLens: string }) => {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Profile not found.</h1>
      <p>
        Did you misspell <strong>{handleLens}</strong>?
      </p>
      <a
        href="/"
        className={buttonVariants({ variant: 'outline', size: 'default' })}
      >
        Go back home
      </a>
    </div>
  );
};
