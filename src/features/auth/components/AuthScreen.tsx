import { AuthButton } from '@/features/auth/components';

export const AuthScreen = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">You're not connected.</h1>
      <p className="max-w-xs">
        Please connect your wallet to access your dashboard.
      </p>
      <AuthButton />
    </div>
  );
};
