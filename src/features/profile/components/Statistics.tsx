import { formatCount } from '@/helpers';
import { Fragment } from 'react';

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
    <div className="bg-card flex w-full max-w-prose animate-[fadeUp_0.4s_ease_0.2s_both] items-center rounded-2xl px-5 py-3">
      {[
        { value: following, label: 'Following' },
        { value: followers, label: 'Followers' },
        { value: posts, label: 'Posts' },
      ].map(({ value, label }, i) => (
        <Fragment key={label}>
          {i > 0 && <div className="bg-ring h-7 w-px shrink-0" />}
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <span className="text-base leading-none font-bold tracking-tight">
              {value !== undefined ? formatCount(value) : '—'}
            </span>
            <span className="text-muted-foreground text-[0.6875rem] font-medium tracking-wider uppercase">
              {label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
