// ── GymIQV6V6 — Static Unit & Lesson Definitions ───────────────────────────
// Mirrors the units + lessons seed data in 002_seed_data.sql.
// Used as offline fallback and for client-side unlock logic.

import type { StaticUnit, StaticLesson } from '../types';

export interface StaticUnitWithLessons extends StaticUnit {
  lessons: StaticLesson[];
}

// ── Lesson ID helpers ───────────────────────────────────────────────────────
// Format matches SQL seed: 2200000X-0000-0000-0000-000000000000
const L = (n: number): string =>
  `22000${String(n).padStart(3, '0')}-0000-0000-0000-000000000000`;

const U = (n: number): string =>
  `11111111-0000-0000-0000-00000000000${n}`;

// ── Units ───────────────────────────────────────────────────────────────────

export const STATIC_UNITS: StaticUnitWithLessons[] = [
  {
    id: U(1),
    title: 'Intro to Training',
    emoji: '🏋️',
    description: 'Master the fundamentals of resistance training and why it works.',
    sort_order: 1,
    unlock_requires: null,
    lessons: [
      { id: L(1),  unit_id: U(1), title: 'What is Resistance Training?', sort_order: 1, xp_reward: 20 },
      { id: L(2),  unit_id: U(1), title: 'Reps & Sets Explained',        sort_order: 2, xp_reward: 20 },
      { id: L(3),  unit_id: U(1), title: 'Progressive Overload',         sort_order: 3, xp_reward: 20 },
    ],
  },
  {
    id: U(2),
    title: 'Muscle Anatomy',
    emoji: '🦵',
    description: 'Learn the muscles you\'re training and how they function.',
    sort_order: 2,
    unlock_requires: null,
    lessons: [
      { id: L(4),  unit_id: U(2), title: 'Upper Body Muscles',  sort_order: 1, xp_reward: 20 },
      { id: L(5),  unit_id: U(2), title: 'Lower Body Muscles',  sort_order: 2, xp_reward: 20 },
      { id: L(6),  unit_id: U(2), title: 'Core Muscles',        sort_order: 3, xp_reward: 20 },
      { id: L(7),  unit_id: U(2), title: 'Muscle Fiber Types',  sort_order: 4, xp_reward: 20 },
    ],
  },
  {
    id: U(3),
    title: 'Exercise Form',
    emoji: '✅',
    description: 'Perfect your technique on the big compound movements.',
    sort_order: 3,
    unlock_requires: null,
    lessons: [
      { id: L(8),  unit_id: U(3), title: 'The Squat',       sort_order: 1, xp_reward: 20 },
      { id: L(9),  unit_id: U(3), title: 'The Deadlift',    sort_order: 2, xp_reward: 20 },
      { id: L(10), unit_id: U(3), title: 'The Bench Press', sort_order: 3, xp_reward: 20 },
      { id: L(11), unit_id: U(3), title: 'Pull-ups & Rows', sort_order: 4, xp_reward: 20 },
    ],
  },
  {
    id: U(4),
    title: 'Nutrition Basics',
    emoji: '🥗',
    description: 'Understand the fuel your body needs to perform and grow.',
    sort_order: 4,
    unlock_requires: U(3),
    lessons: [
      { id: L(12), unit_id: U(4), title: 'Macronutrients',          sort_order: 1, xp_reward: 25 },
      { id: L(13), unit_id: U(4), title: 'Protein for Muscle Growth', sort_order: 2, xp_reward: 25 },
      { id: L(14), unit_id: U(4), title: 'Carbs & Energy',           sort_order: 3, xp_reward: 25 },
      { id: L(15), unit_id: U(4), title: 'Fats Explained',           sort_order: 4, xp_reward: 25 },
    ],
  },
  {
    id: U(5),
    title: 'Programming',
    emoji: '📋',
    description: 'Design training programs that produce consistent progress.',
    sort_order: 5,
    unlock_requires: U(4),
    lessons: [
      { id: L(16), unit_id: U(5), title: 'Training Frequency',   sort_order: 1, xp_reward: 25 },
      { id: L(17), unit_id: U(5), title: 'Workout Splits',       sort_order: 2, xp_reward: 25 },
      { id: L(18), unit_id: U(5), title: 'Periodization Basics', sort_order: 3, xp_reward: 25 },
    ],
  },
  {
    id: U(6),
    title: 'Recovery',
    emoji: '😴',
    description: 'Learn why rest is where the real gains happen.',
    sort_order: 6,
    unlock_requires: U(5),
    lessons: [
      { id: L(19), unit_id: U(6), title: 'Why Sleep Matters', sort_order: 1, xp_reward: 30 },
      { id: L(20), unit_id: U(6), title: 'Active Recovery',   sort_order: 2, xp_reward: 30 },
      { id: L(21), unit_id: U(6), title: 'Deload Weeks',      sort_order: 3, xp_reward: 30 },
    ],
  },
  {
    id: U(7),
    title: 'Cardio Science',
    emoji: '💨',
    description: 'Understand cardiovascular training and its relationship with muscle.',
    sort_order: 7,
    unlock_requires: U(6),
    lessons: [
      { id: L(22), unit_id: U(7), title: 'HIIT vs Steady-State', sort_order: 1, xp_reward: 30 },
      { id: L(23), unit_id: U(7), title: 'VO2 Max',              sort_order: 2, xp_reward: 30 },
      { id: L(24), unit_id: U(7), title: 'Cardio & Muscle',      sort_order: 3, xp_reward: 30 },
    ],
  },
  {
    id: U(8),
    title: 'Advanced Nutrition',
    emoji: '🧪',
    description: 'Dive deep into supplements, timing, and body composition.',
    sort_order: 8,
    unlock_requires: U(7),
    lessons: [
      { id: L(25), unit_id: U(8), title: 'Creatine & Supplements',    sort_order: 1, xp_reward: 35 },
      { id: L(26), unit_id: U(8), title: 'Caloric Surplus & Deficit', sort_order: 2, xp_reward: 35 },
      { id: L(27), unit_id: U(8), title: 'Meal Timing',               sort_order: 3, xp_reward: 35 },
    ],
  },
];

/** IDs of the first 3 units — always unlocked regardless of progress */
export const ALWAYS_UNLOCKED_UNIT_IDS: string[] = [U(1), U(2), U(3)];

/** Flat list of all lessons across all units */
export const ALL_LESSONS: StaticLesson[] = STATIC_UNITS.flatMap((u) => u.lessons);

/** Map of unit_id → lesson count */
export const UNIT_LESSON_COUNTS: Record<string, number> = Object.fromEntries(
  STATIC_UNITS.map((u) => [u.id, u.lessons.length]),
);
