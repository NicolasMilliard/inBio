import { SidebarGroup, SidebarGroupLabel, Text } from '@/components/ui';

export const IdentityGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-widest uppercase">
        Identity
      </SidebarGroupLabel>
      <Text>Name</Text>
      <Text>Bio</Text>
      <Text>Avatar</Text>
    </SidebarGroup>
  );
};
