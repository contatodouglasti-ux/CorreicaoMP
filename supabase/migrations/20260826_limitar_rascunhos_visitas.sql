-- Impede que um mesmo usuário mantenha mais de dois rascunhos.
create or replace function public.limitar_rascunhos_visitas_unidades()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'rascunho' then
    perform pg_advisory_xact_lock(hashtext(new.criado_por));
    if (
      select count(*)
      from public.visitas_unidades_prisionais
      where criado_por = new.criado_por
        and status = 'rascunho'
        and id is distinct from new.id
    ) >= 2 then
      raise exception 'Limite de dois rascunhos por usuário atingido.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists visitas_unidades_prisionais_limitar_rascunhos
  on public.visitas_unidades_prisionais;

create trigger visitas_unidades_prisionais_limitar_rascunhos
before insert or update of status on public.visitas_unidades_prisionais
for each row execute function public.limitar_rascunhos_visitas_unidades();
