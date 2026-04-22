import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  MAX_VISIBLE_BADGES,
  POPULAR_SOCIAL_PLATFORMS,
  SOCIAL_MAP,
  SOCIAL_PLATFORMS,
  type SocialValue,
} from '../constants';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Check, ChevronDown, ExternalLink, X } from 'lucide-react';

type FormValues = {
  socialLinks: Array<{ type: string; url: string }>;
};

export const SocialLinksForm = () => {
  const [open, setOpen] = useState(false);

  const { control, watch } = useFormContext<FormValues>();
  const { fields, update } = useFieldArray({
    control,
    name: 'socialLinks',
  });
  const socialLinks = watch('socialLinks');

  // We need a separate toggled set for platforms the user has opened but not yet filled
  const [toggled, setToggled] = useState<Set<string>>(new Set());
  const isSelected = (type: string) => toggled.has(type);

  const togglePlatform = (value: SocialValue) => {
    setToggled((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
        // Clear the url when deselecting
        const idx = fields.findIndex((f) => f.type === value);
        if (idx !== -1) update(idx, { type: value, url: '' });
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const removePlatform = (value: SocialValue) => {
    setToggled((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
    const idx = fields.findIndex((f) => f.type === value);
    if (idx !== -1) update(idx, { type: value, url: '' });
  };

  const handleLinkChange = (value: SocialValue, url: string) => {
    const idx = fields.findIndex((f) => f.type === value);
    if (idx !== -1) update(idx, { type: value, url });
  };

  const getLinkUrl = (value: SocialValue) =>
    socialLinks.find((l) => l.type === value)?.url ?? '';

  const visibleBadges = [...toggled].slice(0, MAX_VISIBLE_BADGES);
  const overflowCount = toggled.size - MAX_VISIBLE_BADGES;

  return (
    <div className="space-y-4">
      {/* ── Platform selector ── */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-fit max-w-md min-w-xs"
          >
            {/* Left: badges or placeholder */}
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              {toggled.size === 0 ? (
                <span className="text-muted-foreground text-sm">
                  Add social media…
                </span>
              ) : (
                <>
                  {visibleBadges.map((value) => {
                    const { Icon, label } = SOCIAL_MAP[value as SocialValue];
                    return (
                      <span
                        key={value}
                        className="bg-primary text-primary-foreground inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5"
                      >
                        <Icon className="size-4" />
                        {label}
                        <span
                          aria-label={`Remove ${label}`}
                          className="text-secondary hover:bg-destructive ml-0.5 cursor-pointer rounded-full p-0.5 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePlatform(value as SocialValue);
                          }}
                        >
                          <X className="size-3" />
                        </span>
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
              {toggled.size > 0 && (
                <span className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold">
                  {toggled.size}
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
            <CommandGroup
              heading="Popular"
              className="max-h-64 overflow-y-auto"
            >
              {POPULAR_SOCIAL_PLATFORMS.map(({ value, label, Icon }) => {
                return (
                  <CommandItem
                    key={value}
                    value={label}
                    onSelect={() => togglePlatform(value)}
                    className="cursor-pointer gap-2"
                  >
                    <Icon className="text-primary size-4 shrink-0" />
                    <span className="flex-1 text-sm">{label}</span>
                    <Check
                      className={`size-4 transition-opacity ${isSelected(value) ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup
              heading="All Platforms"
              className="max-h-64 overflow-y-auto"
            >
              {SOCIAL_PLATFORMS.map(({ value, label, Icon }) => {
                return (
                  <CommandItem
                    key={value}
                    value={label}
                    onSelect={() => togglePlatform(value)}
                    className="cursor-pointer gap-2"
                  >
                    <Icon className="text-primary size-4 shrink-0" />
                    <span className="flex-1 text-sm">{label}</span>
                    <Check
                      className={`size-4 transition-opacity ${isSelected(value) ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* ── Link inputs — rendered in selection order ── */}
      {toggled.size > 0 && (
        <div className="space-y-3">
          {[...toggled].map((value) => {
            const { Icon, label, placeholder } =
              SOCIAL_MAP[value as SocialValue];
            const url = getLinkUrl(value as SocialValue);

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
                    value={url}
                    onChange={(e) =>
                      handleLinkChange(value as SocialValue, e.target.value)
                    }
                    className="pr-9"
                  />
                  {url && (
                    <a
                      href={url}
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
