import { motion } from 'framer-motion';

interface PathConnectorProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  completed: boolean;
}

export function PathConnector({ fromX, fromY, toX, toY, completed }: PathConnectorProps) {
  const stroke = completed ? '#58cc02' : '#2a2a4a';

  // Calculate total path length for animation
  const dx = toX - fromX;
  const dy = toY - fromY;
  const pathLength = Math.sqrt(dx * dx + dy * dy);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <motion.line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={stroke}
        strokeWidth={3}
        strokeDasharray="8 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
        strokeLinecap="round"
        // pathLength is 0-1 for framer, actual dashes need strokeDashoffset
        style={{ strokeDashoffset: completed ? 0 : pathLength }}
      />
    </svg>
  );
}
