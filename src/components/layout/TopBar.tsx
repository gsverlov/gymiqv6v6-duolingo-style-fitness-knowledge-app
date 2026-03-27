import { Flame } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { HeartDisplay } from '../ui/HeartDisplay';

export function TopBar() {
  const profile = useUserStore((s) => s.profile);

  return (
    <header className="sticky top-0 z-40 bg-bg border-b border-border">
      <div className="max-w-[480px] mx-auto flex items-center justify-between h-14 px-4">
        {/* Left: streak */}
        {profile === null ? (
          <div className="w-12 h-5 rounded-md bg-surface-elevated animate-pulse" />
        ) : (
          <div className="flex items-center gap-1">
            <Flame size={20} className="text-gold" />
            <span className="text-gold font-bold">{profile.current_streak}</span>
          </div>
        )}

        {/* Center: wordmark */}
        <span className="font-black text-lg text-text-primary">GymIQ</span>

        {/* Right: hearts */}
        {profile === null ? (
          <div className="w-16 h-5 rounded-md bg-surface-elevated animate-pulse" />
        ) : (
          <HeartDisplay count={profile.hearts} />
        )}
      </div>
    </header>
  );
}
