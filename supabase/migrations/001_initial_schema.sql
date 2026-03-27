-- ── GymIQV6V6 — Initial Schema ─────────────────────────────────────────────
-- Migration 001 — All tables, triggers, indexes, and RLS policies
-- ───────────────────────────────────────────────────────────────────────────

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ── USERS PROFILE ──────────────────────────────────────────────────────────
create table public.users (
  id                 uuid primary key references auth.users(id) on delete cascade,
  display_name       text not null,
  goal               text check (goal in ('muscle','nutrition','anatomy','all')),
  current_streak     integer not null default 0,
  longest_streak     integer not null default 0,
  last_activity_date date,
  total_xp           integer not null default 0,
  level              integer not null default 1,
  hearts             integer not null default 3 check (hearts between 0 and 3),
  next_heart_at      timestamptz,
  weekly_xp          integer not null default 0,
  weekly_reset_at    timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Auto-create user profile on auth signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', 'Trainer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

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

create trigger units_updated_at
  before update on public.units
  for each row execute procedure public.handle_updated_at();

-- ── LESSONS ────────────────────────────────────────────────────────────────
create table public.lessons (
  id         uuid primary key default uuid_generate_v4(),
  unit_id    uuid not null references public.units(id) on delete cascade,
  title      text not null,
  sort_order integer not null,
  xp_reward  integer not null default 20,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger lessons_updated_at
  before update on public.lessons
  for each row execute procedure public.handle_updated_at();

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

create trigger questions_updated_at
  before update on public.questions
  for each row execute procedure public.handle_updated_at();

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

create trigger question_choices_updated_at
  before update on public.question_choices
  for each row execute procedure public.handle_updated_at();

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

create trigger user_lesson_progress_updated_at
  before update on public.user_lesson_progress
  for each row execute procedure public.handle_updated_at();

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

create trigger user_unit_progress_updated_at
  before update on public.user_unit_progress
  for each row execute procedure public.handle_updated_at();

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

create trigger achievements_updated_at
  before update on public.achievements
  for each row execute procedure public.handle_updated_at();

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
create index idx_lessons_unit_id           on public.lessons(unit_id);
create index idx_lessons_sort_order        on public.lessons(sort_order);
create index idx_questions_lesson_id       on public.questions(lesson_id);
create index idx_questions_sort_order      on public.questions(sort_order);
create index idx_question_choices_question on public.question_choices(question_id);
create index idx_ulp_user_id              on public.user_lesson_progress(user_id);
create index idx_ulp_lesson_id            on public.user_lesson_progress(lesson_id);
create index idx_uup_user_id              on public.user_unit_progress(user_id);
create index idx_ua_user_id               on public.user_achievements(user_id);
create index idx_ls_week_start            on public.leaderboard_snapshots(week_start);
create index idx_ls_user_week             on public.leaderboard_snapshots(user_id, week_start);
create index idx_users_weekly_xp          on public.users(weekly_xp desc);
create index idx_users_total_xp           on public.users(total_xp desc);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────────────────────
alter table public.users                 enable row level security;
alter table public.units                 enable row level security;
alter table public.lessons               enable row level security;
alter table public.questions             enable row level security;
alter table public.question_choices      enable row level security;
alter table public.user_lesson_progress  enable row level security;
alter table public.user_unit_progress    enable row level security;
alter table public.achievements          enable row level security;
alter table public.user_achievements     enable row level security;
alter table public.leaderboard_snapshots enable row level security;

-- Users: own row only
create policy "users_select_own"
  on public.users for select
  using (auth.uid() = id);

create policy "users_update_own"
  on public.users for update
  using (auth.uid() = id);

-- Curriculum tables: public read (no auth required)
create policy "units_public_read"
  on public.units for select
  using (true);

create policy "lessons_public_read"
  on public.lessons for select
  using (true);

create policy "questions_public_read"
  on public.questions for select
  using (true);

create policy "choices_public_read"
  on public.question_choices for select
  using (true);

create policy "achievements_public_read"
  on public.achievements for select
  using (true);

-- User lesson progress: own rows only
create policy "ulp_select_own"
  on public.user_lesson_progress for select
  using (auth.uid() = user_id);

create policy "ulp_insert_own"
  on public.user_lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "ulp_update_own"
  on public.user_lesson_progress for update
  using (auth.uid() = user_id);

-- User unit progress: own rows only
create policy "uup_select_own"
  on public.user_unit_progress for select
  using (auth.uid() = user_id);

create policy "uup_insert_own"
  on public.user_unit_progress for insert
  with check (auth.uid() = user_id);

create policy "uup_update_own"
  on public.user_unit_progress for update
  using (auth.uid() = user_id);

-- User achievements: own rows only
create policy "ua_select_own"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "ua_insert_own"
  on public.user_achievements for insert
  with check (auth.uid() = user_id);

-- Leaderboard: all authenticated users can read, own insert
create policy "ls_auth_read"
  on public.leaderboard_snapshots for select
  using (auth.uid() is not null);

create policy "ls_insert_own"
  on public.leaderboard_snapshots for insert
  with check (auth.uid() = user_id);
