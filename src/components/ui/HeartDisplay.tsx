import { Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface HeartDisplayProps {
  count: number;
  animateLoss?: boolean;
}

export function HeartDisplay({ count, animateLoss = false }: HeartDisplayProps) {
  return (
    <div className="flex items-center gap-0.5">
      <AnimatePresence>
        {[0, 1, 2].map((i) => {
          const filled = i < count;
          const isLost = animateLoss && i === count;
          return (
            <motion.div
              key={i}
              initial={isLost ? { scale: 1, opacity: 1 } : false}
              animate={isLost ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
              transition={isLost ? { duration: 0.4 } : {}}
            >
              <Heart
                size={20}
                className={filled ? 'text-[#ff4b4b]' : 'text-[#2a2a4a]'}
                fill={filled ? '#ff4b4b' : 'transparent'}
                strokeWidth={filled ? 0 : 2}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
