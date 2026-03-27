// ── GymIQV6V6 — Streak Logic ────────────────────────────────────────────────
import type { StreakUpdate } from '../types';

export function getTodayUTC(): string {
  return new Date().toISOString().split('T')[0]!;
}

export function shouldIncrementStreak(lastActivityDate: string | null): boolean {
  if (!lastActivityDate) return true;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return lastActivityDate === yesterday;
}

export function shouldResetStreak(lastActivityDate: string | null): boolean {
  if (!lastActivityDate) return false;
  const today = getTodayUTC();
  if (lastActivityDate === today) return false;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return lastActivityDate !== yesterday;
}

/**
 * Calculates the new streak state after a lesson is completed today.
 *
 * Rules:
 * - Already completed a lesson today → no change (streak already credited)
 * - Last activity was yesterday → increment streak
 * - Last activity was 2+ days ago → reset to 1 (streak broken)
 * - No previous activity → start streak at 1
 *
 * Returns DB-ready fields plus a StreakUpdate summary for UI feedback.
 */
export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: string | null,
): { current_streak: number; longest_streak: number; last_activity_date: string } & StreakUpdate {
  const today = getTodayUTC();

  // Already completed a lesson today — streak is already counted
  if (lastActivityDate === today) {
    return {
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
      newStreak: currentStreak,
      longestStreak,
      streakChanged: false,
      wasReset: false,
    };
  }

  let newStreak: number;
  let wasReset = false;

  if (shouldIncrementStreak(lastActivityDate)) {
    newStreak = currentStreak + 1;
  } else if (shouldResetStreak(lastActivityDate)) {
    newStreak = 1;
    wasReset = true;
  } else {
    newStreak = currentStreak;
  }

  const newLongest = Math.max(newStreak, longestStreak);

  return {
    current_streak: newStreak,
    longest_streak: newLongest,
    last_activity_date: today,
    newStreak,
    longestStreak: newLongest,
    streakChanged: newStreak !== currentStreak,
    wasReset,
  };
}
