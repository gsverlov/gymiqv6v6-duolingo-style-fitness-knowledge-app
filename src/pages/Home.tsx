import { motion } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { useUserStore } from '../store/useUserStore';
import { useProgress } from '../hooks/useProgress';
import { getLevelInfo } from '../lib/xp';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillTree } from '../components/skill-tree/SkillTree';

function SkeletonNode() {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="w-20 h-20 rounded-full"
        style={{ background: '#2a2a4a' }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      />
      <motion.div
        className="h-3 rounded-full"
        style={{ width: 80, background: '#2a2a4a' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
      />
    </div>
  );
}

export default function Home() {
  const profile = useUserStore((s) => s.profile);
  const { units, loading, error, refetch } = useProgress();

  const totalXp = profile?.total_xp ?? 0;
  const levelInfo = getLevelInfo(totalXp);

  return (
    <AppLayout>
      {/* XP Progress bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-center mb-2">
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#afafaf',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            Lv. {levelInfo.level} · {totalXp.toLocaleString()} XP
          </span>
        </div>
        <ProgressBar value={levelInfo.progress} color="green" height={8} />
      </div>

      {/* Skill tree content */}
      <div className="px-4">
        {loading ? (
          <div
            className="flex flex-col items-center gap-[60px] py-16"
            style={{ minHeight: 600 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonNode key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span style={{ fontSize: 48 }}>😅</span>
            <p
              style={{
                fontSize: 16,
                color: '#afafaf',
                textAlign: 'center',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
              }}
            >
              Couldn&apos;t load your progress.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={refetch}
              style={{
                background: '#58cc02',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              Try Again
            </motion.button>
          </div>
        ) : (
          <SkillTree units={units} />
        )}
      </div>
    </AppLayout>
  );
}
