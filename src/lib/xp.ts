// ── GymIQV6V6 — XP & Leveling Utilities ────────────────────────────────────
import type { LevelInfo } from '../types';

// ── Constants ───────────────────────────────────────────────────────────────

/** Cumulative XP required to reach each level (index 0 = Level 1) */
export const LEVEL_THRESHOLDS: number[] = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3700, 5000];

export const MAX_LEVEL = 10;

/** XP awarded per correct answer during a lesson */
export const XP_PER_CORRECT = 10;

/** Flat bonus XP on lesson completion (any accuracy) */
export const XP_COMPLETION_BONUS = 20;

/** Additional bonus XP for a perfect lesson (0 wrong answers) */
export const XP_PERFECT_BONUS = 30;

/** Minimum streak days required to apply the streak multiplier */
export const STREAK_MULTIPLIER_MIN_DAYS = 3;

/** Streak XP multiplier applied to completion bonuses */
export const STREAK_XP_MULTIPLIER = 1.5;

// ── Level Functions ─────────────────────────────────────────────────────────

/**
 * Returns the level (1–10) a user is at based on their total cumulative XP.
 */
export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]!) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, MAX_LEVEL);
}

/**
 * Returns detailed level info including progress percentage within the current
 * level — used to render the XP progress bar on the home and profile screens.
 */
export function getLevelInfo(totalXp: number): LevelInfo {
  const level = getLevelFromXp(totalXp);
  const minXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const maxXp = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!;
  const xpInLevel = totalXp - minXp;
  const xpNeeded = maxXp - minXp;
  const progress = level >= MAX_LEVEL
    ? 100
    : Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  return { level, minXp, maxXp, progress };
}

/**
 * Returns how many XP are needed to reach the next level from the given total.
 * Returns 0 if already at max level.
 */
export function xpUntilNextLevel(totalXp: number): number {
  const level = getLevelFromXp(totalXp);
  if (level >= MAX_LEVEL) return 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? 0;
  return Math.max(0, nextThreshold - totalXp);
}

// ── Lesson XP Functions ─────────────────────────────────────────────────────

/**
 * Calculates total XP earned for completing a lesson.
 *
 * Formula:
 *   answerXP    = correctCount × XP_PER_CORRECT
 *   completion  = XP_COMPLETION_BONUS
 *   perfect     = +XP_PERFECT_BONUS if wrongCount === 0
 *   streak mult = 1.5× applied to (completion + perfect) if streak ≥ 3
 *
 * Practice mode (replayed completed lesson): only answer XP, no bonuses.
 */
export function calculateLessonXp(
  correctCount: number,
  wrongCount: number,
  currentStreak: number,
  isPractice: boolean = false,
): number {
  const answerXP = correctCount * XP_PER_CORRECT;

  if (isPractice) {
    // Practice mode: no completion bonus, no streak multiplier
    return answerXP;
  }

  const isPerfect = wrongCount === 0;
  let bonusXP = XP_COMPLETION_BONUS + (isPerfect ? XP_PERFECT_BONUS : 0);

  if (currentStreak >= STREAK_MULTIPLIER_MIN_DAYS) {
    bonusXP = Math.round(bonusXP * STREAK_XP_MULTIPLIER);
  }

  return answerXP + bonusXP;
}

/**
 * Calculates star rating (1–3) based on wrong answer count.
 *   3 stars: 0 wrong answers
 *   2 stars: 1–2 wrong answers
 *   1 star:  3+ wrong answers
 */
export function calculateStars(wrongCount: number): 1 | 2 | 3 {
  if (wrongCount === 0) return 3;
  if (wrongCount <= 2) return 2;
  return 1;
}
