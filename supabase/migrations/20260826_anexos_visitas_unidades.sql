-- Registro individual das fotografias e documentos anexados às visitas.
create table if not exists public.visitas_unidades_anexos (
  id uuid primary key default gen_random_uuid(),
  visita_id uuid not null references public.visitas_unidades_prisionais(id) on delete cascade,
  criado_por text not null,
  bucket text not null default 'anexos_visitas_unidades',
  caminho text not null unique,
  nome_arquivo text not null,
  tipo_arquivo text not null,
  tamanho_bytes bigint not null check (tamanho_bytes > 0 and tamanho_bytes <= 10485760),
  criado_em timestamptz not null default now()
);

create index if not exists visitas_unidades_anexos_visita_idx
  on public.visitas_unidades_anexos (visita_id, criado_em);

alter table public.visitas_unidades_anexos enable row level security;

drop policy if exists visitas_unidades_anexos_inserir_proprios on public.visitas_unidades_anexos;
create policy visitas_unidades_anexos_inserir_proprios
on public.visitas_unidades_anexos for insert to anon
with check (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')));

drop policy if exists visitas_unidades_anexos_ler_proprios on public.visitas_unidades_anexos;
create policy visitas_unidades_anexos_ler_proprios
on public.visitas_unidades_anexos for select to anon
using (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')));
