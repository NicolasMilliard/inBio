export const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ede8]">
      <div className="flex items-center gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/30"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
};
