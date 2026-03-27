import { motion } from 'framer-motion';
import { getLevelInfo } from '../../lib/xp';

interface LevelBadgeProps {
  totalXp: number;
}

const LEVEL_TITLES: Record<number, string> = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Trainee',
  4: 'Athlete',
  5: 'Fit',
  6: 'Strong',
  7: 'Expert',
  8: 'Elite',
  9: 'Champion',
  10: 'Legend',
};

export function LevelBadge({ totalXp }: LevelBadgeProps) {
  const { level, minXp, maxXp, progress } = getLevelInfo(totalXp);
  const title = LEVEL_TITLES[level] ?? 'Legend';
  const xpInLevel = totalXp - minXp;
  const xpNeeded = maxXp - minXp;

  return (
    <div className="w-full space-y-2">
      {/* Level pill + title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-accent/20 border border-accent/40 rounded-lg px-2.5 py-1">
            <span className="text-accent font-extrabold text-sm">Lvl {level}</span>
          </div>
          <span className="text-text-secondary font-bold text-sm">{title}</span>
        </div>
        <span className="text-text-muted text-xs font-semibold">
          {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-surface-elevated rounded-full overflow-hidden h-3">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', damping: 30, stiffness: 180, delay: 0.2 }}
        />
      </div>

      {/* Next level hint */}
      {level < 10 && (
        <p className="text-text-muted text-xs text-right">
          {(xpNeeded - xpInLevel).toLocaleString()} XP to next level
        </p>
      )}
      {level >= 10 && (
        <p className="text-accent text-xs text-right font-bold">✨ Max level reached!</p>
      )}
    </div>
  );
}
