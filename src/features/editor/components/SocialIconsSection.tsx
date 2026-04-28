import { AddSocialIconLink, EditableSocialIcons } from './socialIcons';

export const SocialIconsSection = () => {
  return (
    <div className="flex justify-center gap-2">
      <EditableSocialIcons />
      <AddSocialIconLink />
    </div>
  );
};
