import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { LeaderboardEntry } from '../types';
import { useUserStore } from '../store/useUserStore';

interface UseLeaderboardReturn {
  entries: LeaderboardEntry[];
  currentUserEntry: LeaderboardEntry | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeaderboard(): UseLeaderboardReturn {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useUserStore();

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('id, display_name, weekly_xp, level')
        .order('weekly_xp', { ascending: false })
        .limit(20);

      if (fetchError) throw fetchError;

      const ranked: LeaderboardEntry[] = (data ?? []).map((row, index) => ({
        user_id: row.id as string,
        display_name: row.display_name as string,
        weekly_xp: row.weekly_xp as number,
        level: row.level as number,
        rank: index + 1,
      }));

      setEntries(ranked);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentUserEntry =
    session?.user
      ? (entries.find((e) => e.user_id === session.user.id) ?? null)
      : null;

  return {
    entries: entries.slice(0, 10),
    currentUserEntry,
    loading,
    error,
    refetch: fetchLeaderboard,
  };
}
