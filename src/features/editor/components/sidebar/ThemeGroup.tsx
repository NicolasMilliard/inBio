import { SidebarGroup, SidebarGroupLabel, Text } from '@/components/ui';
import { BrandingSwitch, CoverPictureControl } from './form';

export const ThemeGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="pl-0 tracking-widest uppercase">
        Theme
      </SidebarGroupLabel>
      <div className="flex flex-col gap-4">
        <CoverPictureControl />
        <BrandingSwitch />
        <Text>Preset</Text>
      </div>
    </SidebarGroup>
  );
};
