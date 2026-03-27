import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';
import { STATIC_UNITS } from '../data/units';
import type { UnitWithProgress, UnitNodeState, UserUnitProgress, UserLessonProgress, Lesson } from '../types';

interface UseProgressReturn {
  units: UnitWithProgress[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function deriveNodeState(
  progress: UserUnitProgress | null,
  sortOrder: number
): UnitNodeState {
  if (!progress) {
    return sortOrder <= 3 ? 'available' : 'locked';
  }
  if (progress.is_completed) return 'completed';
  if (progress.lessons_completed > 0) return 'in_progress';
  if (progress.is_unlocked || sortOrder <= 3) return 'available';
  return 'locked';
}

function computeStars(
  lessons: Lesson[],
  lessonProgressList: UserLessonProgress[]
): number {
  if (lessons.length === 0) return 0;
  const completedLessons = lessonProgressList.filter((lp) =>
    lessons.some((l) => l.id === lp.lesson_id) && lp.status === 'completed'
  );
  if (completedLessons.length === 0) return 0;
  const totalStars = completedLessons.reduce((sum, lp) => sum + (lp.stars ?? 1), 0);
  return Math.round(totalStars / completedLessons.length);
}

const isSupabaseConfigured =
  !!import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

export function useProgress(): UseProgressReturn {
  const { session } = useUserStore();
  const [units, setUnits] = useState<UnitWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildFromStaticData = useCallback(() => {
    const result: UnitWithProgress[] = STATIC_UNITS.map((u) => ({
      ...u,
      lessons: u.lessons as Lesson[],
      progress: null,
      nodeState: u.sort_order <= 3 ? 'available' : 'locked',
      stars: 0,
    }));
    setUnits(result);
    setLoading(false);
    setError(null);
  }, []);

  const fetchFromSupabase = useCallback(async () => {
    if (!session?.user?.id) {
      buildFromStaticData();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [unitsResult, lessonsResult, unitProgressResult, lessonProgressResult] =
        await Promise.all([
          supabase.from('units').select('*').order('sort_order'),
          supabase.from('lessons').select('*').order('sort_order'),
          supabase
            .from('user_unit_progress')
            .select('*')
            .eq('user_id', session.user.id),
          supabase
            .from('user_lesson_progress')
            .select('*')
            .eq('user_id', session.user.id),
        ]);

      if (unitsResult.error) throw unitsResult.error;
      if (lessonsResult.error) throw lessonsResult.error;

      const dbUnits = (unitsResult.data ?? []) as UnitWithProgress[];
      const dbLessons = (lessonsResult.data ?? []) as Lesson[];
      const unitProgressMap = new Map<string, UserUnitProgress>(
        ((unitProgressResult.data ?? []) as UserUnitProgress[]).map((p) => [p.unit_id, p])
      );
      const lessonProgressList = (lessonProgressResult.data ?? []) as UserLessonProgress[];

      const sourceUnits = dbUnits.length > 0 ? dbUnits : STATIC_UNITS;
      const sourceLessons = dbLessons.length > 0 ? dbLessons : STATIC_UNITS.flatMap((u) => u.lessons as Lesson[]);

      const result: UnitWithProgress[] = sourceUnits.map((unit) => {
        const lessons = sourceLessons.filter((l) => l.unit_id === unit.id);
        const progress = unitProgressMap.get(unit.id) ?? null;
        const nodeState = deriveNodeState(progress, unit.sort_order);
        const stars = computeStars(lessons, lessonProgressList);
        return {
          ...unit,
          lessons,
          progress,
          nodeState,
          stars,
        };
      });

      setUnits(result);
    } catch (err) {
      console.error('useProgress fetch error:', err);
      // Fall back to static data on error
      buildFromStaticData();
      setError(err instanceof Error ? err.message : 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, buildFromStaticData]);

  const refetch = useCallback(async () => {
    if (!isSupabaseConfigured) {
      buildFromStaticData();
    } else {
      await fetchFromSupabase();
    }
  }, [fetchFromSupabase, buildFromStaticData]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      buildFromStaticData();
    } else {
      fetchFromSupabase();
    }
  }, [fetchFromSupabase, buildFromStaticData]);

  return { units, loading, error, refetch };
}
