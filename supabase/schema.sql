-- RudderKit Schema
-- Run this in your Supabase SQL editor to set up the database

-- Vendors table
create table if not exists vendors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  slug text unique not null,
  required_docs jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Documents table
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid references vendors(id) on delete cascade,
  doc_type text not null,
  file_name text not null,
  file_path text not null,
  uploaded_at timestamptz default now()
);

-- Enable RLS
alter table vendors enable row level security;
alter table documents enable row level security;

-- Public read access for upload pages (vendors access by slug)
create policy "Public read vendors by slug" on vendors
  for select using (true);

create policy "Public read documents" on documents
  for select using (true);

create policy "Public insert documents" on documents
  for insert with check (true);

-- Create storage bucket for uploads
insert into storage.buckets (id, name, public) 
values ('vendor-docs', 'vendor-docs', false)
on conflict (id) do nothing;

-- Storage policy for uploads
create policy "Anyone can upload" on storage.objects
  for insert with check (bucket_id = 'vendor-docs');

create policy "Authenticated can read" on storage.objects
  for select using (bucket_id = 'vendor-docs');
