-- Módulo: Visitas a Unidades Prisionais
-- Execute este arquivo no SQL Editor do projeto Supabase configurado em js/config.js.

create table if not exists public.visitas_unidades_prisionais (
  id uuid primary key default gen_random_uuid(),
  criado_por text not null,
  membro_responsavel text,
  email_contato text,
  municipio text,
  estabelecimento text,
  data_visita date,
  dados jsonb not null default '{}'::jsonb,
  anexo jsonb,
  status text not null default 'finalizada' check (status in ('rascunho', 'finalizada')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists visitas_unidades_prisionais_criado_por_idx
  on public.visitas_unidades_prisionais (criado_por, criado_em desc);
create index if not exists visitas_unidades_prisionais_data_visita_idx
  on public.visitas_unidades_prisionais (data_visita desc);

create or replace function public.atualizar_atualizado_em_visita_unidade()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists visitas_unidades_prisionais_atualizar_em on public.visitas_unidades_prisionais;
create trigger visitas_unidades_prisionais_atualizar_em
before update on public.visitas_unidades_prisionais
for each row execute function public.atualizar_atualizado_em_visita_unidade();

alter table public.visitas_unidades_prisionais enable row level security;

-- O sistema atual identifica o usuário Microsoft no cabeçalho x-user-id.
-- Para proteção forte em produção, migre a autenticação para Supabase Auth.
drop policy if exists visitas_unidades_prisionais_inserir_propria on public.visitas_unidades_prisionais;
create policy visitas_unidades_prisionais_inserir_propria
on public.visitas_unidades_prisionais for insert to anon
with check (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')));

drop policy if exists visitas_unidades_prisionais_ler_proprias on public.visitas_unidades_prisionais;
create policy visitas_unidades_prisionais_ler_proprias
on public.visitas_unidades_prisionais for select to anon
using (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')));

drop policy if exists visitas_unidades_prisionais_atualizar_propria on public.visitas_unidades_prisionais;
create policy visitas_unidades_prisionais_atualizar_propria
on public.visitas_unidades_prisionais for update to anon
using (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')))
with check (criado_por = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')));

insert into storage.buckets (id, name, public)
values ('anexos_visitas_unidades', 'anexos_visitas_unidades', false)
on conflict (id) do nothing;

drop policy if exists anexos_visitas_unidades_enviar_proprios on storage.objects;
create policy anexos_visitas_unidades_enviar_proprios
on storage.objects for insert to anon
with check (
  bucket_id = 'anexos_visitas_unidades'
  and (storage.foldername(name))[1] = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', ''))
);

drop policy if exists anexos_visitas_unidades_ler_proprios on storage.objects;
create policy anexos_visitas_unidades_ler_proprios
on storage.objects for select to anon
using (
  bucket_id = 'anexos_visitas_unidades'
  and (storage.foldername(name))[1] = lower(coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', ''))
);
