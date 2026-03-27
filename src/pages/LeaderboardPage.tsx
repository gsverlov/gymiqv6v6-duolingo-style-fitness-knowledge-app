import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { LeaderboardRow } from '../components/leaderboard/LeaderboardRow';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { Button } from '../components/ui/Button';

// Skeleton rows
function SkeletonRows() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-surface-elevated" />
      ))}
    </div>
  );
}

export function LeaderboardPage() {
  const { entries, currentUserEntry, loading, error, refetch } = useLeaderboard();

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">Leaderboard</h1>
            <p className="text-text-muted text-sm font-semibold mt-0.5">Top learners this week</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refetch}
            disabled={loading}
            aria-label="Refresh leaderboard"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </Button>
        </motion.div>

        {/* Your position (if not in top 10) */}
        {currentUserEntry && currentUserEntry.rank > 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-2">
              Your Position
            </p>
            <LeaderboardRow
              entry={currentUserEntry}
              isCurrentUser
              delay={0}
            />
          </motion.div>
        )}

        {/* Top 10 */}
        <div>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-2">
            Top 10
          </p>

          {loading && <SkeletonRows />}

          {error && !loading && (
            <div className="text-center py-12 space-y-3">
              <p className="text-4xl">😓</p>
              <p className="text-text-secondary font-semibold">Couldn't load leaderboard</p>
              <Button variant="outline" size="sm" onClick={refetch}>
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <p className="text-4xl">🏆</p>
              <p className="text-text-primary font-extrabold text-lg">Be first!</p>
              <p className="text-text-secondary text-sm">Complete lessons to appear here.</p>
            </div>
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="space-y-2">
              {entries.map((entry, i) => (
                <LeaderboardRow
                  key={entry.user_id}
                  entry={entry}
                  isCurrentUser={entry.user_id === currentUserEntry?.user_id}
                  delay={i * 0.04}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
