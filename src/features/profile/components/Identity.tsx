import { Avatar, AvatarFallback, AvatarImage, Text } from '@/components/ui';
import type { ThreeBioProfile } from '@/schemas/threeBioMetadata.schema';

export const Identity = ({
  lensHandle,
  profile,
}: {
  lensHandle: string;
  profile: ThreeBioProfile;
}) => {
  const { avatar, name, bio } = profile;

  return (
    <div className="flex flex-col gap-4">
      <Avatar
        size="xl"
        className="animate-[blurFadeIn_0.4s_ease-out_0.15s_both]"
      >
        <AvatarImage src={avatar} alt={name ?? lensHandle} />
        <AvatarFallback className="bg-avatar-background text-bio-text">
          {name
            ? name[0].toUpperCase()
            : lensHandle
              ? lensHandle[0].toUpperCase()
              : 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex animate-[blurFadeIn_0.4s_ease-out_0.30s_both] flex-col">
        {name && (
          <Text
            variant="h1"
            className="text-name-text text-2xl leading-tight font-bold"
          >
            {name}
          </Text>
        )}
        {bio && (
          <Text className="text-bio-text mt-2 max-w-97 leading-relaxed tracking-tight">
            {bio}
          </Text>
        )}
      </div>
    </div>
  );
};
