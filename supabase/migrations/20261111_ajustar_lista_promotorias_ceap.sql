create or replace function public.listar_promotorias_ceap()
returns table(nome text)
language sql
stable
security definer
set search_path = public
as $$
  select u.nome
  from public.unidades_correicionadas u
  where (u.nome ~* 'Comarca' or u.nome ~* 'Promotoria de Justiça')
    and (u.nome ~* '^0?1ª' or u.nome ~* '^Promotoria de Justiça')
  order by u.nome;
$$;

revoke execute on function public.listar_promotorias_ceap() from public;
grant execute on function public.listar_promotorias_ceap() to anon;
