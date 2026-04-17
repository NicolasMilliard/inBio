import { Check, ChevronDown, ExternalLink, X } from 'lucide-react';
import type { ComponentType } from 'react';
import { useState } from 'react';

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

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type SocialValue =
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

type SocialPlatform = {
  value: SocialValue;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  placeholder: string;
  urlPrefix: string;
};

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    value: 'discord',
    label: 'Discord',
    Icon: DiscordIcon,
    placeholder: 'discord.gg/yourserver',
    urlPrefix: 'https://discord.gg/',
  },
  {
    value: 'farcaster',
    label: 'Farcaster',
    Icon: FarcasterIcon,
    placeholder: 'farcaster.xyz/yourhandle',
    urlPrefix: 'https://farcaster.xyz/',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    Icon: InstagramIcon,
    placeholder: 'instagram.com/yourhandle',
    urlPrefix: 'https://instagram.com/',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    Icon: TwitterIcon,
    placeholder: 'x.com/yourhandle',
    urlPrefix: 'https://x.com/',
  },
  {
    value: 'threads',
    label: 'Threads',
    Icon: ThreadsIcon,
    placeholder: 'threads.net/@yourhandle',
    urlPrefix: 'https://threads.net/@',
  },
  {
    value: 'twitch',
    label: 'Twitch',
    Icon: TwitchIcon,
    placeholder: 'twitch.tv/yourhandle',
    urlPrefix: 'https://twitch.tv/',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    Icon: YouTubeIcon,
    placeholder: 'youtube.com/@yourchannel',
    urlPrefix: 'https://youtube.com/@',
  },
  {
    value: 'bluesky',
    label: 'Bluesky',
    Icon: BlueskyIcon,
    placeholder: 'bsky.app/profile/yourhandle',
    urlPrefix: 'https://bsky.app/profile/',
  },
  {
    value: 'github',
    label: 'GitHub',
    Icon: GithubIcon,
    placeholder: 'github.com/yourhandle',
    urlPrefix: 'https://github.com/',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    Icon: FacebookIcon,
    placeholder: 'facebook.com/yourpage',
    urlPrefix: 'https://facebook.com/',
  },
  {
    value: 'mastodon',
    label: 'Mastodon',
    Icon: MastodonIcon,
    placeholder: 'mastodon.social/@yourhandle',
    urlPrefix: 'https://mastodon.social/@',
  },
  {
    value: 'tiktok',
    label: 'TikTok',
    Icon: TikTokIcon,
    placeholder: 'tiktok.com/@yourhandle',
    urlPrefix: 'https://tiktok.com/@',
  },
];

const SOCIAL_MAP = Object.fromEntries(
  SOCIAL_PLATFORMS.map((item) => [item.value, item]),
) as Record<SocialValue, SocialPlatform>;

// How many pill badges to show before collapsing into "+ N more"
const MAX_VISIBLE_BADGES = 2;

export const SocialLinksForm = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SocialValue[]>([
    'facebook',
    'threads',
  ]);
  const [links, setLinks] = useState<Partial<Record<SocialValue, string>>>({});

  const toggleSelection = (value: SocialValue) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const removeSelection = (value: SocialValue) => {
    setSelected((prev) => prev.filter((item) => item !== value));
    setLinks((prev) => {
      const next = { ...prev };
      delete next[value];
      return next;
    });
  };

  const handleLinkChange = (value: SocialValue, url: string) => {
    setLinks((prev) => ({ ...prev, [value]: url }));
  };

  // Badges: show up to MAX_VISIBLE_BADGES, then a "+N more" counter
  const visibleBadges = selected.slice(0, MAX_VISIBLE_BADGES);
  const overflowCount = selected.length - MAX_VISIBLE_BADGES;

  return (
    <div className="space-y-4">
      {/* ── Platform selector ── */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-full justify-between gap-2 px-3"
          >
            {/* Left: badges or placeholder */}
            <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
              {selected.length === 0 ? (
                <span className="text-muted-foreground text-sm">
                  Add social media…
                </span>
              ) : (
                <>
                  {visibleBadges.map((value) => {
                    const { Icon, label } = SOCIAL_MAP[value];
                    return (
                      <span
                        key={value}
                        className="bg-muted text-foreground inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
                      >
                        <Icon className="text-primary size-3.5" />
                        {label}
                        <button
                          type="button"
                          aria-label={`Remove ${label}`}
                          className="text-muted-foreground hover:text-foreground ml-0.5 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(value);
                          }}
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    );
                  })}

                  {overflowCount > 0 && (
                    <span className="text-muted-foreground bg-muted shrink-0 rounded-md px-2 py-0.5 text-xs font-medium">
                      +{overflowCount} more
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Right: count badge + chevron */}
            <div className="flex shrink-0 items-center gap-1.5">
              {selected.length > 0 && (
                <span className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold">
                  {selected.length}
                </span>
              )}
              <ChevronDown
                className={`text-muted-foreground size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Search platforms…" className="h-9" />
            <CommandEmpty>No platform found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {SOCIAL_PLATFORMS.map(({ value, label, Icon }) => {
                const isSelected = selected.includes(value);
                return (
                  <CommandItem
                    key={value}
                    value={label}
                    onSelect={() => toggleSelection(value)}
                    className="cursor-pointer gap-2"
                  >
                    <Icon className="text-primary size-4 shrink-0" />
                    <span className="flex-1 text-sm">{label}</span>
                    <Check
                      className={`size-4 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* ── Link inputs — rendered in selection order ── */}
      {selected.length > 0 && (
        <div className="space-y-3">
          {selected.map((value) => {
            const { Icon, label, placeholder } = SOCIAL_MAP[value];
            return (
              <div key={value} className="space-y-1.5">
                <Label
                  htmlFor={`social-${value}`}
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Icon className="text-primary size-3.5" />
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    id={`social-${value}`}
                    type="url"
                    placeholder={placeholder}
                    value={links[value] ?? ''}
                    onChange={(e) => handleLinkChange(value, e.target.value)}
                    className="pr-9"
                  />
                  {links[value] && (
                    <a
                      href={links[value]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 transition-colors"
                      aria-label={`Open ${label} link`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
