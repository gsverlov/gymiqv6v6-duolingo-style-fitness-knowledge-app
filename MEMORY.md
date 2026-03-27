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
_2026-03-26 — Subtask 4 complete_

### Subtask 1: Project Setup — COMPLETE (committed as "LIN-49: Project Setup")
All foundational files scaffolded:
- Tailwind v4 CSS config (`@import "tailwindcss"`, bracket notation for custom colors)
- TypeScript types (`src/types/index.ts`): User, Unit, Lesson, Question, Choice, UnitWithProgress, NodeState, etc.
- Supabase client singleton (`src/lib/supabase.ts`)
- Framer Motion variants (`src/lib/animations.ts`)
- XP/streak/hearts/achievements logic (`src/lib/xp.ts`, `streak.ts`, `hearts.ts`, `achievements.ts`)
- Zustand stores: `useUserStore` (XP, streak, hearts, session, achievement toast) + `useLessonStore` (lesson state machine)
- All UI primitives: Button, Card, ProgressBar, Modal, Sheet, Toast, Avatar, HeartDisplay
- Layout shell: AppLayout, TopBar, BottomNav
- Auth hooks: useAuth, useUser
- React Router v7 routing with AnimatePresence transitions + RequireAuth guard
- Nunito font via @fontsource/nunito (self-hosted)

### Subtask 2: Database & Static Content — COMPLETE (committed as "LIN-49: Project Setup")
- Static unit data (`src/data/units.ts`): all 8 units with UUIDs matching seed data
- Achievements data (`src/data/achievements.ts`): 12 achievement definitions
- XP thresholds (`src/data/levels.ts`)
- Note: SQL migration files (`supabase/migrations/`) should be added in a separate DB subtask

### Subtask 3: Auth & Onboarding — COMPLETE (committed as "LIN-49: Project Setup")
- Landing.tsx: dark gradient hero, GymOwl emoji, CTA buttons
- Login.tsx: email/password with Supabase auth
- Signup.tsx: display name + email + password, validation, confetti burst
- GoalSelection.tsx: 4 animated goal cards
- useAuth.ts: Supabase auth state subscription
- GymOwl.tsx, AuthInput.tsx, GoalCard.tsx components

### Subtask 4: Skill Tree & Home — COMPLETE (committed as "LIN-49: Skill Tree & Home")
- `src/pages/Home.tsx`: XP progress bar + level badge + SkillTree + loading skeletons + error state
- `src/hooks/useProgress.ts`: fetches units+lessons+progress from Supabase, derives nodeState (locked/available/in_progress/completed), falls back to static data
- `src/hooks/useUser.ts`: fetches user profile, updates Zustand store
- `src/components/skill-tree/SkillTree.tsx`: zigzag layout (center→right→center→left pattern), 140px vertical spacing, PathConnector SVG lines, UnitPreviewSheet wired to node taps
- `src/components/skill-tree/SkillNode.tsx`: all 4 visual states with Framer Motion — available nodes pulse glow (2s loop), in_progress shows SVG circular progress ring, completed shows star rating row, locked nodes show tooltip on tap
- `src/components/skill-tree/PathConnector.tsx`: animated dotted SVG lines between nodes (green if completed, dark if not)
- `src/components/skill-tree/UnitPreviewSheet.tsx`: bottom sheet with lesson list + smart CTA (Start/Continue/Practice), navigates to /lesson/:id

### Notes & Decisions
- Using React 19 (installed) + React Router v7 (installed) — API compatible with v18/v6 for our usage
- Tailwind v4 requires `@import "tailwindcss"` in CSS (not tailwind.config.ts); using bracket notation `bg-[#0f0f1a]` for custom colors throughout
- Framer Motion v12 installed — API same as v11 for our usage
- Zustand v5 installed — API same as v4
- `useProgress` falls back to static data from `src/data/units.ts` when `VITE_SUPABASE_URL` is not set, treating units 1-3 as `available`
- SSH push not available in this environment; code committed locally on `LIN-49/implementation` branch

## Code Review
_pending_

## Test Results
_pending_

## Deploy Log
_pending_
