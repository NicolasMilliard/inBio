export const Description = ({
  name,
  handle,
  bio,
}: {
  name?: string | null;
  handle?: string;
  bio?: string | null;
}) => {
  return (
    <div className="mb-5 flex animate-[fadeUp_0.4s_ease_0.15s_both] flex-col items-center gap-1 text-center">
      {name && (
        <h1 className="text-[1.375rem] leading-tight font-bold tracking-tight text-slate-900">
          {name}
        </h1>
      )}
      {handle && (
        <p className="text-sm font-normal tracking-wide text-slate-500">
          @{handle}
        </p>
      )}
      {bio && (
        <p className="mt-1 max-w-xs text-[0.9375rem] leading-relaxed text-slate-500">
          {bio}
        </p>
      )}
    </div>
  );
};
