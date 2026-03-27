import { AnimatePresence } from 'framer-motion';
import { useUserStore } from '../../store/useUserStore';
import { Toast } from '../ui/Toast';

export function ToastContainer() {
  const toasts = useUserStore((s) => s.toasts);
  const removeToast = useUserStore((s) => s.removeToast);

  return (
    <AnimatePresence>
      {toasts.length > 0 && (
        <Toast toasts={toasts} onRemove={removeToast} />
      )}
    </AnimatePresence>
  );
}
