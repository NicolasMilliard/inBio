import { truncateAddress } from '../helpers';

export const Address = ({ address }: { address: string }) => {
  return (
    <div className="mb-6 flex animate-[fadeUp_0.4s_ease_0.3s_both] justify-center">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
        <span className="font-mono text-xs font-medium tracking-wide text-slate-500">
          {truncateAddress(address)}
        </span>
      </div>
    </div>
  );
};
