import { formatToThreeBioMetadata } from '@/helpers';
import { useTheme } from '@/hooks/useTheme';
import { useAccount, useAccountStats } from '@lens-protocol/react';

import { SpinnerScreen } from '@/components/ui';
import {
  // Branding,
  // CoverPicture,
  Identity,
  // Links,
  NotFoundScreen,
  Statistics,
} from './components';

const UserProfile = ({ lensHandle }: { lensHandle: string }) => {
  const {
    data: account,
    loading,
    error,
  } = useAccount({ username: { localName: lensHandle } });

  const { data: stats } = useAccountStats({
    account: account?.address ?? '',
  });

  const themeName =
    (account && formatToThreeBioMetadata(account)?.theme?.name) ?? 'default';

  useTheme(themeName);

  if (loading) return <SpinnerScreen text="Loading profile..." />;

  if (error || !account) {
    return <NotFoundScreen lensHandle={lensHandle} />;
  }

  const profile = formatToThreeBioMetadata(account)?.profile;
  const followers = stats?.graphFollowStats?.followers;
  const following = stats?.graphFollowStats?.following;
  const posts = stats?.feedStats?.posts;

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center">
      <div className="flex w-full max-w-6xl flex-col gap-8 px-4 md:flex-row md:gap-16">
        <div>
          <Identity lensHandle={lensHandle} profile={profile} />
          <Statistics
            followers={followers}
            following={following}
            posts={posts}
          />
        </div>
        <div>droite</div>
      </div>
      {/* <CoverPicture coverPicture={profile.coverPicture} />
      <Statistics followers={followers} following={following} posts={posts} />
      <SocialLinks socialLinks={profile.socialLinks} />
      <Links links={profile.links} />
      <Branding /> */}
    </main>
  );
};

export default UserProfile;
