import { Text } from '@/components/ui';
import { AddButtonLink, EditableButtonLinks } from './links';

export const ButtonLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      <Text className="text-muted-foreground">Buttons</Text>
      <div className="flex flex-wrap gap-2">
        <EditableButtonLinks />
        <AddButtonLink />
      </div>
    </div>
  );
};
