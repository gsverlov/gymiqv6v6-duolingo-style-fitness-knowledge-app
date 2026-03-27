import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { UnitWithProgress } from '../../types';

interface SkillNodeProps {
  unit: UnitWithProgress;
  onTap: (unit: UnitWithProgress) => void;
  position: { x: string; y: number };
}

function StarRating({ stars, total = 3 }: { stars: number; total?: number }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{ fontSize: 12 }}>
          {i < stars ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}

function CircularProgress({
  progress,
  size = 80,
}: {
  progress: number;
  size?: number;
}) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
    >
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#2a2a4a"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#58cc02"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function SkillNode({ unit, onTap, position }: SkillNodeProps) {
  const [showLockedTooltip, setShowLockedTooltip] = useState(false);
  const { nodeState, emoji, title, progress } = unit;

  const isLocked = nodeState === 'locked';

  const handlePress = () => {
    if (isLocked) {
      setShowLockedTooltip(true);
      setTimeout(() => setShowLockedTooltip(false), 2000);
    } else {
      onTap(unit);
    }
  };

  const completionProgress =
    progress && progress.total_lessons > 0
      ? (progress.lessons_completed / progress.total_lessons) * 100
      : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, 0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {/* Node circle */}
      <motion.button
        onClick={handlePress}
        disabled={isLocked}
        whileHover={!isLocked ? { scale: 1.05 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isLocked ? 'not-allowed' : 'pointer',
          opacity: isLocked ? 0.6 : 1,
          border: 'none',
          padding: 0,
          background:
            nodeState === 'completed'
              ? 'linear-gradient(135deg, #58cc02, #46a302)'
              : nodeState === 'in_progress'
              ? 'linear-gradient(135deg, rgba(88,204,2,0.15), rgba(88,204,2,0.05))'
              : nodeState === 'available'
              ? 'linear-gradient(135deg, rgba(88,204,2,0.15), rgba(88,204,2,0.05))'
              : 'linear-gradient(135deg, #2a2a4a, #1a1a2e)',
          boxShadow:
            nodeState === 'completed'
              ? '0 4px 0 #46a302, 0 0 20px rgba(88,204,2,0.3)'
              : nodeState === 'available' || nodeState === 'in_progress'
              ? '0 4px 0 rgba(0,0,0,0.4), 0 0 0 2px rgba(88,204,2,0.3)'
              : '0 2px 0 rgba(0,0,0,0.4)',
        }}
        animate={
          nodeState === 'available'
            ? {
                boxShadow: [
                  '0 4px 0 rgba(0,0,0,0.4), 0 0 0px rgba(88,204,2,0)',
                  '0 4px 0 rgba(0,0,0,0.4), 0 0 12px rgba(88,204,2,0.4)',
                  '0 4px 0 rgba(0,0,0,0.4), 0 0 0px rgba(88,204,2,0)',
                ],
              }
            : undefined
        }
        transition={
          nodeState === 'available'
            ? { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            : { duration: 0.08 }
        }
      >
        {/* Circular progress ring for in_progress */}
        {nodeState === 'in_progress' && (
          <CircularProgress progress={completionProgress} size={80} />
        )}

        {/* Content */}
        {isLocked ? (
          <Lock size={28} color="#6b6b8a" />
        ) : (
          <span style={{ fontSize: 32, lineHeight: 1 }}>{emoji}</span>
        )}

        {/* Completed checkmark overlay */}
        {nodeState === 'completed' && (
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              background: '#58cc02',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #0f0f1a',
            }}
          >
            <CheckCircle2 size={14} color="white" />
          </div>
        )}
      </motion.button>

      {/* Progress count for in_progress */}
      {nodeState === 'in_progress' && progress && (
        <span
          style={{
            fontSize: 10,
            color: '#58cc02',
            fontWeight: 700,
            marginTop: 2,
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          {progress.lessons_completed}/{progress.total_lessons}
        </span>
      )}

      {/* Unit title */}
      <span
        style={{
          marginTop: nodeState === 'in_progress' ? 2 : 8,
          fontSize: 12,
          fontWeight: 700,
          color:
            isLocked
              ? '#6b6b8a'
              : nodeState === 'completed'
              ? '#58cc02'
              : '#ffffff',
          textAlign: 'center',
          maxWidth: 90,
          lineHeight: 1.2,
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        {title}
      </span>

      {/* Stars for completed */}
      {nodeState === 'completed' && <StarRating stars={unit.stars ?? 0} />}

      {/* Locked tooltip */}
      <AnimatePresence>
        {showLockedTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a2e',
              border: '1px solid #2a2a4a',
              borderRadius: 8,
              padding: '6px 10px',
              fontSize: 11,
              color: '#afafaf',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontFamily: 'Nunito, sans-serif',
              zIndex: 20,
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            🔒 Complete previous unit to unlock
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
