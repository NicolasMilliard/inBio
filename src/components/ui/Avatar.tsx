export const Avatar = ({
  avatar,
  name,
  handle,
}: {
  avatar?: string;
  name?: string | null;
  handle?: string;
}) => {
  return (
    <div className="mb-4 h-24 w-24 shrink-0 animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both] overflow-hidden rounded-full border-2 border-slate-50 bg-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      {avatar ? (
        <img
          src={avatar}
          alt={name ?? handle}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-700">
          {(name ?? handle ?? '?')[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};
