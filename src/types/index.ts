// ─── Auth & User ─────────────────────────────────────────────────────────────

export type Goal = 'muscle' | 'nutrition' | 'anatomy' | 'all';

export interface UserProfile {
  id: string;
  display_name: string;
  goal: Goal | null;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  total_xp: number;
  level: number;
  hearts: number;
  next_heart_at: string | null;
  weekly_xp: number;
  weekly_reset_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Curriculum ───────────────────────────────────────────────────────────────

export interface Unit {
  id: string;
  title: string;
  emoji: string;
  description: string;
  sort_order: number;
  unlock_requires: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  sort_order: number;
  xp_reward: number;
  created_at: string;
  updated_at: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'image_match';

export interface Question {
  id: string;
  lesson_id: string;
  type: QuestionType;
  question_text: string;
  image_url: string | null;
  correct_answer: string;
  explanation: string;
  sort_order: number;
}

export interface QuestionChoice {
  id: string;
  question_id: string;
  label: string;
  is_correct: boolean;
  sort_order: number;
}

export interface QuestionWithChoices extends Question {
  choices: QuestionChoice[];
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';
export type UnitNodeState = 'locked' | 'available' | 'in_progress' | 'completed';

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  stars: number | null;
  correct_count: number;
  wrong_count: number;
  last_attempt_at: string | null;
  completed_at: string | null;
}

export interface UserUnitProgress {
  id: string;
  user_id: string;
  unit_id: string;
  lessons_completed: number;
  total_lessons: number;
  is_unlocked: boolean;
  is_completed: boolean;
}

export interface UnitWithProgress extends Unit {
  progress: UserUnitProgress | null;
  lessons: Lesson[];
  nodeState: UnitNodeState;
  stars: number; // 0-3 average star rating
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon_emoji: string;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface AchievementWithStatus extends Achievement {
  unlocked: boolean;
  unlocked_at: string | null;
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  weekly_xp: number;
  level: number;
  rank: number;
}

// ─── Lesson Engine State ──────────────────────────────────────────────────────

export type LessonPhase = 'loading' | 'question' | 'feedback' | 'complete' | 'no_hearts';

export interface LessonResult {
  lessonId: string;
  correctCount: number;
  wrongCount: number;
  xpEarned: number;
  stars: number;
  isPractice: boolean;
}

// ─── XP / Level ───────────────────────────────────────────────────────────────

export interface LevelInfo {
  level: number;
  minXp: number;
  maxXp: number;
  progress: number; // 0-100 percentage within current level
}

// ─── Store Types ──────────────────────────────────────────────────────────────

export interface ToastNotification {
  id: string;
  message: string;
  icon: string;
  color: 'green' | 'gold' | 'blue' | 'red';
}
