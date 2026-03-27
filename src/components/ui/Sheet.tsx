import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { slideFromBottom } from '../../lib/animations';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Sheet({ open, onClose, children, className = '' }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet Panel */}
          <motion.div
            className={[
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-surface rounded-t-3xl border-t border-border',
              'overflow-y-auto',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ maxHeight: '70vh' }}
            variants={slideFromBottom}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle indicator */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
