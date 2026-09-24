-- ============================================================================
-- Dr. Mohamed Sami — Headless CMS schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- Bilingual content is stored as paired _ar / _en columns to mirror the
-- existing messages/ar.json + messages/en.json split used by the frontend.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. global_settings — a single row of site-wide configuration.
-- ---------------------------------------------------------------------------
create table if not exists global_settings (
  id smallint primary key default 1,
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  address_ar text not null default '',
  address_en text not null default '',
  social_links jsonb not null default '[]'::jsonb, -- [{ "name": "Facebook", "href": "https://..." }]
  logo_url text,
  seo_default_title_ar text not null default '',
  seo_default_title_en text not null default '',
  seo_default_description_ar text not null default '',
  seo_default_description_en text not null default '',
  updated_at timestamptz not null default now(),
  constraint global_settings_singleton check (id = 1)
);

insert into global_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 2. pages — registry of the site's routes.
-- ---------------------------------------------------------------------------
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- e.g. "home", "about", "services"
  title_ar text not null default '',
  title_en text not null default '',
  meta_title_ar text not null default '',
  meta_title_en text not null default '',
  meta_description_ar text not null default '',
  meta_description_en text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. page_sections — ordered sections belonging to a page.
-- `content` is a flexible per-section-type payload; translatable strings are
-- nested as { "ar": "...", "en": "..." } inside it, e.g.:
--   { "title": { "ar": "...", "en": "..." }, "subtitle": { "ar": "...", "en": "..." } }
-- ---------------------------------------------------------------------------
create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages(id) on delete cascade,
  section_key text not null, -- e.g. "hero", "stats", "cta"
  section_title_ar text not null default '', -- admin-facing label only
  section_title_en text not null default '',
  content jsonb not null default '{}'::jsonb,
  order_index integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_key)
);

create index if not exists page_sections_page_id_order_idx
  on page_sections (page_id, order_index);

-- ---------------------------------------------------------------------------
-- 4. dynamic_items_collections — reusable list items scoped to a section
-- (service cards, videos, testimonials, FAQs, timeline entries, stat
-- counters, ...). `extra` is a JSONB escape hatch for fields specific to one
-- item type (e.g. { "rating": 5, "procedure": {...} } for a testimonial, or
-- { "targetValue": 18, "suffix": "+" } for a stat counter).
-- ---------------------------------------------------------------------------
create table if not exists dynamic_items_collections (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references page_sections(id) on delete cascade,
  item_key text, -- optional stable slug, e.g. "endoscopy" for a service card
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  image_url text,
  link_url text,
  extra jsonb not null default '{}'::jsonb,
  order_index integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists dynamic_items_section_id_order_idx
  on dynamic_items_collections (section_id, order_index);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on global_settings;
create trigger set_updated_at before update on global_settings
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on pages;
create trigger set_updated_at before update on pages
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on page_sections;
create trigger set_updated_at before update on page_sections
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on dynamic_items_collections;
create trigger set_updated_at before update on dynamic_items_collections
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — public read-only, authenticated (admin) full access.
-- This project has a single admin account, so any authenticated user is
-- treated as an admin; there is no separate roles table.
-- ---------------------------------------------------------------------------
alter table global_settings enable row level security;
alter table pages enable row level security;
alter table page_sections enable row level security;
alter table dynamic_items_collections enable row level security;

create policy "public read global_settings"
  on global_settings for select
  to anon, authenticated
  using (true);

create policy "admin write global_settings"
  on global_settings for all
  to authenticated
  using (true) with check (true);

create policy "public read active pages"
  on pages for select
  to anon, authenticated
  using (is_active = true);

create policy "admin read all pages"
  on pages for select
  to authenticated
  using (true);

create policy "admin write pages"
  on pages for insert
  to authenticated
  with check (true);

create policy "admin update pages"
  on pages for update
  to authenticated
  using (true) with check (true);

create policy "admin delete pages"
  on pages for delete
  to authenticated
  using (true);

create policy "public read visible sections"
  on page_sections for select
  to anon, authenticated
  using (is_visible = true);

create policy "admin read all sections"
  on page_sections for select
  to authenticated
  using (true);

create policy "admin write sections"
  on page_sections for insert
  to authenticated
  with check (true);

create policy "admin update sections"
  on page_sections for update
  to authenticated
  using (true) with check (true);

create policy "admin delete sections"
  on page_sections for delete
  to authenticated
  using (true);

create policy "public read visible items"
  on dynamic_items_collections for select
  to anon, authenticated
  using (is_visible = true);

create policy "admin read all items"
  on dynamic_items_collections for select
  to authenticated
  using (true);

create policy "admin write items"
  on dynamic_items_collections for insert
  to authenticated
  with check (true);

create policy "admin update items"
  on dynamic_items_collections for update
  to authenticated
  using (true) with check (true);

create policy "admin delete items"
  on dynamic_items_collections for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for admin-uploaded media (images).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

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

-- ---------------------------------------------------------------------------
-- Seed the page registry (content is added separately per page/section).
-- ---------------------------------------------------------------------------
insert into pages (slug, title_ar, title_en, meta_title_ar, meta_title_en, meta_description_ar, meta_description_en)
values
  ('home', 'الرئيسية', 'Home', 'دكتور محمد سامي', 'Dr. Mohamed Sami', '', ''),
  ('about', 'عن الدكتور', 'About', 'عن الدكتور', 'About the Doctor', '', ''),
  ('services', 'الخدمات', 'Services', 'خدماتنا الطبية', 'Our Medical Services', '', ''),
  ('videos', 'الفيديوهات', 'Videos', 'الفيديوهات', 'Videos', '', ''),
  ('reviews', 'آراء المرضى', 'Reviews', 'تقييمات وآراء المرضى', 'Patient Reviews', '', ''),
  ('articles', 'المقالات', 'Articles', 'المقالات الطبية', 'Medical Articles', '', ''),
  ('contact', 'تواصل معنا', 'Contact', 'تواصل معنا', 'Contact Us', '', '')
on conflict (slug) do nothing;
