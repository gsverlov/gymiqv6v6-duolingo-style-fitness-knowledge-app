import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import type { LeaderboardEntry } from '../../types';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  delay?: number;
}

const RANK_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-[#ffc800]/10', text: 'text-[#ffc800]', border: 'border-[#ffc800]/30' },
  2: { bg: 'bg-[#c0c0c0]/10', text: 'text-[#c0c0c0]', border: 'border-[#c0c0c0]/30' },
  3: { bg: 'bg-[#cd7f32]/10', text: 'text-[#cd7f32]', border: 'border-[#cd7f32]/30' },
};

function RankBadge({ rank }: { rank: number }) {
  const style = RANK_STYLES[rank];

  if (!style) {
    return (
      <span className="w-8 text-center text-text-muted text-sm font-extrabold">
        {rank}
      </span>
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center border ${style.bg} ${style.border}`}
    >
      {rank === 1 ? (
        <Trophy size={16} className={style.text} />
      ) : (
        <span className={`text-sm font-extrabold ${style.text}`}>{rank}</span>
      )}
    </div>
  );
}

export function LeaderboardRow({ entry, isCurrentUser, delay = 0 }: LeaderboardRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
      className={[
        'flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200',
        isCurrentUser
          ? 'bg-accent/10 border-accent/30'
          : 'bg-surface border-border',
      ].join(' ')}
    >
      {/* Rank */}
      <RankBadge rank={entry.rank} />

      {/* Avatar */}
      <Avatar name={entry.display_name} size="sm" />

      {/* Name + Level */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-extrabold text-sm truncate ${
            isCurrentUser ? 'text-accent' : 'text-text-primary'
          }`}
        >
          {entry.display_name}
          {isCurrentUser && (
            <span className="ml-1.5 text-[10px] font-bold text-accent/70 uppercase tracking-wide">
              You
            </span>
          )}
        </p>
        <p className="text-text-muted text-xs font-semibold">Level {entry.level}</p>
      </div>

      {/* XP */}
      <div className="text-right">
        <p className={`text-sm font-extrabold ${isCurrentUser ? 'text-accent' : 'text-text-primary'}`}>
          {entry.weekly_xp.toLocaleString()}
        </p>
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wide">XP</p>
      </div>
    </motion.div>
  );
}
