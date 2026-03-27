import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';
import type { UserProfile } from '../types';

interface UseUserReturn {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const { session, profile, setProfile } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (fetchError) throw fetchError;
      if (data) setProfile(data as UserProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, setProfile]);

  return { userProfile: profile, loading, error, refetch };
}
