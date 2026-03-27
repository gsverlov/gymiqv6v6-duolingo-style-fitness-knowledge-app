# GymIQV6V6 — Technical Architecture
## LIN-49

---

## Tech Stack Summary

| Dependency | Version | Rationale |
|---|---|---|
| react | ^18.3.1 | Concurrent rendering, Suspense for lazy routes |
| react-dom | ^18.3.1 | DOM renderer |
| typescript | ^5.4.5 | Full type safety across the codebase |
| vite | ^5.2.0 | Sub-second HMR, ESM-native, fast production builds |
| tailwindcss | ^3.4.3 | Utility-first CSS; custom dark theme in config |
| framer-motion | ^11.1.9 | All animations: spring physics, AnimatePresence, gesture detection |
| @supabase/supabase-js | ^2.43.1 | Auth (email/password + magic link), PostgreSQL client, realtime |
| zustand | ^4.5.2 | Lightweight global state for lesson engine and user session |
| react-router-dom | ^6.23.1 | Client-side routing with lazy-loaded routes |
| lucide-react | ^0.378.0 | Icon set matching Duolingo's style (Trophy, Heart, Flame, etc.) |
| @fontsource/nunito | ^5.0.18 | Self-hosted Nunito font — no external font request, faster load |
| autoprefixer | ^10.4.19 | Tailwind PostCSS companion |
| postcss | ^8.4.38 | CSS processing pipeline |

---

## Project Structure

```
/app/workspace/LIN-49/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # All tables + RLS + indexes
│       └── 002_seed_data.sql        # Units, lessons, questions, achievements
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                     # Entry point, BrowserRouter
    ├── App.tsx                      # Route definitions, AnimatePresence wrapper
    ├── index.css                    # Nunito import, Tailwind directives, confetti CSS
    ├── types/
    │   └── index.ts                 # All TypeScript interfaces and enums
    ├── lib/
    │   ├── supabase.ts              # Supabase client singleton
    │   ├── xp.ts                    # XP calculations, level thresholds
    │   ├── streak.ts                # Streak increment/reset logic
    │   ├── hearts.ts                # Heart refill timer logic
    │   ├── achievements.ts          # Achievement unlock checks
    │   └── animations.ts            # Shared Framer Motion variants
    ├── store/
    │   ├── useUserStore.ts          # Zustand: user profile, XP, streak, hearts
    │   └── useLessonStore.ts        # Zustand: active lesson state machine
    ├── hooks/
    │   ├── useAuth.ts               # Supabase auth state, login, signup, logout
    │   ├── useUser.ts               # Fetch/update user profile from DB
    │   ├── useProgress.ts           # Unit/lesson progress queries
    │   ├── useLesson.ts             # Load lesson questions, submit answers
    │   ├── useLeaderboard.ts        # Weekly leaderboard query
    │   └── useAchievements.ts       # Achievement fetch + unlock toast trigger
    ├── data/
    │   ├── units.ts                 # Static unit definitions (mirrors DB seed)
    │   ├── questions.ts             # All 150+ questions with choices
    │   ├── achievements.ts          # Achievement definitions
    │   └── levels.ts                # XP thresholds per level
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx           # Primary, outline, ghost variants + press animation
    │   │   ├── Card.tsx             # Dark surface card with optional glow
    │   │   ├── ProgressBar.tsx      # Animated spring width bar
    │   │   ├── Modal.tsx            # Framer Motion centered overlay
    │   │   ├── Sheet.tsx            # Bottom sheet (y: 100%→0 animation)
    │   │   ├── Toast.tsx            # Achievement unlock toast (slides from top)
    │   │   ├── Avatar.tsx           # Initials-based colored circle
    │   │   └── HeartDisplay.tsx     # Heart icons with pop-fade animation
    │   ├── layout/
    │   │   ├── AppLayout.tsx        # Authenticated shell with BottomNav
    │   │   ├── TopBar.tsx           # Streak + logo + hearts sticky header
    │   │   └── BottomNav.tsx        # 4-tab fixed bottom nav
    │   ├── skill-tree/
    │   │   ├── SkillTree.tsx        # Scrollable vertical tree container
    │   │   ├── SkillNode.tsx        # Unit node (locked/available/in-progress/completed)
    │   │   ├── PathConnector.tsx    # Dotted SVG line between nodes
    │   │   └── UnitPreviewSheet.tsx # Bottom sheet with unit info + start CTA
    │   ├── lesson/
    │   │   ├── LessonHeader.tsx     # Exit X + progress bar + hearts
    │   │   ├── MultipleChoiceQ.tsx  # Type A question layout
    │   │   ├── TrueFalseQ.tsx       # Type B question layout
    │   │   ├── FillBlankQ.tsx       # Type C question layout
    │   │   ├── ImageMatchQ.tsx      # Type D question layout
    │   │   ├── FeedbackBar.tsx      # Correct/incorrect slide-up overlay
    │   │   └── NoHeartsModal.tsx    # Game over modal
    │   ├── auth/
    │   │   ├── AuthInput.tsx        # Rounded input with validation states
    │   │   ├── GoalCard.tsx         # Selectable goal option card
    │   │   └── GymOwl.tsx           # Animated owl mascot SVG component
    │   ├── profile/
    │   │   ├── StatsGrid.tsx        # 2x2 stats grid (streak, lessons, XP)
    │   │   ├── XPBar.tsx            # Detailed XP progress bar with label
    │   │   └── AchievementBadge.tsx # Badge card (locked/unlocked states)
    │   └── leaderboard/
    │       └── LeaderboardRow.tsx   # Rank + avatar + name + XP row
    └── pages/
        ├── Landing.tsx              # Hero + two CTA buttons + owl mascot
        ├── Login.tsx                # Email/password + magic link
        ├── Signup.tsx               # Display name + email + password
        ├── GoalSelection.tsx        # 4-card goal picker
        ├── Home.tsx                 # Skill tree + XP bar
        ├── Lesson.tsx               # Active lesson question flow
        ├── LessonComplete.tsx       # Confetti + stars + XP summary
        ├── Profile.tsx              # Stats + achievements
        ├── Leaderboard.tsx          # Weekly leaderboard
        └── Settings.tsx             # Logout + change password
```

---

## Data Flow

### Authentication Flow
1. `useAuth` hook subscribes to `supabase.auth.onAuthStateChange`
2. On sign-in, Supabase sets a session cookie; the hook stores the `session` in `useUserStore`
3. `App.tsx` reads `useUserStore.session`; if null → renders public routes (Landing/Login/Signup); if set → renders authenticated routes wrapped in `AppLayout`
4. On signup, a database trigger (`on_auth_user_created`) creates a row in `public.users` with defaults
5. Goal selection writes to `users.goal` via `supabase.from('users').update()`
6. Protected routes use a `<RequireAuth>` wrapper component; unauthenticated access redirects to `/`

### User Profile Data Flow
1. After auth, `useUser` hook runs `supabase.from('users').select('*').eq('id', userId).single()`
2. Result stored in Zustand `useUserStore` — available globally without prop drilling
3. XP updates use an optimistic approach: update Zustand immediately, then `supabase.from('users').update()` in background
4. Hearts check via `useHearts` compares `next_heart_at` to `Date.now()` on app focus

### Lesson Data Flow
1. `useLesson(lessonId)` fetches from `questions` + `question_choices` for the given lesson, joined and sorted by `sort_order`
2. All question data stored in `useLessonStore` (Zustand): `{ questions, currentIndex, correctCount, wrongCount, answers }`
3. On answer submit: lesson store updates locally → feedback shown → user advances
4. On lesson complete: `useLesson.submitResult()` calls a batch of Supabase writes:
   - `user_lesson_progress`: upsert with status, stars, correct/wrong counts
   - `user_unit_progress`: increment `lessons_completed`; set `is_completed` if all lessons done
   - `users`: `total_xp += earned`, `weekly_xp += earned`, streak update, level recalculate
   - Achievement checks run after DB writes; any new achievements trigger toast via Zustand event

### Skill Tree Data Flow
1. `useProgress` fetches `user_unit_progress` for all units + `units` table (joined, ordered by `sort_order`)
2. Unlock logic: unit is unlocked if `is_unlocked = true` OR `sort_order <= 3` (Units 1-3 default open)
3. Node state derived client-side: locked | available | in_progress | completed
4. On lesson complete, `useProgress` refetches (or invalidates cache) to show updated node states

### Leaderboard Data Flow
1. `useLeaderboard` fetches `users` table ordered by `weekly_xp DESC` (limit 20)
2. Current user's row always included via a union query
3. Weekly XP resets via a Supabase scheduled function (pg_cron) every Monday 00:00 UTC
4. No realtime subscription — data fetched on tab focus + manual pull-to-refresh

---

## Component Breakdown

### UI Primitives (`src/components/ui/`)

**Button**
- Props: `variant ('primary'|'outline'|'ghost'|'danger')`, `size ('sm'|'md'|'lg')`, `loading`, `disabled`, `onClick`, `children`
- Renders: Framer Motion `<motion.button>` with `whileTap={{ scale: 0.97 }}`, `transition={{ duration: 0.08 }}`
- Full-width option via `fullWidth` prop; loading state shows spinner + changed text

**Card**
- Props: `glow (boolean)`, `elevated (boolean)`, `className`, `children`
- Renders: `<div>` with Tailwind classes for `bg-surface`, `rounded-2xl`, `border-border`; optional `shadow-glow` ring

**ProgressBar**
- Props: `value (0-100)`, `color ('green'|'gold'|'blue')`, `height`, `animated`
- Renders: outer track + Framer Motion inner fill with `animate={{ width: value + '%' }}` spring

**Modal**
- Props: `open`, `onClose`, `children`
- Renders: `AnimatePresence` → backdrop fade + centered panel scales in (`scale: 0.9→1`)

**Sheet**
- Props: `open`, `onClose`, `children`
- Renders: `AnimatePresence` → backdrop + bottom-anchored panel with `y: '100%'→0` animation

**Toast**
- Props: `message`, `icon`, `color`, `onDismiss`
- Renders: Fixed top toast; Framer Motion `y: -80→0` slide-in, auto-dismiss after 3s

**HeartDisplay**
- Props: `count (0-3)`, `animateLoss (boolean)`
- Renders: 3 heart icons; when count drops, missing heart plays `scale: 1→1.4→0, opacity: 1→0`

### Layout (`src/components/layout/`)

**AppLayout**
- Props: `children`
- Renders: `<div>` with `max-w-[480px] mx-auto min-h-screen flex flex-col`; mounts `TopBar` + `{children}` + `BottomNav`; renders `<Toast>` portal for achievement notifications

**TopBar**
- Props: none (reads from `useUserStore`)
- Renders: sticky `h-14` bar with streak badge (Flame icon + count), centered wordmark, HeartDisplay

**BottomNav**
- Props: none (reads from `useLocation` for active tab)
- Renders: Fixed bottom `h-16` bar with 4 icon+label tabs; active tab gets `text-accent` color + `scale(1.1)` on mount

### Skill Tree (`src/components/skill-tree/`)

**SkillTree**
- Props: `units: UnitWithProgress[]`
- Renders: scrollable `<div>` with absolute-positioned nodes zigzagged (`left: 20% | 50% | 80%`) and `PathConnector` SVG lines

**SkillNode**
- Props: `unit: UnitWithProgress`, `onTap`
- State: internal hover state
- Renders: circular node (80px) in 4 visual states:
  - Locked: gray + `LockIcon`, non-interactive
  - Available: full emoji + Framer Motion pulsing glow `animate={{ scale: [1, 1.08, 1], boxShadow: [...] }}` on `repeat: Infinity`
  - In Progress: emoji + SVG circle progress ring (stroke-dashoffset animation)
  - Completed: emoji + green check overlay + star rating row

**UnitPreviewSheet**
- Props: `unit: Unit | null`, `onStart`, `onClose`
- Renders: `Sheet` component wrapping unit emoji (48px), title, description, lesson list, "Start lesson" CTA

### Lesson (`src/components/lesson/`)

**LessonHeader**
- Props: `progress (0-100)`, `onExit`
- Renders: Top row with `×` exit button → `Modal` confirmation; `ProgressBar` (spring); `HeartDisplay`

**MultipleChoiceQ**
- Props: `question: Question`, `choices: Choice[]`, `onSubmit`
- State: `selectedId`, `submitted`
- Renders: question text + 4 choice buttons (blue highlight on select) + "Check" CTA; choice buttons animate border on select via CSS transition

**TrueFalseQ**
- Props: `question: Question`, `onSubmit`
- State: `selected ('true'|'false'|null)`
- Renders: question text + two large side-by-side buttons (TRUE/FALSE); tapping immediately calls `onSubmit`

**FillBlankQ**
- Props: `question: Question`, `onSubmit`
- State: `value (string)`
- Renders: sentence with `___` gap + auto-focused input + "Check" CTA; validation trims and lowercases before comparison

**ImageMatchQ**
- Props: `question: Question`, `choices: Choice[]`, `imageUrl: string`, `onSubmit`
- State: `selectedId`, `submitted`
- Renders: muscle diagram image + 4 label buttons below; same select-then-submit flow as MultipleChoice

**FeedbackBar**
- Props: `isCorrect`, `xpEarned`, `explanation`, `correctAnswer`, `onContinue`
- Renders: `AnimatePresence` → bar slides up from `y: 200` with spring; ✓/✗ icon animates scale/shake; Continue/Got it button

**NoHeartsModal**
- Props: `open`, `onPractice`, `onEnd`
- Renders: `Modal` with sad owl SVG + explanation + two action buttons

### Auth (`src/components/auth/`)

**GymOwl**
- Props: `mood ('happy'|'sad'|'neutral')`, `animate (boolean)`
- Renders: SVG owl with Framer Motion entrance (`y: -60→0`, spring) and mood-based expression variants; `happy` mode loops bounce

**GoalCard**
- Props: `goal: Goal`, `selected`, `onSelect`
- Renders: full-width tappable card with emoji + title + description; selected state adds green border + checkmark; `whileTap={{ scale: 0.98 }}`

### Profile (`src/components/profile/`)

**StatsGrid**
- Props: `stats: UserStats`
- Renders: 2×2 grid of stat tiles (icon + number + label)

**AchievementBadge**
- Props: `achievement: Achievement`, `unlocked: boolean`
- Renders: Card with emoji icon + name + description; locked state applies `grayscale` filter + lock overlay

---

## Database Migrations

### Migration 001 — Initial Schema

```sql
-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ── USERS PROFILE ──────────────────────────────────────────────────────────
create table public.users (
  id               uuid primary key references auth.users(id) on delete cascade,
  display_name     text not null,
  goal             text check (goal in ('muscle','nutrition','anatomy','all')),
  current_streak   integer not null default 0,
  longest_streak   integer not null default 0,
  last_activity_date date,
  total_xp         integer not null default 0,
  level            integer not null default 1,
  hearts           integer not null default 3 check (hearts between 0 and 3),
  next_heart_at    timestamptz,
  weekly_xp        integer not null default 0,
  weekly_reset_at  timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Auto-create user profile on auth signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Trainer'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── UNITS ──────────────────────────────────────────────────────────────────
create table public.units (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  emoji           text not null,
  description     text,
  sort_order      integer not null,
  unlock_requires uuid references public.units(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── LESSONS ────────────────────────────────────────────────────────────────
create table public.lessons (
  id         uuid primary key default uuid_generate_v4(),
  unit_id    uuid not null references public.units(id) on delete cascade,
  title      text not null,
  sort_order integer not null,
  xp_reward  integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── QUESTIONS ──────────────────────────────────────────────────────────────
create table public.questions (
  id             uuid primary key default uuid_generate_v4(),
  lesson_id      uuid not null references public.lessons(id) on delete cascade,
  type           text not null check (type in ('multiple_choice','true_false','fill_blank','image_match')),
  question_text  text not null,
  image_url      text,
  correct_answer text not null,
  explanation    text not null,
  sort_order     integer not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── QUESTION CHOICES ───────────────────────────────────────────────────────
create table public.question_choices (
  id          uuid primary key default uuid_generate_v4(),
  question_id uuid not null references public.questions(id) on delete cascade,
  label       text not null,
  is_correct  boolean not null default false,
  sort_order  integer not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── USER LESSON PROGRESS ───────────────────────────────────────────────────
create table public.user_lesson_progress (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.users(id) on delete cascade,
  lesson_id       uuid not null references public.lessons(id) on delete cascade,
  status          text not null default 'not_started'
                    check (status in ('not_started','in_progress','completed')),
  stars           integer check (stars between 1 and 3),
  correct_count   integer not null default 0,
  wrong_count     integer not null default 0,
  last_attempt_at timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- ── USER UNIT PROGRESS ─────────────────────────────────────────────────────
create table public.user_unit_progress (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references public.users(id) on delete cascade,
  unit_id            uuid not null references public.units(id) on delete cascade,
  lessons_completed  integer not null default 0,
  total_lessons      integer not null,
  is_unlocked        boolean not null default false,
  is_completed       boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, unit_id)
);

-- ── ACHIEVEMENTS ───────────────────────────────────────────────────────────
create table public.achievements (
  id          uuid primary key default uuid_generate_v4(),
  key         text unique not null,
  title       text not null,
  description text not null,
  icon_emoji  text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── USER ACHIEVEMENTS ──────────────────────────────────────────────────────
create table public.user_achievements (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.users(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at    timestamptz not null default now(),
  unique (user_id, achievement_id)
);

-- ── LEADERBOARD SNAPSHOTS ──────────────────────────────────────────────────
create table public.leaderboard_snapshots (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  display_name text not null,
  weekly_xp    integer not null,
  week_start   date not null,
  rank         integer,
  created_at   timestamptz not null default now()
);

-- ── INDEXES ────────────────────────────────────────────────────────────────
create index idx_lessons_unit_id            on public.lessons(unit_id);
create index idx_questions_lesson_id        on public.questions(lesson_id);
create index idx_question_choices_question  on public.question_choices(question_id);
create index idx_ulp_user_id               on public.user_lesson_progress(user_id);
create index idx_ulp_lesson_id             on public.user_lesson_progress(lesson_id);
create index idx_uup_user_id               on public.user_unit_progress(user_id);
create index idx_ua_user_id                on public.user_achievements(user_id);
create index idx_ls_week_start             on public.leaderboard_snapshots(week_start);
create index idx_users_weekly_xp           on public.users(weekly_xp desc);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────────────────────
alter table public.users                enable row level security;
alter table public.units                enable row level security;
alter table public.lessons              enable row level security;
alter table public.questions            enable row level security;
alter table public.question_choices     enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.user_unit_progress   enable row level security;
alter table public.achievements         enable row level security;
alter table public.user_achievements    enable row level security;
alter table public.leaderboard_snapshots enable row level security;

-- Users: own row only
create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

-- Curriculum (units, lessons, questions, choices): public read
create policy "units_public_read"   on public.units            for select using (true);
create policy "lessons_public_read" on public.lessons          for select using (true);
create policy "questions_public_read" on public.questions      for select using (true);
create policy "choices_public_read" on public.question_choices for select using (true);
create policy "achievements_public_read" on public.achievements for select using (true);

-- Progress: own rows only
create policy "ulp_select_own" on public.user_lesson_progress for select using (auth.uid() = user_id);
create policy "ulp_insert_own" on public.user_lesson_progress for insert with check (auth.uid() = user_id);
create policy "ulp_update_own" on public.user_lesson_progress for update using (auth.uid() = user_id);

create policy "uup_select_own" on public.user_unit_progress for select using (auth.uid() = user_id);
create policy "uup_insert_own" on public.user_unit_progress for insert with check (auth.uid() = user_id);
create policy "uup_update_own" on public.user_unit_progress for update using (auth.uid() = user_id);

create policy "ua_select_own" on public.user_achievements for select using (auth.uid() = user_id);
create policy "ua_insert_own" on public.user_achievements for insert with check (auth.uid() = user_id);

-- Leaderboard: all authenticated users can read (for rankings), own insert
create policy "ls_public_read" on public.leaderboard_snapshots for select using (auth.uid() is not null);
create policy "ls_insert_own"  on public.leaderboard_snapshots for insert with check (auth.uid() = user_id);
```

### Migration 002 — Seed Data

```sql
-- ── UNITS ──────────────────────────────────────────────────────────────────
insert into public.units (id, title, emoji, description, sort_order, unlock_requires) values
  ('11111111-0000-0000-0000-000000000001', 'Intro to Training',   '🏋️', 'Master the fundamentals of resistance training and why it works.', 1, null),
  ('11111111-0000-0000-0000-000000000002', 'Muscle Anatomy',       '🦵', 'Learn the muscles you''re training and how they function.', 2, null),
  ('11111111-0000-0000-0000-000000000003', 'Exercise Form',        '✅', 'Perfect your technique on the big compound movements.', 3, null),
  ('11111111-0000-0000-0000-000000000004', 'Nutrition Basics',     '🥗', 'Understand the fuel your body needs to perform and grow.', 4, '11111111-0000-0000-0000-000000000003'),
  ('11111111-0000-0000-0000-000000000005', 'Programming',          '📋', 'Design training programs that produce consistent progress.', 5, '11111111-0000-0000-0000-000000000004'),
  ('11111111-0000-0000-0000-000000000006', 'Recovery',             '😴', 'Learn why rest is where the real gains happen.', 6, '11111111-0000-0000-0000-000000000005'),
  ('11111111-0000-0000-0000-000000000007', 'Cardio Science',       '💨', 'Understand cardiovascular training and its relationship with muscle.', 7, '11111111-0000-0000-0000-000000000006'),
  ('11111111-0000-0000-0000-000000000008', 'Advanced Nutrition',   '🧪', 'Dive deep into supplements, timing, and body composition.', 8, '11111111-0000-0000-0000-000000000007');

-- ── ACHIEVEMENTS ───────────────────────────────────────────────────────────
insert into public.achievements (key, title, description, icon_emoji) values
  ('first_lesson',    'First Rep',        'Complete your very first lesson.',           '🏅'),
  ('streak_3',        '3-Day Streak',     'Train 3 days in a row.',                     '🔥'),
  ('streak_7',        'Week Warrior',     'Maintain a 7-day streak.',                   '⚡'),
  ('streak_10',       'Iron Consistency', 'Keep a 10-day streak going.',                '💪'),
  ('streak_30',       'Unstoppable',      '30 days straight. You''re built different.', '🏆'),
  ('perfect_lesson',  'Perfect Form',     'Complete a lesson with zero wrong answers.', '⭐'),
  ('nutrition_nerd',  'Nutrition Nerd',   'Complete all Nutrition Basics lessons.',      '🥗'),
  ('anatomy_ace',     'Anatomy Ace',      'Complete all Muscle Anatomy lessons.',        '🦵'),
  ('form_master',     'Form Master',      'Complete all Exercise Form lessons.',         '✅'),
  ('iron_mind',       'Iron Mind',        'Complete every lesson in the curriculum.',   '🧠'),
  ('xp_500',          '500 XP Club',      'Earn 500 total XP.',                         '🎯'),
  ('xp_2000',         '2000 XP Elite',    'Earn 2000 total XP.',                        '💎');
```

---

## Subtasks

1. **Project Setup**: Scaffold the Vite + React + TypeScript project with `npm create vite@latest`. Configure Tailwind with the exact custom colors from the spec (`#0f0f1a`, `#1a1a2e`, `#58cc02`, etc.) and Nunito font via `@fontsource/nunito`. Set up the Supabase client singleton in `src/lib/supabase.ts` with env var support. Create all TypeScript interfaces in `src/types/index.ts` (User, Unit, Lesson, Question, Choice, Progress, Achievement). Build all reusable UI primitives: Button, Card, ProgressBar, Modal, Sheet, Toast, Avatar, HeartDisplay. Set up React Router v6 with lazy-loaded routes in `App.tsx` and `AnimatePresence` route transitions. Initialize both Zustand stores (`useUserStore`, `useLessonStore`). Write shared Framer Motion variants in `src/lib/animations.ts`. Files: `vite.config.ts`, `tailwind.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/lib/supabase.ts`, `src/lib/animations.ts`, `src/types/index.ts`, `src/store/useUserStore.ts`, `src/store/useLessonStore.ts`, `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/ProgressBar.tsx`, `src/components/ui/Modal.tsx`, `src/components/ui/Sheet.tsx`, `src/components/ui/Toast.tsx`, `src/components/ui/Avatar.tsx`, `src/components/ui/HeartDisplay.tsx`, `src/components/layout/AppLayout.tsx`, `src/components/layout/TopBar.tsx`, `src/components/layout/BottomNav.tsx`.

2. **Database & Static Content**: Write the full Supabase SQL migrations in `supabase/migrations/001_initial_schema.sql` (all 10 tables, triggers, indexes, RLS policies) and `supabase/migrations/002_seed_data.sql` (all 8 units, 24+ lessons with sort_order and xp_reward, 96+ questions across all 4 types with `correct_answer` and `explanation`, all `question_choices` rows, all 12 achievement definitions). Also create mirrored TypeScript data files for offline/fallback use. Include `src/lib/xp.ts` (level thresholds, `calculateLevel`, `xpForNextLevel`), `src/lib/streak.ts` (increment/reset logic), `src/lib/hearts.ts` (refill timer), and `src/lib/achievements.ts` (unlock condition checks). Files: `supabase/migrations/001_initial_schema.sql`, `supabase/migrations/002_seed_data.sql`, `src/data/units.ts`, `src/data/questions.ts`, `src/data/achievements.ts`, `src/data/levels.ts`, `src/lib/xp.ts`, `src/lib/streak.ts`, `src/lib/hearts.ts`, `src/lib/achievements.ts`.

3. **Auth & Onboarding**: Implement the full authentication flow using Supabase Auth. Build `Landing.tsx` with the animated GymOwl mascot SVG (Framer Motion spring bounce entrance), tagline, and two CTA buttons. Build `Signup.tsx` with display name/email/password fields, inline validation (red shake on invalid, green check on valid), loading spinner state, and confetti burst on success. Build `Login.tsx` with email/password + magic link forgot-password flow. Build `GoalSelection.tsx` with 4 animated selectable goal cards. Implement `useAuth.ts` hook wrapping Supabase auth methods and session subscription. Add a `<RequireAuth>` wrapper that redirects unauthenticated users to `/`. Build the `GymOwl.tsx` animated SVG component and `AuthInput.tsx` reusable field. Files: `src/pages/Landing.tsx`, `src/pages/Login.tsx`, `src/pages/Signup.tsx`, `src/pages/GoalSelection.tsx`, `src/hooks/useAuth.ts`, `src/components/auth/GymOwl.tsx`, `src/components/auth/AuthInput.tsx`, `src/components/auth/GoalCard.tsx`.

4. **Skill Tree & Home Screen**: Build the `Home.tsx` page showing the full scrollable skill tree. Implement `SkillTree.tsx` with zigzag node positioning (alternating left/center/right at 120px vertical spacing). Build `SkillNode.tsx` with all four visual states: locked (gray + lock icon), available (full color + Framer Motion pulsing glow loop), in-progress (SVG circular progress ring), and completed (checkmark + star rating). Build `PathConnector.tsx` with dotted SVG lines between nodes. Build `UnitPreviewSheet.tsx` bottom sheet with lesson list and "Start lesson" CTA. Implement `useProgress.ts` hook to fetch and derive unit/lesson progress from Supabase. Wire tooltip for locked nodes. The top bar (streak + hearts) and XP progress bar must update reactively from `useUserStore`. Files: `src/pages/Home.tsx`, `src/hooks/useProgress.ts`, `src/hooks/useUser.ts`, `src/components/skill-tree/SkillTree.tsx`, `src/components/skill-tree/SkillNode.tsx`, `src/components/skill-tree/PathConnector.tsx`, `src/components/skill-tree/UnitPreviewSheet.tsx`.

5. **Lesson Engine**: Build the complete lesson flow in `Lesson.tsx` — routing from `/lesson/:lessonId`, loading questions via `useLesson.ts`, and stepping through each question using `useLessonStore`. Implement all four question type components: `MultipleChoiceQ` (select-then-submit, blue highlight on selected), `TrueFalseQ` (instant-submit side-by-side buttons), `FillBlankQ` (auto-focused input, case-insensitive trim validation), `ImageMatchQ` (image + 4 label buttons). Implement `FeedbackBar.tsx` with Framer Motion `y: 200→0` spring slide-up for correct (green) and incorrect (red with shake icon) states. Implement `LessonHeader.tsx` with animated progress bar and heart display. Build `NoHeartsModal.tsx` game-over overlay. Build `LessonComplete.tsx` with CSS confetti (200 particles), animated star drop-in (stagger 200ms), XP counter count-up animation, and summary row. On lesson complete, write results to Supabase (`user_lesson_progress` upsert, `users` XP/streak update) and update Zustand stores. Practice mode (replayed lessons): hearts not deducted on wrong answers. Files: `src/pages/Lesson.tsx`, `src/pages/LessonComplete.tsx`, `src/hooks/useLesson.ts`, `src/components/lesson/LessonHeader.tsx`, `src/components/lesson/MultipleChoiceQ.tsx`, `src/components/lesson/TrueFalseQ.tsx`, `src/components/lesson/FillBlankQ.tsx`, `src/components/lesson/ImageMatchQ.tsx`, `src/components/lesson/FeedbackBar.tsx`, `src/components/lesson/NoHeartsModal.tsx`.

6. **Profile, Leaderboard & Achievements**: Build `Profile.tsx` showing the initials avatar, level badge, detailed XP bar, 2×2 stats grid (current streak, longest streak, lessons completed, total XP), and horizontally scrollable achievements section with locked/unlocked badge states. Build `Leaderboard.tsx` showing weekly XP rankings via `useLeaderboard.ts`, with animated count-up rank numbers on load and the current user's row highlighted and pinned. Build `Settings.tsx` with logout, change-password, and notification toggle. Implement `useAchievements.ts` that checks unlock conditions after each lesson completion and triggers the achievement toast via Zustand event. Wire the achievement toast in `AppLayout.tsx` so it appears site-wide. Build `AchievementBadge.tsx`, `StatsGrid.tsx`, `XPBar.tsx`, and `LeaderboardRow.tsx` components. Files: `src/pages/Profile.tsx`, `src/pages/Leaderboard.tsx`, `src/pages/Settings.tsx`, `src/hooks/useLeaderboard.ts`, `src/hooks/useAchievements.ts`, `src/components/profile/StatsGrid.tsx`, `src/components/profile/XPBar.tsx`, `src/components/profile/AchievementBadge.tsx`, `src/components/leaderboard/LeaderboardRow.tsx`.
