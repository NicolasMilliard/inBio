import { Spinner } from './spinner';

export const SpinnerScreen = ({ text }: { text?: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex items-center gap-2">
        <Spinner className="size-8" />
        <span>{text || 'Loading...'}</span>
      </div>
    </div>
  );
};
