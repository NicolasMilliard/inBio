import { SidebarGroup, SidebarGroupLabel, Text } from '@/components/ui';

export const LinksGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-widest uppercase">
        Links
      </SidebarGroupLabel>
      <Text>Social links</Text>
      <Text>Buttons</Text>
    </SidebarGroup>
  );
};
