import { AuthButton } from '@/features/auth/components';

export const ProfileSelectionScreen = () => {
  return (
    <div className="bg-secondary flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">You're connected.</h1>
      <p className="max-w-xs">Please select the profile you want to access.</p>
      <AuthButton />
    </div>
  );
};
