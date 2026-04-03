import { useAccountStats } from '@lens-protocol/react';
import { useLensAccount } from '../hooks/useLensAccount';

import { Address } from './Address';
import { Avatar } from './Avatar';
import { Banner } from './Banner';
import { Branding } from './Branding';
import { Description } from './Description';
import { Links } from './Links';
import { Loader } from './Loader';
import { Statistics } from './Statistics';

import type { LinkButtonProps } from './LinkButton';

const MyPage = ({ handleLens }: { handleLens: string }) => {
  const { data: account, loading, error } = useLensAccount(handleLens);

  const { data: stats } = useAccountStats({
    account: account?.address ?? '',
  });

  if (loading) return <Loader />;

  if (error || !account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-md text-slate-500">Profile not found.</p>
      </div>
    );
  }

  const followers = stats?.graphFollowStats?.followers;
  const following = stats?.graphFollowStats?.following;
  const posts = stats?.feedStats?.posts;

  const links: LinkButtonProps[] = [];

  if (account.website) {
    links.push({
      href: account.website,
      label: account.website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100">
      <Banner banner={account.banner} />

      <main className="relative z-2 flex min-h-screen w-full animate-[riseIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both] flex-col items-center px-6 pt-12 pb-10 sm:my-8 sm:min-h-0 sm:w-105 sm:rounded-3xl sm:border sm:border-slate-200 sm:bg-slate-200/70 sm:px-8 sm:pt-10 sm:pb-8 sm:shadow-[0_8px_48px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] sm:backdrop-blur-xl sm:backdrop-saturate-180">
        <Avatar
          avatar={account.avatar}
          name={account.name}
          handle={account.handle}
        />
        <Description
          name={account.name}
          handle={account.handle}
          bio={account.bio}
        />
        <Statistics followers={followers} following={following} posts={posts} />
        <Links links={links} />
        <Address address={account.address} />
        <Branding />
      </main>
    </div>
  );
};

export default MyPage;
