import { SidebarGroup, SidebarGroupLabel } from '@/components/ui';
import { ButtonLinks, SocialLinks } from './form';

export const LinksGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="pl-0 tracking-widest uppercase">
        Links
      </SidebarGroupLabel>
      <div className="flex flex-col gap-4">
        <SocialLinks />
        <ButtonLinks />
      </div>
    </SidebarGroup>
  );
};
