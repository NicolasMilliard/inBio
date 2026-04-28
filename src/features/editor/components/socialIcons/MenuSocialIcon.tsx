import {
  POPULAR_SOCIAL_PLATFORMS,
  SOCIAL_PLATFORMS,
  type SocialValue,
} from '../../constants';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui';

type MenuSocialIconProps = {
  activePlatformTypes: Set<string>;
  setPendingType: React.Dispatch<React.SetStateAction<SocialValue | null>>;
  setPendingUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const MenuSocialIcon = ({
  activePlatformTypes,
  setPendingType,
  setPendingUrl,
}: MenuSocialIconProps) => {
  const filterInactive = <T extends { value: SocialValue }>(platforms: T[]) =>
    platforms.filter((p) => !activePlatformTypes.has(p.value));

  const inactivePopular = filterInactive(POPULAR_SOCIAL_PLATFORMS);
  const inactiveAll = filterInactive(SOCIAL_PLATFORMS);

  const handleSelect = (value: SocialValue) => {
    setPendingType(value);
    setPendingUrl('');
  };

  return (
    <Command>
      <CommandInput placeholder="Search platforms..." className="h-9" />
      <CommandEmpty>No platform found.</CommandEmpty>
      <div className="max-h-[min(400px,40dvh)] overflow-y-auto">
        {inactivePopular.length > 0 && (
          <CommandGroup heading="Popular">
            {inactivePopular.map(({ value, label, Icon }) => (
              <CommandItem
                key={value}
                value={label}
                onSelect={() => handleSelect(value)}
                className="cursor-pointer gap-2"
              >
                <Icon className="text-primary size-4 shrink-0" />
                <span className="flex-1 text-sm">{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {inactiveAll.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="All Platforms">
              {inactiveAll.map(({ value, label, Icon }) => (
                <CommandItem
                  key={value}
                  value={label}
                  onSelect={() => handleSelect(value)}
                  className="cursor-pointer gap-2"
                >
                  <Icon className="text-primary size-4 shrink-0" />
                  <span className="flex-1 text-sm">{label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </div>
    </Command>
  );
};
