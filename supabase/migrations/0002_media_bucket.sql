-- ============================================================================
-- Ensures the `media` Storage bucket exists and only accepts image/video
-- files. Safe to run even if the bucket and policies from 0001_init.sql
-- already exist.
--
-- Note on upload size: this project's Supabase plan enforces its own
-- project-wide max upload size (the free tier caps at 50MB) that cannot be
-- raised from SQL or application code — only from the Supabase Dashboard
-- under Project Settings > Storage (if the plan allows it) or by upgrading
-- the plan. Leaving file_size_limit unset here (rather than forcing a
-- specific value) lets the bucket simply defer to whatever that project cap
-- actually is.
-- ============================================================================

insert into storage.buckets (id, name, public, allowed_mime_types)
values ('media', 'media', true, array['image/*', 'video/*'])
on conflict (id) do update set
  public = true,
  allowed_mime_types = array['image/*', 'video/*'];

drop policy if exists "public read media" on storage.objects;
drop policy if exists "admin upload media" on storage.objects;
drop policy if exists "admin update media" on storage.objects;
drop policy if exists "admin delete media" on storage.objects;

create policy "public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

create policy "admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
