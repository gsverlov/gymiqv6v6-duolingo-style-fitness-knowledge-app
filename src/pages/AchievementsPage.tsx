import { motion } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { AchievementCard } from '../components/achievements/AchievementCard';
import { useAchievements } from '../hooks/useAchievements';

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-40 rounded-2xl bg-surface-elevated" />
      ))}
    </div>
  );
}

export function AchievementsPage() {
  const { achievements, loading, error, unlockedCount, refetch } = useAchievements();

  const total = achievements.length;

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-extrabold text-text-primary">Achievements</h1>
          {!loading && (
            <p className="text-text-muted text-sm font-semibold mt-0.5">
              {unlockedCount} of {total} unlocked
            </p>
          )}
        </motion.div>

        {/* Progress bar */}
        {!loading && total > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-1.5"
          >
            <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / total) * 100}%` }}
                transition={{ type: 'spring', damping: 30, stiffness: 160, delay: 0.3 }}
              />
            </div>
            <p className="text-text-muted text-xs text-right font-semibold">
              {Math.round((unlockedCount / total) * 100)}% complete
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {loading && <SkeletonGrid />}

        {error && !loading && (
          <div className="text-center py-12 space-y-3">
            <p className="text-4xl">😓</p>
            <p className="text-text-secondary font-semibold">Couldn't load achievements</p>
            <button
              onClick={refetch}
              className="text-accent font-bold text-sm hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && achievements.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <p className="text-5xl">🏅</p>
            <p className="text-text-primary font-extrabold text-lg">No achievements yet</p>
            <p className="text-text-secondary text-sm">Complete lessons to earn badges!</p>
          </div>
        )}

        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {/* Unlocked first */}
            {[
              ...achievements.filter((a) => a.unlocked),
              ...achievements.filter((a) => !a.unlocked),
            ].map((ach, i) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
