-- Allow anonymous reviews with optional nickname (MVP)

alter table public.reviews
  alter column user_id drop not null;

alter table public.reviews
  add column if not exists nickname text;

alter table public.reviews
  drop constraint if exists reviews_one_per_user_per_spot;

create unique index if not exists reviews_one_auth_user_per_spot
  on public.reviews (spot_id, user_id)
  where user_id is not null;

alter table public.reviews
  drop constraint if exists reviews_comment_min_length;

alter table public.reviews
  add constraint reviews_comment_not_empty
  check (char_length(trim(comment)) >= 1);

drop policy if exists "reviews_insert_own" on public.reviews;

create policy "reviews_insert_public"
  on public.reviews
  for insert
  to anon, authenticated
  with check (
    (auth.uid() is null and user_id is null)
    or (auth.uid() = user_id)
  );
