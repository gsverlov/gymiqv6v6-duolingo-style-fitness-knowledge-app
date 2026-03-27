import { motion } from 'framer-motion';
import { Flame, Zap, BookOpen, Target } from 'lucide-react';

interface StatsGridProps {
  streak: number;
  longestStreak: number;
  totalXp: number;
  lessonsCompleted: number;
  accuracy: number; // 0-100
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  delay: number;
}

function StatCard({ icon, value, label, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay }}
      className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-2"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-text-primary">{value}</p>
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wide mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsGrid({ streak, longestStreak, totalXp, lessonsCompleted, accuracy }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        icon={<Flame size={20} />}
        value={`${streak}d`}
        label="Current Streak"
        color="#ff9500"
        delay={0}
      />
      <StatCard
        icon={<Flame size={20} />}
        value={`${longestStreak}d`}
        label="Best Streak"
        color="#ffc800"
        delay={0.05}
      />
      <StatCard
        icon={<Zap size={20} />}
        value={totalXp.toLocaleString()}
        label="Total XP"
        color="#58cc02"
        delay={0.1}
      />
      <StatCard
        icon={<BookOpen size={20} />}
        value={lessonsCompleted}
        label="Lessons Done"
        color="#1cb0f6"
        delay={0.15}
      />
      <StatCard
        icon={<Target size={20} />}
        value={`${accuracy}%`}
        label="Accuracy"
        color="#ce82ff"
        delay={0.2}
      />
    </div>
  );
}
