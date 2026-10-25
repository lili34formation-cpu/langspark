-- ════════════════════════════════════════
--  LangSpark — base de données Supabase
--  À coller dans Supabase > SQL Editor > New query, puis « Run ».
-- ════════════════════════════════════════

-- Une ligne par utilisateur : toute sa progression (leçons, bilans, conjugaison, XP…) en JSON
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Chacun ne peut lire et modifier QUE sa propre progression
alter table public.progress enable row level security;

drop policy if exists "lire sa progression" on public.progress;
create policy "lire sa progression" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "créer sa progression" on public.progress;
create policy "créer sa progression" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "modifier sa progression" on public.progress;
create policy "modifier sa progression" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- RGPD : chacun peut supprimer son compte (et donc toute sa progression)
create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = public, auth
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
