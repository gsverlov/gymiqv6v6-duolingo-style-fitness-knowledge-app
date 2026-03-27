import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AchievementWithStatus } from '../types';
import { useUserStore } from '../store/useUserStore';

interface UseAchievementsReturn {
  achievements: AchievementWithStatus[];
  loading: boolean;
  error: string | null;
  unlockedCount: number;
  refetch: () => void;
}

export function useAchievements(): UseAchievementsReturn {
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useUserStore();

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [allRes, userRes] = await Promise.all([
        supabase.from('achievements').select('*').order('created_at', { ascending: true }),
        session?.user
          ? supabase
              .from('user_achievements')
              .select('achievement_id, unlocked_at')
              .eq('user_id', session.user.id)
          : Promise.resolve({ data: [], error: null }),
      ]);

      if (allRes.error) throw allRes.error;

      const unlockedMap = new Map<string, string>(
        (userRes.data ?? []).map((ua) => [
          ua.achievement_id as string,
          ua.unlocked_at as string,
        ])
      );

      const combined: AchievementWithStatus[] = (allRes.data ?? []).map((ach) => ({
        id: ach.id as string,
        key: ach.key as string,
        title: ach.title as string,
        description: ach.description as string,
        icon_emoji: ach.icon_emoji as string,
        created_at: ach.created_at as string,
        updated_at: ach.updated_at as string,
        unlocked: unlockedMap.has(ach.id as string),
        unlocked_at: unlockedMap.get(ach.id as string) ?? null,
      }));

      setAchievements(combined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load achievements');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return { achievements, loading, error, unlockedCount, refetch: fetchAchievements };
}
