create table game_logs (
  id uuid primary key default gen_random_uuid(),
  map text not null,
  map_url text,
  match_date date not null,
  created_at timestamp with time zone default now()
);

create table stabs (
  id serial primary key,
  log_id uuid references game_logs(id) on delete cascade,
  killer text not null,
  victim text not null,
  time timestamp with time zone not null
);

create table chats (
  id serial primary key,
  log_id uuid references game_logs(id) on delete cascade,
  player text not null,
  message text not null,
  time timestamp with time zone not null
);
