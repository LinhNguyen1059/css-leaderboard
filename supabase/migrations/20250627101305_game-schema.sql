create table game_logs (
  id uuid primary key default gen_random_uuid(),
  map text,
  map_url text,
  match_date date not null,
  chats jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table daily_scores (
  id serial primary key,
  name text not null,
  kills integer not null default 0 check (kills >= 0),
  total_kills integer not null default 0 check (total_kills >= 0),
  deaths integer not null default 0 check (deaths >= 0),
  total_deaths integer not null default 0 check (total_deaths >= 0),
  score integer not null default 0,
  total_map_score integer not null default 0,
  match_date date not null,
  log_id uuid not null references game_logs(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table stabs (
  id serial primary key,
  log_id uuid not null references game_logs(id) on delete cascade,
  killer text not null,
  victim text not null,
  time text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better query performance
create unique index unique_player_per_day_per_log on daily_scores (name, match_date, log_id);
create unique index unique_game_log_per_day on game_logs (match_date);
create index idx_daily_scores_match_date on daily_scores (match_date);
create index idx_daily_scores_log_id on daily_scores (log_id);
create index idx_game_logs_match_date on game_logs (match_date);
create index idx_stabs_log_id on stabs (log_id);
create index idx_stabs_killer on stabs (killer);
create index idx_stabs_victim on stabs (victim);
