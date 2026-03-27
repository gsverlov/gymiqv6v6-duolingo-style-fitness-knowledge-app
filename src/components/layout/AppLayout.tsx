import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { Toast } from '../ui/Toast';
import { useUserStore } from '../../store/useUserStore';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const toasts = useUserStore((s) => s.toasts);
  const removeToast = useUserStore((s) => s.removeToast);

  return (
    <div className="max-w-[480px] mx-auto min-h-screen flex flex-col bg-bg relative">
      <TopBar />
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
