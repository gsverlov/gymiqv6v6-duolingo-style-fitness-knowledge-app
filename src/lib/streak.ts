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

export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: string | null
): { current_streak: number; longest_streak: number; last_activity_date: string } {
  const today = getTodayUTC();

  if (lastActivityDate === today) {
    return {
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
    };
  }

  let newStreak: number;
  if (shouldIncrementStreak(lastActivityDate)) {
    newStreak = currentStreak + 1;
  } else if (shouldResetStreak(lastActivityDate)) {
    newStreak = 1;
  } else {
    newStreak = currentStreak;
  }

  const newLongest = Math.max(newStreak, longestStreak);

  return {
    current_streak: newStreak,
    longest_streak: newLongest,
    last_activity_date: today,
  };
}
