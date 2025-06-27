create table daily_scores (
  id serial primary key,
  name text not null,
  score integer not null,
  match_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create unique index unique_player_per_day on daily_scores (name, match_date);
