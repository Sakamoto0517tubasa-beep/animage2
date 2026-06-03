-- animage initial schema
-- Tables: spots, reviews, photos, favorites
-- Includes RLS policies and Storage bucket for photo uploads

-- ---------------------------------------------------------------------------
-- Helper: score validation (1–10)
-- ---------------------------------------------------------------------------
create or replace function public.is_valid_score(value integer)
returns boolean
language sql
immutable
as $$
  select value between 1 and 10;
$$;

-- ---------------------------------------------------------------------------
-- spots
-- ---------------------------------------------------------------------------
create table public.spots (
  id uuid primary key default gen_random_uuid(),
  anime_title text not null,
  location_name text not null,
  address text not null,
  lat double precision not null,
  lng double precision not null,
  description text not null default '',
  created_at timestamptz not null default now(),

  constraint spots_lat_range check (lat between -90 and 90),
  constraint spots_lng_range check (lng between -180 and 180)
);

create index spots_anime_title_idx on public.spots (anime_title);
create index spots_location_name_idx on public.spots (location_name);
create index spots_created_at_idx on public.spots (created_at desc);

-- ---------------------------------------------------------------------------
-- reviews
-- ---------------------------------------------------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  score_reenactment integer not null,
  score_accessibility integer not null,
  score_satisfaction integer not null,
  score_photo integer not null,
  score_overall integer not null,
  comment text not null,
  created_at timestamptz not null default now(),

  constraint reviews_score_reenactment_range check (public.is_valid_score(score_reenactment)),
  constraint reviews_score_accessibility_range check (public.is_valid_score(score_accessibility)),
  constraint reviews_score_satisfaction_range check (public.is_valid_score(score_satisfaction)),
  constraint reviews_score_photo_range check (public.is_valid_score(score_photo)),
  constraint reviews_score_overall_range check (public.is_valid_score(score_overall)),
  constraint reviews_comment_min_length check (char_length(trim(comment)) >= 50),
  constraint reviews_one_per_user_per_spot unique (spot_id, user_id)
);

create index reviews_spot_id_idx on public.reviews (spot_id);
create index reviews_user_id_idx on public.reviews (user_id);
create index reviews_created_at_idx on public.reviews (created_at desc);

-- ---------------------------------------------------------------------------
-- photos
-- ---------------------------------------------------------------------------
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  url text not null,
  caption text not null default '',
  created_at timestamptz not null default now()
);

create index photos_spot_id_idx on public.photos (spot_id);
create index photos_user_id_idx on public.photos (user_id);
create index photos_created_at_idx on public.photos (created_at desc);

-- ---------------------------------------------------------------------------
-- favorites
-- ---------------------------------------------------------------------------
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  spot_id uuid not null references public.spots (id) on delete cascade,
  created_at timestamptz not null default now(),

  constraint favorites_one_per_user_per_spot unique (user_id, spot_id)
);

create index favorites_user_id_idx on public.favorites (user_id);
create index favorites_spot_id_idx on public.favorites (spot_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.spots enable row level security;
alter table public.reviews enable row level security;
alter table public.photos enable row level security;
alter table public.favorites enable row level security;

-- spots: public read, no client writes (manage via Dashboard / service role)
create policy "spots_select_public"
  on public.spots
  for select
  to anon, authenticated
  using (true);

-- reviews: public read; authenticated users insert/update/delete own rows
create policy "reviews_select_public"
  on public.reviews
  for select
  to anon, authenticated
  using (true);

create policy "reviews_insert_own"
  on public.reviews
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "reviews_update_own"
  on public.reviews
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "reviews_delete_own"
  on public.reviews
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- photos: public read; authenticated users insert/update/delete own rows
create policy "photos_select_public"
  on public.photos
  for select
  to anon, authenticated
  using (true);

create policy "photos_insert_own"
  on public.photos
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "photos_update_own"
  on public.photos
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "photos_delete_own"
  on public.photos
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- favorites: users manage only their own favorites
create policy "favorites_select_own"
  on public.favorites
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage: photos bucket
-- Upload path used by the app: {user_id}/{spot_id}/{filename}
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'photos',
  'photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "storage_photos_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'photos');

create policy "storage_photos_insert_own_folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "storage_photos_update_own_folder"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "storage_photos_delete_own_folder"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
