import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import type { InBioProfile } from '@/schemas/inBioMetadata.schema';

export const Identity = ({
  lensHandle,
  profile,
}: {
  lensHandle: string;
  profile: InBioProfile;
}) => {
  const { avatar, name, bio } = profile;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Avatar size="xl">
        <AvatarImage src={avatar} alt={name ?? lensHandle} />
        <AvatarFallback>
          {name
            ? name[0].toUpperCase()
            : lensHandle
              ? lensHandle[0].toUpperCase()
              : 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex animate-[fadeUp_0.3s_ease_0.15s_both] flex-col items-center">
        {name && (
          <h1 className="text-[1.375rem] leading-tight font-bold">{name}</h1>
        )}
        {bio && (
          <p className="mt-2 max-w-prose leading-relaxed tracking-tight">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
};
