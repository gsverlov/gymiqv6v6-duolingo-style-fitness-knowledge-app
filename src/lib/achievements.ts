export const ACHIEVEMENT_KEYS = {
  FIRST_LESSON: 'first_lesson',
  STREAK_3: 'streak_3',
  STREAK_10: 'streak_10',
  PERFECT_LESSON: 'perfect_lesson',
  NUTRITION_NERD: 'nutrition_nerd',
  IRON_MIND: 'iron_mind',
} as const;

interface CheckAchievementsParams {
  lessonsCompleted: number;
  currentStreak: number;
  isPerfectLesson: boolean;
  allNutritionComplete: boolean;
  allLessonsComplete: boolean;
  existingAchievements: string[];
}

export function checkAchievements(params: CheckAchievementsParams): string[] {
  const {
    lessonsCompleted,
    currentStreak,
    isPerfectLesson,
    allNutritionComplete,
    allLessonsComplete,
    existingAchievements,
  } = params;

  const newAchievements: string[] = [];

  function maybeUnlock(key: string, condition: boolean) {
    if (condition && !existingAchievements.includes(key)) {
      newAchievements.push(key);
    }
  }

  maybeUnlock(ACHIEVEMENT_KEYS.FIRST_LESSON, lessonsCompleted >= 1);
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_3, currentStreak >= 3);
  maybeUnlock(ACHIEVEMENT_KEYS.STREAK_10, currentStreak >= 10);
  maybeUnlock(ACHIEVEMENT_KEYS.PERFECT_LESSON, isPerfectLesson);
  maybeUnlock(ACHIEVEMENT_KEYS.NUTRITION_NERD, allNutritionComplete);
  maybeUnlock(ACHIEVEMENT_KEYS.IRON_MIND, allLessonsComplete);

  return newAchievements;
}
