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
  { label: string; icon: (className?: string) => React.ReactNode }
> = {
  bluesky: {
    label: 'Bluesky',
    icon: (className) => <BlueskyIcon className={className} />,
  },
  discord: {
    label: 'Discord',
    icon: (className) => <DiscordIcon className={className} />,
  },
  facebook: {
    label: 'Facebook',
    icon: (className) => <FacebookIcon className={className} />,
  },
  farcaster: {
    label: 'Farcaster',
    icon: (className) => <FarcasterIcon className={className} />,
  },
  github: {
    label: 'GitHub',
    icon: (className) => <GithubIcon className={className} />,
  },
  instagram: {
    label: 'Instagram',
    icon: (className) => <InstagramIcon className={className} />,
  },
  mastodon: {
    label: 'Mastodon',
    icon: (className) => <MastodonIcon className={className} />,
  },
  threads: {
    label: 'Threads',
    icon: (className) => <ThreadsIcon className={className} />,
  },
  tiktok: {
    label: 'TikTok',
    icon: (className) => <TikTokIcon className={className} />,
  },
  twitch: {
    label: 'Twitch',
    icon: (className) => <TwitchIcon className={className} />,
  },
  twitter: {
    label: 'X',
    icon: (className) => <TwitterIcon className={className} />,
  },
  youtube: {
    label: 'YouTube',
    icon: (className) => <YouTubeIcon className={className} />,
  },
};
