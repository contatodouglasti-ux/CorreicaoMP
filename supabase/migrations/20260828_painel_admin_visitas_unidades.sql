-- Painel administrativo do módulo Visitas a Unidades Prisionais.
-- Usa a mesma lista de administradores já adotada pelo sistema principal.

create or replace function public.buscar_visitas_unidades_painel()
returns table (
  id uuid,
  municipio text,
  estabelecimento text,
  data_visita date,
  criado_em timestamptz,
  dados jsonb
)
language sql
security definer
set search_path = public
as $$
  select
    v.id,
    v.municipio,
    v.estabelecimento,
    v.data_visita,
    v.criado_em,
    v.dados
  from public.visitas_unidades_prisionais v
  where v.status = 'finalizada'
    and exists (
      select 1
      from public.admins a
      where a.ativo = true
        and lower(a.email) = lower(
          coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')
        )
    )
  order by v.data_visita asc nulls last, v.criado_em asc;
$$;

revoke all on function public.buscar_visitas_unidades_painel() from public;
grant execute on function public.buscar_visitas_unidades_painel() to anon;
