// ── GymIQV6V6 — Heart Refill Logic ─────────────────────────────────────────
import type { HeartState } from '../types';

export const HEART_REFILL_HOURS = 5;
export const HEART_REFILL_MS = HEART_REFILL_HOURS * 60 * 60 * 1000;
export const MAX_HEARTS = 3;

/**
 * Returns an ISO timestamp for when the next heart will refill (now + 5h).
 * Called when a heart is lost and the user is below MAX_HEARTS.
 */
export function getNextHeartRefillTime(): string {
  return new Date(Date.now() + HEART_REFILL_MS).toISOString();
}

/** @deprecated Use getNextHeartRefillTime() */
export const getHeartRefillTime = getNextHeartRefillTime;

/**
 * Returns true if at least one heart should be refilled right now.
 */
export function shouldRefillHeart(nextHeartAt: string | null): boolean {
  if (!nextHeartAt) return false;
  return new Date(nextHeartAt).getTime() <= Date.now();
}

/**
 * Calculates how many hearts should be refilled given the current timestamp
 * and heart count. Each 5-hour period that has elapsed grants 1 heart.
 */
export function calculateRefillCount(
  nextHeartAt: string | null,
  currentHearts: number,
): number {
  if (!nextHeartAt || currentHearts >= MAX_HEARTS) return 0;
  const now = Date.now();
  const refillTime = new Date(nextHeartAt).getTime();
  if (refillTime > now) return 0;
  const elapsed = now - refillTime;
  const periods = Math.floor(elapsed / HEART_REFILL_MS) + 1;
  return Math.min(periods, MAX_HEARTS - currentHearts);
}

/**
 * Returns the full heart state for the UI — count, next refill time, and
 * milliseconds until refill (for a countdown display).
 */
export function getHeartState(
  hearts: number,
  nextHeartAt: string | null,
): HeartState {
  if (hearts >= MAX_HEARTS || !nextHeartAt) {
    return { count: hearts, nextRefillAt: null, msUntilNextRefill: null };
  }

  const refillTime = new Date(nextHeartAt);
  const msRemaining = refillTime.getTime() - Date.now();

  if (msRemaining <= 0) {
    // Already past due — caller should trigger a refill
    return { count: hearts, nextRefillAt: refillTime, msUntilNextRefill: 0 };
  }

  return {
    count: hearts,
    nextRefillAt: refillTime,
    msUntilNextRefill: msRemaining,
  };
}

/**
 * Applies any pending heart refills and returns the updated heart state fields
 * for writing back to Supabase.
 */
export function applyHeartRefills(
  currentHearts: number,
  nextHeartAt: string | null,
): { hearts: number; next_heart_at: string | null } {
  const refillCount = calculateRefillCount(nextHeartAt, currentHearts);
  if (refillCount === 0) {
    return { hearts: currentHearts, next_heart_at: nextHeartAt };
  }

  const newHearts = Math.min(MAX_HEARTS, currentHearts + refillCount);
  const next_heart_at = newHearts >= MAX_HEARTS ? null : getNextHeartRefillTime();

  return { hearts: newHearts, next_heart_at };
}

/**
 * Returns what the heart fields should look like after losing one heart.
 */
export function loseOneHeart(
  currentHearts: number,
  currentNextHeartAt: string | null,
): { hearts: number; next_heart_at: string | null } {
  const newHearts = Math.max(0, currentHearts - 1);
  // Only start the timer if we weren't already counting down
  const next_heart_at =
    newHearts < MAX_HEARTS && !currentNextHeartAt
      ? getNextHeartRefillTime()
      : currentNextHeartAt;
  return { hearts: newHearts, next_heart_at };
}
