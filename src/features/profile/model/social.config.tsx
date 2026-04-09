import {
  BlueskyIcon,
  DiscordIcon,
  FacebookIcon,
  FarcasterIcon,
  GithubIcon,
  InstagramIcon,
  MastodonIcon,
  ThreadsIcon,
  TikTokIcon,
  TwitchIcon,
  TwitterIcon,
  YouTubeIcon,
} from '@/components/icons';

export type SocialType =
  | 'bluesky'
  | 'discord'
  | 'facebook'
  | 'farcaster'
  | 'github'
  | 'instagram'
  | 'mastodon'
  | 'threads'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'youtube';

export const SOCIAL_CONFIG: Record<
  SocialType,
  {
    label: string;
    placeholder: string;
    icon: (className?: string) => React.ReactNode;
  }
> = {
  bluesky: {
    label: 'Bluesky',
    placeholder: 'https://bsky.app/profile/yourhandle',
    icon: (className) => <BlueskyIcon className={className} />,
  },
  discord: {
    label: 'Discord',
    placeholder: 'https://discord.gg/invite',
    icon: (className) => <DiscordIcon className={className} />,
  },
  facebook: {
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/yourprofile',
    icon: (className) => <FacebookIcon className={className} />,
  },
  farcaster: {
    label: 'Farcaster',
    placeholder: 'https://farcaster.xyz/@yourhandle',
    icon: (className) => <FarcasterIcon className={className} />,
  },
  github: {
    label: 'GitHub',
    placeholder: 'https://github.com/yourusername',
    icon: (className) => <GithubIcon className={className} />,
  },
  instagram: {
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/yourusername',
    icon: (className) => <InstagramIcon className={className} />,
  },
  mastodon: {
    label: 'Mastodon',
    placeholder: 'https://mastodon.social/@yourusername',
    icon: (className) => <MastodonIcon className={className} />,
  },
  threads: {
    label: 'Threads',
    placeholder: 'https://www.threads.net/@yourusername',
    icon: (className) => <ThreadsIcon className={className} />,
  },
  tiktok: {
    label: 'TikTok',
    placeholder: 'https://www.tiktok.com/@yourusername',
    icon: (className) => <TikTokIcon className={className} />,
  },
  twitch: {
    label: 'Twitch',
    placeholder: 'https://www.twitch.tv/yourusername',
    icon: (className) => <TwitchIcon className={className} />,
  },
  twitter: {
    label: 'X',
    placeholder: 'https://twitter.com/yourusername',
    icon: (className) => <TwitterIcon className={className} />,
  },
  youtube: {
    label: 'YouTube',
    placeholder: 'https://www.youtube.com/@yourusername',
    icon: (className) => <YouTubeIcon className={className} />,
  },
};
