import { useState } from 'react';
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

export const SocialLinksForm = () => {
  const [open, setOpen] = useState(false);
  // TODO: Get default values from user metadata and initialize state accordingly
  const [selected, setSelected] = useState<SocialValue[]>([]);
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
            className="h-12 w-fit max-w-md min-w-xs"
          >
            {/* Left: badges or placeholder */}
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
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
                        className="bg-secondary-foreground text-secondary inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5"
                      >
                        <Icon className="size-4" />
                        {label}
                        <button
                          type="button"
                          aria-label={`Remove ${label}`}
                          className="text-secondary hover:bg-destructive ml-0.5 cursor-pointer rounded-full p-0.5 transition-colors"
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
            <CommandGroup
              heading="Popular"
              className="max-h-64 overflow-y-auto"
            >
              {POPULAR_SOCIAL_PLATFORMS.map(({ value, label, Icon }) => {
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
            <CommandSeparator />
            <CommandGroup
              heading="All Platforms"
              className="max-h-64 overflow-y-auto"
            >
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
