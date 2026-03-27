# GymIQV6V6 — Duolingo-Style Fitness Knowledge App
## Product Spec — LIN-49

---

## 1. Product Overview

GymIQV6V6 is a gamified fitness-education web application modeled on the Duolingo learning experience. It targets gym-goers, home workout enthusiasts, and fitness beginners who want to deepen their knowledge of exercise science, nutrition, and muscle anatomy — but lack the motivation to read textbooks or watch long videos. The app delivers bite-sized, interactive lessons organized into a skill tree. Users earn XP for completing lessons, maintain daily streaks, spend "hearts" when they answer incorrectly, and level up through a progression system. Correct answers trigger celebratory animations; wrong answers produce immediate corrective feedback. The core loop (open app → do a lesson → earn XP → maintain streak → unlock next skill) is deliberately addictive and short enough to complete in 5 minutes per session.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS (utility-first) |
| Animations | Framer Motion |
| Auth | Supabase Auth (email/password + magic link) |
| Database | Supabase (PostgreSQL) |
| State Management | Zustand |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Google Fonts — "Nunito" (rounded, friendly — same as Duolingo) |
| Build | Vite |

---

## 3. Color Palette & Typography

### Colors
```
Background (page):      #0f0f1a   (near-black, deep navy)
Surface (cards):        #1a1a2e   (dark navy)
Surface elevated:       #16213e   (card hover/active)
Border:                 #2a2a4a   (subtle divider)
Accent primary:         #58cc02   (Duolingo green — correct, CTA, XP)
Accent secondary:       #ff4b4b   (Duolingo red — wrong answers, hearts)
Accent gold:            #ffc800   (streaks, achievements, coins)
Accent blue:            #1cb0f6   (info, links, secondary CTA)
Text primary:           #ffffff
Text secondary:         #afafaf
Text muted:             #6b6b8a
```

### Typography (Nunito, Google Fonts)
```
Hero heading:    40px / font-weight 900 / letter-spacing -0.5px
Section heading: 28px / font-weight 800
Card title:      20px / font-weight 700
Body:            16px / font-weight 500
Caption/label:   13px / font-weight 600 / uppercase + letter-spacing 1px
Button text:     16px / font-weight 700
```

### Spacing & Shape
```
Page max-width:  480px (mobile-first, centered on desktop)
Section padding: 24px horizontal, 32px vertical
Card border-radius: 16px
Button border-radius: 12px
Input border-radius: 12px
Bottom-shadow on elevated cards: 0 4px 0 rgba(0,0,0,0.4)
```

---

## 4. User Flows

### 4.1 Onboarding / Authentication

**Screen: Landing Page**
- Full-screen gradient background: `#0f0f1a` → `#1a1a2e`
- Animated owl mascot ("GymOwl" — a cartoon owl holding a dumbbell) bounces in from top using Framer Motion `spring` animation
- Tagline: **"Get swole. Get smart."** (40px, font-weight 900, white)
- Sub-tagline: "Learn fitness science the fun way" (16px, muted)
- Two CTA buttons stacked vertically:
  - **"Get started"** — filled green (#58cc02), full-width, 56px tall
  - **"I already have an account"** — outlined white border, full-width, 56px tall
- Buttons animate on hover: scale(1.02) + brightness(1.1), 150ms ease
- Buttons animate on tap/click: scale(0.97), 80ms ease

**Screen: Sign Up**
- Back arrow (top-left) routes to Landing
- "Create your account" heading
- Fields: Display name, Email, Password (all with rounded inputs, 56px tall, dark surface background, green focus ring)
- "Create account" CTA button (green, full-width)
- "Already have an account? Log in" link below
- Inline validation: red border + shake animation on invalid, green check icon on valid
- On submit: loading spinner inside button, button text changes to "Creating…"
- On success: confetti burst animation, then fade-transition to Goal Selection

**Screen: Log In**
- Email + Password fields
- "Log in" CTA button
- "Forgot password?" link → magic link email sent, modal confirmation shown
- On success: fade-transition to Home (Skill Tree)

**Screen: Goal Selection** (shown once, after sign-up)
- Heading: "What's your goal?" (28px)
- 4 large selectable cards (tappable, 80px tall):
  - 🏋️ **Build muscle** — Learn hypertrophy & programming
  - 🥗 **Eat better** — Master nutrition & macros
  - 🧠 **Understand my body** — Muscle anatomy & physiology
  - ⚡ **All of the above** — Full curriculum
- Selected card: green border, green background tint, checkmark icon top-right, scale(1.03) animation
- "Continue" CTA button (disabled until a selection is made, then animates to full green)
- On continue: stores goal in user profile → navigates to Skill Tree

---

### 4.2 Home — Skill Tree

**Screen: Skill Tree**
- Sticky top bar:
  - Left: 🔥 **Streak counter** (gold, bold) — e.g. "🔥 7"
  - Center: App logo/wordmark
  - Right: ❤️ **Hearts** (3 hearts max, red) — e.g. "❤️ 3"
- Below sticky bar: **XP Progress Bar** — thin horizontal bar showing progress toward next level (green fill, animated on mount)
- XP level badge (e.g. "Lv. 4 · 420 XP") centered above the skill tree
- **Skill Tree** — vertically scrollable, nodes connected by a dotted path line (like Duolingo's map):
  - Each node = a **Unit** (see Data Model)
  - Node states:
    - **Locked**: grayed out, padlock icon, not tappable
    - **Available**: full color, pulse animation (subtle glow loop), tappable
    - **In Progress**: partial progress ring around icon (SVG circle stroke)
    - **Completed**: green checkmark overlay, gold star rating (1–3 stars based on accuracy)
  - Nodes are spaced 120px apart vertically, alternating left-center-right positions (zigzag path) like Duolingo
  - Each node shows: topic emoji + topic name below
  - Tapping a locked node shows a tooltip: "Complete [previous unit] to unlock"
  - Tapping an available/in-progress node opens the **Unit Preview Sheet**

**Sheet: Unit Preview** (slides up from bottom, 60% screen height)
- Unit title + emoji (large, 48px)
- Unit description (2-3 sentences)
- List of lesson names inside the unit (3–5 lessons)
- "Start lesson" green button (full-width)
- "× " close button (top-right of sheet)
- Sheet background: `#1a1a2e`, rounded top corners (24px)

---

### 4.3 Lesson Flow

**Screen: Lesson Header**
- Back/exit "×" button (top-left) → shows "Quit lesson?" confirmation modal
- Progress bar (top) — green fill, advances after each question, animated with `spring`
- Heart display (top-right)

**Question Types** — each question type has a distinct layout but shares the same header:

#### Type A: Multiple Choice
- Question text (20px, centered, bold) — e.g. "Which muscle group does a deadlift primarily target?"
- 4 answer buttons stacked vertically, full-width, 64px tall each:
  - Default: dark surface (#1a1a2e) with white border
  - On hover: border becomes white/bright, subtle background lighten
  - On select (before submit): selected button highlights in blue (#1cb0f6), border + background tint
  - Submit button appears at bottom after selection ("Check" — green, full-width)

#### Type B: True / False
- Question text (centered)
- Two large buttons side by side: **TRUE** (blue) | **FALSE** (red)
- Tapping one immediately submits and shows feedback

#### Type C: Fill in the Blank
- Sentence with a blank shown as an underlined gap: "The recommended protein intake for muscle gain is ___ grams per kg of bodyweight"
- Keyboard input field (auto-focused on mobile)
- "Check" green button below
- Accepts case-insensitive answer, trims whitespace

#### Type D: Image Matching
- A muscle diagram image (SVG or PNG) is shown
- Below: 4 labeled buttons — user must select the label that matches the highlighted region
- Same select-then-submit pattern as Multiple Choice

**Feedback Overlay** (appears below question, pushes content up with spring animation):
- **Correct**: Green bar slides up from bottom:
  - Green background (#58cc02 at 15% opacity), green top border (4px)
  - Large ✓ icon (animated: scale from 0 → 1.2 → 1.0 in 300ms)
  - "Correct! +10 XP" in green text
  - Explanation text (1–2 sentences teaching the concept)
  - "Continue" green button
- **Incorrect**: Red bar slides up:
  - Red background (#ff4b4b at 15% opacity), red top border
  - Large ✗ icon (animated shake: translateX oscillation 300ms)
  - "Incorrect" in red, correct answer shown in bold
  - Explanation text
  - One heart is removed from header with an animated pop + fade
  - "Got it" button (red-ish, full-width)
- Both overlays use Framer Motion `AnimatePresence` + `initial: {y: 200}` → `animate: {y: 0}`

**Screen: No Hearts Left (Game Over)**
- Triggered when 3rd heart is lost mid-lesson
- Modal overlay (centered):
  - Sad owl mascot animation (drooping eyes loop)
  - "You ran out of hearts!" (24px bold red)
  - "Hearts refill every 5 hours, or you can practice an already-completed lesson to earn one back."
  - Two buttons: "Practice old lesson" | "End session"
- Hearts refill logic: 1 heart restored per 5 hours, tracked server-side via `next_heart_at` timestamp

**Screen: Lesson Complete**
- Full-screen celebration:
  - Confetti burst (200 particles, accent colors) using CSS keyframe animation
  - Owl mascot doing a happy bounce animation (loop × 3)
  - "Lesson Complete! 🎉" heading
  - XP earned chip (e.g. "+50 XP") with scale-up animation
  - Star rating (1–3 ⭐) based on accuracy:
    - 3 stars: 0 wrong answers
    - 2 stars: 1–2 wrong
    - 1 star: 3+ wrong
  - Stars animate in one by one (0.2s stagger)
  - Summary row: "X correct · Y incorrect · Z seconds"
  - "Continue" button → returns to Skill Tree (with updated node state)

---

### 4.4 Profile & Stats Screen

Accessible via bottom nav icon (person icon).

- **Avatar** (initials-based colored circle, 80px) — top center
- **Display name** + **"Level N"** badge
- **XP Bar** (same as home, but larger — shows exact number)
- **Stats grid** (2×2):
  - 🔥 Current streak (days)
  - 📅 Longest streak (days)
  - ✅ Lessons completed (total count)
  - 🎯 Total XP earned
- **Achievements section** — horizontal scroll of badge cards:
  - Each badge: icon + name + description
  - Unlocked: full color. Locked: grayscale + lock icon
  - Achievement examples: "First Lesson", "3-Day Streak", "10-Day Streak", "Nutrition Nerd" (complete all nutrition lessons), "Perfect Lesson" (3-star a lesson), "Iron Mind" (complete all lessons)
- **Settings** button → Settings screen (logout, change password, notification toggle)

---

### 4.5 Leaderboard Screen

Accessible via bottom nav (trophy icon).

- Weekly XP leaderboard
- Top 10 users listed with rank, avatar initial, name, XP earned this week
- Current user's row is highlighted (green tint) even if outside top 10 (shown pinned at bottom)
- Resets every Monday at 00:00 UTC
- Animated rank numbers on load (count up from 0)

---

### 4.6 Bottom Navigation

Fixed at bottom of all post-auth screens. 4 tabs:
1. 🏠 Home (Skill Tree)
2. 🏆 Leaderboard
3. 👤 Profile
4. ⚙️ Settings (gear icon → settings modal)

Active tab: green icon + label. Inactive: muted (#6b6b8a). Tap transitions are instant with a 150ms icon scale pop.

---

## 5. Curriculum Structure

### Units (Skill Tree Nodes)

| # | Unit | Emoji | Lessons |
|---|---|---|---|
| 1 | Intro to Training | 🏋️ | What is resistance training?, Reps & Sets Explained, Progressive Overload |
| 2 | Muscle Anatomy | 🦵 | Upper Body Muscles, Lower Body Muscles, Core Muscles, Muscle Fiber Types |
| 3 | Exercise Form | ✅ | The Squat, The Deadlift, The Bench Press, Pull-ups & Rows |
| 4 | Nutrition Basics | 🥗 | Macronutrients, Protein for Muscle Growth, Carbs & Energy, Fats Explained |
| 5 | Programming | 📋 | Training Frequency, Workout Splits, Periodization Basics |
| 6 | Recovery | 😴 | Why Sleep Matters, Active Recovery, Deload Weeks |
| 7 | Cardio Science | 💨 | HIIT vs Steady-State, VO2 Max, Cardio & Muscle |
| 8 | Advanced Nutrition | 🧪 | Creatine & Supplements, Caloric Surplus & Deficit, Meal Timing |

Units 1–3 are available immediately. Units 4–8 unlock sequentially (each requires the prior unit to be 100% complete).

---

## 6. Data Model

### `users` (managed by Supabase Auth + profile extension)
```
id              uuid PK (from auth.users)
display_name    text NOT NULL
goal            text (enum: 'muscle' | 'nutrition' | 'anatomy' | 'all')
current_streak  integer DEFAULT 0
longest_streak  integer DEFAULT 0
last_activity_date date
total_xp        integer DEFAULT 0
level           integer DEFAULT 1
hearts          integer DEFAULT 3 (max 3)
next_heart_at   timestamptz (nullable — when next heart refills)
weekly_xp       integer DEFAULT 0
weekly_reset_at timestamptz
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `units`
```
id              uuid PK
title           text NOT NULL
emoji           text NOT NULL
description     text
sort_order      integer NOT NULL
unlock_requires uuid FK → units.id (nullable — null = always unlocked)
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `lessons`
```
id              uuid PK
unit_id         uuid FK → units.id
title           text NOT NULL
sort_order      integer NOT NULL
xp_reward       integer DEFAULT 10
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `questions`
```
id              uuid PK
lesson_id       uuid FK → lessons.id
type            text NOT NULL (enum: 'multiple_choice' | 'true_false' | 'fill_blank' | 'image_match')
question_text   text NOT NULL
image_url       text (nullable — for image_match type)
correct_answer  text NOT NULL
explanation     text NOT NULL
sort_order      integer NOT NULL
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `question_choices`
```
id              uuid PK
question_id     uuid FK → questions.id
label           text NOT NULL
is_correct      boolean DEFAULT false
sort_order      integer NOT NULL
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `user_lesson_progress`
```
id              uuid PK
user_id         uuid FK → users.id
lesson_id       uuid FK → lessons.id
status          text (enum: 'not_started' | 'in_progress' | 'completed')
stars           integer (1–3, nullable until completed)
correct_count   integer DEFAULT 0
wrong_count     integer DEFAULT 0
last_attempt_at timestamptz
completed_at    timestamptz (nullable)
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
UNIQUE(user_id, lesson_id)
```

### `user_unit_progress`
```
id              uuid PK
user_id         uuid FK → users.id
unit_id         uuid FK → units.id
lessons_completed integer DEFAULT 0
total_lessons   integer NOT NULL
is_unlocked     boolean DEFAULT false
is_completed    boolean DEFAULT false
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
UNIQUE(user_id, unit_id)
```

### `achievements`
```
id              uuid PK
key             text UNIQUE NOT NULL  (e.g. 'first_lesson', 'streak_3')
title           text NOT NULL
description     text NOT NULL
icon_emoji      text NOT NULL
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()
```

### `user_achievements`
```
id              uuid PK
user_id         uuid FK → users.id
achievement_id  uuid FK → achievements.id
unlocked_at     timestamptz DEFAULT now()
UNIQUE(user_id, achievement_id)
```

### `leaderboard_snapshots` (materialized weekly)
```
id              uuid PK
user_id         uuid FK → users.id
display_name    text NOT NULL
weekly_xp       integer NOT NULL
week_start      date NOT NULL
rank            integer
created_at      timestamptz DEFAULT now()
```

---

## 7. XP & Leveling System

| Level | XP Required (cumulative) |
|---|---|
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 4 | 500 |
| 5 | 900 |
| 6 | 1400 |
| 7 | 2000 |
| 8 | 2800 |
| 9 | 3700 |
| 10 | 5000 |

XP earned per action:
- Correct answer in a lesson: +10 XP
- Lesson complete (any accuracy): +20 XP bonus
- Perfect lesson (0 wrong): +30 XP bonus
- Streak bonus (day 3+): +1.5× multiplier on lesson completion XP

Streak rules:
- A streak day is credited when at least 1 lesson is completed that calendar day (UTC)
- Streak resets to 0 if a full calendar day passes with no lesson
- Streak freeze: not implemented in v1

---

## 8. Animations Specification

| Trigger | Animation | Library | Duration |
|---|---|---|---|
| App/page load | Fade-in + slide up 20px | Framer Motion | 300ms |
| Screen transitions | Crossfade opacity 0→1 | Framer Motion `AnimatePresence` | 250ms |
| Skill tree node (available) | Pulsing glow ring (scale 1→1.08→1 loop) | Framer Motion `animate` repeat | 2s loop |
| Answer selected (multiple choice) | Border color transition + background tint | CSS transition | 150ms |
| Correct answer feedback | Green bar slides up (y: 200→0) | Framer Motion | 350ms spring |
| Incorrect answer feedback | Red bar slides up + icon shake | Framer Motion | 350ms |
| Heart lost | Pop scale 1→1.4→0 + fade out | Framer Motion | 400ms |
| Lesson complete confetti | 200 CSS-keyframe particles | Pure CSS | 1500ms |
| Star rating on lesson complete | Stars drop in one-by-one (y: -20→0, stagger 200ms) | Framer Motion | 300ms each |
| XP counter increment | Number counts up from previous value | Custom JS interval | 800ms |
| Lesson progress bar | Width transition (spring) | Framer Motion | 500ms |
| Button press | scale(0.97) | CSS active pseudo-class | 80ms |
| Sheet slide-up (unit preview) | y: 100%→0 | Framer Motion | 300ms ease-out |
| Achievement unlock toast | Slides in from top + gold glow | Framer Motion | 400ms |

---

## 9. Seeded Curriculum Content

The database must be seeded with at minimum:
- All 8 units
- At least 3 lessons per unit (24+ lessons total)
- At least 4 questions per lesson (96+ questions total)
- Mix of all 4 question types across lessons
- All achievement definitions

---

## 10. Acceptance Criteria

1. **AC-01** — A new user can sign up with email + password, select a goal, and reach the skill tree within 60 seconds.
2. **AC-02** — The skill tree displays all 8 units; Units 1–3 are unlocked by default; Units 4–8 are locked until prerequisites are met.
3. **AC-03** — Tapping a locked node shows a tooltip explaining which unit must be completed first.
4. **AC-04** — A lesson contains between 4 and 10 questions; the progress bar advances after each question with a spring animation visible to the user.
5. **AC-05** — Selecting a correct answer triggers the green feedback bar within 200ms of the "Check" button press.
6. **AC-06** — Selecting a wrong answer triggers the red feedback bar, and one heart is removed from the header with a visible pop-and-fade animation.
7. **AC-07** — When all 3 hearts are lost mid-lesson, the "No Hearts Left" modal appears and the lesson cannot continue until the user navigates away.
8. **AC-08** — Completing a lesson displays the confetti animation and correct star rating (3 stars = 0 wrong, 2 stars = 1–2 wrong, 1 star = 3+ wrong).
9. **AC-09** — XP earned during a lesson is reflected in the profile's total XP and the home screen's XP progress bar immediately after the lesson ends.
10. **AC-10** — The streak counter increments by 1 when a lesson is completed and the previous activity date is exactly 1 calendar day ago (UTC).
11. **AC-11** — The streak resets to 0 when the user logs in on a day that is 2+ calendar days after their last activity.
12. **AC-12** — The leaderboard shows the top 10 users by weekly XP, updates immediately when the current user earns XP, and highlights the current user's row.
13. **AC-13** — The profile screen shows correct values for current streak, longest streak, total XP, and lessons completed.
14. **AC-14** — All buttons have a visible press state (scale 0.97) that completes within 80ms.
15. **AC-15** — Screen transitions (between routes) use a crossfade animation lasting no longer than 300ms.
16. **AC-16** — All text uses the Nunito font; no system fonts appear anywhere in the application.
17. **AC-17** — The app is fully functional on a 375px-wide mobile viewport and centered correctly on a 1440px desktop viewport.
18. **AC-18** — The page background is `#0f0f1a` on all screens; no white or light-mode styles appear.
19. **AC-19** — Hearts refill at a rate of 1 per 5 hours when below maximum; the `next_heart_at` timestamp drives this logic server-side.
20. **AC-20** — Achievements are unlocked in real-time (toast notification slides from top) when their criteria are first met (e.g., completing the first lesson triggers "First Lesson" achievement immediately).
21. **AC-21** — The fill-in-the-blank question type accepts case-insensitive answers and trims leading/trailing whitespace before evaluation.
22. **AC-22** — A user who has completed a lesson can replay it; replaying a completed lesson does not reduce hearts on wrong answers (practice mode).
23. **AC-23** — The app loads initial route within 3 seconds on a simulated 3G connection (Lighthouse performance score ≥ 75).
24. **AC-24** — Supabase Row Level Security (RLS) is enabled on all tables; users can only read/write their own progress records.
