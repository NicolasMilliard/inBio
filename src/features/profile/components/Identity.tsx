import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import type { LensProfile } from '@/helpers';

export const Identity = ({ account }: { account: LensProfile }) => {
  const { avatar, name, handle, bio } = account;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Avatar size="xl">
        <AvatarImage src={avatar} alt={name ?? handle} />
        <AvatarFallback>
          {name
            ? name[0].toUpperCase()
            : handle
              ? handle[0].toUpperCase()
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
