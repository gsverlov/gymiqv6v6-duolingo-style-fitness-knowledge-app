# LIN-49 — GymIQV6V6 — Duolingo-Style Fitness Knowledge App

## Spec
COMPLETE — see SPEC.md

### Summary
- **Stack**: React 18 + TypeScript + Tailwind CSS + Framer Motion + Supabase (auth + DB) + Zustand + React Router v6 + Vite
- **Theme**: Dark (#0f0f1a bg, #1a1a2e cards), Duolingo-green accent (#58cc02), Nunito font
- **Core loop**: Skill tree → Lesson (4-10 questions) → XP + streak → unlock next unit
- **Gamification**: XP, levels (1-10), streaks, 3 hearts (lost on wrong answers, refill 1/5hrs), 3-star lesson rating, achievements, weekly leaderboard
- **Question types**: Multiple choice, True/False, Fill in the blank, Image matching
- **8 Units**: Intro to Training, Muscle Anatomy, Exercise Form, Nutrition Basics, Programming, Recovery, Cardio Science, Advanced Nutrition
- **Key animations**: Framer Motion throughout — correct/wrong feedback bars slide up, confetti on lesson complete, pulsing skill tree nodes, star drop-in stagger, heart pop-fade on loss
- **DB tables**: users, units, lessons, questions, question_choices, user_lesson_progress, user_unit_progress, achievements, user_achievements, leaderboard_snapshots
- **24 AC criteria** covering functional, visual/UX, performance, and security requirements

## Architecture Decision
COMPLETE — see ARCHITECTURE.md

### Summary
- **Stack**: Vite + React 18 + TypeScript + Tailwind CSS (custom dark theme) + Framer Motion + Supabase + Zustand + React Router v6 + Lucide React + @fontsource/nunito
- **Structure**: `src/{types,lib,store,hooks,data,components/{ui,layout,skill-tree,lesson,auth,profile,leaderboard},pages}`
- **State**: Zustand for `useUserStore` (XP, streak, hearts, session) + `useLessonStore` (active lesson state machine); Supabase for persistence
- **Data flow**: Auth → session in Zustand → protected routes; lesson complete → batch Supabase writes → optimistic Zustand updates → achievement checks
- **DB**: 10 tables with RLS on all; `handle_new_user` trigger auto-creates profile on signup; Units 1-3 default unlocked, 4-8 sequential
- **Animations**: Framer Motion throughout — `AnimatePresence` route crossfade, spring feedback bars, pulsing skill nodes, stagger stars, confetti via pure CSS keyframes
- **6 Subtasks**: Project Setup | Database & Static Content | Auth & Onboarding | Skill Tree & Home | Lesson Engine | Profile, Leaderboard & Achievements

## Implementation
_pending_

## Code Review
_pending_

## Test Results
_pending_

## Deploy Log
_pending_
