import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile, ToastNotification } from '../types';
import { getLevelFromXp } from '../lib/xp';

interface UserState {
  session: Session | null;
  profile: UserProfile | null;
  toasts: ToastNotification[];

  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addXp: (amount: number) => void;
  loseHeart: () => void;
  incrementStreak: () => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  clearSession: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  session: null,
  profile: null,
  toasts: [],

  setSession: (session) => set({ session }),

  setProfile: (profile) => set({ profile }),

  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),

  addXp: (amount) =>
    set((state) => {
      if (!state.profile) return {};
      const newXp = state.profile.total_xp + amount;
      const newWeeklyXp = state.profile.weekly_xp + amount;
      const newLevel = getLevelFromXp(newXp);
      return {
        profile: {
          ...state.profile,
          total_xp: newXp,
          weekly_xp: newWeeklyXp,
          level: newLevel,
        },
      };
    }),

  loseHeart: () =>
    set((state) => {
      if (!state.profile) return {};
      const newHearts = Math.max(0, state.profile.hearts - 1);
      const nextHeartAt =
        newHearts < 3
          ? new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
          : null;
      return {
        profile: {
          ...state.profile,
          hearts: newHearts,
          next_heart_at: nextHeartAt,
        },
      };
    }),

  incrementStreak: () =>
    set((state) => {
      if (!state.profile) return {};
      const today = new Date().toISOString().split('T')[0];
      const lastDate = state.profile.last_activity_date;

      if (lastDate === today) return {}; // already counted today

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak =
        lastDate === yesterday ? state.profile.current_streak + 1 : 1;
      const longestStreak = Math.max(newStreak, state.profile.longest_streak);

      return {
        profile: {
          ...state.profile,
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: today,
        },
      };
    }),

  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearSession: () => set({ session: null, profile: null, toasts: [] }),
}));
