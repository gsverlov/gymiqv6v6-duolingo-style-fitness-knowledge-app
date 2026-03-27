import type { LevelInfo } from '../types';

// XP thresholds per level (cumulative)
export const LEVEL_THRESHOLDS: number[] = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3700, 5000];

export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, 10);
}

export function getLevelInfo(totalXp: number): LevelInfo {
  const level = getLevelFromXp(totalXp);
  const minXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const maxXp = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInLevel = totalXp - minXp;
  const xpNeeded = maxXp - minXp;
  const progress = level >= 10 ? 100 : Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  return { level, minXp, maxXp, progress };
}

export function calculateLessonXp(
  correctCount: number,
  _wrongCount: number,
  isPerfect: boolean,
  currentStreak: number
): number {
  let xp = correctCount * 10 + 20; // base: per-question + completion bonus
  if (isPerfect) xp += 30;
  if (currentStreak >= 3) xp = Math.round(xp * 1.5);
  return xp;
}

export function calculateStars(wrongCount: number): number {
  if (wrongCount === 0) return 3;
  if (wrongCount <= 2) return 2;
  return 1;
}
