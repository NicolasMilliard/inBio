import {
  AvatarFallback,
  AvatarImage,
  Avatar as UIAvatar,
} from '@/components/ui/avatar';

export const Avatar = ({
  avatar,
  name,
  handle,
}: {
  avatar?: string;
  name?: string | null;
  handle?: string;
}) => {
  return (
    <UIAvatar size="xl">
      <AvatarImage src={avatar} alt={name ?? handle} />
      <AvatarFallback>
        {name ? name[0].toUpperCase() : handle ? handle[0].toUpperCase() : 'CN'}
      </AvatarFallback>
    </UIAvatar>
  );
};
