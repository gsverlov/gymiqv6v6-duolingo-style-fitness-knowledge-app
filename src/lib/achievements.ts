// ── GymIQV6V6 — Achievement Unlock Logic ───────────────────────────────────
import {
  STATIC_UNITS,
  UNIT_LESSON_COUNTS,
} from '../data/units';

// ── Achievement Keys (typed const for autocomplete safety) ─────────────────

export const ACHIEVEMENT_KEYS = {
  FIRST_LESSON:    'first_lesson',
  STREAK_3:        'streak_3',
  STREAK_7:        'streak_7',
  STREAK_10:       'streak_10',
  STREAK_30:       'streak_30',
  PERFECT_LESSON:  'perfect_lesson',
  NUTRITION_NERD:  'nutrition_nerd',
  ANATOMY_ACE:     'anatomy_ace',
  FORM_MASTER:     'form_master',
  IRON_MIND:       'iron_mind',
  XP_500:          'xp_500',
  XP_2000:         'xp_2000',
} as const;

export type AchievementKey = typeof ACHIEVEMENT_KEYS[keyof typeof ACHIEVEMENT_KEYS];

// ── Unit IDs for unit-completion checks ────────────────────────────────────

const UNIT_ANATOMY_ID    = '11111111-0000-0000-0000-000000000002';
const UNIT_FORM_ID       = '11111111-0000-0000-0000-000000000003';
const UNIT_NUTRITION_ID  = '11111111-0000-0000-0000-000000000004';

/** Lesson IDs belonging to a given unit (derived from static data) */
function lessonIdsForUnit(unitId: string): string[] {
  return STATIC_UNITS.find((u) => u.id === unitId)?.lessons.map((l) => l.id) ?? [];
}

function allLessonsCompleted(
  unitId: string,
  completedLessonIds: string[],
): boolean {
  const ids = lessonIdsForUnit(unitId);
  return ids.length > 0 && ids.every((id) => completedLessonIds.includes(id));
}

// ── Core Check Function ─────────────────────────────────────────────────────

export interface CheckAchievementsParams {
  /** Total lessons completed by the user (including this lesson) */
  totalLessonsCompleted: number;
  /** User's current streak after this lesson */
  currentStreak: number;
  /** Whether this specific lesson was completed with 0 wrong answers */
  isPerfectLesson: boolean;
  /** User's total XP after this lesson */
  totalXP: number;
  /** All lesson IDs the user has ever completed (including this lesson) */
  completedLessonIds: string[];
  /** Achievement keys the user has already unlocked */
  existingAchievementKeys: string[];
}

/**
 * Checks which achievements should be newly unlocked after a lesson.
 * Returns an array of achievement keys to insert into user_achievements.
 * Only returns keys that are NOT already in existingAchievementKeys.
 */
export function checkAchievements(params: CheckAchievementsParams): AchievementKey[] {
  const {
    totalLessonsCompleted,
    currentStreak,
    isPerfectLesson,
    totalXP,
    completedLessonIds,
    existingAchievementKeys,
  } = params;

  const newKeys: AchievementKey[] = [];

  function maybeUnlock(key: AchievementKey, condition: boolean): void {
    if (condition && !existingAchievementKeys.includes(key)) {
      newKeys.push(key);
    }
  }

  const totalLessonsInCurriculum = Object.values(UNIT_LESSON_COUNTS).reduce(
    (sum, n) => sum + n,
    0,
  );

  // ── Lesson milestones ──────────────────────────────────────────────────
  maybeUnlock(ACHIEVEMENT_KEYS.FIRST_LESSON,   totalLessonsCompleted >= 1);

  // ── Streak milestones ──────────────────────────────────────────────────
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_3,  currentStreak >= 3);
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_7,  currentStreak >= 7);
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_10, currentStreak >= 10);
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_30, currentStreak >= 30);

  // ── Quality ────────────────────────────────────────────────────────────
  maybeUnlock(ACHIEVEMENT_KEYS.PERFECT_LESSON, isPerfectLesson);

  // ── XP milestones ──────────────────────────────────────────────────────
  maybeUnlock(ACHIEVEMENT_KEYS.XP_500,  totalXP >= 500);
  maybeUnlock(ACHIEVEMENT_KEYS.XP_2000, totalXP >= 2000);

  // ── Unit completion ────────────────────────────────────────────────────
  maybeUnlock(
    ACHIEVEMENT_KEYS.ANATOMY_ACE,
    allLessonsCompleted(UNIT_ANATOMY_ID, completedLessonIds),
  );
  maybeUnlock(
    ACHIEVEMENT_KEYS.FORM_MASTER,
    allLessonsCompleted(UNIT_FORM_ID, completedLessonIds),
  );
  maybeUnlock(
    ACHIEVEMENT_KEYS.NUTRITION_NERD,
    allLessonsCompleted(UNIT_NUTRITION_ID, completedLessonIds),
  );

  // ── Full curriculum ────────────────────────────────────────────────────
  maybeUnlock(
    ACHIEVEMENT_KEYS.IRON_MIND,
    completedLessonIds.length >= totalLessonsInCurriculum,
  );

  return newKeys;
}
