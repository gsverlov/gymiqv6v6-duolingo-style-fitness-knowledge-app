import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { AchievementWithStatus } from '../../types';

interface AchievementCardProps {
  achievement: AchievementWithStatus;
  delay?: number;
}

export function AchievementCard({ achievement, delay = 0 }: AchievementCardProps) {
  const { title, description, icon_emoji, unlocked, unlocked_at } = achievement;

  const formattedDate = unlocked_at
    ? new Date(unlocked_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
      whileHover={unlocked ? { scale: 1.03 } : undefined}
      className={[
        'relative rounded-2xl p-4 flex flex-col items-center text-center gap-2 transition-all duration-200 border',
        unlocked
          ? 'bg-surface border-border hover:border-accent/40 cursor-default'
          : 'bg-surface/50 border-border/50',
      ].join(' ')}
      style={
        unlocked
          ? { boxShadow: '0 0 0 0 transparent' }
          : undefined
      }
    >
      {/* Emoji / Lock */}
      <div
        className={[
          'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl',
          unlocked
            ? 'bg-accent/10 border border-accent/20'
            : 'bg-surface-elevated border border-border',
        ].join(' ')}
      >
        {unlocked ? (
          <span role="img" aria-label={title}>
            {icon_emoji}
          </span>
        ) : (
          <Lock size={22} className="text-text-muted" />
        )}
      </div>

      {/* Title */}
      <p
        className={`text-sm font-extrabold leading-tight ${
          unlocked ? 'text-text-primary' : 'text-text-muted'
        }`}
      >
        {title}
      </p>

      {/* Description */}
      <p className="text-text-muted text-xs leading-snug">{description}</p>

      {/* Unlocked date */}
      {unlocked && formattedDate && (
        <p className="text-accent text-[10px] font-bold mt-auto pt-1">
          ✓ {formattedDate}
        </p>
      )}

      {/* Glow for unlocked */}
      {unlocked && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(88,204,2,0.08)' }}
        />
      )}
    </motion.div>
  );
}
