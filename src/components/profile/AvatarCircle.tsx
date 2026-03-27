import { Flame } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import type { ComponentProps } from 'react';

type AvatarSize = NonNullable<ComponentProps<typeof Avatar>['size']>;

interface AvatarCircleProps {
  name: string;
  streak: number;
  size?: AvatarSize;
}

export function AvatarCircle({ name, streak, size = 'lg' }: AvatarCircleProps) {
  const hasStreak = streak > 0;

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      {/* Ring glow when streak active */}
      <div
        className={[
          'rounded-full p-[3px] transition-all duration-300',
          hasStreak
            ? 'bg-gradient-to-br from-[#ff9500] via-[#ff6b00] to-[#ffc800]'
            : 'bg-border',
        ].join(' ')}
      >
        <div className="rounded-full bg-bg p-[2px]">
          <Avatar name={name} size={size} />
        </div>
      </div>

      {/* Streak badge */}
      {hasStreak && (
        <div className="flex items-center gap-1 bg-surface border border-border rounded-full px-2 py-0.5 -mt-1">
          <Flame size={12} className="text-[#ff9500]" fill="#ff9500" />
          <span className="text-[11px] font-extrabold text-[#ff9500]">{streak}</span>
        </div>
      )}
    </div>
  );
}
