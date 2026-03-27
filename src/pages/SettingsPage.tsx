import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, ChevronRight, User, Bell, Volume2, Shield, Info } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useUserStore } from '../store/useUserStore';

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  icon: React.ReactNode;
}

function SettingToggle({ enabled, onChange, label, description, icon }: ToggleProps) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-text-secondary flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary font-bold text-sm">{label}</p>
        {description && (
          <p className="text-text-muted text-xs mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={[
          'relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0',
          enabled ? 'bg-accent' : 'bg-surface-elevated border border-border',
        ].join(' ')}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      </button>
    </div>
  );
}

interface SettingRowProps {
  label: string;
  value?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

function SettingRow({ label, value, icon, onClick, danger = false }: SettingRowProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={[
        'flex items-center gap-3 py-3.5 w-full text-left transition-colors duration-150',
        onClick ? 'hover:bg-surface-elevated/50 active:bg-surface-elevated rounded-xl px-2 -mx-2' : '',
        danger ? 'text-danger' : '',
      ].join(' ')}
    >
      <div
        className={[
          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
          danger ? 'bg-danger/10' : 'bg-surface-elevated',
        ].join(' ')}
      >
        <span className={danger ? 'text-danger' : 'text-text-secondary'}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm ${danger ? 'text-danger' : 'text-text-primary'}`}>
          {label}
        </p>
        {value && <p className="text-text-muted text-xs mt-0.5">{value}</p>}
      </div>
      {onClick && !danger && <ChevronRight size={16} className="text-text-muted flex-shrink-0" />}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-border" />;
}

export function SettingsPage() {
  const profile = useUserStore((s) => s.profile);
  const { signOut } = useAuth();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
  }

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-extrabold text-text-primary"
        >
          Settings
        </motion.h1>

        {/* Account section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-surface border border-border rounded-2xl px-4 py-1 divide-y divide-border"
        >
          <SettingRow
            label="Display Name"
            value={profile?.display_name ?? '—'}
            icon={<User size={16} />}
          />
          <SettingRow
            label="Account"
            value={profile ? 'Email & password' : '—'}
            icon={<Shield size={16} />}
          />
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl px-4 py-1 divide-y divide-border"
        >
          <SettingToggle
            icon={<Volume2 size={16} />}
            label="Sound Effects"
            description="Play sounds on correct / wrong answers"
            enabled={soundEnabled}
            onChange={setSoundEnabled}
          />
          <Divider />
          <SettingToggle
            icon={<Bell size={16} />}
            label="Streak Reminders"
            description="Daily nudge to keep your streak alive"
            enabled={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-surface border border-border rounded-2xl px-4 py-1"
        >
          <SettingRow
            label="About GymIQ"
            value="v1.0.0"
            icon={<Info size={16} />}
          />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="space-y-3"
        >
          {!showConfirmLogout ? (
            <button
              onClick={() => setShowConfirmLogout(true)}
              className="w-full flex items-center gap-3 py-3.5 px-4 bg-surface border border-border rounded-2xl hover:border-danger/30 hover:bg-danger/5 active:bg-danger/10 transition-all duration-150"
            >
              <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                <LogOut size={16} className="text-danger" />
              </div>
              <span className="text-danger font-bold text-sm">Sign Out</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-danger/30 rounded-2xl p-4 space-y-3"
            >
              <p className="text-text-primary font-bold text-center">Sign out of GymIQ?</p>
              <p className="text-text-muted text-sm text-center">
                Your progress is saved. You can sign back in anytime.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setShowConfirmLogout(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  loading={signingOut}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
