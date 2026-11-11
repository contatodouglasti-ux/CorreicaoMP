-- Formulário público e independente: Levantamento CEAP.
create table if not exists public.levantamentos_ceap (
  id uuid primary key default gen_random_uuid(),
  promotoria_justica text not null,
  membro_responsavel text not null,
  periodo_inicio date not null,
  periodo_fim date not null,
  total_procedimentos integer not null check (total_procedimentos >= 0),
  encaminhados_uaip integer not null check (encaminhados_uaip >= 0),
  encaminhados_djd integer not null check (encaminhados_djd >= 0),
  arquivados_uaip integer not null check (arquivados_uaip >= 0),
  arquivados_djd integer not null check (arquivados_djd >= 0),
  retornaram_uaip integer not null check (retornaram_uaip >= 0),
  retornaram_djd integer not null check (retornaram_djd >= 0),
  criado_em timestamptz not null default now(),
  constraint levantamento_ceap_periodo_valido check (periodo_fim >= periodo_inicio)
);

alter table public.levantamentos_ceap enable row level security;

-- Público pode somente enviar. Não há leitura, edição ou exclusão via anon.
create policy levantamento_ceap_envio_publico
on public.levantamentos_ceap for insert to anon
with check (true);
grant insert on public.levantamentos_ceap to anon;

-- Retorna somente o nome das Promotorias elegíveis, sem expor as demais colunas.
create or replace function public.listar_promotorias_ceap()
returns table(nome text)
language sql
stable
security definer
set search_path = public
as $$
  select u.nome
  from public.unidades_correicionadas u
  where u.nome ~* 'Comarca'
  order by u.nome;
$$;

revoke all on function public.listar_promotorias_ceap() from public;
grant execute on function public.listar_promotorias_ceap() to anon;
