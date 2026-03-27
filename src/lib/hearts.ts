export const HEART_REFILL_HOURS = 5;
export const MAX_HEARTS = 3;

export function getHeartRefillTime(): string {
  return new Date(Date.now() + HEART_REFILL_HOURS * 60 * 60 * 1000).toISOString();
}

export function shouldRefillHeart(nextHeartAt: string | null): boolean {
  if (!nextHeartAt) return false;
  return new Date(nextHeartAt).getTime() <= Date.now();
}

export function calculateRefillCount(
  nextHeartAt: string | null,
  currentHearts: number
): number {
  if (!nextHeartAt || currentHearts >= MAX_HEARTS) return 0;
  const now = Date.now();
  const refillTime = new Date(nextHeartAt).getTime();
  if (refillTime > now) return 0;
  const elapsed = now - refillTime;
  const periods = Math.floor(elapsed / (HEART_REFILL_HOURS * 60 * 60 * 1000)) + 1;
  return Math.min(periods, MAX_HEARTS - currentHearts);
}
