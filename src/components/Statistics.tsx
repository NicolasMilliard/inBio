import React from 'react';
import { formatCount } from '../helpers';

export const Statistics = ({
  followers,
  following,
  posts,
}: {
  followers?: number;
  following?: number;
  posts?: number;
}) => {
  return (
    <div className="mb-6 flex w-full max-w-85 animate-[fadeUp_0.4s_ease_0.2s_both] items-center rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3">
      {[
        { value: following, label: 'Following' },
        { value: followers, label: 'Followers' },
        { value: posts, label: 'Posts' },
      ].map(({ value, label }, i) => (
        <React.Fragment key={label}>
          {i > 0 && <div className="h-7 w-px shrink-0 bg-slate-400" />}
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <span className="text-base leading-none font-bold tracking-tight text-slate-900">
              {value !== undefined ? formatCount(value) : '—'}
            </span>
            <span className="text-[0.6875rem] font-medium tracking-widest text-slate-500 uppercase">
              {label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
