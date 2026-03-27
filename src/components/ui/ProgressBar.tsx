import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  color?: 'green' | 'gold' | 'blue';
  height?: number;
  className?: string;
}

const colorMap: Record<'green' | 'gold' | 'blue', string> = {
  green: '#58cc02',
  gold: '#ffc800',
  blue: '#1cb0f6',
};

export function ProgressBar({
  value,
  color = 'green',
  height = 8,
  className = '',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={['w-full bg-surface-elevated rounded-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        animate={{ width: `${clampedValue}%` }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        style={{ backgroundColor: colorMap[color] }}
      />
    </div>
  );
}
