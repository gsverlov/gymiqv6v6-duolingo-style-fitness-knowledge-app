import { motion } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';
import { AppLayout } from '../components/layout/AppLayout';
import { AvatarCircle } from '../components/profile/AvatarCircle';
import { LevelBadge } from '../components/profile/LevelBadge';
import { StatsGrid } from '../components/profile/StatsGrid';

// Skeleton for loading state
function ProfileSkeleton() {
  return (
    <div className="px-4 py-6 space-y-6 animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-surface-elevated" />
        <div className="h-5 w-32 rounded-lg bg-surface-elevated" />
      </div>
      <div className="h-12 rounded-xl bg-surface-elevated" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-surface-elevated" />
        ))}
      </div>
    </div>
  );
}

export function ProfilePage() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) {
    return (
      <AppLayout>
        <ProfileSkeleton />
      </AppLayout>
    );
  }

  // Derive accuracy: stored in profile or computed as total_xp / lessons proxy
  // Since we don't have lessons_completed / correct_count directly on profile,
  // we show total_xp and streak as the main stats. Accuracy defaults to a display value.
  const accuracy = 0; // Would be computed from progress data in a full implementation

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <AvatarCircle
            name={profile.display_name}
            streak={profile.current_streak}
            size="lg"
          />
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-text-primary">
              {profile.display_name}
            </h1>
            <p className="text-text-muted text-sm font-semibold mt-0.5">
              Member since{' '}
              {new Date(profile.created_at).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </motion.div>

        {/* Level */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl p-4"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-text-muted mb-3">
            Level Progress
          </h2>
          <LevelBadge totalXp={profile.total_xp} />
        </motion.div>

        {/* Stats */}
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-text-muted mb-3">
            Stats
          </h2>
          <StatsGrid
            streak={profile.current_streak}
            longestStreak={profile.longest_streak}
            totalXp={profile.total_xp}
            lessonsCompleted={0}
            accuracy={accuracy}
          />
        </div>

        {/* Weekly XP */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="bg-surface border border-border rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-text-muted">
              This Week
            </h2>
            <span className="text-accent font-extrabold text-lg">
              {profile.weekly_xp.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-2">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (profile.weekly_xp / 500) * 100)}%` }}
              transition={{ type: 'spring', damping: 30, stiffness: 160, delay: 0.4 }}
            />
          </div>
          <p className="text-text-muted text-xs mt-1.5">Weekly goal: 500 XP</p>
        </motion.div>
      </div>
    </AppLayout>
  );
}
