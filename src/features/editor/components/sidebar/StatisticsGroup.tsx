import { SidebarGroup, SidebarGroupLabel, Text } from '@/components/ui';
import { StatisticsToggle } from '../StatisticsToggle';

export const StatisticsGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-widest uppercase">
        Statistics
      </SidebarGroupLabel>
      <StatisticsToggle />
      <Text>Display followers number</Text>
      <Text>Display following number</Text>
      <Text>Display posts number</Text>
    </SidebarGroup>
  );
};
