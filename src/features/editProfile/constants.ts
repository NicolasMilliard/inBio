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

import type { ComponentType } from 'react';

export type SocialValue =
  | 'discord'
  | 'farcaster'
  | 'instagram'
  | 'twitter'
  | 'threads'
  | 'twitch'
  | 'youtube'
  | 'bluesky'
  | 'github'
  | 'facebook'
  | 'mastodon'
  | 'tiktok';

export type SocialPlatform = {
  value: SocialValue;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  placeholder: string;
  urlPrefix: string;
};

export const POPULAR_SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    value: 'instagram',
    label: 'Instagram',
    Icon: InstagramIcon,
    placeholder: 'https://instagram.com/yourhandle',
    urlPrefix: 'https://instagram.com/',
  },
  {
    value: 'tiktok',
    label: 'TikTok',
    Icon: TikTokIcon,
    placeholder: 'https://tiktok.com/@yourhandle',
    urlPrefix: 'https://tiktok.com/@',
  },
  {
    value: 'twitter',
    label: 'Twitter / X',
    Icon: TwitterIcon,
    placeholder: 'https://x.com/yourhandle',
    urlPrefix: 'https://x.com/',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    Icon: FacebookIcon,
    placeholder: 'https://facebook.com/yourpage',
    urlPrefix: 'https://facebook.com/',
  },
];

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    value: 'bluesky',
    label: 'Bluesky',
    Icon: BlueskyIcon,
    placeholder: 'https://bsky.app/profile/yourhandle',
    urlPrefix: 'https://bsky.app/profile/',
  },
  {
    value: 'discord',
    label: 'Discord',
    Icon: DiscordIcon,
    placeholder: 'https://discord.gg/yourserver',
    urlPrefix: 'https://discord.gg/',
  },
  {
    value: 'farcaster',
    label: 'Farcaster',
    Icon: FarcasterIcon,
    placeholder: 'https://farcaster.xyz/yourhandle',
    urlPrefix: 'https://farcaster.xyz/',
  },
  {
    value: 'github',
    label: 'GitHub',
    Icon: GithubIcon,
    placeholder: 'https://github.com/yourhandle',
    urlPrefix: 'https://github.com/',
  },
  {
    value: 'mastodon',
    label: 'Mastodon',
    Icon: MastodonIcon,
    placeholder: 'https://mastodon.social/@yourhandle',
    urlPrefix: 'https://mastodon.social/@',
  },
  {
    value: 'threads',
    label: 'Threads',
    Icon: ThreadsIcon,
    placeholder: 'https://threads.net/@yourhandle',
    urlPrefix: 'https://threads.net/@',
  },
  {
    value: 'twitch',
    label: 'Twitch',
    Icon: TwitchIcon,
    placeholder: 'https://twitch.tv/yourhandle',
    urlPrefix: 'https://twitch.tv/',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    Icon: YouTubeIcon,
    placeholder: 'https://youtube.com/@yourchannel',
    urlPrefix: 'https://youtube.com/@',
  },
];

export const ALL_SOCIAL_PLATFORMS = [
  ...POPULAR_SOCIAL_PLATFORMS,
  ...SOCIAL_PLATFORMS,
] as const;

export const SOCIAL_MAP = Object.fromEntries(
  ALL_SOCIAL_PLATFORMS.map((item) => [item.value, item]),
) as Record<SocialValue, SocialPlatform>;

// How many pill badges to show before collapsing into "+ N more"
export const MAX_VISIBLE_BADGES = 2;
