import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface GoalCardProps {
  emoji: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function GoalCard({ emoji, title, description, selected, onSelect }: GoalCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={[
        'w-full p-4 rounded-2xl border-2 flex items-center gap-4',
        'transition-all duration-200 cursor-pointer text-left',
        selected
          ? 'bg-accent/10 border-accent'
          : 'bg-surface border-border hover:border-border/70',
      ].join(' ')}
    >
      {/* Emoji circle */}
      <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-surface-elevated flex-shrink-0">
        {emoji}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>

      {/* Selection indicator */}
      {selected ? (
        <CheckCircle2 size={22} className="text-accent flex-shrink-0" />
      ) : (
        <div className="w-6 h-6 rounded-full border-2 border-border flex-shrink-0" />
      )}
    </motion.button>
  );
}
