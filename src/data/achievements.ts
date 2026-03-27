// ── GymIQV6V6 — Static Achievement Definitions ─────────────────────────────
// Mirrors the achievements table seed data in 002_seed_data.sql

export interface StaticAchievement {
  key: string;
  title: string;
  description: string;
  icon_emoji: string;
}

export const STATIC_ACHIEVEMENTS: StaticAchievement[] = [
  {
    key: 'first_lesson',
    title: 'First Rep',
    description: 'Complete your very first lesson.',
    icon_emoji: '🏅',
  },
  {
    key: 'streak_3',
    title: '3-Day Streak',
    description: 'Train 3 days in a row.',
    icon_emoji: '🔥',
  },
  {
    key: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak.',
    icon_emoji: '⚡',
  },
  {
    key: 'streak_10',
    title: 'Iron Consistency',
    description: 'Keep a 10-day streak going.',
    icon_emoji: '💪',
  },
  {
    key: 'streak_30',
    title: 'Unstoppable',
    description: "30 days straight. You're built different.",
    icon_emoji: '🏆',
  },
  {
    key: 'perfect_lesson',
    title: 'Perfect Form',
    description: 'Complete a lesson with zero wrong answers.',
    icon_emoji: '⭐',
  },
  {
    key: 'nutrition_nerd',
    title: 'Nutrition Nerd',
    description: 'Complete all Nutrition Basics lessons.',
    icon_emoji: '🥗',
  },
  {
    key: 'anatomy_ace',
    title: 'Anatomy Ace',
    description: 'Complete all Muscle Anatomy lessons.',
    icon_emoji: '🦵',
  },
  {
    key: 'form_master',
    title: 'Form Master',
    description: 'Complete all Exercise Form lessons.',
    icon_emoji: '✅',
  },
  {
    key: 'iron_mind',
    title: 'Iron Mind',
    description: 'Complete every lesson in the curriculum.',
    icon_emoji: '🧠',
  },
  {
    key: 'xp_500',
    title: '500 XP Club',
    description: 'Earn 500 total XP.',
    icon_emoji: '🎯',
  },
  {
    key: 'xp_2000',
    title: '2000 XP Elite',
    description: 'Earn 2000 total XP.',
    icon_emoji: '💎',
  },
];

/** Lookup map for quick access by key */
export const ACHIEVEMENT_MAP: Record<string, StaticAchievement> =
  Object.fromEntries(STATIC_ACHIEVEMENTS.map((a) => [a.key, a]));
