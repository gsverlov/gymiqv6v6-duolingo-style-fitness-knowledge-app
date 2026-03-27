import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Trophy, User, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/leaderboard', icon: Trophy, label: 'Rank' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg border-t border-border">
      <div className="max-w-[480px] mx-auto flex items-center h-16">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <motion.button
              key={path}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.08 }}
              onClick={() => navigate(path)}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer',
                active ? 'text-accent' : 'text-text-muted',
              ].join(' ')}
            >
              <Icon size={22} />
              <span className="text-[10px] font-semibold">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
