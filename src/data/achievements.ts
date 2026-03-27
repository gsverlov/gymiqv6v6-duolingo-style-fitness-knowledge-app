export interface StaticAchievement {
  key: string;
  title: string;
  description: string;
  icon_emoji: string;
}

export const STATIC_ACHIEVEMENTS: StaticAchievement[] = [
  {
    key: 'first_lesson',
    title: 'First Step',
    description: 'Complete your first lesson',
    icon_emoji: '🎯',
  },
  {
    key: 'streak_3',
    title: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon_emoji: '🔥',
  },
  {
    key: 'streak_10',
    title: 'Unstoppable',
    description: 'Maintain a 10-day streak',
    icon_emoji: '⚡',
  },
  {
    key: 'perfect_lesson',
    title: 'Perfect Form',
    description: 'Complete a lesson without any mistakes',
    icon_emoji: '⭐',
  },
  {
    key: 'nutrition_nerd',
    title: 'Nutrition Nerd',
    description: 'Complete all nutrition lessons',
    icon_emoji: '🥗',
  },
  {
    key: 'iron_mind',
    title: 'Iron Mind',
    description: 'Complete all lessons in the app',
    icon_emoji: '🏆',
  },
];
