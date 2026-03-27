import { AnimatePresence, motion } from 'framer-motion';
import type { ToastNotification } from '../../types';

interface ToastProps {
  toasts: ToastNotification[];
  onRemove: (id: string) => void;
}

const borderColorMap: Record<ToastNotification['color'], string> = {
  green: 'border-accent/60',
  gold: 'border-gold/50',
  blue: 'border-info/50',
  red: 'border-danger/50',
};

const textColorMap: Record<ToastNotification['color'], string> = {
  green: 'text-accent',
  gold: 'text-gold',
  blue: 'text-info',
  red: 'text-danger',
};

export function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ y: -80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className={[
              'pointer-events-auto w-full',
              'bg-surface border rounded-xl px-4 py-3',
              'flex items-center gap-3 shadow-xl',
              borderColorMap[toast.color],
            ].join(' ')}
          >
            {/* Icon */}
            <span className="text-xl leading-none flex-shrink-0" role="img" aria-hidden="true">
              {toast.icon}
            </span>

            {/* Message */}
            <p className={['flex-1 text-sm font-bold font-sans', textColorMap[toast.color]].join(' ')}>
              {toast.message}
            </p>

            {/* Close button */}
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 text-text-muted hover:text-text-secondary transition-colors duration-150 leading-none text-lg font-bold"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
