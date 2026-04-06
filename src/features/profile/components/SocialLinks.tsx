import type { LensProfile } from '../hooks/useLensAccount';

export const SocialLinks = ({
  socialLinks,
}: {
  socialLinks: LensProfile['socialLinks'];
}) => {
  console.log('socialLinks', socialLinks);
  return <div>SocialLinks</div>;
};
