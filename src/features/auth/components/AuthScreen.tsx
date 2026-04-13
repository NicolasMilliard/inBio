import { AuthButton } from '@/features/auth/components';

export const AuthScreen = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Connect your wallet
      </h1>
      <p className="text-muted-foreground max-w-md">
        Access your inBio dashboard by connecting your wallet. Your identity and
        profiles are linked to it.
      </p>
      <AuthButton />
    </section>
  );
};
