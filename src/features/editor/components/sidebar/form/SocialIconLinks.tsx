import { Text } from '@/components/ui';
import { AddSocialIconLink, EditableSocialLinks } from './social-links';

export const SocialLinks = () => {
  return (
    <div>
      <Text className="text-sidebar-foreground mb-1 text-sm font-medium">
        Social
      </Text>
      <div className="flex flex-wrap gap-2">
        <EditableSocialLinks />
        <AddSocialIconLink />
      </div>
    </div>
  );
};
