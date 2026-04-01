import { useAccount, useAccountStats } from '@lens-protocol/react';
import { formatCount, truncateAddress } from '../helpers';

import { CtaButton, type CtaProps } from './CtaButton';
import { Loader } from './Loader';

const MyPage = ({ handleLens }: { handleLens: string }) => {
  const {
    data: account,
    loading,
    error,
  } = useAccount({
    username: { localName: handleLens },
  });

  const { data: stats } = useAccountStats({
    account: account?.address ?? '',
  });

  if (loading) return <Loader />;

  if (error || !account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0ede8]">
        <p className="text-sm text-black/50">Profile not found.</p>
      </div>
    );
  }

  const avatar = account.metadata?.picture as string | undefined;
  const banner = account.metadata?.coverPicture as string | undefined;
  const name = account.metadata?.name;
  const bio = account.metadata?.bio;
  const handle = account.username?.value;
  const address = account.address;

  const attributes = account.metadata?.attributes as
    | { key: string; value: string }[]
    | undefined;
  const website = attributes?.find((a) => a.key === 'website')?.value;

  const followers = stats?.graphFollowStats?.followers;
  const following = stats?.graphFollowStats?.following;
  const posts = stats?.feedStats?.posts;

  const ctas: CtaProps[] = [];
  if (website) {
    ctas.push({
      href: website,
      label: website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      icon: '🔗',
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0ede8]">
      {/* Desktop blurred background */}
      {banner && (
        <div
          className="fixed inset-0 z-0 hidden scale-[1.08] bg-cover bg-center blur-2xl brightness-85 saturate-130 sm:block"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}
      <div className="fixed inset-0 z-1 hidden bg-[rgba(240,237,232,0.45)] sm:block" />

      {/* Card */}
      <main className="relative z-2 flex min-h-screen w-full animate-[riseIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both] flex-col items-center px-6 pt-12 pb-10 sm:my-8 sm:min-h-0 sm:w-105 sm:rounded-3xl sm:border sm:border-white/90 sm:bg-white/72 sm:px-8 sm:pt-10 sm:pb-8 sm:shadow-[0_8px_48px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] sm:backdrop-blur-xl sm:backdrop-saturate-180">
        {/* Avatar */}
        <div className="mb-4 h-24 w-24 shrink-0 animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both] overflow-hidden rounded-full border-[3px] border-white/90 bg-[#e8e4df] shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          {avatar ? (
            <img
              src={avatar}
              alt={name ?? handle}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-black/50">
              {(name ?? handle ?? '?')[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="mb-5 flex animate-[fadeUp_0.4s_ease_0.15s_both] flex-col items-center gap-1 text-center">
          {name && (
            <h1 className="text-[1.375rem] leading-tight font-bold tracking-tight text-[#111]">
              {name}
            </h1>
          )}
          {handle && (
            <p className="text-sm font-normal tracking-wide text-black/50">
              @{handle}
            </p>
          )}
          {bio && (
            <p className="mt-1 max-w-xs text-[0.9375rem] leading-relaxed text-black/50">
              {bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 flex w-full max-w-85 animate-[fadeUp_0.4s_ease_0.2s_both] items-center rounded-2xl border border-black/8 bg-white/55 px-5 py-3">
          {[
            { value: following, label: 'Following' },
            { value: followers, label: 'Followers' },
            { value: posts, label: 'Posts' },
          ].map(({ value, label }, i) => (
            <>
              {i > 0 && (
                <div
                  key={`div-${i}`}
                  className="h-7 w-px shrink-0 bg-black/8"
                />
              )}
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-0.5"
              >
                <span className="text-base leading-none font-bold tracking-tight text-[#111]">
                  {value !== undefined ? formatCount(value) : '—'}
                </span>
                <span className="text-[0.6875rem] font-medium tracking-widest text-black/35 uppercase">
                  {label}
                </span>
              </div>
            </>
          ))}
        </div>

        {/* CTAs */}
        {ctas.length > 0 && (
          <div className="mb-5 flex w-full max-w-85 animate-[fadeUp_0.4s_ease_0.25s_both] flex-col gap-2.5">
            {ctas.map((cta, i) => (
              <CtaButton key={i} {...cta} />
            ))}
          </div>
        )}

        {/* Address chip */}
        <div className="mb-6 flex animate-[fadeUp_0.4s_ease_0.3s_both] justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-white/55 px-3 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            <span className="font-mono text-xs font-medium tracking-wide text-black/50">
              {truncateAddress(address)}
            </span>
          </div>
        </div>

        {/* Branding */}
        <p className="mt-auto animate-[fadeUp_0.4s_ease_0.35s_both] pt-2 text-center text-xs text-black/35">
          Powered by{' '}
          <strong className="font-semibold text-black/50">inBio</strong> · built
          on Lens
        </p>
      </main>
    </div>
  );
};

export default MyPage;
